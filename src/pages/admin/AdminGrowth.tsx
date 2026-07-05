import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, RefreshCw, TrendingUp, Sparkles, Check, X, Wand2, ExternalLink } from "lucide-react";
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
}
interface Sprint {
  id: string;
  cluster_id: string | null;
  type: string;
  title: string;
  spec: Record<string, unknown>;
  status: string;
  generated_asset_id: string | null;
  notes: string | null;
  created_at: string;
}
interface Run {
  id: string;
  function_name: string;
  status: string;
  stats: Record<string, unknown>;
  error: string | null;
  started_at: string;
}

export default function AdminGrowth() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [c, k, s, r] = await Promise.all([
      supabase.from("content_clusters").select("*").order("priority_score", { ascending: false }),
      supabase
        .from("keyword_candidates")
        .select("id,keyword,cpc,volume,kd,intent,cluster,priority_score,status")
        .order("priority_score", { ascending: false })
        .limit(100),
      supabase.from("sprint_queue").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("growth_runs").select("*").order("started_at", { ascending: false }).limit(15),
    ]);
    setClusters((c.data as Cluster[]) ?? []);
    setKeywords((k.data as Keyword[]) ?? []);
    setSprints((s.data as Sprint[]) ?? []);
    setRuns((r.data as Run[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const runPlanner = async () => {
    setBusy("planner");
    try {
      const { data, error } = await supabase.functions.invoke("sprint-planner", {
        body: { per_cluster: 1, type: "blog" },
      });
      if (error) throw error;
      toast.success(`Planner created ${data?.created?.length ?? 0} sprints (skipped ${data?.skipped?.length ?? 0})`);
      await load();
    } catch (e) {
      toast.error(`Planner failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(null);
    }
  };

  const updateSprint = async (id: string, patch: Partial<Sprint>) => {
    const { error } = await supabase.from("sprint_queue").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else await load();
  };

  const generate = async (sprint: Sprint) => {
    setBusy(sprint.id);
    try {
      // Auto-approve if still awaiting
      if (sprint.status === "awaiting_review") {
        await supabase
          .from("sprint_queue")
          .update({ status: "approved", approved_at: new Date().toISOString() })
          .eq("id", sprint.id);
      }
      const { data, error } = await supabase.functions.invoke("content-forge", {
        body: { sprint_id: sprint.id },
      });
      if (error) throw error;
      toast.success(`Draft created: ${data?.slug}`);
      await load();
    } catch (e) {
      toast.error(`Generation failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(null);
    }
  };

  const statusColor = (s: string) => {
    if (s === "awaiting_review") return "secondary";
    if (s === "approved") return "default";
    if (s === "generated") return "default";
    if (s === "rejected") return "destructive";
    return "outline";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" /> Growth Pipeline
          </h1>
          <p className="text-sm text-muted-foreground">
            Semrush-fed keyword radar → sprint planner → content forge.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button size="sm" onClick={runPlanner} disabled={busy === "planner"}>
            {busy === "planner" ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Plan next sprints
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sprints">
        <TabsList>
          <TabsTrigger value="sprints">Sprints ({sprints.length})</TabsTrigger>
          <TabsTrigger value="keywords">Keywords ({keywords.length})</TabsTrigger>
          <TabsTrigger value="clusters">Clusters ({clusters.length})</TabsTrigger>
          <TabsTrigger value="runs">Runs</TabsTrigger>
        </TabsList>

        <TabsContent value="sprints" className="space-y-3 mt-4">
          {sprints.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No sprints yet. Click <em>Plan next sprints</em>.
            </p>
          ) : (
            sprints.map((s) => {
              const spec = s.spec ?? {};
              return (
                <Card key={s.id}>
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium">{s.title}</p>
                          <Badge variant={statusColor(s.status)} className="text-xs">
                            {s.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{s.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          KW: <span className="font-mono">{String(spec.target_keyword ?? "-")}</span>
                          {" · "}CPC ${String(spec.cpc ?? "?")}
                          {" · "}Vol {String(spec.volume ?? "?")}
                          {" · "}KD {String(spec.kd ?? "?")}
                          {" · "}score {String(spec.priority_score ?? "?")}
                        </p>
                        {spec.angle && (
                          <p className="text-sm mt-1 italic text-muted-foreground">"{String(spec.angle)}"</p>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {s.status === "awaiting_review" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => updateSprint(s.id, { status: "approved", approved_at: new Date().toISOString() })}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateSprint(s.id, { status: "rejected" })}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {(s.status === "approved" || s.status === "awaiting_review") && (
                          <Button size="sm" onClick={() => generate(s)} disabled={busy === s.id}>
                            {busy === s.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                            <span className="ml-1">Generate</span>
                          </Button>
                        )}
                        {s.status === "generated" && s.generated_asset_id && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={`/admin/blog/edit/${s.generated_asset_id}`}>
                              <ExternalLink className="h-4 w-4 mr-1" /> Draft
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="keywords" className="mt-4">
          <Card>
            <CardContent className="pt-4 overflow-x-auto">
              {keywords.length === 0 ? (
                <p className="text-sm text-muted-foreground">No keywords yet.</p>
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
                          <Badge variant="outline" className="text-xs">{k.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clusters" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {clusters.map((c) => (
              <Card key={c.id}>
                <CardContent className="pt-4">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="runs" className="mt-4">
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
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs">{r.function_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(r.started_at).toLocaleString()}
                          {r.error && ` — ${r.error.slice(0, 100)}`}
                        </p>
                        {r.stats && Object.keys(r.stats).length > 0 && (
                          <p className="text-xs text-muted-foreground font-mono truncate">
                            {JSON.stringify(r.stats)}
                          </p>
                        )}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
