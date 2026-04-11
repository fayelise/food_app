import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email" });

  if (typeof password !== "string" || password.length < 6)
    return res.status(400).json({ error: "Password too short" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash } });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return res.status(201).json({ id: user.id, email: user.email, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return res.status(200).json({ id: user.id, email: user.email, token });
};

