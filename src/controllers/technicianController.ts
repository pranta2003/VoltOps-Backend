import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// ----------------------------------------------------------------------------
// GET /api/technicians
// ----------------------------------------------------------------------------
// Restricted to ADMIN and DISPATCHER (see technicianRoutes.ts).
// This is a small but real proof that our whole chain works together:
// login token -> role check -> database query across multiple related
// tables (User + TechnicianProfile + Skills + Certifications).
//
// This is also the exact shape of data the Matching Engine (Milestone 4)
// will need to read from, so building it now saves rework later.
export async function listTechnicians(req: Request, res: Response) {
  const technicians = await prisma.technicianProfile.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      skills: { include: { skill: true } },
      certifications: { include: { certification: true } },
    },
  });

  return res.status(200).json({ technicians });
}

// ----------------------------------------------------------------------------
// GET /api/technicians/me
// ----------------------------------------------------------------------------
// A technician viewing their own profile. Restricted to TECHNICIAN role.
export async function getMyTechnicianProfile(req: Request, res: Response) {
  const profile = await prisma.technicianProfile.findUnique({
    where: { userId: req.user!.userId },
    include: {
      user: { select: { id: true, name: true, email: true } },
      skills: { include: { skill: true } },
      certifications: { include: { certification: true } },
    },
  });

  if (!profile) {
    return res.status(404).json({
      error: "No technician profile found for this account. Ask an Admin to set one up.",
    });
  }

  return res.status(200).json({ profile });
}
