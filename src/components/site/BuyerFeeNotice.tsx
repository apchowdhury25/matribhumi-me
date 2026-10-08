import { buyerFeeDisclosure } from "@/config/businessModel";
import { cn } from "@/lib/utils";

export function BuyerFeeNotice({
  className,
  tone = "muted",
}: {
  className?: string;
  tone?: "muted" | "sand" | "ivory";
}) {
  return (
    <p
      className={cn(
        "text-sm leading-7",
        tone === "muted" && "text-muted",
        tone === "sand" && "text-sand",
        tone === "ivory" && "text-ivory/75",
        className,
      )}
    >
      {buyerFeeDisclosure}
    </p>
  );
}
