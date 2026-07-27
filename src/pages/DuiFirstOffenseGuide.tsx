import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scale, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";
import AdSlot from "@/components/ads/AdSlot";
import { duiStates } from "@/data/duiStates";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";

const HOW_TO = [
  {
    name: "Write down everything within 24 hours",
    text: "Record the stop time, what the officer said, whether field sobriety tests were offered, which breath or blood test was used (Intoxilyzer 9000, Draeger Alcotest, blood draw) and any medical conditions that affect testing.",
  },
  {
    name: "Calendar your DMV / ALR hearing deadline",
    text: "The administrative license case is separate from the criminal case and the request window is often only 7–15 days (10 days in California and Washington, 15 days in Texas). Missing it forfeits your license even if the criminal charge is later dropped.",
  },
  {
    name: "Get the discovery packet",
    text: "Ask for the police report, dashcam and bodycam video, breath-machine calibration and maintenance logs, and the blood-lab chain of custody. Most first-offense defenses come from this paperwork, not from the courtroom.",
  },
  {
    name: "Check whether diversion applies",
    text: "Pennsylvania ARD, Oregon DUII diversion, and similar first-offender programs can end in dismissal. They are usually one-time-only, so decide early whether to use one.",
  },
  {
    name: "Price the full cost, not just the fine",
    text: "Add fines and surcharges, IID installation and monthly leasing (roughly $70–$150 up front plus $60–$100 a month), alcohol education classes, towing, and the SR-22 insurance surcharge, which commonly raises premiums 70–100% for three years.",
  },
  {
    name: "Talk to a local DUI attorney before the first hearing",
    text: "Penalties, diversion eligibility and interlock rules are county-specific. A local criminal defense lawyer can tell you within one call whether your facts support suppression, reduction to a wet reckless, or a negotiated plea.",
  },
];

const FAQS = [
  {
    question: "Will a first-offense DUI put me in jail?",
    answer:
      "In most states a first offense with no injury and no aggravating BAC ends in probation, fines, classes and an interlock rather than served jail time — but roughly half of jurisdictions carry a mandatory minimum (24 to 72 hours is typical, and Arizona and Oklahoma go to 10 days) that can be served on weekends, in a work-release program, or through electronic home monitoring.",
  },
  {
    question: "How much does a first DUI cost in total?",
    answer:
      "Between fines and surcharges, towing and impound, alcohol education, court costs, interlock installation and leasing, license reinstatement and three years of SR-22 or FR-44 insurance, most first offenses land between $7,000 and $15,000 all-in. Attorney fees for a first-offense case usually run $2,500–$7,500 flat.",
  },
  {
    question: "Should I have refused the breath test?",
    answer:
      "Every state has an implied-consent law: refusal triggers its own automatic suspension (often a year, longer than the DUI suspension itself) and in many states the refusal is admissible at trial. Some states also allow a warrant-backed forced blood draw after McNeely and Birchfield, so refusal rarely prevents testing.",
  },
  {
    question: "Can a first DUI be reduced or dismissed?",
    answer:
      "Yes. Common outcomes include reduction to a wet reckless or careless driving, dismissal after a diversion program, or suppression when the stop lacked reasonable suspicion or the breath instrument was out of calibration. Outcomes depend heavily on BAC level, driving pattern and the county prosecutor's policy.",
  },
  {
    question: "How long does a DUI stay on my record?",
    answer:
      "For sentencing purposes the lookback (washout) period is typically 7 to 10 years, but several states — Illinois, Texas, Massachusetts, Oregon and Pennsylvania among them — count prior offenses for life or never allow expungement of a conviction. Insurance surcharges usually drop off after three to five years.",
  },
  {
    question: "Do I need SR-22 insurance after a first offense?",
    answer:
      "Most states require an SR-22 (or FR-44 in Florida and Virginia) certificate for two to three years before reinstating your license. It is not a policy — it is proof of financial responsibility your insurer files with the state, and it is the main reason premiums roughly double after a DUI.",
  },
];

export default function DuiFirstOffenseGuide() {
  const lp = useLocalizedPath();
  const [q, setQ] = useState("");
  const url = `${SITE}/dui-first-offense-guide`;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return duiStates;
    return duiStates.filter(
      (s) => s.name.toLowerCase().includes(term) || s.abbr.toLowerCase() === term,
    );
  }, [q]);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "What to do after a first-offense DUI",
    description:
      "Six steps to take in the first two weeks after a first-offense DUI arrest, from the DMV hearing deadline to interlock and SR-22 costs.",
    totalTime: "PT20M",
    step: HOW_TO.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <div className="min-h-screen">
      <Tier3Head
        title="First-Offense DUI Guide: Penalties, Costs & Rules by State"
        description="First DUI offense penalties in all 50 states plus DC: jail minimums, fines, license suspension, ignition interlock, lookback periods and SR-22 requirements."
        ogType="article"
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "First-Offense DUI Guide: Penalties, Costs and Deadlines by State",
            "State-by-state first-offense DUI penalties, license suspension periods, ignition interlock rules and SR-22 requirements.",
            url,
          ),
          howToSchema,
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", url: `${SITE}/` },
            { name: "Criminal defense", url: `${SITE}/criminal-law` },
            { name: "First-offense DUI guide", url },
          ]),
        ]}
      />

      <div className="container max-w-4xl py-10 px-4">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-wide text-accent font-semibold">
            Criminal defense · DUI / DWI
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 leading-tight">
            First-Offense DUI: Penalties, Costs and Deadlines in Every State
          </h1>
        </header>

        <InMarketEntityBlock
          category="DUI / DWI defense"
          intro="A first-offense DUI runs on two parallel tracks — the criminal case in county court and the administrative license case at the DMV, BMV, MVA or DPS. Both have deadlines measured in days, not weeks."
          entities={[
            "NHTSA standardized field sobriety tests (HGN, walk-and-turn, one-leg stand)",
            "Intoxilyzer 9000 and Draeger Alcotest breath instruments",
            "Implied-consent statutes and refusal suspensions",
            "ALR / DMV administrative per se hearings",
            "Ignition interlock device (IID) vendors: Intoxalock, Smart Start, LifeSafer, Draeger",
            "SR-22 and Florida/Virginia FR-44 financial-responsibility filings",
            "MADD victim impact panels and state alcohol education programs",
            "Diversion programs: Pennsylvania ARD, Oregon DUII diversion, deferred prosecution",
          ]}
          relatedTerms={[
            { label: "Criminal law guides", href: "/criminal-law" },
            { label: "Find a criminal defense lawyer", href: "/lawyer-near-me/criminal-defense" },
            { label: "Statute of limitations lookup", href: "/tools/consumer/statute-of-limitations-lookup" },
          ]}
        />

        <div className="prose-legal space-y-4 mb-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            Roughly one million drivers are arrested for driving under the influence in the United
            States each year, and the large majority are first offenders with no prior record. The
            statutory per-se limit is 0.08% blood alcohol concentration in 49 states; Utah lowered
            its limit to 0.05% in 2018, and Colorado and New York add a lesser impaired-driving
            offense (DWAI) that starts at 0.05%.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            What varies wildly is what happens next. Wisconsin treats a first OWI as a civil
            forfeiture with no jail exposure at all; Arizona carries a 10-day jail sentence with
            nine days suspendable if you install an interlock; Pennsylvania frequently resolves a
            general-impairment first offense through ARD with no suspension. The table below shows
            the baseline for each jurisdiction, and each state page breaks the numbers down further.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            The single most time-sensitive item is the administrative licence hearing. In
            California you have 10 days to request a DMV APS hearing, in Texas 15 days for an ALR
            hearing, in Washington 7 days. That clock runs from the date of arrest and is
            independent of your first court date, which is often a month or more away.
          </p>
        </div>

        <AdSlot slot="above-content" className="mb-8" />

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">First-offense penalties by state</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search your state…"
              className="pl-9"
              aria-label="Search states"
            />
          </div>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <caption className="sr-only">
                First-offense DUI penalties by US state and the District of Columbia
              </caption>
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th scope="col" className="p-3 font-semibold">State</th>
                  <th scope="col" className="p-3 font-semibold">BAC</th>
                  <th scope="col" className="p-3 font-semibold">Jail</th>
                  <th scope="col" className="p-3 font-semibold">Suspension</th>
                  <th scope="col" className="p-3 font-semibold">Interlock</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.slug} className="border-t align-top">
                    <td className="p-3">
                      <Link
                        className="font-medium text-primary hover:underline"
                        to={lp(`/dui-first-offense-guide/${s.slug}`)}
                      >
                        {s.name}
                      </Link>
                      <span className="block text-xs text-muted-foreground">{s.term}</span>
                    </td>
                    <td className="p-3">{s.bac}</td>
                    <td className="p-3">{s.jail}</td>
                    <td className="p-3">{s.suspension}</td>
                    <td className="p-3">{s.iid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground mt-3">
              No state matches “{q}”. Try the full state name.
            </p>
          )}
        </section>

        <AdSlot slot="mid-content" className="mb-10" />

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-3">
            What a first DUI actually costs
          </h2>
          <p className="prose-legal text-muted-foreground leading-relaxed mb-3">
            The fine printed on the citation is usually the smallest line item. Court surcharges
            frequently double or triple the base fine, and the insurance consequence outlasts every
            other penalty.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Fines + court surcharges", value: "$500 – $2,500" },
              { label: "Attorney (first offense, flat fee)", value: "$2,500 – $7,500" },
              { label: "Interlock install + 12 months lease", value: "$800 – $1,500" },
              { label: "Alcohol education / victim panel", value: "$150 – $700" },
              { label: "Towing, impound, reinstatement", value: "$300 – $900" },
              { label: "SR-22 premium increase over 3 years", value: "$3,000 – $8,000" },
            ].map((f) => (
              <div key={f.label} className="rounded-md border bg-muted/30 p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
                <p className="font-semibold mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Step by step: the first two weeks</h2>
          <ol className="space-y-4">
            {HOW_TO.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-base">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
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
                <h2 className="font-serif text-xl font-bold">Talk to a DUI defense lawyer</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Most criminal defense attorneys offer a free first-offense consultation — and the
                  DMV clock is already running.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to={lp("/lawyer-near-me/criminal-defense")}>
                Browse the directory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-border pb-4">
                <h3 className="font-semibold text-base mb-2">{f.question}</h3>
                <p className="text-sm text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="end-of-article" className="mb-10" />

        <RelatedIntentStrip
          cluster="Criminal defense cluster"
          heading="Continue in this cluster"
          links={[
            { label: "Criminal law guides", href: "/criminal-law", blurb: "Charges, procedure and defenses explained." },
            { label: "Car insurance claim denied", href: "/car-insurance-claim-denied", blurb: "What to do when the carrier refuses to pay." },
            { label: "What to do after a car accident", href: "/what-to-do-after-a-car-accident", blurb: "Evidence checklist for the first 48 hours." },
            { label: "Find a criminal defense lawyer", href: "/lawyer-near-me/criminal-defense", blurb: "Local attorneys by state and city." },
          ]}
        />

        <section className="mt-8 text-xs text-muted-foreground border-t border-border pt-4">
          <p>
            <strong>Legal disclaimer:</strong> LegallySpoken provides legal information and
            self-help tools, not legal advice. We are not a law firm. DUI penalties, deadlines and
            interlock rules change often and vary by county — consult a licensed criminal defense
            attorney in your jurisdiction before acting on anything on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
