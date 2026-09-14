"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatPrice, statusLabel } from "@/lib/format";

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

function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

export function PresenceMap({ pins }: { pins: MapPin[] }) {
  const [active, setActive] = useState<string | null>(pins[0]?.id ?? null);
  const [zoom, setZoom] = useState(1);
  const current = useMemo(() => pins.find((p) => p.id === active) ?? pins[0], [active, pins]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="relative min-h-[240px] overflow-hidden bg-charcoal sm:min-h-[320px] lg:min-h-[420px]">
        <svg viewBox="0 0 1000 560" className="h-full w-full" role="img" aria-label="MatriBhumi demonstration locations">
          <rect width="1000" height="560" fill="#1A1916" />
          <g opacity="0.35" fill="none" stroke="#D8C9B0" strokeWidth="0.8">
            <path d="M120 180c80-40 160-20 220 10 80 40 140-10 210 20 70 30 130 10 190-30 40-26 90-10 140 18" />
            <path d="M80 300c90 10 150-40 230-20 90 24 150 8 220-18 90-34 160 10 250 4" />
            <path d="M140 390c70-10 130 30 200 10 110-30 170 20 260 8 90-12 150 24 230 6" />
            <path d="M200 120c40 30 30 70 10 110" />
            <path d="M620 90c20 40 10 80-20 120" />
          </g>
          <g style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
            {pins.map((pin) => {
              const { x, y } = project(pin.latitude, pin.longitude);
              const cx = x * 10;
              const cy = y * 5.6;
              const on = pin.id === active;
              return (
                <g key={pin.id}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={on ? 9 : 5}
                    fill={on ? "#A4895A" : "#F7F3EB"}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(pin.id)}
                    onClick={() => setActive(pin.id)}
                  />
                  <text
                    x={cx + 12}
                    y={cy - 8}
                    fill="#F7F3EB"
                    fontSize="11"
                    className="pointer-events-none"
                  >
                    {pin.location.city}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            type="button"
            className="h-9 w-9 bg-ivory text-charcoal"
            onClick={() => setZoom((z) => Math.min(2.2, z + 0.2))}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className="h-9 w-9 bg-ivory text-charcoal"
            onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
            aria-label="Zoom out"
          >
            −
          </button>
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
            <Link
              href={`/projects/${current.slug}`}
              className="mt-6 inline-flex text-[11px] uppercase tracking-[0.2em] text-earth"
            >
              View development
            </Link>
          </div>
        </article>
      ) : null}
    </div>
  );
}
