const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

exports.getPoints = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ points: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching points', error: error.message });
    }
};

exports.addPoints = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const { points, reason } = req.body;

        if (!points || points <= 0) {
            return res.status(400).json({ message: 'Invalid points value' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { points: points } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a transaction record
        await Transaction.create({
            user: userId,
            points: points,
            type: 'credit',
            reason: reason || 'Points added'
        });

        res.status(200).json({ message: 'Points added successfully', newTotal: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Error adding points', error: error.message });
    }
};

exports.deductPoints = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const { points, reason } = req.body;

        if (!points || points <= 0) {
            return res.status(400).json({ message: 'Invalid points value' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.points < points) {
            return res.status(400).json({ message: 'Insufficient points' });
        }

        user.points -= points;
        await user.save();

        // Create a transaction record
        await Transaction.create({
            user: userId,
            points: points,
            type: 'debit',
            reason: reason || 'Points deducted'
        });

        res.status(200).json({ message: 'Points deducted successfully', newTotal: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Error deducting points', error: error.message });
    }
};

exports.getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction history', error: error.message });
    }
};
