import { PublicShell } from "@/components/site/PublicShell";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Privacy",
  description: "How MatriBhumi handles personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PublicShell>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <h1 className="font-display text-[2.1rem] sm:text-5xl">Privacy</h1>
        <p className="mt-6 leading-8 text-muted">
          Waitlist requests, brochure downloads, inquiries, viewing requests, and job applications submitted on {siteConfig.domain} are stored so a member of the team can respond and, where you asked, send the pre-launch brochure. We do not sell this information.
        </p>
        <h2 className="font-display mt-10 text-3xl">What we collect</h2>
        <p className="mt-3 leading-8 text-muted">Name, email, phone, country, message, and optional files you attach. Server logs may include an IP address used only for rate limiting.</p>
        <h2 className="font-display mt-10 text-3xl">Cookies</h2>
        <p className="mt-3 leading-8 text-muted">Essential cookies keep the admin session. Optional analytics cookies load only after consent and only if an analytics ID is configured.</p>
        <p className="mt-10 text-sm text-muted">{siteConfig.email}</p>
      </article>
    </PublicShell>
  );
}
