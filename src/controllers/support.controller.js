import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getSupportTickets = async (req, res) => {
  try {
    const tickets = await prisma.supportTicket.findMany();
    res.send(tickets);
  } catch (error) {
    res.status(500).send('Error retrieving support tickets');
  }
};

const createSupportTicket = async (req, res) => {
  const { userId, subject, description } = req.body;
  try {
    const ticket = await prisma.supportTicket.create({
      data: { userId: parseInt(userId), subject, description },
    });
    res.send('Support ticket created successfully');
  } catch (error) {
    res.status(500).send('Error creating support ticket');
  }
};

export {
  getSupportTickets,
  createSupportTicket,
};
