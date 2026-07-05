import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ADSENSE_CLIENT, AD_SLOT_IDS, shouldShowAds } from "@/lib/adsense";
import { useConsent } from "@/lib/consent";
import {
  classifyPageType,
  trackAdImpression,
  trackAdClick,
} from "@/lib/adAnalytics";

interface AdSlotProps {
  slot: "above-content" | "mid-content" | "end-of-article" | "post-result" | "tool-result" | "sidebar" | "in-feed";
  className?: string;
}

const slotStyles: Record<string, string> = {
  "above-content": "min-h-[90px]",
  "mid-content": "min-h-[250px]",
  "end-of-article": "min-h-[250px]",
  "post-result": "min-h-[250px]",
  "tool-result": "min-h-[250px]",
  "sidebar": "min-h-[250px] md:min-h-[600px]",
  "in-feed": "min-h-[120px]",
};


export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const consent = useConsent();
  const location = useLocation();
  const pushed = useRef(false);
  const impressionFired = useRef(false);
  const clickFired = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const insRef = useRef<HTMLModElement | null>(null);

  const consentDecided = consent !== null;
  const allowedHere = shouldShowAds(location.pathname);
  const analyticsAllowed = !!consent?.analytics;


  useEffect(() => {
    if (!consentDecided || !allowedHere) return;
    if (pushed.current) return;
    if (typeof window === "undefined") return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      if (!consent?.advertising) {
        window.adsbygoogle.requestNonPersonalizedAds = 1;
      }
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet (script may be blocked); silently ignore.
    }
  }, [consentDecided, allowedHere, consent?.advertising]);

  // Impression + click instrumentation. Both are gated by analytics
  // consent. Impressions require the <ins> to be ≥50% visible AND
  // marked filled by AdSense. Clicks are inferred from the standard
  // "iframe steals focus, window loses it" pattern.
  useEffect(() => {
    if (!analyticsAllowed || !allowedHere) return;
    const ins = insRef.current;
    const container = containerRef.current;
    if (!ins || !container) return;

    const props = {
      slot,
      page_type: classifyPageType(location.pathname),
      path: location.pathname,
    } as const;

    // ---- Impression via IntersectionObserver ----
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (impressionFired.current) return;
            if (entry.intersectionRatio < 0.5) continue;
            // Only count as viewable once AdSense has actually filled it.
            const status = ins.getAttribute("data-ad-status");
            if (status && status !== "filled") continue;
            impressionFired.current = true;
            trackAdImpression(props);
            observer?.disconnect();
          }
        },
        { threshold: [0, 0.5, 1] },
      );
      observer.observe(ins);
    }

    // ---- Click via focus loss to a nested iframe ----
    const onBlur = () => {
      if (clickFired.current) return;
      // Give the browser a tick to update activeElement.
      setTimeout(() => {
        const active = document.activeElement;
        if (active && active.tagName === "IFRAME" && container.contains(active)) {
          clickFired.current = true;
          trackAdClick(props);
        }
      }, 0);
    };
    window.addEventListener("blur", onBlur);

    return () => {
      observer?.disconnect();
      window.removeEventListener("blur", onBlur);
    };
  }, [analyticsAllowed, allowedHere, slot, location.pathname]);

  // Reset dedupe flags on route change so a repeat visit re-tracks.
  useEffect(() => {
    impressionFired.current = false;
    clickFired.current = false;
  }, [location.pathname]);

  // Page is on the deny list — render nothing (not even a placeholder) so
  // AdSense crawlers never see an ad slot on thin pages.
  if (!allowedHere) return null;

  if (!consentDecided) {
    // Reserve space to prevent CLS without showing an ad container.
    return <div className={`w-full ${slotStyles[slot] || ""} ${className}`} aria-hidden="true" />;
  }


  const slotId = AD_SLOT_IDS[slot] || "";

  return (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center ${slotStyles[slot] || ""} ${className}`}
    >
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
