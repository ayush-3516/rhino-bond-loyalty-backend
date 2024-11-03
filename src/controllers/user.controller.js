import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const { id } = req.query;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  res.send(user);
};

const updateUser = async (req, res) => {
  const { id, username, email } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { username, email },
  });
  res.send('User information updated successfully');
};

export {
  getUser,
  updateUser,
};
