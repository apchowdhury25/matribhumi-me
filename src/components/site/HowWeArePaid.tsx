import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function HowWeArePaid({ tone = "light" }: { tone?: "light" | "mist" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "px-4 py-16 sm:px-6 md:px-12 md:py-24",
        tone === "mist" && "bg-mist",
        dark && "bg-charcoal text-ivory",
      )}
    >
      <p className={cn("text-[11px] uppercase tracking-[0.28em]", dark ? "text-sand" : "text-earth")}>
        Buyer-fee transparency
      </p>
      <h2 className="font-display mt-3 text-[1.85rem] leading-[1.15] sm:text-4xl md:text-5xl">
        How MatriBhumi is paid
      </h2>
      <p className={cn("mt-6 max-w-3xl text-lg leading-8", dark ? "text-ivory/80" : "text-muted")}>
        {siteConfig.buyerFee}
      </p>
      <p className={cn("mt-4 max-w-3xl text-sm leading-7", dark ? "text-ivory/65" : "text-muted")}>
        {siteConfig.buyerFeeNote}
      </p>
    </section>
  );
}
