import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { developerServices, siteConfig } from "@/config/site";
import { developerCtas } from "@/config/ctas";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "For developers",
  description:
    "Reach qualified buyers across Bangladesh, the UAE and Malaysia. MatriBhumi offers property marketing, buyer referrals, viewing coordination and transaction coordination. Sales are not guaranteed.",
  path: "/for-developers",
  image: "/media/about-lobby.jpg",
});

export default function ForDevelopersPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-lobby.jpg"
        eyebrow="For developers"
        title="Are you a property developer?"
        description="Reach qualified buyers across Bangladesh, the UAE and Malaysia."
      >
        <Button href="/contact" variant="invert">
          {developerCtas.partner}
        </Button>
      </PageHero>
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="How we work with developers"
          title="Marketing, matching, and coordination."
          description="MatriBhumi is an independent advisory platform. We present selected projects to buyers we already advise and coordinate introductions and viewings. We do not promise guaranteed sales."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {developerServices.map((item) => (
            <article key={item.title} className="advisory-card p-6 md:p-8">
              <h2 className="font-display text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          title="What we do not claim"
          description="MatriBhumi does not guarantee sales volumes, sell financial products, or publish commission percentages. Compensation, where applicable, is set in a separate commercial agreement."
        />
        <p className="mt-8 max-w-3xl text-sm leading-7 text-muted">{siteConfig.buyerFeeNote}</p>
      </section>
      <section className="bg-charcoal px-4 py-16 text-ivory sm:px-6 md:px-12 md:py-24">
        <h2 className="font-display text-4xl md:text-5xl">Partner with MatriBhumi</h2>
        <p className="mt-5 max-w-2xl text-ivory/75">
          Write to us about a project you would like presented to qualified buyers. Named developer profiles are
          published only after a partnership is confirmed.
        </p>
        <Button href="/contact" variant="invert" className="mt-10">
          {developerCtas.partner}
        </Button>
      </section>
    </PublicShell>
  );
}
