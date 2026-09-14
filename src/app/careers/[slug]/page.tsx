import { notFound } from "next/navigation";
import { PublicShell } from "@/components/site/PublicShell";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { getJob } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return createMetadata({ title: "Role", description: "MatriBhumi careers", path: `/careers/${slug}` });
  return createMetadata({
    title: job.title,
    description: job.description.slice(0, 160),
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job || !job.published) notFound();

  return (
    <PublicShell>
      <article className="px-4 pb-20 pt-28 sm:px-6 md:px-12 md:pt-32">
        <p className="text-[11px] uppercase tracking-[0.22em] text-earth">
          {job.department} · {job.location} · {job.type}
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-[2.1rem] leading-tight sm:text-5xl md:text-6xl">{job.title}</h1>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-muted leading-8">
            <p>{job.description}</p>
            <div>
              <h2 className="font-display text-3xl text-charcoal">What we look for</h2>
              <p className="mt-3">{job.requirements}</p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl">Apply</h2>
            <p className="mt-2 text-sm text-muted">Demonstration application. Attach a resume and a short letter.</p>
            <div className="mt-6">
              <ApplicationForm jobId={job.id} />
            </div>
          </div>
        </div>
      </article>
    </PublicShell>
  );
}
