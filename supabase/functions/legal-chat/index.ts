import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BANNED_BOTS = /Baiduspider|Sogou|360Spider|YisouSpider|Bytespider|PetalBot|MJ12bot|SemrushBot|AhrefsBot|DotBot|GPTBot|CCBot|python-requests|scrapy|curl\/|wget\//i;

function isBot(req: Request): boolean {
  const ua = req.headers.get("user-agent") || "";
  if (!ua || ua.length < 10) return true;
  if (BANNED_BOTS.test(ua)) return true;
  const acceptLang = req.headers.get("accept-language");
  const accept = req.headers.get("accept");
  if (!acceptLang && !accept) return true;
  return false;
}

const TOOLS_INVENTORY = `Contract Reading Time Calculator|/tools/contract/reading-time-calculator|Estimate how long it takes to read a contract.
Contract Word Counter|/tools/contract/word-counter|Get detailed word and character statistics.
Legal Jargon Translator|/tools/contract/jargon-translator|Translate legal terms to plain English.
Contract Clause Finder|/tools/contract/clause-finder|Find specific clauses in your contracts.
Cancellation Deadline Calculator|/tools/consumer/cancellation-deadline-calculator|Calculate when your cancellation window closes.
Notice Period Calculator|/tools/consumer/notice-period-calculator|Calculate when your notice period ends.
Late Fee Calculator|/tools/consumer/late-fee-calculator|Calculate late fees on overdue payments.
Refund Eligibility Checker|/tools/consumer/refund-eligibility-checker|Check if you qualify for a refund.
Non-Compete Duration Checker|/tools/employment/non-compete-checker|Check non-compete enforceability by state.
Freelance Rate Calculator|/tools/employment/freelance-rate-calculator|Convert between hourly, project, and annual rates.
Invoice Late Interest Calculator|/tools/employment/invoice-interest-calculator|Calculate interest on unpaid invoices.
NDA Template Generator|/tools/generators/nda-generator|Generate a basic NDA from a form.
Privacy Policy Generator|/tools/generators/privacy-policy-generator|Create a privacy policy for your website.
Complaint Letter Generator|/tools/generators/complaint-letter-generator|Create a formal complaint letter.
Terms of Service Generator|/tools/generators/terms-of-service-generator|Create terms of service for your site.
Contract Red Flag Scanner|/tools/ai/red-flag-scanner|AI scans contracts for risky clauses.
NDA Fairness Score|/tools/ai/nda-fairness-score|Score your NDA's fairness 0-100.
Lease Agreement Analyzer|/tools/ai/lease-analyzer|Analyze lease agreements for risks.
Terms & Conditions Summarizer|/tools/ai/terms-summarizer|Summarize T&C in plain English.
Contract Comparison Tool|/tools/ai/contract-comparison|Compare two contracts side-by-side.
Clause Explainer|/tools/ai/clause-explainer|Get plain-English clause explanations.
Contract Expiration Tracker|/tools/contract/contract-expiration-tracker|Track contract expiration dates.
Signature Block Generator|/tools/contract/signature-block-generator|Generate proper signature blocks.
Contract Checklist Generator|/tools/contract/contract-checklist-generator|Generate a contract review checklist.
Contract Amendment Drafter|/tools/contract/amendment-drafter|Draft a contract amendment from a form.
Contract Value Calculator|/tools/contract/contract-value-calculator|Calculate total contract value with renewals.
Warranty Expiration Calculator|/tools/consumer/warranty-expiration-calculator|Track warranty end dates for purchases.
Statute of Limitations Lookup|/tools/consumer/statute-of-limitations-lookup|Look up filing deadlines by state.
Small Claims Court Limit Checker|/tools/consumer/small-claims-limit-checker|Check small claims $ limits by state.
Consumer Rights Quiz|/tools/consumer/consumer-rights-quiz|Test your consumer rights knowledge.
Dispute Letter Generator|/tools/consumer/dispute-letter-generator|Generate formal dispute letters.
Salary to Hourly Converter|/tools/employment/salary-to-hourly-converter|Convert salary to hourly rate and back.
PTO Calculator|/tools/employment/pto-calculator|Calculate accrued PTO balance.
Wrongful Termination Checklist|/tools/employment/wrongful-termination-checklist|Assess potential wrongful termination.
Minimum Wage Lookup|/tools/employment/minimum-wage-lookup|Look up minimum wage by state.
Employment Contract Checklist|/tools/employment/employment-contract-checklist|Review checklist for employment contracts.
Cease and Desist Letter Generator|/tools/generators/cease-and-desist-generator|Generate C&D letters for common scenarios.
Power of Attorney Generator|/tools/generators/power-of-attorney-generator|Generate a basic POA document.
Independent Contractor Agreement Generator|/tools/generators/independent-contractor-agreement-generator|Generate an IC agreement from a form.
Promissory Note Generator|/tools/generators/promissory-note-generator|Generate a basic promissory note.
Security Deposit Calculator|/tools/realestate/security-deposit-calculator|Check security deposit rules by state.
Rent Increase Calculator|/tools/realestate/rent-increase-calculator|Check if a rent increase is legal.
Lease Term Comparison|/tools/realestate/lease-term-comparison|Compare two lease offers side-by-side.
Move-Out Checklist Generator|/tools/realestate/move-out-checklist-generator|Generate a customized move-out checklist.
Rental Agreement Generator|/tools/realestate/rental-agreement-generator|Generate a basic residential lease.
Business Name Checker|/tools/business/business-name-checker|Check business naming considerations.
Contractor vs. Employee Checker|/tools/business/contractor-vs-employee-checker|Classify worker as employee or contractor.
Severance Pay Calculator|/tools/business/severance-pay-calculator|Estimate severance pay range.
Overtime Calculator|/tools/business/overtime-calculator|Calculate overtime pay breakdown.
Partnership Split Calculator|/tools/business/partnership-split-calculator|Calculate partnership equity splits.
Business Expense Tracker Template|/tools/business/business-expense-tracker|Generate an expense tracking template.
Crypto Tax Calculator|/tools/finance/crypto-tax-calculator|Estimate crypto capital gains tax.
DCA Calculator|/tools/finance/dca-calculator|Simulate dollar-cost averaging returns.
Position Size Calculator|/tools/finance/position-size-calculator|Calculate optimal trade position size.
Profit & Loss Calculator|/tools/finance/profit-loss-calculator|Calculate trade profit/loss with fees.
Compound Interest Calculator|/tools/finance/compound-interest-calculator|Project investment growth over time.
Margin Call Calculator|/tools/finance/margin-call-calculator|Calculate your margin call trigger price.
Trade Breakeven Calculator|/tools/finance/breakeven-calculator|Find your breakeven price after fees.
Risk/Reward Calculator|/tools/finance/risk-reward-calculator|Analyze trade risk-to-reward ratio.
Crypto Converter|/tools/finance/crypto-converter|Convert between crypto assets.
Loan Payment Calculator|/tools/finance/loan-payment-calculator|Calculate monthly loan payments.
Grant Budget Calculator|/tools/finance/grant-budget-calculator|Allocate and track grant budget spending.
Grant Deadline Tracker|/tools/finance/grant-deadline-tracker|Track grant deadlines and reporting dates.
Grant Compliance Checklist|/tools/finance/grant-compliance-checklist|Compliance checklist by grant type.
Vesting Schedule Calculator|/tools/finance/vesting-schedule-calculator|Calculate equity vesting timelines.
Stock Option Tax Calculator|/tools/finance/stock-option-tax-calculator|Estimate taxes on stock option exercises.
Equity Dilution Calculator|/tools/finance/equity-dilution-calculator|Calculate equity dilution from funding rounds.
Solar Panel ROI Calculator|/tools/energy/solar-panel-roi-calculator|Calculate solar panel payback period and ROI.
Solar Incentive & Tax Credit Estimator|/tools/energy/solar-incentive-tax-credit-estimator|Estimate solar tax credits and state rebates.
Energy Savings Calculator|/tools/energy/energy-savings-calculator|Calculate electricity savings from solar power.
Carbon Footprint Offset Calculator|/tools/energy/carbon-footprint-offset-calculator|Calculate CO₂ savings from switching to renewables.
Green Lease Clause Checker|/tools/energy/green-lease-clause-checker|Check green clauses in commercial leases.
EV vs Gas Cost Comparison|/tools/energy/ev-vs-gas-cost-comparison|Compare EV and gas vehicle fuel costs.
Home Energy Audit Checklist|/tools/energy/home-energy-audit-checklist|Get a personalized home energy improvement checklist.
Power Purchase Agreement Calculator|/tools/energy/power-purchase-agreement-calculator|Compare PPA costs vs utility electricity.
Income Tax Estimator|/tools/finance/income-tax-estimator|Estimate federal income tax by bracket.
Auto Loan Calculator|/tools/finance/auto-loan-calculator|Calculate monthly car loan payments.
Debt Payoff Calculator|/tools/finance/debt-payoff-calculator|Calculate debt payoff time and interest savings.
Net Worth Calculator|/tools/finance/net-worth-calculator|Calculate total assets minus liabilities.
Paycheck Calculator|/tools/employment/paycheck-calculator|Estimate take-home pay per paycheck.
Settlement Value Estimator|/tools/consumer/settlement-estimator|Estimate PI/auto accident settlement ranges.
Insurance Quote Comparison Tool|/tools/consumer/insurance-quote-comparison|Compare insurance quotes side by side.
Accident Damage Calculator|/tools/consumer/accident-damage-calculator|Calculate total accident damages.
Attorney Fee Calculator|/tools/consumer/attorney-fee-calculator|Calculate contingency & hourly legal fees.
Insurance Premium Estimator|/tools/consumer/insurance-premium-estimator|Estimate monthly insurance premiums.`;

const SYSTEM_PROMPT = `You are LegallySpoken's AI Legal Assistant. You help users find the right free legal tool and answer general legal questions.

IMPORTANT: Always begin every response with:
"*This is general information only — not legal advice. Consult a licensed attorney for your specific situation.*"

You have access to 85+ free legal and financial tools. When recommending a tool, format it as a markdown link:
**[Tool Name](/tools/category/slug)** — short description

Here is the full tool inventory (Name|Path|Description):
${TOOLS_INVENTORY}

Guidelines:
- When users describe a situation, recommend 1-3 relevant tools with links.
- When users ask about calculator results, explain them in plain English.
- When users ask state-specific questions, note relevant state variations and recommend state-aware tools.
- Keep responses concise, friendly, and helpful.
- If you're unsure which tool fits, ask a clarifying question.
- Never provide specific legal advice — always direct to a licensed attorney for specific situations.
- You can also recommend visiting the Legal Health Check Quiz at /legal-health-check for guided recommendations.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (isBot(req)) {
    return new Response(JSON.stringify({ error: "Access denied" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { messages, _hp } = await req.json();

    if (_hp) {
      return new Response(JSON.stringify({ error: "Access denied" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
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
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Our AI assistant is busy right now. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("legal-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
