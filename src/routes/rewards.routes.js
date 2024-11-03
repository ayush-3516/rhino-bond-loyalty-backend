import express from 'express';
import { getRewards, addReward } from '../controllers/rewards.controller.js';

const router = express.Router();

router.get('/', getRewards);
router.post('/', addReward);

export default router;
