export type AnalyticsEvent =
  | "page_view"
  | "property_view"
  | "search"
  | "filter"
  | "brochure_download"
  | "inquiry_submit"
  | "viewing_request"
  | "phone_click"
  | "favorite";

export function analyticsId() {
  return process.env.NEXT_PUBLIC_ANALYTICS_ID || process.env.NEXT_PUBLIC_GTM_ID || "";
}

export function track(event: AnalyticsEvent, payload: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...payload });
  if (typeof w.gtag === "function") {
    w.gtag("event", event, payload);
  }
}
