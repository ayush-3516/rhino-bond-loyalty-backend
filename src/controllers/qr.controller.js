import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateQR = async (req, res) => {
  const { userId, data } = req.body;
  const qr = await prisma.qr.create({
    data: { userId: parseInt(userId), data },
  });
  res.send('QR code generated successfully');
};

const scanQR = async (req, res) => {
  const { id } = req.body;
  const qr = await prisma.qr.findUnique({
    where: { id: parseInt(id) },
  });
  res.send('QR code scanned successfully');
};

export {
  generateQR,
  scanQR,
};
