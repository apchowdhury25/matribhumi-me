import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { developerServices, siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "For developers",
  description:
    "Reach qualified buyers across Bangladesh, the UAE and Malaysia. MatriBhumi offers property marketing, buyer referrals, viewing coordination and transaction coordination. Sales are not guaranteed.",
  path: "/for-developers",
  image: "/media/about-construction.jpg",
});

export default function ForDevelopersPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-construction.jpg"
        eyebrow="For developers"
        title="Reach qualified buyers across Bangladesh, the UAE and Malaysia."
        description="MatriBhumi is an independent property advisory and transaction-coordination platform. We present selected projects to buyers we already advise — local buyers, NRBs, and relocators — and coordinate introductions and viewings. We do not promise guaranteed sales."
      />
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          eyebrow="How we work with developers"
          title="Marketing, matching, and coordination."
          description="Developer arrangements vary by project and jurisdiction. The buyer’s purchase agreement remains with you as the developer or seller."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {developerServices.map((item) => (
            <article key={item.title} className="border border-charcoal/10 bg-paper p-6">
              <h2 className="font-display text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          title="What we do not claim"
          description="MatriBhumi does not guarantee sales volumes, sell financial products, or publish commission percentages. Compensation, where applicable, is set in a separate commercial agreement."
        />
        <p className="mt-8 max-w-3xl text-sm leading-7 text-muted">{siteConfig.buyerFeeNote}</p>
      </section>
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <h2 className="font-display text-4xl">Discuss a listing</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Write to us about a project you would like presented to qualified buyers. Named developer profiles are
          published only after a partnership is confirmed.
        </p>
        <Button href="/contact" className="mt-8">
          Contact MatriBhumi
        </Button>
      </section>
    </PublicShell>
  );
}
