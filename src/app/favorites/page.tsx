"use client";

import { useEffect, useState } from "react";
import { PublicShell } from "@/components/site/PublicShell";
import { PropertyCard, type PropertyCardData } from "@/components/property/PropertyCard";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { ids } = useFavorites();
  const [items, setItems] = useState<PropertyCardData[]>([]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!ids.length) {
        if (!cancelled) setItems([]);
        return;
      }
      const res = await fetch(`/api/properties/by-ids?ids=${ids.join(",")}`);
      const data = await res.json();
      if (!cancelled) setItems(data.items ?? []);
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [ids]);

  return (
    <PublicShell>
      <section className="px-4 pb-20 pt-28 sm:px-6 md:px-12 md:pt-32">
        <p className="text-[11px] uppercase tracking-[0.22em] text-earth">Saved homes</p>
        <h1 className="font-display mt-3 text-[2.1rem] sm:text-5xl">Your shortlist.</h1>
        <p className="mt-4 max-w-xl text-muted">
          Saved on this device. Sign-in favorites are stored when you use a staff account.
        </p>
        {items.length === 0 ? (
          <div className="mt-16">
            <p className="text-muted">No homes saved yet.</p>
            <Button href="/properties" className="mt-6">Explore properties</Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {items.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </PublicShell>
  );
}
