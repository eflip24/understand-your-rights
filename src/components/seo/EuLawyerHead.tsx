import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import EnglishOnlyBanner from "./EnglishOnlyBanner";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import { buildEuPathsByLocale, type EuRouteCanonical } from "@/lib/eu/resolveRoute";

const SITE = "https://legallyspoken.com";

const OG_LOCALE: Record<string, string> = {
  en: "en_US", es: "es_ES", fr: "fr_FR", de: "de_DE", pt: "pt_PT", it: "it_IT",
};

interface EuHeadProps {
  title: string;
  description: string;
  /** Canonical EU route tuple — drives the per-locale hreflang map. */
  canonicalRoute: EuRouteCanonical;
  /** If true (or non-English locale on a Tier-3-only page), emits noindex. */
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

/**
 * Head component for the EU lawyer directory. Emits self-referential canonical
 * and full hreflang alternates using LOCALIZED paths from the slug registry.
 *
 * Note: this is the only place in the app where hreflang paths differ per
 * locale (rest of the site uses the same path for all 6 locales).
 */
export default function EuLawyerHead({
  title,
  description,
  canonicalRoute,
  noindex,
  ogImage,
  ogType = "website",
}: EuHeadProps) {
  const locale = useLocaleFromUrl();
  const { showBanner } = useEnglishOnlyState();

  const pathsByLocale = buildEuPathsByLocale(canonicalRoute);
  const canonical = `${SITE}${pathsByLocale[locale]}`.replace(/\/+$/, "") || SITE;
  const englishHref = `${SITE}${pathsByLocale[DEFAULT_LOCALE]}`.replace(/\/+$/, "") || SITE;

  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:locale", OG_LOCALE[locale] ?? "en_US", "property");

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
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    setLinkById("canonical-link", { rel: "canonical", href: canonical });

    SUPPORTED_LOCALES.forEach((l) => {
      const href = `${SITE}${pathsByLocale[l]}`.replace(/\/+$/, "") || SITE;
      setLinkById(`hreflang-${l}`, { rel: "alternate", hreflang: l, href });
    });
    setLinkById("hreflang-x-default", { rel: "alternate", hreflang: "x-default", href: englishHref });

    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
  }, [title, description, canonical, englishHref, locale, noindex, ogImage, ogType, JSON.stringify(pathsByLocale)]);

  return showBanner ? <EnglishOnlyBanner /> : null;
}

/** EU pages are Tier-1 (translated UI shell), so the banner is suppressed. */
function useEnglishOnlyState() {
  return { showBanner: false };
}
