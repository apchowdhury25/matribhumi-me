import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { HowItWorksSteps } from "@/components/site/HowItWorksSteps";
import { HowWeArePaid } from "@/components/site/HowWeArePaid";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "How it works",
  description:
    "How MatriBhumi’s property advisory and transaction coordination works: requirements, shortlist, developer introduction, viewings, and a purchase completed with the developer — with no buyer fee.",
  path: "/how-it-works",
  image: "/media/about-studio.jpg",
});

export default function HowItWorksPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-studio.jpg"
        eyebrow="How it works"
        title="Property buying assistance, step by step."
        description="MatriBhumi helps you find a suitable property, introduces you to the developer, and coordinates viewings and follow-up. You complete the purchase directly with the developer or seller."
      />
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <HowItWorksSteps />
        <p className="mt-10 max-w-3xl text-sm leading-7 text-muted">
          The legal transaction structure belongs to the developer or seller and to the lawyers you appoint. MatriBhumi
          coordinates the process and does not replace those parties.
        </p>
      </section>
      <HowWeArePaid tone="mist" />
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <h2 className="font-display text-4xl">Ready to start?</h2>
        <p className="mt-4 max-w-2xl text-muted">{siteConfig.supporting}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact">Speak with an advisor</Button>
          <Button href="/properties" variant="outline">
            Browse properties
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
