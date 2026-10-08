import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Sustainability",
  description: "How MatriBhumi evaluates partner developments on climate, water, materials, and community — without invented certifications.",
  path: "/sustainability",
  image: "/media/sustain-courtyard.jpg",
});

const sections = [
  { title: "Sustainable architecture", image: "/media/sustain-courtyard.jpg", body: "We look for orientation, shade, and rooms that can be ventilated without machinery doing all the work. Climate is a test of a developer’s drawings, not a brochure heading." },
  { title: "Energy efficiency", image: "/media/about-construction.jpg", body: "Envelope, glazing, and systems belong to the developer of record. We do not publish performance numbers that have not been measured." },
  { title: "Green spaces", image: "/media/sustain-garden.jpg", body: "Parks, courtyards, and planted roofs should be part of the programme. Trees that already exist on a site are the first thing we ask a developer to protect." },
  { title: "Water management", image: "/media/sustain-water.jpg", body: "Hold rain, slow it, and use it. Bioswales, cisterns, and permeable courts — described here as questions we put to partners, not certified outcomes." },
  { title: "Responsible materials", image: "/media/hero-nature.jpg", body: "Stone, timber, lime, and metals that can be repaired. We prefer a surface that ages in public to one that cannot be maintained." },
  { title: "Community development", image: "/media/lifestyle-family.jpg", body: "A sustainable place is one people can share: schools within a walk, shops that keep a street awake, rooms for gathering." },
  { title: "Future-focused cities", image: "/media/location-singapore.jpg", body: "We advise as if the neighbourhood will still matter in twenty years. That is a working attitude, not a forecast, and not a claim that MatriBhumi is the builder." },
];

export default function SustainabilityPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/sustain-courtyard.jpg"
        eyebrow="Sustainability"
        title="Care for the ground is a design problem."
        description="We evaluate partner projects for climate, water, and shade. Certifications are published only when the developer of record has been granted them."
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
