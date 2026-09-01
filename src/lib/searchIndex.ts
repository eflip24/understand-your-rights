/**
 * Unified, client-side search index.
 *
 * Built once (lazily, memoised) from the registries that already exist in the
 * codebase — no backend query per keystroke, no separate content source to keep
 * in sync. Anything registered in those registries is automatically findable
 * through the global command palette.
 */

import { tools, categories } from "@/data/tools";
import { guideGroups } from "@/data/guideIndex";
import { FORM_SEO_LANDINGS } from "@/data/formSeoLandings";
import { formPacks } from "@/data/formPacks";
import { legalTermPages } from "@/data/legalTermPages";
import { stateData } from "@/data/locations/stateData";

export type SearchKind = "tool" | "guide" | "form" | "pack" | "term" | "state" | "page";

export interface SearchEntry {
  id: string;
  title: string;
  subtitle?: string;
  path: string;
  kind: SearchKind;
  /** Extra terms folded into matching but not displayed. */
  keywords?: string[];
}

export const KIND_LABEL: Record<SearchKind, string> = {
  tool: "Tools & calculators",
  guide: "Guides & pillars",
  form: "Fillable forms",
  pack: "Form packs",
  term: "Legal glossary",
  state: "By state",
  page: "Pages",
};

/** Hand-registered destinations that are not driven by a data registry. */
const STATIC_PAGES: SearchEntry[] = [
  { id: "page-tools", title: "All tools & calculators", path: "/tools", kind: "page" },
  { id: "page-forms", title: "All fillable legal forms", path: "/forms", kind: "page" },
  { id: "page-guides", title: "All legal guides", path: "/guides", kind: "page" },
  { id: "page-answers", title: "Legal answers library", path: "/answers", kind: "page" },
  { id: "page-blog", title: "Legal blog", path: "/blog", kind: "page" },
  { id: "page-terms", title: "Legal glossary", path: "/legal-terms", kind: "page" },
  { id: "page-clauses", title: "Contract clause library", path: "/legal-clauses", kind: "page" },
  { id: "page-contract-types", title: "Contract types explained", path: "/contract-types", kind: "page" },
  { id: "page-laws", title: "State statute library", path: "/laws", kind: "page" },
  { id: "page-courts", title: "US courts & small claims limits", path: "/courts", kind: "page" },
  { id: "page-sol", title: "Statute of limitations by state", path: "/statute-of-limitations-by-state", kind: "page", keywords: ["deadline", "time limit", "filing window"] },
  { id: "page-deadlines", title: "Settlement deadlines dataset", path: "/data/settlement-deadlines", kind: "page" },
  { id: "page-fees", title: "Court filing fees dataset", path: "/data/court-filing-fees", kind: "page" },
  { id: "page-lawyer", title: "Find a lawyer near me", path: "/lawyer-near-me", kind: "page" },
  { id: "page-lawyer-eu", title: "Find a lawyer in Europe", path: "/lawyer-eu", kind: "page" },
  { id: "page-eu-tools", title: "European employment calculators", path: "/eu-tools", kind: "page" },
  { id: "page-eu-forms", title: "European legal forms & GDPR packs", path: "/eu-forms", kind: "page" },
  { id: "page-quiz", title: "Legal health check", path: "/legal-health-check", kind: "page" },
  { id: "page-pricing", title: "Membership & pricing", path: "/pricing", kind: "page" },
  { id: "page-about", title: "About LegallySpoken", path: "/about", kind: "page" },
  { id: "page-contact", title: "Contact us", path: "/contact", kind: "page" },
];

let cached: SearchEntry[] | null = null;

export function getSearchIndex(): SearchEntry[] {
  if (cached) return cached;

  const catLabel = new Map(categories.map((c) => [c.id, c.label]));

  const entries: SearchEntry[] = [
    ...STATIC_PAGES,

    ...tools.map<SearchEntry>((tool) => ({
      id: `tool-${tool.id}`,
      title: tool.name,
      subtitle: tool.shortDescription || catLabel.get(tool.category),
      path: `/tools/${tool.category}/${tool.slug}`,
      kind: "tool",
      keywords: [catLabel.get(tool.category) ?? "", "calculator", "tool"],
    })),

    ...guideGroups.flatMap((group) =>
      group.entries.map<SearchEntry>((entry) => ({
        id: `guide-${entry.path}`,
        title: entry.title,
        subtitle: group.label,
        path: entry.path,
        kind: "guide",
        keywords: [group.label, entry.badge ?? ""],
      })),
    ),

    ...FORM_SEO_LANDINGS.map<SearchEntry>((landing) => ({
      id: `form-${landing.slug}`,
      title: landing.h1.split("—")[0].trim(),
      subtitle: landing.tagline,
      path: `/forms/${landing.slug}`,
      kind: "form",
      keywords: landing.keywords,
    })),

    ...formPacks.map<SearchEntry>((pack) => ({
      id: `pack-${pack.slug}`,
      title: pack.title,
      subtitle: pack.savingsCopy,
      path: `${pack.region === "eu" ? "/eu-forms" : "/forms"}/${pack.slug}`,
      kind: "pack",
      keywords: ["bundle", "pack", pack.category],
    })),

    ...legalTermPages.map<SearchEntry>((term) => ({
      id: `term-${term.slug}`,
      title: term.term,
      subtitle: term.definition,
      path: `/legal-terms/${term.slug}`,
      kind: "term",
      keywords: [term.category, "definition", "meaning"],
    })),

    ...stateData.map<SearchEntry>((state) => ({
      id: `state-${state.slug}`,
      title: `${state.name} — legal deadlines & courts`,
      subtitle: `Injury deadline ${state.personalInjurySOL} · ${state.negligenceRule}`,
      path: `/courts/${state.slug}`,
      kind: "state",
      keywords: [state.abbreviation, "statute of limitations", "small claims", "filing fees"],
    })),
  ];

  // De-duplicate by destination path, keeping the first (higher-value) entry.
  const seen = new Set<string>();
  cached = entries.filter((e) => {
    const key = `${e.kind}:${e.path}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return cached;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Rank order when scores tie — high-intent destinations first. */
const KIND_WEIGHT: Record<SearchKind, number> = {
  tool: 6,
  guide: 5,
  form: 5,
  pack: 3,
  page: 3,
  state: 2,
  term: 1,
};

function scoreEntry(entry: SearchEntry, tokens: string[]): number {
  const title = entry.title.toLowerCase();
  const haystack = `${title} ${(entry.subtitle ?? "").toLowerCase()} ${(entry.keywords ?? []).join(" ").toLowerCase()}`;

  let score = 0;
  for (const token of tokens) {
    if (title.startsWith(token)) score += 40;
    else if (title.includes(token)) score += 24;
    else if (haystack.includes(token)) score += 8;
    else return -1; // every token must match somewhere
  }
  return score + KIND_WEIGHT[entry.kind];
}

export function searchAll(query: string, limit = 40): SearchEntry[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  return getSearchIndex()
    .map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}

/** Grouped results, preserving relevance order within each group. */
export function groupResults(results: SearchEntry[]): { kind: SearchKind; items: SearchEntry[] }[] {
  const order: SearchKind[] = ["tool", "form", "guide", "pack", "state", "term", "page"];
  return order
    .map((kind) => ({ kind, items: results.filter((r) => r.kind === kind) }))
    .filter((g) => g.items.length > 0);
}
