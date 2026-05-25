import { useEffect, useState } from "react";

/**
 * Consent layer (Phase B5.3).
 *
 * EEA/UK/CH traffic is governed by Google Funding Choices (TCF v2.2),
 * loaded from index.html. We read the IAB TCF API to derive a simple
 * "ads allowed" boolean for AdSlot gating. For non-EEA traffic (no TCF
 * stub present) we default to "decided=true, advertising=true" so the
 * existing ad placements keep working.
 *
 * The legacy localStorage shape is preserved so old call sites keep
 * compiling, but values are now sourced from TCF when available.
 */

export type ConsentChoice = {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  decidedAt: string;
};

const LEGACY_KEY = "ls_consent_v1";
const EVENT = "ls_consent_changed";
export const OPEN_CONSENT_EVENT = "ls_open_consent";

declare global {
  interface Window {
    __tcfapi?: (
      cmd: string,
      version: number,
      cb: (tcData: TCData | null, success: boolean) => void,
      ...rest: unknown[]
    ) => void;
    googlefc?: {
      callbackQueue?: Array<() => void>;
      showRevocationMessage?: () => void;
    };
  }
}

interface TCData {
  eventStatus?: string;
  gdprApplies?: boolean;
  tcString?: string;
  purpose?: { consents?: Record<string, boolean> };
  vendor?: { consents?: Record<string, boolean> };
}

function readTcfConsent(): ConsentChoice | null {
  if (typeof window === "undefined" || !window.__tcfapi) return null;
  let snapshot: ConsentChoice | null = null;
  try {
    window.__tcfapi("getTCData", 2, (tc, ok) => {
      if (!ok || !tc) return;
      // Only return a decision once user has interacted.
      const status = tc.eventStatus;
      if (status !== "useractioncomplete" && status !== "tcloaded") return;
      const purposes = tc.purpose?.consents ?? {};
      // Purpose 1 = store info, 3 = create personalized ads profile,
      // 4 = select personalized ads. We treat 3+4 as the "advertising" flag.
      const advertising = !!(purposes["3"] && purposes["4"]);
      const analytics = !!(purposes["7"] || purposes["8"]); // 7+8 = measurement
      snapshot = {
        necessary: true,
        analytics,
        advertising,
        decidedAt: new Date().toISOString(),
      };
    });
  } catch {
    return null;
  }
  return snapshot;
}

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  // 1. Prefer TCF (Google Funding Choices) when available.
  const tcf = readTcfConsent();
  if (tcf) return tcf;
  // 2. Legacy localStorage (pre-B5.3) — read once for backwards compat.
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (raw) return JSON.parse(raw) as ConsentChoice;
  } catch {
    /* ignore */
  }
  // 3. Non-EEA / no CMP loaded → assume decided + ads allowed.
  //    Funding Choices itself only injects __tcfapi for EEA/UK/CH IPs.
  return {
    necessary: true,
    analytics: true,
    advertising: true,
    decidedAt: new Date().toISOString(),
  };
}

/** @deprecated Funding Choices owns the decision now; kept for API stability. */
export function setConsent(_choice: Omit<ConsentChoice, "necessary" | "decidedAt">) {
  // No-op: TCF/Funding Choices is the source of truth.
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: getConsent() }));
  }
}

/** @deprecated */
export function clearConsent() {
  try {
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: null }));
  }
}

export function hasAdConsent(): boolean {
  return !!getConsent()?.advertising;
}

export function useConsent() {
  const [consent, setConsentState] = useState<ConsentChoice | null>(() => getConsent());

  useEffect(() => {
    const refresh = () => setConsentState(getConsent());
    // Re-read on TCF updates.
    if (typeof window !== "undefined" && window.__tcfapi) {
      try {
        window.__tcfapi("addEventListener", 2, (tc, ok) => {
          if (ok && tc && (tc.eventStatus === "useractioncomplete" || tc.eventStatus === "tcloaded")) {
            refresh();
          }
        });
      } catch {
        /* ignore */
      }
    }
    window.addEventListener(EVENT, refresh);
    return () => window.removeEventListener(EVENT, refresh);
  }, []);

  return consent;
}

/**
 * Open the consent UI. With Funding Choices loaded, this shows the
 * revocation message. Without it, dispatches the legacy event for
 * any old listener (no-op today).
 */
export function openConsentSettings() {
  if (typeof window === "undefined") return;
  if (window.googlefc?.showRevocationMessage) {
    try {
      window.googlefc.showRevocationMessage();
      return;
    } catch {
      /* fall through */
    }
  }
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT));
}
