import { PublicShell } from "@/components/site/PublicShell";
import { PageHero } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Write from wherever you live. MatriBhumi speaks with expats, returning retirees, and Dhaka families about homes from participating developers — including in Bashundhara.",
  path: "/contact",
  image: "/media/about-lobby.jpg",
});

export default function ContactPage() {
  return (
    <PublicShell transparentHeader>
      <PageHero
        image="/media/about-lobby.jpg"
        eyebrow="Contact"
        title="Write to us from wherever you live."
        description="A winter month, a retirement in Dhaka, or a home in Bashundhara: tell us how you would use it. There is no fee to the buyer for this conversation."
      />
      <section className="grid gap-16 px-4 py-14 sm:px-6 md:px-12 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-earth">Office</p>
          <p className="mt-4 leading-7">
            {siteConfig.address.line1}<br />
            {siteConfig.address.line2}<br />
            {siteConfig.address.city}, {siteConfig.address.country} {siteConfig.address.postal}
          </p>
          <p className="mt-6 text-sm text-muted">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-charcoal">{siteConfig.email}</a>
            <br />
            <a href={siteConfig.phoneHref} className="hover:text-charcoal">{siteConfig.phone}</a>
            <br />
            <a href={siteConfig.social.whatsapp} className="hover:text-charcoal" target="_blank" rel="noreferrer">WhatsApp</a>
          </p>
          <ul className="mt-8 space-y-2 text-sm text-muted">
            <li>General — {siteConfig.email}</li>
            <li>Sales — {siteConfig.salesEmail}</li>
            <li>Press — {siteConfig.pressEmail}</li>
            <li>Careers — {siteConfig.careersEmail}</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-4xl">Write to us</h2>
          <p className="mt-3 text-sm text-muted">
            Mention where you live now, and whether you are thinking of vacation weeks, retirement in Dhaka, or a home in Bashundhara. We introduce qualified buyers to the relevant developer. Inquiry forms also live on each property.
          </p>
          <div className="mt-8">
            <InquiryForm inquiryType="GENERAL" showTypeSelect />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
