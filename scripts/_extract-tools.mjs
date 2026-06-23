// Regex extractor for src/data/tools.ts → /tmp/tools-source.json
// Avoids importing the file (which needs lucide-react + React stack).
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("src/data/tools.ts", "utf8");

// Strip everything before "export const categories" and after the final "];" of tools array.
function sliceBetween(text, startMarker, endMarker, startIndex = 0) {
  const s = text.indexOf(startMarker, startIndex);
  if (s === -1) throw new Error(`marker not found: ${startMarker}`);
  const e = text.indexOf(endMarker, s);
  if (e === -1) throw new Error(`end marker not found: ${endMarker}`);
  return { start: s, end: e + endMarker.length, body: text.slice(s, e + endMarker.length) };
}

// Manually parse arrays of objects with known fields.
// Each object: scan brace depth.
function extractObjects(arrayBody) {
  // Find first "[" and last "]"
  const open = arrayBody.indexOf("[");
  const close = arrayBody.lastIndexOf("]");
  const inside = arrayBody.slice(open + 1, close);
  const objs = [];
  let depth = 0;
  let start = -1;
  let inStr = false;
  let strCh = "";
  let escape = false;
  for (let i = 0; i < inside.length; i++) {
    const c = inside[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (c === "\\") { escape = true; continue; }
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = true; strCh = c; continue; }
    if (c === "{") { if (depth === 0) start = i; depth++; }
    else if (c === "}") { depth--; if (depth === 0 && start !== -1) { objs.push(inside.slice(start, i + 1)); start = -1; } }
  }
  return objs;
}

function unquote(s) {
  // Drop surrounding quotes and unescape standard sequences for "..." or '...' or `...`.
  const q = s[0];
  const body = s.slice(1, -1);
  if (q === "`") return body.replace(/\\`/g, "`").replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
  // single/double quoted: handle \n, \t, \", \', \\
  return body
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "\r")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\");
}

function getField(objBody, field) {
  // Match: field: "string" | 'string' | `string` (single value, top-level)
  // Use a state machine to skip nested arrays/objects.
  // Look for the field at brace depth 0 (relative to objBody, which starts with {)
  let depth = 0;
  let inStr = false;
  let strCh = "";
  let escape = false;
  for (let i = 0; i < objBody.length; i++) {
    const c = objBody[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (c === "\\") { escape = true; continue; }
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = true; strCh = c; continue; }
    if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") depth--;
    if (depth === 1) {
      // Check for field name starting here
      const rest = objBody.slice(i);
      const m = rest.match(new RegExp(`^${field}:\\s*`));
      if (m) {
        const valStart = i + m[0].length;
        const ch = objBody[valStart];
        if (ch === '"' || ch === "'" || ch === "`") {
          // find matching close quote
          let j = valStart + 1;
          let esc = false;
          while (j < objBody.length) {
            const cj = objBody[j];
            if (esc) { esc = false; j++; continue; }
            if (cj === "\\") { esc = true; j++; continue; }
            if (cj === ch) break;
            j++;
          }
          return unquote(objBody.slice(valStart, j + 1));
        }
      }
    }
  }
  return null;
}

function getFaqs(objBody) {
  // find "faqs:" at depth 1, then collect the array body
  let depth = 0;
  let inStr = false;
  let strCh = "";
  let escape = false;
  for (let i = 0; i < objBody.length; i++) {
    const c = objBody[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (c === "\\") { escape = true; continue; }
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = true; strCh = c; continue; }
    if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") depth--;
    if (depth === 1) {
      const rest = objBody.slice(i);
      const m = rest.match(/^faqs:\s*\[/);
      if (m) {
        const arrStart = i + m[0].length - 1; // at [
        // find matching ]
        let d = 0, j = arrStart, sIn = false, sC = "", esc2 = false;
        for (; j < objBody.length; j++) {
          const cj = objBody[j];
          if (sIn) {
            if (esc2) { esc2 = false; continue; }
            if (cj === "\\") { esc2 = true; continue; }
            if (cj === sC) sIn = false;
            continue;
          }
          if (cj === '"' || cj === "'" || cj === "`") { sIn = true; sC = cj; continue; }
          if (cj === "[") d++;
          else if (cj === "]") { d--; if (d === 0) break; }
        }
        const arrBody = objBody.slice(arrStart, j + 1);
        // Parse FAQ objects inside
        const faqObjs = extractObjects(arrBody);
        return faqObjs.map((fo) => ({
          question: getField(fo, "question") ?? "",
          answer: getField(fo, "answer") ?? "",
        }));
      }
    }
  }
  return [];
}

// Slice categories
const catSlice = sliceBetween(src, "export const categories", "];");
const catObjs = extractObjects(catSlice.body);
const categories = catObjs.map((o) => ({
  id: getField(o, "id"),
  label: getField(o, "label"),
  description: getField(o, "description"),
}));

// Slice tools (start right after categories slice end)
const toolSlice = sliceBetween(src, "export const tools", "];", catSlice.end);
const toolObjs = extractObjects(toolSlice.body);
const tools = toolObjs.map((o) => ({
  id: getField(o, "id"),
  category: getField(o, "category"),
  name: getField(o, "name"),
  description: getField(o, "description"),
  shortDescription: getField(o, "shortDescription"),
  categoryLabel: getField(o, "categoryLabel"),
  faqs: getFaqs(o),
}));

writeFileSync("/tmp/tools-source.json", JSON.stringify({ categories, tools }, null, 2));
console.log(`categories: ${categories.length}, tools: ${tools.length}`);
console.log(`tools with faqs: ${tools.filter((t) => t.faqs.length > 0).length}`);
console.log(`first tool faqs:`, tools[0].faqs.length, "items");
