const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.userId; // Assuming this is set by the auth middleware

        const user = await prisma.user.findUnique({
            where: { userId },
            select: { isAdmin: true }
        });

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin rights required.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error verifying admin status', error: error.message });
    }
};
