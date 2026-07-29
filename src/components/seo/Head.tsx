import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { buildLocaleUrl, stripLocalePrefix } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  pt: "pt_PT",
  it: "it_IT",
};

interface HeadProps {
  title: string;
  description: string;
  /** Optional i18n key (common namespace) — when set, overrides `title`. */
  titleKey?: string;
  /** Optional i18n key (common namespace) — when set, overrides `description`. */
  descriptionKey?: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: string;
  /**
   * Tier-3 routes exist in English only. When true we emit a single `en`
   * alternate + x-default, point the canonical at the English URL, and drop
   * og:locale:alternate — otherwise Google sees hreflang pointing at pages
   * that are simultaneously noindexed, which is a conflicting signal.
   */
  englishOnly?: boolean;
}


function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkById(id: string, attrs: Record<string, string>) {
  let el = document.getElementById(id) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.id = id;
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function removeById(id: string) {
  document.getElementById(id)?.remove();
}

export default function Head({
  title,
  description,
  titleKey,
  descriptionKey,
  noindex,
  ogImage,
  ogType = "website",
  englishOnly = false,
}: HeadProps) {
  const location = useLocation();
  const locale = useLocaleFromUrl();
  const { t } = useTranslation();

  const resolvedTitle = titleKey ? (t(titleKey, { defaultValue: title }) as string) : title;
  const resolvedDescription = descriptionKey
    ? (t(descriptionKey, { defaultValue: description }) as string)
    : description;

  const barePath = stripLocalePrefix(location.pathname);
  const selfHref = `${SITE}${buildLocaleUrl(locale, barePath)}`.replace(/\/+$/, "") || SITE;
  const englishHref = `${SITE}${buildLocaleUrl(DEFAULT_LOCALE, barePath)}`.replace(/\/+$/, "") || SITE;
  // English-only routes consolidate every locale variant onto the English URL.
  const canonical = englishOnly ? englishHref : selfHref;

  useEffect(() => {
    document.title = resolvedTitle;

    const alternateLocales: readonly string[] = englishOnly
      ? []
      : SUPPORTED_LOCALES.filter((l) => l !== locale);

    setMeta("description", resolvedDescription);
    setMeta("og:title", resolvedTitle, "property");
    setMeta("og:description", resolvedDescription, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:locale", OG_LOCALE[englishOnly ? DEFAULT_LOCALE : locale] ?? "en_US", "property");

    // og:locale:alternate (one tag per other locale) — recreated each render so
    // navigating from a translated page to an English-only page clears stale tags.
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el) => el.remove());
    alternateLocales.forEach((l, idx) => {
      const el = document.createElement("meta");
      el.id = `og-locale-alt-${idx}`;
      el.setAttribute("property", "og:locale:alternate");
      el.setAttribute("content", OG_LOCALE[l] ?? l);
      document.head.appendChild(el);
    });

    if (ogImage) setMeta("og:image", ogImage, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", resolvedTitle);
    setMeta("twitter:description", resolvedDescription);

    // Canonical (self-referential per locale, English on Tier-3 routes)
    setLinkById("canonical-link", { rel: "canonical", href: canonical });

    // hreflang alternates — only for locales this route actually exists in.
    const hreflangLocales = englishOnly ? [DEFAULT_LOCALE] : SUPPORTED_LOCALES;
    SUPPORTED_LOCALES.forEach((l) => {
      if (!(hreflangLocales as readonly string[]).includes(l)) {
        removeById(`hreflang-${l}`);
        return;
      }
      const href = `${SITE}${buildLocaleUrl(l, barePath)}`.replace(/\/+$/, "") || SITE;
      setLinkById(`hreflang-${l}`, { rel: "alternate", hreflang: l, href });
    });
    setLinkById("hreflang-x-default", { rel: "alternate", hreflang: "x-default", href: englishHref });

    // Robots
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
  }, [
    resolvedTitle,
    resolvedDescription,
    canonical,
    englishHref,
    locale,
    barePath,
    noindex,
    ogImage,
    ogType,
    englishOnly,
  ]);


  // Cleanup hreflang/canonical on unmount? Keep them — next Head mount overwrites.
  useEffect(() => () => {
    // No-op; mounted Head components manage their own tags.
    void 0;
  }, []);

  return null;
}

// Helper kept for any code that may want to clear stale alternates manually.
export function clearLocaleAlternates() {
  SUPPORTED_LOCALES.forEach((l) => removeById(`hreflang-${l}`));
  removeById("hreflang-x-default");
}
