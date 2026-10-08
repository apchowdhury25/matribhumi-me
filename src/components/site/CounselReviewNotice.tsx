import { counselReview } from "@/config/legal";
import { cn } from "@/lib/utils";

export function CounselReviewNotice({ className }: { className?: string }) {
  return (
    <aside
      className={cn("border border-charcoal/15 bg-mist px-5 py-4 text-sm leading-7 text-muted", className)}
      role="note"
    >
      <p className="text-[11px] uppercase tracking-[0.2em] text-earth">Not legal advice</p>
      <p className="mt-2">{counselReview.notice}</p>
    </aside>
  );
}
