const Reward = require('../models/reward.model');
const User = require('../models/user.model');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.find();
        res.status(200).json(rewards);
    } catch (error) {
        console.error('Error fetching rewards:', error);
        res.status(500).json({ message: 'Error fetching rewards', error: error.message });
    }
};

exports.getRewardById = async (req, res) => {
    try {
        const { id } = req.params;
        const reward = await Reward.findById(id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json(reward);
    } catch (error) {
        console.error('Error fetching reward by ID:', error);
        res.status(500).json({ message: 'Error fetching reward by ID', error: error.message });
    }
};

exports.createReward = async (req, res) => {
    try {
        const { name, description, pointsCost } = req.body;
        const reward = new Reward({ name, description, pointsCost });
        await reward.save();
        res.status(201).json({ message: 'Reward created successfully', reward });
    } catch (error) {
        console.error('Error creating reward:', error);
        res.status(500).json({ message: 'Error creating reward', error: error.message });
    }
};

exports.updateReward = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, pointsCost } = req.body;
        const reward = await Reward.findByIdAndUpdate(
            id,
            { name, description, pointsCost },
            { new: true }
        );
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward updated successfully', reward });
    } catch (error) {
        console.error('Error updating reward:', error);
        res.status(500).json({ message: 'Error updating reward', error: error.message });
    }
};

exports.deleteReward = async (req, res) => {
    try {
        const { id } = req.params;
        const reward = await Reward.findByIdAndDelete(id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward deleted successfully' });
    } catch (error) {
        console.error('Error deleting reward:', error);
        res.status(500).json({ message: 'Error deleting reward', error: error.message });
    }
};

exports.redeemReward = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Assuming user ID is available from authentication middleware

        const reward = await Reward.findById(id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.points < reward.pointsCost) {
            return res.status(400).json({ message: 'Insufficient points' });
        }

        user.points -= reward.pointsCost;
        await user.save();

        res.status(200).json({ message: 'Reward redeemed successfully', newPointsBalance: user.points });
    } catch (error) {
        console.error('Error redeeming reward:', error);
        res.status(500).json({ message: 'Error redeeming reward', error: error.message });
    }
};

exports.getUserRewards = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
            where: { userId },
            select: {
                name: true,
                phoneNumber: true,
                points: true,
                scannedCodes: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the 5 most recent scans
        const recentScans = await prisma.scan.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: { product: true }
        });

        res.status(200).json({
            user,
            recentScans
        });
    } catch (error) {
        console.error('Error fetching user rewards:', error);
        res.status(500).json({ message: 'Error fetching user rewards', error: error.message });
    }
};

exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.user.userId;

        const scans = await prisma.scan.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { product: true }
        });

        res.status(200).json(scans);
    } catch (error) {
        console.error('Error fetching user history:', error);
        res.status(500).json({ message: 'Error fetching user history', error: error.message });
    }
};