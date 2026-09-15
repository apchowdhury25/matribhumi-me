import { createHmac, createHash } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

export type StoredObject = { url: string; key: string; size: number; mimeType: string };

export interface ObjectStorage {
  put(bytes: Buffer, filename: string, mimeType: string): Promise<StoredObject>;
  delete(key: string): Promise<void>;
}

function safeName(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80);
}

class LocalStorage implements ObjectStorage {
  private dir = process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");

  async put(bytes: Buffer, filename: string, mimeType: string): Promise<StoredObject> {
    await mkdir(this.dir, { recursive: true });
    const key = `${new Date().toISOString().slice(0, 10)}/${nanoid(8)}-${safeName(filename)}`;
    const full = path.join(this.dir, key);
    await mkdir(path.dirname(full), { recursive: true });
    await writeFile(full, bytes);
    return { url: `/uploads/${key}`, key, size: bytes.length, mimeType };
  }

  async delete(key: string) {
    await unlink(path.join(this.dir, key)).catch(() => undefined);
  }
}

function hmac(key: Buffer | string, data: string) {
  return createHmac("sha256", key).update(data).digest();
}

function sha256Hex(data: Buffer) {
  return createHash("sha256").update(data).digest("hex");
}

class S3Storage implements ObjectStorage {
  constructor(
    private endpoint: string,
    private bucket: string,
    private region: string,
    private accessKey: string,
    private secretKey: string,
    private publicBase?: string,
  ) {}

  async put(bytes: Buffer, filename: string, mimeType: string): Promise<StoredObject> {
    const key = `${new Date().toISOString().slice(0, 10)}/${nanoid(8)}-${safeName(filename)}`;
    const url = new URL(`/${this.bucket}/${key}`, this.endpoint);
    const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
    const dateStamp = amzDate.slice(0, 8);
    const payloadHash = sha256Hex(bytes);
    const canonicalHeaders = `host:${url.host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
    const canonicalRequest = [
      "PUT",
      url.pathname,
      "",
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join("\n");
    const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;
    const stringToSign = [
      "AWS4-HMAC-SHA256",
      amzDate,
      credentialScope,
      createHash("sha256").update(canonicalRequest).digest("hex"),
    ].join("\n");
    const kDate = hmac(`AWS4${this.secretKey}`, dateStamp);
    const kRegion = hmac(kDate, this.region);
    const kService = hmac(kRegion, "s3");
    const kSigning = hmac(kService, "aws4_request");
    const signature = createHmac("sha256", kSigning).update(stringToSign).digest("hex");
    const authorization = `AWS4-HMAC-SHA256 Credential=${this.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: authorization,
        "Content-Type": mimeType,
        "x-amz-content-sha256": payloadHash,
        "x-amz-date": amzDate,
      },
      body: new Uint8Array(bytes),
    });
    if (!res.ok) {
      throw new Error(`S3 upload failed (${res.status})`);
    }
    const publicUrl = this.publicBase
      ? `${this.publicBase.replace(/\/$/, "")}/${key}`
      : url.toString();
    return { url: publicUrl, key, size: bytes.length, mimeType };
  }

  async delete(key: string) {
    const url = new URL(`/${this.bucket}/${key}`, this.endpoint);
    await fetch(url, { method: "DELETE" });
  }
}

export function getStorage(): ObjectStorage {
  const bucket = process.env.S3_BUCKET;
  const endpoint = process.env.S3_ENDPOINT;
  const accessKey = process.env.S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY;
  const secretKey = process.env.S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY;
  if (bucket && endpoint && accessKey && secretKey) {
    return new S3Storage(
      endpoint,
      bucket,
      process.env.S3_REGION ?? "auto",
      accessKey,
      secretKey,
      process.env.S3_PUBLIC_URL,
    );
  }
  return new LocalStorage();
}

export const ALLOWED_UPLOADS = {
  image: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  document: ["application/pdf"],
  resume: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

export function assertMime(mime: string, allowed: string[]) {
  if (!allowed.includes(mime)) {
    throw new Error("This file type is not allowed.");
  }
}
