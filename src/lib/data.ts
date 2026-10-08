import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { isPubliclyVisible, publicVisibilityWhere } from "@/lib/demo-inventory";
import { publicDeveloperName } from "@/lib/developer";
import { isOperatingCountry, OPERATING_COUNTRY } from "@/lib/markets";
import { publicDeveloperSelect } from "@/lib/public-fields";
import type { PropertyFilters } from "@/lib/validations";

const inBangladesh = { country: OPERATING_COUNTRY };

const propertyCardInclude = {
  location: true,
  development: true,
  developer: { select: publicDeveloperSelect },
} satisfies Prisma.PropertyInclude;

const PAGE_SIZE = 12;

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[data]", error);
    return fallback;
  }
}

export async function getFeaturedDevelopments() {
  return safe(
    () =>
      prisma.development.findMany({
        where: { featured: true, ...publicVisibilityWhere(), location: inBangladesh },
        include: { location: true },
        orderBy: { name: "asc" },
      }),
    [],
  );
}

export async function getSignatureDevelopments() {
  return safe(
    () =>
      prisma.development.findMany({
        where: { signature: true, ...publicVisibilityWhere(), location: inBangladesh },
        include: { location: true },
        orderBy: { name: "asc" },
      }),
    [],
  );
}

export async function getDevelopments(category?: string) {
  return safe(
    () =>
      prisma.development.findMany({
        where: {
          ...publicVisibilityWhere(),
          location: inBangladesh,
          ...(category ? { category: category as never } : {}),
        },
        include: { location: true, _count: { select: { properties: true } } },
        orderBy: { name: "asc" },
      }),
    [],
  );
}

export async function getDevelopment(slug: string) {
  return safe(async () => {
    const development = await prisma.development.findUnique({
      where: { slug },
      include: {
        location: true,
        developer: { select: publicDeveloperSelect },
        properties: { where: publicVisibilityWhere(), include: propertyCardInclude },
      },
    });
    if (!development || !isPubliclyVisible(development) || !isOperatingCountry(development.location.country)) {
      return null;
    }
    return development;
  }, null);
}

export async function getLocations() {
  return safe(
    () =>
      prisma.location.findMany({
        where: inBangladesh,
        include: { _count: { select: { developments: true, properties: true } } },
        orderBy: { name: "asc" },
      }),
    [],
  );
}

export async function getLocation(slug: string) {
  return safe(async () => {
    const location = await prisma.location.findUnique({
      where: { slug },
      include: {
        developments: { where: publicVisibilityWhere() },
        properties: { where: { ...publicVisibilityWhere(), featured: true }, include: propertyCardInclude },
      },
    });
    if (!location || !isOperatingCountry(location.country)) return null;
    return location;
  }, null);
}

export async function getProperty(slug: string) {
  return safe(async () => {
    const property = await prisma.property.findUnique({
      where: { slug },
      include: {
        location: true,
        development: true,
        developer: { select: publicDeveloperSelect },
        images: { orderBy: { sortOrder: "asc" } },
        amenities: { include: { amenity: true } },
        units: { orderBy: { name: "asc" } },
        floorPlans: true,
        nearbyPlaces: true,
      },
    });
    if (!property || !isPubliclyVisible(property) || !isOperatingCountry(property.location.country)) {
      return null;
    }
    return property;
  }, null);
}

function locationWhere(filters: PropertyFilters): Prisma.LocationWhereInput {
  const clauses: Prisma.LocationWhereInput[] = [inBangladesh];
  if (filters.city) {
    clauses.push({ OR: [{ slug: filters.city }, { city: filters.city }, { name: filters.city }] });
  }
  if (filters.location) {
    clauses.push({ slug: filters.location });
  }
  return clauses.length === 1 ? clauses[0] : { AND: clauses };
}

export async function getProperties(filters: PropertyFilters = {}) {
  const page = filters.page ?? 1;
  const location = locationWhere(filters);
  const where: Prisma.PropertyWhereInput = {
    ...publicVisibilityWhere(),
    ...(filters.q
      ? {
          OR: [
            { name: { contains: filters.q } },
            { description: { contains: filters.q } },
            { location: { name: { contains: filters.q } } },
          ],
        }
      : {}),
    ...(location ? { location } : {}),
    ...(filters.developer ? { developer: { slug: filters.developer, published: true } } : {}),
    ...(filters.type ? { type: filters.type as never } : {}),
    ...(filters.status ? { status: filters.status as never } : {}),
    ...(filters.completionStatus === "ready" ? { status: "READY" } : {}),
    ...(filters.completionStatus === "off-plan"
      ? { status: { in: ["UPCOMING", "LAUNCHED", "UNDER_CONSTRUCTION"] } }
      : {}),
    ...(filters.featured === "true" ? { featured: true } : {}),
    ...(filters.minPrice || filters.maxPrice
      ? {
          startingPrice: {
            ...(filters.minPrice ? { gte: filters.minPrice } : {}),
            ...(filters.maxPrice ? { lte: filters.maxPrice } : {}),
          },
        }
      : {}),
    ...(filters.bedrooms ? { bedroomsMax: { gte: filters.bedrooms } } : {}),
    ...(filters.bathrooms ? { bathroomsMax: { gte: filters.bathrooms } } : {}),
    ...(filters.minArea ? { areaMax: { gte: filters.minArea } } : {}),
    ...(filters.maxArea ? { areaMin: { lte: filters.maxArea } } : {}),
    ...(filters.amenity
      ? { amenities: { some: { amenity: { slug: filters.amenity } } } }
      : {}),
    ...(filters.completion && /^\d{4}$/.test(filters.completion)
      ? {
          completionDate: {
            gte: new Date(`${filters.completion}-01-01T00:00:00.000Z`),
            lt: new Date(`${Number(filters.completion) + 1}-01-01T00:00:00.000Z`),
          },
        }
      : {}),
  };

  const orderBy: Prisma.PropertyOrderByWithRelationInput =
    filters.sort === "price-asc"
      ? { startingPrice: "asc" }
      : filters.sort === "price-desc"
        ? { startingPrice: "desc" }
        : filters.sort === "newest"
          ? { createdAt: "desc" }
          : { featured: "desc" };

  return safe(
    async () => {
      const [items, total, locations, amenities, developers] = await Promise.all([
        prisma.property.findMany({
          where,
          include: propertyCardInclude,
          orderBy,
          skip: (page - 1) * PAGE_SIZE,
          take: PAGE_SIZE,
        }),
        prisma.property.count({ where }),
        prisma.location.findMany({ where: inBangladesh, orderBy: { name: "asc" } }),
        prisma.amenity.findMany({ orderBy: { name: "asc" } }),
        prisma.developer.findMany({
          where: { published: true },
          select: publicDeveloperSelect,
          orderBy: { name: "asc" },
        }),
      ]);
      return {
        items,
        total,
        page,
        pageSize: PAGE_SIZE,
        pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
        locations,
        amenities,
        developers: developers.filter((developer) => publicDeveloperName(developer)),
      };
    },
    {
      items: [],
      total: 0,
      page,
      pageSize: PAGE_SIZE,
      pages: 1,
      locations: [],
      amenities: [],
      developers: [],
    },
  );
}

export async function getFeaturedProperties(take = 6) {
  return safe(
    () =>
      prisma.property.findMany({
        where: { ...publicVisibilityWhere(), featured: true, location: inBangladesh },
        include: propertyCardInclude,
        orderBy: { name: "asc" },
        take,
      }),
    [],
  );
}

export async function getPublishedDevelopers() {
  return safe(async () => {
    const items = await prisma.developer.findMany({
      where: { published: true },
      select: {
        ...publicDeveloperSelect,
        _count: { select: { properties: true, developments: true } },
      },
      orderBy: { name: "asc" },
    });
    return items.filter((developer) => publicDeveloperName(developer));
  }, []);
}

export async function getFeaturedDevelopers() {
  return safe(async () => {
    const items = await prisma.developer.findMany({
      where: { published: true, featured: true },
      select: {
        ...publicDeveloperSelect,
        _count: { select: { properties: true, developments: true } },
      },
      orderBy: { name: "asc" },
    });
    return items.filter((developer) => publicDeveloperName(developer));
  }, []);
}

export async function getPublishedDeveloper(slug: string) {
  return safe(async () => {
    const developer = await prisma.developer.findUnique({
      where: { slug },
      select: {
        ...publicDeveloperSelect,
        properties: {
          where: { ...publicVisibilityWhere(), location: inBangladesh },
          include: propertyCardInclude,
          orderBy: { name: "asc" },
        },
        developments: {
          where: publicVisibilityWhere(),
          include: { location: true },
          orderBy: { name: "asc" },
        },
      },
    });
    if (!developer || !publicDeveloperName(developer)) return null;
    return developer;
  }, null);
}

export async function getPropertiesByIds(ids: string[]) {
  const unique = [...new Set(ids.map((id) => id.trim()).filter(Boolean))].slice(0, 50);
  if (!unique.length) return [];

  return safe(async () => {
    const items = await prisma.property.findMany({
      where: { id: { in: unique }, ...publicVisibilityWhere(), location: inBangladesh },
      include: propertyCardInclude,
    });
    const order = new Map(unique.map((id, index) => [id, index]));
    return items.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
  }, []);
}

export async function getArticles(category?: string) {
  return safe(
    () =>
      prisma.newsArticle.findMany({
        where: {
          ...publicVisibilityWhere(),
          ...(category ? { category: category as never } : {}),
        },
        include: { author: true },
        orderBy: { publishedAt: "desc" },
      }),
    [],
  );
}

export async function getArticle(slug: string) {
  return safe(async () => {
    const article = await prisma.newsArticle.findUnique({ where: { slug }, include: { author: true } });
    if (!article || !isPubliclyVisible(article)) return null;
    return article;
  }, null);
}

export async function getJobs() {
  return safe(
    () => prisma.job.findMany({ where: publicVisibilityWhere(), orderBy: { createdAt: "desc" } }),
    [],
  );
}

export async function getJob(slug: string) {
  return safe(async () => {
    const job = await prisma.job.findUnique({ where: { slug } });
    if (!job || !isPubliclyVisible(job)) return null;
    return job;
  }, null);
}

export async function searchAll(q: string) {
  const query = q.trim();
  if (query.length < 2) {
    return { properties: [], developments: [], locations: [], articles: [] };
  }
  const contains = { contains: query };
  return safe(
    async () => {
      const [properties, developments, locations, articles] = await Promise.all([
        prisma.property.findMany({
          where: {
            ...publicVisibilityWhere(),
            location: inBangladesh,
            OR: [{ name: contains }, { description: contains }],
          },
          include: { location: true },
          take: 5,
        }),
        prisma.development.findMany({
          where: {
            ...publicVisibilityWhere(),
            location: inBangladesh,
            OR: [{ name: contains }, { tagline: contains }],
          },
          include: { location: true },
          take: 5,
        }),
        prisma.location.findMany({
          where: {
            ...inBangladesh,
            OR: [{ name: contains }, { city: contains }],
          },
          take: 5,
        }),
        prisma.newsArticle.findMany({
          where: { ...publicVisibilityWhere(), OR: [{ title: contains }, { excerpt: contains }] },
          take: 5,
        }),
      ]);
      return { properties, developments, locations, articles };
    },
    { properties: [], developments: [], locations: [], articles: [] },
  );
}

export async function getAdminMetrics() {
  return safe(
    async () => {
      const [properties, developments, units, leads, inquiries, viewings, articles, deals, developers] =
        await Promise.all([
          prisma.property.count(),
          prisma.development.count(),
          prisma.unit.count(),
          prisma.lead.count(),
          prisma.lead.count({ where: { status: "NEW" } }),
          prisma.viewingRequest.count(),
          prisma.newsArticle.count({ where: { published: true } }),
          prisma.deal.count({ where: { status: "OPEN" } }),
          prisma.developer.count(),
        ]);
      return { properties, developments, units, leads, inquiries, viewings, articles, deals, developers };
    },
    { properties: 0, developments: 0, units: 0, leads: 0, inquiries: 0, viewings: 0, articles: 0, deals: 0, developers: 0 },
  );
}

export async function getMapDevelopments() {
  return safe(
    () =>
      prisma.development.findMany({
        where: { ...publicVisibilityWhere(), location: inBangladesh },
        include: { location: true },
      }),
    [],
  );
}
