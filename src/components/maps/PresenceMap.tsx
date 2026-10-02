"use client";

import { useMemo, useState } from "react";
import { formatPrice, statusLabel } from "@/lib/format";
import { DualCta } from "@/components/site/LeadCapture";

export type MapPin = {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  heroImage: string;
  locationNote: string;
  status: string;
  startingPrice: { toString(): string } | number;
  currency: string;
  location: { city: string; country: string };
};

function mapSrc(pin: MapPin) {
  const query = `${pin.latitude},${pin.longitude}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&hl=en&output=embed`;
}

export function PresenceMap({ pins }: { pins: MapPin[] }) {
  const [active, setActive] = useState<string | null>(pins[0]?.id ?? null);
  const current = useMemo(() => pins.find((p) => p.id === active) ?? pins[0], [active, pins]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="min-w-0">
        <div className="relative h-[320px] overflow-hidden bg-stone sm:h-[380px] lg:h-[460px]">
          {current ? (
            <iframe
              key={current.id}
              title={`Map of ${current.name}`}
              src={mapSrc(current)}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : null}
        </div>
        <div
          role="tablist"
          aria-label="Developments on the map"
          className="no-scrollbar flex gap-2 overflow-x-auto border border-t-0 border-charcoal/10 bg-paper p-3"
        >
          {pins.map((pin) => {
            const on = pin.id === current?.id;
            return (
              <button
                key={pin.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(pin.id)}
                className={`shrink-0 px-3 py-2 text-left text-[11px] uppercase tracking-[0.16em] ${
                  on ? "bg-charcoal text-ivory" : "text-earth hover:text-charcoal"
                }`}
              >
                {pin.name}
              </button>
            );
          })}
        </div>
      </div>
      {current ? (
        <article className="border border-charcoal/10 bg-paper">
          <img src={current.heroImage} alt={current.name} className="h-48 w-full object-cover" />
          <div className="p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-earth">
              {current.location.city}, {current.location.country}
            </p>
            <h3 className="font-display mt-2 text-3xl">{current.name}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{current.locationNote}</p>
            <p className="mt-4 text-sm">
              {statusLabel(current.status)} · from {formatPrice(current.startingPrice, current.currency)}
            </p>
            <DualCta projectName={current.name} className="mt-6" />
          </div>
        </article>
      ) : null}
    </div>
  );
}
