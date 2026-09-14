import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EB",
    theme_color: "#1A1916",
    icons: [{ src: "/brand/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
