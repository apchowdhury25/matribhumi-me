"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Script from "next/script";
import { analyticsId, track } from "@/lib/analytics";

function PageViews() {
  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => {
    track("page_view", { path: pathname + (search.toString() ? `?${search}` : "") });
  }, [pathname, search]);
  return null;
}

export function Analytics() {
  const id = analyticsId();
  return (
    <>
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
      {id ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
          <Script id="matribhumi-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
