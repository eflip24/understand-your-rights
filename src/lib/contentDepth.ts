/**
 * Content-depth gate for programmatic (fan-out) pages.
 *
 * We generate hundreds of state-level URLs from data tables. Where a record
 * carries genuinely unique jurisdiction detail — agency names, statutory
 * citations, deadlines, penalty ranges — the page deserves to be indexed.
 * Where the record is sparse, the rendered page is a near-duplicate of its
 * siblings with a swapped state name, and indexing it dilutes crawl budget
 * and site-wide quality signals.
 *
 * `uniqueContentScore` counts only the characters that actually differ
 * between siblings (the data-derived strings passed in), ignoring the shared
 * template copy.
 */

export function uniqueContentScore(parts: Array<string | undefined | null>): number {
  return parts.reduce<number>((n, p) => n + (typeof p === "string" ? p.trim().length : 0), 0);
}

/**
 * Minimum unique characters a fan-out page needs before we let Google index
 * it. 900 ≈ two to three substantive paragraphs of state-specific fact.
 */
export const FANOUT_MIN_UNIQUE_CHARS = 900;

export function isThinFanoutPage(
  parts: Array<string | undefined | null>,
  min: number = FANOUT_MIN_UNIQUE_CHARS,
): boolean {
  return uniqueContentScore(parts) < min;
}
