import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { AutoSaveStatus } from "@/components/forms/AutoSaveIndicator";

type DraftData = Record<string, unknown>;

interface Options {
  slug: string;
  totalSteps: number;
}

const lsKey = (slug: string) => `forms:${slug}`;

/**
 * Loads any saved draft (Supabase for logged-in users, localStorage always),
 * exposes editing helpers, and autosaves back to both destinations with a
 * 1.5s debounce. Users can therefore resume a form on the same device even
 * without a login, and across devices once signed in.
 */
export function useFormDraft({ slug, totalSteps }: Options) {
  const { user } = useAuth();
  const [data, setData] = useState<DraftData>({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<AutoSaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Local first (instant)
      try {
        const raw = localStorage.getItem(lsKey(slug));
        if (raw) {
          const parsed = JSON.parse(raw) as { data: DraftData; step: number; savedAt?: string };
          if (!cancelled) {
            setData(parsed.data || {});
            setStep(Math.min(parsed.step ?? 0, totalSteps - 1));
            if (parsed.savedAt) setLastSavedAt(new Date(parsed.savedAt));
          }
        }
      } catch { /* ignore */ }

      if (user) {
        const { data: row } = await supabase
          .from("form_drafts")
          .select("data, step, updated_at")
          .eq("user_id", user.id)
          .eq("form_slug", slug)
          .maybeSingle();
        if (!cancelled && row) {
          setData((row.data as DraftData) || {});
          setStep(Math.min((row.step as number) ?? 0, totalSteps - 1));
          if (row.updated_at) setLastSavedAt(new Date(row.updated_at as string));
        }
      }
      if (!cancelled) setLoaded(true);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, user?.id]);

  const persist = useCallback(async (nextData: DraftData, nextStep: number) => {
    const savedAt = new Date().toISOString();
    const progress = calcProgress(nextData, nextStep, totalSteps);

    // Always mirror to localStorage
    try {
      localStorage.setItem(lsKey(slug), JSON.stringify({ data: nextData, step: nextStep, savedAt }));
    } catch { /* quota — ignore */ }

    if (!user) {
      setStatus("saved");
      setLastSavedAt(new Date(savedAt));
      return;
    }

    setStatus("saving");
    const { error } = await supabase
      .from("form_drafts")
      .upsert(
        [{
          user_id: user.id,
          form_slug: slug,
          data: nextData as never,
          step: nextStep,
          progress_pct: progress,
        }],
        { onConflict: "user_id,form_slug" }
      );
    if (error) {
      setStatus("offline");
    } else {
      setStatus("saved");
      setLastSavedAt(new Date(savedAt));
    }
  }, [slug, totalSteps, user]);

  // Debounced autosave whenever data / step change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setStatus("saving");
    saveTimer.current = setTimeout(() => { persist(data, step); }, 1500);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [data, step, loaded, persist]);

  const setField = useCallback((fieldId: string, value: unknown) => {
    setData((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const reset = useCallback(async () => {
    setData({});
    setStep(0);
    try { localStorage.removeItem(lsKey(slug)); } catch { /* noop */ }
    if (user) {
      await supabase.from("form_drafts").delete().eq("user_id", user.id).eq("form_slug", slug);
    }
    setStatus("idle");
    setLastSavedAt(null);
  }, [slug, user]);

  const progressPct = calcProgress(data, step, totalSteps);

  return { data, setData, setField, step, setStep, status, lastSavedAt, loaded, reset, progressPct };
}

function calcProgress(data: DraftData, step: number, totalSteps: number): number {
  const stepPct = totalSteps > 0 ? Math.round(((step + 1) / totalSteps) * 100) : 0;
  const filled = Object.values(data).filter((v) => v !== "" && v !== null && v !== undefined && v !== false).length;
  const dataPct = filled > 0 ? Math.min(100, filled * 5) : 0;
  return Math.max(stepPct, Math.min(100, dataPct));
}
