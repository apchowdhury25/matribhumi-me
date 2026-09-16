import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, ".next", "standalone");

if (!existsSync(dest)) {
  console.log("No .next/standalone folder — skipping Hostinger copy.");
  process.exit(0);
}

function copy(from, to) {
  if (!existsSync(from)) return;
  mkdirSync(path.dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log("copied", path.relative(root, from), "->", path.relative(root, to));
}

copy(path.join(root, "public"), path.join(dest, "public"));
copy(path.join(root, "prisma"), path.join(dest, "prisma"));
copy(path.join(root, ".env"), path.join(dest, ".env"));
copy(path.join(root, "package.json"), path.join(dest, "package.json"));
