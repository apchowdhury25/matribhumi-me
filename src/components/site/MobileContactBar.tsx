import { siteConfig } from "@/config/site";
import { buyerCtas } from "@/config/ctas";
import Link from "next/link";

export function MobileContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-ivory/96 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 bg-moss px-3 text-[10px] uppercase tracking-[0.16em] text-ivory"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
        <Link
          href="/advise"
          className="inline-flex h-11 items-center justify-center bg-charcoal px-3 text-[10px] uppercase tracking-[0.16em] text-ivory"
        >
          {buyerCtas.talkToAdvisor}
        </Link>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-3.5 w-3.5" fill="currentColor">
      <path d="M12.1 3.2A8.7 8.7 0 0 0 4.6 16.3L3.5 20.5l4.3-1.1A8.7 8.7 0 1 0 12.1 3.2Zm5 12.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.8 2 .8 2.1.1.2 0 .3-.1.5l-.4.5c-.1.2-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1.9 2 .1 2.2 0 .2-.2.4-.2.6-.1l1.4.7c.2.1.4.2.4.3.1.3 0 .8-.2 1.2Z" />
    </svg>
  );
}
