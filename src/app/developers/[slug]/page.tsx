import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { getPublishedDeveloper } from "@/lib/data";
import { publicDeveloperName } from "@/lib/developer";
import { createMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const developer = await getPublishedDeveloper(slug);
  const name = publicDeveloperName(developer);
  if (!developer || !name) {
    return createMetadata({ title: "Developer", description: "Selected developer", path: `/developers/${slug}` });
  }
  return createMetadata({
    title: name,
    description: developer.description.slice(0, 160),
    path: `/developers/${developer.slug}`,
  });
}

export default async function DeveloperDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const developer = await getPublishedDeveloper(slug);
  const name = publicDeveloperName(developer);
  if (!developer || !name) notFound();

  return (
    <PublicShell transparentHeader>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Developers", path: "/developers" },
          { name, path: `/developers/${developer.slug}` },
        ])}
      />
      <section className="bg-charcoal px-4 pb-16 pt-32 text-ivory sm:px-6 md:px-12 md:pb-24 md:pt-40">
        <p className="text-[11px] uppercase tracking-[0.24em] text-sand">
          {developer.verified ? "Verified developer" : "Selected developer"}
        </p>
        <h1 className="font-display mt-4 text-4xl sm:text-6xl md:text-7xl">{name}</h1>
        <p className="mt-6 max-w-2xl text-ivory/75">{developer.description}</p>
        {developer.website ? (
          <a href={developer.website} className="mt-6 inline-block text-sand hover:text-ivory" rel="noreferrer" target="_blank">
            Developer website
          </a>
        ) : null}
      </section>
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        <h2 className="font-display text-4xl">Properties listed through MatriBhumi</h2>
        {developer.properties.length ? (
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {developer.properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-muted">No published properties for this developer yet.</p>
        )}
        {developer.developments.length ? (
          <div className="mt-12">
            <h3 className="font-display text-2xl">Projects</h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {developer.developments.map((project) => (
                <li key={project.id}>
                  <Link href={`/projects/${project.slug}`} className="border border-charcoal/15 px-4 py-2 text-sm">
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <Button href="/contact" className="mt-12">
          Speak with an advisor
        </Button>
      </section>
    </PublicShell>
  );
}
