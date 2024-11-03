import express from 'express';
import { generateQR, scanQR } from '../controllers/qr.controller.js';

const router = express.Router();

router.post('/generate', generateQR);
router.post('/scan', scanQR);

export default router;
