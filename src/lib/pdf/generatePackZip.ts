import JSZip from "jszip";
import { generateFormPdf } from "./generateFormPdf";
import type { LegalFormDef } from "@/data/forms";
import type { FormPack } from "@/data/formPacks";
import { distributeSharedData, getPackFormDefs } from "@/data/formPacks";

interface Args {
  pack: FormPack;
  sharedData: Record<string, unknown>;
  selectedSlugs: string[];
  watermark: boolean;
}

/**
 * Build a ZIP of PDFs (one per selected pack member) plus a README.txt.
 * Each PDF is produced by the same generateFormPdf pipeline as individual
 * form downloads, so W-4 / I-9 / NDA / etc. keep their bespoke layouts and
 * the rest use the generic template.
 */
export async function generatePackZip({ pack, sharedData, selectedSlugs, watermark }: Args): Promise<Blob> {
  const zip = new JSZip();
  const members = getPackFormDefs(pack).filter(({ def }) => selectedSlugs.includes(def.slug));

  const readmeLines: string[] = [
    pack.title,
    "=".repeat(pack.title.length),
    "",
    `Generated: ${new Date().toLocaleString()}`,
    `Documents included: ${members.length}`,
    "",
    "Files:",
  ];

  for (const { def } of members) {
    const merged: Record<string, unknown> = {
      ...distributeSharedData(pack, sharedData, def.slug),
    };
    const blob = await generateFormPdf({ form: def as LegalFormDef, data: merged, watermark });
    const buf = await blob.arrayBuffer();
    const fname = `${def.slug}${watermark ? "-free-draft" : ""}.pdf`;
    zip.file(fname, buf);
    readmeLines.push(`  • ${fname}  —  ${def.title}`);
  }

  readmeLines.push(
    "",
    "IMPORTANT:",
    "  These are self-help templates generated from information you entered on",
    "  legallyspoken.com. They are NOT legal advice, official government forms,",
    "  or a substitute for consultation with a licensed attorney. Signing,",
    "  witnessing, and notarization rules vary by state — verify before use."
  );

  if (pack.disclaimer) {
    readmeLines.push("", pack.disclaimer);
  }

  zip.file("README.txt", readmeLines.join("\n"));

  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
}
