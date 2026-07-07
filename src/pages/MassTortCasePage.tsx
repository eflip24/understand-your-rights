import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, Printer, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { useLocalizedPath } from "@/i18n/paths";
import { massTortCases } from "@/data/massTortCases";

const SITE = "https://legallyspoken.com";

const STATUS_COLOR: Record<string, string> = {
  Active: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  Settling: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  "Pending Bellwether": "bg-amber-500/10 text-amber-700 border-amber-500/30",
  "Recently Settled": "bg-purple-500/10 text-purple-700 border-purple-500/30",
};

export default function MassTortCasePage() {
  const { slug } = useParams<{ slug: string }>();
  const lp = useLocalizedPath();

  if (!slug || !massTortCases[slug]) {
    return <Navigate to="/mass-tort-lawsuits" replace />;
  }

  const c = massTortCases[slug];
  const url = `${SITE}/mass-tort-lawsuits/${c.slug}`;
  const related = Object.values(massTortCases).filter((x) => x.slug !== c.slug).slice(0, 4);

  return (
    <div className="container py-8 max-w-4xl">
      <Tier3Head title={c.metaTitle} description={c.metaDescription} />
      <JsonLdGraph
        schemas={[
          articleSchema(c.h1, c.metaDescription, url),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Mass Tort Lawsuits", url: `${SITE}/mass-tort-lawsuits` },
            { name: c.name, url },
          ]),
          faqSchema(c.faqs),
        ]}
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp("/mass-tort-lawsuits")} className="hover:text-foreground">Mass Tort Lawsuits</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{c.name}</span>
      </nav>

      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline" className={STATUS_COLOR[c.status] || ""}>
            {c.status}
          </Badge>
          {c.mdlNumber && (
            <Badge variant="outline">{c.mdlNumber}</Badge>
          )}
          {c.court && <Badge variant="outline">{c.court}</Badge>}
          <span className="text-xs text-muted-foreground">Updated {c.updatedAt}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          {c.h1}
        </h1>
        <p className="text-lg text-muted-foreground">{c.intro}</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button size="sm" variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" /> Save as PDF
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={lp("/lawyer-near-me/personal-injury")}>Find a Mass Tort Attorney</Link>
        </Button>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Settlement ranges */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Settlement Amounts by Tier</h2>
        <div className="space-y-3">
          {c.settlementRanges.map((s, i) => (
            <Card key={i}>
              <CardContent className="pt-5">
                <p className="text-sm font-semibold text-foreground">{s.tier}</p>
                <p className="text-2xl font-bold text-accent my-2">{s.range}</p>
                {s.notes && <p className="text-xs text-muted-foreground">{s.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Ranges reflect publicly reported settlements, analyst projections, and bellwether verdicts. Individual outcomes depend on evidence, jurisdiction, and case-specific facts.
        </p>
      </section>

      {/* Eligibility */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Who Qualifies?</h2>
        <Card>
          <CardContent className="pt-5">
            <ul className="space-y-2">
              {c.eligibility.map((e, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{e}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Injuries */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Qualifying Injuries & Diagnoses</h2>
        <div className="flex flex-wrap gap-2">
          {c.injuries.map((inj) => (
            <Badge key={inj} variant="secondary" className="text-sm py-1 px-3">
              {inj}
            </Badge>
          ))}
        </div>
      </section>

      {/* Deadlines */}
      <div className="mb-10 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 flex gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm">Filing Deadlines</p>
          <p className="text-sm text-muted-foreground mt-1">{c.deadlines}</p>
          <Link
            to={lp("/tools/consumer/statute-of-limitations-lookup")}
            className="text-sm text-accent underline mt-1 inline-block"
          >
            Check your state's statute of limitations →
          </Link>
        </div>
      </div>

      {/* Key dates timeline */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Litigation Timeline</h2>
        <div className="space-y-3">
          {c.keyDates.map((d, i) => (
            <div key={i} className="flex gap-3 items-start rounded-md border p-3">
              <Calendar className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-foreground">{d.date}</p>
                <p className="text-sm text-muted-foreground">{d.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence checklist */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Evidence Checklist</h2>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground mb-3">
              Gather these documents before your attorney consultation to speed up intake:
            </p>
            <ul className="space-y-2">
              {c.evidenceChecklist.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <input type="checkbox" className="mt-1 accent-accent" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">{c.name} FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {c.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`f-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <AdSlot slot="end-of-article" className="mb-8" />

      {/* Related */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Other Active Mass Tort Cases</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {related.map((r) => (
            <Link
              key={r.slug}
              to={lp(`/mass-tort-lawsuits/${r.slug}`)}
              className="block rounded-lg border p-4 hover:bg-muted/50 transition"
            >
              <p className="font-semibold text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{r.status}{r.mdlNumber ? ` · ${r.mdlNumber}` : ""}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> Educational information about pending litigation. Not legal advice. Settlement projections are analyst estimates based on public filings and may not reflect actual payouts. Consult a licensed attorney experienced in {c.name} litigation for a case evaluation.
        </p>
      </div>
    </div>
  );
}
