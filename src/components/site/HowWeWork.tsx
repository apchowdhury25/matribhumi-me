import { howWeWork, positioning } from "@/config/legal";
import { cn } from "@/lib/utils";

export function HowWeWork({ tone = "light" }: { tone?: "light" | "mist" | "dark" }) {
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
        {howWeWork.title}
      </p>
      <h2 className="font-display mt-3 text-[1.85rem] leading-[1.15] sm:text-4xl md:text-5xl">
        Property advisory and transaction coordination.
      </h2>
      <p className={cn("mt-6 max-w-3xl text-lg leading-8", dark ? "text-ivory/80" : "text-muted")}>
        {howWeWork.summary}
      </p>
      <p className={cn("mt-4 max-w-3xl text-sm leading-7", dark ? "text-ivory/70" : "text-muted")}>
        {howWeWork.purchaseAgreement} {positioning.sellerResponsibility}
      </p>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {positioning.buyerHelp.map((item) => (
          <li
            key={item}
            className={cn(
              "border px-4 py-3 text-sm capitalize",
              dark ? "border-ivory/15 text-ivory/85" : "border-charcoal/10 bg-ivory",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
