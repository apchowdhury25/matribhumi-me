import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locationCities, neighborhoodPath } from "@/config/locations";
import { publicVisibilityWhere } from "@/lib/demo-inventory";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let properties: { slug: string; updatedAt: Date }[] = [];
  let developments: { slug: string; updatedAt: Date }[] = [];
  let locations: { slug: string; updatedAt: Date }[] = [];
  let articles: { slug: string; updatedAt: Date }[] = [];
  let jobs: { slug: string; updatedAt: Date }[] = [];
  try {
    [properties, developments, locations, articles, jobs] = await Promise.all([
      prisma.property.findMany({ where: { ...publicVisibilityWhere(), location: { country: "Bangladesh" } }, select: { slug: true, updatedAt: true } }),
      prisma.development.findMany({ where: { ...publicVisibilityWhere(), location: { country: "Bangladesh" } }, select: { slug: true, updatedAt: true } }),
      prisma.location.findMany({ where: { country: "Bangladesh" }, select: { slug: true, updatedAt: true } }),
      prisma.newsArticle.findMany({ where: publicVisibilityWhere(), select: { slug: true, updatedAt: true } }),
      prisma.job.findMany({ where: publicVisibilityWhere(), select: { slug: true, updatedAt: true } }),
    ]);
  } catch {
    /* Build hosts may not inject DATABASE_URL into every worker. */
  }

  let developers: { slug: string }[] = [];
  try {
    developers = await prisma.developer.findMany({
      where: { published: true },
      select: { slug: true, name: true },
    }).then((rows) => rows.filter((row) => row.name.trim() && !["unpublished partner", "participating developer"].includes(row.name.trim().toLowerCase())));
  } catch {
    developers = [];
  }

  const staticPaths = [
    "",
    "/properties",
    "/developers",
    "/projects",
    "/locations",
    "/locations/bangladesh",
    ...locationCities.flatMap((city) => [
      `/locations/${city.slug}`,
      ...city.neighborhoods.map((neighborhood) => neighborhoodPath(city.slug, neighborhood.slug)),
    ]),
    "/how-it-works",
    "/advise",
    "/for-developers",
    "/about",
    "/sustainability",
    "/insights",
    "/careers",
    "/contact",
    "/favorites",
    "/compare",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
    "/disclaimer/property",
    "/disclaimer/buyer-fee",
    "/disclaimer/developers",
    "/legal/bangladesh",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...properties.map((item) => ({
      url: `${siteConfig.url}/properties/${item.slug}`,
      lastModified: item.updatedAt,
    })),
    ...developments.map((item) => ({
      url: `${siteConfig.url}/projects/${item.slug}`,
      lastModified: item.updatedAt,
    })),
    ...locations
      .filter((item) => !locationCities.some((city) => city.slug === item.slug || city.neighborhoods.some((n) => n.slug === item.slug)))
      .map((item) => ({
        url: `${siteConfig.url}/locations/${item.slug}`,
        lastModified: item.updatedAt,
      })),
    ...articles.map((item) => ({
      url: `${siteConfig.url}/insights/${item.slug}`,
      lastModified: item.updatedAt,
    })),
    ...jobs.map((item) => ({
      url: `${siteConfig.url}/careers/${item.slug}`,
      lastModified: item.updatedAt,
    })),
    ...developers.map((item) => ({
      url: `${siteConfig.url}/developers/${item.slug}`,
      lastModified: new Date(),
    })),
  ];
}
