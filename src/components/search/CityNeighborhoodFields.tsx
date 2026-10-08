"use client";

import { useMemo, useState } from "react";
import {
  citySelectOptions,
  neighborhoodSelectOptions,
} from "@/config/locations";

export function CityNeighborhoodFields({
  defaultCity = "",
  defaultNeighborhood = "",
}: {
  defaultCity?: string;
  defaultNeighborhood?: string;
}) {
  const [city, setCity] = useState(defaultCity);
  const neighborhoods = useMemo(() => neighborhoodSelectOptions(city || undefined), [city]);

  return (
    <>
      <select
        name="city"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm"
        aria-label="City"
      >
        <option value="">All cities</option>
        {citySelectOptions().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        name="location"
        defaultValue={neighborhoods.some((item) => item.value === defaultNeighborhood) ? defaultNeighborhood : ""}
        key={`${city}-${defaultNeighborhood}`}
        className="h-11 border border-charcoal/15 bg-ivory px-3 text-sm"
        aria-label="Neighborhood"
      >
        <option value="">{city ? "All neighborhoods" : "All neighborhoods"}</option>
        {neighborhoods.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
