import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { upsertProperty } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function PropertyFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const property = isNew ? null : await prisma.property.findUnique({ where: { id } });
  if (!isNew && !property) notFound();
  const [developments, locations, developers] = await Promise.all([
    prisma.development.findMany(),
    prisma.location.findMany(),
    prisma.developer.findMany(),
  ]);

  return (
    <form action={upsertProperty} className="grid max-w-3xl gap-4">
      <h1 className="font-display text-4xl">{isNew ? "New property" : "Edit property"}</h1>
      {property ? <input type="hidden" name="id" value={property.id} /> : null}
      <Field name="name" label="Name" defaultValue={property?.name} />
      <Field name="slug" label="Slug" defaultValue={property?.slug} />
      <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
        Description
        <textarea name="description" defaultValue={property?.description} rows={5} className="border border-charcoal/15 bg-paper p-3 text-sm text-charcoal" />
      </label>
      <select name="type" defaultValue={property?.type ?? "APARTMENT"} className="h-11 border border-charcoal/15 bg-paper px-3">
        {["APARTMENT","VILLA","TOWNHOUSE","PENTHOUSE","COMMERCIAL","HOSPITALITY","MIXED_USE","PLOT"].map((t) => <option key={t}>{t}</option>)}
      </select>
      <select name="status" defaultValue={property?.status ?? "LAUNCHED"} className="h-11 border border-charcoal/15 bg-paper px-3">
        {["UPCOMING","LAUNCHED","UNDER_CONSTRUCTION","READY","SOLD_OUT"].map((t) => <option key={t}>{t}</option>)}
      </select>
      <Field name="startingPrice" label="Starting price" defaultValue={property?.startingPrice?.toString()} />
      <Field name="bedroomsMin" label="Beds min" defaultValue={property?.bedroomsMin} />
      <Field name="bedroomsMax" label="Beds max" defaultValue={property?.bedroomsMax} />
      <Field name="bathroomsMin" label="Baths min" defaultValue={property?.bathroomsMin} />
      <Field name="bathroomsMax" label="Baths max" defaultValue={property?.bathroomsMax} />
      <Field name="areaMin" label="Area min" defaultValue={property?.areaMin} />
      <Field name="areaMax" label="Area max" defaultValue={property?.areaMax} />
      <Field name="heroImage" label="Hero image" defaultValue={property?.heroImage} />
      <Field name="latitude" label="Latitude" defaultValue={property?.latitude} />
      <Field name="longitude" label="Longitude" defaultValue={property?.longitude} />
      <select name="developmentId" defaultValue={property?.developmentId ?? developments[0]?.id} className="h-11 border border-charcoal/15 bg-paper px-3">
        {developments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <select name="locationId" defaultValue={property?.locationId ?? locations[0]?.id} className="h-11 border border-charcoal/15 bg-paper px-3">
        {locations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <select name="developerId" defaultValue={property?.developerId ?? developers[0]?.id} className="h-11 border border-charcoal/15 bg-paper px-3">
        {developers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={property?.published ?? true} /> Published</label>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="featured" defaultChecked={property?.featured ?? false} /> Featured</label>
      <button className="h-11 bg-charcoal text-[11px] uppercase tracking-[0.18em] text-ivory">Save</button>
    </form>
  );
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string | number | null }) {
  return (
    <label className="grid gap-2 text-[11px] uppercase tracking-[0.16em] text-earth">
      {label}
      <input name={name} defaultValue={defaultValue ?? ""} className="h-11 border border-charcoal/15 bg-paper px-3 text-sm text-charcoal" />
    </label>
  );
}
