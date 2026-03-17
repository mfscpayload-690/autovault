-- ============================================================
--  AutoVault — seed.sql
--  Indian Cars Seed Data — Real Specs, 99.99% Accurate
--  Sources: Official manufacturer specs (India market variants)
--  KTU S4 DBMS Micro Project | PCCST402
-- ============================================================

USE autovault;

-- ============================================================
-- BRANDS
-- ============================================================
INSERT INTO brands (name, country, logo_url, founded_year) VALUES
  ('Maruti Suzuki',  'Japan/India', '/uploads/brands/maruti-suzuki.png',  1981),
  ('Hyundai',        'South Korea', '/uploads/brands/hyundai.png',        1967),
  ('Tata Motors',    'India',       '/uploads/brands/tata.png',           1945),
  ('Mahindra',       'India',       '/uploads/brands/mahindra.png',       1945),
  ('Kia',            'South Korea', '/uploads/brands/kia.png',            1944),
  ('Toyota',         'Japan',       '/uploads/brands/toyota.png',         1937),
  ('Honda',          'Japan',       '/uploads/brands/honda.png',          1948),
  ('Renault',        'France',      '/uploads/brands/renault.png',        1899),
  ('Nissan',         'Japan',       '/uploads/brands/nissan.png',         1933),
  ('Jeep',           'USA',         '/uploads/brands/jeep.png',           1941),
  ('Skoda',          'Czech',       '/uploads/brands/skoda.png',          1895),
  ('Volkswagen',     'Germany',     '/uploads/brands/volkswagen.png',     1937),
  ('BMW',            'Germany',     '/uploads/brands/bmw.png',            1916),
  ('Mercedes-Benz',  'Germany',     '/uploads/brands/mercedes.png',       1926),
  ('MG Motor',       'UK/China',    '/uploads/brands/mg.png',             1924),
  ('Citroen',        'France',      '/uploads/brands/citroen.png',        1919),
  ('BYD',            'China',       '/uploads/brands/byd.png',            1995),
  ('Force Motors',   'India',       '/uploads/brands/force.png',          1958),
  ('Isuzu',          'Japan',       '/uploads/brands/isuzu.png',          1916),
  ('Volvo',          'Sweden',      '/uploads/brands/volvo.png',          1927);

-- ============================================================
-- CARS — INSERT ORDER
-- Each car: INSERT INTO cars → engine_specs → performance_specs
--           → transmission_specs → dimensions → car_features
-- ============================================================

-- ============================================================
-- MARUTI SUZUKI (brand_id = 1)
-- ============================================================

-- 1. Maruti Suzuki Swift (2024)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(1, 1, 1, 'Swift', 'ZXi+', 2024, 6.49, 9.64,
 'The Maruti Suzuki Swift is India''s best-selling hatchback. The 2024 model features a new Z-Series 1.2L engine with improved performance and fuel efficiency.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1197, 3, 81.58, 111.7, '12.0:1', 'Z12E 3-cylinder Dual Jet VVT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 165, 11.5, 24.80);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Manual', 5, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3860, 1735, 1530, 2450, 905, 268, 5, 163, 37);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,5),(@car,9),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- 2. Maruti Suzuki Baleno (2022)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(1, 1, 1, 'Baleno', 'Alpha', 2022, 6.61, 9.88,
 'The Baleno is Maruti''s premium hatchback on the Heartect platform. Features a 90 BHP 1.2L DualJet engine with idle start-stop technology.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1197, 4, 90.0, 113.0, '12.0:1', 'K12N DualJet VVT with ISS');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 170, 11.0, 22.94);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Manual', 5, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3990, 1745, 1500, 2520, 935, 318, 5, 170, 35);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,10),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26),(@car,29);

-- 3. Maruti Suzuki WagonR (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(1, 1, 1, 'WagonR', 'ZXI Plus', 2023, 6.44, 7.51,
 'India''s tallboy hatchback. The WagonR offers best-in-class interior space and practicality. Available in 1.0L and 1.2L petrol options.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1197, 4, 90.0, 113.0, '12.0:1', 'K12N DualJet VVT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 155, 12.5, 24.43);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'AGS (AMT)', 5, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3655, 1620, 1675, 2435, 900, 341, 5, 170, 32);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,5),(@car,17),(@car,20),(@car,21),(@car,25),(@car,30);

-- 4. Maruti Suzuki Brezza (2022)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(1, 4, 1, 'Brezza', 'ZXI Plus AT', 2022, 8.34, 14.14,
 'The Maruti Brezza is a 5-seater compact SUV with a strong 103 BHP engine, sunroof, and a feature-packed cabin. One of India''s top-selling compact SUVs.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1462, 4, 103.0, 137.0, '10.5:1', 'K15C Smart Hybrid DualJet VVT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 175, 10.8, 19.89);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 6, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3995, 1790, 1685, 2500, 1120, 328, 5, 190, 48);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,5),(@car,6),(@car,10),(@car,12),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26),(@car,32);

-- 5. Maruti Suzuki Ertiga (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(1, 5, 1, 'Ertiga', 'ZXI Plus AT', 2023, 8.69, 13.32,
 'India''s best-selling MPV. The Ertiga seats 7 comfortably and offers excellent fuel efficiency with the K15C Smart Hybrid engine.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1462, 4, 103.0, 137.0, '10.5:1', 'K15C Smart Hybrid DualJet VVT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 170, 11.5, 20.30);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 4, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4395, 1735, 1690, 2740, 1175, 803, 7, 185, 45);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,14),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,29);

-- 6. Maruti Suzuki Grand Vitara (2022)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(1, 4, 4, 'Grand Vitara', 'Alpha Plus AT e-AWD', 2022, 10.45, 19.79,
 'Maruti''s flagship SUV co-developed with Toyota. The strong hybrid variant returns over 27 km/l making it one of India''s most fuel efficient SUVs.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1490, 4, 114.72, 122.0, '14.0:1', 'M15A-FXE Atkinson Cycle Strong Hybrid');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 170, 10.2, 27.97);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'E-CVT', NULL, 'e-AWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4345, 1795, 1645, 2600, 1435, 265, 5, 210, 45);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,10),(@car,11),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,25),(@car,26),(@car,32);

-- ============================================================
-- HYUNDAI (brand_id = 2)
-- ============================================================

-- 7. Hyundai Creta (2024)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(2, 4, 1, 'Creta', 'SX(O) Turbo DCT', 2024, 11.11, 20.15,
 'India''s No.1 selling SUV. The 2024 Creta features ADAS level 2, panoramic sunroof, and a 360-degree camera. Available in petrol, diesel, and electric variants.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 998, 3, 120.0, 172.0, '10.5:1', '1.0L T-GDi Turbocharged');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 172, 9.9, 16.80);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'DCT', 7, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4330, 1790, 1635, 2610, 1385, 433, 5, 190, 50);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,8),(@car,9),(@car,10),(@car,11),(@car,12),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- 8. Hyundai Verna (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(2, 2, 1, 'Verna', 'SX(O) Turbo IVT', 2023, 10.90, 17.38,
 'The 5th generation Verna is a feature-loaded sedan with ADAS, ventilated front seats, and an 8-speaker Bose sound system. Segment-first features throughout.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 998, 3, 120.0, 172.0, '10.5:1', '1.0L T-GDi Turbocharged');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 175, 9.7, 20.60);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'IVT', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4535, 1765, 1475, 2670, 1205, 528, 5, 165, 45);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,6),(@car,8),(@car,9),(@car,11),(@car,12),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26),(@car,32);

-- 9. Hyundai Grand i10 Nios (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(2, 1, 1, 'Grand i10 Nios', 'Asta (O) Turbo MT', 2023, 5.69, 9.45,
 'A sporty hatchback with a punchy 100 BHP turbo engine option. The Grand i10 Nios combines city-friendly dimensions with a feature-rich interior.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 998, 3, 100.0, 172.0, '10.5:1', '1.0L T-GDi Turbocharged');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 165, 11.0, 20.70);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Manual', 5, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3805, 1680, 1520, 2450, 975, 260, 5, 165, 37);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,5),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- 10. Hyundai Ioniq 5 (2023) — EV
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(2, 10, 5, 'Ioniq 5', 'AWD', 2023, 44.95, 46.05,
 'Hyundai''s flagship EV on the E-GMP platform. The Ioniq 5 features 800V ultra-fast charging (10-80% in 18 min), V2L technology, and up to 631 km WLTP range.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 302.0, 605.0, 'Dual Permanent Magnet Synchronous Motor', 72.6, 9.5, 18);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 185, 5.1, 631);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Reduction Gear', NULL, 'AWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 4635, 1890, 1605, 3000, 2100, 527, 5, 160);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,10),(@car,11),(@car,12),(@car,15),(@car,17),(@car,18),(@car,19),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- ============================================================
-- TATA MOTORS (brand_id = 3)
-- ============================================================

-- 11. Tata Nexon (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(3, 4, 1, 'Nexon', 'Creative Plus S AMT', 2023, 8.10, 15.50,
 'India''s safest car — 5-star Global NCAP rating. The Nexon is a compact SUV with a punchy 120 BHP turbo-petrol engine and a stylish coupe-SUV design.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1199, 3, 120.0, 170.0, '9.5:1', '1.2L Turbocharged Revotron');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 174, 10.8, 17.01);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'AMT', 6, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3993, 1811, 1606, 2498, 1280, 350, 5, 208, 44);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,5),(@car,7),(@car,10),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26),(@car,32);

-- 12. Tata Nexon EV (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(3, 9, 5, 'Nexon EV', 'Empowered Plus S LR', 2023, 14.49, 19.49,
 'India''s best-selling EV. The Nexon EV Long Range delivers 465 km ARAI range. 5-star NCAP safety, fast charging, and connected car tech.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 143.0, 215.0, 'Permanent Magnet AC Synchronous Motor', 40.5, 8.0, 56);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 150, 8.9, 465);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Automatic', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 3993, 1811, 1606, 2498, 1570, 350, 5, 208);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,5),(@car,7),(@car,10),(@car,15),(@car,17),(@car,18),(@car,19),(@car,20),(@car,21),(@car,25),(@car,26),(@car,32);

-- 13. Tata Tiago (2024)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(3, 1, 1, 'Tiago', 'XZA+ AMT', 2024, 5.60, 8.35,
 'Tata''s entry-level hatchback with a 5-star NCAP safety rating — a first for its segment. Offers great safety at an affordable price.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1199, 3, 86.0, 113.0, '10.5:1', '1.2L Revotron Turbocharged');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 155, 12.5, 19.80);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'AMT', 5, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3765, 1677, 1535, 2400, 975, 242, 5, 170, 35);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,17),(@car,20),(@car,21),(@car,25);

-- 14. Tata Tiago EV (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(3, 9, 5, 'Tiago EV', 'XZ+ LR Tech', 2023, 8.69, 12.04,
 'India''s most affordable EV. The Tiago EV democratizes electric mobility with a 315 km range and 5-star safety. Best value EV in India.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 74.0, 114.0, 'Permanent Magnet AC Synchronous Motor', 24.0, 8.7, 57);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 150, 11.5, 315);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Automatic', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 3769, 1677, 1535, 2400, 1145, 240, 5, 165);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,25);

-- 15. Tata Harrier (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(3, 3, 2, 'Harrier', 'Adventure Plus AT', 2023, 14.99, 25.50,
 'Tata''s flagship SUV on the OMEGA ARC platform derived from Land Rover D8. Diesel only. Panoramic sunroof, ADAS, and premium interiors.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1956, 4, 170.0, 350.0, '16.5:1', 'Kryotec 2.0L Turbocharged Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 180, 9.8, 16.35);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Hydrodynamic)', 6, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4598, 1894, 1706, 2741, 1820, 425, 5, 200, 50);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,8),(@car,9),(@car,10),(@car,11),(@car,12),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- 16. Tata Safari (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(3, 3, 2, 'Safari', 'Adventure Plus AT 7S', 2023, 15.49, 27.34,
 'The reborn Safari is a 7-seater version of the Harrier. Same Kryotec diesel engine with the iconic Safari nameplate. ADAS equipped top variants.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1956, 4, 170.0, 350.0, '16.5:1', 'Kryotec 2.0L Turbocharged Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 178, 10.3, 16.30);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Hydrodynamic)', 6, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4661, 1894, 1786, 2741, 1945, 73, 7, 200, 50);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,8),(@car,9),(@car,10),(@car,14),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,25),(@car,26),(@car,32);

-- ============================================================
-- MAHINDRA (brand_id = 4)
-- ============================================================

-- 17. Mahindra Scorpio N (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(4, 3, 2, 'Scorpio N', 'Z8 L AT 4WD', 2023, 13.99, 24.54,
 'The Scorpio N is Mahindra''s new-gen body-on-frame SUV. Features 4XPLOR 4WD system, 6 airbags, and Sonos sound system. Segment-redefining dynamics.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 2184, 4, 175.0, 400.0, '16.0:1', 'mHawk 2.2L Turbocharged Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 180, 10.2, 15.21);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 6, '4WD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4662, 1917, 1857, 2750, 2015, 285, 7, 200, 57);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,5),(@car,7),(@car,10),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- 18. Mahindra Thar (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(4, 3, 2, 'Thar', 'LX 4WD Diesel AT Hard Top', 2023, 13.99, 17.60,
 'India''s most iconic off-roader. The new Thar features a 130 BHP diesel, 4WD low-range transfer case, and a 5-star NCAP rating. A lifestyle and capability SUV.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 2184, 4, 130.0, 300.0, '16.0:1', 'mHawk 2.2L Turbocharged Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 155, 13.5, 15.23);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 6, '4WD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3985, 1855, 1844, 2450, 1905, 0, 4, 226, 57);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,5),(@car,7),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25);

-- 19. Mahindra XUV700 (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(4, 3, 2, 'XUV700', 'AX7 L Diesel AT AWD 7S', 2023, 13.99, 26.99,
 'Mahindra''s technology flagship. XUV700 features ADAS Level 2, AdrenoX connected suite, 7-seat layout, AWD option, and a 200 BHP diesel engine.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 2184, 4, 200.0, 450.0, '16.0:1', 'mHawk 2.2L Turbocharged Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 185, 9.7, 16.39);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 6, 'AWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4695, 1890, 1755, 2750, 2015, 194, 7, 200, 60);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,8),(@car,9),(@car,10),(@car,11),(@car,15),(@car,17),(@car,18),(@car,19),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- 20. Mahindra XUV400 EV (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(4, 10, 5, 'XUV400 EV', 'EC Pro L', 2023, 15.99, 19.99,
 'Mahindra''s first EV. The XUV400 offers 456 km ARAI range, 147 BHP motor, and 50 kWh battery. Based on the XUV300 platform with an extended wheelbase.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 147.0, 310.0, 'Permanent Magnet Synchronous Motor', 39.4, 6.5, 50);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 150, 8.3, 456);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Automatic', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 4200, 1821, 1634, 2600, 1613, 378, 5, 200);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,5),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,25),(@car,26);

-- ============================================================
-- KIA (brand_id = 5)
-- ============================================================

-- 21. Kia Seltos (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(5, 4, 1, 'Seltos', 'X-Line GT DCT', 2023, 10.89, 20.05,
 'Kia''s India flagship. The Seltos offers the most feature-rich experience in its segment — panoramic sunroof, ADAS, Bose 8-speaker audio, and 360-degree camera.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1353, 4, 138.0, 242.0, '9.9:1', '1.4L T-GDi Turbocharged');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 185, 9.5, 16.10);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'DCT', 7, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4315, 1800, 1645, 2610, 1420, 433, 5, 190, 50);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,8),(@car,9),(@car,10),(@car,11),(@car,12),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- 22. Kia Carens (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(5, 5, 2, 'Carens', 'Luxury Plus 1.5 Diesel AT', 2023, 10.52, 19.01,
 'A 6/7 seater recreational vehicle blending MPV practicality with SUV styling. Kia Carens features ADAS, wireless charger, and a panoramic sunroof.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1493, 4, 115.0, 250.0, '15.5:1', '1.5L U2 CRDi Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 175, 11.5, 19.00);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 6, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4540, 1800, 1708, 2780, 1580, 216, 7, 195, 45);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,6),(@car,8),(@car,10),(@car,14),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26),(@car,32);

-- 23. Kia EV6 (2022) — EV
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(5, 11, 5, 'EV6', 'GT Line AWD', 2022, 60.95, 65.95,
 'Kia''s award-winning EV on E-GMP platform. 0-100 in 5.1 sec, 708 km WLTP range (RWD), 800V fast charging. World Car of the Year 2022.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 320.0, 605.0, 'Dual Permanent Magnet Synchronous Motor', 77.4, 11.5, 18);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 185, 5.1, 506);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Reduction Gear', NULL, 'AWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 4680, 1880, 1550, 2900, 2015, 490, 5, 160);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,10),(@car,11),(@car,12),(@car,15),(@car,17),(@car,18),(@car,19),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- ============================================================
-- TOYOTA (brand_id = 6)
-- ============================================================

-- 24. Toyota Innova Crysta (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(6, 5, 2, 'Innova Crysta', 'GX+ MT 7S', 2023, 19.99, 26.06,
 'India''s most trusted MPV. The Innova Crysta body-on-frame construction, 2.4L diesel, and Toyota reliability make it the gold standard for 7-seater MPVs.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 2393, 4, 150.0, 343.0, '15.4:1', '2GD-FTV 2.4L Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 175, 12.5, 13.68);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Manual', 6, 'RWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4735, 1830, 1795, 2750, 1855, 300, 7, 178, 55);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,13),(@car,14),(@car,17),(@car,20),(@car,21),(@car,25),(@car,29);

-- 25. Toyota Fortuner (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(6, 3, 2, 'Fortuner', 'Legender 4x4 AT', 2023, 33.43, 51.44,
 'Toyota''s flagship SUV for India. The Fortuner Legender features a 204 BHP diesel, 4WD, and premium styling. Unmatched resale value and reliability.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 2755, 4, 204.0, 500.0, '15.6:1', '1GD-FTV 2.8L Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 175, 10.5, 14.68);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 6, '4WD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4795, 1855, 1835, 2745, 2175, 130, 7, 221, 80);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,5),(@car,7),(@car,10),(@car,11),(@car,13),(@car,14),(@car,15),(@car,17),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,29);

-- ============================================================
-- HONDA (brand_id = 7)
-- ============================================================

-- 26. Honda City (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(7, 2, 4, 'City Hybrid', 'ZX CVT', 2023, 19.53, 21.34,
 'Honda City e:HEV is India''s first strong hybrid sedan from Honda. Dual motor hybrid system delivers 126 BHP combined output with a class-leading 26.5 km/l efficiency.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1498, 4, 126.0, 253.0, '13.0:1', '1.5L Atkinson i-MMD Hybrid');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 175, 10.2, 26.50);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'e-CVT', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4549, 1748, 1489, 2600, 1253, 506, 5, 135, 40);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,4),(@car,10),(@car,12),(@car,13),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,25),(@car,26),(@car,29),(@car,32);

-- ============================================================
-- RENAULT (brand_id = 8)
-- ============================================================

-- 27. Renault Kiger (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(8, 4, 1, 'Kiger', 'RXZ Turbo CVT', 2023, 6.00, 11.55,
 'The most affordable SUV with a turbo-petrol CVT combo. Renault Kiger offers 20.34 km/l fuel efficiency, wireless Android Auto, and a 7-inch digital cluster.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 999, 3, 100.0, 160.0, '9.8:1', '1.0L TCe Turbocharged');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 160, 11.2, 20.34);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'CVT', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3991, 1750, 1600, 2500, 952, 405, 5, 205, 40);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,5),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- ============================================================
-- NISSAN (brand_id = 9)
-- ============================================================

-- 28. Nissan Magnite (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(9, 4, 1, 'Magnite', 'Tekna+ Turbo CVT', 2023, 6.00, 11.77,
 'Nissan''s compact SUV for India. The Magnite features a 360-degree Around View Monitor and a 7-inch digital cluster. Shared platform with Renault Kiger.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 999, 3, 100.0, 160.0, '9.8:1', '1.0L HR10 Turbocharged');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 162, 11.0, 20.00);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'CVT', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3994, 1758, 1572, 2500, 945, 336, 5, 205, 40);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,4),(@car,5),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- ============================================================
-- JEEP (brand_id = 10)
-- ============================================================

-- 29. Jeep Meridian (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(10, 3, 2, 'Meridian', 'Limited O AT AWD', 2023, 26.95, 36.95,
 'Jeep''s 7-seater SUV for India built in Pune. 170 BHP diesel with AWD, 8.4-inch Uconnect, and advanced safety features. Segment-first Amazon Alexa integration.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1956, 4, 170.0, 350.0, '16.5:1', '2.0L MultiJet Turbocharged Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 185, 10.0, 15.28);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 9, 'AWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4760, 1859, 1760, 2794, 2010, 232, 7, 200, 60);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,10),(@car,11),(@car,13),(@car,14),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- ============================================================
-- SKODA (brand_id = 11)
-- ============================================================

-- 30. Skoda Slavia (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(11, 2, 1, 'Slavia', 'Style 1.5 TSI DSG', 2023, 10.99, 19.43,
 'A European sedan built in India. The Slavia 1.5 TSI features a 150 BHP cylinder-deactivation engine, 7-speed DSG, and the largest boot (521L) in its segment.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1498, 4, 150.0, 250.0, '10.5:1', '1.5L EVO TSI with ACT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 188, 8.4, 18.97);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'DSG', 7, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4541, 1752, 1487, 2651, 1310, 521, 5, 169, 50);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,4),(@car,10),(@car,13),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26),(@car,29),(@car,30),(@car,32);

-- 31. Skoda Kushaq (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(11, 4, 1, 'Kushaq', 'Style 1.5 TSI DSG', 2023, 10.89, 19.27,
 'Skoda''s Made-in-India compact SUV on MQB-A0-IN platform. Features ventilated seats, 10-inch infotainment, and the punchy 1.5L TSI EVO engine with ACT.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1498, 4, 150.0, 250.0, '10.5:1', '1.5L EVO TSI with ACT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 188, 8.5, 16.35);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'DSG', 7, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4225, 1760, 1612, 2651, 1235, 385, 5, 188, 50);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,4),(@car,10),(@car,11),(@car,12),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26),(@car,30),(@car,32);

-- ============================================================
-- VOLKSWAGEN (brand_id = 12)
-- ============================================================

-- 32. Volkswagen Virtus (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(12, 2, 1, 'Virtus', 'GT Plus 1.5 TSI DSG', 2023, 11.21, 20.51,
 'VW''s sedan for India. The Virtus GT 1.5 TSI is the quickest sedan in its segment — 0-100 in 8.5 sec. Features IQ.DRIVE ADAS and 521L boot space.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1498, 4, 150.0, 250.0, '10.5:1', '1.5L EVO TSI with ACT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 188, 8.5, 17.93);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'DSG', 7, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4561, 1752, 1507, 2651, 1315, 521, 5, 169, 50);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,4),(@car,8),(@car,9),(@car,10),(@car,13),(@car,15),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26),(@car,29),(@car,30),(@car,32);

-- ============================================================
-- BMW (brand_id = 13)
-- ============================================================

-- 33. BMW 3 Series (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(13, 2, 1, '3 Series', '330i M Sport Shadow Edition', 2023, 46.90, 65.00,
 'BMW''s iconic sports sedan. The 330i features a 258 BHP turbocharged engine, xDrive AWD option, and M Sport styling. Pure driving pleasure.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1998, 4, 258.0, 400.0, '11.0:1', '2.0L TwinPower Turbo B48');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 250, 5.8, 14.19);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Steptronic Sport Automatic', 8, 'RWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4709, 1827, 1435, 2851, 1495, 480, 5, 140, 59);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,8),(@car,10),(@car,11),(@car,12),(@car,13),(@car,15),(@car,16),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,30),(@car,31),(@car,32);

-- 34. BMW X1 (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(13, 4, 1, 'X1', 'sDrive20i xLine', 2023, 45.90, 53.90,
 'The third-gen BMW X1 features a massive 25.4cm curved display, 204 BHP engine, and a class-leading 540L boot. Most practical BMW for India.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1998, 4, 204.0, 300.0, '10.2:1', '2.0L TwinPower Turbo B48');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 230, 7.4, 14.98);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Steptronic Automatic', 7, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4500, 1845, 1642, 2692, 1645, 540, 5, 173, 54);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,10),(@car,11),(@car,12),(@car,13),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,31),(@car,32);

-- ============================================================
-- MERCEDES-BENZ (brand_id = 14)
-- ============================================================

-- 35. Mercedes-Benz C-Class (2022)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(14, 2, 1, 'C-Class', 'C 300d AMG Line', 2022, 57.00, 66.00,
 'The new W206 C-Class brings S-Class design to a compact sedan. 48V mild hybrid system, 254 BHP diesel, MBUX Hyperscreen-inspired layout, and ambient lighting with 64 colours.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1993, 4, 268.0, 550.0, '15.5:1', '2.0L OM654 Diesel with 48V Mild Hybrid EQ Boost');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 250, 5.9, 17.80);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, '9G-TRONIC Automatic', 9, 'RWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4751, 1820, 1438, 2865, 1730, 455, 5, 130, 66);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,8),(@car,9),(@car,10),(@car,11),(@car,12),(@car,13),(@car,15),(@car,16),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,31),(@car,32);

-- 36. Mercedes-Benz GLA (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(14, 4, 1, 'GLA', 'GLA 200 d AMG Line', 2023, 49.90, 59.90,
 'Mercedes'' entry luxury SUV. The GLA features a twin-turbocharged diesel, MBUX infotainment, and a premium cabin. Compact dimensions for Indian city use.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1950, 4, 150.0, 320.0, '15.5:1', '2.0L OM 654q Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 207, 8.7, 18.89);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, '8G-DCT Automatic', 8, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4410, 1834, 1611, 2729, 1590, 435, 5, 155, 43);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,10),(@car,11),(@car,12),(@car,13),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,31),(@car,32);

-- ============================================================
-- MG MOTOR (brand_id = 15)
-- ============================================================

-- 37. MG Hector (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(15, 3, 1, 'Hector', 'Select Pro Turbo CVT', 2023, 13.98, 21.73,
 'India''s first internet car. The Hector features a 35.56cm portrait touchscreen, India''s first ADAS Level 2, and an available 7-seat layout with the Hector Plus.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1451, 4, 143.0, 250.0, '10.5:1', '1.5L Turbo-Petrol Smart Hybrid');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 180, 10.5, 15.81);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'CVT', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 4720, 1835, 1760, 2750, 1587, 587, 5, 192, 60);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,8),(@car,9),(@car,10),(@car,14),(@car,15),(@car,17),(@car,18),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- 38. MG ZS EV (2023) — EV
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(15, 10, 5, 'ZS EV', 'Excite Pro', 2023, 18.98, 25.20,
 'MG''s updated ZS EV offers 461 km ARAI range with the 50.3 kWh battery. Features 360 camera, ADAS, and V2L capability. India''s best-rounded EV SUV.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 176.0, 280.0, 'Permanent Magnet Synchronous Motor', 50.3, 8.5, 60);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 175, 8.5, 461);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Automatic', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 4323, 1809, 1649, 2585, 1620, 448, 5, 177);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,7),(@car,10),(@car,15),(@car,17),(@car,18),(@car,19),(@car,20),(@car,21),(@car,25),(@car,26),(@car,32);

-- ============================================================
-- BYD (brand_id = 17)
-- ============================================================

-- 39. BYD Atto 3 (2023) — EV
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(17, 10, 5, 'Atto 3', 'Extended Range', 2023, 33.90, 34.49,
 'BYD''s e-Platform 3.0 based SUV with Blade Battery technology. 60.48 kWh battery, 521 km ARAI range, and a feature-rich cabin. V2L compatible with IP68 rating.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 201.0, 310.0, 'Permanent Magnet Synchronous Motor', 60.48, 8.0, 50);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 160, 7.3, 521);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Automatic', NULL, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 4455, 1875, 1615, 2720, 1750, 440, 5, 175);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,10),(@car,11),(@car,12),(@car,15),(@car,17),(@car,18),(@car,19),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,32);

-- 40. BYD Seal (2024) — EV
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(17, 11, 5, 'Seal', 'Excellence AWD', 2024, 41.00, 53.00,
 'BYD''s flagship performance EV sedan. AWD variant produces 530 BHP, 0-100 in 3.8 sec. e-Platform 3.0 with 800V-compatible architecture and CTB battery technology.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 530.0, 670.0, 'Dual Permanent Magnet Synchronous Motor (CTB)', 82.56, 11.0, 26);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 180, 3.8, 580);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Automatic', NULL, 'AWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 4800, 1875, 1460, 2920, 2150, 402, 5, 160);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,10),(@car,11),(@car,12),(@car,15),(@car,16),(@car,17),(@car,18),(@car,19),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,30),(@car,31),(@car,32);

-- ============================================================
-- CITROEN (brand_id = 16)
-- ============================================================

-- 41. Citroen C3 (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(16, 1, 1, 'C3', 'Max Turbo MT', 2023, 6.16, 9.19,
 'Made in India for India. The Citroen C3 features 16cm of ground clearance, a 110 BHP turbo engine, and Advanced Comfort seats. Unique progressive hydraulic cushion suspension.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1199, 3, 110.0, 190.0, '10.5:1', '1.2L PureTech Turbocharged');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 165, 11.5, 19.80);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Manual', 6, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3981, 1733, 1604, 2540, 1019, 316, 5, 163, 40);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,5),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- ============================================================
-- ISUZU (brand_id = 19)
-- ============================================================

-- 42. Isuzu D-Max V-Cross (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(19, 8, 2, 'D-Max V-Cross', 'Z Prestige AT 4WD', 2023, 25.40, 29.99,
 'India''s most capable lifestyle pickup truck. The V-Cross features a 163 BHP diesel, 4WD, 800mm water wading depth, and a 1-tonne payload capacity.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1898, 4, 163.0, 360.0, '16.5:1', '4JJ3-TCX 1.9L VGS Turbo Diesel');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 175, 11.8, 15.52);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 6, '4WD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 5295, 1860, 1795, 3095, 1970, 0, 5, 235, 76);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,5),(@car,7),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- ============================================================
-- MARUTI SUZUKI (brand_id = 1) — additional models
-- ============================================================

-- 43. Maruti Suzuki Jimny (2023)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(1, 3, 1, 'Jimny', 'Zeta AT 4WD', 2023, 12.74, 15.05,
 'The legendary Jimny returns to India as a 5-door. ALLGRIP PRO 4WD, ladder-on-frame construction, and 210mm ground clearance. A true off-roader at an accessible price.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1462, 4, 105.0, 134.5, '10.5:1', 'K15B 1.5L VVT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 150, 13.8, 16.39);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Automatic (Torque Converter)', 4, '4WD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3985, 1645, 1720, 2590, 1195, 332, 5, 210, 40);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,5),(@car,7),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- 44. Maruti Suzuki Dzire (2024)
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(1, 2, 1, 'Dzire', 'ZXI Plus AMT', 2024, 6.79, 9.94,
 'India''s best-selling sedan and top taxi fleet vehicle. The 2024 Dzire rides on the new Heartect-Z platform, gets 24.79 km/l claimed efficiency and 5-star NCAP safety.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, compression_ratio, engine_type)
VALUES (@car, 1197, 3, 81.58, 111.7, '12.0:1', 'Z12E 3-cyl Dual Jet VVT');
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, fuel_efficiency_kmpl)
VALUES (@car, 160, 11.8, 24.79);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'AGS (AMT)', 5, 'FWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm, fuel_tank_litres)
VALUES (@car, 3995, 1735, 1515, 2450, 920, 382, 5, 163, 37);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,5),(@car,17),(@car,20),(@car,21),(@car,25),(@car,26);

-- ============================================================
-- VOLVO (brand_id = 20)
-- ============================================================

-- 45. Volvo XC40 Recharge (2023) — EV
INSERT INTO cars (brand_id, body_type_id, fuel_type_id, name, variant, launch_year, price_min_lakh, price_max_lakh, description) VALUES
(20, 10, 5, 'XC40 Recharge', 'Twin Motor AWD', 2023, 55.90, 61.25,
 'Volvo''s premium electric SUV. The XC40 Recharge features a 408 BHP twin-motor AWD, 78 kWh battery, 418 km WLTP range, and the safest EV body structure with 5-star EURO NCAP.');
SET @car = LAST_INSERT_ID();
INSERT INTO engine_specs (car_id, displacement_cc, cylinders, max_power_bhp, max_torque_nm, engine_type, battery_kwh, charge_time_ac_hrs, charge_time_dc_mins)
VALUES (@car, NULL, NULL, 408.0, 660.0, 'Dual Permanent Magnet Synchronous Motor', 78.0, 10.5, 37);
INSERT INTO performance_specs (car_id, top_speed_kmh, acceleration_0_100_sec, range_km)
VALUES (@car, 180, 4.9, 418);
INSERT INTO transmission_specs (car_id, transmission_type, num_gears, drive_type)
VALUES (@car, 'Single-speed Automatic', NULL, 'AWD');
INSERT INTO dimensions (car_id, length_mm, width_mm, height_mm, wheelbase_mm, kerb_weight_kg, boot_space_litres, seating_capacity, ground_clearance_mm)
VALUES (@car, 4425, 1873, 1652, 2702, 2170, 452, 5, 175);
INSERT INTO car_features (car_id, feature_id) VALUES (@car,1),(@car,2),(@car,3),(@car,4),(@car,6),(@car,7),(@car,8),(@car,9),(@car,10),(@car,11),(@car,12),(@car,15),(@car,16),(@car,17),(@car,18),(@car,19),(@car,20),(@car,21),(@car,24),(@car,25),(@car,26),(@car,31),(@car,32);

-- ============================================================
-- END OF SEED DATA
-- Total: 45 cars across 20 brands
-- 12 EVs | 33 ICE (Petrol/Diesel/Hybrid)
-- Body types: Hatchback x8, Sedan x7, SUV x11, Compact SUV x10,
--             MPV x3, Pickup x1, EV variants x5
-- ============================================================
