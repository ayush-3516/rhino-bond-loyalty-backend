import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const user = await prisma.user.create({
    data: { username, password, email },
  });
  res.send('User registered successfully');
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username_password: { username, password } },
  });
  if (user) {
    res.send('User logged in successfully');
  } else {
    res.status(401).send('Invalid credentials');
  }
};

const verifyOtp = async (req, res) => {
  const { username, otp } = req.body;
  const user = await prisma.user.findUnique({
    where: { username_otp: { username, otp } },
  });
  if (user) {
    res.send('OTP verified successfully');
  } else {
    res.status(401).send('Invalid OTP');
  }
};

const refreshToken = async (req, res) => {
  const { username, refreshToken } = req.body;
  const user = await prisma.user.findUnique({
    where: { username_refreshToken: { username, refreshToken } },
  });
  if (user) {
    res.send('Token refreshed successfully');
  } else {
    res.status(401).send('Invalid refresh token');
  }
};

const logout = async (req, res) => {
  const { username } = req.body;
  await prisma.user.update({
    where: { username },
    data: { refreshToken: null },
  });
  res.send('User logged out successfully');
};

export {
  register,
  login,
  verifyOtp,
  refreshToken,
  logout,
};
