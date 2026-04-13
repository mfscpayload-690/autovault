require('dotenv').config();

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const ROOT = path.join(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT, 'scripts', 'image-map-input.json');

function localFileExistsFromUrl(urlPath, folderName) {
  if (!urlPath) return false;
  const prefix = `/uploads/${folderName}/`;
  if (!urlPath.startsWith(prefix)) return false;

  const filename = decodeURIComponent(urlPath.slice(prefix.length));
  if (!filename) return false;

  const fullPath = path.join(ROOT, 'uploads', folderName, filename);
  return fs.existsSync(fullPath);
}

(async () => {
  try {
    const [brands] = await db.query('SELECT id, name, logo_url FROM brands ORDER BY id');
    const [cars] = await db.query(
      `SELECT c.id, c.name, c.variant, c.image_url, b.name AS brand_name
       FROM cars c
       JOIN brands b ON b.id = c.brand_id
       WHERE c.is_active = TRUE
       ORDER BY c.id`
    );

    const missingBrands = brands
      .filter((b) => !localFileExistsFromUrl(b.logo_url, 'brands') && !String(b.logo_url || '').startsWith('http'))
      .map((b) => ({
        id: b.id,
        name: b.name,
        current_url: b.logo_url || null,
        new_url: ''
      }));

    const missingCars = cars
      .filter((c) => !localFileExistsFromUrl(c.image_url, 'cars') && !String(c.image_url || '').startsWith('http'))
      .map((c) => ({
        id: c.id,
        brand: c.brand_name,
        car_name: c.name,
        variant: c.variant || '',
        current_url: c.image_url || null,
        new_url: ''
      }));

    const payload = {
      instructions: [
        'Fill new_url for each row with a direct image URL (https://...) or /uploads/... local path.',
        'Leave new_url empty to skip that row.',
        'Then run: npm run images:apply-map'
      ],
      brands: missingBrands,
      cars: missingCars
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2));

    console.log(`[exportMissingImageTemplate] Wrote ${OUTPUT_PATH}`);
    console.log(`[exportMissingImageTemplate] brands: ${missingBrands.length}, cars: ${missingCars.length}`);
  } catch (err) {
    console.error('[exportMissingImageTemplate] Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
})();
