import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, RefreshCw, Languages, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { phase8PillarSlugs } from "@/data/phase8Pillars";

const LOCALES = ["es", "fr", "de", "pt", "it"] as const;
const LOCALE_NAMES: Record<string, string> = {
  es: "Spanish",
  fr: "French",
  de: "German",
  pt: "Portuguese",
  it: "Italian",
};

type Pipeline = {
  key: "guides" | "tools";
  label: string;
  table: "guide_translations" | "tool_translations";
  fn: string;
  stateId: string;
};

const PIPELINES: Pipeline[] = [
  {
    key: "guides",
    label: "Guide pillars",
    table: "guide_translations",
    fn: "translate-guides-cron",
    stateId: "guides",
  },
  {
    key: "tools",
    label: "Tools",
    table: "tool_translations",
    fn: "translate-tools-cron",
    stateId: "tools",
  },
];

function statusBadge(status: string | null) {
  const map: Record<string, { label: string; className: string }> = {
    ok: { label: "OK", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30" },
    done: { label: "Complete", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30" },
    quota_hit: { label: "Quota hit", className: "bg-amber-500/15 text-amber-600 border-amber-500/30" },
    error: { label: "Error", className: "bg-destructive/15 text-destructive border-destructive/30" },
    noop: { label: "Nothing to do", className: "bg-muted text-muted-foreground" },
  };
  const s = map[status ?? ""] ?? { label: status ?? "never run", className: "bg-muted text-muted-foreground" };
  return <Badge variant="outline" className={s.className}>{s.label}</Badge>;
}

const REASONS: Record<string, string> = {
  quota_hit:
    "The AI provider returned 402/429 (workspace credit limit or Gemini free-tier rate limit). The run stopped cleanly and resumes on the next pass.",
  error: "The run threw an unexpected error — check the edge function logs for the stack trace.",
  noop: "Nothing was missing for this locale on the last pass.",
};

export default function AdminTranslations() {
  const [running, setRunning] = useState<string | null>(null);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["translation-progress"],
    queryFn: async () => {
      const [guides, tools, state] = await Promise.all([
        supabase.from("guide_translations").select("guide_slug, locale, updated_at"),
        supabase.from("tool_translations").select("tool_id, locale, updated_at"),
        supabase.from("translation_cron_state").select("*"),
      ]);

      const countBy = (rows: { locale: string }[] | null) => {
        const m: Record<string, number> = {};
        for (const r of rows ?? []) m[r.locale] = (m[r.locale] ?? 0) + 1;
        return m;
      };
      const latestBy = (rows: { locale: string; updated_at: string }[] | null) => {
        const m: Record<string, string> = {};
        for (const r of rows ?? []) {
          if (!m[r.locale] || r.updated_at > m[r.locale]) m[r.locale] = r.updated_at;
        }
        return m;
      };

      const guideCounts = countBy(guides.data ?? []);
      const toolCounts = countBy(tools.data ?? []);

      return {
        counts: { guides: guideCounts, tools: toolCounts },
        latest: { guides: latestBy(guides.data ?? []), tools: latestBy(tools.data ?? []) },
        totals: {
          guides: phase8PillarSlugs.length,
          // The tool catalogue total isn't stored anywhere — the fullest locale is the source of truth.
          tools: Math.max(0, ...Object.values(toolCounts)),
        },
        state: Object.fromEntries((state.data ?? []).map((s) => [s.id, s])),
      };
    },
    refetchInterval: 60_000,
  });

  const runNow = async (fn: string, locale?: string) => {
    setRunning(`${fn}:${locale ?? "auto"}`);
    try {
      const { data: res, error } = await supabase.functions.invoke(
        locale ? `${fn}?locale=${locale}` : fn,
        { body: {} },
      );
      if (error) throw error;
      toast({
        title: "Run finished",
        description: `${res?.locale ?? locale ?? "auto"} — ${res?.status ?? "done"}, ${res?.filled ?? 0} filled`,
      });
      refetch();
    } catch (e) {
      toast({ title: "Run failed", description: String(e), variant: "destructive" });
    } finally {
      setRunning(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Languages className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-serif font-bold text-foreground">Translation Progress</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="space-y-8">
        {PIPELINES.map((p) => {
          const total = data?.totals[p.key] ?? 0;
          const state = data?.state[p.stateId] as
            | {
                next_country: string;
                last_run_at: string | null;
                last_run_status: string | null;
                last_filled_count: number | null;
              }
            | undefined;
          const complete = LOCALES.every((l) => (data?.counts[p.key][l] ?? 0) >= total && total > 0);

          return (
            <Card key={p.key}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {p.label}
                      {complete ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {total} source item{total === 1 ? "" : "s"} × {LOCALES.length} locales · next locale:{" "}
                      <span className="font-medium text-foreground">
                        {LOCALE_NAMES[state?.next_country ?? ""] ?? state?.next_country ?? "—"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {statusBadge(state?.last_run_status ?? null)}
                    <Button
                      size="sm"
                      onClick={() => runNow(p.fn)}
                      disabled={running !== null}
                    >
                      {running === `${p.fn}:auto` ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : null}
                      Run now
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-4">
                  Last run:{" "}
                  {state?.last_run_at
                    ? new Date(state.last_run_at).toLocaleString()
                    : "never"}{" "}
                  · filled last pass: {state?.last_filled_count ?? 0}
                  {state?.last_run_status && REASONS[state.last_run_status] ? (
                    <span className="block mt-1">{REASONS[state.last_run_status]}</span>
                  ) : null}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b">
                        <th className="py-2 pr-4 font-medium">Locale</th>
                        <th className="py-2 pr-4 font-medium">Generated</th>
                        <th className="py-2 pr-4 font-medium">Missing</th>
                        <th className="py-2 pr-4 font-medium w-1/3">Progress</th>
                        <th className="py-2 pr-4 font-medium">Last write</th>
                        <th className="py-2 font-medium sr-only">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LOCALES.map((l) => {
                        const done = data?.counts[p.key][l] ?? 0;
                        const missing = Math.max(0, total - done);
                        const pct = total ? Math.round((done / total) * 100) : 0;
                        const last = data?.latest[p.key][l];
                        return (
                          <tr key={l} className="border-b last:border-0">
                            <td className="py-2.5 pr-4 font-medium">
                              {LOCALE_NAMES[l]} <span className="text-muted-foreground">({l})</span>
                            </td>
                            <td className="py-2.5 pr-4">{done}</td>
                            <td className="py-2.5 pr-4">
                              {missing === 0 ? (
                                <span className="text-emerald-600">0</span>
                              ) : (
                                <span className="text-amber-600">{missing}</span>
                              )}
                            </td>
                            <td className="py-2.5 pr-4">
                              <div className="flex items-center gap-2">
                                <Progress value={pct} className="h-2" />
                                <span className="text-xs text-muted-foreground w-10 text-right">{pct}%</span>
                              </div>
                            </td>
                            <td className="py-2.5 pr-4 text-xs text-muted-foreground">
                              {last ? new Date(last).toLocaleDateString() : "—"}
                            </td>
                            <td className="py-2.5 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={running !== null || missing === 0}
                                onClick={() => runNow(p.fn, l)}
                              >
                                {running === `${p.fn}:${l}` ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  "Fill"
                                )}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
