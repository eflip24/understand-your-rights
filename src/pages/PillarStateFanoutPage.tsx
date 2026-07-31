import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";
import AdSlot from "@/components/ads/AdSlot";
import NotFound from "@/pages/NotFound";
import { useLocalizedPath } from "@/i18n/paths";
import { workersCompStates, getWorkersCompState } from "@/data/workersCompStates";
import {
  wrongfulTerminationStates,
  getWrongfulTerminationState,
} from "@/data/wrongfulTerminationStates";
import {
  carInsuranceDenialStates,
  getCarInsuranceDenialState,
} from "@/data/carInsuranceDenialStates";

const SITE = "https://legallyspoken.com";

export type FanoutCluster = "workers-comp" | "wrongful-termination" | "car-insurance";

interface Fact {
  label: string;
  value: string;
}
interface Step {
  name: string;
  text: string;
}
interface Faq {
  question: string;
  answer: string;
}

interface Built {
  name: string;
  abbr: string;
  slug: string;
  basePath: string;
  hubLabel: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  entityCategory: string;
  entityIntro: string;
  entities: string[];
  facts: Fact[];
  steps: Step[];
  faqs: Faq[];
  lawyerPath: string;
  lawyerLabel: string;
  lawyerBlurb: string;
  related: { label: string; href: string; blurb: string }[];
  siblings: { slug: string; name: string }[];
  disclaimerTopic: string;
}

function buildWorkersComp(slug?: string): Built | null {
  const s = getWorkersCompState(slug);
  if (!s) return null;
  return {
    name: s.name,
    abbr: s.abbr,
    slug: s.slug,
    basePath: "/workers-comp-denied-what-next",
    hubLabel: "Workers' comp denial guide",
    eyebrow: `Workers' compensation · ${s.name}`,
    h1: `Workers' Comp Denied in ${s.name}: Appeal Deadlines and Next Steps`,
    metaTitle: `${s.name} Workers' Comp Denied: Appeal Deadlines & Benefits`,
    metaDescription: `Denied workers' comp in ${s.name}? Appeal through the ${s.agency} — ${s.appealDeadline.toLowerCase()}. Claim deadline: ${s.claimDeadline.toLowerCase()}.`,
    intro: [
      `A denial letter from the carrier is not the end of a ${s.name} workers' compensation claim. Disputes are decided by the ${s.agency}, not by the insurer, and the appeal clock starts the day the denial is issued.`,
      `In ${s.name} you must report the injury within ${s.noticeDeadline.toLowerCase()} and file the formal claim within ${s.claimDeadline.toLowerCase()}. Wage-replacement benefits are paid at ${s.ttdRate.toLowerCase()} after a waiting period of ${s.waitingPeriod.toLowerCase()}, all under ${s.statute}.`,
    ],
    entityCategory: `${s.name} workers' compensation appeals`,
    entityIntro: `Denied claims in ${s.name} are litigated before the ${s.agency} under ${s.statute}, usually over compensability, causation or an independent medical examination.`,
    entities: [
      s.agency,
      s.statute,
      `Notice deadline: ${s.noticeDeadline}`,
      `Claim filing deadline: ${s.claimDeadline}`,
      `Appeal window: ${s.appealDeadline}`,
      "Independent medical examination (IME)",
      "Utilization review and treatment denials",
      "Temporary total disability (TTD) and permanent partial disability (PPD) ratings",
    ],
    facts: [
      { label: "Administering agency", value: s.agency },
      { label: "Notice to employer", value: s.noticeDeadline },
      { label: "Claim filing deadline", value: s.claimDeadline },
      { label: "Appeal deadline", value: s.appealDeadline },
      { label: "Wage-replacement rate", value: s.ttdRate },
      { label: "Waiting period", value: s.waitingPeriod },
      { label: "Governing statute", value: s.statute },
    ],
    steps: [
      {
        name: "Read the denial reason on the form",
        text: `${s.name} carriers must state a reason. "Not work related", "late notice" and "no objective findings" are the three most common — each is beaten with different evidence.`,
      },
      {
        name: `File the dispute with the ${s.agency}`,
        text: `The appeal window is: ${s.appealDeadline}. Filing late usually ends the claim regardless of how strong the medical evidence is.`,
      },
      {
        name: "Lock in the medical causation opinion",
        text: `Ask the treating physician for a written opinion that the work event was a substantial contributing cause. If the insurer scheduled an IME, request the full report and the examiner's billing history.`,
      },
      {
        name: "Calculate what the claim is worth",
        text: `Your indemnity rate is ${s.ttdRate.toLowerCase()}. Add unpaid medical bills, mileage and any permanent impairment rating before responding to a settlement offer.`,
      },
    ],
    faqs: [
      {
        question: `How long do I have to appeal a workers' comp denial in ${s.name}?`,
        answer: `${s.appealDeadline}. The dispute is heard by the ${s.agency} under ${s.statute}.`,
      },
      {
        question: `What is the deadline to file a workers' comp claim in ${s.name}?`,
        answer: `You must notify the employer within ${s.noticeDeadline.toLowerCase()} and file the claim within ${s.claimDeadline.toLowerCase()}.`,
      },
      {
        question: `How much does workers' comp pay in ${s.name}?`,
        answer: `Temporary total disability is paid at ${s.ttdRate.toLowerCase()}, starting after a waiting period of ${s.waitingPeriod.toLowerCase()}.`,
      },
      {
        question: `Can I be fired for filing a workers' comp claim in ${s.name}?`,
        answer: `Retaliation for filing a claim is unlawful in ${s.name}. That is a separate employment claim from the comp case — see the wrongful termination guide for the filing deadlines.`,
      },
      {
        question: `Do I need a lawyer to appeal in ${s.name}?`,
        answer: `You can self-represent before the ${s.agency}, but contested causation and IME disputes are where represented claimants recover materially more. Comp attorneys work on a contingency percentage approved by the agency.`,
      },
    ],
    lawyerPath: "/lawyer-near-me/workers-compensation",
    lawyerLabel: `Find a ${s.name} workers' comp lawyer`,
    lawyerBlurb: `Local counsel knows which ${s.agency} judges and IME doctors the carrier uses.`,
    related: [
      { label: "Workers' comp denied: full guide", href: "/workers-comp-denied-what-next", blurb: "The national playbook for a denied claim." },
      { label: "Workers' comp settlement calculator", href: "/tools/workers-comp-settlement-calculator", blurb: "Estimate the value of your claim." },
      { label: "SSDI denied: what next", href: "/ssdi-denied-what-next", blurb: "When the injury keeps you out of work long term." },
      { label: "Long-term disability claim guide", href: "/long-term-disability-claim-guide", blurb: "ERISA appeals and the 180-day deadline." },
    ],
    siblings: workersCompStates.filter((x) => x.slug !== s.slug).slice(0, 8).map((x) => ({ slug: x.slug, name: x.name })),
    disclaimerTopic: "workers' compensation deadlines, benefit rates and appeal procedures",
  };
}

function buildWrongfulTermination(slug?: string): Built | null {
  const s = getWrongfulTerminationState(slug);
  if (!s) return null;
  return {
    name: s.name,
    abbr: s.abbr,
    slug: s.slug,
    basePath: "/wrongful-termination-settlements",
    hubLabel: "Wrongful termination settlements",
    eyebrow: `Employment law · ${s.name}`,
    h1: `Wrongful Termination in ${s.name}: Deadlines, Damages and Settlement Value`,
    metaTitle: `${s.name} Wrongful Termination: Deadlines & Settlement Value`,
    metaDescription: `Fired in ${s.name}? File with the ${s.agency} — ${s.stateDeadline.toLowerCase()}. At-will exceptions, damages caps and EEOC deadlines explained.`,
    intro: [
      `${s.name} follows employment at will, so most terminations are lawful even when they feel unfair. A claim exists when the firing was because of a protected characteristic, in retaliation for a protected act, or within one of the state's recognized exceptions: ${s.atWillExceptions.toLowerCase()}.`,
      `Charges are filed with the ${s.agency}. The state deadline is ${s.stateDeadline.toLowerCase()}, and the parallel federal EEOC deadline is ${s.eeocDeadline.toLowerCase()}. Miss either and the strongest facts stop mattering.`,
    ],
    entityCategory: `${s.name} wrongful termination claims`,
    entityIntro: `Discrimination and retaliation claims in ${s.name} run through the ${s.agency} and the EEOC in parallel under ${s.statute}.`,
    entities: [
      s.agency,
      s.statute,
      "EEOC charge and right-to-sue letter",
      `State filing deadline: ${s.stateDeadline}`,
      `At-will exceptions: ${s.atWillExceptions}`,
      s.extraProtections,
      "Title VII, ADEA, ADA and FMLA",
      "Severance agreements and OWBPA 21/7-day review windows",
    ],
    facts: [
      { label: "State agency (FEPA)", value: s.agency },
      { label: "State filing deadline", value: s.stateDeadline },
      { label: "EEOC deadline", value: s.eeocDeadline },
      { label: "At-will exceptions", value: s.atWillExceptions },
      { label: "Extra protected classes", value: s.extraProtections },
      { label: "Damages", value: s.damages },
      { label: "Governing statute", value: s.statute },
    ],
    steps: [
      {
        name: "Preserve the paper trail first",
        text: `Forward performance reviews, texts, emails and the termination letter to a personal account before access is cut. In ${s.name} the case is usually won on documents created before the firing.`,
      },
      {
        name: `File with the ${s.agency}`,
        text: `The state deadline is ${s.stateDeadline.toLowerCase()}; the EEOC deadline is ${s.eeocDeadline.toLowerCase()}. Filing with one usually cross-files with the other, but confirm it in writing.`,
      },
      {
        name: "Do not sign the severance yet",
        text: `Severance almost always waives every claim. If you are 40 or older, the OWBPA gives you 21 days to consider and 7 days to revoke — use them to value the claim first.`,
      },
      {
        name: "Value the claim realistically",
        text: `${s.damages} Add lost wages from the termination date, the cost of replacing benefits, and mitigation from any new job — employers subtract that in every negotiation.`,
      },
    ],
    faqs: [
      {
        question: `How long do I have to file a wrongful termination claim in ${s.name}?`,
        answer: `${s.stateDeadline} with the ${s.agency}, and ${s.eeocDeadline.toLowerCase()} with the EEOC.`,
      },
      {
        question: `Is ${s.name} an at-will employment state?`,
        answer: `${s.name === "Montana" ? "No — Montana is the only state that requires good cause after the probationary period." : `Yes. ${s.name} is at-will, subject to these exceptions: ${s.atWillExceptions.toLowerCase()}.`}`,
      },
      {
        question: `How much are wrongful termination settlements worth in ${s.name}?`,
        answer: `Most cases settle in the range of a few months to two years of pay, driven by lost wages and the strength of the documentation. On damages: ${s.damages.toLowerCase()}.`,
      },
      {
        question: `Which extra protections does ${s.name} add beyond federal law?`,
        answer: `${s.extraProtections}. These matter because state claims often carry longer deadlines and higher (or uncapped) damages than Title VII.`,
      },
      {
        question: `Do I need a right-to-sue letter in ${s.name}?`,
        answer: `Yes for federal claims — you cannot file in federal court until the EEOC issues one, and you then have 90 days to sue. State claims under ${s.statute} follow the ${s.agency}'s own exhaustion rules.`,
      },
    ],
    lawyerPath: "/lawyer-near-me/employment",
    lawyerLabel: `Find a ${s.name} employment lawyer`,
    lawyerBlurb: `Employment counsel in ${s.name} will know how the ${s.agency} handles investigations and which claims survive summary judgment.`,
    related: [
      { label: "Wrongful termination settlements", href: "/wrongful-termination-settlements", blurb: "How these cases are valued nationally." },
      { label: "EEOC settlement calculator", href: "/tools/eeoc-settlement-calculator", blurb: "Estimate a discrimination claim's value." },
      { label: "Workers' comp denied", href: "/workers-comp-denied-what-next", blurb: "If the firing followed an injury claim." },
      { label: "Employment law guides", href: "/employment-law", blurb: "Wages, leave, contracts and retaliation." },
    ],
    siblings: wrongfulTerminationStates.filter((x) => x.slug !== s.slug).slice(0, 8).map((x) => ({ slug: x.slug, name: x.name })),
    disclaimerTopic: "employment deadlines, at-will exceptions and damages caps",
  };
}

function buildCarInsurance(slug?: string): Built | null {
  const s = getCarInsuranceDenialState(slug);
  if (!s) return null;
  return {
    name: s.name,
    abbr: s.abbr,
    slug: s.slug,
    basePath: "/car-insurance-claim-denied",
    hubLabel: "Car insurance claim denied",
    eyebrow: `Insurance dispute · ${s.name}`,
    h1: `Car Insurance Claim Denied in ${s.name}: Your Appeal Options`,
    metaTitle: `${s.name} Car Insurance Claim Denied: Appeal & Bad Faith`,
    metaDescription: `Denied auto claim in ${s.name}? Complaint route via the ${s.doi}, prompt-pay deadlines, bad-faith remedies and the ${s.sol.toLowerCase()} filing limit.`,
    intro: [
      `${s.name} is a ${s.faultSystem.toLowerCase()} jurisdiction, which decides who pays before anyone argues about the amount. Denials here usually cite late notice, a coverage exclusion, a pre-existing condition, or a disputed liability split.`,
      `Insurers in ${s.name} must follow statutory claim-handling timelines: ${s.promptPay.toLowerCase()}. Complaints go to the ${s.doi}, and the underlying injury suit must be filed within ${s.sol.toLowerCase()} under ${s.statute}.`,
    ],
    entityCategory: `${s.name} auto insurance disputes`,
    entityIntro: `Claim-handling conduct in ${s.name} is regulated by the ${s.doi} under ${s.statute}, with a separate bad-faith remedy where the denial had no reasonable basis.`,
    entities: [
      s.doi,
      s.statute,
      s.faultSystem,
      `Prompt-pay rules: ${s.promptPay}`,
      `Bad faith: ${s.badFaith}`,
      `Minimum liability limits: ${s.minLimits}`,
      "Colossus, ClaimIQ and Xactimate claim-valuation software",
      "State Farm, GEICO, Progressive, Allstate and USAA claim units",
    ],
    facts: [
      { label: "Fault system", value: s.faultSystem },
      { label: "Regulator", value: s.doi },
      { label: "Prompt-pay deadlines", value: s.promptPay },
      { label: "Bad-faith remedy", value: s.badFaith },
      { label: "Minimum liability limits", value: s.minLimits },
      { label: "Injury filing deadline", value: s.sol },
      { label: "Governing statute", value: s.statute },
    ],
    steps: [
      {
        name: "Get the denial in writing with the policy language",
        text: `Ask the adjuster to identify the exact policy provision and the ${s.name} statute relied on. A denial that cannot point to policy language is the beginning of a bad-faith file.`,
      },
      {
        name: "Send a written appeal with the missing proof",
        text: `Attach the police report, the treating records, the wage documentation and photographs. In ${s.name} the carrier's deadlines restart on the day it receives satisfactory proof of loss.`,
      },
      {
        name: `File a complaint with the ${s.doi}`,
        text: `Regulator complaints are free, are logged against the carrier's market-conduct record, and typically force a written response within 15 to 30 days. This alone reverses a meaningful share of soft denials.`,
      },
      {
        name: "Weigh the bad-faith remedy",
        text: `${s.badFaith}. If the denial was unreasonable, that claim is often worth more than the underlying policy benefit — but it must be preserved before the injury deadline of ${s.sol.toLowerCase()} runs.`,
      },
    ],
    faqs: [
      {
        question: `Is ${s.name} a no-fault state?`,
        answer: `${s.faultSystem}. That determines whether your own PIP coverage pays first or the at-fault driver's carrier does.`,
      },
      {
        question: `How long does an insurer have to pay a claim in ${s.name}?`,
        answer: `${s.promptPay}. These timelines come from ${s.statute} and are enforced by the ${s.doi}.`,
      },
      {
        question: `Can I sue my insurer for bad faith in ${s.name}?`,
        answer: `${s.badFaith}.`,
      },
      {
        question: `What are the minimum car insurance limits in ${s.name}?`,
        answer: `${s.minLimits}. Those low floors are why underinsured-motorist coverage decides the outcome of most serious ${s.name} claims.`,
      },
      {
        question: `How long do I have to sue after a ${s.name} crash?`,
        answer: `${s.sol}. The insurance appeal and the lawsuit deadline run separately — negotiating with an adjuster does not extend the court deadline.`,
      },
    ],
    lawyerPath: "/lawyer-near-me/insurance-dispute",
    lawyerLabel: `Find a ${s.name} insurance dispute lawyer`,
    lawyerBlurb: `Bad-faith counsel in ${s.name} works on contingency and knows which carriers settle after a ${s.doi} complaint.`,
    related: [
      { label: "Car insurance claim denied", href: "/car-insurance-claim-denied", blurb: "The national denial playbook." },
      { label: "Auto insurance claim guide", href: "/auto-insurance-claim-guide", blurb: "How adjusters value an auto claim." },
      { label: "Settlement estimator", href: "/tools/settlement-estimator", blurb: "Estimate what your claim is worth." },
      { label: "What to do after a car accident", href: "/what-to-do-after-a-car-accident", blurb: "The first 48 hours checklist." },
    ],
    siblings: carInsuranceDenialStates.filter((x) => x.slug !== s.slug).slice(0, 8).map((x) => ({ slug: x.slug, name: x.name })),
    disclaimerTopic: "insurance claim deadlines, bad-faith remedies and coverage minimums",
  };
}

const BUILDERS: Record<FanoutCluster, (slug?: string) => Built | null> = {
  "workers-comp": buildWorkersComp,
  "wrongful-termination": buildWrongfulTermination,
  "car-insurance": buildCarInsurance,
};

export default function PillarStateFanoutPage({ cluster }: { cluster: FanoutCluster }) {
  const { state } = useParams();
  const data = BUILDERS[cluster](state);
  if (!data) return <NotFound />;
  return <Body d={data} />;
}

function Body({ d }: { d: Built }) {
  const lp = useLocalizedPath();
  const url = `${SITE}${d.basePath}/${d.slug}`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: d.h1,
    description: d.metaDescription,
    totalTime: "PT20M",
    step: d.steps.map((x, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: x.name,
      text: x.text,
    })),
  };

  return (
    <div className="min-h-screen">
      <Tier3Head title={d.metaTitle} description={d.metaDescription} ogType="article" />
      <JsonLdGraph
        schemas={[
          articleSchema(d.h1, d.metaDescription, url),
          howToSchema,
          faqSchema(d.faqs),
          breadcrumbSchema([
            { name: "Home", url: `${SITE}/` },
            { name: d.hubLabel, url: `${SITE}${d.basePath}` },
            { name: d.name, url },
          ]),
        ]}
      />

      <div className="container max-w-4xl py-10 px-4">
        <Link
          to={lp(d.basePath)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> {d.hubLabel}
        </Link>

        <header className="mb-8">
          <p className="text-sm uppercase tracking-wide text-accent font-semibold">{d.eyebrow}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 leading-tight">{d.h1}</h1>
        </header>

        <InMarketEntityBlock
          category={d.entityCategory}
          intro={d.entityIntro}
          entities={d.entities}
          relatedTerms={[
            { label: d.lawyerLabel, href: d.lawyerPath },
            { label: `All states — ${d.hubLabel}`, href: d.basePath },
            { label: "All legal guides", href: "/guides" },
          ]}
        />

        <div className="prose-legal space-y-4 mb-8">
          {d.intro.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        <AdSlot slot="above-content" className="mb-8" />

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">{d.name} at a glance</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {d.facts.map((f) => (
              <div key={f.label} className="rounded-md border bg-muted/30 p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
                <p className="font-semibold mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="mid-content" className="mb-10" />

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Step by step in {d.name}</h2>
          <ol className="space-y-4">
            {d.steps.map((x, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-base">{x.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{x.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Card className="border-accent/30 bg-accent/5 mb-10">
          <CardContent className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-accent mt-1 flex-none" />
              <div>
                <h2 className="font-serif text-xl font-bold">{d.lawyerLabel}</h2>
                <p className="text-sm text-muted-foreground mt-1">{d.lawyerBlurb}</p>
              </div>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to={lp(d.lawyerPath)}>
                Browse {d.abbr} lawyers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">{d.name} questions</h2>
          <div className="space-y-4">
            {d.faqs.map((f, i) => (
              <div key={i} className="border-b border-border pb-4">
                <h3 className="font-semibold text-base mb-2">{f.question}</h3>
                <p className="text-sm text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="end-of-article" className="mb-10" />

        <section className="mb-10">
          <h2 className="font-serif text-xl font-bold mb-3">Compare other states</h2>
          <div className="flex flex-wrap gap-2">
            {d.siblings.map((n) => (
              <Link
                key={n.slug}
                to={lp(`${d.basePath}/${n.slug}`)}
                className="text-sm rounded-full border px-3 py-1 hover:bg-muted"
              >
                {n.name}
              </Link>
            ))}
            <Link
              to={lp(d.basePath)}
              className="text-sm rounded-full border px-3 py-1 hover:bg-muted font-medium"
            >
              All 51 jurisdictions →
            </Link>
          </div>
        </section>

        <RelatedIntentStrip
          cluster={d.hubLabel}
          heading="Continue in this cluster"
          links={d.related}
        />

        <section className="mt-8 text-xs text-muted-foreground border-t border-border pt-4">
          <p>
            <strong>Legal disclaimer:</strong> LegallySpoken provides legal information and
            self-help tools, not legal advice. We are not a law firm. {d.name}{" "}
            {d.disclaimerTopic} change often — confirm current rules with the agency listed above
            or a licensed attorney in {d.name} before acting on anything on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
