import Link from "next/link";
import { propertyDisclaimer } from "@/config/legal";
import { cn } from "@/lib/utils";

export function PropertyDisclaimerNotice({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm leading-7 text-muted", className)}>
      {propertyDisclaimer.body}{" "}
      <Link href="/disclaimer/property" className="text-earth underline-offset-4 hover:underline">
        Property disclaimer
      </Link>
    </p>
  );
}
