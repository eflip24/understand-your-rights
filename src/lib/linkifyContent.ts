/**
 * Auto-links legal keywords in HTML content to their respective pillar pages.
 * Only links the first occurrence of each term. Skips content inside existing
 * <a>, <h1>-<h6>, and <code> tags.
 */

const KEYWORD_MAP: [RegExp, string][] = [
  [/\b(negligence)\b/i, "/personal-injury-law/"],
  [/\b(liability)\b/i, "/personal-injury-law/"],
  [/\b(insurance\s+claim)\b/i, "/insurance-law/"],
  [/\b(insurance\s+policy)\b/i, "/insurance-law/"],
];

export function linkifyLegalContent(html: string): string {
  let result = html;
  const linked = new Set<number>();

  for (let i = 0; i < KEYWORD_MAP.length; i++) {
    if (linked.has(i)) continue;
    const [pattern, href] = KEYWORD_MAP[i];

    // Find first occurrence not inside <a>, <h1>-<h6>, or <code> tags
    const globalPattern = new RegExp(pattern.source, "gi");
    let match: RegExpExecArray | null;

    while ((match = globalPattern.exec(result)) !== null) {
      const before = result.slice(0, match.index);

      // Check if inside a tag we should skip
      if (isInsideSkippedTag(before)) continue;

      // Replace only this first occurrence
      const term = match[1];
      const replacement = `<a href="${href}" class="text-accent hover:underline" data-auto-link="true">${term}</a>`;
      result = result.slice(0, match.index) + replacement + result.slice(match.index + match[0].length);
      linked.add(i);
      break;
    }
  }

  return result;
}

function isInsideSkippedTag(htmlBefore: string): boolean {
  // Count open/close tags for <a>, <h1>-<h6>, <code>
  const skipTags = ["a", "h1", "h2", "h3", "h4", "h5", "h6", "code"];

  for (const tag of skipTags) {
    const openCount = (htmlBefore.match(new RegExp(`<${tag}[\\s>]`, "gi")) || []).length;
    const closeCount = (htmlBefore.match(new RegExp(`</${tag}>`, "gi")) || []).length;
    if (openCount > closeCount) return true;
  }

  return false;
}
