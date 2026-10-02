import { diasporaFaq } from "@/config/site";
import { SectionHeader } from "@/components/site/SectionHeader";

export function DiasporaFaq() {
  return (
    <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
      <SectionHeader
        eyebrow="For the diaspora"
        title="Designed for the Diaspora: Frequently Asked Questions"
        description="Ownership, wires, and the months the house is quiet — answered before you fly."
      />
      <div className="mt-12 border-t border-charcoal/10">
        {diasporaFaq.map((item) => (
          <details key={item.question} className="group border-b border-charcoal/10 py-6 md:py-8">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
              <span className="font-display text-2xl leading-snug md:text-3xl">{item.question}</span>
              <span
                aria-hidden
                className="mt-1 grid h-8 w-8 shrink-0 place-items-center border border-charcoal/15 text-lg leading-none text-earth transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
