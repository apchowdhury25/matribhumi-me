import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PresenceMap } from "@/components/maps/PresenceMap";
import { DualCta } from "@/components/site/LeadCapture";
import { DiasporaFaq } from "@/components/site/DiasporaFaq";
import { HowItWorksSteps } from "@/components/site/HowItWorksSteps";
import { HowWeWork } from "@/components/site/HowWeWork";
import { HowWeArePaid } from "@/components/site/HowWeArePaid";
import { TransactionFlows } from "@/components/site/TransactionFlows";
import { BuyerFeeHighlight } from "@/components/site/BuyerFeeHighlight";
import { CountrySelector } from "@/components/site/CountrySelector";
import { howWeWork } from "@/config/legal";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
  siteConfig,
  whyMatriBhumi,
  whatWeDo,
} from "@/config/site";
import { buyerCtas, developerCtas } from "@/config/ctas";
import {
  getArticles,
  getFeaturedDevelopers,
  getFeaturedProperties,
  getMapDevelopments,
} from "@/lib/data";
import { publicDeveloperName } from "@/lib/developer";
import { markets } from "@/lib/markets";
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
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative flex min-h-[100dvh] flex-col justify-end px-4 pb-16 pt-32 sm:px-6 md:px-16 md:pb-28 md:pt-40">
          <p className="text-[11px] uppercase tracking-[0.32em] text-sand">Independent property advisory</p>
          <h1 className="font-display mt-5 max-w-4xl text-[2.2rem] leading-[1.05] text-ivory sm:text-5xl md:mt-6 md:text-7xl lg:text-8xl md:leading-[0.94]">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-ivory/82 sm:mt-7 sm:text-lg sm:leading-8">
            {siteConfig.supporting}
          </p>
          <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/advise" variant="invert" size="lg" className="w-full sm:w-auto">
              {buyerCtas.talkToAdvisor}
            </Button>
            <Button
              href="/properties"
              variant="outline"
              size="lg"
              className="w-full border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal sm:w-auto"
            >
              {buyerCtas.findMyProperty}
            </Button>
          </div>
          <CountrySelector tone="on-dark" label="Choose a Bangladesh location" className="mt-10" />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <SectionHeader
          eyebrow="What MatriBhumi does"
          title="Independent property advisory and transaction coordination."
          description={howWeWork.summary}
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {whatWeDo.map((item) => (
            <article key={item.title} className="advisory-card p-8 md:p-10">
              <div className="section-rule" />
              <h3 className="font-display mt-6 text-3xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-mist px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <SectionHeader
          eyebrow="Bangladesh"
          title="Dhaka, Chattogram and Bashundhara."
          description="Selected developments appear as developer partnerships are published. The property purchase agreement is between the buyer and the relevant developer/seller."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {markets[0].cities.map((city) => (
            <Link key={city.slug} href={`/locations/${city.slug}`} className="group relative min-h-[320px] overflow-hidden">
              <img
                src={markets[0].heroImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-charcoal/45" />
              <div className="relative flex h-full min-h-[320px] flex-col justify-end p-7 text-ivory">
                <p className="text-[11px] uppercase tracking-[0.2em] text-sand">Bangladesh</p>
                <h3 className="font-display mt-2 text-4xl">{city.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <SectionHeader
          eyebrow="Selected developments"
          title="Properties from participating developers."
          description="These homes are offered by participating developers. MatriBhumi is the advisor and coordinator, not the seller, unless a listing is marked MatriBhumi-owned."
        />
        {featuredProperties.length ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-muted">Featured listings appear here as published properties are marked featured.</p>
        )}
        <Button href="/properties" variant="outline" className="mt-12">
          {buyerCtas.findMyProperty}
        </Button>
      </section>

      <section className="bg-charcoal px-4 py-20 text-ivory sm:px-6 md:px-12 md:py-28">
        <SectionHeader
          eyebrow="Developers"
          title="A curated developer network."
          description="Public developer profiles appear when a participating partner is published. We do not invent relationships."
          light
        />
        {featuredDevelopers.length ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            selected developments or talk to an advisor.
          </p>
        )}
        <Button href="/developers" variant="outline" className="mt-12 border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal">
          All developers
        </Button>
      </section>

      <HowWeWork />

      <section className="px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <SectionHeader
          eyebrow="How MatriBhumi works"
          title="From first conversation to a developer purchase."
          description={`${howWeWork.purchaseAgreement} MatriBhumi coordinates the process.`}
        />
        <HowItWorksSteps />
        <Button href="/how-it-works" variant="outline" className="mt-12">
          How it works
        </Button>
      </section>

      <section className="bg-mist px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <SectionHeader
          eyebrow="Trust"
          title="Why buyers choose MatriBhumi"
          description={siteConfig.audience}
        />
        <div className="mt-14 grid gap-px bg-charcoal/10 md:grid-cols-2 lg:grid-cols-4">
          {whyMatriBhumi.map((item) => (
            <article key={item.title} className="bg-ivory p-8 md:p-9">
              <div className="section-rule" />
              <h3 className="font-display mt-5 text-2xl leading-snug">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <BuyerFeeHighlight />
      <HowWeArePaid />
      <TransactionFlows tone="mist" />

      <section className="bg-charcoal px-4 py-20 text-ivory sm:px-6 md:px-12 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <SectionHeader
            eyebrow="For developers"
            title="Are you a property developer?"
            description="Reach qualified buyers looking at selected Bangladesh developments."
            light
          />
          <div className="lg:justify-self-end">
            <Button href="/for-developers" variant="invert" size="lg">
              {developerCtas.partner}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-mist px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <SectionHeader
          eyebrow="Locations"
          title="Properties on the map."
          description="Select a development and the map moves to it. Published listings are in Bangladesh."
        />
        <CountrySelector label="Published locations on the map" className="mt-10" />
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

      <section className="px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader eyebrow="Insights" title="Notes from the market and the street." />
          <Button href="/insights" variant="outline" className="w-full sm:w-auto">
            All insights
          </Button>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Link key={article.id} href={`/insights/${article.slug}`} className="group">
              <div className="aspect-[16/10] overflow-hidden bg-stone">
                <img src={article.coverImage} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-earth">
                {statusLabel(article.category)}
              </p>
              <h3 className="font-display mt-2 text-2xl leading-tight group-hover:text-moss">{article.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-charcoal px-4 py-20 text-ivory sm:px-6 md:px-12 md:py-28">
        <SectionHeader
          eyebrow="Start a conversation"
          title="Talk to an advisor."
          description="Tell us the market, the kind of home, and how you will use it. There is no buyer fee for this conversation."
          light
        />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/advise" variant="invert">
            {buyerCtas.talkToAdvisor}
          </Button>
          <Button href="/properties" variant="outline" className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal">
            {buyerCtas.findMyProperty}
          </Button>
        </div>
        <DualCta tone="dark" className="mt-4" />
      </section>
    </PublicShell>
  );
}
