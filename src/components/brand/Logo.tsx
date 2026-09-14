import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type LogoProps = {
  variant?: "light" | "dark" | "mark";
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "light", className }: LogoProps) {
  const src =
    variant === "mark" ? "/brand/logo-mark.svg" : `/brand/logo-${variant}.svg`;
  const isMark = variant === "mark";
  return (
    <img
      src={src}
      alt={siteConfig.name}
      width={isMark ? 36 : 176}
      height={isMark ? 36 : 24}
      className={cn(
        "h-7 w-auto select-none",
        isMark ? "h-8 w-8" : "h-7 md:h-8",
        className,
      )}
    />
  );
}
