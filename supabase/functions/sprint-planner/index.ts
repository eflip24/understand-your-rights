// sprint-planner: score keyword candidates, pick top N per cluster,
// use Lovable AI to draft a blog spec, insert into sprint_queue as 'awaiting_review'.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

async function requireAdmin(req: Request): Promise<Response | null> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey);
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return json({ error: "unauthorized" }, 401);
  const { data } = await admin.auth.getUser(token);
  if (!data?.user) return json({ error: "unauthorized" }, 401);
  const { data: role } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!role) return json({ error: "forbidden" }, 403);
  return null;
}
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

interface Candidate {
  id: string;
  keyword: string;
  cpc: number;
  volume: number;
  kd: number;
  intent: string;
  cluster: string;
  priority_score: number;
}

async function draftSpec(kw: Candidate, lovableKey: string) {
  const prompt = `You are planning a legal blog post for LegallySpoken.com.

Target keyword: "${kw.keyword}"
Cluster: ${kw.cluster}
Volume: ${kw.volume}/mo · CPC: $${kw.cpc} · KD: ${kw.kd} · intent: ${kw.intent}

Draft a concise sprint spec. Respond with pure JSON, no code fences:
{
  "title": "SEO title under 60 chars, includes the keyword",
  "angle": "one-sentence unique angle vs generic articles",
  "outline": ["H2 section 1", "H2 section 2", "..." ],
  "faq_questions": ["q1", "q2", "q3", "q4", "q5"],
  "internal_link_targets": ["/tools/consumer/settlement-estimator", "..."],
  "cta": "action we want the reader to take (which tool/page)"
}`;

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(`AI ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  const raw = j.choices?.[0]?.message?.content ?? "{}";
  try {
    return JSON.parse(raw);
  } catch {
    return { title: kw.keyword, outline: [], faq_questions: [], internal_link_targets: [], cta: "" };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const authFail = await requireAdmin(req);
  if (authFail) return authFail;

  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableKey) return json({ error: "LOVABLE_API_KEY missing" }, 500);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const body = await req.json().catch(() => ({}));
  const perCluster: number = body?.per_cluster ?? 1;
  const type: string = body?.type ?? "blog";

  const { data: runRow } = await admin
    .from("growth_runs")
    .insert({ function_name: "sprint-planner", status: "running" })
    .select("id")
    .single();
  const runId = runRow!.id;

  try {
    // Pull best 'new' candidate(s) per cluster
    const { data: cands, error } = await admin
      .from("keyword_candidates")
      .select("id,keyword,cpc,volume,kd,intent,cluster,priority_score")
      .eq("status", "new")
      .order("priority_score", { ascending: false })
      .limit(200);
    if (error) throw error;

    const byCluster = new Map<string, Candidate[]>();
    for (const c of (cands as Candidate[]) ?? []) {
      const arr = byCluster.get(c.cluster) ?? [];
      if (arr.length < perCluster) arr.push(c);
      byCluster.set(c.cluster, arr);
    }

    const created: string[] = [];
    const skipped: string[] = [];

    for (const [clusterName, picks] of byCluster) {
      // Look up cluster id
      const { data: cluster } = await admin
        .from("content_clusters")
        .select("id")
        .eq("name", clusterName)
        .maybeSingle();

      for (const kw of picks) {
        // Skip if a sprint already exists for this keyword
        const { count } = await admin
          .from("sprint_queue")
          .select("id", { count: "exact", head: true })
          .eq("title", kw.keyword);
        if ((count ?? 0) > 0) {
          skipped.push(kw.keyword);
          continue;
        }

        let spec: Record<string, unknown> = {};
        try {
          spec = await draftSpec(kw, lovableKey);
        } catch (e) {
          console.error("spec draft failed", kw.keyword, e);
          spec = { error: (e as Error).message };
        }

        const { data: inserted, error: insErr } = await admin
          .from("sprint_queue")
          .insert({
            cluster_id: cluster?.id ?? null,
            type,
            title: (spec.title as string) ?? kw.keyword,
            spec: {
              ...spec,
              target_keyword: kw.keyword,
              cpc: kw.cpc,
              volume: kw.volume,
              kd: kw.kd,
              priority_score: kw.priority_score,
              candidate_id: kw.id,
            },
            status: "awaiting_review",
          })
          .select("id")
          .single();
        if (insErr) {
          console.error(insErr);
          continue;
        }
        created.push(inserted!.id);

        // Move candidate to 'queued'
        await admin.from("keyword_candidates").update({ status: "queued" }).eq("id", kw.id);
      }
    }

    await admin
      .from("growth_runs")
      .update({
        status: "success",
        finished_at: new Date().toISOString(),
        stats: { created: created.length, skipped: skipped.length, type },
      })
      .eq("id", runId);

    return json({ ok: true, created, skipped, run_id: runId });
  } catch (e) {
    const msg = (e as Error).message ?? String(e);
    await admin
      .from("growth_runs")
      .update({ status: "error", error: msg, finished_at: new Date().toISOString() })
      .eq("id", runId);
    return json({ error: msg }, 500);
  }
});
