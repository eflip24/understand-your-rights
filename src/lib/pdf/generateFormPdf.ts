import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, degrees } from "pdf-lib";
import { W9_CLASSIFICATIONS, type LegalFormDef } from "@/data/forms";
import {
  computeVacateBy,
  getEvictionRule,
  type EvictionReason,
} from "@/data/evictionStateRules";

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
  } else if (form.pdfTemplate === "w4") {
    renderW4({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "i9") {
    renderI9({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "nda") {
    renderNda({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "poa") {
    renderPoa({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "lease") {
    renderLease({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "billOfSale") {
    renderBillOfSale({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "evictionNotice") {
    renderEvictionNotice({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "demandLetter") {
    renderDemandLetter({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "promissoryNote") {
    renderPromissoryNote({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "releaseOfLiability") {
    renderReleaseOfLiability({ pdfDoc, font, fontBold, data, watermark });
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
// Sectioned document builder (used by W-4, I-9, NDA)
// ---------------------------------------------------------------------------

interface DocCtx {
  pdfDoc: PDFDocument;
  font: PDFFont;
  fontBold: PDFFont;
  data: Record<string, unknown>;
  watermark: boolean;
}

interface DocApi {
  h1: (s: string) => void;
  h2: (s: string) => void;
  h3: (s: string) => void;
  p: (s: string, opts?: { size?: number; italic?: boolean; muted?: boolean }) => void;
  kv: (label: string, value: string) => void;
  check: (label: string, checked: boolean) => void;
  rule: () => void;
  gap: (h?: number) => void;
  footer: (s: string) => void;
}

function buildDoc(ctx: DocCtx): DocApi {
  const { pdfDoc, font, fontBold, watermark } = ctx;
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 54;
  const maxWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const newPage = () => {
    if (watermark) drawWatermark(page, pageWidth, pageHeight, font);
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    y = pageHeight - margin;
  };
  const need = (h: number) => { if (y - h < margin) newPage(); };

  const write = (s: string, size: number, f: PDFFont, color: [number, number, number], indent = 0) => {
    const lines = wrapText(s, f, size, maxWidth - indent);
    for (const line of lines) {
      need(size + 4);
      page.drawText(line, { x: margin + indent, y, size, font: f, color: rgb(color[0], color[1], color[2]) });
      y -= size + 4;
    }
  };

  return {
    h1: (s) => { need(30); write(s, 18, fontBold, [0.08, 0.12, 0.32]); y -= 4; },
    h2: (s) => { need(22); y -= 4; write(s, 13, fontBold, [0.1, 0.15, 0.35]); y -= 2; },
    h3: (s) => { need(16); write(s, 11, fontBold, [0.2, 0.2, 0.3]); },
    p: (s, opts) => write(s, opts?.size ?? 10, font, opts?.muted ? [0.4, 0.4, 0.5] : [0.1, 0.1, 0.15]),
    kv: (label, value) => {
      write(label, 9, fontBold, [0.3, 0.3, 0.4]);
      write(value || "—", 11, font, [0.1, 0.1, 0.15]);
      y -= 3;
    },
    check: (label, checked) => write(`${checked ? "[X]" : "[ ]"}  ${label}`, 10, font, [0.1, 0.1, 0.15], 4),
    rule: () => {
      need(10);
      page.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 0.5, color: rgb(0.75, 0.75, 0.8) });
      y -= 10;
    },
    gap: (h = 6) => { y -= h; },
    footer: (s) => {
      need(20);
      y -= 6;
      page.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 0.5, color: rgb(0.8, 0.8, 0.85) });
      y -= 10;
      write(s, 8, font, [0.45, 0.45, 0.5]);
      if (watermark) drawWatermark(page, pageWidth, pageHeight, font);
    },
  };
}

// ---------------------------------------------------------------------------
// W-4 (2026)
// ---------------------------------------------------------------------------

function renderW4(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  doc.h1("Form W-4 (2026) — Employee's Withholding Certificate");
  doc.p("Department of the Treasury — Internal Revenue Service", { muted: true, size: 8 });
  doc.p("Give this form to your employer. Do not send to the IRS. Verify at irs.gov/FormW4.", { muted: true, size: 8 });
  doc.rule();

  doc.h2("Step 1 — Personal information");
  doc.kv("First name and middle initial", `${str(d.firstName)} ${str(d.middleInitial)}`.trim());
  doc.kv("Last name", str(d.lastName));
  doc.kv("Social security number", formatSsn(str(d.ssn)));
  doc.kv("Address", str(d.streetAddress));
  doc.kv("City, State, ZIP", [str(d.city), str(d.state), str(d.zip)].filter(Boolean).join(", "));
  doc.gap(4);
  doc.h3("Step 1(c) — Filing status");
  const fs = str(d.filingStatus);
  doc.check("Single or Married filing separately", fs === "single");
  doc.check("Married filing jointly or Qualifying surviving spouse", fs === "mfj");
  doc.check("Head of household", fs === "hoh");
  if (d.ssnNameMismatch) doc.check("Last name differs from Social Security card (call 800-772-1213)", true);

  doc.h2("Step 2 — Multiple jobs or spouse works");
  const m2 = str(d.step2Method);
  doc.check("Not applicable", m2 === "none");
  doc.check("(a) Used the IRS Tax Withholding Estimator (irs.gov/W4App)", m2 === "estimator");
  doc.check("(b) Used the Multiple Jobs Worksheet on page 3", m2 === "worksheet");
  doc.check("(c) Two jobs total with roughly similar pay — box 2(c)", m2 === "box2c");
  if (d.secondJobAnnualPay) doc.kv("Estimated annual pay — second job", `$${str(d.secondJobAnnualPay)}`);

  doc.h2("Step 3 — Claim dependents");
  const kids = Number(d.qualifyingChildren) || 0;
  const others = Number(d.otherDependents) || 0;
  const otherCr = Number(d.otherCredits) || 0;
  doc.kv("Qualifying children under 17", `${kids} × $2,000 = $${(kids * 2000).toLocaleString()}`);
  doc.kv("Other dependents", `${others} × $500 = $${(others * 500).toLocaleString()}`);
  if (otherCr) doc.kv("Other credits", `$${otherCr.toLocaleString()}`);
  doc.kv("Total (Step 3)", `$${(kids * 2000 + others * 500 + otherCr).toLocaleString()}`);

  doc.h2("Step 4 — Other adjustments (optional)");
  doc.kv("4(a) Other income (annual)", d.otherIncome ? `$${str(d.otherIncome)}` : "—");
  doc.kv("4(b) Deductions", d.deductions ? `$${str(d.deductions)}` : "—");
  doc.kv("4(c) Extra withholding per pay period", d.extraWithholding ? `$${str(d.extraWithholding)}` : "—");

  doc.h2("Step 5 — Sign here");
  doc.p("Under penalties of perjury, I declare that this certificate, to the best of my knowledge and belief, is true, correct, and complete.", { size: 9, muted: true });
  doc.gap(4);
  doc.kv("Employee's signature (typed)", str(d.signatureName));
  doc.kv("Date", formatDate(str(d.signatureDate)));

  if (d.employerName || d.employerEin || d.firstDateOfEmployment) {
    doc.h2("Employers only");
    doc.kv("Employer's name and address", str(d.employerName));
    doc.kv("First date of employment", formatDate(str(d.firstDateOfEmployment)));
    doc.kv("Employer identification number (EIN)", formatEin(str(d.employerEin)));
  }

  doc.footer("This is a free fillable helper tool from legallyspoken.com. It is NOT an official IRS form. Verify the current Form W-4 at irs.gov before submitting. LegallySpoken is not a law firm and does not provide legal or tax advice.");
}

// ---------------------------------------------------------------------------
// I-9 (Edition 01/20/25)
// ---------------------------------------------------------------------------

function renderI9(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  doc.h1("Form I-9 — Employment Eligibility Verification");
  doc.p("USCIS · Department of Homeland Security · Edition 01/20/25 · Expires 05/31/2027", { muted: true, size: 8 });
  doc.rule();

  doc.h2("Section 1 — Employee information and attestation");
  doc.kv("Last name (family name)", str(d.lastName));
  doc.kv("First name (given name)", str(d.firstName));
  doc.kv("Middle initial", str(d.middleInitial));
  doc.kv("Other last names used", str(d.otherLastNames));
  doc.kv("Address", `${str(d.streetAddress)}${d.aptNumber ? " Apt. " + str(d.aptNumber) : ""}`);
  doc.kv("City, State, ZIP", [str(d.city), str(d.state), str(d.zip)].filter(Boolean).join(", "));
  doc.kv("Date of birth", formatDate(str(d.dob)));
  doc.kv("U.S. Social Security Number", formatSsn(str(d.ssn)));
  doc.kv("Email", str(d.email));
  doc.kv("Telephone", str(d.phone));

  doc.h3("Citizenship / immigration status");
  const s = str(d.status);
  doc.check("1. A citizen of the United States", s === "citizen");
  doc.check("2. A noncitizen national of the United States", s === "national");
  doc.check("3. A lawful permanent resident", s === "lpr");
  doc.check("4. A noncitizen authorized to work", s === "authorized");
  if (s === "lpr" || s === "authorized") doc.kv("USCIS A-Number / Alien Registration Number", str(d.uscisNumber));
  if (s === "authorized") {
    doc.kv("Work authorization expiration", formatDate(str(d.workAuthExpires)));
    if (d.i94Number) doc.kv("Form I-94 Admission Number", str(d.i94Number));
    if (d.foreignPassportNumber) doc.kv("Foreign passport number", str(d.foreignPassportNumber));
    if (d.passportCountry) doc.kv("Country of issuance", str(d.passportCountry));
  }

  doc.gap(4);
  doc.p("I am aware that federal law provides for imprisonment and/or fines for false statements or the use of false documents in connection with the completion of this form.", { size: 9, muted: true });
  doc.kv("Employee's signature (typed)", str(d.employeeSignature));
  doc.kv("Date", formatDate(str(d.employeeSignatureDate)));

  if (d.preparerUsed) {
    doc.h2("Preparer / Translator certification");
    doc.kv("Signature (typed)", str(d.preparerSignature));
    doc.kv("Date", formatDate(str(d.preparerDate)));
    doc.kv("Last name", str(d.preparerLastName));
    doc.kv("First name", str(d.preparerFirstName));
    doc.kv("Address", str(d.preparerAddress));
  }

  doc.h2("Section 2 — Employer review and verification");
  const path = str(d.docPath);
  if (path === "listA") {
    doc.h3("List A — Identity and employment authorization");
    doc.kv("Document title", str(d.listA_title));
    doc.kv("Issuing authority", str(d.listA_authority));
    doc.kv("Document number", str(d.listA_number));
    doc.kv("Expiration date", formatDate(str(d.listA_expiration)));
    if (d.listA_title2) {
      doc.kv("Additional document title", str(d.listA_title2));
      doc.kv("Additional issuing authority", str(d.listA_authority2));
      doc.kv("Additional document number", str(d.listA_number2));
    }
  } else if (path === "listBC") {
    doc.h3("List B — Identity");
    doc.kv("Document title", str(d.listB_title));
    doc.kv("Issuing authority", str(d.listB_authority));
    doc.kv("Document number", str(d.listB_number));
    doc.kv("Expiration date", formatDate(str(d.listB_expiration)));
    doc.h3("List C — Employment authorization");
    doc.kv("Document title", str(d.listC_title));
    doc.kv("Issuing authority", str(d.listC_authority));
    doc.kv("Document number", str(d.listC_number));
    doc.kv("Expiration date", formatDate(str(d.listC_expiration)));
  }
  doc.kv("Employee's first day of employment", formatDate(str(d.firstDayOfEmployment)));
  if (d.altProcedure) doc.check("Alternative Procedure used (qualified E-Verify participant, remote exam)", true);

  doc.gap(4);
  doc.p("Employer certification: I attest, under penalty of perjury, that (1) I have examined the documentation presented, (2) the documentation appears to be genuine and to relate to the employee named, and (3) to the best of my knowledge the employee is authorized to work in the United States.", { size: 9, muted: true });
  doc.kv("Employer signature (typed)", str(d.employerSignature));
  doc.kv("Date", formatDate(str(d.employerSignatureDate)));
  doc.kv("Title", str(d.employerRepTitle));
  doc.kv("Employer representative name", `${str(d.employerRepFirstName)} ${str(d.employerRepLastName)}`.trim());
  doc.kv("Business or organization name", str(d.employerBusinessName));
  doc.kv("Business address", str(d.employerBusinessAddress));

  if (d.reverifyEnable) {
    doc.h2("Supplement B — Reverification / Rehire");
    if (d.reverifyNewName) doc.kv("New name (if changed)", str(d.reverifyNewName));
    if (d.reverifyRehireDate) doc.kv("Date of rehire", formatDate(str(d.reverifyRehireDate)));
    doc.kv("Document title", str(d.reverifyDocTitle));
    doc.kv("Document number", str(d.reverifyDocNumber));
    doc.kv("Expiration", formatDate(str(d.reverifyDocExpiration)));
    doc.kv("Employer signature", str(d.reverifySignature));
    doc.kv("Date", formatDate(str(d.reverifySignatureDate)));
  }

  doc.footer("This is a free fillable helper tool from legallyspoken.com. It is NOT an official USCIS form. Employers must retain the official Form I-9 (uscis.gov/i-9). LegallySpoken is not a law firm and does not provide legal advice.");
}

// ---------------------------------------------------------------------------
// NDA
// ---------------------------------------------------------------------------

function renderNda(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  const isMutual = str(d.agreementType) === "mutual";
  const partyALabel = isMutual ? "Party A" : "Disclosing Party";
  const partyBLabel = isMutual ? "Party B" : "Receiving Party";

  doc.h1(isMutual ? "Mutual Non-Disclosure Agreement" : "Non-Disclosure Agreement");
  doc.p(`This ${isMutual ? "Mutual " : ""}Non-Disclosure Agreement (the "Agreement") is entered into as of ${formatDate(str(d.effectiveDate))} (the "Effective Date"), by and between:`, { size: 10 });
  doc.gap(4);
  doc.p(`${partyALabel}: ${str(d.partyAName)}${d.partyAEntity ? ` (${entityLabel(str(d.partyAEntity))})` : ""}, with an address at ${str(d.partyAAddress).replace(/\n/g, ", ")}; and`);
  doc.p(`${partyBLabel}: ${str(d.partyBName)}${d.partyBEntity ? ` (${entityLabel(str(d.partyBEntity))})` : ""}, with an address at ${str(d.partyBAddress).replace(/\n/g, ", ")}.`);
  doc.p("Each a \"Party\" and together the \"Parties.\"", { muted: true, size: 9 });

  doc.h2("1. Purpose");
  doc.p(`The Parties wish to explore the following business opportunity (the "Purpose"): ${str(d.purpose)}.`);

  doc.h2("2. Confidential Information");
  if (str(d.scopeDefinition) === "broad") {
    doc.p(`"Confidential Information" means any non-public information disclosed by ${isMutual ? "either Party to the other" : "the Disclosing Party to the Receiving Party"}, in any form or medium, whether or not marked as confidential, including without limitation business plans, financial information, customer and supplier data, product roadmaps, technical data, source code, know-how, and trade secrets.`);
  } else {
    doc.p(`"Confidential Information" means information disclosed by ${isMutual ? "either Party" : "the Disclosing Party"} that is marked or identified as confidential at the time of disclosure, or that a reasonable person would understand to be confidential given the nature of the information and the circumstances of disclosure.`);
  }
  if (d.specificallyIncluded) doc.p(`Without limiting the foregoing, Confidential Information specifically includes: ${str(d.specificallyIncluded)}.`);
  doc.p("Confidential Information does not include information that: (a) is or becomes publicly known through no breach of this Agreement; (b) was rightfully known before disclosure; (c) is independently developed without use of the Confidential Information; or (d) is lawfully obtained from a third party without a duty of confidentiality.", { size: 9 });

  doc.h2("3. Obligations");
  doc.p(`The Receiving Party shall (i) use Confidential Information solely for the Purpose; (ii) protect it with at least the same degree of care used for its own confidential information, and no less than reasonable care; and (iii) not disclose Confidential Information to any third party except as permitted below.`);
  if (d.permittedReps) {
    doc.p("The Receiving Party may disclose Confidential Information to its employees, contractors, attorneys, accountants, and financial advisors who need to know for the Purpose and who are bound by written or professional confidentiality obligations at least as protective as this Agreement. The Receiving Party remains responsible for their compliance.", { size: 10 });
  }

  doc.h2("4. Term");
  const term = str(d.term);
  if (term === "indefinite") {
    doc.p("This Agreement remains in effect until the Confidential Information no longer qualifies as confidential under Section 2.");
  } else {
    doc.p(`The obligations in this Agreement remain in effect for a period of ${term} year${term === "1" ? "" : "s"} from the Effective Date. Obligations with respect to trade secrets continue for as long as such information remains a trade secret under applicable law.`);
  }

  doc.h2("5. Return or Destruction");
  const ret = str(d.returnOrDestroy);
  if (ret === "return") doc.p(`Upon written request or termination, the Receiving Party shall promptly return all Confidential Information${isMutual ? " received from the other Party" : ""}, including all copies.`);
  else if (ret === "destroy") doc.p(`Upon written request or termination, the Receiving Party shall promptly destroy all Confidential Information${isMutual ? " received from the other Party" : ""}, including all copies, and certify such destruction in writing.`);
  else doc.p(`Upon written request or termination, the Receiving Party shall promptly return or destroy (at ${isMutual ? "the disclosing Party's" : "the Disclosing Party's"} option) all Confidential Information, including all copies.`);

  doc.h2("6. No License; No Warranty");
  doc.p("Nothing in this Agreement grants any license or right in the Confidential Information, by implication or otherwise, except the limited right to use it for the Purpose. All Confidential Information is provided \"as is,\" without warranty of any kind.");

  doc.h2("7. Remedies");
  if (d.injunctiveRelief) {
    doc.p(`The Parties acknowledge that a breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate, and each Party is entitled to seek injunctive or other equitable relief, in addition to all other remedies available at law or in equity.`);
  } else {
    doc.p("A breach of this Agreement may entitle the non-breaching Party to any remedies available at law or in equity.");
  }

  doc.h2("8. Governing Law");
  const county = str(d.venueCounty);
  doc.p(`This Agreement is governed by the laws of the State of ${str(d.governingState)}, without regard to its conflict-of-laws principles. The Parties consent to the exclusive jurisdiction of the state and federal courts located in ${county ? county + ", " : ""}${str(d.governingState)}.`);

  doc.h2("9. Miscellaneous");
  doc.p("This Agreement constitutes the entire agreement of the Parties with respect to the Confidential Information and supersedes all prior discussions on that subject. It may be amended only in a writing signed by both Parties. If any provision is held unenforceable, the remaining provisions remain in full force. This Agreement may be executed in counterparts, including electronically.", { size: 10 });

  doc.h2("Signatures");
  doc.p("By typing their name below, each signatory represents that they are authorized to bind the Party for which they sign and adopt the typed name as their electronic signature.", { size: 9, muted: true });
  doc.gap(6);
  doc.kv(`${partyALabel} — Signed by`, str(d.partyASignerName));
  doc.kv("Title", str(d.partyASignerTitle));
  doc.kv("Date", formatDate(str(d.partyASignatureDate)));
  doc.gap(6);
  doc.kv(`${partyBLabel} — Signed by`, str(d.partyBSignerName));
  doc.kv("Title", str(d.partyBSignerTitle));
  doc.kv("Date", formatDate(str(d.partyBSignatureDate)));

  doc.footer("This NDA template was generated by legallyspoken.com from your inputs. It is a self-help template, not legal advice. Review with a licensed attorney before signing, especially for high-value transactions or cross-border deals.");
}

// ---------------------------------------------------------------------------
// Power of Attorney (Financial)
// ---------------------------------------------------------------------------

const POA_POWERS: { key: string; label: string }[] = [
  { key: "powerRealEstate", label: "Real estate transactions" },
  { key: "powerBanking", label: "Banking, finances, and investments" },
  { key: "powerBusiness", label: "Business operating transactions" },
  { key: "powerInsurance", label: "Insurance and annuity transactions" },
  { key: "powerEstate", label: "Estate, trust, and other beneficiary transactions" },
  { key: "powerClaims", label: "Claims and litigation" },
  { key: "powerFamily", label: "Personal and family maintenance" },
  { key: "powerBenefits", label: "Government benefits (Social Security, Medicare, etc.)" },
  { key: "powerRetirement", label: "Retirement plans" },
  { key: "powerTaxes", label: "Tax matters" },
  { key: "powerGifts", label: "Gift-giving (limited)" },
];

function renderPoa(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  const isDurable = str(d.effectiveType) !== "springing";

  doc.h1(isDurable ? "General Durable Power of Attorney (Financial)" : "Springing Power of Attorney (Financial)");
  doc.p(`Governed by the laws of the State of ${str(d.governingState) || "___"}.`, { muted: true, size: 9 });
  doc.rule();

  doc.h2("1. Appointment");
  doc.p(`I, ${str(d.principalName) || "___"}, of ${str(d.principalAddress).replace(/\n/g, ", ")} (the "Principal"), hereby appoint ${str(d.agentName) || "___"}, of ${str(d.agentAddress).replace(/\n/g, ", ")} (the "Agent" or "Attorney-in-Fact") to act in my name, place, and stead in the matters set forth below.`);
  if (d.hasSuccessor && d.successorName) {
    doc.p(`If ${str(d.agentName)} is unable or unwilling to serve, I appoint ${str(d.successorName)}, of ${str(d.successorAddress).replace(/\n/g, ", ")} (the "Successor Agent") to serve in that capacity with the same authority.`);
  }

  doc.h2("2. Powers Granted");
  const grantAll = Boolean(d.powerAll);
  const granted = POA_POWERS.filter((p) => grantAll || Boolean(d[p.key]));
  if (granted.length === 0) {
    doc.p("No specific powers were selected. The Agent shall have no authority under this document until powers are specified.", { muted: true });
  } else {
    doc.p("The Agent is authorized to act on my behalf with respect to the following categories:");
    for (const p of granted) doc.check(p.label, true);
  }
  if (d.powerCustom) {
    doc.gap(4);
    doc.h3("Additional / custom powers");
    doc.p(str(d.powerCustom));
  }

  doc.h2("3. Effective Date & Durability");
  if (isDurable) {
    doc.p(`This Power of Attorney becomes effective on ${formatDate(str(d.effectiveDate))} and shall NOT be affected by my subsequent disability or incapacity. This is a DURABLE Power of Attorney.`);
  } else {
    doc.p(`This Power of Attorney is a SPRINGING Power of Attorney and shall become effective only upon the written certification of a licensed physician that I am unable to manage my financial affairs. The nominal effective date is ${formatDate(str(d.effectiveDate))}.`);
  }
  if (d.terminationDate) {
    doc.p(`This Power of Attorney shall terminate on ${formatDate(str(d.terminationDate))} unless earlier revoked.`);
  } else {
    doc.p("This Power of Attorney shall remain in effect until revoked by me in writing or terminated by operation of law.");
  }

  doc.h2("4. Governing Law");
  doc.p(`This document is governed by the laws of the State of ${str(d.governingState) || "___"}.`);

  if (d.specialInstructions) {
    doc.h2("5. Special Instructions and Limitations");
    doc.p(str(d.specialInstructions));
  }

  doc.h2("6. Revocation");
  doc.p("I reserve the right to revoke this Power of Attorney at any time by delivering written notice of revocation to the Agent and to any third party that has relied on this document.");

  doc.h2("Signatures");
  doc.p("The Principal must sign this document in the presence of a notary public and, where required by state law, two adult witnesses.", { muted: true, size: 9 });
  doc.gap(4);
  doc.kv("Principal — signed (typed)", str(d.principalSignature));
  doc.kv("Date", formatDate(str(d.principalSignDate)));
  doc.gap(4);
  if (d.witness1Name) {
    doc.kv("Witness 1 — name", str(d.witness1Name));
    doc.kv("Witness 1 — address", str(d.witness1Address));
  }
  if (d.witness2Name) {
    doc.kv("Witness 2 — name", str(d.witness2Name));
    doc.kv("Witness 2 — address", str(d.witness2Address));
  }
  doc.gap(6);
  doc.h3("Notary Acknowledgment");
  doc.p(`State of ${str(d.governingState) || "___"}, County of ______________________.`);
  doc.p(`On this ____ day of ____________, 20____, before me personally appeared ${str(d.principalName) || "___"}, known to me (or satisfactorily proven) to be the person whose name is subscribed to this Power of Attorney, and acknowledged that he/she executed it for the purposes therein contained.`, { size: 9 });
  doc.gap(6);
  doc.p("_______________________________________________", { muted: true });
  doc.p("Notary Public — signature and seal", { muted: true, size: 9 });

  doc.footer("This POA template was generated by legallyspoken.com from your inputs. It is NOT legal advice. State law dictates required formalities (notarization, witnesses). Review with a licensed attorney before signing.");
}

// ---------------------------------------------------------------------------
// Residential Lease
// ---------------------------------------------------------------------------

function renderLease(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  const tenants = [d.tenant1Name, d.tenant2Name, d.tenant3Name, d.tenant4Name].map(str).filter(Boolean);
  const isMtM = str(d.termType) === "mtm";
  const rent = Number(d.monthlyRent) || 0;

  doc.h1("Residential Lease Agreement");
  doc.p(`This Lease is entered into on ${formatDate(str(d.startDate))} between ${str(d.landlordName) || "___"} ("Landlord") and ${tenants.join(", ") || "___"} ("Tenant," jointly and severally if more than one).`, { size: 10 });
  doc.rule();

  doc.h2("1. Premises");
  const propLine = [str(d.propertyStreet), str(d.propertyUnit) ? `Unit ${str(d.propertyUnit)}` : "", `${str(d.propertyCity)}, ${str(d.propertyState)} ${str(d.propertyZip)}`].filter(Boolean).join(", ");
  doc.p(`Landlord leases to Tenant the residential premises located at ${propLine}${d.bedrooms ? `, containing ${str(d.bedrooms)} bedroom(s) and ${str(d.bathrooms) || "?"} bathroom(s)` : ""}${d.parking ? `. Parking: ${str(d.parking)}` : ""}.`);
  if (d.furnished) {
    const f = str(d.furnished);
    doc.p(`Furnishing: ${f === "unfurnished" ? "Unfurnished." : f === "partial" ? "Partially furnished." : "Fully furnished (inventory attached)."}`);
  }

  doc.h2("2. Term");
  if (isMtM) {
    doc.p(`This Lease begins on ${formatDate(str(d.startDate))} and continues on a month-to-month basis until terminated by either party with the notice specified in Section 9.`);
  } else {
    doc.p(`This Lease begins on ${formatDate(str(d.startDate))} and ends on ${formatDate(str(d.endDate))}.`);
  }

  doc.h2("3. Rent");
  doc.p(`Tenant shall pay rent of $${rent.toLocaleString()} per month, due on the ${str(d.dueDay) || "1st"} day of each month${d.firstPaymentDate ? `, with the first payment due on ${formatDate(str(d.firstPaymentDate))}` : ""}.`);
  if (!isMtM && d.endDate) {
    const start = new Date(str(d.startDate));
    const end = new Date(str(d.endDate));
    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
      const months = Math.max(1, Math.round((end.getTime() - start.getTime()) / (30.44 * 24 * 3600 * 1000)));
      doc.p(`Total base rent over the term (approximate): $${(rent * months).toLocaleString()} (${months} months × $${rent.toLocaleString()}).`, { muted: true, size: 9 });
    }
  }
  const lft = str(d.lateFeeType);
  if (lft === "flat" && d.lateFeeAmount) {
    doc.p(`Late fee: $${str(d.lateFeeAmount)} if rent is not paid within ${str(d.graceDays) || "0"} days of the due date.`);
  } else if (lft === "percent" && d.lateFeePercent) {
    doc.p(`Late fee: ${str(d.lateFeePercent)}% of monthly rent if not paid within ${str(d.graceDays) || "0"} days of the due date.`);
  }

  doc.h2("4. Security Deposit");
  doc.p(`Tenant shall pay a security deposit of $${(Number(d.securityDeposit) || 0).toLocaleString()} on or before the start of the Lease. The deposit will be returned within the statutory period after termination, less lawful deductions.${d.depositHeldAt ? ` Deposit is held at: ${str(d.depositHeldAt)}.` : ""}`);
  if (d.lastMonthRent) doc.p(`Last month's rent held: $${str(d.lastMonthRent)}.`);

  doc.h2("5. Utilities & Maintenance");
  const util = (label: string, val: string) => {
    if (!val) return;
    const who = val === "tenant" ? "Tenant" : val === "landlord" ? "Landlord" : val === "split" ? "Split / included in rent" : "N/A";
    doc.check(`${label}: ${who}`, true);
  };
  util("Electricity", str(d.utilElectric));
  util("Gas", str(d.utilGas));
  util("Water & sewer", str(d.utilWater));
  util("Trash / recycling", str(d.utilTrash));
  util("Internet / cable", str(d.utilInternet));
  util("Lawn / snow removal", str(d.utilLawn));
  if (d.appliancesIncluded) doc.p(`Appliances included: ${str(d.appliancesIncluded)}.`);

  doc.h2("6. Rules & Restrictions");
  const pets = str(d.pets);
  if (pets === "none") doc.p("Pets: not permitted.");
  else if (pets === "withDeposit") doc.p(`Pets: permitted with a pet deposit of $${str(d.petDeposit) || "___"}.`);
  else if (pets === "noDeposit") doc.p("Pets: permitted (no additional deposit).");
  const sm = str(d.smoking);
  if (sm === "prohibited") doc.p("Smoking is prohibited anywhere on the property.");
  else if (sm === "outside") doc.p("Smoking is permitted outside only.");
  else if (sm === "allowed") doc.p("Smoking is permitted.");
  const sub = str(d.subletting);
  if (sub === "prohibited") doc.p("Subletting or assignment is prohibited without prior written consent of the Landlord.");
  else if (sub === "allowed") doc.p("Subletting is permitted with reasonable written notice to the Landlord.");
  if (d.quietHours) doc.p(`Additional rules: ${str(d.quietHours)}`);

  doc.h2("7. Default & Termination");
  doc.p(`If Tenant fails to pay rent or otherwise breaches this Lease, Landlord may serve written notice to cure. Tenant shall have ${str(d.curePeriod) || "10"} days to cure any curable default. Notice period to terminate the tenancy: ${str(d.noticePeriod) || "30"} days, unless a longer period is required by state law.`);

  doc.h2("8. Governing Law");
  doc.p(`This Lease is governed by the laws of the State of ${str(d.governingState) || "___"}.`);

  doc.h2("9. Entire Agreement");
  doc.p("This Lease constitutes the entire agreement between the parties and supersedes any prior discussions. Any amendment must be in writing and signed by both parties.", { size: 10 });

  doc.h2("Signatures");
  doc.kv("Landlord — signed (typed)", str(d.landlordSignature));
  doc.kv("Date", formatDate(str(d.landlordSignDate)));
  doc.gap(4);
  doc.kv("Tenant 1 — signed (typed)", str(d.tenant1Signature));
  doc.kv("Date", formatDate(str(d.tenant1SignDate)));
  if (d.tenant2Signature) {
    doc.gap(4);
    doc.kv("Tenant 2 — signed (typed)", str(d.tenant2Signature));
    doc.kv("Date", formatDate(str(d.tenant2SignDate)));
  }

  doc.footer("This Lease template was generated by legallyspoken.com. Landlord-tenant law is state-specific — some clauses (e.g., late fees, security deposit maximums, notice periods) are regulated. Review with a licensed attorney in your state before signing.");
}

// ---------------------------------------------------------------------------
// Bill of Sale
// ---------------------------------------------------------------------------

function renderBillOfSale(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  const type = str(d.saleType);

  doc.h1("Bill of Sale");
  doc.p(`Effective ${formatDate(str(d.saleDate))} in ${str(d.saleCity) ? str(d.saleCity) + ", " : ""}${str(d.saleState) || "___"}.`, { muted: true, size: 9 });
  doc.rule();

  doc.h2("1. Parties");
  doc.p(`Seller: ${str(d.sellerName) || "___"}, of ${str(d.sellerAddress).replace(/\n/g, ", ")}${d.sellerPhone ? `, phone ${str(d.sellerPhone)}` : ""}${d.sellerDl ? `, ID ${str(d.sellerDl)}` : ""}.`);
  doc.p(`Buyer: ${str(d.buyerName) || "___"}, of ${str(d.buyerAddress).replace(/\n/g, ", ")}${d.buyerPhone ? `, phone ${str(d.buyerPhone)}` : ""}${d.buyerDl ? `, ID ${str(d.buyerDl)}` : ""}.`);

  doc.h2("2. Property Sold");
  if (type === "vehicle") {
    doc.p("The Seller sells and transfers to the Buyer the following motor vehicle:");
    doc.kv("Year / Make / Model", `${str(d.vYear)} ${str(d.vMake)} ${str(d.vModel)} ${str(d.vTrim)}`.trim());
    if (d.vColor) doc.kv("Color", str(d.vColor));
    doc.kv("VIN", str(d.vVin));
    if (d.vTitle) doc.kv("Title number", str(d.vTitle));
    if (d.vPlate) doc.kv("License plate", str(d.vPlate));
    doc.gap(4);
    doc.h3("Federal Odometer Disclosure (49 CFR § 580)");
    doc.p(`I, the Seller, state that the odometer now reads ${Number(d.vOdometer || 0).toLocaleString()} miles and to the best of my knowledge it reflects the ACTUAL mileage of the vehicle described above, subject to the following certification:`, { size: 9 });
    const od = str(d.vOdometerDisclosure);
    doc.check("The mileage stated is the ACTUAL mileage.", od === "actual");
    doc.check("The mileage stated EXCEEDS the odometer's mechanical limits.", od === "exceeds");
    doc.check("WARNING — the odometer reading is NOT the actual mileage of the vehicle.", od === "notActual");
  } else if (type === "boat") {
    doc.p("The Seller sells and transfers to the Buyer the following watercraft:");
    doc.kv("Year / Make / Model", `${str(d.bYear)} ${str(d.bMake)} ${str(d.bModel)}`.trim());
    doc.kv("Hull ID (HIN)", str(d.bHin));
    if (d.bLength) doc.kv("Length", `${str(d.bLength)} ft`);
    if (d.bRegistration) doc.kv("Registration #", str(d.bRegistration));
  } else {
    doc.p("The Seller sells and transfers to the Buyer the following personal property:");
    doc.p(str(d.gDescription));
    if (d.gSerial) doc.kv("Serial number", str(d.gSerial));
  }

  doc.h2("3. Consideration");
  doc.p(`In consideration of the sum of $${Number(d.salePrice || 0).toLocaleString()} USD paid by ${paymentMethodLabel(str(d.paymentMethod))}, the receipt and sufficiency of which are acknowledged, the Seller hereby transfers all right, title, and interest in the above property to the Buyer.`);

  doc.h2("4. Warranty");
  if (str(d.warranty) === "asIs") {
    doc.p("AS-IS. The property is sold in its present condition, WITHOUT ANY WARRANTY of any kind, express or implied, including without limitation any implied warranty of merchantability or fitness for a particular purpose. Buyer accepts the property with all faults.");
  } else {
    doc.p(`Limited warranty. Seller provides the following limited warranty: ${str(d.warrantyTerms) || "___"}. Except as expressly stated, all other warranties are disclaimed.`);
  }

  doc.h2("5. Governing Law");
  doc.p(`This Bill of Sale is governed by the laws of the State of ${str(d.saleState) || "___"}.`);

  doc.h2("Signatures");
  doc.kv("Seller — signed (typed)", str(d.sellerSignature));
  doc.kv("Date", formatDate(str(d.sellerSignDate)));
  doc.gap(4);
  doc.kv("Buyer — signed (typed)", str(d.buyerSignature));
  doc.kv("Date", formatDate(str(d.buyerSignDate)));

  doc.footer("This Bill of Sale template was generated by legallyspoken.com. Some states require additional forms for vehicle title transfers (e.g., DMV title assignment, smog certificates). Verify state DMV requirements before finalizing.");
}

function paymentMethodLabel(v: string): string {
  switch (v) {
    case "cash": return "cash";
    case "check": return "personal check";
    case "cashiers": return "cashier's check or money order";
    case "wire": return "wire transfer";
    default: return "other means";
  }
}

// ---------------------------------------------------------------------------
// Eviction Notice
// ---------------------------------------------------------------------------

function renderEvictionNotice(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  const stateAbbr = str(d.state).toUpperCase();
  const reason = (str(d.reason) || "nonpayment") as EvictionReason;
  const rule = getEvictionRule(stateAbbr);
  const entry = rule[reason];
  const noticeDate = str(d.noticeDate);
  const computedVacate = computeVacateBy(noticeDate, entry);
  const vacateBy = d.overrideVacateBy && d.vacateByOverride ? str(d.vacateByOverride) : computedVacate;

  doc.h1(entry.noticeName.toUpperCase());
  doc.p(`Served pursuant to ${rule.statuteRef || "state landlord-tenant law"}.`, { muted: true, size: 9 });
  doc.rule();

  doc.h3("TO:");
  doc.p(`${str(d.tenantNames) || "___"}`);
  doc.p(`Residing at: ${str(d.propertyAddress).replace(/\n/g, ", ")}`);

  doc.h3("FROM:");
  doc.p(`${str(d.landlordName) || "___"}${d.landlordBusiness ? ` (${str(d.landlordBusiness)})` : ""}`);
  doc.p(`${str(d.landlordAddress).replace(/\n/g, ", ")}${d.landlordPhone ? ` · ${str(d.landlordPhone)}` : ""}`);

  doc.gap(6);
  doc.h2("Notice");

  const bodyByReason: Record<EvictionReason, string> = {
    nonpayment: `YOU ARE HEREBY NOTIFIED that rent in the amount of $${Number(d.amountPastDue || 0).toLocaleString()} is now past due and owing for the period of ${str(d.periodCovered) || "___"}${d.lateFees ? ` (plus $${Number(d.lateFees).toLocaleString()} in late fees and other charges)` : ""}. WITHIN ${entry.days} ${entry.unit.toUpperCase()} DAY(S) after service of this notice you must either (1) pay the total amount owed in full, or (2) surrender possession of the premises. Failure to do so will result in legal proceedings for possession, damages, and costs.`,
    curableViolation: `YOU ARE HEREBY NOTIFIED that you have violated the terms of your lease as follows: ${str(d.violationDescription) || "___"}${d.leaseClause ? ` (see lease clause ${str(d.leaseClause)})` : ""}. WITHIN ${entry.days} ${entry.unit.toUpperCase()} DAY(S) after service of this notice you must cure the violation by: ${str(d.cureAction) || "___"}. Failure to cure will result in termination of your tenancy and legal proceedings for possession.`,
    nonCurable: `YOU ARE HEREBY NOTIFIED that you have materially breached the lease as follows: ${str(d.violationDescription) || "___"}${d.leaseClause ? ` (see lease clause ${str(d.leaseClause)})` : ""}. Because this breach is not curable, your tenancy is hereby TERMINATED. You must surrender possession of the premises WITHIN ${entry.days} ${entry.unit.toUpperCase()} DAY(S) after service of this notice.`,
    endOfTenancy: `YOU ARE HEREBY NOTIFIED that your ${str(d.tenancyType) === "fixed" ? "fixed-term tenancy is ending and will not be renewed" : "month-to-month tenancy is being terminated"}. You must surrender possession of the premises WITHIN ${entry.days} ${entry.unit.toUpperCase()} DAY(S) after service of this notice.`,
    illegal: `YOU ARE HEREBY NOTIFIED that you are alleged to have engaged in illegal activity or serious nuisance on the premises, specifically: ${str(d.violationDescription) || "___"}. Your tenancy is hereby TERMINATED without opportunity to cure. You must surrender possession of the premises WITHIN ${entry.days} ${entry.unit.toUpperCase()} DAY(S) after service of this notice.`,
  };
  doc.p(bodyByReason[reason]);

  doc.gap(6);
  doc.h3("VACATE BY:");
  doc.p(vacateBy ? formatDate(vacateBy).toUpperCase() : "___________", { size: 14 });
  if (d.overrideVacateBy) doc.p("(Manually overridden by landlord)", { muted: true, size: 9 });

  doc.gap(6);
  doc.p("If you have any legal questions, you should consult a landlord-tenant attorney or your local legal aid office promptly. This notice does not waive any right the Landlord may have to seek possession, unpaid rent, damages, or other relief permitted by law.", { size: 9, muted: true });

  doc.h2("Certificate of Service");
  const method = str(d.serviceMethod);
  const methodLabel =
    method === "personal" ? "personally delivering it to the tenant"
      : method === "postMail" ? "posting a copy on the door of the premises AND mailing a copy by first-class mail"
      : method === "certified" ? "sending by certified mail, return receipt requested"
      : method === "substituted" ? "leaving a copy with an adult occupant at the premises"
      : "___";
  doc.p(`I, ${str(d.serverName) || "___"}, certify that on ${formatDate(str(d.serverDate))} I served this notice on the above-named tenant(s) by ${methodLabel}.`);
  doc.gap(4);
  doc.kv("Server signature (typed)", str(d.serverSignature));
  doc.kv("Date", formatDate(str(d.serverDate)));

  doc.footer("This eviction notice was generated by legallyspoken.com from your inputs. State and local law strictly govern eviction procedures — improper notice can void the eviction. Consult a landlord-tenant attorney before serving, and check local rent-control ordinances that may extend timing.");
}



function entityLabel(v: string): string {
  switch (v) {
    case "individual": return "an individual";
    case "llc": return "a limited liability company";
    case "corp": return "a corporation";
    case "partnership": return "a partnership";
    default: return "an entity";
  }
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

// ---------------------------------------------------------------------------
// Demand Letter / Collection Letter
// ---------------------------------------------------------------------------

function renderDemandLetter(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  const responseDays = Number(d.responseDays) || 14;
  const amount = Number(d.amountOwed) || 0;
  const typeLabel: Record<string, string> = {
    unpaidInvoice: "OUTSTANDING BALANCE — FORMAL DEMAND FOR PAYMENT",
    breach: "BREACH OF CONTRACT — FORMAL DEMAND",
    securityDeposit: "DEMAND FOR RETURN OF SECURITY DEPOSIT",
    propertyDamage: "DEMAND FOR PAYMENT OF PROPERTY DAMAGE",
    other: "FORMAL DEMAND LETTER",
  };
  const re = typeLabel[str(d.letterType)] || "FORMAL DEMAND LETTER";

  // Sender letterhead
  const senderLine1 = d.senderType === "business" && d.senderBusiness ? str(d.senderBusiness) : str(d.senderName);
  doc.h3(senderLine1);
  if (d.senderType === "business" && d.senderBusiness && d.senderName) {
    doc.p(`${str(d.senderName)}${d.senderRole ? `, ${str(d.senderRole)}` : ""}`, { size: 9, muted: true });
  }
  doc.p(str(d.senderAddress).replace(/\n/g, ", "), { size: 9, muted: true });
  const contact = [str(d.senderPhone), str(d.senderEmail)].filter(Boolean).join(" · ");
  if (contact) doc.p(contact, { size: 9, muted: true });
  doc.gap(8);
  doc.p(formatDate(str(d.letterDate)));
  doc.gap(4);
  doc.p("VIA CERTIFIED MAIL AND FIRST-CLASS MAIL", { size: 9, muted: true });
  doc.gap(4);

  // Recipient
  doc.p(str(d.recipientName));
  doc.p(str(d.recipientAddress).replace(/\n/g, ", "));
  if (d.recipientAttorney) doc.p(`c/o ${str(d.recipientAttorney)}, Esq.`);
  doc.gap(6);
  doc.h3(`RE:  ${re}`);
  if (amount) doc.p(`Amount in controversy: $${amount.toLocaleString()}`, { size: 10, muted: true });
  doc.rule();

  // Salutation & body
  doc.p(`Dear ${str(d.recipientName) || "Sir/Madam"}:`);
  doc.gap(4);

  // Paragraph 1 — background
  doc.p(`This letter constitutes formal written demand relating to the following matter: ${str(d.background) || "___"}${d.originalDueDate ? ` The obligation became due on ${formatDate(str(d.originalDueDate))}.` : ""}`);

  // Paragraph 2 — prior attempts
  if (d.priorAttempts) {
    doc.gap(4);
    doc.p(`Despite prior efforts to resolve this matter — ${str(d.priorAttempts)} — the amount remains outstanding.`);
  }

  // Paragraph 3 — amount
  doc.gap(4);
  doc.p(`As of the date of this letter, the total amount owed is $${amount.toLocaleString()}${d.interestRate ? `, plus interest accruing at ${str(d.interestRate)}% per annum` : ""}${d.additionalDamages ? `, plus additional damages as follows: ${str(d.additionalDamages)}` : ""}.`);

  // Paragraph 4 — demand
  doc.gap(4);
  doc.p(`DEMAND IS HEREBY MADE that you remit the full amount owed WITHIN ${responseDays} DAYS of your receipt of this letter. Acceptable payment methods: ${str(d.paymentMethods) || "as agreed"}.`);

  // Paragraph 5 — consequences
  const consequences: string[] = [];
  if (d.conFileSuit) consequences.push("commence a civil action for recovery of the amount owed, plus interest and costs");
  if (d.conAttorneyFees) consequences.push("seek attorney's fees and costs where permitted by contract or statute");
  if (d.conCollections) consequences.push("refer this matter to a collection agency");
  if (d.conCreditReport) consequences.push("report the delinquency to credit reporting agencies where lawful");
  if (consequences.length > 0) {
    doc.gap(4);
    doc.p(`Should you fail to comply with this demand within the time stated, I reserve the right to, without further notice, ${consequences.join("; ")}.`);
  }

  // FDCPA
  if (d.isConsumerDebtCollector && d.fdcpaAck) {
    doc.gap(6);
    doc.p("This is an attempt to collect a debt. Any information obtained will be used for that purpose. Unless you notify this office within thirty (30) days after receiving this notice that you dispute the validity of this debt, or any portion thereof, this office will assume the debt is valid.", { size: 9 });
  }

  // Governing law
  if (d.governingState) {
    doc.gap(4);
    doc.p(`This matter is governed by the laws of the State of ${str(d.governingState)}.`, { size: 10, muted: true });
  }

  // Closing
  doc.gap(8);
  doc.p("This letter is sent without prejudice to any of my rights or remedies, all of which are expressly reserved. I hope to resolve this matter without resorting to litigation.");
  doc.gap(6);
  doc.p("Sincerely,");
  doc.gap(16);
  doc.p(str(d.senderSignature) || str(d.senderName));
  if (d.senderType === "business" && d.senderRole) doc.p(str(d.senderRole), { size: 9, muted: true });
  doc.kv("Date", formatDate(str(d.senderSignDate)));

  doc.footer("This demand letter was generated by legallyspoken.com from your inputs. It is a self-help template, not legal advice. Send by certified mail with return receipt, keep a copy, and consult a licensed attorney before filing suit. Third-party debt collectors must comply with the federal Fair Debt Collection Practices Act (FDCPA).");
}

// ---------------------------------------------------------------------------
// Promissory Note
// ---------------------------------------------------------------------------

function renderPromissoryNote(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  const principal = Number(d.principal) || 0;
  const apr = Number(d.apr) || 0;
  const interestType = str(d.interestType);
  const structure = str(d.repaymentStructure);
  const installAmt = Number(d.installmentAmount) || 0;
  const numPmts = Number(d.numberOfPayments) || 0;
  const totalRepay = structure === "installments" ? installAmt * numPmts : 0;

  doc.h1("PROMISSORY NOTE");
  doc.p(`Principal amount: $${principal.toLocaleString()} USD  ·  Effective ${formatDate(str(d.disbursementDate))}  ·  Governed by the laws of ${str(d.governingState) || "___"}.`, { size: 10, muted: true });
  doc.rule();

  doc.p(`FOR VALUE RECEIVED, the undersigned, ${str(d.borrowerName) || "___"} of ${str(d.borrowerAddress).replace(/\n/g, ", ")} ("Borrower"), promises to pay to the order of ${str(d.lenderName) || "___"} of ${str(d.lenderAddress).replace(/\n/g, ", ")} ("Lender"), the principal sum of $${principal.toLocaleString()} USD, together with interest thereon as set forth below, on the terms and conditions of this Promissory Note.`);

  if (d.purpose) {
    doc.gap(4);
    doc.p(`Purpose of loan: ${str(d.purpose)}`, { size: 10, muted: true });
  }

  doc.h2("1. Interest");
  if (interestType === "none") {
    doc.p("This Note shall bear NO interest. The Borrower shall repay only the principal amount.");
  } else if (interestType === "simple") {
    doc.p(`Interest shall accrue on the outstanding principal balance at the simple annual rate of ${apr}% per annum.`);
  } else if (interestType === "compound") {
    doc.p(`Interest shall accrue on the outstanding principal balance at the annual rate of ${apr}%, compounded ${str(d.compoundingFrequency) || "monthly"}.`);
  }
  if (apr > 10) {
    doc.p("NOTICE: The stated interest rate exceeds 10% per annum. State usury statutes may cap the enforceable rate on private loans. Verify the applicable limit in the governing state before signing.", { size: 9, muted: true });
  }

  doc.h2("2. Repayment");
  if (structure === "lumpSum") {
    doc.p(`Borrower shall pay the entire outstanding principal balance, together with all accrued and unpaid interest, in a single payment on ${formatDate(str(d.maturityDate))} (the "Maturity Date").`);
  } else if (structure === "installments") {
    doc.p(`Borrower shall repay this Note in ${numPmts} ${str(d.installmentFrequency) || "monthly"} installments of $${installAmt.toLocaleString()} each, beginning on ${formatDate(str(d.firstPaymentDate))} and continuing on the same day of each ${str(d.installmentFrequency) === "weekly" ? "week" : str(d.installmentFrequency) === "biweekly" ? "two weeks" : str(d.installmentFrequency) === "quarterly" ? "quarter" : "month"} until paid in full.`);
    if (totalRepay > 0) {
      doc.p(`Total scheduled payments: $${totalRepay.toLocaleString()} (approximate; may differ from principal + interest depending on rounding and prepayments).`, { size: 9, muted: true });
    }
  } else if (structure === "onDemand") {
    doc.p("The entire outstanding balance, principal and accrued interest, shall be due and payable upon written demand by the Lender.");
  }

  doc.h2("3. Late Payment");
  const lft = str(d.lateFeeType);
  const grace = str(d.graceDays) || "0";
  if (lft === "flat" && d.lateFeeAmount) {
    doc.p(`If any payment is not received within ${grace} days of its due date, Borrower shall pay a late fee of $${str(d.lateFeeAmount)}.`);
  } else if (lft === "percent" && d.lateFeePercent) {
    doc.p(`If any payment is not received within ${grace} days of its due date, Borrower shall pay a late fee equal to ${str(d.lateFeePercent)}% of the past-due amount.`);
  } else {
    doc.p("No specific late fee is imposed by this Note.");
  }

  doc.h2("4. Acceleration");
  if (d.acceleration) {
    doc.p("Upon any default in payment or other breach of this Note, the entire unpaid principal balance, together with all accrued interest, shall become immediately due and payable at the option of the Lender, without further notice or demand.");
  } else {
    doc.p("The parties have not elected an acceleration clause. Remedies for default are limited to those available at law.");
  }

  doc.h2("5. Prepayment");
  doc.p(d.prepaymentAllowed
    ? "Borrower may prepay all or any portion of the principal at any time, without premium or penalty. Prepayments shall be applied first to accrued interest and then to principal."
    : "Prepayment is permitted only with the Lender's prior written consent.");

  doc.h2("6. Security");
  if (str(d.collateralType) === "secured") {
    doc.p(`This Note is SECURED by the following collateral: ${str(d.collateralDescription) || "___"}.`);
    if (d.ucc1Ack) doc.p("Lender may, at its option, file a UCC-1 financing statement to perfect its security interest in the collateral.", { size: 10 });
  } else {
    doc.p("This Note is UNSECURED. It is not backed by collateral, and the Lender's remedies for default are limited to those available at law.");
  }

  doc.h2("7. Governing Law & Venue");
  doc.p(`This Note shall be governed by, and construed in accordance with, the laws of the State of ${str(d.governingState) || "___"}, without regard to its conflict-of-laws principles.`);

  doc.h2("8. Waiver of Presentment");
  doc.p("Borrower, and each surety, endorser, and guarantor of this Note, hereby waives presentment for payment, demand, notice of dishonor, protest, and notice of protest, and agrees to remain bound notwithstanding any extension, renewal, or modification.");

  doc.h2("9. Severability & Entire Agreement");
  doc.p("If any provision of this Note is held invalid or unenforceable, the remaining provisions shall continue in full force. This Note constitutes the entire agreement of the parties with respect to the loan and supersedes any prior discussions.");

  doc.h2("Signatures");
  doc.kv("Borrower — signed (typed)", str(d.borrowerSignature));
  doc.kv("Date", formatDate(str(d.borrowerSignDate)));
  if (d.lenderSignature) {
    doc.gap(4);
    doc.kv("Lender — signed (typed)", str(d.lenderSignature));
    doc.kv("Date", formatDate(str(d.lenderSignDate)));
  }
  if (d.hasCosigner) {
    doc.gap(4);
    doc.h3("Co-Signer / Guarantor");
    doc.p(`${str(d.cosignerName)} of ${str(d.cosignerAddress).replace(/\n/g, ", ")}, hereby guarantees the full and prompt payment of this Note and waives notice of default.`);
    doc.kv("Co-signer — signed (typed)", str(d.cosignerSignature));
    doc.kv("Date", formatDate(str(d.cosignerSignDate)));
  }
  if (d.notarize) {
    doc.gap(6);
    doc.h3("Notary Acknowledgment");
    doc.p(`State of ${str(d.governingState) || "___"}, County of ______________________.`);
    doc.p(`On this ____ day of ____________, 20____, before me personally appeared ${str(d.borrowerName) || "___"}, known to me (or satisfactorily proven) to be the person whose name is subscribed to this Note, and acknowledged that he/she executed it for the purposes therein contained.`, { size: 9 });
    doc.gap(10);
    doc.p("_______________________________________________", { muted: true });
    doc.p("Notary Public — signature and seal", { muted: true, size: 9 });
  }

  doc.footer("This Promissory Note was generated by legallyspoken.com from your inputs. State usury laws cap enforceable interest rates on private loans and vary widely — verify the limit in the governing state. This is not legal advice; consult a licensed attorney before signing, especially for loans secured by real property (which typically require a separate mortgage or deed of trust).");
}

// ---------------------------------------------------------------------------
// Release of Liability / Waiver
// ---------------------------------------------------------------------------

function renderReleaseOfLiability(ctx: DocCtx) {
  const d = ctx.data;
  const doc = buildDoc(ctx);
  const isMinor = Boolean(d.isMinor);
  const isPostIncident = str(d.waiverType) === "postIncident";

  doc.h1("RELEASE OF LIABILITY, WAIVER OF CLAIMS,");
  doc.h1("AND ASSUMPTION OF RISK");
  doc.p(`Effective ${formatDate(str(d.activityDate))}  ·  Governed by the laws of the State of ${str(d.governingState) || "___"}.`, { size: 10, muted: true });
  doc.rule();

  doc.p(`THIS RELEASE ("Release") is entered into by and between ${str(d.releasorName) || "___"} ("Releasor"), of ${str(d.releasorAddress).replace(/\n/g, ", ")}, and ${str(d.releaseeName) || "___"} ("Releasee"), of ${str(d.releaseeAddress).replace(/\n/g, ", ")}.`);

  doc.h2("1. Activity / Subject Matter");
  doc.p(`Releasee's business or activity: ${str(d.releaseeBusinessDescription) || "___"}.`);
  doc.p(`${isPostIncident ? "Incident" : "Activity"} description: ${str(d.activityDescription) || "___"}.`);
  doc.p(`Location: ${str(d.activityLocation) || "___"}.`);
  doc.p(`Date${d.activityEndDate ? "s" : ""}: ${formatDate(str(d.activityDate))}${d.activityEndDate ? ` through ${formatDate(str(d.activityEndDate))}` : ""}.`);

  doc.h2("2. Consideration");
  doc.p(d.consideration
    ? `In consideration of $${Number(d.consideration).toLocaleString()} and the mutual promises herein, the receipt and sufficiency of which are acknowledged, the parties agree as follows:`
    : "In consideration of the opportunity to participate in the activity described above, and the mutual promises herein, the receipt and sufficiency of which are acknowledged, the parties agree as follows:");

  doc.h2("3. Assumption of Risk");
  doc.p(`Releasor understands and acknowledges that the activity involves known and unknown risks, including but not limited to: ${str(d.knownRisks) || "___"}. Releasor VOLUNTARILY ASSUMES all such risks, whether known or unknown, and accepts full responsibility for any resulting injury, damage, loss, or expense.`);

  doc.h2("4. Release and Waiver of Claims");
  doc.p("Releasor, on behalf of Releasor and Releasor's heirs, executors, administrators, and assigns, hereby RELEASES, WAIVES, DISCHARGES, and COVENANTS NOT TO SUE the Releasee, and Releasee's officers, directors, employees, agents, and volunteers, from any and all claims, demands, causes of action, and liabilities of any kind, whether known or unknown, arising out of or related to the activity described above.");

  doc.h2("5. Indemnification");
  doc.p("Releasor agrees to INDEMNIFY, DEFEND, and HOLD HARMLESS the Releasee from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from Releasor's participation in the activity, or brought by any third party on Releasor's behalf.");

  doc.h2("6. Acknowledgments");
  doc.check("Releasor has read and understands this Release in its entirety.", Boolean(d.ackRead));
  doc.check("Releasor voluntarily assumes all risks, known and unknown.", Boolean(d.ackAssume));
  doc.check("Releasor releases, waives, and discharges the Releasee from all claims.", Boolean(d.ackRelease));
  doc.check("Releasor agrees to indemnify and hold harmless the Releasee.", Boolean(d.ackIndemnify));
  doc.check(`Releasor agrees this Release is governed by the laws of ${str(d.governingState) || "___"}.`, Boolean(d.ackGoverning));

  doc.h2("7. Severability");
  doc.p("If any provision of this Release is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.");

  doc.h2("8. Governing Law");
  doc.p(`This Release is governed by the laws of the State of ${str(d.governingState) || "___"}. The parties consent to venue and jurisdiction in that state's courts for any dispute arising under this Release.`);

  doc.h2("Signatures");
  doc.p("BY SIGNING BELOW, THE RELEASOR ACKNOWLEDGES HAVING READ THIS RELEASE, UNDERSTANDING ITS TERMS, AND VOLUNTARILY AGREEING TO BE BOUND BY IT.", { size: 9, muted: true });
  doc.gap(4);
  doc.kv("Releasor — signed (typed)", str(d.releasorSignature));
  doc.kv("Date", formatDate(str(d.releasorSignDate)));

  if (isMinor) {
    doc.gap(6);
    doc.h3("Parent / Guardian Consent (Releasor is a minor)");
    doc.p(`I, ${str(d.guardianName) || "___"}, being the ${str(d.guardianRelationship) || "parent or legal guardian"} of the above-named minor Releasor, have read and understood this Release. I consent to the minor's participation in the activity and agree, on behalf of myself and the minor, to be bound by all terms of this Release, including the release, waiver, and indemnification provisions.`);
    doc.gap(2);
    doc.kv("Parent / guardian — signed (typed)", str(d.guardianSignature));
    doc.kv("Date", formatDate(str(d.guardianSignDate)));
  }

  if (d.witnessName || d.witnessSignature) {
    doc.gap(6);
    doc.h3("Witness");
    doc.kv("Witness — name", str(d.witnessName));
    doc.kv("Witness — signed (typed)", str(d.witnessSignature));
    doc.kv("Date", formatDate(str(d.witnessSignDate)));
  }

  if (d.emergencyContactName) {
    doc.gap(6);
    doc.p(`Emergency contact: ${str(d.emergencyContactName)}${d.emergencyContactPhone ? ` · ${str(d.emergencyContactPhone)}` : ""}.`, { size: 9, muted: true });
  }

  doc.footer("This waiver was generated by legallyspoken.com from your inputs. Enforceability of pre-injury liability waivers varies by state — Louisiana, Virginia, and Montana broadly restrict them, and courts elsewhere will not enforce waivers of gross negligence, recklessness, or intentional harm. This is not legal advice; consult a licensed attorney for high-risk activities or commercial use.");
}

