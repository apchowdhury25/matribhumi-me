const HIDDEN_DEVELOPER_NAMES = new Set(["unpublished partner", "participating developer"]);

export type PublicDeveloper = {
  name: string;
  published: boolean;
  verified?: boolean;
};

/** Public pages show a developer name only for a published, named partner. */
export function publicDeveloperName(developer?: PublicDeveloper | null) {
  if (!developer?.published) return null;
  const name = developer.name.trim();
  if (!name) return null;
  if (HIDDEN_DEVELOPER_NAMES.has(name.toLowerCase())) return null;
  return name;
}

export function ownershipLabel(options: {
  matribhumiOwned?: boolean;
  developer?: PublicDeveloper | null;
}) {
  if (options.matribhumiOwned) return "MatriBhumi-owned";
  return publicDeveloperName(options.developer);
}

/** Public copy may say “trusted” only when a published partner is verified. */
export function isVerifiedDeveloper(developer?: PublicDeveloper | null) {
  return Boolean(publicDeveloperName(developer) && developer?.verified);
}
