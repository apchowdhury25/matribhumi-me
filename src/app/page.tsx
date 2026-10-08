import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PresenceMap } from "@/components/maps/PresenceMap";
import { BrochureButton, DualCta, WaitlistButton } from "@/components/site/LeadCapture";
import { DiasporaFaq } from "@/components/site/DiasporaFaq";
import { HowItWorksSteps } from "@/components/site/HowItWorksSteps";
import { HowWeArePaid } from "@/components/site/HowWeArePaid";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
  siteConfig,
  whyMatriBhumi,
  whatWeDo,
  buyerServices,
  developerServices,
  countryNav,
} from "@/config/site";
import { markets } from "@/lib/markets";
import {
  getArticles,
  getFeaturedDevelopers,
  getFeaturedProperties,
  getMapDevelopments,
} from "@/lib/data";
import { publicDeveloperName } from "@/lib/developer";
import { statusLabel } from "@/lib/format";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline.replace(/\.$/, "")}`,
  description: siteConfig.supporting,
  path: "/",
  image: "/media/hero-plaza.jpg",
});

export default async function HomePage() {
  const [featuredProperties, featuredDevelopers, articles, mapPins] = await Promise.all([
    getFeaturedProperties(6),
    getFeaturedDevelopers(),
    getArticles(),
    getMapDevelopments(),
  ]).catch(() => [[], [], [], []] as const);

  return (
    <PublicShell transparentHeader>
      <section className="relative min-h-[100dvh] overflow-hidden">
        <img
          src="/media/hero-plaza.jpg"
          alt="A landscaped plaza at a contemporary residential development"
          className="absolute inset-0 h-full w-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/25" />
        <div className="relative flex min-h-[100dvh] flex-col justify-end px-4 pb-16 pt-32 sm:px-6 md:px-16 md:pb-28 md:pt-40">
          <p className="text-[11px] uppercase tracking-[0.32em] text-sand">MatriBhumi</p>
          <h1 className="font-display mt-4 max-w-4xl text-[2.15rem] leading-[1.05] text-ivory sm:text-5xl md:mt-5 md:text-8xl md:leading-[0.92]">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-ivory/80 sm:mt-6 sm:text-lg sm:leading-8">
            {siteConfig.supporting}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/properties" variant="invert" size="lg" className="w-full sm:w-auto">
              Browse properties
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="w-full border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal sm:w-auto"
            >
              Speak with an advisor
            </Button>
            <WaitlistButton variant="ghost" size="lg" className="w-full sm:w-auto" />
            <BrochureButton
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          eyebrow="What MatriBhumi does"
          title="Independent property advisory and transaction coordination."
          description="MatriBhumi is an independent property advisor and transaction partner. We help buyers find suitable properties, work with participating developers, and coordinate the journey. You do not pay MatriBhumi a fee."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {whatWeDo.map((item) => (
            <article key={item.title} className="border border-charcoal/10 bg-paper p-8">
              <h3 className="font-display text-3xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          eyebrow="Primary markets"
          title="Choose a country."
          description="Bangladesh, the UAE and Malaysia. City pages open as location data is published."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {markets.map((market) => (
            <Link key={market.slug} href={`/locations/${market.slug}`} className="group relative min-h-[280px] overflow-hidden">
              <img
                src={market.heroImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/45" />
              <div className="relative flex h-full flex-col justify-end p-6 text-ivory">
                <p className="text-[11px] uppercase tracking-[0.2em] text-sand">{market.seoTitle}</p>
                <h3 className="font-display mt-2 text-4xl">{market.shortName}</h3>
                <p className="mt-2 text-sm text-ivory/80">{market.region}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Featured properties"
          title="Selected listings, listed through MatriBhumi."
          description="These homes are offered by participating developers. MatriBhumi is the advisor and coordinator, not the seller, unless a listing is marked MatriBhumi-owned."
        />
        {featuredProperties.length ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-muted">Featured listings appear here as published properties are marked featured.</p>
        )}
        <Button href="/properties" variant="outline" className="mt-10">
          Browse all properties
        </Button>
      </section>

      <section className="bg-charcoal px-4 py-16 text-ivory sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Featured developers"
          title="Selected developers we work with."
          description="Public developer profiles appear when a participating partner is published. We do not invent relationships."
          light
        />
        {featuredDevelopers.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredDevelopers.map((developer) => {
              const name = publicDeveloperName(developer);
              if (!name) return null;
              return (
                <Link
                  key={developer.id}
                  href={`/developers/${developer.slug}`}
                  className="border border-ivory/15 p-8 hover:border-ivory/40"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-sand">
                    {developer.verified ? "Verified developer" : "Selected developer"}
                  </p>
                  <h3 className="font-display mt-3 text-3xl">{name}</h3>
                  <p className="mt-3 text-sm text-ivory/70">
                    {developer._count.properties} listed properties
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 max-w-2xl text-ivory/70">
            Featured developer profiles will appear here when participating partners are published. Until then, browse
            properties listed through MatriBhumi.
          </p>
        )}
        <Button href="/developers" variant="outline" className="mt-10 border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal">
          All developers
        </Button>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="How MatriBhumi works"
          title="Six steps from first conversation to a developer purchase."
          description="You complete the purchase directly with the developer. MatriBhumi coordinates the process."
        />
        <HowItWorksSteps />
        <Button href="/how-it-works" variant="outline" className="mt-10">
          How it works
        </Button>
      </section>

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Why buyers use MatriBhumi"
          title="Independent advice, then a coordinated introduction."
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

      <HowWeArePaid />

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="For buyers"
          title="Services offered to buyers."
          description="Property advisory, buying assistance, and viewing coordination — with no buyer fee."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buyerServices.map((item) => (
            <article key={item.title} className="bg-ivory p-6">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="For developers"
          title="Reach qualified buyers across Bangladesh, the UAE and Malaysia."
          description="Marketing, referrals, and transaction coordination. MatriBhumi does not promise guaranteed sales."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {developerServices.map((item) => (
            <article key={item.title} className="border border-charcoal/10 bg-paper p-5">
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <Button href="/for-developers" className="mt-10">
          For developers
        </Button>
      </section>

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Markets and locations"
          title="Discover properties by country and city."
          description="Select a development and the map moves to it. Country pages cover Bangladesh, the UAE and Malaysia; city pages open as data is published."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {countryNav.map((item) => (
            <Button key={item.href} href={item.href} variant="outline">
              {item.label}
            </Button>
          ))}
        </div>
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
              startingPrice: Number(pin.startingPrice.toString()),
              currency: pin.currency,
              location: pin.location,
            }))}
          />
        </div>
      </section>

      <DiasporaFaq />

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader eyebrow="Insights" title="Notes from the market and the street." />
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

      <section className="bg-charcoal px-4 py-16 text-ivory sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Start a conversation"
          title="Speak with an advisor."
          description="Tell us the country, the kind of home, and how you will use it. There is no buyer fee for this conversation."
          light
        />
        <DualCta tone="dark" className="mt-10" />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="outline" className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal">
            Speak with an advisor
          </Button>
          <Button href="/properties" variant="ghost">
            Browse properties
          </Button>
        </div>
      </section>
    </PublicShell>
  );
}
