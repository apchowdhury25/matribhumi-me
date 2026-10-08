import Link from "next/link";
import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { getPublishedDevelopers } from "@/lib/data";
import { publicDeveloperName } from "@/lib/developer";
import { createMetadata } from "@/lib/seo";
import { buyerCtas } from "@/config/ctas";
import { BuyerFeeNotice } from "@/components/site/BuyerFeeNotice";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: "Developers",
  description:
    "Selected developers whose properties are presented through MatriBhumi. Profiles appear when a participating partner is published.",
  path: "/developers",
  image: "/media/about-model.jpg",
});

export default async function DevelopersPage() {
  const developers = await getPublishedDevelopers();

  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-model.jpg"
        eyebrow="Developers"
        title="Selected developers."
        description="MatriBhumi lists properties from participating developers. Public names and profiles appear only when a partnership is confirmed and the developer record is published."
      />
      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-20">
        {developers.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {developers.map((developer) => {
              const name = publicDeveloperName(developer);
              if (!name) return null;
              return (
                <Link
                  key={developer.id}
                  href={`/developers/${developer.slug}`}
                  className="border border-charcoal/10 bg-paper p-8 hover:border-charcoal/30"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-earth">
                    {developer.verified ? "Verified developer" : "Selected developer"}
                  </p>
                  <h2 className="font-display mt-3 text-3xl">{name}</h2>
                  <p className="mt-3 text-sm text-muted">
                    {developer._count.properties} properties · {developer._count.developments} projects
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl">No published developer profiles yet.</h2>
            <p className="mt-4 leading-7 text-muted">
              Named developer pages will appear here when participating partners are published. Browse selected
              developments in the meantime, or speak with an advisor.
            </p>
            <BuyerFeeNotice className="mt-6" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/properties">{buyerCtas.findMyProperty}</Button>
              <Button href="/advise" variant="outline">
                {buyerCtas.talkToAdvisor}
              </Button>
              <Button href="/for-developers" variant="outline">
                For developers
              </Button>
            </div>
          </div>
        )}
      </section>
    </PublicShell>
  );
}
