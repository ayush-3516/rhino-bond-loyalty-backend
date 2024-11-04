import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    res.send(user);
  } catch (error) {
    res.status(500).send('Error retrieving user');
  }
};

const updateUser = async (req, res) => {
  const { id, email, phoneNumber, otp } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, phoneNumber, otp },
    });
    res.send('User information updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user information');
  }
};

const registerUser = async (req, res) => {
  const { email, password, phoneNumber, otp } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, password, phoneNumber, otp },
    });
    res.send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

export {
  getUser,
  updateUser,
  registerUser,
};
