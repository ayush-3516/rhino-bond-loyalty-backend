import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const saltRounds = 10;
const jwtSecret = 'your-secret-key';

const register = async (req, res) => {
  const { email, password, phoneNumber, otp } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, phoneNumber, otp },
    });
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).send('User not found');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).send('Invalid password');
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};

const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    // Implement OTP verification logic here
    res.send('OTP verified successfully');
  } catch (error) {
    res.status(500).send('Error verifying OTP');
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    // Implement refresh token logic here
    res.send('Token refreshed successfully');
  } catch (error) {
    res.status(500).send('Error refreshing token');
  }
};

const logout = async (req, res) => {
  try {
    // Implement logout logic here
    res.send('User logged out successfully');
  } catch (error) {
    res.status(500).send('Error logging out');
  }
};

export {
  register,
  login,
  verifyOtp,
  refreshToken,
  logout,
};
