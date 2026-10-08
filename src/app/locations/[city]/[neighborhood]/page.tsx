import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LocationBreadcrumb } from "@/components/site/LocationBreadcrumb";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyMap } from "@/components/maps/PropertyMap";
import { JsonLd } from "@/components/site/JsonLd";
import { getCity, getNeighborhood, neighborhoodPath, neighborhoodsForCity } from "@/config/locations";
import { getProperties } from "@/lib/data";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { buyerCtas } from "@/config/ctas";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; neighborhood: string }>;
}) {
  const { city: citySlug, neighborhood: neighborhoodSlug } = await params;
  const parent = getCity(citySlug);
  const record = parent ? getNeighborhood(parent.slug, neighborhoodSlug) : null;
  if (!parent || !record) notFound();
  return createMetadata({
    title: `${record.name} Properties | MatriBhumi`,
    description: `${record.description} Independent property advisory for ${parent.name}, Bangladesh.`,
    path: neighborhoodPath(parent.slug, record.slug),
    image: record.heroImage,
  });
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ city: string; neighborhood: string }>;
}) {
  const { city: citySlug, neighborhood: neighborhoodSlug } = await params;
  const city = getCity(citySlug);
  const neighborhood = city ? getNeighborhood(city.slug, neighborhoodSlug) : null;
  if (!city || !neighborhood) notFound();

  const propertyData = await getProperties({ city: city.slug, location: neighborhood.slug });
  const siblings = neighborhoodsForCity(city.slug).filter((item) => item.slug !== neighborhood.slug);

  return (
    <PublicShell transparentHeader>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: city.name, path: `/locations/${city.slug}` },
          { name: neighborhood.name, path: neighborhoodPath(city.slug, neighborhood.slug) },
        ])}
      />
      <section className="relative min-h-[70vh]">
        <img
          src={neighborhood.heroImage}
          alt={neighborhood.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        <div className="relative flex min-h-[70vh] flex-col justify-end px-4 pb-14 pt-28 sm:px-6 md:px-12 md:pb-20">
          <LocationBreadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Locations", href: "/locations" },
              { name: city.name, href: `/locations/${city.slug}` },
              { name: neighborhood.name },
            ]}
          />
          <h1 className="font-display mt-6 text-4xl text-ivory sm:text-6xl md:text-7xl">{neighborhood.name}</h1>
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-sand">
            {city.name}, Bangladesh
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <SectionHeader eyebrow="Neighborhood overview" title={neighborhood.name} description={neighborhood.overview} />
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <article>
            <h2 className="font-display text-3xl">Lifestyle</h2>
            <p className="mt-4 leading-7 text-muted">{neighborhood.lifestyle}</p>
          </article>
          <article>
            <h2 className="font-display text-3xl">Connectivity</h2>
            <p className="mt-4 leading-7 text-muted">{neighborhood.connectivity}</p>
          </article>
        </div>
      </section>

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Listings"
          title={`Properties in ${neighborhood.name}`}
          description="Published MatriBhumi listings for this neighborhood. MatriBhumi does not invent properties or prices."
        />
        {propertyData.items.length ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {propertyData.items.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-10 max-w-2xl">
            <p className="text-lg text-charcoal">No properties available in this neighborhood yet.</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              {neighborhood.opportunities} Talk to an advisor if you would like us to watch this neighborhood.
            </p>
            <Button href={`/locations/${city.slug}`} variant="outline" className="mt-8">
              Explore other neighborhoods in {city.name}
            </Button>
          </div>
        )}
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12">
        <h2 className="font-display mb-6 text-4xl">Map</h2>
        <PropertyMap latitude={neighborhood.latitude} longitude={neighborhood.longitude} name={neighborhood.name} />
        {siblings.length ? (
          <div className="mt-12">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-earth">Other neighborhoods in {city.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {siblings.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={neighborhoodPath(city.slug, item.slug)}
                    className="border border-charcoal/15 px-4 py-2 text-sm hover:border-charcoal"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <Button href="/advise" className="mt-10">
          {buyerCtas.talkToAdvisor}
        </Button>
      </section>
    </PublicShell>
  );
}
