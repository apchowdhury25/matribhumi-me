import { NextRequest, NextResponse } from "next/server";
import { publicVisibilityWhere } from "@/lib/demo-inventory";
import { prisma } from "@/lib/prisma";
import { publicDeveloperSelect, stripConfidential } from "@/lib/public-fields";

export async function GET(request: NextRequest) {
  const ids = (request.nextUrl.searchParams.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 12);
  if (!ids.length) return NextResponse.json({ items: [] });
  const items = await prisma.property.findMany({
    where: { id: { in: ids }, ...publicVisibilityWhere(), location: { country: "Bangladesh" } },
    include: { location: true, development: true, developer: { select: publicDeveloperSelect } },
  });
  items.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  return NextResponse.json({ items: stripConfidential(items) });
}
