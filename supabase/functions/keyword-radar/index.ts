// keyword-radar: weekly Semrush pull for CPC-rich legal keywords.
// Triggered by pg_cron every Monday 07:00 UTC (see growth-cron migration).
// Requires: SEMRUSH_API_KEY (from Semrush connector), LOVABLE_API_KEY, CRON_SECRET.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/semrush";

interface SemrushRow {
  Ph?: string; // phrase
  Nq?: string; // volume
  Cp?: string; // cpc
  Kd?: string; // difficulty
  Co?: string; // competition
  In?: string; // intent
}

async function semrushKeywordFullSearch(
  seed: string,
  database = "us",
  limit = 25,
): Promise<SemrushRow[]> {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const semrushKey = Deno.env.get("SEMRUSH_API_KEY");
  if (!lovableKey || !semrushKey) {
    throw new Error("Missing LOVABLE_API_KEY or SEMRUSH_API_KEY (link Semrush connector)");
  }
  const params = new URLSearchParams({
    phrase: seed,
    database,
    export_columns: "Ph,Nq,Cp,Kd,Co,In",
    display_limit: String(limit),
  });
  const url = `${GATEWAY}/keywords/phrase_fullsearch?${params}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": semrushKey,
      "Allow-Limit-Offset": "true",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Semrush ${res.status}: ${text.slice(0, 300)}`);
  }
  const json = await res.json();
  const rows = json?.data?.rows ?? [];
  const cols: string[] = json?.data?.columnNames ?? [];
  return rows.map((r: string[]) => {
    const obj: Record<string, string> = {};
    cols.forEach((c, i) => (obj[c] = r[i]));
    return obj as SemrushRow;
  });
}

function score(cpc: number, volume: number, kd: number): number {
  // Higher = better. Rewards CPC*volume, penalizes difficulty.
  return Math.round(((cpc * Math.log10(volume + 10)) / (kd + 10)) * 100) / 100;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const cronSecret = Deno.env.get("CRON_SECRET");
  const provided = req.headers.get("x-cron-secret") ?? req.headers.get("X-Cron-Secret");
  const isCron = cronSecret && provided === cronSecret;

  // Manual runs also require an admin bearer via Supabase JWT-check below.
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey);

  if (!isCron) {
    const auth = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!auth) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: userRes } = await admin.auth.getUser(auth);
    if (!userRes?.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userRes.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // Log run
  const { data: runRow, error: runErr } = await admin
    .from("growth_runs")
    .insert({ function_name: "keyword-radar", status: "running" })
    .select("id")
    .single();
  if (runErr) {
    return new Response(JSON.stringify({ error: runErr.message }), { status: 500, headers: corsHeaders });
  }
  const runId = runRow.id;

  try {
    // Pull active clusters + their seeds
    const { data: clusters, error: cErr } = await admin
      .from("content_clusters")
      .select("id,name,seed_keywords")
      .eq("active", true);
    if (cErr) throw cErr;

    const MIN_CPC = 15;
    const MAX_KD = 55;
    const MIN_VOL = 300;
    const MAX_VOL = 8000;

    let inserted = 0;
    let scanned = 0;
    const clusterStats: Record<string, number> = {};

    for (const cluster of clusters ?? []) {
      for (const seed of cluster.seed_keywords ?? []) {
        let rows: SemrushRow[] = [];
        try {
          rows = await semrushKeywordFullSearch(seed, "us", 25);
        } catch (e) {
          console.error(`seed ${seed} failed:`, e);
          continue;
        }
        scanned += rows.length;

        const candidates = rows
          .map((r) => {
            const cpc = parseFloat(r.Cp ?? "0");
            const volume = parseInt(r.Nq ?? "0", 10);
            const kd = parseFloat(r.Kd ?? "100");
            return {
              keyword: (r.Ph ?? "").toLowerCase().trim(),
              database: "us",
              cpc,
              volume,
              kd,
              competition: r.Co ? parseFloat(r.Co) : null,
              intent: r.In ?? null,
              cluster: cluster.name,
              source_run: runId,
              priority_score: score(cpc, volume, kd),
              status: "new",
            };
          })
          .filter(
            (c) =>
              c.keyword &&
              c.cpc >= MIN_CPC &&
              c.kd <= MAX_KD &&
              c.volume >= MIN_VOL &&
              c.volume <= MAX_VOL,
          );

        if (candidates.length) {
          const { error: upErr, count } = await admin
            .from("keyword_candidates")
            .upsert(candidates, { onConflict: "keyword,database", count: "exact" });
          if (upErr) console.error("upsert error:", upErr);
          else {
            inserted += candidates.length;
            clusterStats[cluster.name] = (clusterStats[cluster.name] ?? 0) + candidates.length;
          }
        }

        // Be nice to Semrush
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    await admin
      .from("growth_runs")
      .update({
        status: "success",
        finished_at: new Date().toISOString(),
        stats: { scanned, kept: inserted, clusters: clusterStats },
      })
      .eq("id", runId);

    return new Response(
      JSON.stringify({ ok: true, run_id: runId, scanned, kept: inserted, clusters: clusterStats }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const msg = (e as Error).message ?? String(e);
    await admin
      .from("growth_runs")
      .update({ status: "error", error: msg, finished_at: new Date().toISOString() })
      .eq("id", runId);
    return new Response(JSON.stringify({ error: msg, run_id: runId }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
