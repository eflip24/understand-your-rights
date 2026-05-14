import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import i18n, { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "./config";

/**
 * Reads the locale from the URL prefix and syncs:
 *  - i18next language
 *  - <html lang="..."> attribute
 *  - localStorage persisted choice
 *
 * URL convention:
 *   /              -> en (default, no prefix)
 *   /es/...        -> es
 *   /fr/...        -> fr   (etc.)
 *
 * Also auto-redirects first-time visitors whose browser language is a non-default
 * supported locale to the prefixed URL — but only on the first visit (we set a
 * flag so we never override an explicit user choice afterwards).
 */
export function useLocaleFromUrl(): SupportedLocale {
  const { pathname } = useLocation();
  const segs = pathname.split("/").filter(Boolean);
  const first = segs[0];
  return isSupportedLocale(first) && first !== DEFAULT_LOCALE ? (first as SupportedLocale) : DEFAULT_LOCALE;
}

export default function LocaleSync() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const locale = useLocaleFromUrl();

  // Sync i18n + <html lang>
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
    document.documentElement.setAttribute("lang", locale);
    try {
      localStorage.setItem("ls.locale", locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  // First-visit auto-redirect based on browser language.
  useEffect(() => {
    try {
      if (localStorage.getItem("ls.locale.autoRedirected") === "1") return;
      localStorage.setItem("ls.locale.autoRedirected", "1");

      const stored = localStorage.getItem("ls.locale");
      if (stored) return; // user already has a saved preference

      const browser = (navigator.language || "").slice(0, 2).toLowerCase();
      if (!isSupportedLocale(browser) || browser === DEFAULT_LOCALE) return;
      // Only redirect when on a "naked" English path (no locale prefix yet)
      const segs = pathname.split("/").filter(Boolean);
      if (isSupportedLocale(segs[0])) return;
      navigate(`/${browser}${pathname}${search}${hash}`, { replace: true });
    } catch {
      /* ignore */
    }
    // intentionally run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
