import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getNotifications = async (req, res) => {
  const userId = req.query.userId;
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: parseInt(userId) },
    });
    res.send(notifications);
  } catch (error) {
    res.status(500).send('Error retrieving notifications');
  }
};

const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { read: true },
    });
    res.send('Notification marked as read');
  } catch (error) {
    res.status(500).send('Error marking notification as read');
  }
};

export {
  getNotifications,
  markAsRead,
};
