const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const usersController = require('../controllers/users.controller');

router.get('/profile', verifyToken, usersController.getProfile);

module.exports = router;
