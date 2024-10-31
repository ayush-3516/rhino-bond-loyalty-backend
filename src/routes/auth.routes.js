const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// Token validation route
router.post('/validateToken', authMiddleware.validateToken, authController.validateToken);

module.exports = router;
