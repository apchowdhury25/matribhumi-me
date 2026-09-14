"use client";

import { useEffect, useRef } from "react";

export function PropertyMap({
  latitude,
  longitude,
  name,
}: {
  latitude: number;
  longitude: number;
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !ref.current) return;
    let cancelled = false;
    let map: { remove: () => void; addControl: (c: unknown) => void } | null = null;

    async function load() {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css";
      document.head.appendChild(css);
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Mapbox failed to load"));
        document.body.appendChild(script);
      });
      if (cancelled || !ref.current) return;
      const mapboxgl = (
        window as unknown as {
          mapboxgl: {
            accessToken: string;
            Map: new (opts: unknown) => { remove: () => void; addControl: (c: unknown) => void };
            NavigationControl: new () => unknown;
            Marker: new () => { setLngLat: (p: [number, number]) => { addTo: (m: unknown) => void } };
          };
        }
      ).mapboxgl;
      mapboxgl.accessToken = token!;
      map = new mapboxgl.Map({
        container: ref.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [longitude, latitude],
        zoom: 13,
      });
      map.addControl(new mapboxgl.NavigationControl());
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    }

    load().catch(() => undefined);
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [token, latitude, longitude]);

  if (token) {
    return <div ref={ref} className="h-[420px] w-full bg-stone" aria-label={name} />;
  }

  const delta = 0.02;
  const bbox = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <iframe
      title={`Map of ${name}`}
      src={src}
      className="h-[420px] w-full border-0"
      loading="lazy"
    />
  );
}
