import { professionalAdvice } from "@/config/legal";
import { cn } from "@/lib/utils";

export function ProfessionalAdviceNotice({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm leading-7 text-muted", className)}>
      {professionalAdvice.body}
    </p>
  );
}
