import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getPoints = async (req, res) => {
  const userId = req.query.userId;
  const points = await prisma.points.findUnique({
    where: { userId: parseInt(userId) },
  });
  res.send(points);
};

const addPoints = async (req, res) => {
  const { userId, points } = req.body;
  const existingPoints = await prisma.points.findUnique({
    where: { userId: parseInt(userId) },
  });
  if (existingPoints) {
    await prisma.points.update({
      where: { userId: parseInt(userId) },
      data: { points: existingPoints.points + points },
    });
  } else {
    await prisma.points.create({
      data: { userId: parseInt(userId), points },
    });
  }
  res.send('Points added successfully');
};

export {
  getPoints,
  addPoints,
};
