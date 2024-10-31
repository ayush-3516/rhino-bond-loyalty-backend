const User = require('../models/user.model');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

exports.getUserPoints = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const user = await User.findById(userId).select('points');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ points: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user points', error: error.message });
    }
};

exports.updateUserPoints = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const { points } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { points: points } },
            { new: true }
        ).select('points');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User points updated successfully', points: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user points', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user account', error: error.message });
    }
};
