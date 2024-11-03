import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRewards = async (req, res) => {
  const rewards = await prisma.reward.findMany();
  res.send(rewards);
};

const addReward = async (req, res) => {
  const { name, description, pointsRequired } = req.body;
  const reward = await prisma.reward.create({
    data: { name, description, pointsRequired },
  });
  res.send('Reward added successfully');
};

export {
  getRewards,
  addReward,
};
