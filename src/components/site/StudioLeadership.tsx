import { leadership, siteConfig } from "@/config/site";
import { SectionHeader } from "@/components/site/SectionHeader";

export function StudioLeadership() {
  return (
    <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
      <SectionHeader
        eyebrow="Team & leadership"
        title="Independent advice, then a coordinated introduction."
        description={`${siteConfig.positioning} The portraits below are held for the team book. The standard is already the work.`}
      />
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {leadership.map((person) => (
          <article key={person.name}>
            <img src={person.image} alt="" className="aspect-[3/4] w-full bg-stone object-cover" />
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-earth">{person.role}</p>
            <h3 className="font-display mt-2 text-3xl">{person.name}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{person.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
