import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INTERNAL_LINKS = `
Internal links to weave naturally into articles:
- /tools/consumer/settlement-estimator — Settlement Estimator
- /tools/consumer/statute-of-limitations-lookup — Statute of Limitations Lookup
- /tools/consumer/insurance-quote-comparison — Insurance Quote Comparison
- /tools/consumer/accident-damage-calculator — Accident Damage Calculator
- /tools/consumer/attorney-fee-calculator — Attorney Fee Calculator
- /tools/employment/wrongful-termination-checklist — Wrongful Termination Checklist
- /tools/employment/overtime-calculator — Overtime Calculator
- /tools/employment/severance-pay-calculator — Severance Pay Calculator
- /tools/employment/contractor-vs-employee-checker — Contractor vs Employee Checker
- /tools/realestate/security-deposit-calculator — Security Deposit Calculator
- /tools/realestate/rent-increase-calculator — Rent Increase Calculator
- /tools/generators/privacy-policy-generator — Privacy Policy Generator
- /tools/generators/terms-of-service-generator — Terms of Service Generator
- /tools/finance/crypto-tax-calculator — Crypto Tax Calculator
- /auto-accident-law — Auto Accident Law Guide
- /personal-injury-law — Personal Injury Law Guide
- /insurance-law — Insurance Law Guide
- /employment-law — Employment Law Guide
- /criminal-law — Criminal Law Guide
- /landlord-tenant-law — Landlord-Tenant Law Guide
- /ai-tech-law — AI & Tech Law Guide
- /legal-terms — Legal Terms Directory
- /legal-clauses — Legal Clauses Directory
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, target_keyword, target_state } = await req.json();

    if (!topic || !target_keyword) {
      return new Response(
        JSON.stringify({ error: "topic and target_keyword are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stateContext = target_state
      ? `This article is specifically about ${target_state}. Include state-specific laws, statutes, deadlines, and legal nuances for ${target_state}. Reference ${target_state} courts and legal procedures where relevant.`
      : "Write for a general US audience but mention that laws vary by state.";

    const systemPrompt = `You are a legal content writer for LegallySpoken.com, a US legal information website. You write authoritative, SEO-optimized legal articles in plain English.

CRITICAL RULES:
1. Write in "Answer First" format: the first paragraph must directly answer the implied question in the topic.
2. Use H2 and H3 headings for structure. Do NOT use H1 (the page title serves as H1).
3. Write 1,500-2,000 words of HTML content.
4. Include a FAQ section at the end with exactly 5 questions and answers wrapped in <h2>Frequently Asked Questions</h2> followed by <h3> for each question.
5. Naturally link to 3-5 relevant internal pages from this list where contextually appropriate (use <a href="URL">anchor text</a>):
${INTERNAL_LINKS}
6. Include a disclaimer paragraph at the end: "This article is for informational purposes only and does not constitute legal advice. Consult a qualified attorney for advice specific to your situation."
7. Target keyword: "${target_keyword}" — use it naturally in the first paragraph, at least one H2, and 2-3 times throughout.
8. ${stateContext}
9. Write with E-E-A-T signals: cite specific laws/statutes, use precise numbers and deadlines, reference real legal concepts.
10. Do NOT use markdown. Output pure HTML only.

Respond with a JSON object (no markdown code fences) with these fields:
- title: SEO-optimized title (under 60 characters, includes primary keyword)
- slug: URL-friendly slug
- excerpt: Meta description (under 160 characters)
- content: Full HTML article content
- faqs: Array of 5 objects with "question" and "answer" fields`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Write a comprehensive legal blog article about: "${topic}"` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_blog_article",
              description: "Create a structured blog article with title, slug, content, excerpt, and FAQs",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "SEO title under 60 chars" },
                  slug: { type: "string", description: "URL-friendly slug" },
                  excerpt: { type: "string", description: "Meta description under 160 chars" },
                  content: { type: "string", description: "Full HTML article content" },
                  faqs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question: { type: "string" },
                        answer: { type: "string" },
                      },
                      required: ["question", "answer"],
                    },
                    description: "5 FAQ items",
                  },
                },
                required: ["title", "slug", "excerpt", "content", "faqs"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_blog_article" } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a minute." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add funds at Settings > Workspace > Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(aiResult));
      return new Response(
        JSON.stringify({ error: "AI did not return structured output" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const article = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(article), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-blog-article error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
