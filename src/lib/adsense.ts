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

/**
 * ==========================================================
 * PASTE YOUR ADSENSE AD UNIT IDs HERE (digits only, e.g. "1234567890")
 * ==========================================================
 * Create one Display ad unit per placement in AdSense
 * (Ads → By ad unit → Display ads), copy its data-ad-slot number and
 * paste it below. Any placement left as "" stays on Google Auto ads.
 * Filling a single one is enough to switch that placement on.
 */
export const AD_SLOT_FALLBACKS: Record<string, string> = {
  "above-content": "",
  "mid-content": "",
  "end-of-article": "",
  "post-result": "",
  "tool-result": "",
  "sidebar": "",
  "in-feed": "",
  "anchor-mobile": "",
};

const slotId = (key: string, name: string): string =>
  envSlot(key) || AD_SLOT_FALLBACKS[name] || "";

export const AD_SLOT_IDS: Record<string, string> = {
  "above-content": slotId("VITE_ADSENSE_SLOT_ABOVE_CONTENT", "above-content"),
  "mid-content": slotId("VITE_ADSENSE_SLOT_MID_CONTENT", "mid-content"),
  "end-of-article": slotId("VITE_ADSENSE_SLOT_END_OF_ARTICLE", "end-of-article"),
  "post-result": slotId("VITE_ADSENSE_SLOT_POST_RESULT", "post-result"),
  "tool-result": slotId("VITE_ADSENSE_SLOT_TOOL_RESULT", "tool-result"),
  "sidebar": slotId("VITE_ADSENSE_SLOT_SIDEBAR", "sidebar"),
  "in-feed": slotId("VITE_ADSENSE_SLOT_IN_FEED", "in-feed"),
  "anchor-mobile": slotId("VITE_ADSENSE_SLOT_ANCHOR_MOBILE", "anchor-mobile"),
};

/**
 * Auto-ads mode.
 *
 * A placement with no configured unit ID must NOT render a manual <ins>
 * with a blank data-ad-slot (it goes unfilled and reserves dead space) —
 * Google Auto ads covers that position instead. Placements WITH an ID
 * render as real, per-slot-reportable units.
 */
export const AUTO_ADS_ONLY = Object.values(AD_SLOT_IDS).every((id) => !id);

/** True when this specific placement has a real ad unit configured. */
export const hasManualUnit = (slot: string): boolean => !!AD_SLOT_IDS[slot];


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

// Auto ads are enabled per-site in the AdSense dashboard and activated by
// the adsbygoogle.js tag in index.html — no page-level push is needed (the
// legacy `enable_page_level_ads` call can even conflict with it). All we do
// here is set the non-personalized flag before any auto ad request when the
// visitor declined advertising consent.
let autoAdsPushed = false;
export function initAutoAds(opts: { advertisingConsent: boolean }) {
  if (typeof window === "undefined" || autoAdsPushed) return;
  try {
    window.adsbygoogle = window.adsbygoogle || [];
    if (!opts.advertisingConsent) {
      window.adsbygoogle.requestNonPersonalizedAds = 1;
    }
    autoAdsPushed = true;
  } catch {
    // AdSense script may be blocked; ignore.
  }

}
