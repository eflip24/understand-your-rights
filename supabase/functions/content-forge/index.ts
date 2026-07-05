// content-forge: take an approved sprint, generate a full blog article via
// Lovable AI, insert into public.blog_posts as a draft, mark sprint 'generated'.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

const INTERNAL_LINKS = `
- /tools/consumer/settlement-estimator — Settlement Estimator
- /tools/consumer/statute-of-limitations-lookup — Statute of Limitations Lookup
- /tools/consumer/accident-damage-calculator — Accident Damage Calculator
- /tools/consumer/attorney-fee-calculator — Attorney Fee Calculator
- /tools/employment/overtime-calculator — Overtime Calculator
- /tools/employment/severance-pay-calculator — Severance Pay Calculator
- /tools/employment/wrongful-termination-checklist — Wrongful Termination Checklist
- /tools/realestate/security-deposit-calculator — Security Deposit Calculator
- /tools/family/child-support-calculator — Child Support Calculator
- /tools/family/alimony-calculator — Alimony Calculator
- /tools/family/divorce-cost-estimator — Divorce Cost Estimator
- /lawyer-near-me — Find a Lawyer Near You
- /personal-injury-law — Personal Injury Law Guide
- /employment-law — Employment Law Guide
- /landlord-tenant-law — Landlord-Tenant Law Guide
`;

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Admin JWT required
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return json({ error: "unauthorized" }, 401);
  const { data: userRes } = await admin.auth.getUser(token);
  if (!userRes?.user) return json({ error: "unauthorized" }, 401);
  const { data: role } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", userRes.user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!role) return json({ error: "forbidden" }, 403);

  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableKey) return json({ error: "LOVABLE_API_KEY missing" }, 500);

  const { sprint_id } = await req.json().catch(() => ({}));
  if (!sprint_id) return json({ error: "sprint_id required" }, 400);

  const { data: sprint, error: sprintErr } = await admin
    .from("sprint_queue")
    .select("*")
    .eq("id", sprint_id)
    .maybeSingle();
  if (sprintErr || !sprint) return json({ error: "sprint not found" }, 404);
  if (sprint.status !== "approved") {
    return json({ error: `sprint status must be 'approved', got '${sprint.status}'` }, 400);
  }
  if (sprint.type !== "blog") {
    return json({ error: `only blog sprints supported in this version, got '${sprint.type}'` }, 400);
  }

  const spec = sprint.spec ?? {};
  const kw = spec.target_keyword ?? sprint.title;

  const { data: runRow } = await admin
    .from("growth_runs")
    .insert({ function_name: "content-forge", status: "running", stats: { sprint_id } })
    .select("id")
    .single();
  const runId = runRow!.id;

  try {
    const systemPrompt = `You are a senior legal content writer for LegallySpoken.com.
Write authoritative, SEO-optimized, plain-English legal articles.

RULES:
1. Answer-First format: first paragraph directly answers the topic.
2. Use H2 and H3 headings, NOT H1 (title is H1).
3. 1500-2000 words of HTML content.
4. FAQ section at end: <h2>Frequently Asked Questions</h2> then <h3>question</h3><p>answer</p>.
5. Naturally link to 3-5 relevant internal pages:
${INTERNAL_LINKS}
6. End with: <p><em>This article is for informational purposes only and does not constitute legal advice. Consult a qualified attorney for advice specific to your situation.</em></p>
7. Target keyword: "${kw}" — first paragraph, at least one H2, and 2-3x throughout.
8. Strong E-E-A-T: cite specific statutes, real deadlines, precise dollar figures.
9. Pure HTML output. No markdown. No code fences.

Respond with a JSON object (no code fences):
{ "title": "...", "slug": "...", "excerpt": "...", "content": "<full html>", "faqs": [{"question":"...","answer":"..."}] }`;

    const outline = (spec.outline as string[])?.join(", ") ?? "";
    const angle = (spec.angle as string) ?? "";

    const res = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Write the article. Title direction: "${sprint.title}". Angle: ${angle}. Suggested H2s: ${outline}.`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_blog_article",
              description: "Structured blog article",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  slug: { type: "string" },
                  excerpt: { type: "string" },
                  content: { type: "string" },
                  faqs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: { question: { type: "string" }, answer: { type: "string" } },
                      required: ["question", "answer"],
                    },
                  },
                },
                required: ["title", "slug", "excerpt", "content", "faqs"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_blog_article" } },
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      if (res.status === 429) throw new Error("Rate limited — try again shortly");
      if (res.status === 402) throw new Error("AI credits exhausted — add credits in workspace settings");
      throw new Error(`AI ${res.status}: ${t.slice(0, 200)}`);
    }

    const aiRes = await res.json();
    const argsRaw = aiRes.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!argsRaw) throw new Error("AI returned no tool_call");
    const article = JSON.parse(argsRaw);

    // Insert as draft blog post
    const slug =
      (article.slug as string)?.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") ||
      String(kw)
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const { data: post, error: postErr } = await admin
      .from("blog_posts")
      .insert({
        title: article.title,
        slug,
        excerpt: article.excerpt,
        content: article.content,
        status: "draft",
        ai_generated: true,
        meta: { faqs: article.faqs, target_keyword: kw, sprint_id, cpc: spec.cpc, volume: spec.volume },
      })
      .select("id,slug")
      .single();
    if (postErr) throw postErr;

    await admin
      .from("sprint_queue")
      .update({
        status: "generated",
        generated_asset_id: post!.id,
        published_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sprint_id);

    await admin
      .from("growth_runs")
      .update({
        status: "success",
        finished_at: new Date().toISOString(),
        stats: { sprint_id, post_id: post!.id, slug: post!.slug },
      })
      .eq("id", runId);

    return json({ ok: true, post_id: post!.id, slug: post!.slug, run_id: runId });
  } catch (e) {
    const msg = (e as Error).message ?? String(e);
    await admin
      .from("growth_runs")
      .update({ status: "error", error: msg, finished_at: new Date().toISOString() })
      .eq("id", runId);
    return json({ error: msg }, 500);
  }
});
