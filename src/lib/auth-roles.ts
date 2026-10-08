import type { UserRole } from "@prisma/client";

export function canManage(role: UserRole) {
  return role === "ADMIN" || role === "EDITOR" || role === "SALES";
}

/** Commercial terms, agreement references, and compensation amounts. */
export function canViewCompensation(role: UserRole) {
  return role === "ADMIN";
}
