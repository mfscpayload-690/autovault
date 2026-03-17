const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const verifyToken = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');
const adminController = require('../controllers/admin.controller');

// All admin routes require auth + admin
router.use(verifyToken, requireAdmin);

// --- Cars ---
router.post(
  '/cars',
  adminController.uploadCarImage,
  [
    body('name').trim().notEmpty().withMessage('Car name is required'),
    body('brand_id').isInt().withMessage('Brand ID is required'),
    body('body_type_id').isInt().withMessage('Body type ID is required'),
    body('fuel_type_id').isInt().withMessage('Fuel type ID is required'),
  ],
  validate,
  adminController.createCar
);

router.put(
  '/cars/:id',
  adminController.uploadCarImage,
  [
    body('name').trim().notEmpty().withMessage('Car name is required'),
  ],
  validate,
  adminController.updateCar
);

router.delete('/cars/:id', adminController.deleteCar);

// --- Brands ---
router.post(
  '/brands',
  adminController.uploadBrandImage,
  [
    body('name').trim().notEmpty().withMessage('Brand name is required'),
  ],
  validate,
  adminController.createBrand
);

router.put(
  '/brands/:id',
  adminController.uploadBrandImage,
  [
    body('name').trim().notEmpty().withMessage('Brand name is required'),
  ],
  validate,
  adminController.updateBrand
);

router.delete('/brands/:id', adminController.deleteBrand);

// --- Features ---
router.post(
  '/features',
  [
    body('feature_name').trim().notEmpty().withMessage('Feature name is required'),
    body('category').isIn(['Safety', 'Comfort', 'Technology', 'Infotainment', 'Exterior', 'Interior'])
      .withMessage('Invalid category'),
  ],
  validate,
  adminController.createFeature
);

router.delete('/features/:id', adminController.deleteFeature);

router.patch('/cars/:id/features', adminController.updateCarFeatures);

// --- Users ---
router.get('/users', adminController.listUsers);
router.patch('/users/:id', adminController.toggleUserActive);

// --- Audit Log ---
router.get('/audit-log', adminController.getAuditLog);

module.exports = router;
