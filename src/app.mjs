import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import adminRoutes from './routes/admin.routes.js';
import authRoutes from './routes/auth.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import qrRoutes from './routes/qr.routes.js';
import rewardsRoutes from './routes/rewards.routes.js';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/rewards', rewardsRoutes);

// Database connection
async function main() {
    await prisma.$connect();
    console.log('Database connected');
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
