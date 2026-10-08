import hierarchy from "./location-hierarchy.json";

export type LocationCategory = (typeof hierarchy.categories)[number];

export type HierarchyNeighborhood = (typeof hierarchy.cities)[number]["neighborhoods"][number];

export type HierarchyCity = (typeof hierarchy.cities)[number];

export const locationHierarchy = hierarchy;

export const locationCategories = hierarchy.categories;

export const locationCities = hierarchy.cities;

export function getCity(slugOrName: string) {
  const value = slugOrName.trim().toLowerCase();
  return (
    locationCities.find(
      (city) => city.slug === value || city.name.toLowerCase() === value,
    ) ?? null
  );
}

export function getNeighborhood(citySlugOrName: string, neighborhoodSlug: string) {
  const city = getCity(citySlugOrName);
  if (!city) return null;
  const value = neighborhoodSlug.trim().toLowerCase();
  return (
    city.neighborhoods.find(
      (item) => item.slug === value || item.name.toLowerCase() === value,
    ) ?? null
  );
}

export function findNeighborhood(slugOrName: string) {
  const value = slugOrName.trim().toLowerCase();
  for (const city of locationCities) {
    const neighborhood = city.neighborhoods.find(
      (item) => item.slug === value || item.name.toLowerCase() === value,
    );
    if (neighborhood) return { city, neighborhood };
  }
  return null;
}

export function neighborhoodsForCity(slugOrName: string) {
  return getCity(slugOrName)?.neighborhoods ?? [];
}

export function allNeighborhoods() {
  return locationCities.flatMap((city) =>
    city.neighborhoods.map((neighborhood) => ({ city, neighborhood })),
  );
}

export function neighborhoodsByCategory(city: HierarchyCity) {
  const groups: { category: { id: string; label: string }; neighborhoods: HierarchyNeighborhood[] }[] = [];
  for (const category of locationCategories) {
    const neighborhoods = city.neighborhoods.filter((item) => item.category === category.id);
    if (neighborhoods.length) groups.push({ category, neighborhoods });
  }
  const unknown = city.neighborhoods.filter(
    (item) => !locationCategories.some((category) => category.id === item.category),
  );
  if (unknown.length) {
    groups.push({
      category: { id: "other", label: "Neighborhoods" },
      neighborhoods: unknown,
    });
  }
  return groups;
}

export function cityPath(citySlug: string) {
  return `/locations/${citySlug}`;
}

export function neighborhoodPath(citySlug: string, neighborhoodSlug: string) {
  return `/locations/${citySlug}/${neighborhoodSlug}`;
}

export function publicLocationHref(location: {
  slug: string;
  city?: string | null;
  kind?: string | null;
  parent?: { slug: string } | null;
}) {
  const city = getCity(location.slug);
  if (city) return cityPath(city.slug);
  if (location.parent?.slug) return neighborhoodPath(location.parent.slug, location.slug);
  const nested = findNeighborhood(location.slug);
  if (nested) return neighborhoodPath(nested.city.slug, nested.neighborhood.slug);
  const byCityName = location.city ? getCity(location.city) : null;
  if (byCityName && location.slug !== byCityName.slug) {
    return neighborhoodPath(byCityName.slug, location.slug);
  }
  return `/locations/${location.slug}`;
}

export function citySelectOptions() {
  return locationCities.map((city) => ({ value: city.slug, label: city.name }));
}

export function neighborhoodSelectOptions(citySlug?: string) {
  const source = citySlug ? neighborhoodsForCity(citySlug) : allNeighborhoods().map((row) => row.neighborhood);
  const seen = new Set<string>();
  return source
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    })
    .map((item) => ({ value: item.slug, label: item.name }));
}
