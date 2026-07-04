// Ad analytics helpers — classify page type and emit dedupe'd
// impression/click events to Plausible + GA4. Consent-gated by callers.
import { trackEvent } from "@/lib/analytics";

export type PageType =
  | "home"
  | "tool"
  | "blog_post"
  | "pillar"
  | "cluster"
  | "legal_term"
  | "legal_clause"
  | "contract_type"
  | "lawyer_local"
  | "lawyer_eu"
  | "other";

export function classifyPageType(pathname: string): PageType {
  const bare = pathname.replace(/^\/(?:en|fr|de|es|it|pt)(?=\/|$)/, "") || "/";
  if (bare === "/") return "home";
  if (/^\/tools\/[^/]+\/[^/]+\/?$/.test(bare)) return "tool";
  if (/^\/blog\/(?!category\/)[^/]+\/?$/.test(bare)) return "blog_post";
  if (/^\/legal-terms\/[^/]+\/?$/.test(bare)) return "legal_term";
  if (/^\/legal-clauses\/[^/]+\/?$/.test(bare)) return "legal_clause";
  if (/^\/contract-types\/[^/]+\/?$/.test(bare)) return "contract_type";
  if (/^\/laws\/[^/]+\/[^/]+\/?$/.test(bare)) return "cluster";
  if (bare.startsWith("/lawyer-near-me")) return "lawyer_local";
  if (bare.startsWith("/lawyer-eu")) return "lawyer_eu";
  // Pillar directory pages that use ContentPageLayout etc.
  if (/^\/(auto-accident|personal-injury|insurance|employment|criminal|landlord-tenant|ai-tech)-law\/?$/.test(bare))
    return "pillar";
  return "other";
}

type AdEventProps = {
  slot: string;
  page_type: PageType;
  path: string;
};

// Fire an event through Plausible AND GA4 (gtag). Kept independent from
// the plain `trackEvent` helper so we can send the same props to both.
function fire(name: string, props: AdEventProps) {
  trackEvent(name, props);
  try {
    const w = window as unknown as {
      gtag?: (cmd: string, event: string, params: Record<string, unknown>) => void;
    };
    w.gtag?.("event", name, {
      ad_slot: props.slot,
      page_type: props.page_type,
      page_path: props.path,
    });
  } catch {
    /* ignore */
  }
}

export function trackAdImpression(props: AdEventProps) {
  fire("Ad Impression", props);
}

export function trackAdClick(props: AdEventProps) {
  fire("Ad Click", props);
}
