import { PrismaClient } from '@prisma/client';
import { registerUser, updateUser } from '../controllers/user.controller';

const prisma = new PrismaClient();

describe('User Controller Tests', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a new user with KYC data', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password',
        phoneNumber: '1234567890',
        otp: '123456',
      },
    };
    const res = {
      send: jest.fn(),
    };

    await registerUser(req, res);
    expect(res.send).toHaveBeenCalledWith('User registered successfully');
  });

  it('should update user information including KYC data', async () => {
    const req = {
      body: {
        id: 1,
        email: 'updated@example.com',
        phoneNumber: '0987654321',
        otp: '654321',
      },
    };
    const res = {
      send: jest.fn(),
    };

    await updateUser(req, res);
    expect(res.send).toHaveBeenCalledWith('User information updated successfully');
  });
});
