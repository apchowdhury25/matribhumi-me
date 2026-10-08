import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { LegalCompliance } from "@/components/site/LegalCompliance";
import { StudioLeadership } from "@/components/site/StudioLeadership";
import { HowWeArePaid } from "@/components/site/HowWeArePaid";
import { createMetadata } from "@/lib/seo";
import { siteConfig, whatWeDo } from "@/config/site";

export const metadata = createMetadata({
  title: "About",
  description:
    "MatriBhumi is independent property advisory and transaction coordination in Bangladesh.",
  path: "/about",
  image: "/media/about-lobby.jpg",
});

export default function AboutPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-lobby.jpg"
        eyebrow="About MatriBhumi"
        title="Independent property advisory and transaction coordination."
        description={`${siteConfig.positioning} MatriBhumi connects buyers with participating developers and helps coordinate the journey — with no buyer fee.`}
      />
      <section className="grid gap-12 px-4 py-14 sm:px-6 md:px-12 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl">Story</h2>
          <p className="mt-4 leading-8 text-muted">
            MatriBhumi means mother-land. We are an independent property advisor and transaction-coordination company —
            not a developer that builds homes for sale under this brand, except where a listing is explicitly marked
            MatriBhumi-owned. Families at home and abroad use us to compare selected developer properties in
            Bangladesh, then stay with us through introductions, viewings, and follow-up.
          </p>
        </div>
        <div className="grid gap-8">
          <div>
            <h3 className="font-display text-3xl">Vision</h3>
            <p className="mt-3 text-muted">
              Help buyers find a suitable address, then coordinate a clean
              introduction to the developer who is selling it.
            </p>
          </div>
          <div>
            <h3 className="font-display text-3xl">Mission</h3>
            <p className="mt-3 text-muted">
              Understand requirements, shortlist selected developer properties, introduce qualified buyers, and
              coordinate viewings and the transaction path — without charging the buyer a fee, and without promising
              financial returns.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-mist px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <SectionHeader title="How we work" eyebrow="Selected participating developers" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {whatWeDo.map((item) => (
            <article key={item.title} className="bg-ivory p-6">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <StudioLeadership />
      <HowWeArePaid />
      <section className="bg-ivory px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <LegalCompliance />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/how-it-works" variant="outline" className="w-full sm:w-auto">
            How it works
          </Button>
          <Button href="/advise" className="w-full sm:w-auto">
            Talk to an Advisor
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
