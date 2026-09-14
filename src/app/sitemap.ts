import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, developments, locations, articles, jobs] = await Promise.all([
    prisma.property.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.development.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.location.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.newsArticle.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.job.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticPaths = [
    "",
    "/properties",
    "/projects",
    "/locations",
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
    ...locations.map((item) => ({
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
  ];
}
