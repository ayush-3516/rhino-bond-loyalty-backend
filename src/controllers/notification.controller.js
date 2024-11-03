import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getNotifications = async (req, res) => {
  const userId = req.query.userId;
  const notifications = await prisma.notification.findMany({
    where: { userId: parseInt(userId) },
  });
  res.send(notifications);
};

const markAsRead = async (req, res) => {
  const { id } = req.params;
  await prisma.notification.update({
    where: { id: parseInt(id) },
    data: { read: true },
  });
  res.send('Notification marked as read successfully');
};

export {
  getNotifications,
  markAsRead,
};
