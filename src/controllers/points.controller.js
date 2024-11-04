import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getPoints = async (req, res) => {
  const userId = req.query.userId;
  try {
    const points = await prisma.points.findUnique({
      where: { userId: parseInt(userId) },
    });
    res.send(points);
  } catch (error) {
    res.status(500).send('Error retrieving points');
  }
};

const addPoints = async (req, res) => {
  const { userId, points } = req.body;
  try {
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
  } catch (error) {
    res.status(500).send('Error adding points');
  }
};

export {
  getPoints,
  addPoints,
};
