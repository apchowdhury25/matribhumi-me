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
    "MatriBhumi builds homes in Bangladesh for expats, returning retirees, and families who want modern living in Bashundhara’s new districts.",
  path: "/about",
  image: "/media/about-lobby.jpg",
});

const timeline = [
  ["2014", "Studio founded to design homes for families who live in two places."],
  ["2018", "Bhumi Gardens, the first courtyard community, enters the pre-launch portfolio."],
  ["2022", "Heights and Riverside join the architectural programme."],
  ["2026", "The pre-launch portfolio opens to the diaspora waitlist."],
];

export default function AboutPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-lobby.jpg"
        eyebrow="About MatriBhumi"
        title="Named for the land you still call home."
        description={`${siteConfig.positioning} ${siteConfig.districtRelation}`}
      />
      <section className="grid gap-12 px-4 py-14 sm:px-6 md:px-12 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl">Story</h2>
          <p className="mt-4 leading-8 text-muted">
            MatriBhumi means mother-land. We are an independent boutique studio. Families in London, Dubai, Toronto, and the Gulf still need a proper address at home: a house you can visit, a house you can retire into, and a house you can live in every day. {siteConfig.districtRelation}
          </p>
        </div>
        <div className="grid gap-8">
          <div>
            <h3 className="font-display text-3xl">Vision</h3>
            <p className="mt-3 text-muted">Bangladesh addresses that work after a long flight, through retirement, and through an ordinary Dhaka week — architecture, landscape, and family life planned as one piece of work.</p>
          </div>
          <div>
            <h3 className="font-display text-3xl">Mission</h3>
            <p className="mt-3 text-muted">To develop thoughtfully designed homes in Bangladesh for visits, retirement, and everyday living in new districts such as Bashundhara — without inventing financial guarantees.</p>
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
          <h2 className="font-display text-4xl">Development philosophy</h2>
          <p className="mt-4 leading-8 text-ivory/75">
            Start with how a visit actually works: airport, family, shade, a guest room, and a building that can be closed up. Construction quality is a specification we can stand beside. We would rather undersell a view than overpromise a market or a yield.
          </p>
        </div>
      </section>
      <section className="px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <SectionHeader title="Timeline" />
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
