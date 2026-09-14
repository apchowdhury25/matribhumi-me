import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sustainability",
  description: "How MatriBhumi thinks about architecture, energy, water, materials, and community — without invented certifications.",
  path: "/sustainability",
  image: "/media/sustain-courtyard.jpg",
});

const sections = [
  { title: "Sustainable architecture", image: "/media/sustain-courtyard.jpg", body: "Orientation, shade, and rooms that can be ventilated without machinery doing all the work. We treat climate as a design partner, not a brochure heading." },
  { title: "Energy efficiency", image: "/media/about-construction.jpg", body: "Envelope, glazing, and systems sized to the building we actually draw. We do not publish performance numbers we have not measured." },
  { title: "Green spaces", image: "/media/sustain-garden.jpg", body: "Parks, courtyards, and planted roofs are part of the program. Trees that already exist on a site are the first drawing." },
  { title: "Water management", image: "/media/sustain-water.jpg", body: "Hold rain, slow it, and use it. Bioswales, cisterns, and permeable courts — described here as intentions, not certified outcomes." },
  { title: "Responsible materials", image: "/media/hero-nature.jpg", body: "Stone, timber, lime, and metals that can be repaired. We prefer a surface that ages in public to one that cannot be maintained." },
  { title: "Community development", image: "/media/lifestyle-family.jpg", body: "A sustainable place is one people can share: schools within a walk, shops that keep a street awake, rooms for gathering." },
  { title: "Future-focused cities", image: "/media/location-singapore.jpg", body: "We plan as if the neighborhood will still be our responsibility in twenty years. That is a working attitude, not a forecast." },
];

export default function SustainabilityPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/sustain-courtyard.jpg"
        eyebrow="Sustainability"
        title="Care for the ground is a design problem."
        description="No environmental certification is claimed on this site unless it is clearly marked as fictional demonstration content. None are."
      />
      <section className="px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <div className="space-y-24">
          {sections.map((section, index) => (
            <article key={section.title} className="grid items-center gap-10 lg:grid-cols-12">
              <div className={index % 2 ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6"}>
                <img src={section.image} alt="" className="aspect-[16/10] w-full object-cover" />
              </div>
              <div className={index % 2 ? "lg:col-span-5 lg:col-start-1 lg:row-start-1" : "lg:col-span-5"}>
                <h2 className="font-display text-4xl">{section.title}</h2>
                <p className="mt-4 leading-8 text-muted">{section.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
