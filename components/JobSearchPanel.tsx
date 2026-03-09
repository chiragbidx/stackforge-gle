"use client";
import { useState } from "react";

export default function JobSearchPanel() {
  const [query, setQuery] = useState("");
  // Placeholder: Could filter locally if data passed via props; for now, just UI
  return (
    <form
      className="rounded-xl border border-[#fb7232]/20 bg-white/70 p-6 shadow-md flex flex-col gap-4"
      onSubmit={e => e.preventDefault()}
      aria-label="Search remote jobs"
    >
      <div className="flex gap-3 items-center">
        <input
          className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search jobs by keyword, company, or skill"
        />
        <button
          type="submit"
          className="inline-flex rounded-lg bg-[#fb7232] px-6 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#e06225]"
        >
          Search
        </button>
      </div>
      {/* Nonfunctional; filter UX only. Full server/client filtering can be added later. */}
      <div className="flex items-center gap-4 mt-2">
        <label className="flex gap-1 items-center text-xs">
          <input type="checkbox" className="accent-[#fb7232]" checked readOnly />
          Remote only
        </label>
        <label className="flex gap-1 items-center text-xs text-zinc-400">
          <input type="checkbox" className="accent-[#fb7232]" disabled />
          Hybrid
        </label>
        <label className="flex gap-1 items-center text-xs text-zinc-400">
          <input type="checkbox" className="accent-[#fb7232]" disabled />
          Onsite
        </label>
      </div>
    </form>
  );
}