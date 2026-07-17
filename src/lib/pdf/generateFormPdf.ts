import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import type { LegalFormDef } from "@/data/forms";

interface GenerateOptions {
  form: LegalFormDef;
  data: Record<string, unknown>;
  watermark: boolean;
}

/**
 * Client-side PDF generation with pdf-lib. Produces a clean, professional
 * layout of the form's answers. When `watermark` is true, a diagonal grey
 * banner is drawn over each page marking it as the free version.
 *
 * These PDFs are self-help templates, NOT facsimiles of official IRS/USCIS
 * or state government forms.
 */
export async function generateFormPdf({ form, data, watermark }: GenerateOptions): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 612; // US Letter
  const pageHeight = 792;
  const margin = 54;
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 16;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const ensureSpace = (needed: number) => {
    if (y - needed < margin) {
      if (watermark) drawWatermark(page, pageWidth, pageHeight, font);
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  };

  const drawText = (text: string, opts?: { bold?: boolean; size?: number; color?: [number, number, number] }) => {
    const size = opts?.size ?? 11;
    const f = opts?.bold ? fontBold : font;
    const color = opts?.color ?? [0.1, 0.1, 0.15];
    const lines = wrapText(text, f, size, maxWidth);
    for (const line of lines) {
      ensureSpace(size + 4);
      page.drawText(line, {
        x: margin,
        y,
        size,
        font: f,
        color: rgb(color[0], color[1], color[2]),
      });
      y -= size + 4;
    }
  };

  // Header
  drawText("LegallySpoken", { bold: true, size: 10, color: [0.55, 0.42, 0.15] });
  y -= 4;
  drawText(form.title, { bold: true, size: 18 });
  y -= 6;
  drawText(form.shortDescription, { size: 10, color: [0.35, 0.35, 0.4] });
  y -= 10;
  drawText(`Generated: ${new Date().toLocaleDateString()}`, { size: 9, color: [0.4, 0.4, 0.45] });
  y -= 14;

  // Divider
  ensureSpace(20);
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 0.5,
    color: rgb(0.75, 0.75, 0.8),
  });
  y -= 18;

  // Steps
  for (const step of form.steps) {
    ensureSpace(30);
    drawText(step.title, { bold: true, size: 13, color: [0.1, 0.15, 0.35] });
    if (step.description) {
      drawText(step.description, { size: 10, color: [0.4, 0.4, 0.45] });
    }
    y -= 4;
    for (const field of step.fields) {
      const raw = data[field.id];
      const value = formatValue(raw, field.type);
      if (!value) continue;
      drawText(field.label, { bold: true, size: 10, color: [0.25, 0.25, 0.3] });
      drawText(value, { size: 11 });
      y -= 4;
    }
    y -= 6;
  }

  // Footer disclaimer
  ensureSpace(40);
  y -= 6;
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 0.5,
    color: rgb(0.75, 0.75, 0.8),
  });
  y -= 14;
  drawText(
    "This document was generated from user-entered information on legallyspoken.com. It is a self-help template and is not legal advice, an official government form, or a substitute for consultation with a licensed attorney.",
    { size: 8, color: [0.45, 0.45, 0.5] }
  );

  if (watermark) drawWatermark(page, pageWidth, pageHeight, font);

  const bytes = await pdfDoc.save();
  // Wrap in a plain ArrayBuffer for Blob compatibility across TS lib versions
  return new Blob([bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer], { type: "application/pdf" });
}

function drawWatermark(
  page: import("pdf-lib").PDFPage,
  w: number,
  h: number,
  font: import("pdf-lib").PDFFont
) {
  page.drawText("FREE DRAFT — legallyspoken.com", {
    x: 60,
    y: h / 2,
    size: 42,
    font,
    color: rgb(0.85, 0.85, 0.9),
    rotate: degrees(30),
    opacity: 0.35,
  });
  page.drawText("Upgrade for a clean version without this watermark", {
    x: 60,
    y: 40,
    size: 9,
    font,
    color: rgb(0.55, 0.55, 0.6),
  });
}

function formatValue(v: unknown, type: string): string {
  if (v === null || v === undefined || v === "") return "";
  if (typeof v === "boolean") return v ? "Yes" : "";
  if (type === "date" && typeof v === "string") {
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) return d.toLocaleDateString();
  }
  return String(v);
}

function wrapText(text: string, font: import("pdf-lib").PDFFont, size: number, maxWidth: number): string[] {
  const paragraphs = String(text).split(/\r?\n/);
  const out: string[] = [];
  for (const para of paragraphs) {
    const words = para.split(/\s+/);
    let line = "";
    for (const word of words) {
      const attempt = line ? `${line} ${word}` : word;
      const width = font.widthOfTextAtSize(attempt, size);
      if (width > maxWidth && line) {
        out.push(line);
        line = word;
      } else {
        line = attempt;
      }
    }
    if (line) out.push(line);
    if (paragraphs.length > 1) out.push("");
  }
  return out;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
