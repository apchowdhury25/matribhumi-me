"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { navItems, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inverted = transparent && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        inverted ? "bg-transparent text-ivory" : "bg-ivory/92 text-charcoal shadow-[0_1px_0_rgb(26_25_22/0.08)] backdrop-blur-md",
      )}
    >
      <div className="flex items-center justify-between gap-6 px-5 py-4 md:px-10">
        <Link href="/" aria-label={siteConfig.name} className="shrink-0">
          <Logo variant={inverted ? "dark" : "light"} />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.2em] opacity-80 transition hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SearchOverlay />
          <Link
            href="/properties"
            className={cn(
              "hidden h-10 items-center px-5 text-[11px] uppercase tracking-[0.2em] md:inline-flex",
              inverted ? "bg-ivory text-charcoal" : "bg-charcoal text-ivory",
            )}
          >
            Explore Properties
          </Link>
          <Link
            href="/contact"
            className="hidden text-[11px] uppercase tracking-[0.2em] opacity-80 lg:inline"
          >
            Contact
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-charcoal/10 bg-ivory px-6 py-8 text-charcoal lg:hidden">
          <nav className="grid gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/properties" onClick={() => setOpen(false)} className="mt-4 bg-charcoal px-5 py-3 text-center text-[11px] uppercase tracking-[0.22em] text-ivory">
              Explore Properties
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
