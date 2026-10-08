import type { UserRole } from "@prisma/client";

export function canManage(role: UserRole) {
  return role === "ADMIN" || role === "EDITOR" || role === "SALES";
}

/** Properties, developments, locations, content, and developer profiles. */
export function canAccessContent(role: UserRole) {
  return role === "ADMIN" || role === "EDITOR";
}

/** Leads, viewings, shortlists, follow-ups, and the transaction pipeline. */
export function canAccessSales(role: UserRole) {
  return role === "ADMIN" || role === "SALES";
}

export function canEditDevelopers(role: UserRole) {
  return role === "ADMIN" || role === "EDITOR";
}

export function canViewReports(role: UserRole) {
  return role === "ADMIN" || role === "SALES";
}

/** Commercial terms, agreement references, and compensation amounts. */
export function canViewCompensation(role: UserRole) {
  return role === "ADMIN";
}
