# FILES.md — Structural & Architectural Index (Next.js App Router Starter)

AI-facing index of the repository as it exists today. Drizzle ORM (PostgreSQL) and auth-ready dependencies are present; routes/auth wiring are not yet added. If something is unclear: **STOP AND ASK**.

---

## 1. High-Level Overview
- Purpose: minimal App Router scaffold for future SaaS UI (now "Joblyft" with jobs feature, Drizzle + Postgres base schema).
- Style: file-system routing, server-preferred components.
- Tech: Next.js 16, React 19, TypeScript 5, Tailwind-ready PostCSS, ESLint 9.
- Present: Drizzle schema + initial migration for `users`, `jobs`.
- Not present: auth routes/config, API routes, queues, tests.

## 2. Application Entry Points
- `app/layout.tsx`: Root layout; applies globals (Geist fonts removed). Metadata rebranded for Joblyft.
- `app/page.tsx`: Public landing page for Joblyft (remote jobs board).
- `app/globals.css`: Global styles; imports Tailwind; defines light/dark CSS variables.
- `next.config.ts`: Minimal Next config placeholder.
- `postcss.config.mjs`: PostCSS with `@tailwindcss/postcss`.
- No `middleware.ts`; requests go straight to App Router.

## 3. Modules / Feature Areas
- `app/`: UI shell and routing.
- `components/`: Shared UI; now includes job posting and search panels.
- `public/`: Static assets (logos/icons).
- `lib/db/`: Drizzle schema (now includes users and jobs) and client.
- `drizzle/`: SQL migrations + meta journal.
- Config/tooling: `eslint.config.mjs`, `postcss.config.mjs`, `next.config.ts`, `tsconfig.json`, `drizzle.config.ts`.
- No route groups yet; create when needed.

## 4. Routes (Controllers)
- `/` → `app/page.tsx`
  - Purpose: Joblyft-branded remote jobs board; hero, searchable job listing, "post a job" form; all public.
  - Layout: responsive, accessible, theme-accented; core interactivity delivered via client islands.
  - DTOs/validation: jobs feature uses Zod for validation server-side.

## 5. Services & Providers
- None. Server actions for jobs live under `app/actions/jobs.ts`.

## 6. Data Layer
- ORM/DB: Drizzle ORM + PostgreSQL. Schema lives under `lib/db/`; migrations live under `drizzle/`. Schema has tables for `users` and `jobs`.

## 7. DTOs, Schemas & Validation
- Jobs feature uses Zod for input validation in `app/actions/jobs.ts`.

## 8. Cross-Cutting Concerns
- Auth, logging, tracing, error filters: not implemented. Centralize any new cross-cutting utilities under `lib/` and wire via layouts/middleware intentionally.

## 9. Configuration & Environment
- `env.example`: lists all required env vars for OpenAI, database, and jobs feature (no new ones required).
- Config files: `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `drizzle.config.ts`.

## 10. Async & Background Processing
- Queues/workers/schedulers: none.

## 11. Testing Structure
- No tests.

## 12. File & Directory Index
```
.gitignore                # Git ignores
README.md                 # Operational guide
FILES.md                  # Structural index (this file)
RULES.md                  # Change boundaries (boilerplate)
Dockerfile                # Container definition (npm ci, runs dev-supervisor)
app/
  favicon.ico             # Favicon
  globals.css             # Global styles + Tailwind entry
  layout.tsx              # Root layout (site-wide metadata, branding)
  page.tsx                # Public landing page (Joblyft)
  actions/
    jobs.ts               # Server actions for jobs feature
components/
  AgentActionPanel.tsx    # Client island example
  ErrorReporter.tsx       # Error reporting
  JobSearchPanel.tsx      # Search/filter UI for job board
  JobPostForm.tsx         # Client-side "Post a Job" form
public/
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg
lib/db/
  schema.ts               # Drizzle schema (users, jobs)
  client.ts               # Drizzle + pg pool client
drizzle/
  0000_init.sql           # Initial migration
  0001_jobs.sql           # Jobs table migration
  meta/_journal.json      # Migration journal
drizzle.config.ts         # Drizzle CLI config
eslint.config.mjs         # ESLint config
next.config.ts            # Next.js config (placeholder)
postcss.config.mjs        # PostCSS config (Tailwind-ready)
tsconfig.json             # TypeScript config
package.json              # Scripts and dependencies
package-lock.json         # Locked deps
.git/                     # Git metadata
```

## 13. Safe Modification Guidance
- New public pages: add under `app/` with route folders (e.g., `app/about/page.tsx`).
- Future dashboard/auth: create route groups when needed.
- Jobs logic: keep all data access via server actions/Drizzle; form logic in own component.
- Data/API: place helpers in `lib/`/`app/` as needed; validate inputs; no secrets in client.
- Changes to DB: always update migrations/journal.
- Changes to Joblyft branding: update header, metadata, and index.

---

If structure or intent is uncertain, **STOP AND ASK** before modifying.