import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { BrochureButton } from "@/components/site/LeadCapture";
import { LegalCompliance } from "@/components/site/LegalCompliance";
import { footerNav, siteConfig } from "@/config/site";

const addressLine = `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.country}`;
const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(addressLine)}`;

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="border-b border-ivory/10 px-4 py-14 sm:px-6 md:px-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-sand">Independent advisory</p>
            <h2 className="font-display mt-4 max-w-xl text-4xl leading-tight md:text-5xl">
              Find the right property. We coordinate the rest.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-ivory/70">{siteConfig.supporting}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <BrochureButton className="w-full sm:w-auto" />
          </div>
        </div>
        <div className="mt-12">
          <LegalCompliance tone="dark" />
        </div>
      </div>
      <div className="grid gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12 md:px-12 md:py-16">
        <div>
          <Logo variant="dark" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-ivory/70">{siteConfig.positioning}</p>
          <address className="mt-6 text-sm not-italic leading-7 text-ivory/80">
            <a href={mapsHref} target="_blank" rel="noreferrer" className="hover:text-ivory">
              {siteConfig.address.line1}, {siteConfig.address.line2}
              <br />
              {siteConfig.address.city}, {siteConfig.address.country}
            </a>
            <br />
            <a href={siteConfig.phoneHref} className="mt-2 inline-block text-sand hover:text-ivory">
              {siteConfig.phone}
            </a>
            <br />
            <a href={`mailto:${siteConfig.email}`} className="mt-1 inline-block hover:text-ivory">
              {siteConfig.email}
            </a>
          </address>
          <a href={siteConfig.url} className="mt-4 inline-block text-sm text-sand">
            www.matribhumi.me
          </a>
          <Socials />
        </div>
        <FooterCol title="Explore" items={footerNav.explore} />
        <FooterCol title="Company" items={footerNav.company} />
        <FooterCol title="Legal" items={footerNav.legal} />
      </div>
      <div className="border-t border-ivory/10 px-4 py-6 text-xs leading-5 text-ivory/50 sm:px-6 md:px-12">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Socials() {
  const channels = [
    { name: "Instagram", href: siteConfig.social.instagram, icon: <InstagramIcon /> },
    { name: "LinkedIn", href: siteConfig.social.linkedin, icon: <LinkedInIcon /> },
    { name: "WhatsApp", href: siteConfig.social.whatsapp, icon: <WhatsAppIcon /> },
  ];
  return (
    <ul className="mt-6 flex gap-3">
      {channels.map((channel) => (
        <li key={channel.name}>
          <a
            href={channel.href}
            target="_blank"
            rel="noreferrer"
            aria-label={channel.name}
            className="grid h-11 w-11 place-items-center border border-ivory/20 text-ivory/80 transition hover:border-ivory hover:text-ivory"
          >
            {channel.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M6.5 9.5H4V20h2.5V9.5ZM5.2 4A1.5 1.5 0 1 0 5.2 7a1.5 1.5 0 0 0 0-3ZM20 20h-2.5v-5.6c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.7-.1 1.1V20H11V9.5h2.4v1.4c.4-.7 1.4-1.7 3.4-1.7 2.5 0 4.2 1.6 4.2 5.1V20Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M12.1 3.2A8.7 8.7 0 0 0 4.6 16.3L3.5 20.5l4.3-1.1A8.7 8.7 0 1 0 12.1 3.2Zm5 12.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.8 2 .8 2.1.1.2 0 .3-.1.5l-.4.5c-.1.2-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1.9 2 .1 2.2 0 .2-.2.4-.2.6-.1l1.4.7c.2.1.4.2.4.3.1.3 0 .8-.2 1.2Z" />
    </svg>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.24em] text-sand">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-ivory/75">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:text-ivory">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
