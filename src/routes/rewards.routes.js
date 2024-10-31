const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewards.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/user/rewards', verifyToken, rewardsController.getUserRewards);
router.get('/user/history', verifyToken, rewardsController.getUserHistory);

// Add missing routes
router.get('/rewards', verifyToken, rewardsController.getAllRewards);
router.get('/rewards/:id', verifyToken, rewardsController.getRewardById);
router.post('/rewards', verifyToken, rewardsController.createReward);
router.put('/rewards/:id', verifyToken, rewardsController.updateReward);
router.delete('/rewards/:id', verifyToken, rewardsController.deleteReward);
router.post('/rewards/redeem/:id', verifyToken, rewardsController.redeemReward);

module.exports = router;