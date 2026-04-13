require('dotenv').config();

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const REPORT_PATH = path.join(__dirname, 'brand-logo-fetch-report.json');
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokens(text) {
  return normalize(text).split(' ').filter(Boolean);
}

function scoreCandidate(brandName, candidate) {
  const brandTokens = tokens(brandName);
  const title = normalize(candidate.title);
  let score = 0;

  if (title.includes('logo')) score += 3;
  if (title.includes('brand')) score += 0.5;
  if (title.includes('wordmark')) score += 2;
  if (title.includes('emblem')) score += 1;
  if (title.includes('roundel')) score += 1.5;
  if (title.includes('symbol')) score += 1.25;

  for (const token of brandTokens) {
    if (token.length > 1 && title.includes(token)) score += 1;
  }

  if (title.split(' ').length <= 4) score += 0.5;
  if (/svg$/i.test(candidate.title)) score += 0.75;
  if (/png$/i.test(candidate.title)) score += 0.5;

  const penalties = [
    'front', 'rear', 'vehicle', 'car', 'road', 'country', 'dealer', 'show',
    'bank', 'motorsport', 'museum', 'engine', 'wheel', 'interior', 'pickup',
    'sportage', 'faw', 'samsung', 'jiangxi', 'toulousaine'
  ];

  for (const word of penalties) {
    if (title.includes(word)) score -= 1;
  }

  return score;
}

async function searchCommons(brandName) {
  const query = `${brandName} logo`;
  const url = new URL(COMMONS_API);
  url.searchParams.set('action', 'query');
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');
  url.searchParams.set('generator', 'search');
  url.searchParams.set('gsrsearch', query);
  url.searchParams.set('gsrnamespace', '6');
  url.searchParams.set('gsrlimit', '10');
  url.searchParams.set('prop', 'imageinfo');
  url.searchParams.set('iiprop', 'url|mime');
  url.searchParams.set('iiurlwidth', '800');

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Commons API error ${response.status}`);
  }

  const payload = await response.json();
  const pages = payload?.query?.pages || {};
  const candidates = Object.values(pages)
    .map((page) => {
      const imageinfo = page.imageinfo?.[0];
      return {
        title: page.title,
        url: imageinfo?.thumburl || imageinfo?.url || null,
        mime: imageinfo?.mime || null,
      };
    })
    .filter((item) => item.url);

  candidates.sort((a, b) => scoreCandidate(brandName, b) - scoreCandidate(brandName, a));
  return candidates;
}

(async () => {
  try {
    const [brands] = await db.query('SELECT id, name, logo_url FROM brands ORDER BY name');
    const summary = [];
    let updated = 0;
    let skipped = 0;

    for (const brand of brands) {
      const candidates = await searchCommons(brand.name);
      const best = candidates[0] || null;

      if (!best) {
        summary.push({ id: brand.id, name: brand.name, status: 'missing', current: brand.logo_url || null });
        skipped += 1;
        continue;
      }

      const bestScore = scoreCandidate(brand.name, best);
      if (bestScore < 2.5) {
        summary.push({ id: brand.id, name: brand.name, status: 'low-confidence', candidate: best.title, url: best.url, score: bestScore });
        skipped += 1;
        continue;
      }

      await db.query('UPDATE brands SET logo_url = ? WHERE id = ?', [best.url, brand.id]);
      updated += 1;
      summary.push({ id: brand.id, name: brand.name, status: 'updated', candidate: best.title, url: best.url, score: bestScore });
    }

    const report = {
      timestamp: new Date().toISOString(),
      updated,
      skipped,
      brands: summary,
    };

    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
    console.log(`[fetchBrandLogos] Updated ${updated}/${brands.length} brands`);
    console.log(`[fetchBrandLogos] Skipped ${skipped}`);
    console.log(`[fetchBrandLogos] Report: ${REPORT_PATH}`);
  } catch (err) {
    console.error('[fetchBrandLogos] Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
})();
