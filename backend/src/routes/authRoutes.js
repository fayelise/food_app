import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import prisma from '../config/prisma.js';


const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



export default router;
