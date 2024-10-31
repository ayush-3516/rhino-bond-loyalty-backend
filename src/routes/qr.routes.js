const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qr.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/scan', verifyToken, qrController.scanProduct);

module.exports = router;

