require('dotenv').config();

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const ROOT = path.join(__dirname, '..');
const BRANDS_DIR = path.join(ROOT, 'uploads', 'brands');
const CARS_DIR = path.join(ROOT, 'uploads', 'cars');
const REPORT_PATH = path.join(ROOT, 'scripts', 'image-map-report.json');

function listFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter((name) => name !== '.gitkeep')
    .filter((name) => fs.statSync(path.join(dirPath, name)).isFile());
}

function normalize(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokens(input) {
  return Array.from(new Set(normalize(input).split(' ').filter((t) => t.length > 1)));
}

function overlapScore(targetTokens, fileTokens) {
  if (targetTokens.length === 0 || fileTokens.length === 0) return 0;

  let hits = 0;
  for (const t of targetTokens) {
    if (fileTokens.includes(t)) hits += 1;
  }

  return hits / targetTokens.length;
}

function chooseBestFile(label, files, minScore) {
  const targetTokens = tokens(label);
  let best = null;

  for (const file of files) {
    const fileTokens = tokens(file);
    const score = overlapScore(targetTokens, fileTokens);
    if (!best || score > best.score) {
      best = { file, score };
    }
  }

  if (!best || best.score < minScore) return null;
  return best;
}

function localFileExistsFromUrl(urlPath, folderName) {
  if (!urlPath) return false;
  const prefix = `/uploads/${folderName}/`;
  if (!urlPath.startsWith(prefix)) return false;

  const filename = decodeURIComponent(urlPath.slice(prefix.length));
  if (!filename) return false;

  const fullPath = path.join(ROOT, 'uploads', folderName, filename);
  return fs.existsSync(fullPath);
}

async function mapBrands(brandFiles) {
  const [brands] = await db.query('SELECT id, name, logo_url FROM brands ORDER BY id');

  let updated = 0;
  const unresolved = [];

  for (const brand of brands) {
    const currentValid = localFileExistsFromUrl(brand.logo_url, 'brands');
    if (currentValid) continue;

    const best = chooseBestFile(brand.name, brandFiles, 0.45);
    if (!best) {
      unresolved.push({ id: brand.id, name: brand.name, current: brand.logo_url || null });
      continue;
    }

    const mappedUrl = `/uploads/brands/${encodeURIComponent(best.file)}`;
    await db.query('UPDATE brands SET logo_url = ? WHERE id = ?', [mappedUrl, brand.id]);
    updated += 1;
  }

  return { total: brands.length, updated, unresolved };
}

async function mapCars(carFiles) {
  const [cars] = await db.query(
    `SELECT c.id, c.name, c.variant, c.image_url, b.name AS brand_name
     FROM cars c
     JOIN brands b ON b.id = c.brand_id
     WHERE c.is_active = TRUE
     ORDER BY c.id`
  );

  let updated = 0;
  const unresolved = [];

  for (const car of cars) {
    const currentValid = localFileExistsFromUrl(car.image_url, 'cars');
    if (currentValid) continue;

    const primaryLabel = `${car.brand_name} ${car.name} ${car.variant || ''}`.trim();
    const fallbackLabel = `${car.name} ${car.variant || ''}`.trim();

    const bestPrimary = chooseBestFile(primaryLabel, carFiles, 0.40);
    const bestFallback = chooseBestFile(fallbackLabel, carFiles, 0.55);

    const best = bestPrimary || bestFallback;

    if (!best) {
      unresolved.push({
        id: car.id,
        name: car.name,
        variant: car.variant || null,
        brand: car.brand_name,
        current: car.image_url || null,
      });
      continue;
    }

    const mappedUrl = `/uploads/cars/${encodeURIComponent(best.file)}`;
    await db.query('UPDATE cars SET image_url = ? WHERE id = ?', [mappedUrl, car.id]);
    updated += 1;
  }

  return { total: cars.length, updated, unresolved };
}

(async () => {
  try {
    const brandFiles = listFiles(BRANDS_DIR);
    const carFiles = listFiles(CARS_DIR);

    const brandStats = await mapBrands(brandFiles);
    const carStats = await mapCars(carFiles);

    const report = {
      timestamp: new Date().toISOString(),
      files: {
        brandFiles: brandFiles.length,
        carFiles: carFiles.length,
      },
      brands: brandStats,
      cars: carStats,
    };

    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

    console.log('[autoMapImages] Done');
    console.log(`[autoMapImages] Brand files: ${brandFiles.length}, Car files: ${carFiles.length}`);
    console.log(`[autoMapImages] Brands updated: ${brandStats.updated}/${brandStats.total}`);
    console.log(`[autoMapImages] Cars updated: ${carStats.updated}/${carStats.total}`);
    console.log(`[autoMapImages] Brand unresolved: ${brandStats.unresolved.length}`);
    console.log(`[autoMapImages] Car unresolved: ${carStats.unresolved.length}`);
    console.log(`[autoMapImages] Report: ${REPORT_PATH}`);
  } catch (err) {
    console.error('[autoMapImages] Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
})();
