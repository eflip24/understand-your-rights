import { useEffect, useState } from "react";
import i18n from "./config";
import { supabase } from "@/integrations/supabase/client";
import type { Phase8Pillar } from "@/data/phase8Pillars";

/**
 * DB-backed translation overlay for Phase-8 guide pillars.
 *
 * English always renders the static `phase8Pillars` data. Other locales
 * transparently merge whatever `guide_translations` rows exist — so a guide
 * that hasn't been translated yet still renders (in English) instead of
 * breaking, and hreflang/canonical stay honest via `isTranslated`.
 */

type GuideOverride = Partial<
  Pick<
    Phase8Pillar,
    | "h1"
    | "metaTitle"
    | "metaDescription"
    | "tagline"
    | "intro"
    | "keyFacts"
    | "sections"
    | "howTo"
    | "faqs"
  >
> & {
  entityBlock?: { category?: string; intro?: string };
  primaryCta?: { label?: string; description?: string };
  lawyerCta?: { label?: string; description?: string };
  related?: { label?: string; blurb?: string }[];
};

const cache = new Map<string, GuideOverride | null>();
const inflight = new Map<string, Promise<GuideOverride | null>>();

async function loadGuideOverride(slug: string, locale: string) {
  const key = `${locale}:${slug}`;
  if (cache.has(key)) return cache.get(key)!;
  if (inflight.has(key)) return inflight.get(key)!;
  const p = (async () => {
    try {
      const { data, error } = await supabase
        .from("guide_translations")
        .select("data")
        .eq("locale", locale)
        .eq("guide_slug", slug)
        .maybeSingle();
      const value = error || !data ? null : (data.data as GuideOverride);
      cache.set(key, value);
      return value;
    } catch {
      cache.set(key, null);
      return null;
    } finally {
      inflight.delete(key);
    }
  })();
  inflight.set(key, p);
  return p;
}

/** Merge a translation overlay onto the English pillar, field by field. */
function merge(base: Phase8Pillar, o: GuideOverride): Phase8Pillar {
  return {
    ...base,
    h1: o.h1 ?? base.h1,
    metaTitle: o.metaTitle ?? base.metaTitle,
    metaDescription: o.metaDescription ?? base.metaDescription,
    tagline: o.tagline ?? base.tagline,
    intro: o.intro?.length ? o.intro : base.intro,
    entityBlock: {
      ...base.entityBlock,
      category: o.entityBlock?.category ?? base.entityBlock.category,
      intro: o.entityBlock?.intro ?? base.entityBlock.intro,
    },
    keyFacts: o.keyFacts?.length === base.keyFacts.length ? o.keyFacts : base.keyFacts,
    sections:
      o.sections?.length === base.sections.length
        ? base.sections.map((s, i) => ({
            ...s,
            heading: o.sections![i].heading ?? s.heading,
            paragraphs: o.sections![i].paragraphs?.length ? o.sections![i].paragraphs : s.paragraphs,
            bullets: o.sections![i].bullets?.length ? o.sections![i].bullets : s.bullets,
          }))
        : base.sections,
    howTo: o.howTo?.length === base.howTo.length ? o.howTo : base.howTo,
    faqs: o.faqs?.length === base.faqs.length ? o.faqs : base.faqs,
    primaryCta: {
      ...base.primaryCta,
      label: o.primaryCta?.label ?? base.primaryCta.label,
      description: o.primaryCta?.description ?? base.primaryCta.description,
    },
    lawyerCta: {
      ...base.lawyerCta,
      label: o.lawyerCta?.label ?? base.lawyerCta.label,
      description: o.lawyerCta?.description ?? base.lawyerCta.description,
    },
    related:
      o.related?.length === base.related.length
        ? base.related.map((r, i) => ({
            ...r,
            label: o.related![i].label ?? r.label,
            blurb: o.related![i].blurb || r.blurb,
          }))
        : base.related,
  };
}

export function useLocalizedGuide(base: Phase8Pillar) {
  const [locale, setLocale] = useState(() => (i18n.language || "en").split("-")[0]);
  const [overlay, setOverlay] = useState<GuideOverride | null>(
    () => cache.get(`${locale}:${base.slug}`) ?? null,
  );
  const [loading, setLoading] = useState(locale !== "en");

  useEffect(() => {
    const handler = (lng: string) => setLocale((lng || "en").split("-")[0]);
    i18n.on("languageChanged", handler);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);

  useEffect(() => {
    if (locale === "en") {
      setOverlay(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    loadGuideOverride(base.slug, locale).then((o) => {
      if (cancelled) return;
      setOverlay(o);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [base.slug, locale]);

  return {
    guide: overlay ? merge(base, overlay) : base,
    /** True when this locale has a real translation (drives hreflang scope). */
    isTranslated: locale === "en" || !!overlay,
    loading,
  };
}
