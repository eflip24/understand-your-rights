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
}: HeadProps) {
  const location = useLocation();
  const locale = useLocaleFromUrl();
  const { t } = useTranslation();

  const resolvedTitle = titleKey ? (t(titleKey, { defaultValue: title }) as string) : title;
  const resolvedDescription = descriptionKey
    ? (t(descriptionKey, { defaultValue: description }) as string)
    : description;

  const barePath = stripLocalePrefix(location.pathname);
  const canonical = `${SITE}${buildLocaleUrl(locale, barePath)}`.replace(/\/+$/, "") || SITE;
  const englishHref = `${SITE}${buildLocaleUrl(DEFAULT_LOCALE, barePath)}`.replace(/\/+$/, "") || SITE;

  useEffect(() => {
    document.title = resolvedTitle;

    setMeta("description", resolvedDescription);
    setMeta("og:title", resolvedTitle, "property");
    setMeta("og:description", resolvedDescription, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:locale", OG_LOCALE[locale] ?? "en_US", "property");

    // og:locale:alternate (one tag per other locale)
    SUPPORTED_LOCALES.filter((l) => l !== locale).forEach((l, idx) => {
      const id = `og-locale-alt-${idx}`;
      let el = document.getElementById(id) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.id = id;
        el.setAttribute("property", "og:locale:alternate");
        document.head.appendChild(el);
      }
      el.setAttribute("content", OG_LOCALE[l] ?? l);
    });

    if (ogImage) setMeta("og:image", ogImage, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", resolvedTitle);
    setMeta("twitter:description", resolvedDescription);

    // Canonical (self-referential per locale)
    setLinkById("canonical-link", { rel: "canonical", href: canonical });

    // hreflang alternates
    SUPPORTED_LOCALES.forEach((l) => {
      const href = `${SITE}${buildLocaleUrl(l, barePath)}`.replace(/\/+$/, "") || SITE;
      setLinkById(`hreflang-${l}`, { rel: "alternate", hreflang: l, href });
    });
    setLinkById("hreflang-x-default", { rel: "alternate", hreflang: "x-default", href: englishHref });

    // Robots
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
  }, [resolvedTitle, resolvedDescription, canonical, englishHref, locale, barePath, noindex, ogImage, ogType]);

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
