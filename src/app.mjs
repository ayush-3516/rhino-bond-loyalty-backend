import express from "express";
import { PrismaClient } from '@prisma/client';
import authRoutes from "./routes/auth.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import pointsRoutes from "./routes/points.routes.js";
import productRoutes from "./routes/product.routes.js";
import qrRoutes from "./routes/qr.routes.js";
import rewardsRoutes from "./routes/rewards.routes.js";
import supportRoutes from "./routes/support.routes.js";
import userRoutes from "./routes/user.routes.js";
import bodyParser from "body-parser";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

const port = 3001;

// Custom Middleware
const customMiddleware = (req, res, next) => {
  console.log("Custom middleware executed");
  next();
};

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(customMiddleware);

app.use("/auth", authRoutes);
app.use("/notifications", notificationRoutes);
app.use("/points", pointsRoutes);
app.use("/products", productRoutes);
app.use("/qr", qrRoutes);
app.use("/rewards", rewardsRoutes);
app.use("/support", supportRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await prisma.$connect();
    console.log('Prisma connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
