import { z } from "zod";

export const jobSubmissionSchema = z.object({
  title: z.string().min(3).max(100),
  company: z.string().min(2).max(100),
  location: z.enum(["Remote", "Hybrid", "Onsite"]),
  applyUrl: z.string().url().max(255),
  description: z.string().min(10).max(2048),
  contactEmail: z.string().email().max(100),
});