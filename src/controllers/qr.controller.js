import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateQR = async (req, res) => {
  const { userId, data } = req.body;
  try {
    const qr = await prisma.qr.create({
      data: { userId: parseInt(userId), data },
    });
    res.send('QR code generated successfully');
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).send('Error generating QR code');
  }
};

const scanQR = async (req, res) => {
  const { id } = req.body;
  try {
    const qr = await prisma.qr.findUnique({
      where: { id: parseInt(id) },
    });

    if (!qr || qr.scanned) {
      return res.status(400).send('QR code already scanned or not found');
    }

    await prisma.qr.update({
      where: { id: parseInt(id) },
      data: { scanned: true },
    });

    const pointsToAdd = parseInt(qr.data.points);
    const existingPoints = await prisma.points.findUnique({
      where: { userId: qr.userId },
    });

    if (existingPoints) {
      await prisma.points.update({
        where: { userId: qr.userId },
        data: { points: existingPoints.points + pointsToAdd },
      });
    } else {
      await prisma.points.create({
        data: { userId: qr.userId, points: pointsToAdd },
      });
    }

    res.send('QR code scanned successfully and points added');
  } catch (error) {
    console.error('Error scanning QR code:', error);
    res.status(500).send('Error scanning QR code');
  }
};

export {
  generateQR,
  scanQR,
};
