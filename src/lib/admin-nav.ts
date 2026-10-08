import { canAccessContent, canAccessSales, canViewReports } from "@/lib/auth-roles";
import type { UserRole } from "@prisma/client";

export const contentPrefixes = [
  "/admin/properties",
  "/admin/developments",
  "/admin/locations",
  "/admin/units",
  "/admin/amenities",
  "/admin/insights",
  "/admin/careers",
  "/admin/applications",
  "/admin/media",
];

export const salesPrefixes = [
  "/admin/leads",
  "/admin/deals",
  "/admin/viewings",
  "/admin/pipeline",
  "/admin/follow-ups",
];

export function navForRole(role: UserRole) {
  const content = [
    { href: "/admin/properties", label: "Properties" },
    { href: "/admin/developments", label: "Developments" },
    { href: "/admin/locations", label: "Locations" },
    { href: "/admin/units", label: "Units" },
    { href: "/admin/amenities", label: "Amenities" },
    { href: "/admin/insights", label: "News" },
    { href: "/admin/careers", label: "Careers" },
    { href: "/admin/applications", label: "Applications" },
    { href: "/admin/media", label: "Media" },
  ];
  const sales = [
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/pipeline", label: "Pipeline" },
    { href: "/admin/deals", label: "Deals" },
    { href: "/admin/viewings", label: "Viewings" },
    { href: "/admin/follow-ups", label: "Follow-ups" },
    { href: "/admin/reports", label: "Reports" },
  ];
  const shared = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/developers", label: "Developers" },
  ];
  const links = [...shared];
  if (canAccessSales(role)) links.push(...sales);
  if (canAccessContent(role)) links.push(...content);
  return links;
}

export function isContentPath(path: string) {
  return contentPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function isSalesPath(path: string) {
  return salesPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function isReportsPath(path: string) {
  return path === "/admin/reports" || path.startsWith("/admin/reports/");
}

export function canVisitConsolePath(path: string, role: UserRole) {
  if (isContentPath(path) && !canAccessContent(role)) return false;
  if (isSalesPath(path) && !canAccessSales(role)) return false;
  if (isReportsPath(path) && !canViewReports(role)) return false;
  return true;
}
