import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

const url = process.env.DATABASE_URL;
if (url.startsWith("file:")) {
  const raw = url.slice("file:".length);
  const schemaDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "prisma");
  const dbPath = path.isAbsolute(raw) ? raw : path.resolve(schemaDir, raw);
  mkdirSync(path.dirname(dbPath), { recursive: true });
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
    shell: true,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npx", ["prisma", "db", "push"]);

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();
const count = await prisma.property.count().catch(() => 0);
await prisma.$disconnect();

if (count === 0) {
  console.log("No properties found — seeding demonstration data.");
  run("npx", ["tsx", "prisma/seed.ts"]);
} else {
  console.log(`Database already has ${count} properties — skipping seed.`);
}
