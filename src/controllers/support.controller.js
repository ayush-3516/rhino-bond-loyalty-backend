import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getSupportTickets = async (req, res) => {
  const supportTickets = await prisma.supportTicket.findMany();
  res.send(supportTickets);
};

const createSupportTicket = async (req, res) => {
  const { userId, issue } = req.body;
  const supportTicket = await prisma.supportTicket.create({
    data: { userId: parseInt(userId), issue },
  });
  res.send('Support ticket created successfully');
};

export {
  getSupportTickets,
  createSupportTicket,
};
