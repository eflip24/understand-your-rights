import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, AlertTriangle, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Tier3Head from "@/components/seo/Tier3Head";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import { JsonLdGraph, breadcrumbSchema, faqSchema, articleSchema } from "@/components/seo/JsonLd";
import { useLocalizedPath } from "@/i18n/paths";
import { SOL_STATES, CLAIM_TYPES, type SolClaimType } from "@/data/solData";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/statute-of-limitations-by-state`;

const FAQS = [
  {
    question: "What is the statute of limitations for a personal injury claim?",
    answer:
      "Two years is the most common personal injury deadline in the United States, but the range runs from one year in Kentucky, Louisiana and Tennessee to six years in Maine and North Dakota. The deadline is jurisdictional, so the state where the injury happened normally controls.",
  },
  {
    question: "What happens if I miss the statute of limitations?",
    answer:
      "The defendant moves to dismiss and courts almost always grant it. The claim becomes time-barred regardless of how strong the evidence is, and an insurer that knows the date has passed has no reason to pay anything.",
  },
  {
    question: "Can the statute of limitations be paused or extended?",
    answer:
      "Sometimes. The discovery rule can delay the start date for latent injuries, fraud and malpractice; the period is usually tolled while the claimant is a minor or legally incapacitated; a defendant who leaves the state or conceals the wrong may not be able to rely on the statute; and parties can sign a written tolling agreement.",
  },
  {
    question: "Is the deadline different for suing a city, county or state?",
    answer:
      "Yes, and it is much shorter in practice. Most jurisdictions require a formal notice of claim within 30 to 180 days of the incident before a lawsuit against a public entity is permitted, even though the general statute may run for years.",
  },
  {
    question: "When does the clock start on an old debt?",
    answer:
      "Usually the date of the last payment or last written acknowledgment of the debt. In many states making even a small payment restarts the clock, which is why collectors push for a token payment on time-barred accounts.",
  },
  {
    question: "Does filing an insurance claim stop the clock?",
    answer:
      "No. Only filing a lawsuit in the correct court stops the statute of limitations. Negotiating with an adjuster, however long it takes, does not extend the deadline unless there is a signed tolling agreement.",
  },
];

const SHORT_DEADLINES = [
  { label: "Government tort claim notice", window: "30–180 days", detail: "Required before suing a city, county, state agency, transit authority or public hospital." },
  { label: "EEOC discrimination charge", window: "180 or 300 days", detail: "300 days in deferral states with an equivalent fair-employment agency." },
  { label: "Workers' comp denial appeal", window: "14–30 days", detail: "Several states make the denial binding once the appeal window closes." },
  { label: "UM/UIM auto claim", window: "Policy term", detail: "Set by the insurance contract and often shorter than the tort statute." },
  { label: "Medical malpractice pre-suit notice", window: "60–90 days", detail: "Plus a certificate of merit in many states, inside the same overall window." },
  { label: "Mechanic's and construction liens", window: "60–120 days", detail: "Runs from last furnishing of labour or materials, not from non-payment." },
];

export default function StatuteOfLimitationsHub() {
  const lp = useLocalizedPath();
  const [query, setQuery] = useState("");
  const [claim, setClaim] = useState<SolClaimType>("personal_injury");

  const claimLabel = CLAIM_TYPES.find((c) => c.id === claim)?.label ?? "Personal Injury";

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...SOL_STATES]
      .filter((s) => !q || s.state.toLowerCase().includes(q) || s.abbr.toLowerCase() === q)
      .sort((a, b) => a.state.localeCompare(b.state));
  }, [query]);

  const stats = useMemo(() => {
    const years = SOL_STATES.map((s) => s.entries[claim]?.years).filter(
      (y): y is number => typeof y === "number",
    );
    if (!years.length) return null;
    const sorted = [...years].sort((a, b) => a - b);
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1],
      median: sorted[Math.floor(sorted.length / 2)],
      count: years.length,
    };
  }, [claim]);

  const schemas = [
    articleSchema({
      headline: "Statute of Limitations by State (All 51 US Jurisdictions)",
      description:
        "Filing deadlines for personal injury, medical malpractice, wrongful death, contract, fraud and debt claims in every US state, with the statute cited for each.",
      url: URL,
      datePublished: "2026-08-25",
      dateModified: "2026-08-25",
    }),
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "Guides", url: `${SITE}/guides` },
      { name: "Statute of Limitations by State", url: URL },
    ]),
    faqSchema(FAQS),
  ];

  return (
    <div className="container py-10 max-w-6xl">
      <Tier3Head
        title="Statute of Limitations by State — Filing Deadlines"
        description="Filing deadlines by state and claim type: personal injury, malpractice, wrongful death, contract, fraud and debt. Statute cited for all 51 US jurisdictions."
      />
      <JsonLdGraph schemas={schemas} />

      <nav className="text-sm text-muted-foreground mb-6">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to={lp("/guides")} className="hover:text-foreground">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Statute of Limitations by State</span>
      </nav>

      <header className="mb-8">
        <Badge variant="secondary" className="mb-3">51 jurisdictions · statute cited</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Statute of Limitations by State
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          How long you have to file, by state and claim type. A statute of limitations is a
          hard deadline: file a day late and the case can be dismissed on that ground alone,
          no matter how strong it is. Pick a claim type, find your state, and check the
          shorter notice deadlines below — those are the ones people miss.
        </p>
        <AuthorByline authorId="legal-research" reviewedAt="2026-08-25" compact className="mt-4" />
      </header>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Controls */}
      <div className="grid gap-3 sm:grid-cols-[1fr_260px] mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search a state…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search a state"
          />
        </div>
        <Select value={claim} onValueChange={(v) => setClaim(v as SolClaimType)}>
          <SelectTrigger aria-label="Claim type"><SelectValue /></SelectTrigger>
          <SelectContent>
            {CLAIM_TYPES.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card><CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Shortest</p>
            <p className="text-2xl font-bold">{stats.min} yr</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Median</p>
            <p className="text-2xl font-bold text-accent">{stats.median} yr</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Longest</p>
            <p className="text-2xl font-bold">{stats.max} yr</p>
          </CardContent></Card>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border mb-4">
        <table className="w-full text-sm">
          <caption className="sr-only">
            {claimLabel} statute of limitations for every US state
          </caption>
          <thead className="bg-muted">
            <tr>
              <th scope="col" className="text-left p-3 font-semibold">Jurisdiction</th>
              <th scope="col" className="text-left p-3 font-semibold">{claimLabel} deadline</th>
              <th scope="col" className="text-left p-3 font-semibold">Statute</th>
              <th scope="col" className="text-left p-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => {
              const e = s.entries[claim];
              return (
                <tr key={s.abbr} className="border-t align-top">
                  <th scope="row" className="p-3 text-left font-medium">{s.state}</th>
                  <td className="p-3 font-semibold text-accent whitespace-nowrap">
                    {e ? `${e.years} ${e.years === 1 ? "year" : "years"}` : "Not codified separately"}
                  </td>
                  <td className="p-3 text-muted-foreground">{e?.citation ?? "—"}</td>
                  <td className="p-3 text-muted-foreground">{e?.note ?? "Standard period; tolling may apply."}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mb-10">
        Standard, non-tolled periods compiled from each state's civil practice code. Discovery
        rules, statutes of repose and government notice requirements can shorten or extend
        every figure shown. Educational information only, not legal advice.
      </p>

      <AdSlot slot="post-result" className="mb-10" />

      {/* Short deadlines */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-accent" /> Shorter deadlines that run first
        </h2>
        <p className="text-muted-foreground mb-4 max-w-3xl">
          The general statute is rarely the first deadline in a real case. These procedural
          windows close much earlier, and missing one can end the claim before the statute
          is anywhere near expiry.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {SHORT_DEADLINES.map((d) => (
            <Card key={d.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <p className="font-semibold">{d.label}</p>
                  <Badge variant="outline" className="whitespace-nowrap">{d.window}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{d.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How the clock works */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" /> When the clock starts, pauses and stops
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground max-w-3xl">
          <li><strong className="text-foreground">Accrual:</strong> normally the date of injury, breach, or last payment on a debt.</li>
          <li><strong className="text-foreground">Discovery rule:</strong> for latent injury, fraud and professional malpractice the clock can start when you knew or should have known of the harm.</li>
          <li><strong className="text-foreground">Minority and incapacity:</strong> most states toll the period while the claimant is under 18 or legally incapacitated.</li>
          <li><strong className="text-foreground">Fraudulent concealment:</strong> a defendant who hides the wrongdoing may be barred from relying on the statute.</li>
          <li><strong className="text-foreground">Statutes of repose:</strong> an absolute outer limit, often 6–12 years for construction and product claims, that runs even if you never discovered the defect.</li>
          <li><strong className="text-foreground">Stopping the clock:</strong> only filing suit in the correct court does it. Settlement talks do not, absent a written tolling agreement.</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Scale className="h-5 w-5 text-accent" /> Frequently asked questions
        </h2>
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`}>
              <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Work out your own deadline</h2>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link to={lp("/tools/consumer/statute-of-limitations-deadline-calculator")}>Filing deadline calculator</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={lp("/tools/consumer/statute-of-limitations-lookup")}>Statute of limitations lookup</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={lp("/data/settlement-deadlines")}>State legal deadlines dataset</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={lp("/courts")}>Court filing fees and small claims limits</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
