// AdSense configuration
export const ADSENSE_CLIENT = "ca-pub-7983626512285415";

/**
 * Named ad units.
 *
 * Each placement should have its OWN ad unit created in the AdSense
 * dashboard (Ads → By ad unit → Display ads). Named units give us
 * per-placement reporting (RPM by slot) and let AdSense optimise fill
 * per position instead of treating every slot as one anonymous
 * auto-format block.
 *
 * IDs are read from Vite env vars so they can be set without a code
 * change; the literal fallbacks below are used when the env var is
 * absent. An empty string still works (AdSense falls back to
 * auto-format), it just loses per-slot reporting.
 */
const envSlot = (key: string): string => {
  try {
    return (import.meta.env?.[key] as string | undefined) ?? "";
  } catch {
    return "";
  }
};

export const AD_SLOT_IDS: Record<string, string> = {
  "above-content": envSlot("VITE_ADSENSE_SLOT_ABOVE_CONTENT"),
  "mid-content": envSlot("VITE_ADSENSE_SLOT_MID_CONTENT"),
  "end-of-article": envSlot("VITE_ADSENSE_SLOT_END_OF_ARTICLE"),
  "post-result": envSlot("VITE_ADSENSE_SLOT_POST_RESULT"),
  "tool-result": envSlot("VITE_ADSENSE_SLOT_TOOL_RESULT"),
  "sidebar": envSlot("VITE_ADSENSE_SLOT_SIDEBAR"),
  "in-feed": envSlot("VITE_ADSENSE_SLOT_IN_FEED"),
  "anchor-mobile": envSlot("VITE_ADSENSE_SLOT_ANCHOR_MOBILE"),
};

declare global {
  interface Window {
    adsbygoogle?: any[] & { requestNonPersonalizedAds?: number };
  }
}

// Utility / account / thin index routes never monetize. These are pages
// with no editorial content at all, so AdSense should never see an ad
// slot on them.
const AD_DENY_PREFIXES = [
  "/login", "/signup", "/forgot-password", "/reset-password",
  "/dashboard", "/admin",
  "/checkout", "/thank-you",
];

// Bare hub / index routes: monetize the deep detail pages beneath them,
// but not the shallow listing page itself.
const AD_DENY_EXACT = [
  "/tools", "/legal-terms", "/legal-clauses", "/contract-types",
  "/blog", "/laws", "/guides", "/forms", "/eu-forms",
  "/lawyer-near-me", "/lawyer-eu",
];

/**
 * Detail pages that carry substantive content and SHOULD monetize.
 *
 * The lawyer directory is included deliberately: city/state practice-area
 * pages are our highest commercial-intent traffic (insurance-dispute,
 * workers-comp, personal-injury queries) and they render full editorial
 * sections, listings and FAQs — not thin templates. Only the bare
 * directory index is withheld, via AD_DENY_EXACT above.
 */
const AD_ALLOW_PATTERNS: RegExp[] = [
  /^\/tools\/[^/]+\/[^/]+\/?$/,
  /^\/legal-terms\/[^/]+\/?$/,
  /^\/legal-clauses\/[^/]+\/?$/,
  /^\/contract-types\/[^/]+\/?$/,
  /^\/blog\/(?!category\/)[^/]+\/?$/,
  /^\/laws\/[^/]+\/[^/]+\/?$/,
  // Lawyer directory: /lawyer-near-me/<practice>/<state>[/<city>]
  /^\/lawyer-near-me\/[^/]+\/[^/]+(?:\/[^/]+)?\/?$/,
  // EU directory: /lawyer-eu/<country>/... (2+ segments deep)
  /^\/lawyer-eu\/[^/]+\/[^/]+.*$/,
];

export function shouldShowAds(pathname: string): boolean {
  const bare = pathname.replace(/^\/(?:en|fr|de|es|it|pt)(?=\/|$)/, "") || "/";
  const normalized = bare.length > 1 ? bare.replace(/\/$/, "") : bare;
  if (AD_ALLOW_PATTERNS.some((re) => re.test(bare))) return true;
  if (AD_DENY_EXACT.includes(normalized)) return false;
  if (AD_DENY_PREFIXES.some((p) => normalized === p || normalized.startsWith(p + "/"))) return false;
  return true;
}

// Pushes the Auto-ads page-level tag once per session, after consent is
// resolved and only on allowed routes. Auto ads (anchor, vignette,
// in-article) then supplement the manual <AdSlot /> placements.
let autoAdsPushed = false;
export function initAutoAds(opts: { advertisingConsent: boolean }) {
  if (typeof window === "undefined" || autoAdsPushed) return;
  try {
    window.adsbygoogle = window.adsbygoogle || [];
    if (!opts.advertisingConsent) {
      window.adsbygoogle.requestNonPersonalizedAds = 1;
    }
    window.adsbygoogle.push({
      google_ad_client: ADSENSE_CLIENT,
      enable_page_level_ads: true,
      overlays: { bottom: true },
    });
    autoAdsPushed = true;
  } catch {
    // AdSense script may be blocked; ignore.
  }
}
