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
  } else if (form.pdfTemplate === "w4") {
    renderW4({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "i9") {
    renderI9({ pdfDoc, font, fontBold, data, watermark });
  } else if (form.pdfTemplate === "nda") {
    renderNda({ pdfDoc, font, fontBold, data, watermark });
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
