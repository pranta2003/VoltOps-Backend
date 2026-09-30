import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { signToken } from "../utils/jwt";
import { Role } from "@prisma/client";

// zod schemas describe exactly what shape of data we accept, and give us
// clear, specific error messages for free if the data doesn't match —
// instead of an ugly database error appearing later.
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

// ----------------------------------------------------------------------------
// POST /api/auth/register
// ----------------------------------------------------------------------------
// NOTE: Public registration ONLY creates CUSTOMER accounts. This is
// intentional, not a missing feature: in a real field-service company,
// anyone can sign up as a customer and request service, but staff accounts
// (Admin, Dispatcher, Technician) are created BY an Admin, inside the app.
// That "Admin creates a staff account" screen is a Milestone 2 feature.
// Until then, use the seed script (prisma/seed.ts) to get staff test logins.
export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      role: Role.CUSTOMER,
    },
  });

  const token = signToken({ userId: user.id, role: user.role, email: user.email });

  return res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

// ----------------------------------------------------------------------------
// POST /api/auth/login
// ----------------------------------------------------------------------------
// Works for every role — Admin, Dispatcher, Technician, and Customer all
// log in through this same endpoint. The token's "role" field is what
// later tells the frontend which dashboard to show, and tells the backend
// which actions this user is allowed to perform.
export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Deliberately vague: never reveal whether the email or the password
    // was the wrong part. That's a small but real security habit.
    return res.status(401).json({ error: "Invalid email or password." });
  }

  if (!user.isActive) {
    return res.status(403).json({ error: "This account has been deactivated." });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = signToken({ userId: user.id, role: user.role, email: user.email });

  return res.status(200).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}

// ----------------------------------------------------------------------------
// GET /api/auth/me
// ----------------------------------------------------------------------------
// Called by the frontend on page load/refresh to check "is my saved token
// still valid, and who am I?" — this is how a logged-in user stays logged
// in after refreshing the page, without us storing sessions on the server.
export async function getMe(req: Request, res: Response) {
  // req.user was attached by the requireAuth middleware before this ever runs.
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  return res.status(200).json({ user });
}
