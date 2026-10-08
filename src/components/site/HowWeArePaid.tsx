import Link from "next/link";
import { compensationTransparency } from "@/config/legal";
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
        Compensation transparency
      </p>
      <h2 className="font-display mt-3 text-[1.85rem] leading-[1.15] sm:text-4xl md:text-5xl">
        {compensationTransparency.title}
      </h2>
      <p className={cn("mt-6 max-w-3xl text-lg leading-8", dark ? "text-ivory/80" : "text-muted")}>
        {compensationTransparency.disclosure}
      </p>
      <ul className={cn("mt-8 grid gap-3 md:grid-cols-2", dark ? "text-ivory/75" : "text-muted")}>
        {compensationTransparency.points.map((point) => (
          <li key={point} className={cn("border px-4 py-3 text-sm leading-6", dark ? "border-ivory/15" : "border-charcoal/10 bg-ivory")}>
            {point}
          </li>
        ))}
      </ul>
      <p className={cn("mt-6 max-w-3xl text-sm leading-7", dark ? "text-ivory/65" : "text-muted")}>
        {compensationTransparency.note}{" "}
        <Link href="/disclaimer/buyer-fee" className={cn("underline-offset-4 hover:underline", dark ? "text-sand" : "text-earth")}>
          Buyer-fee disclosure
        </Link>
      </p>
    </section>
  );
}
