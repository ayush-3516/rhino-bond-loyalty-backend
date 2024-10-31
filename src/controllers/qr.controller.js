const QRCode = require('qrcode');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.generateQR = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id; // Assuming user ID is available from authentication middleware

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Generate QR code data
        const qrData = JSON.stringify({
            productId: product._id,
            userId: userId,
            timestamp: new Date()
        });

        // Generate QR code
        const qrCodeImage = await QRCode.toDataURL(qrData);

        res.status(200).json({ qrCode: qrCodeImage });
    } catch (error) {
        res.status(500).json({ message: 'Error generating QR code', error: error.message });
    }
};

exports.scanQR = async (req, res) => {
    try {
        const { qrData } = req.body;
        const scannedData = JSON.parse(qrData);

        // Verify the scanned data
        const product = await Product.findById(scannedData.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(scannedData.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Process the scan (e.g., award points, update product status)
        // This is a placeholder - implement your business logic here
        user.points += 10; // Example: award 10 points for scanning
        await user.save();

        res.status(200).json({ 
            message: 'QR code scanned successfully',
            product: product,
            pointsAwarded: 10
        });
    } catch (error) {
        res.status(500).json({ message: 'Error scanning QR code', error: error.message });
    }
};

exports.scanProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.userId; // This comes from the auth middleware

        // Validate product
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a scan record and update user points
        const scan = await prisma.scan.create({
            data: {
                userId: userId,
                productId: productId,
                pointsAwarded: product.points
            },
        });

        const updatedUser = await prisma.user.update({
            where: { userId },
            data: { 
                points: { increment: product.points }
            },
        });

        res.status(200).json({ 
            message: 'Product scanned successfully',
            pointsEarned: product.points,
            totalPoints: updatedUser.points,
            scan: scan
        });
    } catch (error) {
        res.status(500).json({ message: 'Error scanning product', error: error.message });
    }
};
