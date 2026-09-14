import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export function PageHero({
  image,
  eyebrow,
  title,
  description,
  children,
  compact = false,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("relative overflow-hidden", compact ? "min-h-[48dvh]" : "min-h-[70dvh]")}>
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/20" />
      <div className="relative flex min-h-[inherit] items-end px-4 pb-12 pt-28 sm:px-6 md:px-12 md:pb-24 md:pt-32">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="text-[11px] uppercase tracking-[0.3em] text-sand">{eyebrow}</p>
          ) : null}
          <h1 className="font-display mt-4 text-[2.05rem] leading-[1.05] text-ivory sm:text-5xl md:text-7xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-7 text-ivory/80 sm:mt-6 sm:text-lg sm:leading-8">{description}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
      <div className="pointer-events-none absolute right-6 top-28 hidden opacity-40 md:block">
        <Logo variant="mark" className="h-10 w-10 text-ivory" />
      </div>
    </section>
  );
}
