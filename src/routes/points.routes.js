import express from 'express';
import { getPoints, addPoints } from '../controllers/points.controller.js';

const router = express.Router();

router.get('/', getPoints);
router.post('/', addPoints);

export default router;
