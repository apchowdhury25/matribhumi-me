/**
 * Seed/sample listings are marked `demo: true`.
 * Production public pages hide them unless ALLOW_DEMO_LISTINGS=true.
 * Local `next dev` shows them so e2e and staff training still work,
 * and every public surface must label them as demonstration data.
 */
export function allowDemoInventory(env: NodeJS.ProcessEnv = process.env) {
  const flag = env.ALLOW_DEMO_LISTINGS?.trim().toLowerCase();
  if (flag === "true" || flag === "1" || flag === "yes") return true;
  if (flag === "false" || flag === "0" || flag === "no") return false;
  return env.NODE_ENV !== "production";
}

export function publicVisibilityWhere(): { published: true; demo?: false } {
  if (allowDemoInventory()) return { published: true };
  return { published: true, demo: false };
}

export function isPubliclyVisible(item: { published?: boolean | null; demo?: boolean | null }) {
  if (!item.published) return false;
  if (item.demo && !allowDemoInventory()) return false;
  return true;
}

export const DEMO_PROPERTY_SLUGS = [
  "heights-residences",
  "riverside-terraces",
  "grove-courtyard-villas",
  "bhumi-park-townhomes",
  "heights-penthouses",
  "grove-forest-houses",
  "bashundhara-district-residences",
  "canal-lofts",
  "parkside-apartments",
] as const;

export const DEMO_DEVELOPMENT_SLUGS = [
  "matribhumi-heights",
  "matribhumi-riverside",
  "the-grove-residences",
  "bhumi-gardens",
  "matribhumi-bashundhara",
] as const;

export const DEMO_ARTICLE_SLUGS = [
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
] as const;

export const DEMO_JOB_SLUGS = [
  "project-architect",
  "landscape-designer",
  "community-manager",
  "development-analyst",
  "site-engineer",
  "interior-designer",
  "sales-consultant",
  "communications-lead",
  "property-advisor",
  "partnership-coordinator",
  "buyer-support-associate",
  "content-editor",
] as const;

export const CONSTRUCTION_JOB_SLUGS = [
  "project-architect",
  "landscape-designer",
  "community-manager",
  "development-analyst",
  "site-engineer",
  "interior-designer",
] as const;
