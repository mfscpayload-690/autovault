require('dotenv').config();

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const ROOT = path.join(__dirname, '..');
const INPUT_PATH = path.join(ROOT, 'scripts', 'image-map-input.json');

function normalizeUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  if (!value) return '';

  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/uploads/')) {
    return value;
  }

  return '';
}

(async () => {
  try {
    if (!fs.existsSync(INPUT_PATH)) {
      throw new Error(`Missing ${INPUT_PATH}. Run: npm run images:export-template`);
    }

    const data = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf8'));
    const brands = Array.isArray(data.brands) ? data.brands : [];
    const cars = Array.isArray(data.cars) ? data.cars : [];

    let brandUpdated = 0;
    let carUpdated = 0;

    for (const item of brands) {
      const mappedUrl = normalizeUrl(item.new_url);
      if (!mappedUrl || !item.id) continue;
      await db.query('UPDATE brands SET logo_url = ? WHERE id = ?', [mappedUrl, item.id]);
      brandUpdated += 1;
    }

    for (const item of cars) {
      const mappedUrl = normalizeUrl(item.new_url);
      if (!mappedUrl || !item.id) continue;
      await db.query('UPDATE cars SET image_url = ? WHERE id = ?', [mappedUrl, item.id]);
      carUpdated += 1;
    }

    console.log(`[applyImageMap] Updated brands: ${brandUpdated}`);
    console.log(`[applyImageMap] Updated cars: ${carUpdated}`);
  } catch (err) {
    console.error('[applyImageMap] Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
})();
