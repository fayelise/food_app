import { Router } from "express";
import { getToppings } from "../controllers/toppingController.js";

const router = Router();

router.get("/", getToppings);


export default router;