import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Code2, Quote, Database, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "@/hooks/use-toast";
import {
  settlementDeadlineDataset,
  datasetToCsv,
  DATASET_COLUMNS,
  DATASET_GROUPS,
  DATASET_META,
  type DatasetColumn,
} from "@/data/settlementDeadlineDataset";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/data/settlement-deadlines`;

const FAQS = [
  {
    question: "What is in the state legal deadlines dataset?",
    answer:
      `One row for each of the ${DATASET_META.jurisdictions} US jurisdictions (50 states plus the District of Columbia) with ${DATASET_META.fields} fields: personal injury, medical malpractice and wrongful death filing deadlines, the state's comparative negligence rule, workers' compensation notice/claim/appeal windows and wage-replacement rate, the state fair-employment agency and discrimination charge deadline, the auto fault system, minimum liability limits, insurer prompt-pay deadlines and whether a first-party bad-faith remedy exists.`,
  },
  {
    question: "Can I republish or cite this data?",
    answer:
      "Yes. The dataset is published under CC BY 4.0. Download the CSV, embed the live table, or copy the citation block on this page. The only requirement is a visible credit and link back to LegallySpoken.",
  },
  {
    question: "How often is the dataset updated?",
    answer:
      "It is rebuilt from our underlying state law files, which our editorial team reviews on a rolling quarterly cycle and whenever a legislature changes a deadline. The version and last-updated date are shown above the table.",
  },
  {
    question: "Does a statute of limitations ever get extended?",
    answer:
      "Yes. The discovery rule can start the clock when an injury is found rather than when it happened, minority and incapacity toll the period, and fraudulent concealment can pause it. Claims against government entities usually require a separate notice within 30–180 days, which is far shorter than the general statute.",
  },
  {
    question: "Why do workers' compensation appeal windows matter so much?",
    answer:
      "A workers' comp denial is not final, but the appeal window is short — as little as 14 to 30 days in several states. Miss it and the denial usually becomes binding, regardless of the medical evidence you later obtain.",
  },
  {
    question: "Why are EEOC deadlines 180 days in some states and 300 in others?",
    answer:
      "The 300-day window applies in deferral states — those with a state or local fair-employment agency that enforces an equivalent law. Where no such agency exists, the federal 180-day limit controls.",
  },
];

function useFilteredRows(query: string, group: DatasetColumn["group"] | "all") {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = q
      ? settlementDeadlineDataset.filter(
          (r) => r.state.toLowerCase().includes(q) || r.abbr.toLowerCase() === q,
        )
      : settlementDeadlineDataset;
    const cols =
      group === "all" ? DATASET_COLUMNS.filter((c) => c.primary) : DATASET_COLUMNS.filter((c) => c.group === group);
    return { rows, cols };
  }, [query, group]);
}

export default function SettlementDeadlinesDataset() {
  const lp = useLocalizedPath();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<DatasetColumn["group"] | "all">("all");
  const { rows, cols } = useFilteredRows(query, group);

  const embedSnippet = `<iframe src="${URL}?embed=1" width="100%" height="640" style="border:1px solid #e5e7eb;border-radius:8px" title="US State Legal Deadlines Dataset — LegallySpoken"></iframe>
<p style="font:12px sans-serif">Source: <a href="${URL}">US State Legal Deadlines &amp; Settlement Rules Dataset</a> by LegallySpoken (CC BY 4.0)</p>`;

  const citationHtml = `<p>LegallySpoken Editorial Team. "${DATASET_META.name}" (v${DATASET_META.version}, ${DATASET_META.updated}). <a href="${URL}">${URL}</a></p>`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: `${label} copied to clipboard` });
    } catch {
      toast({ title: "Copy failed", description: "Select the text and copy manually.", variant: "destructive" });
    }
  };

  const downloadCsv = () => {
    const blob = new Blob([datasetToCsv()], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL_createObjectURL(blob);
    a.download = "legallyspoken-state-legal-deadlines.csv";
    a.click();
    setTimeout(() => window.URL.revokeObjectURL(a.href), 1000);
  };

  return (
    <div className="container py-8 max-w-6xl">
      <Tier3Head
        title="US State Legal Deadlines Dataset — Filing, Appeal & Claim Windows"
        description="Free open dataset of legal deadlines in all 51 US jurisdictions: injury and wrongful death statutes of limitations, workers' comp appeal windows, EEOC charge deadlines, insurer prompt-pay rules. CSV download and embed."
      />
      <JsonLdGraph
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: DATASET_META.name,
            description:
              "State-by-state legal deadlines and settlement rules for all 50 US states and the District of Columbia, covering civil statutes of limitations, workers' compensation appeal windows, employment discrimination charge deadlines and auto insurance claim rules.",
            url: URL,
            version: DATASET_META.version,
            dateModified: DATASET_META.updated,
            license: "https://creativecommons.org/licenses/by/4.0/",
            isAccessibleForFree: true,
            keywords: [
              "statute of limitations by state",
              "workers compensation appeal deadline",
              "EEOC filing deadline",
              "insurance prompt pay laws",
              "comparative negligence by state",
            ],
            spatialCoverage: { "@type": "Country", name: "United States" },
            creator: { "@type": "Organization", name: "LegallySpoken", url: SITE },
            distribution: [
              {
                "@type": "DataDownload",
                encodingFormat: "text/csv",
                contentUrl: URL,
              },
            ],
          },
          articleSchema(
            DATASET_META.name,
            "Open dataset of state legal deadlines and settlement rules across all 51 US jurisdictions.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Data", url: `${SITE}/data/settlement-deadlines` },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <header className="mb-8">
        <Badge variant="outline" className="mb-3">
          <Database className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" /> Open dataset · CC BY 4.0
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
          US State Legal Deadlines &amp; Settlement Rules Dataset
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Every legal clock that decides whether a claim survives — filing deadlines, workers'
          compensation appeal windows, discrimination charge limits, and insurer payment rules —
          compiled for all {DATASET_META.jurisdictions} US jurisdictions in one citable table.
        </p>
        <AuthorByline authorId="senior-legal-researcher" reviewedAt={DATASET_META.updated} compact className="mt-3" />
      </header>

      <div className="grid gap-3 sm:grid-cols-4 mb-8">
        {[
          { k: DATASET_META.jurisdictions, v: "Jurisdictions" },
          { k: DATASET_META.fields, v: "Fields per state" },
          { k: `v${DATASET_META.version}`, v: `Updated ${DATASET_META.updated}` },
          { k: "CC BY 4.0", v: "Free to republish" },
        ].map((s) => (
          <Card key={s.v}>
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-accent">{s.k}</p>
              <p className="text-xs text-muted-foreground">{s.v}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={downloadCsv} size="sm">
          <Download className="h-4 w-4 mr-2" aria-hidden="true" /> Download CSV
        </Button>
        <Button variant="outline" size="sm" onClick={() => copy(embedSnippet, "Embed code")}>
          <Code2 className="h-4 w-4 mr-2" aria-hidden="true" /> Copy embed code
        </Button>
        <Button variant="outline" size="sm" onClick={() => copy(citationHtml, "Citation")}>
          <Quote className="h-4 w-4 mr-2" aria-hidden="true" /> Copy citation
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative sm:max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            className="pl-9"
            placeholder="Filter by state…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter dataset by state"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={group === "all" ? "default" : "outline"} size="sm" onClick={() => setGroup("all")}>
            Overview
          </Button>
          {DATASET_GROUPS.map((g) => (
            <Button
              key={g.id}
              variant={group === g.id ? "default" : "outline"}
              size="sm"
              onClick={() => setGroup(g.id)}
            >
              {g.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border mb-4">
        <table className="w-full text-sm">
          <caption className="sr-only">
            State legal deadlines and settlement rules by US jurisdiction
          </caption>
          <thead className="bg-muted">
            <tr>
              <th scope="col" className="text-left px-3 py-2 font-semibold whitespace-nowrap">
                State
              </th>
              {cols.map((c) => (
                <th key={c.id} scope="col" className="text-left px-3 py-2 font-semibold">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-t border-border align-top">
                <th scope="row" className="text-left px-3 py-2 font-medium whitespace-nowrap">
                  {r.state}
                </th>
                {cols.map((c) => (
                  <td key={c.id} className="px-3 py-2 text-muted-foreground">
                    {r[c.id] === null || r[c.id] === "" ? "—" : String(r[c.id])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mb-10">
        {rows.length} of {settlementDeadlineDataset.length} jurisdictions shown. Figures are
        baselines for standard adult claims; tolling rules, government-claim notices and
        occupational-disease exceptions can shorten or extend them. General information, not legal advice.
      </p>

      <AdSlot slot="mid-content" />

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h2 className="font-serif text-xl font-bold mb-2">Embed the live table</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Paste this into any article or CMS. The table stays current as we update the underlying state files.
            </p>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
              {embedSnippet}
            </pre>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h2 className="font-serif text-xl font-bold mb-2">How to cite</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Attribution is the only licence condition. Copy the HTML below or use the plain-text form.
            </p>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
              {citationHtml}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">Methodology</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Each row is compiled from the state's civil practice code, workers' compensation act,
            fair-employment statute and insurance code, then cross-checked against the administering
            agency's published guidance. Where a state expresses a rule in months or days we keep the
            statutory unit rather than converting it, because filing offices compute the deadline the
            same way.
          </p>
          <p>
            Statutes of limitations are the standard, non-tolled periods for an adult claimant.
            Medical malpractice figures exclude statutes of repose, which cap how long the discovery
            rule can extend a claim. Workers' compensation appeal windows measure the time from the
            written denial to the first level of review — usually a request for hearing rather than a
            full appeal brief.
          </p>
          <p>
            Prompt-pay deadlines reflect unfair-claims-practice regulations rather than contract
            terms, so they set the floor an insurer must meet regardless of policy language. Bad-faith
            entries state whether a first-party remedy exists and under what authority — statute,
            common law, or neither.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">Related tools and guides</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            { to: "/tools/statute-of-limitations-deadline-calculator", label: "Statute of limitations deadline calculator" },
            { to: "/workers-comp-denied-what-next", label: "Workers' comp denied — what to do next" },
            { to: "/wrongful-termination-settlements", label: "Wrongful termination settlement amounts" },
            { to: "/car-insurance-claim-denied", label: "Car insurance claim denied" },
            { to: "/personal-injury-settlements", label: "Personal injury settlement amounts" },
            { to: "/guides", label: "All legal guides" },
          ].map((l) => (
            <li key={l.to}>
              <Link
                to={lp(l.to)}
                className="block rounded-md border border-border bg-card px-3 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">Frequently asked questions</h2>
        <Accordion type="single" collapsible>
          {FAQS.map((f, i) => (
            <AccordionItem key={f.question} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

/** Guarded object-URL helper (SSR-safe). */
function URL_createObjectURL(blob: Blob) {
  return window.URL.createObjectURL(blob);
}
