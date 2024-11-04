import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getRewards = async (req, res) => {
  try {
    const rewards = await prisma.reward.findMany();
    res.send(rewards);
  } catch (error) {
    res.status(500).send('Error retrieving rewards');
  }
};

const addReward = async (req, res) => {
  const { name, description, pointsRequired } = req.body;
  try {
    const reward = await prisma.reward.create({
      data: { name, description, pointsRequired },
    });
    res.send('Reward added successfully');
  } catch (error) {
    res.status(500).send('Error adding reward');
  }
};

export {
  getRewards,
  addReward,
};
