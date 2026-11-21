<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0:0f172a,50:10b981,100:06b6d4&height=220&section=header&text=VoltOps%20Backend&fontSize=48&fontAlignY=38&desc=B2B%20Commercial%20Field%20Service%20%26%20Dispatch%20API&descFontSize=20&descAlignY=60&fontColor=ffffff" width="100%" alt="VoltOps Backend Banner" />
</div>

<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=1000&color=10B981&center=true&vCenter=true&width=650&lines=Node.js+%2B+Express+%2B+TypeScript;Prisma+ORM+%2B+Neon+PostgreSQL;Deterministic+Technician+Matching+Engine;Real-Time+Socket.io+Dispatch+%26+SLA+Tracking" alt="Typing SVG" />
  </a>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20_LTS-0f172a?style=for-the-badge&logo=node.js&logoColor=10b981" alt="Node.js 20 LTS" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-0f172a?style=for-the-badge&logo=typescript&logoColor=06b6d4" alt="TypeScript 5.6" />
  <img src="https://img.shields.io/badge/Express-4.21-0f172a?style=for-the-badge&logo=express&logoColor=ffffff" alt="Express 4.21" />
  <img src="https://img.shields.io/badge/Prisma-5.20-0f172a?style=for-the-badge&logo=prisma&logoColor=10b981" alt="Prisma 5.20" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon_Cloud-0f172a?style=for-the-badge&logo=postgresql&logoColor=06b6d4" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Socket.io-4.8-0f172a?style=for-the-badge&logo=socket.io&logoColor=ffffff" alt="Socket.io" />
  <a href="https://github.com/pranta2003/VoltOps-Backend/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/pranta2003/VoltOps-Backend/ci.yml?branch=pranta&style=for-the-badge&label=CI%20Build&color=10b981" alt="CI Build" />
  </a>
  <a href="https://github.com/pranta2003/VoltOps-Frontend">
    <img src="https://img.shields.io/badge/Frontend_Repo-VoltOps--Frontend-0f172a?style=for-the-badge&logo=github&logoColor=10b981" alt="Frontend Repo" />
  </a>
</p>

---

## 1. Project & Architecture Overview

**VoltOps Backend** is the high-performance core dispatch, workforce management, and SLA coordination API for the VoltOps Commercial Field Service ecosystem. It powers real-time technician matching, automated SLA tracking, customer service requests, work order state machines, and authenticated multi-role operations across 4 distinct portals: **Admin**, **Dispatcher**, **Technician**, and **Commercial Customer**.

- **Backend Repository**: [https://github.com/pranta2003/VoltOps-Backend](https://github.com/pranta2003/VoltOps-Backend)
- **Frontend Repository**: [https://github.com/pranta2003/VoltOps-Frontend](https://github.com/pranta2003/VoltOps-Frontend)
- **Live Frontend Deployment**: [https://voltops-frontend.vercel.app](https://voltops-frontend.vercel.app)
- **SDP-4 Project Plan**: `PROJECT_PLAN.md`
- **Implementation Ledger**: `docs/IMPLEMENTATION_PROGRESS.md`

### 1.1 Canonical Service Categories (7 Supported Trades)
All technician passports, matching calculations, and work order classifications strictly adhere to the 7 canonical trade categories:
1. **Electrical and power systems**
2. **AC, HVAC, and cooling**
3. **CCTV and security**
4. **Internet, networking, and hardware**
5. **IT and software support**
6. **Plumbing and water systems**
7. **Facility maintenance**

### 1.2 SLA Commitments & Matching Engine
- **Plan A (8-Hour Daily Coverage)**: Standard daytime business coverage; no rapid physical arrival SLA.
- **Plan B (24/7 Standard)**: Round-the-clock commercial coverage with a strict **40-minute physical arrival SLA**.
- **Plan C (24/7 Priority)**: Mission-critical 24/7 coverage with an accelerated **20-minute rapid arrival SLA**.
- **Plan D (Custom Coverage)**: Multi-facility bespoke SLAs.
- **Deterministic Technician Matching**: Computes eligible technicians based on hard constraints (trade certification, geographical branch proximity, duty status) combined with multi-factor scoring (workload balance, active queue depth). The AI engine provides transparent advisory scoring—**human dispatchers retain final confirmation authority**.

---

## 2. Technology Stack & Directory Structure

- **Runtime & Language**: Node.js 20 LTS, TypeScript 5.6
- **Server Framework**: Express 4.21 with strict CORS & helmet middleware
- **Database & ORM**: PostgreSQL (Cloud-hosted via Neon), Prisma ORM 5.20
- **Authentication**: Stateless JSON Web Tokens (`jsonwebtoken 9.0`), `bcryptjs` password hashing
- **Real-Time Layer**: Socket.io 4.8 for instant technician dispatch notifications and SLA countdowns
- **Validation**: Type-safe schema parsing via Zod 3.23

### Repository Directory Tree
```
voltops-backend/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                 # Node.js 20 LTS build & Prisma validation gates
│   └── pull_request_template.md   # Standardized PR checklist and review guidelines
├── docs/
│   └── IMPLEMENTATION_PROGRESS.md # Daily commit hash accounting & milestone tracking
├── prisma/
│   ├── schema.prisma              # Data models, enums & relational schema
│   └── seed.ts                    # Demo seed data (4 roles, default password123)
├── src/
│   ├── config/                    # Environment variables, database & JWT configs
│   ├── controllers/               # Business logic & request controllers
│   ├── lib/                       # Deterministic technician matching engine & socket emitters
│   ├── middleware/                # JWT auth guard, role-based authorization & error handler
│   ├── routes/                    # Express modular route definitions
│   ├── types/                     # Shared TypeScript interfaces & payload models
│   ├── utils/                     # Formatting, logger & calculation utilities
│   ├── app.ts                     # Express application configuration
│   └── index.ts                   # HTTP server & WebSocket initialization
├── .env.example                   # Baseline environment variable template
├── package.json                   # Dependencies & build scripts
└── tsconfig.json                  # Strict TypeScript compiler options
```

---

## 3. Quick Local Development Setup

### Prerequisites
- **Node.js**: `v20.x.x` (LTS recommended) — [https://nodejs.org](https://nodejs.org)
- **PostgreSQL Database**: Free managed PostgreSQL instance from [https://neon.tech](https://neon.tech) or local PostgreSQL instance.

### Installation & Environment Configuration
```bash
# 1. Clone repository
git clone https://github.com/pranta2003/VoltOps-Backend.git
cd VoltOps-Backend

# 2. Install dependencies cleanly
npm ci

# 3. Configure environment variables
# On Windows PowerShell:
Copy-Item .env.example .env
# On macOS / Linux:
cp .env.example .env
```

Open `.env` and supply your database connection string and secret keys:
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="super-secret-voltops-jwt-token-key-min-32-chars-long"
JWT_EXPIRES_IN="7d"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

### Database Migration & Seeding
```bash
# Validate Prisma schema
npx prisma validate

# Generate Prisma Client models
npm run prisma:generate

# Apply database migrations
npm run prisma:migrate

# Seed baseline demonstration accounts
npm run seed
```

### Default Demonstration Credentials
All seeded baseline demonstration accounts use the password: `password123`

| Role | Email | Password | Access Scope |
|---|---|---|---|
| **Admin** | `admin@voltops.test` | `password123` | Full enterprise control, staff management, audit log |
| **Dispatcher** | `dispatcher@voltops.test` | `password123` | SLA triage, work order dispatch, technician matching |
| **Technician** | `technician@voltops.test` | `password123` | Job status progression (`TRAVELLING` → `ON_SITE` → `COMPLETED`) |
| **Customer** | `customer@voltops.test` | `password123` | Service request filing, SLA tracking, digital invoices |

### Running the API Server
```bash
# Start in development mode with hot reload
npm run dev

# Compile TypeScript production build
npm run build

# Start production server
npm start
```
The API server will listen on `http://localhost:5000/api` (or custom `PORT` in `.env`).

---

## 4. GitHub Actions CI/CD Quality Gates

Every push and Pull Request targeting `pranta` or `main` automatically triggers `.github/workflows/ci.yml`. The following checks must pass with zero warnings or errors before any branch can be merged:

1. `npm ci` — Deterministic clean installation from `package-lock.json`.
2. `npx prisma validate` — Schema syntax and relational constraint verification.
3. `npm run prisma:generate` — Type-safe client generation.
4. `npm run build` (`tsc`) — Production TypeScript compilation with zero type errors.

---

## 5. Team Ownership & Branching Model

| Teammate | Working Branch | Primary Module Ownership |
|---|---|---|
| **Pranta** | `pranta` | Project Lead, system integration, architectural review, PR approvals. |
| **Bani** | `bani` | Dispatcher dashboard, service requests, work orders, technician matching & assignment. |
| **Meshba** | `meshba` | Registration & admin foundation, staff/technician/customer management, credentials audit. |
| **Prity** | `prity` | Customer requests & arrival tracking, technician daily jobs, invoices & payments. |

```
feature/<module-name> ──> Pull Request ──> Review & CI ──> pranta ──> Release PR ──> main
```

---

# 8. GitHub workflow — প্রতিদিন কাজ শুরু করার আগে

এই অংশটি প্রতিদিন কাজ শুরুর আগে পড়বে। কোনো কমান্ড বুঝতে না পারলে অনুমান করে চালাবে না—টিম লিডকে জিজ্ঞেস করবে।

## আমাদের branch-গুলো

- `main` — Production/stable branch. GitHub ruleset দ্বারা সুরক্ষিত। এখানে সরাসরি কোনো push করা যাবে না।
- `pranta` — Pranta-র personal working branch এবং মূল integration branch।
- `bani` — Bani-র personal working branch।
- `meshba` — Mesbah-র personal working branch (আগের design brief-এ Limon নামে ছিল)।
- `prity` — Prity-র personal working branch।

> **নিয়ম:** প্রত্যেকে নিজের নামের branch-এ কাজ করবে। অন্য কারও branch-এ অনুমতি ছাড়া commit বা push করবে না। `main`-এ সরাসরি কোনো কাজ বা push করবে না।

---

## 8.1 প্রথমবার নিজের branch setup

নিচের উদাহরণে `bani` ব্যবহার করা হয়েছে। Pranta হলে `pranta`, Mesbah হলে `meshba`, আর Prity হলে `prity` লিখবে:

```bash
git status
git fetch origin
git switch bani
```

যদি `git switch bani` বলে local branch নেই, তাহলে চালাও:

```bash
git switch --track origin/bani
```

তারপর নিশ্চিত হও যে তুমি সঠিক branch-এ আছ:

```bash
git branch --show-current
```

Output-এ তোমার নিজের branch-এর নাম থাকতে হবে। ভুল branch দেখালে কোনো ফাইল edit বা commit করবে না।

---

## 8.2 প্রতিদিন কাজ শুরু করার আগে

প্রথমে বর্তমান কাজ নিরাপদ আছে কি না দেখো:

```bash
git status
```

যদি uncommitted changes থাকে, সেগুলো না বুঝে discard, reset বা overwrite করবে না। দরকার হলে আগে commit করো বা টিম লিডের সাহায্য নাও।

তারপর remote-এর সর্বশেষ তথ্য আনো এবং নিজের branch-এ যাও:

```bash
git fetch origin
git switch bani
git log -1 --oneline
git pull --ff-only origin bani
```

- `git log -1 --oneline` সর্বশেষ commit দেখায়।
- `git pull --ff-only origin bani` নিজের remote branch-এর নতুন commit নামায়।
- `--ff-only` conflict হলে Git-কে জোর করে merge commit বানাতে দেয় না। Command ব্যর্থ হলে থামবে এবং টিম লিডের সাহায্য চাইবে।

> **সতর্কতা:** যদি তোমার branch-এ local uncommitted changes থাকে, আগে সেগুলো নিরাপদ করো। Pull করার আগে `git status` পরিষ্কার থাকা সবচেয়ে নিরাপদ।

---

## 8.3 কাজ করার সময় নিয়মাবলী

1. নিজের assigned controller, route, service বা feature-এ কাজ করো।
2. অন্য teammate-এর ফাইল edit করার আগে তার সঙ্গে কথা বলো, বিশেষ করে shared `src/app.ts`, `src/index.ts`, `prisma/schema.prisma`, `src/types/`, বা middleware ফাইল হলে।
3. ছোট ছোট, অর্থপূর্ণ commit করো (`feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`)। কাজের অগ্রগতি নিয়মিত save করো।
4. `.env`, database password, API secret, JWT secret বা private key কখনো GitHub-এ push করবে না।
5. কাজ শেষে push করার আগে স্থানীয়ভাবে schema validation ও build পরীক্ষা চালাও:

```bash
# Prisma schema যাচাই
npx prisma validate

# TypeScript build পরীক্ষা
npm run build
```

যদি কোনো error আসে, তা সমাধান না করে push করবে না।

---

## 8.4 নিজের branch-এ code push করার নিয়ম

প্রথমে নিশ্চিত হও যে তুমি নিজের branch-এ আছ:

```bash
git branch --show-current
git status
```

যদি `bani` branch-এ থাকো এবং শুধু তোমার intended files stage করতে চাও:

```bash
git add path/to/your-file
git diff --cached
git commit -m "feat: implement work order assignment controller"
git push origin bani
```

`path/to/your-file`-এর জায়গায় আসল file path লিখবে। একাধিক নির্দিষ্ট file হলে সেগুলো `git add`-এ দিতে পারো। সব পরিবর্তন কার, তা নিশ্চিত না হলে অন্ধভাবে `git add .` চালাবে না।

প্রথমবার local branch remote-এর সঙ্গে যুক্ত না থাকলে:

```bash
git push -u origin bani
```

তারপর থেকে সাধারণত `git push origin bani` ব্যবহার করা যাবে।

> **খুব গুরুত্বপূর্ণ:** `bani`-র জায়গায় নিজের branch-এর নাম লিখবে। **`git push origin main` চালাবে না।** ভুল করে `main`-এ push করার চেষ্টা করলে GitHub branch protection reject করবে।

---

## 8.5 Feature শেষ হলে Pull Request (PR) কীভাবে করবে

1. নিজের branch-এ সব intended changes commit ও push করো।
2. GitHub repository খোলো: [https://github.com/pranta2003/VoltOps-Backend](https://github.com/pranta2003/VoltOps-Backend)
3. **Pull requests → New pull request**-এ যাও।
4. **Base branch নির্বাচন**: `base` হবে **`pranta`** (অথবা রিলিজের সময় `main`); `compare` হবে তোমার branch (`bani`, `meshba` বা `prity`)।
5. **Files changed** tab-এ diff দেখে নিশ্চিত হও যে অন্যের কাজ, `.env`, অপ্রাসঙ্গিক ফাইল বা অসম্পূর্ণ পরিবর্তন ঢুকে যায়নি।
6. PR title ও description-এ কী বানিয়েছ, কীভাবে test করেছ, কী বাকি আছে—লিখো।
7. GitHub Actions CI checks (`build`, `prisma validate`) pass হওয়া এবং reviewer approval না পাওয়া পর্যন্ত merge করবে না। Merge করার চূড়ান্ত অনুমোদন টিম লিডের।
8. PR merge হওয়ার পর তোমার personal branch delete করবে না। এই branch-গুলো permanent team working branch হিসেবে সংরক্ষিত থাকবে।
9. Merge-এর পর নিজের branch-এ ফিরে `pranta` (বা `main`)-এর নতুন পরিবর্তন আনতে নিচের safe sequence ব্যবহার করো:

```bash
git fetch origin
git switch bani
git pull --ff-only origin bani
git merge origin/pranta
```

যদি merge conflict হয়, আন্দাজ করে file overwrite করবে না। Conflict সমাধানে সাহায্য নাও, তারপর build চালিয়ে নিজের branch-এ push করো।

---

## 8.6 ভুল branch-এ থাকলে কী করবে?

যদি `git branch --show-current` তোমার নিজের branch না দেখায়, কোনো commit বা push করবে না। আগে `git status` দেখো। Uncommitted changes থাকলে সেগুলো নিরাপদ না করে branch switch কোরো না। দরকার হলে টিম লিডকে screenshot বা terminal output পাঠাও।

---

## 8.7 Team Git rules — অবশ্যই মানতে হবে

- **`main`-এ direct push কঠোরভাবে নিষিদ্ধ**; সব পরিবর্তন PR ও CI checks পাসের মাধ্যমে merge হবে।
- প্রত্যেকে কেবল নিজের personal branch-এ push করবে।
- অন্যের personal branch-এ অনুমতি ছাড়া push করবে না।
- Force push (`git push --force`) কখনোই চালাবে না।
- `git reset --hard`, `git clean -fd`, `git checkout .` বা `git restore .` চালিয়ে কাজ মুছবে না—টিম লিডের অনুমতি ছাড়া নয়।
- Conflict হলে কাজ বন্ধ করে সমাধান আলোচনা করো; ভুল করে accept-all বা পুরো file overwrite করবে না।
- PR-এ শুধু নিজের feature-এর সম্পর্কিত changes রাখবে।
- `.env` এবং database credentials / secrets কখনো commit বা push করবে না।
- PR merge করার আগে `npx prisma validate` এবং `npm run build` অবশ্যই pass করতে হবে।
- কাজ শেষ হলেও `pranta`, `bani`, `meshba`, `prity` personal branch কখনো delete করবে না।

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0:0f172a,50:10b981,100:06b6d4&height=120&section=footer" width="100%" alt="VoltOps Footer Wave" />
</div>
