const db = require('../config/db');
const path = require('path');
const multer = require('multer');

// --- Multer config ---
const carStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '../uploads/cars')),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const brandStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '../uploads/brands')),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const uploadCar = multer({ storage: carStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadBrand = multer({ storage: brandStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// --- Audit log helper ---
async function logAudit(adminId, action, table, recordId, details) {
  await db.query(
    'INSERT INTO audit_log (admin_id, action, table_affected, record_id, details) VALUES (?, ?, ?, ?, ?)',
    [adminId, action, table, recordId, JSON.stringify(details)]
  );
}

// ==================== CARS ====================

exports.uploadCarImage = uploadCar.single('image');
exports.uploadBrandImage = uploadBrand.single('image');

exports.createCar = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const {
      brand_id, body_type_id, fuel_type_id, name, variant,
      launch_year, price_min_lakh, price_max_lakh, image_url, description,
      // engine specs
      displacement_cc, cylinders, max_power_bhp, max_torque_nm,
      compression_ratio, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins,
      // performance specs
      top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl, range_km,
      // transmission specs
      transmission_type, num_gears, drive_type,
      // dimensions
      length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg,
      boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres,
    } = req.body;

    const finalImageUrl = req.file ? `/uploads/cars/${req.file.filename}` : (image_url || null);

    const [carResult] = await conn.query(
      `INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant,
        launch_year, price_min_lakh, price_max_lakh, image_url, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [brand_id, body_type_id, fuel_type_id, name, variant,
        launch_year, price_min_lakh, price_max_lakh, finalImageUrl, description]
    );
    const carId = carResult.insertId;

    await conn.query(
      `INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm,
        compression_ratio, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [carId, displacement_cc || null, cylinders || null, max_power_bhp || null, max_torque_nm || null,
        compression_ratio || null, engine_type || null, battery_kwh || null, charge_time_ac_hrs || null, charge_time_dc_mins || null]
    );

    await conn.query(
      `INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl, range_km)
       VALUES (?, ?, ?, ?, ?)`,
      [carId, top_speed_kmh || null, acceleration_0_100_sec || null, fuel_efficiency_kmpl || null, range_km || null]
    );

    await conn.query(
      `INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
       VALUES (?, ?, ?, ?)`,
      [carId, transmission_type || null, num_gears || null, drive_type || null]
    );

    await conn.query(
      `INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm,
        kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [carId, length_mm || null, width_mm || null, height_mm || null, wheelbase_mm || null,
        kerb_weight_kg || null, boot_space_litres || null, seating_capacity || null, ground_clearance_mm || null, fuel_tank_litres || null]
    );

    await conn.commit();

    await logAudit(req.user.id, 'CREATE', 'cars', carId, { name, variant });

    res.status(201).json({ id: carId, message: 'Car created successfully' });
  } catch (err) {
    await conn.rollback();
    console.error('Create car error:', err);
    res.status(500).json({ error: 'Failed to create car' });
  } finally {
    conn.release();
  }
};

exports.updateCar = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const carId = req.params.id;
    const {
      brand_id, body_type_id, fuel_type_id, name, variant,
      launch_year, price_min_lakh, price_max_lakh, image_url, description,
      displacement_cc, cylinders, max_power_bhp, max_torque_nm,
      compression_ratio, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins,
      top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl, range_km,
      transmission_type, num_gears, drive_type,
      length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg,
      boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres,
    } = req.body;

    const finalImageUrl = req.file ? `/uploads/cars/${req.file.filename}` : (image_url || null);

    await conn.query(
      `UPDATE cars SET brand_id=?, body_type_id=?, fuel_type_id=?, name=?, variant=?,
        launch_year=?, price_min_lakh=?, price_max_lakh=?, image_url=?, description=?
       WHERE id=?`,
      [brand_id, body_type_id, fuel_type_id, name, variant,
        launch_year, price_min_lakh, price_max_lakh, finalImageUrl, description, carId]
    );

    await conn.query(
      `UPDATE engine_specs SET displacement_cc=?, cylinders=?, max_power_bhp=?, max_torque_nm=?,
        compression_ratio=?, engine_type=?, battery_kwh=?, charge_time_ac_hrs=?, charge_time_dc_mins=?
       WHERE car_id=?`,
      [displacement_cc || null, cylinders || null, max_power_bhp || null, max_torque_nm || null,
        compression_ratio || null, engine_type || null, battery_kwh || null, charge_time_ac_hrs || null, charge_time_dc_mins || null, carId]
    );

    await conn.query(
      `UPDATE performance_specs SET top_speed_kmh=?, acceleration_0_100_sec=?, fuel_efficiency_kmpl=?, range_km=?
       WHERE car_id=?`,
      [top_speed_kmh || null, acceleration_0_100_sec || null, fuel_efficiency_kmpl || null, range_km || null, carId]
    );

    await conn.query(
      `UPDATE transmission_specs SET transmission_type=?, num_gears=?, drive_type=?
       WHERE car_id=?`,
      [transmission_type || null, num_gears || null, drive_type || null, carId]
    );

    await conn.query(
      `UPDATE dimensions SET length_mm=?, width_mm=?, height_mm=?, wheelbase_mm=?,
        kerb_weight_kg=?, boot_space_litres=?, seating_capacity=?, ground_clearance_mm=?, fuel_tank_litres=?
       WHERE car_id=?`,
      [length_mm || null, width_mm || null, height_mm || null, wheelbase_mm || null,
        kerb_weight_kg || null, boot_space_litres || null, seating_capacity || null, ground_clearance_mm || null, fuel_tank_litres || null, carId]
    );

    await conn.commit();

    await logAudit(req.user.id, 'UPDATE', 'cars', parseInt(carId), { name, variant });

    res.json({ message: 'Car updated successfully' });
  } catch (err) {
    await conn.rollback();
    console.error('Update car error:', err);
    res.status(500).json({ error: 'Failed to update car' });
  } finally {
    conn.release();
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    // Soft delete
    await db.query('UPDATE cars SET is_active = FALSE WHERE id = ?', [carId]);
    await logAudit(req.user.id, 'DELETE', 'cars', parseInt(carId), { soft_delete: true });
    res.json({ message: 'Car deactivated successfully' });
  } catch (err) {
    console.error('Delete car error:', err);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};

// ==================== BRANDS ====================

exports.createBrand = async (req, res) => {
  try {
    const { name, country, logo_url, founded_year } = req.body;
    const finalLogo = req.file ? `/uploads/brands/${req.file.filename}` : (logo_url || null);

    const [result] = await db.query(
      'INSERT INTO brands (name, country, logo_url, founded_year) VALUES (?, ?, ?, ?)',
      [name, country, finalLogo, founded_year]
    );

    await logAudit(req.user.id, 'CREATE', 'brands', result.insertId, { name });

    res.status(201).json({ id: result.insertId, message: 'Brand created successfully' });
  } catch (err) {
    console.error('Create brand error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Brand already exists' });
    }
    res.status(500).json({ error: 'Failed to create brand' });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const { name, country, logo_url, founded_year } = req.body;
    const finalLogo = req.file ? `/uploads/brands/${req.file.filename}` : (logo_url || null);

    await db.query(
      'UPDATE brands SET name=?, country=?, logo_url=?, founded_year=? WHERE id=?',
      [name, country, finalLogo, founded_year, brandId]
    );

    await logAudit(req.user.id, 'UPDATE', 'brands', parseInt(brandId), { name });

    res.json({ message: 'Brand updated successfully' });
  } catch (err) {
    console.error('Update brand error:', err);
    res.status(500).json({ error: 'Failed to update brand' });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id;

    // Check if brand has linked cars
    const [cars] = await db.query('SELECT id FROM cars WHERE brand_id = ? LIMIT 1', [brandId]);
    if (cars.length > 0) {
      return res.status(400).json({ error: 'Cannot delete brand with linked cars' });
    }

    await db.query('DELETE FROM brands WHERE id = ?', [brandId]);
    await logAudit(req.user.id, 'DELETE', 'brands', parseInt(brandId), {});

    res.json({ message: 'Brand deleted successfully' });
  } catch (err) {
    console.error('Delete brand error:', err);
    res.status(500).json({ error: 'Failed to delete brand' });
  }
};

// ==================== FEATURES ====================

exports.createFeature = async (req, res) => {
  try {
    const { feature_name, category } = req.body;
    const [result] = await db.query(
      'INSERT INTO features (feature_name, category) VALUES (?, ?)',
      [feature_name, category]
    );

    await logAudit(req.user.id, 'CREATE', 'features', result.insertId, { feature_name, category });

    res.status(201).json({ id: result.insertId, message: 'Feature created successfully' });
  } catch (err) {
    console.error('Create feature error:', err);
    res.status(500).json({ error: 'Failed to create feature' });
  }
};

exports.listFeatures = async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, feature_name, category FROM features ORDER BY category, feature_name'
    );
    res.json(rows);
  } catch (err) {
    console.error('List features error:', err);
    res.status(500).json({ error: 'Failed to fetch features' });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const featureId = req.params.id;
    await db.query('DELETE FROM features WHERE id = ?', [featureId]);
    await logAudit(req.user.id, 'DELETE', 'features', parseInt(featureId), {});
    res.json({ message: 'Feature deleted successfully' });
  } catch (err) {
    console.error('Delete feature error:', err);
    res.status(500).json({ error: 'Failed to delete feature' });
  }
};

exports.updateCarFeatures = async (req, res) => {
  try {
    const carId = req.params.id;
    const { feature_ids } = req.body;

    // Delete existing and re-insert
    await db.query('DELETE FROM car_features WHERE car_id = ?', [carId]);

    if (feature_ids && feature_ids.length > 0) {
      const values = feature_ids.map(fid => [parseInt(carId), fid]);
      await db.query('INSERT INTO car_features (car_id, feature_id) VALUES ?', [values]);
    }

    await logAudit(req.user.id, 'UPDATE', 'car_features', parseInt(carId), { feature_ids });

    res.json({ message: 'Car features updated' });
  } catch (err) {
    console.error('Update car features error:', err);
    res.status(500).json({ error: 'Failed to update features' });
  }
};

// ==================== USERS ====================

exports.listUsers = async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, role, is_active, created_at, last_login FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.toggleUserActive = async (req, res) => {
  try {
    const userId = req.params.id;
    await db.query('UPDATE users SET is_active = NOT is_active WHERE id = ?', [userId]);

    const [rows] = await db.query('SELECT id, name, is_active FROM users WHERE id = ?', [userId]);
    await logAudit(req.user.id, 'UPDATE', 'users', parseInt(userId), { is_active: rows[0]?.is_active });

    res.json({ message: 'User status toggled', user: rows[0] });
  } catch (err) {
    console.error('Toggle user error:', err);
    res.status(500).json({ error: 'Failed to toggle user' });
  }
};

// ==================== AUDIT LOG ====================

exports.getAuditLog = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [rows] = await db.query(
      `SELECT al.*, u.name AS admin_name
       FROM audit_log al
       JOIN users u ON al.admin_id = u.id
       ORDER BY al.performed_at DESC
       LIMIT ? OFFSET ?`,
      [parseInt(limit, 10), offset]
    );

    const [countResult] = await db.query('SELECT COUNT(*) AS total FROM audit_log');
    const total = countResult[0].total;

    res.json({
      logs: rows,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    console.error('Audit log error:', err);
    res.status(500).json({ error: 'Failed to fetch audit log' });
  }
};
