import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { footerNav, siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="grid gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-12">
        <div>
          <Logo variant="dark" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-ivory/70">
            {siteConfig.description}
          </p>
          <p className="mt-6 text-sm text-ivory/55">
            {siteConfig.address.line1}, {siteConfig.address.line2}
            <br />
            {siteConfig.address.city}, {siteConfig.address.country}
          </p>
          <a href={siteConfig.url} className="mt-4 inline-block text-sm text-sand">
            {siteConfig.url}
          </a>
          <Socials />
        </div>
        <FooterCol title="Explore" items={footerNav.explore} />
        <FooterCol title="Company" items={footerNav.company} />
        <FooterCol title="Legal" items={footerNav.legal} />
      </div>
      <div className="flex flex-col gap-3 border-t border-ivory/10 px-6 py-6 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between md:px-12">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <p>{siteConfig.demoNotice}</p>
      </div>
    </footer>
  );
}

function Socials() {
  const entries = Object.entries(siteConfig.social).filter(([, url]) => Boolean(url));
  if (!entries.length) {
    return (
      <p className="mt-6 text-xs text-ivory/40">
        Social channels will appear here when official accounts are published.
      </p>
    );
  }
  return (
    <ul className="mt-6 flex flex-wrap gap-4 text-sm text-ivory/70">
      {entries.map(([name, url]) => (
        <li key={name}>
          <a href={url} rel="noreferrer" target="_blank" className="capitalize hover:text-ivory">
            {name === "x" ? "X" : name}
          </a>
        </li>
      ))}
    </ul>
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
