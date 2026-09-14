import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A1916",
          color: "#F7F3EB",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", color: "#D8C9B0" }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontFamily: "Georgia" }}>
            {siteConfig.tagline}
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#D8C9B0", maxWidth: 800 }}>
            {siteConfig.description}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#A4895A" }}>{siteConfig.domain}</div>
      </div>
    ),
    { ...size },
  );
}
