const db = require('../config/db');

exports.list = async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM brands ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error('Brands list error:', err);
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
};
