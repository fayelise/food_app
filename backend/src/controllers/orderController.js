import prisma from "../config/prisma.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    let total = 0;

    // create the order first
    const order = await prisma.order.create({
      data: {
        userId,
        total: 0 
      }
    });

    // loop over items
    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId }
      });

      if (!menuItem) return res.status(404).json({ error: "Menu item not found" });

      const itemTotal = menuItem.price * item.quantity;

      // create the order item
      const orderItem = await prisma.orderItem.create({
        data: {
          orderId: order.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity
        }
      });

      let toppingsTotal = 0;

      // create toppings if any
      if (item.toppings && item.toppings.length > 0) {
        for (const topping of item.toppings) {
          const t = await prisma.topping.findUnique({
            where: { id: topping.id }
          });

          if (t) {
            toppingsTotal += t.price;

            await prisma.orderItemTopping.create({
              data: {
                orderItemId: orderItem.id,
                toppingId: t.id
              }
            });
          }
        }
      }

      // add to total
      total += itemTotal + toppingsTotal * item.quantity;
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { total }
    });

    const fullOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            menuItem: true,
            toppings: {
              include: { topping: true }
            }
          }
        }
      }
    });

    res.json(fullOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating order" });
  }
};


export const getOrders = async (req, res) => {
  try {

    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            menuItem: true
          }
        },
        user: true
      }
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: {
          include: {
            menuItem: true,
            toppings: {
              include: {
                topping: true
              }
            }
          }
        },
        user: true
      }
    });

    res.json(order);

  } catch (error) {
    res.status(500).json({ error: "Error fetching order" });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId)
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        items: {
          include: {
            menuItem: true,
            toppings: {
              include: {
                topping: true
              }
            }
          }
        }
      }
    });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: "Error fetching user orders" });
  }
};