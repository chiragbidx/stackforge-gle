"use server";
import { db } from "@/lib/db/client";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { jobSubmissionSchema } from "@/lib/validation/jobSubmissionSchema";

// Server action: create a job
export async function createJob(formData: FormData) {
  const values = {
    title: formData.get("title"),
    company: formData.get("company"),
    location: formData.get("location"),
    applyUrl: formData.get("applyUrl"),
    description: formData.get("description"),
    contactEmail: formData.get("contactEmail"),
  };

  const parse = jobSubmissionSchema.safeParse(values);
  if (!parse.success) {
    return { error: parse.error.flatten() };
  }

  await db.insert(jobs).values(parse.data);

  return { success: true };
}

// Server action: fetch jobs (latest first)
export async function getJobs() {
  return db.select().from(jobs).orderBy(desc(jobs.createdAt));
}