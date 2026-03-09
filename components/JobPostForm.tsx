"use client";
import { useRef, useState } from "react";
import { createJob } from "@/app/actions/jobs";

const DEFAULT_EMAIL = "chirag@bidx.ai";

const initialState = {
  title: "",
  company: "",
  location: "Remote",
  applyUrl: "",
  description: "",
  contactEmail: DEFAULT_EMAIL,
};

export default function JobPostForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: any } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const fd = new FormData(formRef.current!);
    const res = await createJob(fd);

    if ("success" in res) {
      setResult({ success: true });
      setForm(initialState);
    } else {
      setResult({ error: res.error });
    }
    setSubmitting(false);
  }

  return (
    <form
      ref={formRef}
      className="space-y-4 rounded-xl border border-[#fb7232]/20 bg-white/90 p-6 shadow-md"
      onSubmit={handleSubmit}
      aria-label="Post a remote job"
    >
      <h3 className="text-xl font-bold text-[#341404] mb-2">Post a Remote Job</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-[#fb7232] mb-1" htmlFor="title">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={100}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-[#fb7232] mb-1" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={100}
            placeholder="e.g. Panda Inc"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-[#fb7232] mb-1" htmlFor="location">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          >
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-[#fb7232] mb-1" htmlFor="applyUrl">
            Apply URL
          </label>
          <input
            id="applyUrl"
            name="applyUrl"
            value={form.applyUrl}
            onChange={handleChange}
            required
            type="url"
            maxLength={255}
            placeholder="https://company.com/careers/job-link"
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-[#fb7232] mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={2048}
          rows={4}
          placeholder="Short job description, requirements, perks, etc."
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-[#fb7232] mb-1" htmlFor="contactEmail">
          Contact Email
        </label>
        <input
          id="contactEmail"
          name="contactEmail"
          value={form.contactEmail}
          onChange={handleChange}
          type="email"
          required
          maxLength={100}
          placeholder="your@email.com"
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center rounded-lg bg-[#fb7232] px-6 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#e06225]"
        disabled={submitting}
      >
        {submitting ? "Posting..." : "Post Job"}
      </button>

      {result?.success && (
        <div className="mt-3 rounded bg-green-100 px-3 py-2 text-green-800 text-sm">
          Job posted! It will appear in the listing above.
        </div>
      )}
      {result?.error && (
        <div className="mt-3 rounded bg-red-100 px-3 py-2 text-red-800 text-sm">
          Problem: {JSON.stringify(result.error)}
        </div>
      )}
    </form>
  );
}