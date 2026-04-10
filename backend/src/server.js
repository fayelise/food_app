import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import prisma from './config/prisma.js';
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import toppingRoutes from "./routes/toppingRoutes.js";







dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/images", express.static("public/images"));
app.use("/api/topping", toppingRoutes);

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany(); 
  res.json(users);
});


app.listen(5000, () => console.log("Server running on port 5000"));

