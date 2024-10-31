const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

router.post('/generate-qr', verifyToken, isAdmin, adminController.generateQR);
router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);
router.get('/kyc-requests', verifyToken, isAdmin, adminController.getKycRequests);

module.exports = router;
