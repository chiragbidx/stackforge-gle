-- Enable pgcrypto for gen_random_uuid (safe no-op if already present)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS "jobs" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "apply_url" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "contact_email" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);