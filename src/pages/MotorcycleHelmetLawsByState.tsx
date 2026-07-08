import { Link } from "react-router-dom";
import { ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/motorcycle-helmet-insurance-laws-by-state`;

// Helmet: universal = all riders, partial = under 18/21 or with permit, none = no law.
// Min liability: state minimum liability BI per person / per accident / property damage.
const ROWS: { state: string; helmet: string; minBI: string; noFault: string; uim: string }[] = [
  { state: "Alabama", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Optional" },
  { state: "Alaska", helmet: "Under 18 + permit", minBI: "50/100/25", noFault: "No", uim: "Required (reject in writing)" },
  { state: "Arizona", helmet: "Under 18", minBI: "25/50/15", noFault: "No", uim: "Offered" },
  { state: "Arkansas", helmet: "Under 21", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "California", helmet: "Universal", minBI: "15/30/5", noFault: "No", uim: "Offered" },
  { state: "Colorado", helmet: "Under 18", minBI: "25/50/15", noFault: "No", uim: "Offered" },
  { state: "Connecticut", helmet: "Under 18", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Delaware", helmet: "Under 19", minBI: "25/50/10", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Florida", helmet: "Under 21 (or w/ $10K med)", minBI: "10/20/10 + PIP", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Georgia", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Hawaii", helmet: "Under 18", minBI: "20/40/10", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Idaho", helmet: "Under 18", minBI: "25/50/15", noFault: "No", uim: "Offered" },
  { state: "Illinois", helmet: "None", minBI: "25/50/20", noFault: "No", uim: "Required" },
  { state: "Indiana", helmet: "Under 18", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Iowa", helmet: "None", minBI: "20/40/15", noFault: "No", uim: "Offered" },
  { state: "Kansas", helmet: "Under 18", minBI: "25/50/25", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Kentucky", helmet: "Under 21 / permit", minBI: "25/50/25", noFault: "Yes (choice)", uim: "Offered" },
  { state: "Louisiana", helmet: "Universal", minBI: "15/30/25", noFault: "No", uim: "Required (reject in writing)" },
  { state: "Maine", helmet: "Under 18 / permit", minBI: "50/100/25", noFault: "No", uim: "Required" },
  { state: "Maryland", helmet: "Universal", minBI: "30/60/15", noFault: "No", uim: "Required" },
  { state: "Massachusetts", helmet: "Universal", minBI: "20/40/5 + PIP", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Michigan", helmet: "Under 21 (or w/ $20K med)", minBI: "50/100/10 + PIP", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Minnesota", helmet: "Under 18 / permit", minBI: "30/60/10 + PIP", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Mississippi", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Missouri", helmet: "Under 26", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Montana", helmet: "Under 18", minBI: "25/50/20", noFault: "No", uim: "Offered" },
  { state: "Nebraska", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Nevada", helmet: "Universal", minBI: "25/50/20", noFault: "No", uim: "Offered" },
  { state: "New Hampshire", helmet: "Under 18", minBI: "25/50/25 (opt)", noFault: "No", uim: "Required if BI" },
  { state: "New Jersey", helmet: "Universal", minBI: "15/30/5 + PIP", noFault: "Yes (choice)", uim: "Required" },
  { state: "New Mexico", helmet: "Under 18", minBI: "25/50/10", noFault: "No", uim: "Offered" },
  { state: "New York", helmet: "Universal", minBI: "25/50/10 + PIP", noFault: "Yes (PIP)", uim: "Required" },
  { state: "North Carolina", helmet: "Universal", minBI: "30/60/25", noFault: "No", uim: "Required" },
  { state: "North Dakota", helmet: "Under 18", minBI: "25/50/25 + PIP", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Ohio", helmet: "Under 18 / permit", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Oklahoma", helmet: "Under 18", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Oregon", helmet: "Universal", minBI: "25/50/20 + PIP", noFault: "Yes (PIP)", uim: "Required" },
  { state: "Pennsylvania", helmet: "Under 21 / <2yr", minBI: "15/30/5 + PIP", noFault: "Yes (choice)", uim: "Offered" },
  { state: "Rhode Island", helmet: "Under 21 / permit", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "South Carolina", helmet: "Under 21", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "South Dakota", helmet: "Under 18", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Tennessee", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Offered" },
  { state: "Texas", helmet: "Under 21 (or w/ ins/training)", minBI: "30/60/25", noFault: "No", uim: "Offered" },
  { state: "Utah", helmet: "Under 21", minBI: "25/65/15 + PIP", noFault: "Yes (PIP)", uim: "Offered" },
  { state: "Vermont", helmet: "Universal", minBI: "25/50/10", noFault: "No", uim: "Required" },
  { state: "Virginia", helmet: "Universal", minBI: "30/60/20", noFault: "No", uim: "Required" },
  { state: "Washington", helmet: "Universal", minBI: "25/50/10", noFault: "No", uim: "Offered" },
  { state: "West Virginia", helmet: "Universal", minBI: "25/50/25", noFault: "No", uim: "Required" },
  { state: "Wisconsin", helmet: "Under 18 / permit", minBI: "25/50/10", noFault: "No", uim: "Required" },
  { state: "Wyoming", helmet: "Under 18", minBI: "25/50/20", noFault: "No", uim: "Offered" },
  { state: "District of Columbia", helmet: "Universal", minBI: "25/50/10", noFault: "No", uim: "Required" },
];

const FAQS = [
  { question: "Does not wearing a helmet reduce my motorcycle accident settlement?", answer: "In many states, yes — under comparative-negligence rules the insurer can argue your head/neck injuries were worsened by not wearing a helmet, potentially reducing damages by 10–40%. A few states (Florida, Texas) limit this 'helmet defense.'" },
  { question: "Do I need special motorcycle insurance beyond state minimums?", answer: "Yes. State minimum liability rarely covers a serious motorcycle injury (surgery + PT often exceeds $100K). Add MedPay ($5K–$10K) and Uninsured/Underinsured Motorist coverage — 1 in 8 US drivers is uninsured." },
  { question: "Which states have universal helmet laws in 2026?", answer: "18 states plus DC still require helmets for ALL riders: AL, CA, GA, LA, MD, MA, MS, NE, NV, NJ, NY, NC, OR, TN, VT, VA, WA, WV, DC. Others require helmets only for riders under 18 or 21." },
];

export default function MotorcycleHelmetLawsByState() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Motorcycle Helmet & Insurance Laws by State (2026)"
        description="State-by-state motorcycle helmet requirements, minimum liability limits, no-fault status, and uninsured motorist rules. Updated 2026."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Motorcycle Helmet & Insurance Laws by State",
            "50-state comparison of motorcycle helmet requirements and minimum insurance limits.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Auto Accident Law", url: `${SITE}/auto-accident-law` },
            { name: "Motorcycle Laws by State", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={localePath("/auto-accident-law")} className="hover:text-primary">Auto Accident Law</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Motorcycle Laws by State</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Motorcycle Helmet & Insurance Laws by State (2026)</h1>
          <p className="text-lg text-muted-foreground">
            Helmet requirement, minimum liability limits, no-fault status, and uninsured/underinsured motorist rules — for all 50 states plus DC.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Save as PDF</Button>
          </div>
        </header>

        <Card className="mb-6">
          <CardContent className="pt-4 text-sm text-muted-foreground space-y-2">
            <p><strong>How to read this table.</strong> "Universal" = all riders must wear a helmet. "Under 18/21" = only younger riders. Minimum BI is bodily injury per person / per accident / property damage in thousands of dollars. "PIP" = personal injury protection is required. UIM = uninsured/underinsured motorist coverage.</p>
            <p><strong>Why it matters for your settlement.</strong> In non-universal states insurers routinely argue the "helmet defense" to reduce head/neck injury awards. And in no-fault states you generally must first exhaust PIP before suing.</p>
          </CardContent>
        </Card>

        <div className="rounded-lg border overflow-x-auto mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>Helmet requirement</TableHead>
                <TableHead>Min liability (BI/PD)</TableHead>
                <TableHead>No-fault?</TableHead>
                <TableHead>UM/UIM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.state}>
                  <TableCell className="font-medium">{r.state}</TableCell>
                  <TableCell>{r.helmet}</TableCell>
                  <TableCell className="font-mono text-xs">{r.minBI}</TableCell>
                  <TableCell>{r.noFault}</TableCell>
                  <TableCell>{r.uim}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AdSlot slot="mid-content" />

        <section className="my-8">
          <ToolRecommender topic="car-accident" title="Value your motorcycle accident case" />
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="my-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Injured in a motorcycle crash?</h3>
              <p className="text-sm text-muted-foreground mb-3">Get a free case review from a motorcycle-accident attorney in your state.</p>
              <Button asChild><Link to={localePath("/lawyer-near-me")}>Find a motorcycle-accident lawyer near me</Link></Button>
            </CardContent>
          </Card>
        </section>

        <p className="text-xs text-muted-foreground mt-8">
          Data compiled from state DMV/DOT sources and IIHS as of 2026. Verify current rules with your state DMV before making legal or insurance decisions.
        </p>
      </main>
    </>
  );
}
