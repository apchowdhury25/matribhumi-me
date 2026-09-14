import { PublicShell } from "@/components/site/PublicShell";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Disclaimer",
  description: "MatriBhumi does not guarantee investment performance.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <PublicShell>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1 className="font-display text-5xl">Disclaimer</h1>
        <p className="mt-6 leading-8 text-muted">
          MatriBhumi homes are described for vacation and part-year stays, for retirement in Bangladesh, and for everyday living in districts such as Bashundhara — not as investment products. We are not Bashundhara Group. We do not guarantee returns, capital appreciation, rental income, occupancy, or any other financial outcome. Discussions of location and construction are educational. They are not financial, legal, or tax advice.
        </p>
        <p className="mt-4 leading-8 text-muted">
          Projects, photography, people, and prices on this site are fictional demonstration content unless explicitly identified as otherwise.
        </p>
        <p className="mt-10 text-sm text-muted">{siteConfig.url}</p>
      </article>
    </PublicShell>
  );
}
