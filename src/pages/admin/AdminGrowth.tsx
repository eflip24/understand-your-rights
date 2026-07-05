import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Cluster {
  id: string;
  name: string;
  description: string | null;
  seed_keywords: string[];
  priority_score: number;
  auto_publish: boolean;
  active: boolean;
}

interface Keyword {
  id: string;
  keyword: string;
  cpc: number | null;
  volume: number | null;
  kd: number | null;
  intent: string | null;
  cluster: string | null;
  priority_score: number | null;
  status: string;
  created_at: string;
}

interface Run {
  id: string;
  function_name: string;
  status: string;
  stats: Record<string, unknown>;
  error: string | null;
  started_at: string;
  finished_at: string | null;
}

export default function AdminGrowth() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);

  const load = async () => {
    setLoading(true);
    const [c, k, r] = await Promise.all([
      supabase.from("content_clusters").select("*").order("priority_score", { ascending: false }),
      supabase
        .from("keyword_candidates")
        .select("*")
        .order("priority_score", { ascending: false })
        .limit(100),
      supabase
        .from("growth_runs")
        .select("*")
        .order("started_at", { ascending: false })
        .limit(10),
    ]);
    setClusters((c.data as Cluster[]) ?? []);
    setKeywords((k.data as Keyword[]) ?? []);
    setRuns((r.data as Run[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const runKeywordRadar = async () => {
    setTriggering(true);
    try {
      const { data, error } = await supabase.functions.invoke("keyword-radar", { body: {} });
      if (error) throw error;
      toast.success(`Radar complete: kept ${data?.kept ?? 0} of ${data?.scanned ?? 0}`);
      await load();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`Radar failed: ${msg}`);
    } finally {
      setTriggering(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" /> Growth Pipeline
          </h1>
          <p className="text-sm text-muted-foreground">
            Automated CPC keyword radar, sprint planner, and content forge.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" onClick={runKeywordRadar} disabled={triggering}>
            {triggering && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Run keyword radar now
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Clusters ({clusters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {clusters.map((c) => (
              <div key={c.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{c.name}</p>
                  <Badge variant={c.active ? "default" : "secondary"}>
                    {c.active ? "active" : "paused"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{c.description}</p>
                <p className="text-xs mt-2 text-muted-foreground">
                  {c.seed_keywords.length} seeds · priority {c.priority_score}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top keyword candidates ({keywords.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {keywords.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No keywords yet. Connect Semrush in Lovable settings, then run the radar.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-xs text-muted-foreground">
                  <th className="py-2 pr-3">Keyword</th>
                  <th className="pr-3">Cluster</th>
                  <th className="pr-3 text-right">CPC</th>
                  <th className="pr-3 text-right">Vol</th>
                  <th className="pr-3 text-right">KD</th>
                  <th className="pr-3 text-right">Score</th>
                  <th className="pr-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((k) => (
                  <tr key={k.id} className="border-b hover:bg-muted/40">
                    <td className="py-1.5 pr-3">{k.keyword}</td>
                    <td className="pr-3 text-xs text-muted-foreground">{k.cluster}</td>
                    <td className="pr-3 text-right">${k.cpc?.toFixed(2)}</td>
                    <td className="pr-3 text-right">{k.volume?.toLocaleString()}</td>
                    <td className="pr-3 text-right">{k.kd?.toFixed(0)}</td>
                    <td className="pr-3 text-right font-medium">{k.priority_score}</td>
                    <td className="pr-3">
                      <Badge variant="outline" className="text-xs">
                        {k.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent runs</CardTitle>
        </CardHeader>
        <CardContent>
          {runs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No runs yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {runs.map((r) => (
                <li key={r.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-mono text-xs">{r.function_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.started_at).toLocaleString()}
                      {r.error && ` — ${r.error.slice(0, 80)}`}
                    </p>
                  </div>
                  <Badge
                    variant={
                      r.status === "success"
                        ? "default"
                        : r.status === "error"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {r.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
