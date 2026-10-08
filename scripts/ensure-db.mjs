import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

const envFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", ".env");
const envContents = existsSync(envFile) ? readFileSync(envFile, "utf8") : "";
if (!/^DATABASE_URL=/m.test(envContents)) {
  appendFileSync(envFile, `\nDATABASE_URL="${process.env.DATABASE_URL}"\n`);
}
if (!/^SESSION_SECRET=/m.test(envContents) && !process.env.SESSION_SECRET) {
  appendFileSync(envFile, `SESSION_SECRET="matribhumi-hostinger-session-secret-32ch"\n`);
}
if (!/^NEXT_PUBLIC_SITE_URL=/m.test(envContents) && !process.env.NEXT_PUBLIC_SITE_URL) {
  appendFileSync(envFile, `NEXT_PUBLIC_SITE_URL="https://matribhumi.me"\n`);
}

const url = process.env.DATABASE_URL;
if (url.startsWith("file:")) {
  const raw = url.slice("file:".length);
  const schemaDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "prisma");
  const dbPath = path.isAbsolute(raw) ? raw : path.resolve(schemaDir, raw);
  mkdirSync(path.dirname(dbPath), { recursive: true });
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
    shell: true,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npx", ["prisma", "db", "push"]);

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();
const count = await prisma.property.count().catch(() => 0);

const DEMO_PROPERTY_SLUGS = [
  "heights-residences",
  "riverside-terraces",
  "grove-courtyard-villas",
  "bhumi-park-townhomes",
  "heights-penthouses",
  "grove-forest-houses",
  "bashundhara-district-residences",
  "canal-lofts",
  "parkside-apartments",
];
const DEMO_DEVELOPMENT_RENAMES = {
  "matribhumi-heights": "Heights Tower",
  "matribhumi-riverside": "Riverside Walk",
  "matribhumi-bashundhara": "District Residences",
};
const DEMO_DEVELOPMENT_SLUGS = [
  ...Object.keys(DEMO_DEVELOPMENT_RENAMES),
  "the-grove-residences",
  "bhumi-gardens",
];
const CONSTRUCTION_JOB_SLUGS = [
  "project-architect",
  "landscape-designer",
  "community-manager",
  "development-analyst",
  "site-engineer",
  "interior-designer",
];

try {
  await prisma.property.updateMany({
    where: { slug: { in: DEMO_PROPERTY_SLUGS } },
    data: { demo: true },
  });
  await prisma.development.updateMany({
    where: { slug: { in: DEMO_DEVELOPMENT_SLUGS } },
    data: { demo: true },
  });
  for (const [slug, name] of Object.entries(DEMO_DEVELOPMENT_RENAMES)) {
    await prisma.development.updateMany({ where: { slug }, data: { name } });
  }
  await prisma.newsArticle.updateMany({
    where: {
      slug: {
        in: [
          "planning-streets-people-use",
          "designing-with-rain-dhaka",
          "handover-is-a-relationship",
          "reading-a-location",
          "kitchen-windows-and-the-park",
          "heights-podium-gardens",
          "materials-we-return-to",
          "what-a-clubhouse-is-for",
          "drawing-the-mixed-use-block",
          "a-note-on-talking-about-money",
        ],
      },
    },
    data: { demo: true },
  }).catch(() => 0);
  await prisma.job.updateMany({
    where: { slug: { in: CONSTRUCTION_JOB_SLUGS } },
    data: { published: false, demo: true },
  }).catch(() => 0);
  await prisma.job.updateMany({
    where: {
      slug: {
        in: [
          "sales-consultant",
          "communications-lead",
          "property-advisor",
          "partnership-coordinator",
          "buyer-support-associate",
          "content-editor",
        ],
      },
    },
    data: { demo: true },
  }).catch(() => 0);
  console.log("Marked known seed rows as demonstration inventory.");
} catch (error) {
  console.warn("Demo-inventory backfill skipped:", error instanceof Error ? error.message : error);
}

try {
  const hierarchyPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "config", "location-hierarchy.json");
  const hierarchy = JSON.parse(readFileSync(hierarchyPath, "utf8"));
  for (const city of hierarchy.cities) {
    const cityRow = await prisma.location.upsert({
      where: { slug: city.slug },
      update: {
        name: city.name,
        city: city.name,
        country: hierarchy.country,
        kind: "CITY",
        parentId: null,
        heroImage: city.heroImage,
        latitude: city.latitude,
        longitude: city.longitude,
        description: city.description,
        overview: city.overview,
        lifestyle: city.lifestyle,
        connectivity: city.connectivity,
        opportunities: city.opportunities,
        featured: true,
      },
      create: {
        name: city.name,
        slug: city.slug,
        city: city.name,
        country: hierarchy.country,
        region: "South Asia",
        kind: "CITY",
        heroImage: city.heroImage,
        latitude: city.latitude,
        longitude: city.longitude,
        description: city.description,
        overview: city.overview,
        lifestyle: city.lifestyle,
        connectivity: city.connectivity,
        opportunities: city.opportunities,
        featured: true,
      },
    });
    for (const neighborhood of city.neighborhoods) {
      await prisma.location.upsert({
        where: { slug: neighborhood.slug },
        update: {
          name: neighborhood.name,
          city: city.name,
          country: hierarchy.country,
          kind: "NEIGHBORHOOD",
          parentId: cityRow.id,
          category: neighborhood.category,
          sortOrder: neighborhood.sortOrder,
          heroImage: neighborhood.heroImage,
          latitude: neighborhood.latitude,
          longitude: neighborhood.longitude,
          description: neighborhood.description,
          overview: neighborhood.overview,
          lifestyle: neighborhood.lifestyle,
          connectivity: neighborhood.connectivity,
          opportunities: neighborhood.opportunities,
        },
        create: {
          name: neighborhood.name,
          slug: neighborhood.slug,
          city: city.name,
          country: hierarchy.country,
          region: "South Asia",
          kind: "NEIGHBORHOOD",
          parentId: cityRow.id,
          category: neighborhood.category,
          sortOrder: neighborhood.sortOrder,
          heroImage: neighborhood.heroImage,
          latitude: neighborhood.latitude,
          longitude: neighborhood.longitude,
          description: neighborhood.description,
          overview: neighborhood.overview,
          lifestyle: neighborhood.lifestyle,
          connectivity: neighborhood.connectivity,
          opportunities: neighborhood.opportunities,
        },
      });
    }
  }
  console.log("Upserted city and neighborhood hierarchy.");
} catch (error) {
  console.warn("Location hierarchy backfill skipped:", error instanceof Error ? error.message : error);
}

await prisma.$disconnect();

if (count === 0) {
  console.log("No properties found — seeding demonstration data (demo: true).");
  run("npx", ["tsx", "prisma/seed.ts"]);
} else {
  console.log(`Database already has ${count} properties — skipping seed.`);
}
