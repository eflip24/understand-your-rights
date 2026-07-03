#!/usr/bin/env node
// Codemod: wire common.actions and common.fields i18n keys into remaining tool components.
// Only performs safe, exact-match replacements. Idempotent.
import fs from "node:fs";
import path from "node:path";

const DIR = "src/components/tools";

// action label => key (under actions.*)
const ACTIONS = {
  "Calculate": "calculate",
  "Reset": "reset",
  "Copy": "copy",
  "Copied!": "copied",
  "Download": "download",
  "Analyze": "analyze",
  "Detect": "detect",
  "Generate": "generate",
  "Check": "check",
  "Estimate": "estimate",
  "Count": "count",
  "Clear": "clear",
  "Look Up": "lookUp",
  "Analyzing…": "analyzing",
  "Analyzing...": "analyzing",
  "Loading…": "loading",
  "Loading...": "loading",
};

// Label content => key (under fields.*)
const FIELDS = {
  "State": "state",
  "Amount ($)": "amount",
  "Date": "date",
  "Your name": "name",
  "Email": "email",
  "Monthly income ($)": "monthlyIncome",
  "Annual wages ($)": "annualWages",
  "Results": "results",
};

// Textarea placeholder replacements
const PLACEHOLDERS = {
  "Paste your text here…": "yourText",
  "Paste your text here...": "yourText",
  "Paste your contract text here…": "contractText",
  "Paste your contract text here...": "contractText",
};

const files = fs.readdirSync(DIR).filter(f => f.endsWith(".tsx"));
let touched = 0;

for (const file of files) {
  const p = path.join(DIR, file);
  let src = fs.readFileSync(p, "utf8");
  const original = src;

  let usedAction = false;
  let usedField = false;
  let usedPlaceholder = false;

  // ACTIONS: <Button ...>Label</Button>  or  >Label</Button>
  for (const [label, key] of Object.entries(ACTIONS)) {
    // Between tag close and </Button> or </button>, allowing surrounding whitespace
    const esc = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`>\\s*${esc}\\s*</Button>`, "g");
    if (re.test(src)) {
      src = src.replace(re, `>{t("common:actions.${key}")}</Button>`);
      usedAction = true;
    }
  }

  // FIELDS: <Label>Text</Label>  (no props)
  for (const [label, key] of Object.entries(FIELDS)) {
    const esc = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`<Label>\\s*${esc}\\s*</Label>`, "g");
    if (re.test(src)) {
      src = src.replace(re, `<Label>{t("common:fields.${key}")}</Label>`);
      usedField = true;
    }
    // Also <Label htmlFor="x">Text</Label>
    const re2 = new RegExp(`(<Label\\s+htmlFor=\"[^\"]+\">)\\s*${esc}\\s*(</Label>)`, "g");
    if (re2.test(src)) {
      src = src.replace(re2, `$1{t("common:fields.${key}")}$2`);
      usedField = true;
    }
  }

  // PLACEHOLDERS: placeholder="..."
  for (const [text, key] of Object.entries(PLACEHOLDERS)) {
    const esc = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`placeholder=\"${esc}\"`, "g");
    if (re.test(src)) {
      src = src.replace(re, `placeholder={t("common:fields.${key}")}`);
      usedPlaceholder = true;
    }
  }

  if (src === original) continue;

  const needsHook = usedAction || usedField || usedPlaceholder;
  const alreadyImports = /from ["']react-i18next["']/.test(src);
  const alreadyHasHook = /useTranslation\s*\(/.test(src);

  if (needsHook && !alreadyImports) {
    // insert import after the last import line
    const importRe = /^(import[^\n]*\n)+/m;
    const m = src.match(importRe);
    if (m) {
      const insertAt = m.index + m[0].length;
      src = src.slice(0, insertAt) + `import { useTranslation } from "react-i18next";\n` + src.slice(insertAt);
    }
  }

  if (needsHook && !alreadyHasHook) {
    // insert hook after `export default function Xxx(...) {`
    const fnRe = /(export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{\s*\n)/;
    if (fnRe.test(src)) {
      src = src.replace(fnRe, `$1  const { t } = useTranslation("common");\n`);
    }
  }

  if (src !== original) {
    fs.writeFileSync(p, src);
    touched++;
    console.log(`updated ${file}`);
  }
}

console.log(`\nTotal files updated: ${touched}`);
