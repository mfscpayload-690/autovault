const router = require('express').Router();
const carsController = require('../controllers/cars.controller');

router.get('/', carsController.list);
router.get('/badges', carsController.getBadges);
router.get('/:id', carsController.getById);
router.get('/:id/features', carsController.getFeatures);

module.exports = router;
