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
  "sidebar": "",
  "in-feed": "",
};

declare global {
  interface Window {
    adsbygoogle?: any[] & { requestNonPersonalizedAds?: number };
  }
}
