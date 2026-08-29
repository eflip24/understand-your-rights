import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import AdSlot from "@/components/ads/AdSlot";
import { shouldShowAds, AUTO_ADS_ONLY } from "@/lib/adsense";
import { useSubscription } from "@/contexts/SubscriptionContext";


/**
 * Mobile-only sticky anchor unit.
 *
 * Legal search traffic is majority mobile, and an anchor unit is the
 * single highest-RPM placement on a mobile article. Rendered app-wide but
 * only on routes that already allow ads, only under `md`, dismissible
 * (AdSense policy requires the user can close a sticky overlay), and it
 * mounts after a short delay so it never competes with the LCP element.
 */
export default function StickyAnchorAd() {
  const location = useLocation();
  const { isSubscriber } = useSubscription();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Google Auto ads serve their own anchor overlay; rendering ours too
  // would double up on mobile. Only show when a manual unit is configured.
  if (AUTO_ADS_ONLY || isSubscriber) return null;
  if (dismissed || !visible) return null;
  if (!shouldShowAds(location.pathname)) return null;


  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border">
      <button
        type="button"
        aria-label="Close ad"
        onClick={() => setDismissed(true)}
        className="absolute -top-7 right-2 rounded-full border border-border bg-background p-1.5 shadow-sm"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <AdSlot slot="anchor-mobile" className="!min-h-[50px] py-1" />
    </div>
  );
}
