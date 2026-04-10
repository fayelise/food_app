import { Router } from "express";
import { createOrder, getOrders, getOrderById,getUserOrders } from "../controllers/orderController.js";

const router = Router();

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/:userId", getUserOrders);


export default router;