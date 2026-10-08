import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CityCard } from "@/components/site/CityCard";
import { countPublicPropertiesForCity } from "@/lib/data";
import { locationCities } from "@/config/locations";
import { createMetadata } from "@/lib/seo";
import { howWeWork } from "@/config/legal";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: "Locations",
  description:
    "Explore Bangladesh property by city. Start with Dhaka or Chattogram, then open a neighborhood.",
  path: "/locations",
  image: "/media/locations/dhaka.jpg",
});

export default async function LocationsPage() {
  const cityCounts = await Promise.all(
    locationCities.map(async (city) => ({ slug: city.slug, count: await countPublicPropertiesForCity(city.slug) })),
  );
  const cityCountBySlug = Object.fromEntries(cityCounts.map((row) => [row.slug, row.count]));

  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/locations/dhaka.jpg"
        eyebrow="Locations"
        title="Where do you want to find a property?"
        description={`${howWeWork.summary} Start with a city, then a neighborhood.`}
      />
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Bangladesh"
          title="Explore Properties by City"
          description="Neighborhoods such as Gulshan, Banani, and Khulshi live on their city pages — not on this landing."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {locationCities.map((city) => (
            <CityCard key={city.slug} city={city} propertyCount={cityCountBySlug[city.slug]} />
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
