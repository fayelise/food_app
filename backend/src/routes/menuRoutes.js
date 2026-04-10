import { Router } from "express";
import { getMenuItems, getMenuByCategory, getMenuItemById } from "../controllers/menuController.js";

const router = Router();

router.get("/", getMenuItems);
router.get("/category/:category", getMenuByCategory);
router.get("/:id", getMenuItemById);

export default router;