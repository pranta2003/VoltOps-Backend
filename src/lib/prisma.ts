// A single, shared Prisma Client instance for the whole app.
// Why this file exists: if every file that needs the database created its
// own `new PrismaClient()`, we'd open far too many database connections
// during development (every file save + auto-restart would add one more).
// Importing `prisma` from here instead means everyone shares one connection.

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
