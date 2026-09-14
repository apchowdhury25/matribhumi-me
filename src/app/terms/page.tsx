import { PublicShell } from "@/components/site/PublicShell";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Terms",
  description: "Terms of use for the MatriBhumi demonstration website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PublicShell>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1 className="font-display text-5xl">Terms of use</h1>
        <p className="mt-6 leading-8 text-muted">
          This website is a demonstration of how MatriBhumi might present homes in Bangladesh for families living overseas — vacation and part-year stays, not investment products. Content, prices, and availability are fictional unless we say otherwise. Nothing here is an offer to sell real property or an invitation to invest.
        </p>
        <p className="mt-4 leading-8 text-muted">
          You may not scrape, misrepresent, or republish the brand as if these projects were live inventory.
        </p>
        <p className="mt-10 text-sm text-muted">{siteConfig.demoNotice}</p>
      </article>
    </PublicShell>
  );
}
