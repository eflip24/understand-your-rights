import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ChevronRight, Printer, Calculator, FileText, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Tier3Head from "@/components/seo/Tier3Head";
import {
  JsonLdGraph,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  webApplicationSchema,
} from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import { useLocalizedPath } from "@/i18n/paths";
import { piSubPages } from "@/data/piSettlementSubPages";

const SettlementEstimator = lazy(() => import("@/components/tools/SettlementEstimator"));

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/personal-injury-settlements`;

export const PI_TAXABILITY_FAQS = [
  {
    question: "Are personal injury settlements taxable?",
    answer:
      "No, the compensatory portion of a personal injury settlement is generally federal-income-tax-free under IRC § 104(a)(2). This includes payments for medical bills, pain and suffering related to physical injury, and lost wages tied to the physical injury. Punitive damages, pre-judgment interest, and pure emotional-distress claims (not stemming from physical injury) ARE taxable.",
  },
  {
    question: "Do I pay taxes on the medical portion of my settlement?",
    answer:
      "No — as long as you did not deduct those medical expenses on a prior tax return under the medical-expense deduction. If you did, you must include that portion as taxable income under the 'tax benefit rule.'",
  },
  {
    question: "Are pain and suffering damages taxable?",
    answer:
      "Pain and suffering awards ARE tax-free when they compensate for pain from a physical injury or physical sickness. Emotional-distress damages that don't originate from a physical injury (e.g., pure defamation, employment discrimination without physical injury) are taxable.",
  },
  {
    question: "Are punitive damages taxable?",
    answer:
      "Yes, always. Punitive damages are taxable as ordinary income even when awarded in a physical-injury case. Ask your attorney to allocate the settlement between compensatory and punitive portions in the settlement agreement.",
  },
  {
    question: "How are structured settlements taxed?",
    answer:
      "Periodic payments from a structured settlement retain the same tax treatment as a lump sum — the physical-injury portion stays tax-free, including the imputed interest built into future payments (IRC § 104(a)(2) plus § 130).",
  },
  {
    question: "Is the interest on a settlement taxable?",
    answer:
      "Yes. Pre-judgment interest and post-judgment interest are taxable as ordinary income and reported on Form 1099-INT, even when the underlying settlement is tax-free.",
  },
];

const METHOD_COMPARISON = [
  {
    method: "Multiplier Method",
    best: "Cases with clear medical bills and defined injury",
    formula: "(Medical + Future Medical) × 1.5 to 5",
    pros: "Simple, insurer-preferred, easy to justify with records",
    cons: "Undervalues long-recovery cases where daily suffering >> medical bills",
  },
  {
    method: "Per-Diem Method",
    best: "Long recoveries, moderate medical bills, wage-earners",
    formula: "Daily wage × Recovery days × 1 to 3",
    pros: "Better captures daily impact, works for retirees using median wage",
    cons: "Insurers often reject; harder to justify without documentation",
  },
];

const TIMELINE_STEPS = [
  { step: "1. Immediate", time: "Day 0–7", desc: "Seek medical treatment, document everything, notify your own insurer, do NOT give a recorded statement to the other insurer." },
  { step: "2. Investigation", time: "Weeks 1–8", desc: "Attorney gathers police reports, medical records, witness statements, photos. Preserve evidence via spoliation letter." },
  { step: "3. Treatment", time: "Month 1 to MMI", desc: "Continue treatment until Maximum Medical Improvement (MMI). Never settle before MMI — you can't reopen a settled claim." },
  { step: "4. Demand Letter", time: "Month 3–12", desc: "Attorney sends demand with all medical records and lost-wage documentation. Anchor high — insurers respond at 40–60% of demand." },
  { step: "5. Negotiation", time: "1–3 months after demand", desc: "Back-and-forth. Most cases settle here at 60–80% of the demand." },
  { step: "6. Lawsuit / Trial", time: "12–36 months if filed", desc: "If negotiation fails, file suit before the statute of limitations expires. 95%+ of filed cases still settle before trial." },
];

const ADJACENT_TOOLS = [
  { title: "Statute of Limitations Lookup", desc: "Don't miss your filing deadline.", path: "/tools/consumer/statute-of-limitations-lookup" },
  { title: "Attorney Fee Calculator", desc: "Model your net after contingency fees.", path: "/tools/consumer/attorney-fee-calculator" },
  { title: "Medical Lien Estimator", desc: "See how much of your settlement goes to Medicare/hospitals.", path: "/tools/consumer/medical-lien-subrogation-estimator" },
  { title: "Workers' Comp Settlement Calculator", desc: "Injured on the job? Different rules apply.", path: "/tools/employment/workers-comp-settlement-calculator" },
];

export default function PersonalInjurySettlementHub() {
  const lp = useLocalizedPath();

  return (
    <div className="container py-8 max-w-4xl">
      <Tier3Head
        title="Personal Injury Settlement Calculator & Guide — LegallySpoken"
        description="Free personal injury settlement calculator plus state-aware guides for car accidents, motorcycle, truck, and bodily injury claims. Estimate net recovery after attorney fees, liens, and comparative fault."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Personal Injury Settlement Calculator & Complete Guide",
            "Estimate personal injury settlements with the multiplier or per-diem method. State-aware, includes attorney fees, liens, comparative fault, and policy limits.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Personal Injury Settlements", url: URL },
          ]),
          faqSchema(PI_TAXABILITY_FAQS),
          webApplicationSchema(
            "Personal Injury Settlement Calculator",
            "Free interactive calculator estimating personal injury settlement value using multiplier or per-diem method, with net-to-client breakdown.",
            URL,
            ["US"],
          ),
        ]}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Personal Injury Settlements</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          Personal Injury Settlement Calculator &amp; Complete Guide
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Estimate the value of your personal injury claim in under two minutes. Uses both the industry-standard <strong>multiplier method</strong> and <strong>per-diem method</strong>, adjusts for comparative fault and policy limits, and shows your net recovery after attorney fees and medical liens.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button size="sm" variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" /> Save this page as PDF
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={lp("/lawyer-near-me/personal-injury")}>Find a Personal Injury Lawyer</Link>
        </Button>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Sub-page cards */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Settlement Calculators by Case Type</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.values(piSubPages).map((p) => (
            <Link
              key={p.slug}
              to={lp(`/personal-injury-settlements/${p.slug}`)}
              className="group rounded-lg border p-4 hover:border-accent/50 hover:bg-muted/40 transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground group-hover:text-accent">{p.h1}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.intro}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6 text-accent" />
          General Personal Injury Settlement Estimator
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Works for any physical-injury claim: auto crash, slip and fall, dog bite, premises liability, product liability, or workplace injury not covered by workers' comp.
        </p>
        <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
          <SettlementEstimator />
        </Suspense>
      </section>

      {/* Method comparison */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-accent" />
          Multiplier vs Per-Diem Method
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {METHOD_COMPARISON.map((m) => (
            <Card key={m.method}>
              <CardContent className="pt-4 space-y-2">
                <p className="font-bold text-foreground">{m.method}</p>
                <p className="text-xs text-muted-foreground"><strong>Best for:</strong> {m.best}</p>
                <p className="text-xs font-mono bg-muted p-2 rounded">{m.formula}</p>
                <p className="text-xs"><span className="text-emerald-600 font-semibold">✓</span> {m.pros}</p>
                <p className="text-xs"><span className="text-destructive font-semibold">✗</span> {m.cons}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-accent" />
          Personal Injury Settlement Timeline
        </h2>
        <ol className="space-y-3">
          {TIMELINE_STEPS.map((t) => (
            <li key={t.step} className="flex gap-3 rounded-lg border p-3">
              <div className="flex-shrink-0 w-24">
                <p className="font-semibold text-sm text-foreground">{t.step}</p>
                <p className="text-xs text-muted-foreground">{t.time}</p>
              </div>
              <p className="text-sm text-muted-foreground flex-1">{t.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Taxability FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-accent" />
          Are Personal Injury Settlements Taxable?
        </h2>
        <p className="text-muted-foreground mb-4">
          Short answer: the compensatory portion for physical injuries is federal-tax-free under IRC § 104(a)(2). Punitive damages and interest are taxable. Here are the specifics:
        </p>
        <Accordion type="single" collapsible className="w-full">
          {PI_TAXABILITY_FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`tax-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* How much to ask for */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">How Much to Ask For in a Personal Injury Settlement</h2>
        <p className="text-muted-foreground mb-3">
          Experienced attorneys deliberately anchor high in the demand letter. A common rule of thumb:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li><strong>Document every dollar</strong> of medical bills, prescriptions, mileage to appointments, lost wages, and out-of-pocket costs.</li>
          <li><strong>Apply a multiplier</strong> of 3–5× medical bills for pain and suffering (higher for surgery, permanent impairment, or scarring).</li>
          <li><strong>Add lost earning capacity</strong> if the injury affects your future work — often the biggest number in serious cases.</li>
          <li><strong>Demand the total</strong> — insurers respond at 40–60% of demand. Cases typically settle at 60–80% of the initial demand.</li>
          <li><strong>Never accept the first offer.</strong> First offers are always lowballs; the adjuster expects to negotiate.</li>
        </ol>
      </section>

      {/* Adjacent tools */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Related Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ADJACENT_TOOLS.map((t) => (
            <Link key={t.path} to={lp(t.path)} className="block rounded-lg border p-3 hover:bg-muted/40 transition">
              <p className="font-semibold text-sm text-foreground">{t.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <ToolRecommender topic="personal-injury" />

      <AdSlot slot="end-of-article" className="mb-8" />

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This tool provides educational estimates only, not legal advice. Actual settlement values vary widely by jurisdiction, evidence quality, insurer posture, defendant assets, and negotiation. Always consult a licensed personal injury attorney for a case evaluation — most offer free initial consultations and work on contingency (no fee unless you recover).
        </p>
      </div>
    </div>
  );
}
