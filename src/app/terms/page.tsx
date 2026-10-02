import { PublicShell } from "@/components/site/PublicShell";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Terms",
  description: "Terms of use for the MatriBhumi website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PublicShell>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <h1 className="font-display text-[2.1rem] sm:text-5xl">Terms of use</h1>
        <p className="mt-6 leading-8 text-muted">
          MatriBhumi is an independent, premium boutique architectural design and development firm. Materials on this website describe exclusive pre-launch developments. Prices, availability, and completion dates are indicative until a reservation agreement is signed. Nothing here promises rental income, appreciation, or a financial return, and nothing is legal or tax advice.
        </p>
        <p className="mt-4 leading-8 text-muted">
          You may not scrape or misrepresent MatriBhumi, our developments, or this website. Developments within Bashundhara are private projects of MatriBhumi, integrated with the district. They are not projects of Bashundhara Group.
        </p>
        <p className="mt-10 text-sm text-muted">{siteConfig.url}</p>
      </article>
    </PublicShell>
  );
}
