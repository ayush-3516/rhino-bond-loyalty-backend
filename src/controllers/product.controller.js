import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.send(products);
  } catch (error) {
    res.status(500).send('Error retrieving products');
  }
};

const addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, description, price },
    });
    res.send('Product added successfully');
  } catch (error) {
    res.status(500).send('Error adding product');
  }
};

export {
  getProducts,
  addProduct,
};
