const router = require('express').Router();
const compareController = require('../controllers/compare.controller');

router.get('/', compareController.compare);

module.exports = router;
