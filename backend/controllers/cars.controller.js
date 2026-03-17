const db = require('../config/db');

exports.list = async (req, res) => {
  try {
    const {
      brand, fuel, body_type, minPrice, maxPrice,
      transmission, year, page = 1, limit = 12,
    } = req.query;

    let sql = 'SELECT * FROM car_full_spec_view WHERE 1=1';
    const params = [];

    if (brand) {
      sql += ' AND brand_name = ?';
      params.push(brand);
    }
    if (fuel) {
      sql += ' AND fuel_type = ?';
      params.push(fuel);
    }
    if (body_type) {
      sql += ' AND body_type = ?';
      params.push(body_type);
    }
    if (minPrice) {
      sql += ' AND price_min_lakh >= ?';
      params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      sql += ' AND price_max_lakh <= ?';
      params.push(parseFloat(maxPrice));
    }
    if (transmission) {
      sql += ' AND transmission_type LIKE ?';
      params.push(`%${transmission}%`);
    }
    if (year) {
      sql += ' AND launch_year = ?';
      params.push(parseInt(year, 10));
    }

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit, 10), offset);

    const [rows] = await db.query(sql, params);

    // Count total for pagination
    let countQuery = 'SELECT COUNT(*) AS total FROM car_full_spec_view WHERE 1=1';
    const cParams = [];
    if (brand) { countQuery += ' AND brand_name = ?'; cParams.push(brand); }
    if (fuel) { countQuery += ' AND fuel_type = ?'; cParams.push(fuel); }
    if (body_type) { countQuery += ' AND body_type = ?'; cParams.push(body_type); }
    if (minPrice) { countQuery += ' AND price_min_lakh >= ?'; cParams.push(parseFloat(minPrice)); }
    if (maxPrice) { countQuery += ' AND price_max_lakh <= ?'; cParams.push(parseFloat(maxPrice)); }
    if (transmission) { countQuery += ' AND transmission_type LIKE ?'; cParams.push(`%${transmission}%`); }
    if (year) { countQuery += ' AND launch_year = ?'; cParams.push(parseInt(year, 10)); }

    const [countResult] = await db.query(countQuery, cParams);
    const total = countResult[0].total;

    res.json({
      cars: rows,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    console.error('Cars list error:', err);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM car_full_spec_view WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Car detail error:', err);
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};

exports.getFeatures = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT f.id, f.feature_name, f.category
       FROM car_features cf
       JOIN features f ON cf.feature_id = f.id
       WHERE cf.car_id = ?
       ORDER BY f.category, f.feature_name`,
      [req.params.id]
    );

    res.json(rows);
  } catch (err) {
    console.error('Car features error:', err);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
};

exports.getBadges = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, car_name,
        RANK() OVER (ORDER BY fuel_efficiency_kmpl DESC) AS efficiency_rank,
        RANK() OVER (ORDER BY acceleration_0_100_sec ASC) AS acceleration_rank,
        RANK() OVER (ORDER BY boot_space_litres DESC) AS boot_rank,
        RANK() OVER (ORDER BY range_km DESC) AS ev_range_rank
      FROM car_full_spec_view
    `);

    const badgeMap = {};
    for (const row of rows) {
      const badges = [];
      if (row.efficiency_rank === 1) badges.push('Most Fuel Efficient');
      if (row.acceleration_rank === 1) badges.push('Fastest 0–100');
      if (row.boot_rank === 1) badges.push('Largest Boot');
      if (row.ev_range_rank === 1) badges.push('Best EV Range');
      if (badges.length > 0) {
        badgeMap[row.id] = badges;
      }
    }

    res.json(badgeMap);
  } catch (err) {
    console.error('Badges error:', err);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};
