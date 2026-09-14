import { NextRequest, NextResponse } from "next/server";
import { ALLOWED_UPLOADS, assertMime, getStorage } from "@/lib/storage";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";

const MAX = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  if (!rateLimit(`upload:${ip}`, 10, 60_000).ok) {
    return NextResponse.json({ error: "Too many uploads." }, { status: 429 });
  }
  const form = await request.formData();
  const file = form.get("file");
  const kind = String(form.get("kind") || "image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }
  if (file.size > MAX) {
    return NextResponse.json({ error: "File too large." }, { status: 400 });
  }
  const allowed =
    kind === "resume" ? ALLOWED_UPLOADS.resume : kind === "document" ? ALLOWED_UPLOADS.document : ALLOWED_UPLOADS.image.concat(ALLOWED_UPLOADS.document);
  try {
    assertMime(file.type, allowed);
  } catch {
    return NextResponse.json({ error: "This file type is not allowed." }, { status: 400 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const stored = await getStorage().put(bytes, file.name, file.type);
  return NextResponse.json(stored);
}
