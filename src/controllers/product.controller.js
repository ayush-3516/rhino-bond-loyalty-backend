import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
};

const addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price },
  });
  res.send('Product added successfully');
};

export {
  getProducts,
  addProduct,
};
