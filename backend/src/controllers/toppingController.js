import prisma from "../config/prisma.js";


export const getToppings = async (req, res) => {
  try {
    const toppings = await prisma.topping.findMany();
    res.json(toppings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching toppings" });
  }
};

