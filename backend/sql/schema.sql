-- ============================================================
--  AutoVault — MySQL 8 Schema
--  KTU S4 DBMS Micro Project | PCCST402
--  Team: Aravind Lal, Aaromal V, Abhishek H, Alen Sajan, Madhav S, Sreeram S Nair
-- ============================================================

CREATE DATABASE IF NOT EXISTS autovault;
USE autovault;

-- --------------------------------------------------------
-- 1. brands
-- --------------------------------------------------------
CREATE TABLE brands (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL UNIQUE,
  country      VARCHAR(100),
  logo_url     VARCHAR(500),
  founded_year INT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- 2. body_types
-- --------------------------------------------------------
CREATE TABLE body_types (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  type_name VARCHAR(50) NOT NULL UNIQUE
);

-- --------------------------------------------------------
-- 3. fuel_types
-- --------------------------------------------------------
CREATE TABLE fuel_types (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  fuel_name   VARCHAR(50) NOT NULL UNIQUE,
  is_electric BOOLEAN DEFAULT FALSE
);

-- --------------------------------------------------------
-- 4. cars (core)
-- --------------------------------------------------------
CREATE TABLE cars (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  brand_id         INT NOT NULL,
  body_type_id     INT NOT NULL,
  fuel_type_id     INT NOT NULL,
  name             VARCHAR(150) NOT NULL,
  variant          VARCHAR(100),
  launch_year      INT,
  price_min_lakh   DECIMAL(6,2),
  price_max_lakh   DECIMAL(6,2),
  image_url        VARCHAR(500),
  description      TEXT,
  is_active        BOOLEAN DEFAULT TRUE,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id)     REFERENCES brands(id)     ON DELETE RESTRICT,
  FOREIGN KEY (body_type_id) REFERENCES body_types(id) ON DELETE RESTRICT,
  FOREIGN KEY (fuel_type_id) REFERENCES fuel_types(id) ON DELETE RESTRICT
);

ALTER TABLE cars ADD FULLTEXT INDEX ft_search (name, variant);

-- --------------------------------------------------------
-- 5. engine_specs
-- --------------------------------------------------------
CREATE TABLE engine_specs (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  car_id              INT NOT NULL UNIQUE,
  displacement_cc     INT,
  cylinders           INT,
  max_power_bhp       DECIMAL(6,2),
  max_torque_nm       DECIMAL(7,2),
  compression_ratio   VARCHAR(20),
  engine_type         VARCHAR(100),
  battery_kwh         DECIMAL(6,2),
  charge_time_ac_hrs  DECIMAL(4,1),
  charge_time_dc_mins INT,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- 6. performance_specs
-- --------------------------------------------------------
CREATE TABLE performance_specs (
  id                      INT AUTO_INCREMENT PRIMARY KEY,
  car_id                  INT NOT NULL UNIQUE,
  top_speed_kmh           INT,
  acceleration_0_100_sec  DECIMAL(4,1),
  fuel_efficiency_kmpl    DECIMAL(5,2),
  range_km                INT,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- 7. transmission_specs
-- --------------------------------------------------------
CREATE TABLE transmission_specs (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  car_id            INT NOT NULL UNIQUE,
  transmission_type VARCHAR(50),
  num_gears         INT,
  drive_type        VARCHAR(20),
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- 8. dimensions
-- --------------------------------------------------------
CREATE TABLE dimensions (
  id                   INT AUTO_INCREMENT PRIMARY KEY,
  car_id               INT NOT NULL UNIQUE,
  length_mm            INT,
  width_mm             INT,
  height_mm            INT,
  wheelbase_mm         INT,
  kerb_weight_kg       INT,
  boot_space_litres    INT,
  seating_capacity     INT,
  ground_clearance_mm  INT,
  fuel_tank_litres     INT,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- 9. features (master list)
-- --------------------------------------------------------
CREATE TABLE features (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  feature_name VARCHAR(150) NOT NULL UNIQUE,
  category     ENUM('Safety','Comfort','Technology','Infotainment','Exterior','Interior') NOT NULL
);

-- --------------------------------------------------------
-- 10. car_features (M:N)
-- --------------------------------------------------------
CREATE TABLE car_features (
  car_id     INT NOT NULL,
  feature_id INT NOT NULL,
  PRIMARY KEY (car_id, feature_id),
  FOREIGN KEY (car_id)     REFERENCES cars(id)     ON DELETE CASCADE,
  FOREIGN KEY (feature_id) REFERENCES features(id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- 11. users
-- --------------------------------------------------------
CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  email         VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('user','admin') DEFAULT 'user',
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login    TIMESTAMP NULL
);

-- --------------------------------------------------------
-- 12. audit_log
-- --------------------------------------------------------
CREATE TABLE audit_log (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  admin_id        INT NOT NULL,
  action          ENUM('CREATE','UPDATE','DELETE') NOT NULL,
  table_affected  VARCHAR(100) NOT NULL,
  record_id       INT,
  details         JSON,
  performed_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id)
);

-- ============================================================
-- TRIGGER — auto updated_at on brands
-- ============================================================
DELIMITER //
CREATE TRIGGER before_brand_update
BEFORE UPDATE ON brands
FOR EACH ROW
BEGIN
  SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- ============================================================
-- VIEW — car_full_spec_view (joins 7 tables)
-- ============================================================
CREATE VIEW car_full_spec_view AS
SELECT
  c.id,
  c.name             AS car_name,
  c.variant,
  c.launch_year,
  c.price_min_lakh,
  c.price_max_lakh,
  c.image_url,
  c.description,
  b.name             AS brand_name,
  b.logo_url         AS brand_logo,
  b.country          AS brand_country,
  bt.type_name       AS body_type,
  ft.fuel_name       AS fuel_type,
  ft.is_electric,
  e.displacement_cc,
  e.cylinders,
  e.max_power_bhp,
  e.max_torque_nm,
  e.engine_type,
  e.battery_kwh,
  e.charge_time_ac_hrs,
  e.charge_time_dc_mins,
  p.top_speed_kmh,
  p.acceleration_0_100_sec,
  p.fuel_efficiency_kmpl,
  p.range_km,
  t.transmission_type,
  t.num_gears,
  t.drive_type,
  d.length_mm,
  d.width_mm,
  d.height_mm,
  d.wheelbase_mm,
  d.kerb_weight_kg,
  d.boot_space_litres,
  d.seating_capacity,
  d.ground_clearance_mm,
  d.fuel_tank_litres
FROM cars c
JOIN  brands         b  ON c.brand_id     = b.id
JOIN  body_types     bt ON c.body_type_id = bt.id
JOIN  fuel_types     ft ON c.fuel_type_id = ft.id
LEFT JOIN engine_specs      e ON c.id = e.car_id
LEFT JOIN performance_specs p ON c.id = p.car_id
LEFT JOIN transmission_specs t ON c.id = t.car_id
LEFT JOIN dimensions        d ON c.id = d.car_id
WHERE c.is_active = TRUE;

-- ============================================================
-- STORED PROCEDURE — compare_cars(id1, id2, id3)
-- ============================================================
DELIMITER //
CREATE PROCEDURE compare_cars(IN id1 INT, IN id2 INT, IN id3 INT)
BEGIN
  SELECT * FROM car_full_spec_view
  WHERE id IN (id1, id2, id3)
  ORDER BY FIELD(id, id1, id2, id3);
END //
DELIMITER ;

-- ============================================================
-- WINDOW FUNCTION QUERY — spec badges (run via API, cache result)
-- Usage: call this from /api/badges endpoint
-- ============================================================
-- SELECT
--   id, car_name,
--   RANK() OVER (ORDER BY fuel_efficiency_kmpl DESC)  AS efficiency_rank,
--   RANK() OVER (ORDER BY acceleration_0_100_sec ASC) AS acceleration_rank,
--   RANK() OVER (ORDER BY boot_space_litres DESC)     AS boot_rank,
--   RANK() OVER (ORDER BY range_km DESC)              AS ev_range_rank
-- FROM car_full_spec_view;

-- ============================================================
-- DEFAULT LOOKUPS — body_types & fuel_types
-- ============================================================
INSERT INTO body_types (type_name) VALUES
  ('Hatchback'), ('Sedan'), ('SUV'), ('Compact SUV'),
  ('MPV'), ('Coupe'), ('Convertible'), ('Pickup Truck'),
  ('EV Hatchback'), ('EV SUV'), ('EV Sedan');

INSERT INTO fuel_types (fuel_name, is_electric) VALUES
  ('Petrol',   FALSE),
  ('Diesel',   FALSE),
  ('CNG',      FALSE),
  ('Hybrid',   FALSE),
  ('Electric', TRUE);

-- ============================================================
-- FEATURES MASTER LIST
-- ============================================================
INSERT INTO features (feature_name, category) VALUES
  ('ABS (Anti-lock Braking System)', 'Safety'),
  ('6 Airbags', 'Safety'),
  ('Electronic Stability Control', 'Safety'),
  ('Rear Parking Camera', 'Safety'),
  ('Traction Control', 'Safety'),
  ('ISOFIX Child Seat Anchors', 'Safety'),
  ('Hill Start Assist', 'Safety'),
  ('Blind Spot Monitor', 'Safety'),
  ('Lane Departure Warning', 'Safety'),
  ('Sunroof / Moonroof', 'Comfort'),
  ('Leather Seats', 'Comfort'),
  ('Ventilated Front Seats', 'Comfort'),
  ('Auto Climate Control', 'Comfort'),
  ('Rear AC Vents', 'Comfort'),
  ('Wireless Charger', 'Technology'),
  ('Keyless Entry', 'Technology'),
  ('Push Button Start', 'Technology'),
  ('Connected Car App', 'Technology'),
  ('OTA Software Updates', 'Technology'),
  ('10-inch Touchscreen', 'Infotainment'),
  ('Android Auto / Apple CarPlay', 'Infotainment'),
  ('6-speaker Sound System', 'Infotainment'),
  ('Voice Commands', 'Infotainment'),
  ('Navigation (Built-in)', 'Infotainment'),
  ('LED Headlamps', 'Exterior'),
  ('LED DRLs', 'Exterior'),
  ('17-inch Alloy Wheels', 'Exterior'),
  ('Shark Fin Antenna', 'Exterior'),
  ('Adjustable Steering Column', 'Interior'),
  ('Flat-bottom Steering Wheel', 'Interior'),
  ('Auto-dimming IRVM', 'Interior'),
  ('Ambient Lighting', 'Interior');

-- ============================================================
-- DEFAULT ADMIN USER (password: Admin@1234 — change immediately)
-- bcrypt hash of "Admin@1234" with 12 rounds
-- ============================================================
INSERT INTO users (name, email, password_hash, role) VALUES (
  'AutoVault Admin',
  'admin@autovault.local',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMVBiIFQbGbPvFPIbgz7p2SoSi',
  'admin'
);
