import { supabase } from "@/integrations/supabase/client";

export interface UploadDocumentArgs {
  userId: string;
  slug: string;
  kind: "form" | "pack";
  variant: "watermarked" | "clean";
  status?: "draft" | "completed" | "signed" | "purchased";
  blob: Blob;
  title?: string;
  stateCode?: string | null;
  snapshot?: Record<string, unknown>;
}

async function sha256Hex(blob: Blob): Promise<string | null> {
  try {
    const buf = await blob.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch { return null; }
}

/**
 * Uploads the generated PDF to the private `documents` bucket and inserts a
 * `form_documents` row. Version auto-increments per (user, slug).
 * Silently no-ops when there is no signed-in user.
 */
export async function uploadDocument(args: UploadDocumentArgs): Promise<{ id: string; version: number } | null> {
  if (!args.userId) return null;

  // Next version number.
  const { data: existing } = await supabase
    .from("form_documents")
    .select("version")
    .eq("user_id", args.userId)
    .eq("slug", args.slug)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  const version = (existing?.version ?? 0) + 1;

  const ext = "pdf";
  const path = `${args.userId}/${args.slug}/v${version}-${args.variant}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from("documents")
    .upload(path, args.blob, { contentType: "application/pdf", upsert: false });
  if (upErr) {
    console.warn("[uploadDocument] storage error", upErr.message);
    return null;
  }

  const sha256 = await sha256Hex(args.blob);
  const { data: row, error: insErr } = await supabase
    .from("form_documents")
    .insert({
      user_id: args.userId,
      slug: args.slug,
      kind: args.kind,
      variant: args.variant,
      status: args.status ?? (args.variant === "clean" ? "purchased" : "completed"),
      storage_path: path,
      size_bytes: args.blob.size,
      sha256,
      snapshot: args.snapshot ?? {},
      version,
      title: args.title ?? null,
      state_code: args.stateCode ?? null,
    })
    .select("id, version")
    .single();

  if (insErr) {
    console.warn("[uploadDocument] insert error", insErr.message);
    return null;
  }
  return row;
}

export async function signedUrlFor(path: string, expiresInSec = 3600): Promise<string | null> {
  const { data, error } = await supabase.storage.from("documents").createSignedUrl(path, expiresInSec);
  if (error) return null;
  return data.signedUrl;
}
