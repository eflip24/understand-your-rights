#!/usr/bin/env node
// Externalize <Button> text, <Label> text, and Textarea/Input placeholder="..."
// into per-tool internals.<toolId>.{buttons,labels,placeholders}.<slug> keys
// in src/i18n/locales/en/tools.json, then rewrite each component to use t().
// Shared strings (Calculate, State, Amount ($), etc.) map to common:actions.* /
// common:fields.* instead of creating tool-specific keys.
//
// Uses a proper JSX opening-tag scanner that tracks brace depth so that
// attributes containing `>` (e.g. `onClick={() => ...}`) are handled correctly.

import fs from "node:fs";
import path from "node:path";

const DIR = "src/components/tools";
const TOOLS_JSON = "src/i18n/locales/en/tools.json";

const SHARED_ACTIONS = {
  "Calculate": "calculate", "Reset": "reset", "Copy": "copy", "Copied!": "copied",
  "Download": "download", "Analyze": "analyze", "Detect": "detect",
  "Generate": "generate", "Check": "check", "Estimate": "estimate",
  "Count": "count", "Clear": "clear", "Look Up": "lookUp",
  "Analyzing…": "analyzing", "Analyzing...": "analyzing",
  "Loading…": "loading", "Loading...": "loading",
};
const SHARED_FIELDS = {
  "State": "state", "Amount ($)": "amount", "Date": "date",
  "Your name": "name", "Email": "email",
  "Monthly income ($)": "monthlyIncome", "Annual wages ($)": "annualWages",
  "Results": "results", "Words": "words", "Characters": "characters",
  "Sentences": "sentences", "Paragraphs": "paragraphs",
  "Minutes": "minutes", "Seconds": "seconds",
};
const SHARED_PLACEHOLDERS = {
  "Paste your text here…": "yourText", "Paste your text here...": "yourText",
  "Paste your contract text here…": "contractText",
  "Paste your contract text here...": "contractText",
};

const decap = s => s ? s[0].toLowerCase() + s.slice(1) : s;
const toolIdFromFile = base => decap(base.replace(/\.tsx$/, ""));
function slug(s) {
  const words = s
    .replace(/&/g, " and ")
    .replace(/\$/g, " dollar ")
    .replace(/%/g, " percent ")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 6);
  if (!words.length) return "text";
  const out = words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
  return out.replace(/^([0-9])/, "n$1");
}
const q = s => JSON.stringify(s);

/**
 * Scan an opening JSX tag starting at position `start` (which must point at '<').
 * Returns { attrsStart, attrsEnd, tagEnd } where the tag characters span
 * [start, tagEnd) and the raw attributes span [attrsStart, attrsEnd).
 * Tracks depth in `{...}`, `"..."`, `'...'` so `>` inside expressions is ignored.
 * Returns null on parse failure or self-closing tag.
 */
function scanOpenTag(src, start, tagName) {
  // Expect '<' + tagName followed by whitespace, '/', or '>'
  const prefix = "<" + tagName;
  if (!src.startsWith(prefix, start)) return null;
  const next = src[start + prefix.length];
  if (next && !/[\s/>]/.test(next)) return null;
  const attrsStart = start + prefix.length;
  let i = attrsStart;
  let braceDepth = 0;
  let inStr = null;
  while (i < src.length) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") { i += 2; continue; }
      if (c === inStr) inStr = null;
    } else if (c === '"' || c === "'" || c === "`") {
      inStr = c;
    } else if (c === "{") {
      braceDepth++;
    } else if (c === "}") {
      braceDepth--;
    } else if (c === ">" && braceDepth === 0) {
      // self-closing check
      if (src[i - 1] === "/") return null;
      return { attrsStart, attrsEnd: i, tagEnd: i + 1 };
    }
    i++;
  }
  return null;
}

/** Find matching </tagName> for the innermost pair, tracking nesting. */
function findClose(src, from, tagName) {
  const openRe = new RegExp(`<${tagName}\\b`, "g");
  const closeRe = new RegExp(`</${tagName}>`, "g");
  let depth = 1;
  let i = from;
  while (i < src.length) {
    openRe.lastIndex = i;
    closeRe.lastIndex = i;
    const nextOpen = openRe.exec(src);
    const nextClose = closeRe.exec(src);
    if (!nextClose) return -1;
    if (nextOpen && nextOpen.index < nextClose.index) {
      depth++;
      i = nextOpen.index + nextOpen[0].length;
    } else {
      depth--;
      if (depth === 0) return nextClose.index;
      i = nextClose.index + nextClose[0].length;
    }
  }
  return -1;
}

/**
 * Rewrite plain-text <Tag ...>TEXT</Tag> matches in `src`.
 * `handle(text, attrsText)` should return replacement inner (string) or null to skip.
 * Returns { src, changed }.
 */
function rewriteTag(src, tagName, handle) {
  let out = "";
  let cursor = 0;
  const scanRe = new RegExp(`<${tagName}\\b`, "g");
  let m;
  while ((m = scanRe.exec(src))) {
    const start = m.index;
    if (start < cursor) continue;
    const open = scanOpenTag(src, start, tagName);
    if (!open) continue;
    const innerStart = open.tagEnd;
    const innerEnd = findClose(src, innerStart, tagName);
    if (innerEnd < 0) continue;
    const inner = src.slice(innerStart, innerEnd);
    const trimmed = inner.trim();
    // Skip if empty, is a JSX expression, or contains any nested tag
    if (!trimmed || trimmed.startsWith("{") || trimmed.includes("<")) {
      scanRe.lastIndex = innerEnd;
      continue;
    }
    const attrsText = src.slice(open.attrsStart, open.attrsEnd);
    const replacement = handle(trimmed, attrsText);
    if (replacement == null) {
      scanRe.lastIndex = innerEnd;
      continue;
    }
    // Emit unchanged prefix + opening tag + replacement + closing tag
    out += src.slice(cursor, innerStart) + replacement;
    const closeLen = tagName.length + 3; // </Tag>
    out += src.slice(innerEnd, innerEnd + closeLen);
    cursor = innerEnd + closeLen;
    scanRe.lastIndex = cursor;
  }
  out += src.slice(cursor);
  return { src: out, changed: out !== src };
}

const toolsJson = JSON.parse(fs.readFileSync(TOOLS_JSON, "utf8"));
toolsJson.internals = toolsJson.internals || {};

const files = fs.readdirSync(DIR).filter(f => f.endsWith(".tsx"));
let filesTouched = 0, keysAdded = 0;

for (const file of files) {
  const filePath = path.join(DIR, file);
  let src = fs.readFileSync(filePath, "utf8");
  const original = src;
  const toolId = toolIdFromFile(file);
  const bucket = toolsJson.internals[toolId] || {};
  const localUsed = new Set();
  let usedCommon = false, usedInternals = false;

  const ensureKey = (cat, text) => {
    bucket[cat] = bucket[cat] || {};
    for (const [k, v] of Object.entries(bucket[cat])) if (v === text) return k;
    let base = slug(text), key = base, n = 2;
    while (bucket[cat][key] !== undefined || localUsed.has(`${cat}.${key}`)) key = base + n++;
    bucket[cat][key] = text;
    localUsed.add(`${cat}.${key}`);
    keysAdded++;
    return key;
  };

  // Buttons
  ({ src } = rewriteTag(src, "Button", (text) => {
    if (SHARED_ACTIONS[text]) {
      usedCommon = true;
      return `{t(${q("common:actions." + SHARED_ACTIONS[text])})}`;
    }
    const key = ensureKey("buttons", text);
    usedInternals = true;
    return `{t(${q(`internals.${toolId}.buttons.${key}`)})}`;
  }));

  // Labels
  ({ src } = rewriteTag(src, "Label", (text) => {
    if (SHARED_FIELDS[text]) {
      usedCommon = true;
      return `{t(${q("common:fields." + SHARED_FIELDS[text])})}`;
    }
    const key = ensureKey("labels", text);
    usedInternals = true;
    return `{t(${q(`internals.${toolId}.labels.${key}`)})}`;
  }));

  // placeholder="..."
  src = src.replace(
    /\bplaceholder=(?:"([^"]+)"|'([^']+)')/g,
    (m, dq, sq) => {
      const text = dq ?? sq;
      if (!text) return m;
      if (SHARED_PLACEHOLDERS[text]) {
        usedCommon = true;
        return `placeholder={t(${q("common:fields." + SHARED_PLACEHOLDERS[text])})}`;
      }
      if (!/[A-Za-z]/.test(text)) return m;
      if (text.length < 3) return m;
      const key = ensureKey("placeholders", text);
      usedInternals = true;
      return `placeholder={t(${q(`internals.${toolId}.placeholders.${key}`)})}`;
    }
  );

  if (src === original) {
    if (Object.keys(bucket).length) toolsJson.internals[toolId] = bucket;
    continue;
  }

  if (usedCommon || usedInternals) {
    if (!/from ["']react-i18next["']/.test(src)) {
      const im = src.match(/^(import[^\n]*\n)+/m);
      if (im) src = src.slice(0, im.index + im[0].length)
        + `import { useTranslation } from "react-i18next";\n`
        + src.slice(im.index + im[0].length);
    }
    if (!/useTranslation\s*\(/.test(src)) {
      src = src.replace(
        /(export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{\s*\n)/,
        `$1  const { t } = useTranslation(["tools", "common"]);\n`
      );
    } else {
      src = src.replace(/useTranslation\(\s*"common"\s*\)/, `useTranslation(["tools", "common"])`);
      src = src.replace(/useTranslation\(\s*"tools"\s*\)/, `useTranslation(["tools", "common"])`);
    }
  }

  if (Object.keys(bucket).length) toolsJson.internals[toolId] = bucket;
  fs.writeFileSync(filePath, src);
  filesTouched++;
  console.log(`updated ${file}`);
}

const sorted = {};
for (const k of Object.keys(toolsJson.internals).sort()) sorted[k] = toolsJson.internals[k];
toolsJson.internals = sorted;

fs.writeFileSync(TOOLS_JSON, JSON.stringify(toolsJson, null, 2) + "\n");
console.log(`\nFiles updated: ${filesTouched}`);
console.log(`Internal keys added: ${keysAdded}`);
