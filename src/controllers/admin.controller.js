const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode');
const prisma = new PrismaClient();

exports.generateQR = async (req, res) => {
    try {
        const { productName, description, points } = req.body;

        // Create a new product
        const product = await prisma.product.create({
            data: {
                name: productName,
                description,
                points,
            },
        });

        // Generate QR code data
        const qrData = JSON.stringify({
            productId: product.id,
            productName: product.name,
        });

        // Generate QR code
        const qrCodeImage = await QRCode.toDataURL(qrData);

        res.status(200).json({ 
            message: 'QR code generated successfully',
            product: product,
            qrCode: qrCodeImage
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating QR code', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                userId: true,
                phoneNumber: true,
                name: true,
                points: true,
                kycStatus: true,
            }
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.getKycRequests = async (req, res) => {
    try {
        const kycRequests = await prisma.user.findMany({
            where: {
                kycStatus: 'pending'
            },
            select: {
                id: true,
                userId: true,
                phoneNumber: true,
                name: true,
                kycStatus: true,
            }
        });

        res.status(200).json(kycRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching KYC requests', error: error.message });
    }
};
