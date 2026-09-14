"use client";

import { useEffect, useState } from "react";
import { PublicShell } from "@/components/site/PublicShell";
import { useCompare } from "@/components/providers/CompareProvider";
import { Button } from "@/components/ui/button";
import { formatBedrooms, formatPrice, statusLabel } from "@/lib/format";
import type { PropertyCardData } from "@/components/property/PropertyCard";

export default function ComparePage() {
  const { ids, clear } = useCompare();
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
      <section className="px-6 pb-24 pt-32 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-earth">Compare</p>
            <h1 className="font-display mt-3 text-5xl">Side by side.</h1>
          </div>
          {ids.length ? (
            <button type="button" onClick={clear} className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Clear
            </button>
          ) : null}
        </div>
        {items.length === 0 ? (
          <div className="mt-16">
            <p className="text-muted">Select up to three homes from the property list.</p>
            <Button href="/properties" className="mt-6">Browse properties</Button>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr>
                  <th className="py-3 pr-4"> </th>
                  {items.map((item) => (
                    <th key={item.id} className="py-3 pr-4 font-display text-2xl font-normal">{item.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Location", (p: PropertyCardData) => `${p.location.city}, ${p.location.country}`],
                  ["Type", (p: PropertyCardData) => statusLabel(p.type)],
                  ["Status", (p: PropertyCardData) => statusLabel(p.status)],
                  ["Price", (p: PropertyCardData) => formatPrice(p.startingPrice, p.currency)],
                  ["Bedrooms", (p: PropertyCardData) => formatBedrooms(p.bedroomsMin, p.bedroomsMax)],
                  ["Area", (p: PropertyCardData) => `${p.areaMin.toLocaleString()} ${p.areaUnit}`],
                ].map(([label, fn]) => (
                  <tr key={String(label)} className="border-t border-charcoal/10">
                    <th className="py-3 pr-4 text-[11px] uppercase tracking-[0.16em] text-earth">{label as string}</th>
                    {items.map((item) => (
                      <td key={item.id} className="py-3 pr-4">{(fn as (p: PropertyCardData) => string)(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </PublicShell>
  );
}
