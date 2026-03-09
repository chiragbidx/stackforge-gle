import { getJobs } from "@/app/actions/jobs";
import JobPostForm from "@/components/JobPostForm";
import JobSearchPanel from "@/components/JobSearchPanel";

export const metadata = {
  title: "Joblyft – Remote Jobs Board",
  description: "Discover and post the latest remote jobs. Built with Next.js, Drizzle, and Tailwind.",
  openGraph: {
    title: "Joblyft – Remote Jobs Board",
    description: "Post or discover the newest remote-friendly tech jobs around the world.",
    type: "website",
  },
};

export default async function Home() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#ffe6d8] text-zinc-900">
      <main className="flex min-h-screen w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-[#fb7232]">Joblyft</span>
            <p className="text-sm font-medium text-[#c75829] sm:text-base">
              Your place for fresh remote work opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end w-full sm:w-auto">
            <a
              href="#jobs"
              className="w-full sm:w-auto text-center rounded-full border border-[#fb7232]/30 bg-white px-4 py-2 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              View Jobs
            </a>
            <a
              href="#post"
              className="w-full sm:w-auto text-center rounded-full bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
            >
              Post a Job
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="grid min-h-[340px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232] shadow-sm">
              100% Remote-Friendly
            </p>
            <h1 className="text-4xl font-black leading-tight text-[#3f1b08] sm:text-5xl">
              Discover and post remote jobs, worldwide.
            </h1>
            <p className="max-w-2xl text-lg leading-7 text-zinc-700">
              Joblyft collects the latest remote, hybrid, and tech jobs from top companies. Browse, search, or post new opportunities—no registration required.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-4 w-full">
              <a
                href="#jobs"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#fb7232] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
              >
                Explore Jobs
              </a>
              <a
                href="#post"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-[#fb7232]/30 bg-white px-5 py-3 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Post a Job
              </a>
            </div>
          </div>
          <JobSearchPanel />
        </section>

        {/* Jobs Listing */}
        <section id="jobs" className="space-y-8">
          <h2 className="text-2xl font-extrabold text-[#fb7232]">Latest Remote Jobs</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.length === 0 ? (
              <p className="text-base text-zinc-700">No jobs found. Check back soon or post a new one!</p>
            ) : (
              jobs.map((job: any) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-[#fb7232]/15 bg-white/80 p-6 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#ffe7dd] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#fb7232]">
                      {job.location}
                    </span>
                    <span className="text-xs text-zinc-400">{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#341404]">{job.title}</h3>
                  <p className="text-base font-semibold text-[#c75829]">{job.company}</p>
                  <p className="line-clamp-3 text-sm text-zinc-700">{job.description}</p>
                  <a
                    href={job.applyUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-2 inline-block rounded-lg bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e06225]"
                  >
                    Apply
                  </a>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Post a Job Form */}
        <section id="post" className="mt-20 max-w-3xl mx-auto w-full">
          <JobPostForm />
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-[#fb7232]/20 pt-10 pb-6 text-sm text-[#6a3515] text-center">
          <div>
            Joblyft &copy; {new Date().getFullYear()} &mdash; Built by Chirag Dodiya ({' '}
            <a href="mailto:chirag@bidx.ai" className="underline hover:text-[#fb7232]">chirag@bidx.ai</a>
            )
          </div>
          <div className="mt-2">
            <span>Open source, MIT licensed</span>
          </div>
        </footer>
      </main>
    </div>
  );
}