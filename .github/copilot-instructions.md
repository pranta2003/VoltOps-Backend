# Copilot Instructions — VoltOps Backend

## Tech stack
- Node.js + Express + TypeScript (strict mode)
- Prisma ORM + PostgreSQL — see prisma/schema.prisma for all models
- JWT auth (jsonwebtoken), bcryptjs for password hashing, zod for request validation
- Socket.io for real-time updates (wired in, not yet used by any feature)

## Conventions to follow
- Controllers go in src/controllers/, one file per feature area. Routes go in
  src/routes/, registered in src/routes/index.ts.
- Every protected route uses `requireAuth` + `authorize(...)` middleware. Never trust
  the frontend to enforce roles — the backend is the real security boundary.
- Always import the shared `prisma` client from src/lib/prisma.ts — never
  `new PrismaClient()` anywhere else.
- Business rules (eligibility checks, status transitions, match scoring) must be
  plain, deterministic TypeScript functions — testable, no randomness, no AI involved.

## AI usage boundary (important — do not violate this)
AI (an external API call, e.g. Claude or OpenAI) is used ONLY for:
1. Turning an already-computed match score + reasons into a plain-English sentence
2. Parsing a pasted CV into structured fields (skills, experience, certifications)

AI never computes the match score itself and never makes an assign/hire decision —
those stay 100% deterministic backend code. See PROJECT_PLAN.md for the full scope.