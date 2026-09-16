const DEFAULT_SQLITE = "file:./dev.db";
const DEFAULT_SECRET = "matribhumi-hostinger-session-secret-32ch";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = DEFAULT_SQLITE;
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
