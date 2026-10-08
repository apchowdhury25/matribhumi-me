import type { Prisma } from "@prisma/client";

/** Fields a public page or API may return for a developer. */
export const publicDeveloperSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  publicDescription: true,
  logoUrl: true,
  website: true,
  country: true,
  cities: true,
  published: true,
  verified: true,
  featured: true,
} satisfies Prisma.DeveloperSelect;

const CONFIDENTIAL_DEVELOPER_KEYS = [
  "internalNotes",
  "relationshipNotes",
  "staffNotes",
  "advisorNotes",
  "leadNotes",
  "dealNotes",
  "contactName",
  "contactEmail",
  "contactPhone",
  "partnerships",
  "compensations",
  "followUps",
  "introductions",
  "deals",
  "shortlist",
] as const;

const CONFIDENTIAL_KEY_FRAGMENTS = [
  "agreementReference",
  "percentage",
  "fixedAmount",
  "expectedAmount",
  "estimatedValue",
  "paymentStatus",
  "paymentDate",
  "transactionReference",
  "compensation",
  "internalNotes",
  "staffNotes",
  "advisorNotes",
  "leadNotes",
  "dealNotes",
  "relationshipNotes",
  "commercialTerms",
  "confidential",
  "feeAmount",
];

export function stripConfidential<T>(value: T): T {
  return stripValue(value) as T;
}

export function containsConfidentialKey(key: string) {
  if ((CONFIDENTIAL_DEVELOPER_KEYS as readonly string[]).includes(key)) return true;
  if (key === "description") return false;
  return CONFIDENTIAL_KEY_FRAGMENTS.some((fragment) => key.toLowerCase().includes(fragment.toLowerCase()));
}

function stripValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripValue);
  if (!value || typeof value !== "object") return value;
  const source = value as Record<string, unknown>;
  const next: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(source)) {
    if (containsConfidentialKey(key)) continue;
    next[key] = stripValue(nested);
  }
  return next;
}
