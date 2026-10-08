import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { CounselReviewNotice } from "@/components/site/CounselReviewNotice";
import { counselReview, type LegalPageContent } from "@/config/legal";

export function LegalDocument({ page }: { page: LegalPageContent }) {
  return (
    <PublicShell>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <p className="text-[11px] uppercase tracking-[0.24em] text-earth">Bangladesh · pending counsel review</p>
        <h1 className="font-display mt-4 text-[2.1rem] sm:text-5xl">{page.title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated {counselReview.lastUpdated}. Jurisdiction: {counselReview.jurisdiction}.</p>
        <CounselReviewNotice className="mt-8" />
        {page.sections.filter((section) => section.heading !== "About this page").map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-display text-3xl">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 72)} className="mt-4 leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        <p className="mt-12 text-sm text-muted">
          Related pages:{" "}
          <Link href="/disclaimer" className="text-earth underline-offset-4 hover:underline">
            Disclaimer
          </Link>
          {" · "}
          <Link href="/disclaimer/buyer-fee" className="text-earth underline-offset-4 hover:underline">
            Buyer-fee disclosure
          </Link>
          {" · "}
          <Link href="/legal/bangladesh" className="text-earth underline-offset-4 hover:underline">
            Bangladesh legal information
          </Link>
        </p>
      </article>
    </PublicShell>
  );
}
