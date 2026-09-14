"use client";

import { useState } from "react";
import { createMediaAsset } from "@/app/actions/admin";

export function MediaUpload() {
  const [status, setStatus] = useState("");

  async function onChange(file: File | undefined) {
    if (!file) return;
    setStatus("Uploading…");
    const body = new FormData();
    body.append("file", file);
    body.append("kind", "image");
    const res = await fetch("/api/upload", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) {
      setStatus(data.error || "Upload failed");
      return;
    }
    const save = new FormData();
    save.set("url", data.url);
    save.set("key", data.key);
    save.set("filename", file.name);
    save.set("mimeType", file.type);
    save.set("size", String(file.size));
    save.set("alt", file.name);
    await createMediaAsset(save);
    setStatus("Saved.");
  }

  return (
    <div>
      <input type="file" accept="image/*,application/pdf" onChange={(e) => onChange(e.target.files?.[0])} />
      {status ? <p className="mt-2 text-sm text-muted">{status}</p> : null}
    </div>
  );
}
