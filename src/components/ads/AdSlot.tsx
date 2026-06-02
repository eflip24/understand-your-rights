import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ADSENSE_CLIENT, AD_SLOT_IDS } from "@/lib/adsense";
import { useConsent } from "@/lib/consent";

interface AdSlotProps {
  slot: "above-content" | "mid-content" | "end-of-article" | "post-result" | "sidebar" | "in-feed";
  className?: string;
}

const slotStyles: Record<string, string> = {
  "above-content": "min-h-[90px]",
  "mid-content": "min-h-[250px]",
  "end-of-article": "min-h-[250px]",
  "post-result": "min-h-[250px]",
  "sidebar": "min-h-[250px] md:min-h-[600px]",
  "in-feed": "min-h-[120px]",
};

// Keep AdSense off thin/auto-generated/utility pages so the network only
// sees us monetizing substantive content. This is the main "low value
// content" guard for AdSense review.
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

function shouldShowAds(pathname: string): boolean {
  const bare = pathname.replace(/^\/(?:en|fr|de|es|it|pt)(?=\/|$)/, "") || "/";
  if (AD_ALLOW_PATTERNS.some((re) => re.test(bare))) return true;
  if (AD_DENY_PREFIXES.some((p) => bare === p || bare.startsWith(p + "/"))) return false;
  return true;
}


export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const consent = useConsent();
  const location = useLocation();
  const pushed = useRef(false);
  const insRef = useRef<HTMLModElement | null>(null);

  const consentDecided = consent !== null;
  const allowedHere = shouldShowAds(location.pathname);


  useEffect(() => {
    if (!consentDecided || !allowedHere) return;
    if (pushed.current) return;
    if (typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet (script may be blocked); silently ignore.
    }
  }, [consentDecided, allowedHere]);

  // Page is on the deny list — render nothing (not even a placeholder) so
  // AdSense crawlers never see an ad slot on thin pages.
  if (!allowedHere) return null;

  if (!consentDecided) {
    // Reserve space to prevent CLS without showing an ad container.
    return <div className={`w-full ${slotStyles[slot] || ""} ${className}`} aria-hidden="true" />;
  }


  const slotId = AD_SLOT_IDS[slot] || "";

  return (
    <div className={`w-full flex items-center justify-center ${slotStyles[slot] || ""} ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={ADSENSE_CLIENT}
        {...(slotId ? { "data-ad-slot": slotId } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
