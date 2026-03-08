import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  "red-flag-scanner": `You are a legal contract analyst. Analyze the provided contract text and identify red flags and risky clauses. For each issue found, provide:
- clause: The exact or paraphrased problematic text
- severity: "high", "medium", or "low"
- issue: A brief description of why this is risky
- recommendation: What the user should do about it

Return your analysis using the report_findings tool.`,

  "nda-fairness": `You are an NDA analysis expert. Analyze the provided NDA text and score its fairness from 0-100 (100 being perfectly fair/balanced). Consider:
- Whether obligations are mutual or one-sided
- Reasonableness of duration and scope
- Definition of confidential information
- Exclusions and exceptions
- Remedies and penalties

Return your analysis using the report_findings tool.`,

  "lease-analyzer": `You are a lease agreement expert. Analyze the provided lease text and identify:
- Key terms (rent amount, duration, deposit, renewal terms)
- Hidden risks or unusual clauses
- Tenant obligations that are beyond standard
- Landlord-favorable terms

Return your analysis using the report_findings tool.`,

  "terms-summarizer": `You are a legal document simplifier. Summarize the provided Terms & Conditions or legal document into plain-English bullet points. Group findings by topic. Highlight anything unusual or concerning.

Return your analysis using the report_findings tool.`,

  "contract-comparison": `You are a contract comparison expert. Compare the two provided contract texts and identify:
- Key differences between them
- Clauses present in one but not the other
- Terms that changed and the implications
- Which version is more favorable for each party

Return your analysis using the report_findings tool.`,

  "clause-explainer": `You are a legal clause interpreter. Explain the provided clause in plain English. Include:
- What the clause means in simple terms
- The practical implications
- Any risks or concerns
- What to look for or negotiate

Return your analysis using the report_findings tool.`,
};

const TOOL_SCHEMAS: Record<string, any> = {
  "red-flag-scanner": {
    type: "function",
    function: {
      name: "report_findings",
      description: "Report the red flag analysis findings",
      parameters: {
        type: "object",
        properties: {
          summary: { type: "string", description: "Brief overall assessment" },
          riskLevel: { type: "string", enum: ["low", "medium", "high", "critical"] },
          findings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                clause: { type: "string" },
                severity: { type: "string", enum: ["high", "medium", "low"] },
                issue: { type: "string" },
                recommendation: { type: "string" },
              },
              required: ["clause", "severity", "issue", "recommendation"],
            },
          },
        },
        required: ["summary", "riskLevel", "findings"],
      },
    },
  },
  "nda-fairness": {
    type: "function",
    function: {
      name: "report_findings",
      description: "Report the NDA fairness analysis",
      parameters: {
        type: "object",
        properties: {
          score: { type: "number", description: "Fairness score 0-100" },
          summary: { type: "string" },
          strengths: { type: "array", items: { type: "string" } },
          concerns: { type: "array", items: { type: "string" } },
          recommendations: { type: "array", items: { type: "string" } },
        },
        required: ["score", "summary", "strengths", "concerns", "recommendations"],
      },
    },
  },
  "lease-analyzer": {
    type: "function",
    function: {
      name: "report_findings",
      description: "Report the lease analysis",
      parameters: {
        type: "object",
        properties: {
          summary: { type: "string" },
          keyTerms: {
            type: "array",
            items: {
              type: "object",
              properties: {
                label: { type: "string" },
                value: { type: "string" },
              },
              required: ["label", "value"],
            },
          },
          risks: { type: "array", items: { type: "string" } },
          recommendations: { type: "array", items: { type: "string" } },
        },
        required: ["summary", "keyTerms", "risks", "recommendations"],
      },
    },
  },
  "terms-summarizer": {
    type: "function",
    function: {
      name: "report_findings",
      description: "Report the terms summary",
      parameters: {
        type: "object",
        properties: {
          summary: { type: "string" },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                points: { type: "array", items: { type: "string" } },
                concern: { type: "boolean" },
              },
              required: ["title", "points", "concern"],
            },
          },
        },
        required: ["summary", "sections"],
      },
    },
  },
  "contract-comparison": {
    type: "function",
    function: {
      name: "report_findings",
      description: "Report the contract comparison",
      parameters: {
        type: "object",
        properties: {
          summary: { type: "string" },
          differences: {
            type: "array",
            items: {
              type: "object",
              properties: {
                topic: { type: "string" },
                contractA: { type: "string" },
                contractB: { type: "string" },
                implication: { type: "string" },
              },
              required: ["topic", "contractA", "contractB", "implication"],
            },
          },
          recommendation: { type: "string" },
        },
        required: ["summary", "differences", "recommendation"],
      },
    },
  },
  "clause-explainer": {
    type: "function",
    function: {
      name: "report_findings",
      description: "Report the clause explanation",
      parameters: {
        type: "object",
        properties: {
          plainEnglish: { type: "string" },
          implications: { type: "array", items: { type: "string" } },
          risks: { type: "array", items: { type: "string" } },
          negotiationTips: { type: "array", items: { type: "string" } },
        },
        required: ["plainEnglish", "implications", "risks", "negotiationTips"],
      },
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { toolType, text, textA, textB } = await req.json();

    if (!toolType || !SYSTEM_PROMPTS[toolType]) {
      return new Response(JSON.stringify({ error: "Invalid tool type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let userContent = text || "";
    if (toolType === "contract-comparison") {
      userContent = `CONTRACT A:\n${textA}\n\nCONTRACT B:\n${textB}`;
    }

    if (!userContent.trim()) {
      return new Response(JSON.stringify({ error: "No text provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[toolType] },
          { role: "user", content: userContent },
        ],
        tools: [TOOL_SCHEMAS[toolType]],
        tool_choice: { type: "function", function: { name: "report_findings" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Analysis failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      return new Response(JSON.stringify({ error: "No analysis results returned." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-contract error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
