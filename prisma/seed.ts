// ============================================================================
// SEED SCRIPT
// ============================================================================
// This creates starter data so you can log in and test immediately, without
// building "create user" screens first. Run it with: npm run seed
//
// IMPORTANT: In the real app, only CUSTOMER accounts are created through
// public registration (see authController.ts). ADMIN, DISPATCHER, and
// TECHNICIAN accounts are meant to be created by an Admin — that screen is
// a Milestone 2 feature. Until we build it, this seed script is how you get
// staff accounts to log in and test with.
// ============================================================================

import { PrismaClient, Role, TechnicianStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  // --- One account per role, all using the same test password ---
  const admin = await prisma.user.upsert({
    where: { email: "admin@voltops.test" },
    update: {},
    create: {
      name: "Ayesha Admin",
      email: "admin@voltops.test",
      password: passwordHash,
      role: Role.ADMIN,
    },
  });

  const dispatcher = await prisma.user.upsert({
    where: { email: "dispatcher@voltops.test" },
    update: {},
    create: {
      name: "Rafiq Dispatcher",
      email: "dispatcher@voltops.test",
      password: passwordHash,
      role: Role.DISPATCHER,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@voltops.test" },
    update: {},
    create: {
      name: "Karim Customer",
      email: "customer@voltops.test",
      password: passwordHash,
      role: Role.CUSTOMER,
    },
  });

  const technicianUser = await prisma.user.upsert({
    where: { email: "technician@voltops.test" },
    update: {},
    create: {
      name: "Sohel Technician",
      email: "technician@voltops.test",
      password: passwordHash,
      role: Role.TECHNICIAN,
    },
  });

  // --- Skills & certifications master lists (electrical service domain) ---
  const skillNames = [
    "Generator Maintenance",
    "Electrical Troubleshooting",
    "Industrial Wiring",
    "Voltage Regulation",
    "Transformer Servicing",
    "UPS System Repair",
  ];
  const skills = [];
  for (const name of skillNames) {
    const skill = await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    skills.push(skill);
  }

  const certNames = ["Electrical Safety Certification", "Generator Level 2 Certification"];
  const certifications = [];
  for (const name of certNames) {
    const cert = await prisma.certification.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    certifications.push(cert);
  }

  // --- Give our one seeded technician a profile, a skill, and a valid certification ---
  const existingProfile = await prisma.technicianProfile.findUnique({
    where: { userId: technicianUser.id },
  });

  if (!existingProfile) {
    const profile = await prisma.technicianProfile.create({
      data: {
        userId: technicianUser.id,
        employeeId: "TECH-001",
        branch: "Dhaka",
        department: "Field Operations",
        designation: "Senior Electrical Technician",
        status: TechnicianStatus.AVAILABLE,
        currentArea: "Gazipur",
      },
    });

    await prisma.technicianSkill.create({
      data: { technicianProfileId: profile.id, skillId: skills[0].id },
    });

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    await prisma.technicianCertification.create({
      data: {
        technicianProfileId: profile.id,
        certificationId: certifications[0].id,
        expiryDate: oneYearFromNow,
      },
    });
  }

  console.log("Seed complete. Test accounts (all use password: password123):");
  console.log(`  Admin:      ${admin.email}`);
  console.log(`  Dispatcher: ${dispatcher.email}`);
  console.log(`  Technician: ${technicianUser.email}`);
  console.log(`  Customer:   ${customer.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
