import Link from "next/link";
import { markets } from "@/lib/markets";
import { cn } from "@/lib/utils";

export function CountrySelector({
  tone = "light",
  className,
  label = "Markets",
}: {
  tone?: "light" | "on-dark";
  className?: string;
  label?: string;
}) {
  const dark = tone === "on-dark";
  return (
    <nav
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8", className)}
    >
      {markets.map((market) => (
        <Link
          key={market.slug}
          href={`/locations/${market.slug}`}
          className={cn(
            "border-b pb-1 text-[11px] uppercase tracking-[0.22em] transition",
            dark
              ? "border-ivory/35 text-ivory/90 hover:border-ivory hover:text-ivory"
              : "border-charcoal/20 text-charcoal hover:border-charcoal",
          )}
        >
          {market.shortName}
        </Link>
      ))}
    </nav>
  );
}
