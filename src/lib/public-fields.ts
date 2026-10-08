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
  "contactName",
  "contactEmail",
  "contactPhone",
  "partnerships",
  "compensations",
] as const;

const CONFIDENTIAL_KEY_FRAGMENTS = [
  "agreementReference",
  "percentage",
  "fixedAmount",
  "expectedAmount",
  "paymentStatus",
  "paymentDate",
  "transactionReference",
  "compensation",
  "internalNotes",
];

export function stripConfidential<T>(value: T): T {
  return stripValue(value) as T;
}

function stripValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripValue);
  if (!value || typeof value !== "object") return value;
  const source = value as Record<string, unknown>;
  const next: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(source)) {
    if ((CONFIDENTIAL_DEVELOPER_KEYS as readonly string[]).includes(key)) continue;
    if (CONFIDENTIAL_KEY_FRAGMENTS.some((fragment) => key.toLowerCase().includes(fragment.toLowerCase()) && key !== "description")) {
      continue;
    }
    next[key] = stripValue(nested);
  }
  return next;
}
