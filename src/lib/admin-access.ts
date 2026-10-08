import { redirect } from "next/navigation";
import { canAccessContent, canAccessSales, canViewReports, requireUser } from "@/lib/auth";
import { canVisitConsolePath, navForRole } from "@/lib/admin-nav";
import type { SessionUser } from "@/lib/auth";

export { navForRole };

export function enforceConsolePath(path: string, role: SessionUser["role"]) {
  if (!canVisitConsolePath(path, role)) redirect("/admin");
}

export async function requireSalesUser() {
  const user = await requireUser();
  if (!user) redirect("/admin/login");
  if (!canAccessSales(user.role)) redirect("/admin");
  return user;
}

export async function requireContentUser() {
  const user = await requireUser();
  if (!user) redirect("/admin/login");
  if (!canAccessContent(user.role)) redirect("/admin");
  return user;
}

export async function requireReportsUser() {
  const user = await requireUser();
  if (!user) redirect("/admin/login");
  if (!canViewReports(user.role)) redirect("/admin");
  return user;
}
