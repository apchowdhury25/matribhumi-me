import { notFound } from "next/navigation";
import { PublicShell } from "@/components/site/PublicShell";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/components/property/Gallery";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ViewingForm } from "@/components/forms/ViewingForm";
import { PropertyMap } from "@/components/maps/PropertyMap";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { CompareToggle } from "@/components/property/CompareToggle";
import { JsonLd } from "@/components/site/JsonLd";
import { getProperty } from "@/lib/data";
import { createMetadata, propertyJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatArea, formatBedrooms, formatDate, formatPrice, statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return createMetadata({ title: "Property", description: "MatriBhumi property", path: `/properties/${slug}` });
  return createMetadata({
    title: property.name,
    description: property.description.slice(0, 160),
    path: `/properties/${property.slug}`,
    image: property.heroImage,
  });
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const nearbyGroups = property.nearbyPlaces.reduce<Record<string, typeof property.nearbyPlaces>>((acc, place) => {
    acc[place.category] = acc[place.category] ?? [];
    acc[place.category].push(place);
    return acc;
  }, {});

  return (
    <PublicShell transparentHeader>
      <JsonLd
        data={propertyJsonLd({
          name: property.name,
          description: property.description,
          slug: property.slug,
          image: property.heroImage,
          price: Number(property.startingPrice.toString()),
          currency: property.currency,
          city: property.location.city,
          country: property.location.country,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Properties", path: "/properties" },
          { name: property.name, path: `/properties/${property.slug}` },
        ])}
      />
      <section className="relative min-h-[70dvh] overflow-hidden">
        <img src={property.heroImage} alt={property.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        <div className="relative flex min-h-[70dvh] items-end px-4 pb-12 pt-28 sm:px-6 md:px-12 md:pb-16 md:pt-32">
          <div className="max-w-4xl text-ivory">
            <p className="text-[11px] uppercase tracking-[0.24em] text-sand">
              {property.location.city}, {property.location.country} · {statusLabel(property.status)}
            </p>
            <h1 className="font-display mt-4 text-[2.1rem] leading-[1.05] sm:text-5xl md:text-7xl">{property.name}</h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href="#inquire" variant="invert" className="w-full sm:w-auto">Request Information</Button>
              <Button href="#viewing" variant="outline" className="w-full border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal sm:w-auto">
                Schedule a Viewing
              </Button>
              {property.brochureUrl ? (
                <a href={property.brochureUrl} className="text-[11px] uppercase tracking-[0.2em] text-sand">
                  Download brochure
                </a>
              ) : null}
              <FavoriteButton propertyId={property.id} />
              <CompareToggle propertyId={property.id} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-12 px-4 py-14 sm:px-6 md:px-12 md:py-20 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-earth">Overview</p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{property.description}</p>
          <dl className="mt-8 grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
            <Fact label="Developer" value={property.developer.name} />
            <Fact label="Type" value={statusLabel(property.type)} />
            <Fact label="Completion" value={property.completionDate ? formatDate(property.completionDate, { month: "short", year: "numeric" }) : "—"} />
            <Fact label="Units" value={property.totalUnits ? String(property.totalUnits) : "—"} />
            <Fact label="Development" value={property.development.name} />
          </dl>
        </div>
        <aside className="border border-charcoal/10 bg-paper p-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-earth">Key facts</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>From {formatPrice(property.startingPrice, property.currency)}</li>
            <li>{formatBedrooms(property.bedroomsMin, property.bedroomsMax)}</li>
            <li>{property.bathroomsMin}–{property.bathroomsMax} bathrooms</li>
            <li>{formatArea(property.areaMin, property.areaUnit)} – {formatArea(property.areaMax, property.areaUnit)}</li>
            {property.floors ? <li>{property.floors} floors</li> : null}
          </ul>
        </aside>
      </section>

      <section className="px-4 pb-16 sm:px-6 md:px-12 md:pb-20">
        <h2 className="font-display text-4xl">Gallery</h2>
        <div className="mt-8">
          <Gallery images={property.images} />
        </div>
      </section>

      <section className="bg-mist px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <h2 className="font-display text-4xl">Amenities</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {property.amenities.map((item) => (
            <li key={item.amenityId} className="border border-charcoal/10 bg-ivory px-5 py-4">
              {item.amenity.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <h2 className="font-display text-4xl">Floor plans</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {property.floorPlans.map((plan) => (
            <article key={plan.id} className="border border-charcoal/10 bg-paper p-4">
              <img src={plan.imageUrl} alt={plan.name} className="w-full bg-ivory" />
              <div className="mt-4 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{plan.name}</p>
                  <p className="text-muted">{plan.bedrooms} bed · {formatArea(plan.area)}</p>
                </div>
                {plan.pdfUrl ? (
                  <a href={plan.pdfUrl} className="text-[11px] uppercase tracking-[0.18em] text-earth">
                    PDF
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 md:px-12 md:pb-20">
        <h2 className="font-display text-4xl">Available units</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-[0.16em] text-earth">
              <tr>
                {["Unit", "Type", "Bedrooms", "Area", "Price", "Status", ""].map((h) => (
                  <th key={h} className="border-b border-charcoal/10 py-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {property.units.map((unit) => (
                <tr key={unit.id}>
                  <td className="border-b border-charcoal/10 py-3 pr-4">{unit.name}</td>
                  <td className="border-b border-charcoal/10 py-3 pr-4">{unit.type}</td>
                  <td className="border-b border-charcoal/10 py-3 pr-4">{unit.bedrooms}</td>
                  <td className="border-b border-charcoal/10 py-3 pr-4">{formatArea(unit.area)}</td>
                  <td className="border-b border-charcoal/10 py-3 pr-4">{formatPrice(unit.price, property.currency)}</td>
                  <td className="border-b border-charcoal/10 py-3 pr-4">{statusLabel(unit.status)}</td>
                  <td className="border-b border-charcoal/10 py-3 pr-4">
                    <a href="#inquire" className="text-[11px] uppercase tracking-[0.16em] text-earth">Inquire</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-10 bg-charcoal px-4 py-14 text-ivory sm:px-6 md:px-12 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl">Location</h2>
          <p className="mt-4 text-ivory/70">{property.development.locationNote}</p>
          <div className="mt-6 bg-ivory">
            <PropertyMap latitude={property.latitude} longitude={property.longitude} name={property.name} />
          </div>
        </div>
        <div>
          <h2 className="font-display text-4xl">Nearby</h2>
          <div className="mt-6 grid gap-6">
            {Object.entries(nearbyGroups).map(([category, places]) => (
              <div key={category}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-sand">{category}</p>
                <ul className="mt-2 space-y-1 text-sm text-ivory/80">
                  {places.map((place) => (
                    <li key={place.id}>{place.name} · {place.distance}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-12 px-4 py-14 sm:px-6 md:px-12 md:py-20 lg:grid-cols-2">
        <div id="inquire">
          <h2 className="font-display text-4xl">Request information</h2>
          <p className="mt-3 text-sm text-muted">Demonstration inquiry — stored for the admin console only.</p>
          <div className="mt-8">
            <InquiryForm propertyId={property.id} />
          </div>
        </div>
        <div id="viewing">
          <h2 className="font-display text-4xl">Schedule a viewing</h2>
          <p className="mt-3 text-sm text-muted">Preferred times are requests, not confirmed appointments.</p>
          <div className="mt-8">
            <ViewingForm propertyId={property.id} />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.16em] text-earth">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
