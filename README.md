# VoltOps — Backend

This is the **backend API** for VoltOps (AI-Powered Electrical Workforce & Service
Management Platform). This is one of two repos for this project:

- This repo: backend (Node + Express + TypeScript + Prisma + PostgreSQL)
- **Frontend repo:** `<add your frontend repo link here once created>`

For the full project plan, milestone roadmap, and feature scope, see
`PROJECT_PLAN.md` in this repo (same file also lives in the frontend repo).

---

## 1. What's already built (Milestone 1)

- JWT-based authentication: register (customer signup only), login, `/me`
- Role-based access control enforced on the backend (Admin, Dispatcher, Technician, Customer)
- Database schema (Prisma): Users, Technician Profiles, Skills, Certifications
- A working protected route beyond auth: a technician can fetch their own profile
- Socket.io wired into the server (ready for later, not used yet)

## 2. Prerequisites

- **Node.js** 18+ — https://nodejs.org
- A **free PostgreSQL database** — go to https://neon.tech, sign up, create a project,
  copy the connection string (looks like `postgresql://user:password@host/dbname?sslmode=require`)

## 3. First-time setup

```bash
npm install
```

```bash
# Windows:
copy .env.example .env
# Mac/Linux/Git Bash:
cp .env.example .env
```

Open `.env` and paste your Neon connection string into `DATABASE_URL`. Replace
`JWT_SECRET` with any long random string.

Create the database tables and seed test data:

```bash
npm run prisma:migrate
npm run seed
```

If asked for a migration name, type `init`.

You'll see test login credentials printed at the end (all use password `password123`):
```
Admin:      admin@voltops.test
Dispatcher: dispatcher@voltops.test
Technician: technician@voltops.test
Customer:   customer@voltops.test
```

Start the server:

```bash
npm run dev
```

You should see: `VoltOps API running at http://localhost:5000`

## 4. Everyday workflow

```bash
npm run dev
```

Whenever you change `prisma/schema.prisma`, run `npm run prisma:migrate` again.

## 5. Project structure

```
├── prisma/
│   ├── schema.prisma     ← database structure (all tables)
│   └── seed.ts           ← creates test accounts + sample data
└── src/
    ├── server.ts         ← entry point
    ├── app.ts            ← Express setup
    ├── lib/               prisma.ts (DB connection), socket.ts (live updates, unused for now)
    ├── middleware/        auth.ts, authorize.ts, errorHandler.ts
    ├── controllers/       actual feature logic
    ├── routes/            URL → controller mapping
    ├── utils/             jwt.ts
    └── types/             TypeScript type additions
```

## 6. Deploying

Use https://render.com or https://railway.app (free tier). Connect this GitHub repo,
copy your `.env` values into their dashboard's environment variables, done. Your Neon
database is already cloud-hosted — nothing changes there.

Once deployed, give the frontend team (or your own frontend repo's `.env`) this
backend's live URL as `VITE_API_URL`.

## 7. Why some things work the way they do

- **Public registration only creates Customer accounts** — intentional. Staff accounts
  (Admin/Dispatcher/Technician) are created by an Admin; until that screen is built,
  use the seed script's test accounts.
- **The frontend hiding a button is not real security** — every sensitive route here
  also checks the role itself (`src/middleware/authorize.ts`). That's the actual
  enforcement point.
