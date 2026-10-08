if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}
if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = "matribhumi-hostinger-session-secret-32ch";
}
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  process.env.NEXT_PUBLIC_SITE_URL = "https://matribhumi.me";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.matribhumi.me" }],
        destination: "https://matribhumi.me/:path*",
        permanent: true,
      },
      {
        source: "/locations/uae",
        destination: "/locations",
        permanent: true,
      },
      {
        source: "/locations/uae/",
        destination: "/locations",
        permanent: true,
      },
      {
        source: "/locations/malaysia",
        destination: "/locations",
        permanent: true,
      },
      {
        source: "/locations/malaysia/",
        destination: "/locations",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
