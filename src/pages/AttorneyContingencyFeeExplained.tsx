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
const URL = `${SITE}/attorney-contingency-fee-explained`;

const FAQS = [
  { question: "What is a typical contingency fee percentage?", answer: "33.33% (one-third) if the case settles before a lawsuit is filed, and 40% if a lawsuit is filed or the case goes to trial. Some states cap fees on medical-malpractice or workers' comp claims — e.g., California caps med-mal fees on a sliding scale that starts at 40% and drops to 15% above $600,000." },
  { question: "Do I pay if we lose the case?", answer: "In a pure contingency arrangement, no attorney's fee is owed if you don't recover. However, most retainers require you to reimburse case costs (filing fees, expert witnesses, deposition transcripts) even if you lose. Ask for a written cost cap." },
  { question: "Are costs deducted before or after the fee?", answer: "This is the single biggest driver of your net check. 'Fee first, then costs' leaves you more money; 'costs first, then fee' is common and less favorable. Both are legal — negotiate the order in writing before signing." },
  { question: "Can I negotiate the contingency percentage?", answer: "Yes. Straightforward liability cases with strong insurance policies often go for 30% pre-suit. Ask 2–3 firms. Fee percentage is negotiable everywhere except where state law fixes it (like workers' comp and med-mal in some states)." },
  { question: "What are 'case costs' exactly?", answer: "Court filing fees ($200–$500), medical-record retrieval ($50–$300 per provider), expert witness fees ($500/hr for doctors, $300/hr for accident reconstruction), deposition transcripts ($3–$7/page), and mediator fees ($500–$5,000/day). Total case costs typically run $2,000–$25,000." },
];

export default function AttorneyContingencyFeeExplained() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Attorney Contingency Fees Explained: What You Actually Take Home (2026)"
        description="How contingency fees really work — typical 33% vs 40% splits, how case costs are deducted, state fee caps, and a worked example showing net-to-client."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Attorney Contingency Fees Explained",
            "How contingency fees work, typical percentages, how costs are deducted, and a worked example showing your net.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Personal Injury Law", url: `${SITE}/personal-injury-law` },
            { name: "Attorney Contingency Fees", url: URL },
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
          <span>Attorney Contingency Fees</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Attorney Contingency Fees Explained: What You Actually Take Home</h1>
          <p className="text-lg text-muted-foreground">
            Contingency fees ("no win, no fee") make personal injury law accessible — but the fine print determines what actually lands in your bank account. Here's exactly how it works.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Save as PDF</Button>
          </div>
        </header>

        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">What is a contingency fee?</h2>
          <p>
            A contingency fee is an attorney's fee paid only if you win. Instead of paying $300–$600 an hour up front, you agree to give the lawyer a percentage of the settlement or verdict. This is standard in personal injury, wrongful death, product liability, workers' compensation, and many employment (wrongful termination, discrimination) cases.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Typical percentages</h2>
          <p>
            The industry standard is the "one-third / 40%" model: the attorney takes 33.33% if the case resolves before a lawsuit is filed, and 40% if a lawsuit is filed. A few firms use 25% for insurance policy-limits demands that settle quickly, and some go to 45% if the case reaches appeal. Fees above 45% are almost always excessive.
          </p>
        </section>

        <Card className="mb-8">
          <CardContent className="pt-4">
            <h3 className="font-bold mb-3">Sample fee ladder used by most PI firms</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stage</TableHead>
                  <TableHead className="text-right">Typical fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>Settled pre-suit (demand letter)</TableCell><TableCell className="text-right font-mono">33.33%</TableCell></TableRow>
                <TableRow><TableCell>Lawsuit filed, settled before trial</TableCell><TableCell className="text-right font-mono">40%</TableCell></TableRow>
                <TableRow><TableCell>Won at trial</TableCell><TableCell className="text-right font-mono">40%</TableCell></TableRow>
                <TableRow><TableCell>Post-appeal recovery</TableCell><TableCell className="text-right font-mono">45%</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AdSlot slot="mid-content" />

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example: $100,000 settlement</h2>
          <p>Assume the case settles pre-suit at 33.33%, with $8,000 in case costs and $12,000 in medical liens.</p>
        </section>

        <Card className="mb-8 bg-muted/40">
          <CardContent className="pt-4">
            <Table>
              <TableBody>
                <TableRow><TableCell>Gross settlement</TableCell><TableCell className="text-right font-mono">$100,000</TableCell></TableRow>
                <TableRow><TableCell>− Attorney fee (33.33% of gross)</TableCell><TableCell className="text-right font-mono text-destructive">−$33,333</TableCell></TableRow>
                <TableRow><TableCell>− Case costs (filing, experts, depos)</TableCell><TableCell className="text-right font-mono text-destructive">−$8,000</TableCell></TableRow>
                <TableRow><TableCell>− Medical liens (negotiated)</TableCell><TableCell className="text-right font-mono text-destructive">−$12,000</TableCell></TableRow>
                <TableRow className="font-bold border-t-2"><TableCell>Net to client</TableCell><TableCell className="text-right font-mono">$46,667</TableCell></TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              If the retainer instead specifies "fee on net after costs" (fee taken from $92,000 not $100,000), the attorney fee drops to $30,664 and your net rises to $49,336 — a $2,669 swing on the same gross settlement.
            </p>
          </CardContent>
        </Card>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Fee order matters more than percentage</h2>
          <p>
            Two retainers with the same 33.33% fee can produce different net checks depending on whether the fee is calculated before or after case costs are deducted. Always ask: "Is the fee taken from gross, or from net after costs?" Get the answer in writing.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">State-imposed fee caps to know</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>California MICRA (med-mal):</strong> 40% up to $50K, then a sliding scale down to 15% over $600K (raised annually under AB 35).</li>
            <li><strong>Florida (med-mal):</strong> 30% of the first $250K, 10% above that (Amendment 3).</li>
            <li><strong>Federal Tort Claims Act:</strong> Capped at 25% of any settlement.</li>
            <li><strong>Workers' comp:</strong> Every state caps this — typically 10–25% depending on state.</li>
            <li><strong>Social Security disability:</strong> Federally capped at 25% or $7,200 (2026), whichever is less.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Red flags in a contingency retainer</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Percentage above 40% for a straightforward pre-suit case.</li>
            <li>No cap on case costs.</li>
            <li>Costs multiplied by an "administrative fee" (e.g., 3%).</li>
            <li>"Non-refundable retainer" language in a pure contingency case.</li>
            <li>Attorney refuses to itemize expected costs in writing.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Bottom line</h2>
          <p>
            A contingency fee gives you access to top-tier legal representation without paying by the hour. But the retainer terms — percentage, fee ladder, cost order, cost cap — can swing your net check by 5–15%. Run the numbers with our free calculator before you sign.
          </p>
        </section>

        <section className="my-8">
          <ToolRecommender topic="personal-injury" title="Estimate your net settlement" />
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
              <h3 className="font-bold mb-2">Compare retainers before you sign</h3>
              <p className="text-sm text-muted-foreground mb-3">Get free consultations from 2–3 attorneys and negotiate the fee order in writing.</p>
              <Button asChild><Link to={localePath("/lawyer-near-me")}>Find personal-injury attorneys near me</Link></Button>
            </CardContent>
          </Card>
        </section>
      <RelatedIntentStrip
        cluster="Personal-injury settlement cluster"
        links={[
          { href: "/personal-injury-settlements", label: "Settlement calculator", blurb: "Estimate gross value before fees" },
          { href: "/personal-injury-settlements/taxability", label: "Settlement taxability", blurb: "IRC § 104(a)(2) and what remains taxable" },
          { href: "/personal-injury-settlements/timeline", label: "Settlement timeline", blurb: "How long each stage really takes" },
          { href: "/how-pain-and-suffering-is-calculated", label: "Pain & suffering valuation", blurb: "What the multiplier is doing" },
        ]}
      />
      </main>
    </>
  );
}
