const currencyMap: Record<string, string> = {
  USD: "en-US",
  BDT: "en-BD",
  AED: "en-AE",
  SGD: "en-SG",
  GBP: "en-GB",
  CAD: "en-CA",
};

export function formatPrice(
  value: number | string | { toString(): string },
  currency = "USD",
  options?: { compact?: boolean },
) {
  const amount = typeof value === "number" ? value : Number(value.toString());
  if (!Number.isFinite(amount)) return "Price on request";
  if (options?.compact && amount >= 1_000_000) {
    return `${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 1,
    }).format(amount / 1_000_000)}M`.replace(/\.0M/, "M");
  }
  return new Intl.NumberFormat(currencyMap[currency] ?? "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatArea(value: number, unit = "sqft") {
  return `${new Intl.NumberFormat("en-US").format(value)} ${unit}`;
}

export function formatBedrooms(min: number, max: number) {
  if (min === max) return min === 0 ? "Studio" : `${min} bed`;
  return `${min}–${max} bed`;
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(d);
}

export function statusLabel(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function typeLabel(type: string) {
  return statusLabel(type);
}
