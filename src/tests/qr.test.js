import { PrismaClient } from '@prisma/client';
import { generateQR, scanQR } from '../controllers/qr.controller';

const prisma = new PrismaClient();

describe('QR Controller Tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should generate a new QR code', async () => {
    const req = {
      body: {
        userId: 1,
        data: { points: 10 },
      },
    };
    const res = {
      send: jest.fn(),
    };

    await generateQR(req, res);
    expect(res.send).toHaveBeenCalledWith('QR code generated successfully');
  });

  it('should scan a QR code and add points to the user', async () => {
    const req = {
      body: {
        id: 1,
      },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    await scanQR(req, res);
    expect(res.send).toHaveBeenCalledWith('QR code scanned successfully and points added');
  });

  it('should not scan a QR code more than once', async () => {
    const req = {
      body: {
        id: 1,
      },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    await scanQR(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('QR code already scanned or not found');
  });
});
