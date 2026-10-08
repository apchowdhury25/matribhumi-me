import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { LegalCompliance } from "@/components/site/LegalCompliance";
import { StudioLeadership } from "@/components/site/StudioLeadership";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "About",
  description:
    "MatriBhumi is an independent property advisor and transaction partner for buyers in Bangladesh, UAE, and Malaysia.",
  path: "/about",
  image: "/media/about-lobby.jpg",
});

const timeline = [
  ["Role", "Independent advisor: discover, compare, introduce, coordinate."],
  ["Buyer", "No brokerage, consultation, or property-search fee."],
  ["Developer", "The participating developer is the seller and compensates MatriBhumi under a separate agreement."],
  ["Markets", "Guidance across Bangladesh, UAE, and Malaysia. Named listings are published as partnerships are confirmed."],
];

export default function AboutPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-lobby.jpg"
        eyebrow="About MatriBhumi"
        title="Named for the land you still call home."
        description={`${siteConfig.positioning} ${siteConfig.supporting}`}
      />
      <section className="grid gap-12 px-4 py-14 sm:px-6 md:px-12 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl">Story</h2>
          <p className="mt-4 leading-8 text-muted">
            MatriBhumi means mother-land. We are an independent property advisor and transaction partner. Families in London, Dubai, Kuala Lumpur, Toronto, and the Gulf still need a proper address: a house you can visit, a house you can retire into, and a house you can live in every day. We help you find it among participating developer projects, then coordinate the rest. {siteConfig.districtRelation}
          </p>
        </div>
        <div className="grid gap-8">
          <div>
            <h3 className="font-display text-3xl">Vision</h3>
            <p className="mt-3 text-muted">Help buyers find a Bangladesh, UAE, or Malaysia address that works after a long flight, through retirement, and through an ordinary week — then stay with them until the developer’s process is underway.</p>
          </div>
          <div>
            <h3 className="font-display text-3xl">Mission</h3>
            <p className="mt-3 text-muted">To curate developer projects, understand a buyer’s requirements and budget, recommend a shortlist, introduce qualified buyers to the relevant developer, and coordinate viewings and follow-up — without charging the buyer a fee, and without inventing financial guarantees.</p>
          </div>
        </div>
      </section>
      <section className="bg-mist px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <SectionHeader title="Values" eyebrow="How we work" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Care for the ground", "Homes that can be left and returned to", "Retirement that still feels like a neighbourhood", "Bashundhara district convenience", "Rooms for family gatherings", "Honesty about uncertainty"].map((item) => (
            <p key={item} className="border border-charcoal/10 bg-ivory px-5 py-6 font-display text-2xl">{item}</p>
          ))}
        </div>
      </section>
      <StudioLeadership />
      <section className="grid lg:grid-cols-2">
        <img src="/media/about-studio.jpg" alt="" className="h-full min-h-[360px] w-full object-cover" />
        <div className="flex flex-col justify-center bg-charcoal px-8 py-16 text-ivory md:px-16">
          <h2 className="font-display text-4xl">How we advise</h2>
          <p className="mt-4 leading-8 text-ivory/75">
            Start with how a visit actually works: airport, family, shade, a guest room, and a building that can be closed up. Construction quality is the developer’s specification; we help you inspect it. We would rather undersell a view than overpromise a market or a yield. {siteConfig.buyerFee}
          </p>
        </div>
      </section>
      <section className="px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <SectionHeader title="How the model works" />
        <ol className="mt-10 space-y-6">
          {timeline.map(([year, note]) => (
            <li key={year} className="grid gap-2 border-b border-charcoal/10 pb-6 md:grid-cols-[120px_1fr]">
              <span className="font-mono text-earth">{year}</span>
              <span>{note}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-ivory px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <LegalCompliance />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/sustainability" variant="outline" className="w-full sm:w-auto">Sustainability</Button>
          <Button href="/careers" className="w-full sm:w-auto">Careers</Button>
        </div>
      </section>
    </PublicShell>
  );
}
