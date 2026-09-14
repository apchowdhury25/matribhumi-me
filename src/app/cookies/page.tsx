import { PublicShell } from "@/components/site/PublicShell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cookies",
  description: "Cookie notice for matribhumi.me",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <PublicShell>
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <h1 className="font-display text-[2.1rem] sm:text-5xl">Cookies</h1>
        <p className="mt-6 leading-8 text-muted">
          Essential cookies operate the staff session and remember cookie choices. Analytics cookies are optional and are not set unless you accept them and an analytics identifier is present in the environment.
        </p>
        <p className="mt-4 leading-8 text-muted">
          Saved homes and comparison lists use local storage on your device, not a third-party cookie.
        </p>
      </article>
    </PublicShell>
  );
}
