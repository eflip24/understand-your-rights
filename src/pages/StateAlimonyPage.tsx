import { Link, Navigate, useParams } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ChevronRight, Printer, Scale, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Tier3Head from "@/components/seo/Tier3Head";
import {
  JsonLdGraph,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  webApplicationSchema,
} from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { useLocalizedPath } from "@/i18n/paths";
import { getAlimonyStateBySlug, ALIMONY_STATES } from "@/data/alimonyStates";
import { ALIMONY_STATE_FORMULAS } from "@/components/tools/AlimonyCalculator";

const AlimonyCalculator = lazy(() => import("@/components/tools/AlimonyCalculator"));

const SITE = "https://legallyspoken.com";

export default function StateAlimonyPage() {
  const { state: slug } = useParams<{ state: string }>();
  const lp = useLocalizedPath();
  const state = slug ? getAlimonyStateBySlug(slug) : null;

  if (!state) return <Navigate to="/tools/family/alimony-calc" replace />;

  const formula = ALIMONY_STATE_FORMULAS[state.name];
  const url = `${SITE}/alimony-calculator/${state.slug}`;
  const title = `${state.name} Alimony Calculator (2026) — Spousal Support Estimator`;
  const description = `Free ${state.name} alimony calculator. Estimate monthly spousal support, duration, and lifetime value using ${state.name}'s current formula and statute. Not legal advice.`;

  const durationRule = formula.permanentPossible
    ? "Permanent (indefinite) alimony is still available for long marriages."
    : "Permanent alimony has been eliminated or restricted — courts award time-limited support only.";

  const faqs = [
    {
      question: `How is alimony calculated in ${state.name}?`,
      answer: `${formula.note} Judges typically look at each spouse's income, length of marriage, standard of living, age, health, and earning capacity when setting the final award.`,
    },
    {
      question: `How long does alimony last in ${state.name}?`,
      answer: `${durationRule} For marriages under 5 years, most awards last a few years at most. Marriages between 5 and 20 years generally see support lasting 30–50% of the marriage length.`,
    },
    {
      question: `Is ${state.name} alimony taxable?`,
      answer: `Under the 2017 Tax Cuts and Jobs Act, alimony from divorces finalized after December 31, 2018 is not deductible for the payer and not taxable to the recipient on federal returns. ${state.name} may or may not follow the same rule on state returns — check with a tax pro.`,
    },
    {
      question: `Can ${state.name} alimony be modified?`,
      answer: `Yes. Either spouse can petition to modify alimony if there is a substantial change in circumstances — job loss, disability, retirement, or the recipient's remarriage or cohabitation. Some states end alimony automatically on remarriage.`,
    },
    {
      question: `Does ${state.name} use a formula or judicial discretion?`,
      answer: formula.incomeShareLow === formula.incomeShareHigh
        ? `${state.name} applies a defined percentage formula as a starting point (see the statute cited above). Judges may still adjust based on the facts.`
        : `${state.name} does not have a strict statutory formula. Courts weigh multiple statutory factors, but our calculator uses income-shares ranges based on how ${state.name} judges tend to rule.`,
    },
  ];

  const percent = (n: number) => `${Math.round(n * 100)}%`;

  return (
    <div className="container py-8 max-w-4xl">
      <Tier3Head title={title} description={description} />
      <JsonLdGraph
        schemas={[
          articleSchema(`${state.name} Alimony Calculator`, description, url),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Tools", url: `${SITE}/tools` },
            { name: "Family Law", url: `${SITE}/tools/family` },
            { name: "Alimony Calculator", url: `${SITE}/tools/family/alimony-calc` },
            { name: state.name, url },
          ]),
          faqSchema(faqs),
          webApplicationSchema(
            `${state.name} Alimony Calculator`,
            description,
            url,
            ["US"],
          ),
        ]}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp("/tools/family/alimony-calc")} className="hover:text-foreground">Alimony Calculator</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{state.name}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          {state.name} Alimony Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Estimate monthly spousal support, duration, and lifetime value under {state.name} law.
          Uses the current statutory formula and long-marriage rules so you can walk into your divorce
          consultation knowing the ballpark.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button size="sm" variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" /> Save as PDF
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={lp(`/lawyer-near-me/family-law`)}>Find a {state.name} family lawyer</Link>
        </Button>
      </div>

      <AdSlot slot="above-content" className="mb-6" />

      {/* State formula card */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" /> {state.name} Alimony Rules at a Glance
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Income share (of gap)</p>
              <p className="text-lg font-bold text-accent">
                {percent(formula.incomeShareLow)}
                {formula.incomeShareLow !== formula.incomeShareHigh && `–${percent(formula.incomeShareHigh)}`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Duration (× marriage yrs)</p>
              <p className="text-lg font-bold text-accent">
                {percent(formula.durationLow)}
                {formula.durationLow !== formula.durationHigh && `–${percent(formula.durationHigh)}`}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Permanent alimony?</p>
              <p className="text-lg font-bold text-accent">
                {formula.permanentPossible ? "Possible (20+ yr)" : "Not available"}
              </p>
            </CardContent>
          </Card>
        </div>
        {formula.monthlyCap && (
          <p className="mt-3 text-sm text-muted-foreground">
            <strong>Statutory monthly cap:</strong> ${formula.monthlyCap.toLocaleString()} regardless of income.
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-3">
          <strong>Statute:</strong> {formula.note}
        </p>
      </section>

      {/* Calculator */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" /> Estimate Your {state.name} Alimony
        </h2>
        <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
          <AlimonyCalculator defaultState={state.name} />
        </Suspense>
      </section>

      {/* How it works */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">How {state.name} Judges Set Alimony</h2>
        <p className="text-muted-foreground mb-3">
          Even in formula states, {state.name} judges retain discretion. They weigh:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Each spouse's gross and net income, plus realistic earning capacity</li>
          <li>Length of the marriage (short &lt; 5 yr, medium 5–15 yr, long 15+ yr)</li>
          <li>Standard of living established during the marriage</li>
          <li>Age, health, and any disability of either spouse</li>
          <li>Contributions as a homemaker or to the other spouse's career or education</li>
          <li>Marital fault — considered in some states, ignored in others</li>
          <li>Child-support obligations already flowing between the spouses</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">{state.name} Alimony FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`f-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <AdSlot slot="end-of-article" className="mb-8" />

      {/* Related tools */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Related Divorce Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link to={lp("/tools/family/child-support")} className="block rounded-lg border p-4 hover:bg-muted/50 transition">
            <p className="font-semibold">Child Support Calculator</p>
            <p className="text-sm text-muted-foreground">Estimate monthly child support under your state's guideline.</p>
          </Link>
          <Link to={lp("/tools/family/divorce-cost")} className="block rounded-lg border p-4 hover:bg-muted/50 transition">
            <p className="font-semibold">Divorce Cost Estimator</p>
            <p className="text-sm text-muted-foreground">Total cost — filing fees, attorney fees, and mediation.</p>
          </Link>
          <Link to={lp("/tools/family/divorce-buyout")} className="block rounded-lg border p-4 hover:bg-muted/50 transition">
            <p className="font-semibold">House Buyout Calculator</p>
            <p className="text-sm text-muted-foreground">Figure out what it costs to keep the marital home.</p>
          </Link>
          <Link to={lp("/tools/family/alimony-calc")} className="block rounded-lg border p-4 hover:bg-muted/50 transition">
            <p className="font-semibold">National Alimony Calculator</p>
            <p className="text-sm text-muted-foreground">Compare all 50 states plus DC in one tool.</p>
          </Link>
        </div>
      </section>

      {/* State index */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Alimony Calculators by State</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
          {ALIMONY_STATES.filter((s) => s.slug !== state.slug).map((s) => (
            <Link
              key={s.slug}
              to={lp(`/alimony-calculator/${s.slug}`)}
              className="text-accent hover:underline"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This tool provides educational estimates only, not legal advice.
          {state.name} judges retain significant discretion, and every case turns on its facts. Consult a licensed
          {" "}{state.name} family law attorney before making decisions.
        </p>
      </div>
    </div>
  );
}
