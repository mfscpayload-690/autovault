const db = require('../config/db');

exports.search = async (req, res) => {
  try {
    const { q = '', limit = 8 } = req.query;
    const searchTerm = q.trim();
    const parsedLimit = Math.max(1, Math.min(parseInt(limit, 10) || 8, 20));

    if (!searchTerm) {
      return res.json([]);
    }

    // Try FULLTEXT search first. If this fails for any DB reason, continue with LIKE fallback.
    try {
      const [fulltext] = await db.query(
        `SELECT v.id, v.car_name, v.brand_name, v.brand_logo, v.body_type, v.fuel_type, v.image_url
         FROM cars c
         JOIN car_full_spec_view v ON v.id = c.id
         WHERE MATCH(c.name, c.variant) AGAINST(? IN BOOLEAN MODE)
         LIMIT ?`,
        [`${searchTerm}*`, parsedLimit]
      );

      if (fulltext.length > 0) {
        return res.json(fulltext);
      }
    } catch (fulltextErr) {
      console.warn('FULLTEXT search failed, using LIKE fallback:', fulltextErr.message);
    }

    // Fallback to LIKE
    const [likeResults] = await db.query(
      `SELECT id, car_name, brand_name, brand_logo, body_type, fuel_type, image_url
       FROM car_full_spec_view
       WHERE car_name LIKE CONCAT('%', ?, '%') OR brand_name LIKE CONCAT('%', ?, '%')
       LIMIT ?`,
      [searchTerm, searchTerm, parsedLimit]
    );

    res.json(likeResults);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
};
