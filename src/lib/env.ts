import path from "node:path";

const DEFAULT_SECRET = "matribhumi-hostinger-session-secret-32ch";

if (!process.env.DATABASE_URL) {
  const dbFile = path.join(process.cwd(), "prisma", "dev.db").replaceAll("\\", "/");
  process.env.DATABASE_URL = `file:${dbFile}`;
}

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  process.env.SESSION_SECRET = DEFAULT_SECRET;
}

if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = process.env.SESSION_SECRET;
}

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  process.env.NEXT_PUBLIC_SITE_URL = "https://matribhumi.me";
}
