import { useEffect, useState } from "react";
import i18n from "./config";
import { supabase } from "@/integrations/supabase/client";

type ToolOverride = {
  name?: string;
  description?: string;
  shortDescription?: string;
  faqs?: { question: string; answer: string }[];
};
type CategoriesOverride = Record<string, { label: string; description: string }>;
type LocaleOverrides = {
  tools: Record<string, ToolOverride>;
  categories: CategoriesOverride;
};

const cache = new Map<string, LocaleOverrides>();
const inflight = new Map<string, Promise<LocaleOverrides>>();

async function loadOverrides(locale: string): Promise<LocaleOverrides> {
  if (cache.has(locale)) return cache.get(locale)!;
  if (inflight.has(locale)) return inflight.get(locale)!;
  const p = (async () => {
    try {
      const { data, error } = await supabase
        .from("tool_translations")
        .select("tool_id, data")
        .eq("locale", locale);
      const result: LocaleOverrides = { tools: {}, categories: {} };
      if (error || !data) return result;
      for (const row of data) {
        if (row.tool_id === "__categories__") {
          result.categories = row.data as CategoriesOverride;
        } else {
          result.tools[row.tool_id as string] = row.data as ToolOverride;
        }
      }
      cache.set(locale, result);
      return result;
    } finally {
      inflight.delete(locale);
    }
  })();
  inflight.set(locale, p);
  return p;
}

/**
 * Subscribes to DB-backed overrides for the current locale.
 * Used as a transparent fallback when a tool was added after the
 * static i18n JSON was last regenerated.
 */
export function useToolTranslationOverrides() {
  const [locale, setLocale] = useState<string>(() => (i18n.language || "en").split("-")[0]);
  const [overrides, setOverrides] = useState<LocaleOverrides>(
    () => cache.get(locale) ?? { tools: {}, categories: {} },
  );
  useEffect(() => {
    const handler = (lng: string) => setLocale((lng || "en").split("-")[0]);
    i18n.on("languageChanged", handler);
    return () => { i18n.off("languageChanged", handler); };
  }, []);
  useEffect(() => {
    if (locale === "en") {
      setOverrides({ tools: {}, categories: {} });
      return;
    }
    let cancelled = false;
    loadOverrides(locale).then((o) => { if (!cancelled) setOverrides(o); });
    return () => { cancelled = true; };
  }, [locale]);
  return overrides;
}
