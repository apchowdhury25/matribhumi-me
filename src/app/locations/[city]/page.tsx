import { notFound, redirect } from "next/navigation";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/site/SectionHeader";
import { NeighborhoodCard } from "@/components/site/NeighborhoodCard";
import { LocationBreadcrumb } from "@/components/site/LocationBreadcrumb";
import { PropertyCard } from "@/components/property/PropertyCard";
import { JsonLd } from "@/components/site/JsonLd";
import { PropertyMap } from "@/components/maps/PropertyMap";
import {
  findNeighborhood,
  getCity,
  neighborhoodsByCategory,
  neighborhoodPath,
} from "@/config/locations";
import { countPublicPropertiesForNeighborhood, getProperties } from "@/lib/data";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { buyerCtas } from "@/config/ctas";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const nested = findNeighborhood(slug);
  if (nested) {
    return createMetadata({
      title: `${nested.neighborhood.name} Properties | MatriBhumi`,
      description: nested.neighborhood.description,
      path: neighborhoodPath(nested.city.slug, nested.neighborhood.slug),
      image: nested.neighborhood.heroImage,
    });
  }
  const city = getCity(slug);
  if (!city) notFound();
  return createMetadata({
    title: city.seoTitle,
    description: city.seoDescription,
    path: `/locations/${city.slug}`,
    image: city.heroImage,
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const nested = findNeighborhood(slug);
  if (nested) redirect(neighborhoodPath(nested.city.slug, nested.neighborhood.slug));

  const city = getCity(slug);
  if (!city) notFound();

  const groups = neighborhoodsByCategory(city);
  const [counts, cityProperties] = await Promise.all([
    Promise.all(
      city.neighborhoods.map(async (neighborhood) => ({
        slug: neighborhood.slug,
        count: await countPublicPropertiesForNeighborhood(neighborhood.slug),
      })),
    ),
    getProperties({ city: city.slug }),
  ]);
  const countBySlug = Object.fromEntries(counts.map((row) => [row.slug, row.count]));

  return (
    <PublicShell transparentHeader>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: city.name, path: `/locations/${city.slug}` },
        ])}
      />
      <section className="relative min-h-[70vh]">
        <img src={city.heroImage} alt={city.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-charcoal/20" />
        <div className="relative flex min-h-[70vh] flex-col justify-end px-4 pb-14 pt-28 sm:px-6 md:px-12 md:pb-20">
          <LocationBreadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Locations", href: "/locations" },
              { name: city.name },
            ]}
          />
          <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-sand">Bangladesh</p>
          <h1 className="font-display mt-3 text-5xl text-ivory sm:text-7xl md:text-8xl">{city.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-ivory/80 sm:text-lg">{city.tagline}</p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <SectionHeader eyebrow="City" title={city.name} description={city.overview} />
      </section>

      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Neighborhoods"
          title={`Explore ${city.name} Neighborhoods`}
          description="Choose a neighborhood to see published properties from participating developers. Empty neighborhoods stay listed so the map of the city is complete."
        />
        <div className="mt-12 space-y-14">
          {groups.map((group) => (
            <div key={group.category.id}>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-earth">{group.category.label}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {group.neighborhoods.map((neighborhood) => (
                  <NeighborhoodCard
                    key={neighborhood.slug}
                    citySlug={city.slug}
                    neighborhood={neighborhood}
                    propertyCount={countBySlug[neighborhood.slug]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Properties"
          title={`Selected properties in ${city.name}`}
          description="These are published listings already on MatriBhumi. Neighborhood pages show the same inventory filtered to that neighborhood."
        />
        {cityProperties.items.length ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {cityProperties.items.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-10 max-w-2xl text-muted">
            No published properties in {city.name} yet. Explore the neighborhoods above or talk to an advisor.
          </p>
        )}
        <Button href={`/properties?city=${city.slug}`} variant="outline" className="mt-10">
          {buyerCtas.findMyProperty}
        </Button>
      </section>

      <section className="px-4 pb-20 sm:px-6 md:px-12">
        <h2 className="font-display mb-6 text-4xl">Map</h2>
        <PropertyMap latitude={city.latitude} longitude={city.longitude} name={city.name} />
      </section>
    </PublicShell>
  );
}
