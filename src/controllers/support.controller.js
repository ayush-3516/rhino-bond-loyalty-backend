const SupportTicket = require('../models/supportTicket.model');

exports.createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; // Assuming user ID is available from authentication middleware

        const ticket = new SupportTicket({
            title,
            description,
            user: userId,
            status: 'open'
        });

        await ticket.save();
        res.status(201).json({ message: 'Support ticket created successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error creating support ticket', error: error.message });
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from authentication middleware
        const tickets = await SupportTicket.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching support tickets', error: error.message });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Assuming user ID is available from authentication middleware

        const ticket = await SupportTicket.findOne({ _id: id, user: userId });
        if (!ticket) {
            return res.status(404).json({ message: 'Support ticket not found or not authorized' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching support ticket', error: error.message });
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const userId = req.user.id; // Assuming user ID is available from authentication middleware

        const ticket = await SupportTicket.findOneAndUpdate(
            { _id: id, user: userId },
            { title, description },
            { new: true }
        );

        if (!ticket) {
            return res.status(404).json({ message: 'Support ticket not found or not authorized' });
        }

        res.status(200).json({ message: 'Support ticket updated successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error updating support ticket', error: error.message });
    }
};

exports.closeTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Assuming user ID is available from authentication middleware

        const ticket = await SupportTicket.findOneAndUpdate(
            { _id: id, user: userId },
            { status: 'closed' },
            { new: true }
        );

        if (!ticket) {
            return res.status(404).json({ message: 'Support ticket not found or not authorized' });
        }

        res.status(200).json({ message: 'Support ticket closed successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error closing support ticket', error: error.message });
    }
};
