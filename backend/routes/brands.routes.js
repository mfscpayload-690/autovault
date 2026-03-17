const router = require('express').Router();
const brandsController = require('../controllers/brands.controller');

router.get('/', brandsController.list);

module.exports = router;
