import { PublicShell } from "@/components/site/PublicShell";
import { CounselReviewNotice } from "@/components/site/CounselReviewNotice";
import { bangladeshLegalTopics, counselReview, positioning } from "@/config/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Bangladesh legal information",
  description:
    "Editable Bangladesh legal-information area for MatriBhumi. Placeholders for qualified Bangladesh legal counsel. Not legal advice.",
  path: "/legal/bangladesh",
});

export default function BangladeshLegalPage() {
  return (
    <PublicShell>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <p className="text-[11px] uppercase tracking-[0.24em] text-earth">Bangladesh · pending counsel review</p>
        <h1 className="font-display mt-4 text-[2.1rem] sm:text-5xl">Bangladesh legal information</h1>
        <p className="mt-3 text-sm text-muted">
          Last updated {counselReview.lastUpdated}. Jurisdiction: {counselReview.jurisdiction}.
        </p>
        <CounselReviewNotice className="mt-8" />
        <p className="mt-8 leading-8 text-muted">{positioning.summary}</p>
        <p className="mt-4 leading-8 text-muted">{positioning.licence}</p>
        <p className="mt-4 leading-8 text-muted">{counselReview.notLegalAdvice}</p>
        <div className="mt-12 grid gap-8">
          {bangladeshLegalTopics.map((topic) => (
            <section key={topic.id} className="border-t border-charcoal/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-earth">Pending counsel</p>
              <h2 className="font-display mt-2 text-3xl">{topic.title}</h2>
              <p className="mt-4 leading-8 text-muted">{topic.body}</p>
            </section>
          ))}
        </div>
      </article>
    </PublicShell>
  );
}
