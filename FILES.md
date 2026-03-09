# FILES.md — Structural & Architectural Index (Next.js App Router Starter)

AI-facing index of the repository as it exists today. Drizzle ORM (PostgreSQL) and auth-ready dependencies are present; routes/auth wiring are not yet added. If something is unclear: **STOP AND ASK**.

---

## 1. High-Level Overview
- Purpose: minimal App Router scaffold for future SaaS UI, now with Drizzle + Postgres base schema.
- Style: file-system routing, server-preferred components.
- Tech: Next.js 16, React 19, TypeScript 5, Tailwind-ready PostCSS, ESLint 9.
- Present: Drizzle schema + initial migration for `users`.
- Not present: auth routes/config, API routes, queues, tests.

## 2. Application Entry Points
- `app/layout.tsx`: Root layout; applies globals (Geist fonts removed).
- `app/page.tsx`: Public landing page (server component).
- `app/globals.css`: Global styles; imports Tailwind; defines light/dark CSS variables.
- `next.config.ts`: Minimal Next config placeholder.
- `postcss.config.mjs`: PostCSS with `@tailwindcss/postcss`.
- No `middleware.ts`; requests go straight to App Router.

## 3. Modules / Feature Areas
- `app/`: UI shell and routing.
- `components/`: Shared UI; currently contains client-only helpers (AgentActionPanel, ErrorReporter).
- `public/`: Static assets (logos/icons).
- `lib/db/`: Drizzle schema and client.
- `drizzle/`: SQL migrations + meta journal.
- Config/tooling: `eslint.config.mjs`, `postcss.config.mjs`, `next.config.ts`, `tsconfig.json`, `drizzle.config.ts`.
- No route groups yet; create when needed.

## 4. Routes (Controllers)
- `/` → `app/page.tsx`
  - Purpose: Panda-themed landing page with hero, four feature cards, an agent note client island, and footer link lists.
  - Layout: responsive, centered content up to ~1600px, buttons/menu wrap on small screens; client interactivity isolated.
  - DTOs/validation/guards: none; render-only.

## 5. Services & Providers
- None. Introduce server-only helpers under `lib/` when backend/data is added.

## 6. Data Layer
- ORM/DB: Drizzle ORM + PostgreSQL. Schema lives under `lib/db/`; migrations live under `drizzle/`. Keep migrations and schema in sync; avoid hand-editing beyond committed SQL unless intentional.

## 7. DTOs, Schemas & Validation
- None. When adding APIs/forms, keep validators with the feature or under `lib/validation/` and document contracts.

## 8. Cross-Cutting Concerns
- Auth, logging, tracing, error filters: not implemented. Centralize any new cross-cutting utilities under `lib/` and wire via layouts/middleware intentionally.

## 9. Configuration & Environment
- `env.example`: lists `OPENAI_API_KEY`, `DATABASE_URL` (Postgres), `DATABASE_SSL`, `NEXTAUTH_SECRET` (reuse `AUTH_SECRET`), optional `OPENAI_MODEL`; never commit secrets.
- Secrets: keep in `.env.local` (gitignored) once keys exist.
- Config files in repo: `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `drizzle.config.ts`.

## 10. Async & Background Processing
- Queues/workers/schedulers: none. Add in a separate runtime or route handlers when required and document.

## 11. Testing Structure
- No tests. Suggested layout when added: unit (`__tests__/` or co-located), e2e (`e2e/` via Playwright), shared fixtures in `tests/utils/`.

## 12. File & Directory Index
```
.gitignore            # Git ignores
README.md             # Operational guide
FILES.md              # Structural index (this file)
RULES.md              # Change boundaries (boilerplate)
Dockerfile            # Container definition (npm ci, runs dev-supervisor)
app/
  favicon.ico         # Favicon
  globals.css         # Global styles + Tailwind entry
  layout.tsx          # Root layout with fonts
  page.tsx            # Public landing page (/)
public/
  file.svg            # Sample asset
  globe.svg           # Sample asset
  next.svg            # Next.js logo
  vercel.svg          # Vercel logo
  window.svg          # Sample asset
scripts/
  db-init.js          # No-op placeholder (no DB configured)
  dev-supervisor.js   # Runs Next.js dev server (npx next dev) + git poller
  git-poll.js         # Polls git origin for branch updates
  error-reporter.ts   # Client-safe error forwarder used by ErrorReporter component
components/
  AgentActionPanel.tsx # Client island for notes; example pattern for hooks
  ErrorReporter.tsx   # Client component that initializes error reporter
lib/db/
  schema.ts           # Drizzle schema
  client.ts           # Drizzle + pg pool client
drizzle/
  0000_init.sql       # Initial migration
  meta/_journal.json  # Migration journal
drizzle.config.ts     # Drizzle CLI config
eslint.config.mjs     # ESLint config
next.config.ts        # Next.js config (placeholder)
postcss.config.mjs    # PostCSS config (Tailwind-ready)
tsconfig.json         # TypeScript config
package.json          # Scripts and dependencies
package-lock.json     # Locked deps
.git/                 # Git metadata
```

## 13. Safe Modification Guidance
- New public pages: add under `app/` with route folders (e.g., `app/about/page.tsx`).
- Future dashboard/auth: create route groups (`app/(dashboard)/...`, `app/(login)/...`) when introduced; wire shared layouts there.
- Shared UI: place in `components/` once created; keep pure/presentational.
- Data/API: place server code in `lib/` or `app/api/.../route.ts`; validate inputs at the edge; keep server-only dependencies out of client components.
- Avoid expanding global CSS; prefer scoped styles.
- Keep changes minimal; update README.md and RULES.md if scope (auth, DB, billing) is added.

---

If structure or intent is uncertain, **STOP AND ASK** before modifying.
