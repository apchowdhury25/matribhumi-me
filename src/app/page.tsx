import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PresenceMap } from "@/components/maps/PresenceMap";
import { siteConfig, lifestyles, whyMatriBhumi, comingHomePrinciples, whoItsFor, districtLife } from "@/config/site";
import { getFeaturedDevelopments, getSignatureDevelopments, getArticles, getMapDevelopments } from "@/lib/data";
import { formatPrice, statusLabel } from "@/lib/format";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline.replace(/\.$/, "")}`,
  description: siteConfig.supporting,
  path: "/",
  image: "/media/hero-plaza.jpg",
});

export default async function HomePage() {
  const [featured, signature, articles, mapPins] = await Promise.all([
    getFeaturedDevelopments(),
    getSignatureDevelopments(),
    getArticles(),
    getMapDevelopments(),
  ]);

  return (
    <PublicShell transparentHeader>
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/media/hero-plaza.jpg"
          alt="A landscaped plaza at the base of a contemporary MatriBhumi development"
          className="absolute inset-0 h-full w-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/25" />
        <div className="relative flex min-h-[100dvh] flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:px-16 md:pb-28 md:pt-32">
          <p className="text-[11px] uppercase tracking-[0.32em] text-sand">MatriBhumi</p>
          <h1 className="font-display mt-4 max-w-4xl text-[2.15rem] leading-[1.05] text-ivory sm:text-5xl md:mt-5 md:text-8xl md:leading-[0.92]">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-ivory/80 sm:mt-6 sm:text-lg sm:leading-8">{siteConfig.supporting}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/projects" variant="invert" size="lg" className="w-full sm:w-auto">
              Explore Developments
            </Button>
            <Button href="/about" variant="outline" size="lg" className="w-full border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal sm:w-auto">
              Discover MatriBhumi
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          eyebrow="Who it is for"
          title="Three ways of living in Bangladesh."
          description={siteConfig.audience}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {whoItsFor.map((item) => (
            <article key={item.title} className="border border-charcoal/10 bg-paper p-8">
              <h3 className="font-display text-3xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Featured developments"
          title="Addresses in Bangladesh you can come back to — or live in every day."
          description="Demonstration homes in Dhaka, including Bashundhara’s new districts, and elsewhere. Projects shown here are fictional unless we say otherwise."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group">
              <div className="aspect-[4/3] overflow-hidden bg-stone">
                <img src={project.heroImage} alt={project.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-earth">
                    {project.location.city} · {statusLabel(project.propertyType)}
                  </p>
                  <h3 className="font-display mt-1 text-3xl">{project.name}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {statusLabel(project.status)} · {project.completion} · from {formatPrice(project.startingPrice, project.currency)}
                  </p>
                </div>
                <span className="mt-2 text-[11px] uppercase tracking-[0.18em] text-earth">View</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-charcoal px-4 py-16 text-ivory sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Signature developments"
          title="Buildings as stories, told at the scale of a neighborhood."
          light
        />
        <div className="mt-16 space-y-24">
          {signature.map((project, index) => (
            <article
              key={project.id}
              className="grid items-center gap-10 lg:grid-cols-12"
            >
              <div className={index % 2 ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-7"}>
                <img src={project.heroImage} alt={project.name} className="aspect-[16/10] w-full object-cover" />
              </div>
              <div className={index % 2 ? "lg:col-span-5 lg:col-start-1 lg:row-start-1" : "lg:col-span-5"}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-sand">
                  {project.location.city}, {project.location.country}
                </p>
                <h3 className="font-display mt-3 text-4xl md:text-5xl">{project.name}</h3>
                <p className="mt-4 text-ivory/75">{project.tagline}</p>
                <p className="mt-4 text-sm leading-7 text-ivory/65">{project.architecture}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(project.stats as Record<string, string | number>).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-[10px] uppercase tracking-[0.18em] text-sand">{key}</dt>
                      <dd className="mt-1 font-mono text-ivory">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
                <Button href={`/projects/${project.slug}`} variant="invert" className="mt-8">
                  Explore
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="How you might live"
          title="A visit. A retirement. A full Dhaka week."
          description="Choose the kind of home that matches how you already live — overseas, coming home, or already here."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lifestyles.map((item) => (
            <Link key={item.slug} href={`/projects?lifestyle=${item.slug}`} className="group relative min-h-[320px] overflow-hidden">
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-charcoal/35" />
              <div className="relative flex h-full flex-col justify-end p-6 text-ivory">
                <h3 className="font-display text-3xl">{item.title}</h3>
                <p className="mt-2 max-w-sm text-sm text-ivory/80">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Bangladesh, and a few studies abroad"
          title="Most of our work is at home — especially Dhaka’s new districts."
          description="Bashundhara, the wider city, and Chattogram are the demonstration heart of MatriBhumi. Other pins are studies, not a claim that we operate everywhere."
        />
        <div className="mt-12">
          <PresenceMap
            pins={mapPins.map((pin) => ({
              id: pin.id,
              name: pin.name,
              slug: pin.slug,
              latitude: pin.latitude,
              longitude: pin.longitude,
              heroImage: pin.heroImage,
              locationNote: pin.locationNote,
              status: pin.status,
              startingPrice: pin.startingPrice,
              currency: pin.currency,
              location: pin.location,
            }))}
          />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Why MatriBhumi"
          title="Homes for people whose life is here, or in two places."
          description={siteConfig.audience}
        />
        <div className="mt-12 grid gap-px bg-charcoal/10 md:grid-cols-2 lg:grid-cols-3">
          {whyMatriBhumi.map((item) => (
            <article key={item.title} className="bg-ivory p-8">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="min-h-[420px] bg-cover bg-center" style={{ backgroundImage: "url(/media/location-aerial.jpg)" }} />
        <div className="flex flex-col justify-center bg-charcoal px-4 py-14 text-ivory sm:px-8 md:px-16 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.24em] text-sand">How you will use it</p>
          <h2 className="font-display mt-4 text-[1.85rem] leading-tight sm:text-4xl md:text-5xl">Look at the life, not at a yield.</h2>
          <p className="mt-5 max-w-lg text-ivory/70">
            These homes are meant for vacation and part-year stays, for retirement in Bangladesh, and for everyday living in Bashundhara’s new districts. We do not guarantee returns, appreciation, or rental income.
          </p>
          <ul className="mt-8 space-y-4">
            {comingHomePrinciples.slice(0, 3).map((item) => (
              <li key={item.title}>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-sm text-ivory/65">{item.body}</p>
              </li>
            ))}
          </ul>
          <Button href="/properties" variant="invert" className="mt-10 w-full sm:w-fit">
            Explore Properties
          </Button>
        </div>
      </section>

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Bashundhara district life"
          title="Malls, golf, parks — and a home on the same map."
          description="Demonstration neighbourhoods in Bashundhara’s new developments. MatriBhumi is not Bashundhara Group; we design fictional residences in and around this kind of modern Dhaka district."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {districtLife.map((item) => (
            <article key={item.title} className="bg-ivory p-6">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <Button href="/locations/bashundhara" className="mt-10 w-full sm:w-auto">
          Explore Bashundhara
        </Button>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader eyebrow="Insights" title="Notes from the studio and the street." />
          <Button href="/insights" variant="outline" className="w-full sm:w-auto">
            All insights
          </Button>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.id} href={`/insights/${article.slug}`} className="group">
              <div className="aspect-[16/10] overflow-hidden bg-stone">
                <img src={article.coverImage} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-earth">
                {statusLabel(article.category)}
              </p>
              <h3 className="font-display mt-2 text-2xl leading-tight group-hover:text-moss">{article.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
