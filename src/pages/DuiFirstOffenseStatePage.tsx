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
import { getDuiState, duiStates, type DuiState } from "@/data/duiStates";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";

export default function DuiFirstOffenseStatePage() {
  const { state } = useParams();
  const data = getDuiState(state);
  if (!data) return <NotFound />;
  return <Body s={data} />;
}

function Body({ s }: { s: DuiState }) {
  const lp = useLocalizedPath();
  const url = `${SITE}/dui-first-offense-guide/${s.slug}`;

  const facts = [
    { label: "Per-se BAC limit", value: s.bac },
    { label: "Offense name", value: s.term },
    { label: "Jail exposure", value: s.jail },
    { label: "Fine range", value: s.fine },
    { label: "License suspension", value: s.suspension },
    { label: "Ignition interlock", value: s.iid },
    { label: "Lookback period", value: s.lookback },
    { label: "SR-22 / FR-44", value: s.sr22 },
  ];

  const howTo = [
    {
      name: `Request the ${s.abbr} license hearing`,
      text: `The administrative suspension in ${s.name} is separate from the criminal case. Request the hearing within the short statutory window shown on the paperwork the officer gave you — it is usually 7 to 15 days from the arrest date.`,
    },
    {
      name: "Collect the discovery",
      text: `Ask for the report, bodycam and dashcam footage, breath-instrument calibration logs and any blood-lab chain of custody. First-offense ${s.term} cases in ${s.name} are won on paperwork far more often than at trial.`,
    },
    {
      name: "Check diversion and reduction options",
      text: `Ask a local attorney whether your county offers a first-offender diversion, a deferred prosecution, or a reduction that avoids the ${s.suspension} suspension under ${s.statute}.`,
    },
    {
      name: "Budget the full cost",
      text: `Add the ${s.fine} fine range to court surcharges, interlock costs (${s.iid.toLowerCase()}), alcohol education and the insurance filing (${s.sr22.toLowerCase()}). The insurance surcharge typically outlasts every other penalty.`,
    },
  ];

  const faqs = [
    {
      question: `What is the penalty for a first ${s.term} in ${s.name}?`,
      answer: `A first-offense ${s.term} in ${s.name} carries ${s.jail.toLowerCase()} of jail exposure, a fine of ${s.fine}, and a license suspension of ${s.suspension}. The controlling statute is ${s.statute}.`,
    },
    {
      question: `What is the legal BAC limit in ${s.name}?`,
      answer: `${s.name} sets the per-se limit at ${s.bac} for adult non-commercial drivers. Commercial drivers are held to 0.04% and drivers under 21 fall under zero-tolerance rules in every state.`,
    },
    {
      question: `Do I need an ignition interlock for a first offense in ${s.name}?`,
      answer: `${s.iid}. Interlock vendors such as Intoxalock, Smart Start and LifeSafer typically charge $70–$150 to install plus $60–$100 a month.`,
    },
    {
      question: `How long does a ${s.term} count against me in ${s.name}?`,
      answer: `${s.name} uses a lookback (washout) period of ${s.lookback} when deciding whether a later arrest is charged as a second offense. Insurance consequences generally run three to five years.`,
    },
    {
      question: `Do I need SR-22 insurance in ${s.name}?`,
      answer: `${s.sr22}. An SR-22 is not an insurance policy — it is a certificate your insurer files with the state proving you carry the required liability coverage, and filing it usually moves you into a high-risk rating tier.`,
    },
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `What to do after a first ${s.term} in ${s.name}`,
    description: `Steps to take after a first-offense ${s.term} arrest in ${s.name}, including the license hearing deadline and interlock requirements.`,
    totalTime: "PT20M",
    step: howTo.map((x, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: x.name,
      text: x.text,
    })),
  };

  const neighbours = duiStates.filter((x) => x.slug !== s.slug).slice(0, 6);

  return (
    <div className="min-h-screen">
      <Tier3Head
        title={`First-Offense ${s.term} in ${s.name}: Penalties, Fines & Suspension`}
        description={`First ${s.term} offense in ${s.name}: ${s.jail.toLowerCase()} jail, ${s.fine} fine, ${s.suspension} license suspension, interlock and SR-22 rules under ${s.statute}.`}
        ogType="article"
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            `First-Offense ${s.term} in ${s.name}: Penalties and Deadlines`,
            `Penalties, license suspension, interlock and SR-22 rules for a first ${s.term} offense in ${s.name}.`,
            url,
          ),
          howToSchema,
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: `${SITE}/` },
            { name: "First-offense DUI guide", url: `${SITE}/dui-first-offense-guide` },
            { name: s.name, url },
          ]),
        ]}
      />

      <div className="container max-w-4xl py-10 px-4">
        <Link
          to={lp("/dui-first-offense-guide")}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> All states
        </Link>

        <header className="mb-8">
          <p className="text-sm uppercase tracking-wide text-accent font-semibold">
            Criminal defense · {s.name}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 leading-tight">
            First-Offense {s.term} in {s.name}: Penalties, Costs and Deadlines
          </h1>
        </header>

        <InMarketEntityBlock
          category={`${s.name} ${s.term} defense`}
          intro={`A first ${s.term} in ${s.name} is prosecuted under ${s.statute} while the licensing agency runs a separate administrative case against your driving privilege.`}
          entities={[
            `${s.statute} — the controlling ${s.term} statute`,
            `Per-se BAC limit of ${s.bac}`,
            `${s.suspension} administrative license suspension`,
            s.iid,
            `Lookback period: ${s.lookback}`,
            s.sr22,
            "NHTSA standardized field sobriety testing",
            "Implied-consent refusal penalties",
          ]}
          relatedTerms={[
            { label: `${s.name} criminal defense lawyers`, href: `/lawyer-near-me/criminal-defense/${s.slug}` },
            { label: "All state DUI penalties", href: "/dui-first-offense-guide" },
            { label: "Criminal law guides", href: "/criminal-law" },
          ]}
        />

        <div className="prose-legal space-y-4 mb-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            {s.name} calls the offense {s.term} and sets the per-se threshold at {s.bac}. A first
            conviction exposes you to {s.jail.toLowerCase()} of jail, a fine of {s.fine}, and a
            driving suspension of {s.suspension}. Interlock status on a first offense:{" "}
            {s.iid.toLowerCase()}.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Two cases start the day you are arrested. The criminal case under {s.statute} moves
            through county court and decides guilt, fines and any jail. The administrative case
            decides only your licence, uses a lower standard of proof, and has a request deadline
            measured in days. Missing that deadline suspends your licence regardless of what
            happens in court.
          </p>
        </div>

        <AdSlot slot="above-content" className="mb-8" />

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">
            {s.name} first-offense {s.term} at a glance
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-md border bg-muted/30 p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
                <p className="font-semibold mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="mid-content" className="mb-10" />

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">
            Step by step after a {s.name} arrest
          </h2>
          <ol className="space-y-4">
            {howTo.map((x, i) => (
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
                <h2 className="font-serif text-xl font-bold">
                  Find a {s.name} DUI defense lawyer
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Local counsel knows which {s.name} counties offer diversion and which prosecutors
                  reduce first offenses.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to={lp(`/lawyer-near-me/criminal-defense/${s.slug}`)}>
                Browse {s.abbr} lawyers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">
            {s.name} {s.term} questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
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
            {neighbours.map((n) => (
              <Link
                key={n.slug}
                to={lp(`/dui-first-offense-guide/${n.slug}`)}
                className="text-sm rounded-full border px-3 py-1 hover:bg-muted"
              >
                {n.name}
              </Link>
            ))}
            <Link
              to={lp("/dui-first-offense-guide")}
              className="text-sm rounded-full border px-3 py-1 hover:bg-muted font-medium"
            >
              All 51 jurisdictions →
            </Link>
          </div>
        </section>

        <RelatedIntentStrip
          cluster="Criminal defense cluster"
          heading="Continue in this cluster"
          links={[
            { label: "First-offense DUI: all states", href: "/dui-first-offense-guide", blurb: "Compare penalties across the country." },
            { label: "Criminal law guides", href: "/criminal-law", blurb: "Charges, procedure and defenses explained." },
            { label: "Car insurance claim denied", href: "/car-insurance-claim-denied", blurb: "What to do when the carrier refuses to pay." },
            { label: `${s.name} criminal defense lawyers`, href: `/lawyer-near-me/criminal-defense/${s.slug}`, blurb: "Local attorneys by city." },
          ]}
        />

        <section className="mt-8 text-xs text-muted-foreground border-t border-border pt-4">
          <p>
            <strong>Legal disclaimer:</strong> LegallySpoken provides legal information and
            self-help tools, not legal advice. We are not a law firm. {s.name} {s.term} penalties,
            deadlines and interlock rules change often and vary by county — consult a licensed
            criminal defense attorney in {s.name} before acting on anything on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
