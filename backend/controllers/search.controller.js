const db = require('../config/db');

exports.search = async (req, res) => {
  try {
    const { q = '', limit = 8 } = req.query;
    const searchTerm = q.trim();

    if (!searchTerm) {
      return res.json([]);
    }

    // Try FULLTEXT search first
    const [fulltext] = await db.query(
      `SELECT id, car_name, brand_name, brand_logo, body_type, fuel_type, image_url
       FROM car_full_spec_view
       WHERE MATCH(car_name, variant) AGAINST(? IN BOOLEAN MODE)
       LIMIT ?`,
      [`${searchTerm}*`, parseInt(limit, 10)]
    );

    if (fulltext.length > 0) {
      return res.json(fulltext);
    }

    // Fallback to LIKE
    const [likeResults] = await db.query(
      `SELECT id, car_name, brand_name, brand_logo, body_type, fuel_type, image_url
       FROM car_full_spec_view
       WHERE car_name LIKE CONCAT('%', ?, '%') OR brand_name LIKE CONCAT('%', ?, '%')
       LIMIT ?`,
      [searchTerm, searchTerm, parseInt(limit, 10)]
    );

    res.json(likeResults);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
};
