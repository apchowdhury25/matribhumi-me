import Link from "next/link";
import { buyerFeeHeadline } from "@/config/businessModel";
import { compensationTransparency } from "@/config/legal";
import { cn } from "@/lib/utils";

export function BuyerFeeHighlight({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "border-y border-charcoal/10 bg-paper px-4 py-20 sm:px-6 md:px-12 md:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-earth">Buyer-fee policy</p>
        <div className="section-rule mx-auto mt-5" />
        <h2 className="font-display mt-8 text-[2rem] leading-[1.15] text-charcoal sm:text-5xl md:text-6xl">
          {buyerFeeHeadline}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          {compensationTransparency.disclosure}
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">
          {compensationTransparency.points.slice(1).join(" ")}{" "}
          <Link href="/disclaimer/buyer-fee" className="text-earth underline-offset-4 hover:underline">
            Full disclosure
          </Link>
        </p>
      </div>
    </section>
  );
}
