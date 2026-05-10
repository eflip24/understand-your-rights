import { useEffect, useState } from "react";

export type ConsentChoice = {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  decidedAt: string;
};

const KEY = "ls_consent_v1";
const EVENT = "ls_consent_changed";

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentChoice;
  } catch {
    return null;
  }
}

export function setConsent(choice: Omit<ConsentChoice, "necessary" | "decidedAt">) {
  const value: ConsentChoice = {
    necessary: true,
    analytics: choice.analytics,
    advertising: choice.advertising,
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));

  // Tell AdSense whether to serve personalized ads
  if (typeof window !== "undefined") {
    window.adsbygoogle = window.adsbygoogle || [];
    if (!choice.advertising) {
      (window.adsbygoogle as any).requestNonPersonalizedAds = 1;
    } else {
      (window.adsbygoogle as any).requestNonPersonalizedAds = 0;
    }
  }
}

export function clearConsent() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: null }));
}

export function hasAdConsent(): boolean {
  const c = getConsent();
  return !!c?.advertising;
}

export function useConsent() {
  const [consent, setConsentState] = useState<ConsentChoice | null>(() => getConsent());

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as ConsentChoice | null;
      setConsentState(detail);
    };
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  return consent;
}

// Open the consent banner from anywhere (e.g. footer "Cookie Settings")
export const OPEN_CONSENT_EVENT = "ls_open_consent";
export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT));
}
