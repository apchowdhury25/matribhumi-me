import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { getLocations, getProperties } from "@/lib/data";
import { getMarket } from "@/lib/markets";
import { breadcrumbJsonLd } from "@/lib/seo";

export async function CountryMarketPage({ slug }: { slug: string }) {
  const market = getMarket(slug);
  if (!market) notFound();

  const [allLocations, propertyData] = await Promise.all([
    getLocations(),
    getProperties({ country: market.slug }),
  ]);

  const inCountry = allLocations.filter((location) =>
    market.countryAliases.some((alias) => alias.toLowerCase() === location.country.toLowerCase()),
  );
  const bySlug = new Map(inCountry.map((location) => [location.slug, location]));
  const namedCities = market.cities.map((city) => ({
    ...city,
    location: bySlug.get(city.slug) ?? null,
  }));
  const extraLocations = inCountry.filter(
    (location) => !market.cities.some((city) => city.slug === location.slug),
  );

  return (
    <PublicShell transparentHeader>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: market.shortName, path: `/locations/${market.slug}` },
        ])}
      />
      <PageHero
        image={market.heroImage}
        eyebrow={`${market.shortName} property advisor`}
        title={`${market.name} property advisory.`}
        description={market.description}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/properties?country=${market.slug}`} variant="invert">
            Find My Property
          </Button>
          <Button
            href="/advise"
            variant="outline"
            className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
          >
            Talk to a Property Advisor
          </Button>
        </div>
      </PageHero>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          eyebrow="What we do here"
          title={`Independent ${market.shortName} property consultant.`}
          description={market.intro}
        />
      </section>

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          eyebrow="Cities"
          title={`Explore ${market.shortName} by city.`}
          description="City pages open when location data has been published. Other cities will appear as data becomes available."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {namedCities.map((city) =>
            city.location ? (
              <Link key={city.slug} href={`/locations/${city.location.slug}`} className="group bg-ivory p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-earth">{market.shortName}</p>
                <h3 className="font-display mt-2 text-3xl group-hover:text-moss">{city.name}</h3>
                <p className="mt-3 text-sm text-muted">{city.location.description}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-earth">
                  {city.location._count.properties} properties
                </p>
              </Link>
            ) : (
              <article key={city.slug} className="border border-dashed border-charcoal/20 bg-ivory/60 p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-earth">{market.shortName}</p>
                <h3 className="font-display mt-2 text-3xl">{city.name}</h3>
                <p className="mt-3 text-sm text-muted">As data becomes available.</p>
              </article>
            ),
          )}
        </div>
        {extraLocations.length ? (
          <div className="mt-12">
            <h3 className="font-display text-2xl">Also listed</h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {extraLocations.map((location) => (
                <li key={location.id}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="border border-charcoal/15 px-4 py-2 text-sm hover:border-charcoal"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <SectionHeader
          eyebrow="Properties"
          title={`Selected ${market.shortName} listings.`}
          description="Listings are published as developer partnerships are confirmed. MatriBhumi does not own these properties unless a listing is marked MatriBhumi-owned."
        />
        {propertyData.items.length ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {propertyData.items.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-10 max-w-2xl text-muted">
            No published properties for {market.name} yet. Talk to a property advisor if you would like us to watch this
            market for you.
          </p>
        )}
        <Button href={`/properties?country=${market.slug}`} variant="outline" className="mt-10">
          All {market.shortName} properties
        </Button>
      </section>
    </PublicShell>
  );
}
