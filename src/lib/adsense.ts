// AdSense configuration
export const ADSENSE_CLIENT = "ca-pub-7983626512285415";

// Map slot names to actual ad unit IDs from your AdSense dashboard.
// Until you create real ad units, leave as empty strings — AdSense's
// "Auto ads" / "Display ads" with format=auto will still serve.
export const AD_SLOT_IDS: Record<string, string> = {
  "above-content": "",
  "mid-content": "",
  "end-of-article": "",
  "post-result": "",
  "tool-result": "",
  "sidebar": "",
  "in-feed": "",
};

declare global {
  interface Window {
    adsbygoogle?: any[] & { requestNonPersonalizedAds?: number };
  }
}

// Keep AdSense off thin/auto-generated/utility pages so the network only
// sees us monetizing substantive content. This is the main "low value
// content" guard for AdSense review — applies to both manual <AdSlot />
// and site-wide Auto ads.
const AD_DENY_PREFIXES = [
  "/login", "/signup", "/forgot-password", "/reset-password",
  "/dashboard", "/admin",
  "/lawyer-near-me", "/lawyer-eu",
  "/tools", "/legal-terms", "/legal-clauses", "/contract-types",
  "/blog", "/laws",
];

// Detail pages under denied prefixes that DO carry rich content and should
// still monetize. These win over the deny list.
const AD_ALLOW_PATTERNS: RegExp[] = [
  /^\/tools\/[^/]+\/[^/]+\/?$/,
  /^\/legal-terms\/[^/]+\/?$/,
  /^\/legal-clauses\/[^/]+\/?$/,
  /^\/contract-types\/[^/]+\/?$/,
  /^\/blog\/(?!category\/)[^/]+\/?$/,
  /^\/laws\/[^/]+\/[^/]+\/?$/,
];

export function shouldShowAds(pathname: string): boolean {
  const bare = pathname.replace(/^\/(?:en|fr|de|es|it|pt)(?=\/|$)/, "") || "/";
  if (AD_ALLOW_PATTERNS.some((re) => re.test(bare))) return true;
  if (AD_DENY_PREFIXES.some((p) => bare === p || bare.startsWith(p + "/"))) return false;
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
    });
    autoAdsPushed = true;
  } catch {
    // AdSense script may be blocked; ignore.
  }
}
