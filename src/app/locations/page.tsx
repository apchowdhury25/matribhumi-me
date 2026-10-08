import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { getLocations } from "@/lib/data";
import { markets } from "@/lib/markets";
import { createMetadata } from "@/lib/seo";
import { howWeWork } from "@/config/legal";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: "Locations",
  description:
    "Independent property guidance in Bangladesh. City pages cover Dhaka, Chattogram, and other published locations.",
  path: "/locations",
  image: "/media/location-aerial.jpg",
});

export default async function LocationsPage() {
  const locations = await getLocations();
  const bangladesh = markets[0];
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/location-aerial.jpg"
        eyebrow="Locations"
        title="Property advisory in Bangladesh."
        description={`${howWeWork.summary} ${howWeWork.purchaseAgreement}`}
      />
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Bangladesh"
          title="Explore by city."
          description="City pages open when location data has been published. MatriBhumi is the advisor; the developer is the seller."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {bangladesh.cities.map((city) => (
            <Link key={city.slug} href={`/locations/${city.slug}`} className="group relative min-h-[280px] overflow-hidden">
              <img
                src={bangladesh.heroImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-charcoal/45" />
              <div className="relative flex h-full min-h-[280px] flex-col justify-end p-6 text-ivory">
                <p className="text-[11px] uppercase tracking-[0.2em] text-sand">Bangladesh</p>
                <h2 className="font-display mt-2 text-4xl">{city.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-mist px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <SectionHeader
          eyebrow="Published cities"
          title="Locations with listing data today."
          description="More cities will appear as data becomes available."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {locations.map((location) => (
            <Link key={location.id} href={`/locations/${location.slug}`} className="group bg-ivory p-2 sm:p-0">
              <div className="aspect-[16/10] overflow-hidden bg-stone">
                <img src={location.heroImage} alt={location.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-earth">{location.country}</p>
              <h2 className="font-display text-4xl">{location.city}</h2>
              <p className="mt-2 text-sm text-muted">{location.description}</p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-earth">
                {location._count.developments} projects · {location._count.properties} properties
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
