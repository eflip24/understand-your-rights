// Extracts tools[] and categories[] from src/data/tools.ts (minus icon refs)
// and writes /tmp/tools-source.json. Run via tsx.
import { writeFileSync } from "node:fs";

// Stub lucide-react so we can import tools.ts without React/icon resolution.
import { Module } from "node:module";
const origResolve = (Module as unknown as { _resolveFilename: (req: string, ...rest: unknown[]) => string })._resolveFilename;
(Module as unknown as { _resolveFilename: (req: string, ...rest: unknown[]) => string })._resolveFilename = function (request: string, ...rest: unknown[]) {
  if (request === "lucide-react") return require.resolve("./_stub-lucide.cjs");
  return origResolve.call(this, request, ...rest);
};

const mod = await import("../src/data/tools.ts");
const out = {
  categories: (mod.categories as Array<{ id: string; label: string; description: string }>).map((c) => ({
    id: c.id,
    label: c.label,
    description: c.description,
  })),
  tools: (mod.tools as Array<{
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    categoryLabel: string;
    category: string;
    faqs: { question: string; answer: string }[];
  }>).map((t) => ({
    id: t.id,
    category: t.category,
    name: t.name,
    description: t.description,
    shortDescription: t.shortDescription,
    categoryLabel: t.categoryLabel,
    faqs: t.faqs ?? [],
  })),
};
writeFileSync("/tmp/tools-source.json", JSON.stringify(out, null, 2));
console.log(`extracted ${out.tools.length} tools, ${out.categories.length} categories`);
