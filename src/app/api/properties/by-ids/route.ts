import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const ids = (request.nextUrl.searchParams.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 12);
  if (!ids.length) return NextResponse.json({ items: [] });
  const items = await prisma.property.findMany({
    where: { id: { in: ids }, published: true },
    include: { location: true, development: true },
  });
  items.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  return NextResponse.json({ items });
}
