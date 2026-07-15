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
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/how-pain-and-suffering-is-calculated`;

const FAQS = [
  { question: "How is pain and suffering calculated in a personal injury case?", answer: "Two methods dominate: the multiplier method (medical bills × 1.5 to 5) and the per diem method (a daily dollar amount, often the plaintiff's daily wage, multiplied by days of recovery). Insurers use proprietary software like Colossus that combines both plus 100+ severity codes." },
  { question: "What is a typical pain and suffering multiplier?", answer: "1.5–2× for soft-tissue-only cases with quick recovery; 2–3× for cases with imaging findings and physical therapy; 3–5× for surgeries, fractures, or permanent impairment; 5×+ only for catastrophic injuries (TBI, spinal cord, disfigurement)." },
  { question: "Are pain and suffering damages taxable?", answer: "Federal: pain and suffering tied to a physical injury are generally NOT taxable under IRC §104(a)(2). Punitive damages ARE taxable. Emotional distress without a physical injury is taxable. Ask your CPA before signing." },
  { question: "How do insurance companies actually value pain and suffering?", answer: "Major insurers use software (Colossus, Claim IQ) that assigns severity points based on ~10,000 injury codes, treatment type, provider credentials, jurisdiction, and prior verdicts. The output is a settlement range the adjuster is authorized to offer." },
  { question: "Can I claim pain and suffering without an attorney?", answer: "Technically yes — but insurers routinely offer 30–50% less to unrepresented claimants. Even after a 33% contingency fee, represented plaintiffs typically net more than pro se plaintiffs on cases above ~$5,000." },
];

export default function PainAndSufferingExplained() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="How Pain and Suffering Is Calculated (with Worked Examples, 2026)"
        description="Multiplier method, per-diem method, and Colossus software — a complete breakdown of how pain and suffering damages are actually calculated, with three worked examples."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "How Pain and Suffering Is Calculated",
            "The multiplier method, per-diem method, and insurer software explained with worked examples.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Personal Injury Law", url: `${SITE}/personal-injury-law` },
            { name: "Pain and Suffering Calculation", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={localePath("/personal-injury-law")} className="hover:text-primary">Personal Injury Law</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Pain and Suffering</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-3">How Pain and Suffering Is Calculated</h1>
          <p className="text-lg text-muted-foreground">
            Pain and suffering is usually the largest single line in a personal injury settlement — and the most negotiable. Here's exactly how the number is built, with three worked examples.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Save as PDF</Button>
          </div>
        </header>

        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">The two dominant methods</h2>
          <p>
            Every serious pain-and-suffering estimate starts from one of two frameworks — often both, blended.
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Multiplier method.</strong> Add up medical bills (economic damages), then multiply by 1.5–5 to estimate non-economic damages.</li>
            <li><strong>Per diem method.</strong> Pick a daily dollar figure (commonly the plaintiff's daily wage), multiply by days from injury to Maximum Medical Improvement (MMI).</li>
          </ol>
          <p>Attorneys typically calculate both, then argue for the higher number. Insurers argue for the lower number.</p>
        </section>

        <Card className="mb-8">
          <CardContent className="pt-4">
            <h3 className="font-bold mb-3">Multiplier by severity</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case type</TableHead>
                  <TableHead>Multiplier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>Soft tissue, full recovery in 3–6 months</TableCell><TableCell className="font-mono">1.5×</TableCell></TableRow>
                <TableRow><TableCell>Imaging findings, PT, no surgery</TableCell><TableCell className="font-mono">2–3×</TableCell></TableRow>
                <TableRow><TableCell>Fracture, injection procedures, arthroscopy</TableCell><TableCell className="font-mono">3–4×</TableCell></TableRow>
                <TableRow><TableCell>Surgery + permanent impairment rating</TableCell><TableCell className="font-mono">4–5×</TableCell></TableRow>
                <TableRow><TableCell>Catastrophic (TBI, spinal cord, disfigurement)</TableCell><TableCell className="font-mono">5–10×+</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AdSlot slot="mid-content" />

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 1 — Rear-end whiplash</h2>
          <p><strong>Facts:</strong> $8,000 in ER + chiropractic + 4 months of PT. Full recovery. No surgery. Missed 3 weeks of work at $1,000/week.</p>
        </section>

        <Card className="mb-8 bg-muted/40">
          <CardContent className="pt-4">
            <Table>
              <TableBody>
                <TableRow><TableCell>Medical bills</TableCell><TableCell className="text-right font-mono">$8,000</TableCell></TableRow>
                <TableRow><TableCell>Lost wages</TableCell><TableCell className="text-right font-mono">$3,000</TableCell></TableRow>
                <TableRow><TableCell>Pain & suffering (multiplier 2×)</TableCell><TableCell className="text-right font-mono">$16,000</TableCell></TableRow>
                <TableRow className="font-bold border-t-2"><TableCell>Estimated demand</TableCell><TableCell className="text-right font-mono">$27,000</TableCell></TableRow>
                <TableRow><TableCell className="text-muted-foreground text-xs">Typical settlement (60–70% of demand)</TableCell><TableCell className="text-right font-mono text-xs">$16K–$19K</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 2 — Herniated disc with surgery</h2>
          <p><strong>Facts:</strong> $85,000 in medical (MRI, epidural injections, single-level discectomy). Missed 4 months of work at $60,000/year. Permanent 8% impairment rating.</p>
        </section>

        <Card className="mb-8 bg-muted/40">
          <CardContent className="pt-4">
            <Table>
              <TableBody>
                <TableRow><TableCell>Medical bills</TableCell><TableCell className="text-right font-mono">$85,000</TableCell></TableRow>
                <TableRow><TableCell>Lost wages (4 months)</TableCell><TableCell className="text-right font-mono">$20,000</TableCell></TableRow>
                <TableRow><TableCell>Future medical (life care plan)</TableCell><TableCell className="text-right font-mono">$40,000</TableCell></TableRow>
                <TableRow><TableCell>Pain & suffering (multiplier 4×)</TableCell><TableCell className="text-right font-mono">$340,000</TableCell></TableRow>
                <TableRow className="font-bold border-t-2"><TableCell>Estimated demand</TableCell><TableCell className="text-right font-mono">$485,000</TableCell></TableRow>
                <TableRow><TableCell className="text-muted-foreground text-xs">Typical settlement</TableCell><TableCell className="text-right font-mono text-xs">$280K–$380K</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 3 — Per-diem method</h2>
          <p><strong>Facts:</strong> Same rear-end whiplash. Plaintiff earns $200/day. Time from injury to MMI: 180 days.</p>
          <ul className="list-disc list-inside">
            <li>Per diem: $200 × 180 days = <strong>$36,000</strong> pain and suffering.</li>
            <li>Multiplier method above yielded $16,000.</li>
            <li>Attorney argues per diem ($36K); insurer argues multiplier ($16K); case likely settles in the $20K–$25K range for the pain-and-suffering line alone.</li>
          </ul>
        </section>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">What insurers actually do: Colossus</h2>
          <p>
            Major insurers (Allstate, GEICO, Liberty Mutual, Travelers, Nationwide) run claim files through proprietary software — most famously Computer Sciences Corp's Colossus. The system assigns severity points based on:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Diagnostic codes (ICD-10) and treatment codes (CPT)</li>
            <li>Provider credentials — MD, DO, DC, PT — each weighted differently</li>
            <li>Duration and frequency of treatment</li>
            <li>Presence of imaging or objective findings (MRI, EMG, EEG)</li>
            <li>Impairment ratings under the AMA Guides</li>
            <li>Jurisdiction and prior verdict data for that ZIP code</li>
          </ul>
          <p className="mt-2">
            To maximize your value in the software, your attorney will make sure the demand package cites the exact ICD-10 codes, includes MRI imaging findings, quotes any impairment rating verbatim, and cross-references analogous verdicts from your county.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Factors that increase pain and suffering</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Objective imaging findings (MRI, CT, EMG)</li>
            <li>Surgery — especially open surgery or hardware placement</li>
            <li>Permanent impairment rating from an AMA Guides evaluation</li>
            <li>Documented psychological effects (PTSD, depression, anxiety)</li>
            <li>Visible scarring, disfigurement, or amputation</li>
            <li>Impact on hobbies, intimacy, and daily activities (loss of enjoyment)</li>
            <li>Longer treatment duration and consistent attendance</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Factors that decrease pain and suffering</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Treatment gaps over 30 days</li>
            <li>Pre-existing conditions in the same body area</li>
            <li>Social media posts showing physical activity</li>
            <li>Chiropractic-only treatment without medical follow-up</li>
            <li>Missed medical appointments</li>
            <li>Comparative negligence (your fault percentage reduces the recovery)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Bottom line</h2>
          <p>
            Pain and suffering is math wearing a story. The math (multiplier × medicals, or per diem × days) sets the range; the story (imaging, permanence, life impact) moves you to the top of that range. Get the story documented before you demand.
          </p>
        </section>

        <section className="my-8">
          <ToolRecommender topic="personal-injury" title="Calculate your pain and suffering" />
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
              <h3 className="font-bold mb-2">Get a free case value review</h3>
              <p className="text-sm text-muted-foreground mb-3">A personal injury attorney can pressure-test your pain and suffering estimate against local jury verdicts.</p>
              <Button asChild><Link to={localePath("/lawyer-near-me")}>Find a personal-injury lawyer near me</Link></Button>
            </CardContent>
          </Card>
        </section>
      <RelatedIntentStrip
        cluster="Personal-injury settlement cluster"
        links={[
          { href: "/personal-injury-settlements", label: "Settlement calculator", blurb: "Runs the multiplier and per-diem yourself" },
          { href: "/auto-insurance-claim-guide", label: "Auto insurance claim guide", blurb: "Colossus, ClaimIQ, and MIST protocols" },
          { href: "/personal-injury-settlements/taxability", label: "Is my settlement taxable?", blurb: "IRC § 104(a)(2) and the allocation trap" },
          { href: "/attorney-contingency-fee-explained", label: "Contingency fees explained", blurb: "Net after attorney fees and liens" },
        ]}
      />
      </main>
    </>
  );
}
