import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Code2, Quote, Database, Search, ArrowUpDown } from "lucide-react";
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
import { stateCourts, COURTS_LAST_VERIFIED, COURT_SOURCES } from "@/data/courts/stateCourts";

const SITE = "https://legallyspoken.com";
const URL_PATH = "/data/court-filing-fees";
const PAGE_URL = `${SITE}${URL_PATH}`;
const VERSION = "1.0";

/** Parse the first dollar figure in a string into a number for sorting. */
function firstAmount(value: string): number {
  const m = value.replace(/,/g, "").match(/\$?\s*([\d.]+)/);
  return m ? Number(m[1]) : 0;
}

type SortKey = "state" | "limit" | "fee";

const FAQS = [
  {
    question: "How much does it cost to file a small claims case?",
    answer:
      "Across the 51 US jurisdictions in this index the entry-level small claims filing fee generally runs from about $15 to $100, with several states charging more as the claim amount rises. Service of process (sheriff or certified mail) is billed separately and typically adds $10–$75 per defendant, and many courts charge a further fee if you later ask for a writ to enforce the judgment.",
  },
  {
    question: "What is the highest small claims limit in the United States?",
    answer:
      "Limits range from a few thousand dollars to $25,000 depending on the state, and a handful of states apply a lower cap to business plaintiffs or to landlord-tenant matters than to individuals. Always check the row for your state and the linked statute, because legislatures adjust these figures regularly.",
  },
  {
    question: "What happens if my claim exceeds the small claims limit?",
    answer:
      "You have two options: waive the excess and sue for the cap, which keeps the case in the simpler small claims track, or file in the general-jurisdiction trial court where fees are higher, formal rules of evidence apply and lawyers are the norm. Waiving is common when the excess is modest, because the time and cost saved usually outweighs the amount given up.",
  },
  {
    question: "Can filing fees be waived if I cannot afford them?",
    answer:
      "Yes. Every state has a fee waiver (often called in forma pauperis or an affidavit of indigency) for filers below an income threshold or receiving public benefits. The application is filed with the complaint, is decided by the clerk or a judge, and can cover service costs as well as the filing fee.",
  },
  {
    question: "Can I republish or cite this filing fee index?",
    answer:
      "Yes. The index is published under CC BY 4.0. Download the CSV, embed the live table, or copy the citation block on this page. The only requirement is a visible credit and link back to LegallySpoken.",
  },
  {
    question: "How often is the index updated?",
    answer:
      `It is rebuilt from our underlying state court files, verified against each judiciary's published fee schedule. The current version was last verified on ${COURTS_LAST_VERIFIED} and is reviewed on a rolling annual cycle plus whenever a legislature changes a limit or fee schedule.`,
  },
];

function toCsv(): string {
  const header = [
    "state",
    "abbr",
    "small_claims_limit",
    "small_claims_filing_fee",
    "limited_jurisdiction_court",
    "general_trial_court",
    "statute",
    "court_website",
    "efiling",
  ];
  const esc = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const rows = stateCourts.map((c) =>
    [
      c.name,
      c.abbr,
      c.smallClaimsLimit,
      c.smallClaimsFee,
      c.limitedCourt,
      c.trialCourt,
      c.statute,
      c.courtWebsite,
      c.eFiling ?? "",
    ]
      .map(esc)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

export default function CourtFilingFeesDataset() {
  const lp = useLocalizedPath();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("state");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? stateCourts.filter(
          (c) => c.name.toLowerCase().includes(q) || c.abbr.toLowerCase() === q,
        )
      : stateCourts;
    const sorted = [...filtered];
    if (sort === "state") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "limit")
      sorted.sort((a, b) => firstAmount(b.smallClaimsLimit) - firstAmount(a.smallClaimsLimit));
    if (sort === "fee")
      sorted.sort((a, b) => firstAmount(a.smallClaimsFee) - firstAmount(b.smallClaimsFee));
    return sorted;
  }, [query, sort]);

  const stats = useMemo(() => {
    const limits = stateCourts.map((c) => firstAmount(c.smallClaimsLimit)).filter(Boolean);
    const fees = stateCourts.map((c) => firstAmount(c.smallClaimsFee)).filter(Boolean);
    const avgLimit = Math.round(limits.reduce((a, b) => a + b, 0) / limits.length);
    const minFee = Math.min(...fees);
    const maxLimit = Math.max(...limits);
    return { avgLimit, minFee, maxLimit };
  }, []);

  const embedSnippet = `<iframe src="${PAGE_URL}?embed=1" width="100%" height="640" style="border:1px solid #e5e7eb;border-radius:8px" title="US Court Filing Fees & Small Claims Limits Index — LegallySpoken"></iframe>
<p style="font:12px sans-serif">Source: <a href="${PAGE_URL}">US Court Filing Fees &amp; Small Claims Limits Index</a> by LegallySpoken (CC BY 4.0)</p>`;

  const citationHtml = `<p>LegallySpoken Editorial Team. "US Court Filing Fees &amp; Small Claims Limits Index" (v${VERSION}, ${COURTS_LAST_VERIFIED}). <a href="${PAGE_URL}">${PAGE_URL}</a></p>`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: `${label} copied to clipboard` });
    } catch {
      toast({
        title: "Copy failed",
        description: "Select the text and copy manually.",
        variant: "destructive",
      });
    }
  };

  const downloadCsv = () => {
    const blob = new Blob([toCsv()], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "legallyspoken-court-filing-fees.csv";
    a.click();
    setTimeout(() => window.URL.revokeObjectURL(a.href), 1000);
  };

  return (
    <div className="container py-8 max-w-6xl">
      <Tier3Head
        title="Court Filing Fees & Small Claims Limits by State (2026 Index)"
        description="Free open index of small claims dollar limits and court filing fees in all 51 US jurisdictions, with the governing statute, the court that hears the case and official e-filing links. CSV download and embed."
      />
      <JsonLdGraph
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "US Court Filing Fees & Small Claims Limits Index",
            description:
              "Small claims dollar limits, filing-fee ranges, governing statutes, limited-jurisdiction court names and official judiciary links for all 50 US states and the District of Columbia.",
            url: PAGE_URL,
            version: VERSION,
            dateModified: COURTS_LAST_VERIFIED,
            license: "https://creativecommons.org/licenses/by/4.0/",
            isAccessibleForFree: true,
            keywords: [
              "small claims court limits by state",
              "court filing fees by state",
              "how much does it cost to sue someone",
              "small claims filing fee",
              "small claims court maximum amount",
            ],
            spatialCoverage: { "@type": "Country", name: "United States" },
            creator: { "@type": "Organization", name: "LegallySpoken", url: SITE },
            distribution: [
              {
                "@type": "DataDownload",
                encodingFormat: "text/csv",
                contentUrl: PAGE_URL,
              },
            ],
          },
          articleSchema(
            "US Court Filing Fees & Small Claims Limits Index",
            "Open index of small claims limits and civil filing fees across all 51 US jurisdictions.",
            PAGE_URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Data", url: `${SITE}/data/settlement-deadlines` },
            { name: "Court filing fees", url: PAGE_URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <header className="mb-8">
        <Badge variant="outline" className="mb-3">
          <Database className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" /> Open dataset · CC BY 4.0
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
          Court Filing Fees &amp; Small Claims Limits by State
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          What it actually costs to start a case, and how much you can recover without a lawyer —
          the small claims cap, published filing-fee range, governing statute and official filing
          portal for all {stateCourts.length} US jurisdictions in one citable table.
        </p>
        <AuthorByline
          authorId="senior-legal-researcher"
          reviewedAt={COURTS_LAST_VERIFIED}
          compact
          className="mt-3"
        />
      </header>

      <div className="grid gap-3 sm:grid-cols-4 mb-8">
        {[
          { k: stateCourts.length, v: "Jurisdictions" },
          { k: `$${stats.avgLimit.toLocaleString()}`, v: "Average small claims limit" },
          { k: `$${stats.maxLimit.toLocaleString()}`, v: "Highest limit in the US" },
          { k: `from $${stats.minFee}`, v: "Lowest filing fee" },
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
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            className="pl-9"
            placeholder="Filter by state…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter filing fee index by state"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "state", label: "A–Z" },
              { id: "limit", label: "Highest limit" },
              { id: "fee", label: "Cheapest to file" },
            ] as { id: SortKey; label: string }[]
          ).map((s) => (
            <Button
              key={s.id}
              variant={sort === s.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSort(s.id)}
            >
              <ArrowUpDown className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
              {s.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border mb-4">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Small claims limits and court filing fees by US jurisdiction
          </caption>
          <thead className="bg-muted">
            <tr>
              <th scope="col" className="text-left px-3 py-2 font-semibold whitespace-nowrap">
                State
              </th>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Small claims limit
              </th>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Filing fee
              </th>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Court that hears it
              </th>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Statute
              </th>
              <th scope="col" className="text-left px-3 py-2 font-semibold">
                Official site
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.slug} className="border-t border-border align-top">
                <th scope="row" className="text-left px-3 py-2 font-medium whitespace-nowrap">
                  <Link to={lp(`/courts/${c.slug}`)} className="text-accent hover:underline">
                    {c.name}
                  </Link>
                </th>
                <td className="px-3 py-2 font-medium">{c.smallClaimsLimit}</td>
                <td className="px-3 py-2 text-muted-foreground">{c.smallClaimsFee}</td>
                <td className="px-3 py-2 text-muted-foreground">{c.limitedCourt}</td>
                <td className="px-3 py-2 text-muted-foreground">{c.statute}</td>
                <td className="px-3 py-2">
                  <a
                    href={c.courtWebsite}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-accent hover:underline break-all"
                  >
                    {c.courtWebsite.replace(/^https?:\/\//, "")}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mb-10">
        {rows.length} of {stateCourts.length} jurisdictions shown. Fee ranges are the published
        statewide schedule for a standard small claims filing; individual counties can add local
        surcharges, and service of process is billed separately. Verified {COURTS_LAST_VERIFIED}.
        General information, not legal advice.
      </p>

      <AdSlot slot="mid-content" />

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h2 className="font-serif text-xl font-bold mb-2">Embed the live table</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Paste this into any article or CMS. The table stays current as we update the
              underlying state court files.
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
              Attribution is the only licence condition. Copy the HTML below or use the plain-text
              form.
            </p>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
              {citationHtml}
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">What a case really costs</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The filing fee is only the first line item. A realistic budget for a small claims case
            adds service of process — the sheriff, a private process server or certified mail —
            which commonly runs $10 to $75 per defendant, plus any fee for a second attempt when the
            defendant is not found at the address on the complaint. Courts that require a jury
            demand in civil cases charge that separately, and postponements requested by a party can
            carry their own fee.
          </p>
          <p>
            Winning is not the end of the spend. Collecting a judgment normally means paying for a
            writ of execution, a garnishment order or a judgment lien recording, each with its own
            fee. Most states let the prevailing party add recoverable costs — usually the filing fee
            and service — to the judgment, so the money comes back if the defendant actually pays.
          </p>
          <p>
            Against those numbers, the deciding factor is usually the cap rather than the cost. If a
            claim is close to the state's small claims limit, waiving the excess to stay in the
            simpler track is often cheaper than the general-jurisdiction filing fee plus the
            practical need for a lawyer once formal rules of evidence apply.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">Methodology &amp; sources</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Each row is compiled from the state's fee schedule statute or judicial council order and
            cross-checked against the judiciary's own published schedule, then paired with the
            limited-jurisdiction court that actually hears small claims in that state. Where a state
            sets a tiered fee that rises with the claim amount, the range shows the entry-level and
            top-tier figures rather than a single number.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {COURT_SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-accent hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">Related tools and guides</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            { to: "/courts", label: "US court systems directory" },
            { to: "/data/settlement-deadlines", label: "State legal deadlines dataset" },
            { to: "/statute-of-limitations-by-state", label: "Statute of limitations by state" },
            { to: "/forms/small-claims-demand-packet", label: "Small claims demand packet" },
            { to: "/forms/demand-letter", label: "Demand letter generator" },
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
