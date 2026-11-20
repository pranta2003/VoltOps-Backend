# VoltOps — Backend API

This is the **backend API** for VoltOps (Commercial Field Service & Emergency Technician Coordination Platform).

- **Backend Repository:** [https://github.com/pranta2003/VoltOps-Backend](https://github.com/pranta2003/VoltOps-Backend)
- **Frontend Repository:** [https://github.com/pranta2003/VoltOps-Frontend](https://github.com/pranta2003/VoltOps-Frontend)

For the complete project plan, course milestone alignment, and technical specifications, refer to `PROJECT_PLAN.md` and `docs/IMPLEMENTATION_PROGRESS.md`.

---

## 1. Architecture & Technology Stack

- **Runtime & Framework**: Node.js 20 LTS, Express (`^4.21.0`), TypeScript (`^5.6.2`).
- **Database & ORM**: PostgreSQL (cloud hosted via Neon/Supabase), Prisma ORM (`^5.20.0`).
- **Authentication & Security**: JWT (`jsonwebtoken ^9.0.2`), `bcryptjs ^2.4.3`, CORS protection.
- **Real-Time Communication**: Socket.io (`^4.8.0`).
- **Validation**: Zod schema validation (`^3.23.8`).

---

## 2. Team Ownership & Git Branching Workflow

### Branch Conventions

| Teammate | Working Branch | Primary Module Ownership |
|---|---|---|
| **Pranta** | `pranta` | Project Lead, system integration, architectural review, PR approvals. |
| **Bani** | `bani` | Dispatcher dashboard, service requests, work orders, technician matching & assignment. |
| **Meshba** | `meshba` | Registration & admin foundation, staff/technician/customer management, credentials audit. |
| **Prity** | `prity` | Customer requests & arrival tracking, technician daily jobs, invoices & payments. |

### Contribution Lifecycle

1. **Production Branch (`main`)**: Protected. Direct pushes and force pushes are blocked by GitHub rulesets. All merges must go through a verified Pull Request with passing CI checks.
2. **Integration Branch (`pranta`)**: Stable integration branch where feature PRs are reviewed and tested before landing on `main`.
3. **Workflow**:
   ```
   feature/<topic> ──> Pull Request ──> Review & CI ──> pranta ──> Final PR ──> main
   ```
4. **Conventional Commits**: Every commit must use conventional commit formatting:
   - `feat:` — New user-facing or API capability
   - `fix:` — Bug fix or error resolution
   - `refactor:` — Code structure improvement with no behavior change
   - `docs:` — Documentation updates
   - `test:` — Test suite additions or fixes
   - `chore:` — Dependency updates, tooling, or build configuration

---

## 3. GitHub Actions CI/CD Quality Gates

Every push and Pull Request targeting `pranta` or `main` triggers `.github/workflows/ci.yml`:
1. `npm ci` — Deterministic clean installation from `package-lock.json`.
2. `npx prisma validate` — Validates structural integrity of `prisma/schema.prisma`.
3. `npm run prisma:generate` — Generates type-safe Prisma Client models.
4. `npm run build` (`tsc`) — Compiles TypeScript without errors.

---

## 4. Local Development Setup

### Prerequisites
- **Node.js** 20 LTS — [https://nodejs.org](https://nodejs.org)
- **PostgreSQL Database** — Free managed instance from [https://neon.tech](https://neon.tech) or [https://supabase.com](https://supabase.com).

### Installation & Environment

```bash
# 1. Install dependencies
npm ci

# 2. Configure environment
# Windows:
copy .env.example .env
# Mac/Linux:
cp .env.example .env
```

Open `.env` and configure:
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="replace-with-a-secure-random-secret-key-at-least-32-characters"
JWT_EXPIRES_IN="7d"
PORT=5000
FRONTEND_URL="http://localhost:5173"
```

### Database Migration & Seeding

```bash
# Generate Prisma Client
npm run prisma:generate

# Apply database migrations
npm run prisma:migrate

# Seed baseline demonstration accounts
npm run seed
```

Default seeded accounts (`password123`):
- **Admin**: `admin@voltops.test`
- **Dispatcher**: `dispatcher@voltops.test`
- **Technician**: `technician@voltops.test`
- **Customer**: `customer@voltops.test`

### Running the API

```bash
# Development mode with hot reload
npm run dev

# Production build & start
npm run build
npm start
```
Default API endpoint: `http://localhost:5000/api`
