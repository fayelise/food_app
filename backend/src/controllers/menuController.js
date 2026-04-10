import prisma from "../config/prisma.js";

export const getMenuItems = async (req, res) => {
  try {
    const menu = await prisma.menuItem.findMany();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu" });
  }
};
// Get menu by category
export const getMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const menu = await prisma.menuItem.findMany({
      where: {
        category: category.toLowerCase()
      }
    });

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu by category" });
  }
};

export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await prisma.menuItem.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu item by ID" });
  }
};
