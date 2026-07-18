import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, degrees } from "pdf-lib";
import { W9_CLASSIFICATIONS, type LegalFormDef } from "@/data/forms";

interface GenerateOptions {
  form: LegalFormDef;
  data: Record<string, unknown>;
  watermark: boolean;
}

/**
 * Client-side PDF generation with pdf-lib. Selects a template-specific
 * renderer (currently W-9) and falls back to a generic label/value layout
 * for all other forms. When `watermark` is true, a diagonal grey banner is
 * drawn over each page marking it as the free version.
 *
 * These PDFs are self-help templates, NOT facsimiles of official IRS/USCIS
 * or state government forms.
 */
export async function generateFormPdf({ form, data, watermark }: GenerateOptions): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  if (form.pdfTemplate === "w9") {
    renderW9({ pdfDoc, font, fontBold, data, watermark });
  } else {
    renderGeneric({ pdfDoc, font, fontBold, form, data, watermark });
  }

  const bytes = await pdfDoc.save();
  return new Blob(
    [bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer],
    { type: "application/pdf" }
  );
}

// ---------------------------------------------------------------------------
// W-9 layout (Rev. March 2024)
// ---------------------------------------------------------------------------

interface W9Ctx {
  pdfDoc: PDFDocument;
  font: PDFFont;
  fontBold: PDFFont;
  data: Record<string, unknown>;
  watermark: boolean;
}

function renderW9({ pdfDoc, font, fontBold, data, watermark }: W9Ctx) {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 40;
  const maxWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const newPage = () => {
    if (watermark) drawWatermark(page, pageWidth, pageHeight, font);
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    y = pageHeight - margin;
  };

  const need = (h: number) => { if (y - h < margin) newPage(); };

  const text = (
    s: string,
    opts: { bold?: boolean; size?: number; color?: [number, number, number]; indent?: number; italic?: boolean } = {}
  ) => {
    const size = opts.size ?? 10;
    const f = opts.bold ? fontBold : font;
    const color = opts.color ?? [0.05, 0.05, 0.1];
    const indent = opts.indent ?? 0;
    const lines = wrapText(s, f, size, maxWidth - indent);
    for (const line of lines) {
      need(size + 3);
      page.drawText(line, {
        x: margin + indent,
        y,
        size,
        font: f,
        color: rgb(color[0], color[1], color[2]),
      });
      y -= size + 3;
    }
  };

  const divider = () => {
    need(10);
    page.drawLine({
      start: { x: margin, y },
      end: { x: pageWidth - margin, y },
      thickness: 0.6,
      color: rgb(0.6, 0.6, 0.7),
    });
    y -= 10;
  };

  const gap = (h = 6) => { y -= h; };

  const box = (checked: boolean) => (checked ? "[X]" : "[ ]");

  // Header
  text("Form W-9", { bold: true, size: 20 });
  text("(Rev. March 2024)", { size: 9, color: [0.4, 0.4, 0.5] });
  gap(2);
  text("Request for Taxpayer Identification Number and Certification", { bold: true, size: 12 });
  text("Department of the Treasury — Internal Revenue Service", { size: 8, color: [0.4, 0.4, 0.5] });
  gap(4);
  text(
    "Go to www.irs.gov/FormW9 for instructions and the latest information. Give this form to the requester. Do not send to the IRS.",
    { size: 8, color: [0.35, 0.35, 0.45], italic: true }
  );
  divider();

  // Line 1
  text("1  Name of entity/individual (as shown on income tax return)", { bold: true, size: 9 });
  text(str(data.name) || "—", { size: 12 });
  gap();

  // Line 2
  text("2  Business name / disregarded entity name, if different from above", { bold: true, size: 9 });
  text(str(data.businessName) || "—", { size: 11 });
  gap();

  // Line 3a
  text("3a  Federal tax classification (check only one):", { bold: true, size: 9 });
  const selectedClass = str(data.classification);
  for (const opt of W9_CLASSIFICATIONS) {
    const isSel = selectedClass === opt.value;
    let label = `${box(isSel)}  ${opt.label}`;
    if (opt.value === "llc" && isSel) {
      const code = str(data.llcTaxCode).toUpperCase() || "___";
      label += `   Tax classification (C/S/P): ${code}`;
    }
    if (opt.value === "other" && isSel) {
      const desc = str(data.otherDescription) || "___";
      label += `   Description: ${desc}`;
    }
    text(label, { size: 10, indent: 8 });
  }
  gap();

  // Line 3b
  const line3bTriggered =
    selectedClass === "partnership" ||
    selectedClass === "trust" ||
    (selectedClass === "llc" && str(data.llcTaxCode).toUpperCase() === "P");
  if (line3bTriggered) {
    text(
      `3b  ${box(Boolean(data.foreignPartners))}  Check if you have any foreign partners, owners, or beneficiaries.`,
      { size: 9 }
    );
    gap();
  }

  // Line 4
  text("4  Exemptions (codes apply only to certain entities, not individuals)", { bold: true, size: 9 });
  text(`   Exempt payee code (if any):  ${str(data.exemptPayeeCode) || "___"}`, { size: 10 });
  text(`   Exemption from FATCA reporting code (if any):  ${str(data.fatcaCode) || "___"}`, { size: 10 });
  gap();

  // Line 5–6
  text("5  Address (number, street, and apt. or suite no.)", { bold: true, size: 9 });
  text(str(data.streetAddress) || "—", { size: 11 });
  gap(2);
  text("6  City, state, and ZIP code", { bold: true, size: 9 });
  const cityLine = [str(data.city), str(data.state), str(data.zip)].filter(Boolean).join(", ");
  text(cityLine || "—", { size: 11 });
  gap();

  if (str(data.requesterInfo)) {
    text("Requester's name and address (optional)", { bold: true, size: 9 });
    text(str(data.requesterInfo), { size: 10 });
    gap();
  }

  // Line 7
  text("7  List account number(s) here (optional)", { bold: true, size: 9 });
  text(str(data.accountNumbers) || "—", { size: 11 });
  divider();

  // Part I — TIN
  text("Part I    Taxpayer Identification Number (TIN)", { bold: true, size: 12 });
  gap(2);
  text(
    "Enter your TIN in the appropriate box. The TIN provided must match the name given on line 1 to avoid backup withholding. For individuals, this is generally your social security number (SSN). However, for a resident alien, sole proprietor, or disregarded entity, see the instructions for Part I. For other entities, it is your employer identification number (EIN).",
    { size: 9, color: [0.3, 0.3, 0.4] }
  );
  gap(4);
  const tinType = str(data.tinType);
  if (tinType === "ssn") {
    text("Social security number:", { bold: true, size: 10 });
    text(formatSsn(str(data.ssn)) || "___-__-____", { size: 14 });
  } else if (tinType === "ein") {
    text("Employer identification number:", { bold: true, size: 10 });
    text(formatEin(str(data.ein)) || "__-_______", { size: 14 });
  } else {
    text("TIN: —", { size: 10 });
  }
  divider();

  // Part II — Certification
  text("Part II    Certification", { bold: true, size: 12 });
  gap(2);
  text("Under penalties of perjury, I certify that:", { size: 9 });
  gap(2);
  const item2Struck = Boolean(data.crossOutItem2);
  const items = [
    "1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and",
    `${item2Struck ? "[STRUCK OUT]  " : ""}2. I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding; and`,
    "3. I am a U.S. citizen or other U.S. person (defined below); and",
    "4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.",
  ];
  for (const item of items) {
    text(item, { size: 9, indent: 6 });
    gap(1);
  }
  gap(2);
  text(
    "Certification instructions. You must cross out item 2 above if you have been notified by the IRS that you are currently subject to backup withholding because you have failed to report all interest and dividends on your tax return. For real estate transactions, item 2 does not apply. For mortgage interest paid, acquisition or abandonment of secured property, cancellation of debt, contributions to an individual retirement arrangement (IRA), and generally, payments other than interest and dividends, you are not required to sign the certification, but you must provide your correct TIN.",
    { size: 8, color: [0.35, 0.35, 0.45] }
  );
  gap(6);

  need(50);
  text("Signature of U.S. person (typed):", { bold: true, size: 10 });
  text(str(data.signatureName) || "—", { size: 14 });
  gap(2);
  text(`Date:  ${formatDate(str(data.signatureDate))}`, { size: 10 });

  gap(10);
  divider();
  text(
    "This is a free fillable helper tool created by legallyspoken.com. It is NOT an official IRS form. Verify the current Form W-9 at irs.gov before submitting to any requester. LegallySpoken is not a law firm and does not provide legal or tax advice.",
    { size: 7, color: [0.45, 0.45, 0.5] }
  );

  if (watermark) drawWatermark(page, pageWidth, pageHeight, font);
}

// ---------------------------------------------------------------------------
// Generic renderer (all non-W-9 forms)
// ---------------------------------------------------------------------------

interface GenericCtx {
  pdfDoc: PDFDocument;
  font: PDFFont;
  fontBold: PDFFont;
  form: LegalFormDef;
  data: Record<string, unknown>;
  watermark: boolean;
}

function renderGeneric({ pdfDoc, font, fontBold, form, data, watermark }: GenericCtx) {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 54;
  const maxWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const ensureSpace = (needed: number) => {
    if (y - needed < margin) {
      if (watermark) drawWatermark(page, pageWidth, pageHeight, font);
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  };

  const drawText = (t: string, opts?: { bold?: boolean; size?: number; color?: [number, number, number] }) => {
    const size = opts?.size ?? 11;
    const f = opts?.bold ? fontBold : font;
    const color = opts?.color ?? [0.1, 0.1, 0.15];
    const lines = wrapText(t, f, size, maxWidth);
    for (const line of lines) {
      ensureSpace(size + 4);
      page.drawText(line, { x: margin, y, size, font: f, color: rgb(color[0], color[1], color[2]) });
      y -= size + 4;
    }
  };

  drawText("LegallySpoken", { bold: true, size: 10, color: [0.55, 0.42, 0.15] });
  y -= 4;
  drawText(form.title, { bold: true, size: 18 });
  y -= 6;
  drawText(form.shortDescription, { size: 10, color: [0.35, 0.35, 0.4] });
  y -= 10;
  drawText(`Generated: ${new Date().toLocaleDateString()}`, { size: 9, color: [0.4, 0.4, 0.45] });
  y -= 14;

  ensureSpace(20);
  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 0.5,
    color: rgb(0.75, 0.75, 0.8),
  });
  y -= 18;

  for (const step of form.steps) {
    ensureSpace(30);
    drawText(step.title, { bold: true, size: 13, color: [0.1, 0.15, 0.35] });
    if (step.description) drawText(step.description, { size: 10, color: [0.4, 0.4, 0.45] });
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
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function drawWatermark(page: PDFPage, w: number, h: number, font: PDFFont) {
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

function str(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v);
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

function formatDate(v: string): string {
  if (!v) return "___________";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString();
}

function formatSsn(v: string): string {
  const digits = v.replace(/\D/g, "");
  if (digits.length !== 9) return v;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

function formatEin(v: string): string {
  const digits = v.replace(/\D/g, "");
  if (digits.length !== 9) return v;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const paragraphs = String(text).split(/\r?\n/);
  const out: string[] = [];
  for (const para of paragraphs) {
    if (!para) { out.push(""); continue; }
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
