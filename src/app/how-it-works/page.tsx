import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { HowItWorksSteps } from "@/components/site/HowItWorksSteps";
import { HowWeWork } from "@/components/site/HowWeWork";
import { HowWeArePaid } from "@/components/site/HowWeArePaid";
import { TransactionFlows } from "@/components/site/TransactionFlows";
import { ProfessionalAdviceNotice } from "@/components/site/ProfessionalAdviceNotice";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { howWeWork } from "@/config/legal";
import { buyerCtas } from "@/config/ctas";
import { BuyerFeeNotice } from "@/components/site/BuyerFeeNotice";

export const metadata = createMetadata({
  title: "How it works",
  description:
    "How MatriBhumi’s Bangladesh property advisory and transaction coordination works: requirements, shortlist, developer introduction, viewings, and a purchase completed with the developer.",
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
        description={`${howWeWork.summary} ${howWeWork.purchaseAgreement}`}
      />
      <HowWeWork />
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <HowItWorksSteps />
        <BuyerFeeNotice className="mt-10 max-w-3xl" />
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
          The legal transaction structure belongs to the developer or seller and to the lawyers you appoint. MatriBhumi
          coordinates the process and does not replace those parties. Matching scores used internally are screening aids, not financial or legal advice.
        </p>
        <ProfessionalAdviceNotice className="mt-4 max-w-3xl" />
      </section>
      <HowWeArePaid tone="mist" />
      <TransactionFlows />
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <h2 className="font-display text-4xl">Ready to start?</h2>
        <p className="mt-4 max-w-2xl text-muted">{siteConfig.supporting}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/advise">{buyerCtas.talkToAdvisor}</Button>
          <Button href="/properties" variant="outline">
            {buyerCtas.findMyProperty}
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
