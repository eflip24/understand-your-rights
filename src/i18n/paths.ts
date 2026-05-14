import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_LOCALE, isSupportedLocale, SUPPORTED_LOCALES, type SupportedLocale } from "./config";
import { useLocaleFromUrl } from "./LocaleSync";

/**
 * Strip a leading locale segment if present, returning the locale-free pathname.
 * "/es/tools/family"  -> "/tools/family"
 * "/tools/family"     -> "/tools/family"
 */
export function stripLocalePrefix(pathname: string): string {
  const segs = pathname.split("/").filter(Boolean);
  if (isSupportedLocale(segs[0])) {
    return "/" + segs.slice(1).join("/");
  }
  return pathname || "/";
}

/**
 * Build a URL for a given target locale, preserving the current pathname/search/hash.
 * English (the default) is rendered without a prefix.
 */
export function buildLocaleUrl(locale: SupportedLocale, pathname: string, search = "", hash = ""): string {
  const bare = stripLocalePrefix(pathname);
  const path = locale === DEFAULT_LOCALE ? bare : `/${locale}${bare === "/" ? "" : bare}`;
  return `${path || "/"}${search}${hash}`;
}

/**
 * Hook returning a function that prefixes any in-app path with the current locale.
 * Use this when programmatically navigating or building hreflang URLs.
 */
export function useLocalizedPath() {
  const locale = useLocaleFromUrl();
  return useCallback(
    (path: string) => {
      if (locale === DEFAULT_LOCALE) return path;
      const clean = path.startsWith("/") ? path : `/${path}`;
      return `/${locale}${clean === "/" ? "" : clean}`;
    },
    [locale],
  );
}

export { SUPPORTED_LOCALES, DEFAULT_LOCALE, type SupportedLocale };
