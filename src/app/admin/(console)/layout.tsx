import Link from "next/link";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { Logo } from "@/components/brand/Logo";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/developments", label: "Developments" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/units", label: "Units" },
  { href: "/admin/amenities", label: "Amenities" },
  { href: "/admin/insights", label: "News" },
  { href: "/admin/careers", label: "Careers" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/viewings", label: "Viewings" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/media", label: "Media" },
];

export default async function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="hidden w-64 shrink-0 flex-col bg-charcoal text-ivory md:flex">
        <div className="px-6 py-6">
          <Logo variant="dark" />
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-sand">Studio console</p>
        </div>
        <nav className="flex-1 px-3" aria-label="Admin">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm text-ivory/80 hover:bg-ivory/10 hover:text-ivory">
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="p-6">
          <button className="text-[11px] uppercase tracking-[0.18em] text-sand">Sign out</button>
        </form>
      </aside>
      <div className="flex-1">
        <nav className="no-scrollbar flex gap-3 overflow-x-auto border-b border-charcoal/10 px-4 py-3 md:hidden" aria-label="Admin mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-[11px] uppercase tracking-[0.16em]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="min-w-0 overflow-x-auto p-4 sm:p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
