"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import type { LeadStatus } from "@prisma/client";

async function guard() {
  const user = await requireUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function updateLeadStatus(formData: FormData) {
  await guard();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as LeadStatus;
  const notes = String(formData.get("notes") ?? "");
  await prisma.lead.update({ where: { id }, data: { status, notes } });
  revalidatePath("/admin/leads");
}

export async function deleteProperty(formData: FormData) {
  await guard();
  await prisma.property.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/properties");
  redirect("/admin/properties");
}

export async function upsertProperty(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    description: String(formData.get("description")),
    type: String(formData.get("type")) as never,
    status: String(formData.get("status")) as never,
    startingPrice: String(formData.get("startingPrice") || "0"),
    bedroomsMin: Number(formData.get("bedroomsMin") || 1),
    bedroomsMax: Number(formData.get("bedroomsMax") || 1),
    bathroomsMin: Number(formData.get("bathroomsMin") || 1),
    bathroomsMax: Number(formData.get("bathroomsMax") || 1),
    areaMin: Number(formData.get("areaMin") || 0),
    areaMax: Number(formData.get("areaMax") || 0),
    heroImage: String(formData.get("heroImage") || "/media/hero-urban.jpg"),
    latitude: Number(formData.get("latitude") || 0),
    longitude: Number(formData.get("longitude") || 0),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    developmentId: String(formData.get("developmentId")),
    locationId: String(formData.get("locationId")),
    developerId: String(formData.get("developerId")),
  };
  if (id) await prisma.property.update({ where: { id }, data });
  else await prisma.property.create({ data });
  revalidatePath("/admin/properties");
  redirect("/admin/properties");
}

export async function upsertDevelopment(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    tagline: String(formData.get("tagline") || ""),
    description: String(formData.get("description") || ""),
    architecture: String(formData.get("architecture") || ""),
    lifestyle: String(formData.get("lifestyle") || ""),
    locationNote: String(formData.get("locationNote") || ""),
    heroImage: String(formData.get("heroImage") || "/media/hero-plaza.jpg"),
    category: String(formData.get("category") || "RESIDENTIAL") as never,
    propertyType: String(formData.get("propertyType") || "APARTMENT") as never,
    status: String(formData.get("status") || "LAUNCHED") as never,
    completion: String(formData.get("completion") || ""),
    startingPrice: String(formData.get("startingPrice") || "0"),
    stats: {},
    latitude: Number(formData.get("latitude") || 0),
    longitude: Number(formData.get("longitude") || 0),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    signature: formData.get("signature") === "on",
    locationId: String(formData.get("locationId")),
    developerId: String(formData.get("developerId")),
  };
  if (id) await prisma.development.update({ where: { id }, data });
  else await prisma.development.create({ data });
  revalidatePath("/admin/developments");
  redirect("/admin/developments");
}

export async function upsertLocation(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    city: String(formData.get("city") || name),
    country: String(formData.get("country") || ""),
    description: String(formData.get("description") || ""),
    overview: String(formData.get("overview") || ""),
    lifestyle: String(formData.get("lifestyle") || ""),
    connectivity: String(formData.get("connectivity") || ""),
    opportunities: String(formData.get("opportunities") || ""),
    heroImage: String(formData.get("heroImage") || "/media/location-aerial.jpg"),
    latitude: Number(formData.get("latitude") || 0),
    longitude: Number(formData.get("longitude") || 0),
  };
  if (id) await prisma.location.update({ where: { id }, data });
  else await prisma.location.create({ data });
  revalidatePath("/admin/locations");
  redirect("/admin/locations");
}

export async function upsertUnit(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const data = {
    name: String(formData.get("name")),
    type: String(formData.get("type") || ""),
    bedrooms: Number(formData.get("bedrooms") || 1),
    bathrooms: Number(formData.get("bathrooms") || 1),
    area: Number(formData.get("area") || 0),
    price: String(formData.get("price") || "0"),
    status: String(formData.get("status") || "AVAILABLE") as never,
    propertyId: String(formData.get("propertyId")),
  };
  if (id) await prisma.unit.update({ where: { id }, data });
  else await prisma.unit.create({ data });
  revalidatePath("/admin/units");
  redirect("/admin/units");
}

export async function upsertAmenity(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name"));
  const data = {
    name,
    slug: String(formData.get("slug") || slugify(name)),
    icon: String(formData.get("icon") || slugify(name)),
    category: String(formData.get("category") || "general"),
  };
  if (id) await prisma.amenity.update({ where: { id }, data });
  else await prisma.amenity.create({ data });
  revalidatePath("/admin/amenities");
  redirect("/admin/amenities");
}

export async function upsertArticle(formData: FormData) {
  const user = await guard();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title"));
  const data = {
    title,
    slug: String(formData.get("slug") || slugify(title)),
    excerpt: String(formData.get("excerpt") || ""),
    body: String(formData.get("body") || ""),
    coverImage: String(formData.get("coverImage") || "/media/about-studio.jpg"),
    category: String(formData.get("category") || "NEWS") as never,
    readingTime: Number(formData.get("readingTime") || 4),
    published: formData.get("published") === "on",
    authorId: user.id,
  };
  if (id) await prisma.newsArticle.update({ where: { id }, data });
  else await prisma.newsArticle.create({ data });
  revalidatePath("/admin/insights");
  redirect("/admin/insights");
}

export async function upsertJob(formData: FormData) {
  await guard();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title"));
  const data = {
    title,
    slug: String(formData.get("slug") || slugify(title)),
    department: String(formData.get("department") || ""),
    location: String(formData.get("location") || ""),
    type: String(formData.get("type") || "Full-time"),
    description: String(formData.get("description") || ""),
    requirements: String(formData.get("requirements") || ""),
    published: formData.get("published") === "on",
  };
  if (id) await prisma.job.update({ where: { id }, data });
  else await prisma.job.create({ data });
  revalidatePath("/admin/careers");
  redirect("/admin/careers");
}

export async function createMediaAsset(formData: FormData) {
  await guard();
  await prisma.mediaAsset.create({
    data: {
      url: String(formData.get("url")),
      key: String(formData.get("key")),
      filename: String(formData.get("filename")),
      mimeType: String(formData.get("mimeType")),
      size: Number(formData.get("size") || 0),
      alt: String(formData.get("alt") || ""),
    },
  });
  revalidatePath("/admin/media");
}
