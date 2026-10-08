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
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <h1 className="font-display text-[2.1rem] sm:text-5xl">Disclaimer</h1>
        <p className="mt-6 leading-8 text-muted">
          MatriBhumi presents selected residences from participating developers for vacation and part-year stays, for retirement, and for everyday living. {siteConfig.positioning} {siteConfig.districtRelation} We are not Bashundhara Group, and we are not the developer of record unless a listing is marked MatriBhumi-owned. Prices, floor plans, and completion dates are indicative until an agreement is signed with the developer. We do not guarantee returns, capital appreciation, rental income, occupancy, or any other financial outcome. Nothing on this website is financial, legal, or tax advice. {siteConfig.buyerFee}
        </p>
        <p className="mt-10 text-sm text-muted">{siteConfig.url}</p>
      </article>
    </PublicShell>
  );
}
