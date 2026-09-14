import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "About",
  description:
    "MatriBhumi builds homes in Bangladesh for expats, returning retirees, and families who want modern living in Bashundhara’s new districts.",
  path: "/about",
  image: "/media/about-lobby.jpg",
});

const leaders = [
  { name: "Amina Rahman", role: "Founder", image: "/media/leader-founder.jpg", bio: "An architect who started MatriBhumi after years of watching relatives fly home to houses that were never designed for a visit. Fictional profile." },
  { name: "Farhan Kabir", role: "Chief of Development", image: "/media/leader-development.jpg", bio: "Looks after land, construction partners, and the unglamorous work of getting buildings built well. Fictional profile." },
  { name: "Leila Nassar", role: "Head of Design", image: "/media/leader-design.jpg", bio: "Leads the studio that turns a site into rooms, streets, and shade. Fictional profile." },
];

const timeline = [
  ["2014", "Studio founded as a demonstration practice for housing and public rooms."],
  ["2018", "First fictional neighborhood study: Bhumi Gardens."],
  ["2022", "Heights and Riverside added to the demonstration portfolio."],
  ["2026", "This website — a working platform for how MatriBhumi might speak in public."],
];

export default function AboutPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-lobby.jpg"
        eyebrow="About MatriBhumi"
        title="Named for the land you still call home."
        description="MatriBhumi means mother-land. We make residences for people who live abroad and come back, for retirees returning, and for families already in Bangladesh who want a modern home in Bashundhara. Demonstration company story."
      />
      <section className="grid gap-12 px-6 py-20 md:px-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl">Story</h2>
          <p className="mt-4 leading-8 text-muted">
            Many Bangladeshi families live in London, Dubai, Toronto, or the Gulf and still need a proper address at home. Others are retiring and coming back for good. Others already live in Dhaka and want a modern home in Bashundhara — near malls, golf, amusement parks, and the city’s newer roads. MatriBhumi exists to design for all three: a house you can visit, a house you can retire into, and a house you can live in every day.
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
      <section className="bg-mist px-6 py-20 md:px-12">
        <SectionHeader title="Values" eyebrow="How we work" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Care for the ground", "Homes that can be left and returned to", "Retirement that still feels like a neighbourhood", "Bashundhara district convenience", "Rooms for family gatherings", "Honesty about uncertainty"].map((item) => (
            <p key={item} className="border border-charcoal/10 bg-ivory px-5 py-6 font-display text-2xl">{item}</p>
          ))}
        </div>
      </section>
      <section className="px-6 py-20 md:px-12">
        <SectionHeader title="Leadership" description="Fictional demonstration portraits." />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {leaders.map((person) => (
            <article key={person.name}>
              <img src={person.image} alt={person.name} className="aspect-[3/4] w-full object-cover bg-stone" />
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-earth">{person.role}</p>
              <h3 className="font-display text-3xl">{person.name}</h3>
              <p className="mt-2 text-sm text-muted">{person.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="grid lg:grid-cols-2">
        <img src="/media/about-studio.jpg" alt="" className="h-full min-h-[360px] w-full object-cover" />
        <div className="flex flex-col justify-center bg-charcoal px-8 py-16 text-ivory md:px-16">
          <h2 className="font-display text-4xl">Development philosophy</h2>
          <p className="mt-4 leading-8 text-ivory/75">
            Start with how a visit actually works: airport, family, shade, a guest room, and a building that can be closed up. Construction quality is a specification we can stand beside. We would rather undersell a view than overpromise a market or a yield.
          </p>
        </div>
      </section>
      <section className="px-6 py-20 md:px-12">
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
      <section className="bg-mist px-6 py-16 md:px-12">
        <h2 className="font-display text-4xl">Awards</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">The following are demonstration placeholders, not real accolades.</p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="border border-charcoal/10 bg-ivory p-5">Civic Housing Citation — demo</li>
          <li className="border border-charcoal/10 bg-ivory p-5">Landscape in the City — demo</li>
          <li className="border border-charcoal/10 bg-ivory p-5">Quiet Materials Prize — demo</li>
        </ul>
        <div className="mt-10 flex gap-4">
          <Button href="/sustainability" variant="outline">Sustainability</Button>
          <Button href="/careers">Careers</Button>
        </div>
        <p className="mt-8 text-sm text-muted">{siteConfig.demoNotice}</p>
      </section>
    </PublicShell>
  );
}
