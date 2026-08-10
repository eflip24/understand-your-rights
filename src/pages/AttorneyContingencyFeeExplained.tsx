import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Printer, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import { useLocalizedPath } from "@/i18n/paths";
import { getEditorialRole } from "@/data/editorialTeam";
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";

const AttorneyFeeCalculator = lazy(() => import("@/components/tools/AttorneyFeeCalculator"));

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/attorney-contingency-fee-explained`;
const REVIEWED = "2026-08-04";
const AUTHOR = getEditorialRole("consumer-finance-editor")?.name;

const LADDER = [
  { stage: "Policy-limits demand accepted within 30 days", fee: "25–30%", note: "Common where liability is clear and limits are low" },
  { stage: "Settled pre-suit (demand package)", fee: "33.33%", note: "The industry default" },
  { stage: "Lawsuit filed, settled before trial", fee: "40%", note: "Trigger is usually 'filing', sometimes 'answer filed'" },
  { stage: "Won at trial", fee: "40%", note: "Costs also spike here — experts and transcripts" },
  { stage: "Post-appeal recovery", fee: "45%", note: "Appellate work is billed separately in some retainers" },
];

const COSTS = [
  { item: "Court filing fee", range: "$200 – $500", note: "Per case; higher in some urban counties" },
  { item: "Service of process", range: "$50 – $150", note: "Per defendant; more for evasive defendants" },
  { item: "Medical record retrieval", range: "$50 – $300", note: "Per provider; HITECH-rate requests are cheaper" },
  { item: "Deposition transcripts", range: "$3 – $7 per page", note: "A 200-page depo runs $600–$1,400" },
  { item: "Treating physician deposition", range: "$1,500 – $6,000", note: "Surgeons routinely charge $2,000+/hour" },
  { item: "Retained expert (accident reconstruction)", range: "$3,000 – $15,000", note: "Site inspection, report, testimony" },
  { item: "Life care planner / economist", range: "$4,000 – $20,000", note: "Only in serious-injury cases" },
  { item: "Mediation fee", range: "$500 – $5,000 per day", note: "Usually split between the parties" },
  { item: "Trial exhibits and technology", range: "$1,500 – $25,000", note: "Animations and boards in larger cases" },
];

const CAPS = [
  { rule: "California MICRA (medical malpractice)", cap: "40% of the first $50K, 33.33% of the next $50K, 25% of the next $500K, then 15% above $600K", cite: "Cal. Bus. & Prof. Code §6146 (thresholds increase annually under AB 35)" },
  { rule: "Florida (medical malpractice)", cap: "30% of the first $250K, 10% above that", cite: "Fla. Const. Art. I §26 (Amendment 3); waivable in writing" },
  { rule: "Federal Tort Claims Act", cap: "25% after suit is filed; 20% on administrative settlement", cite: "28 U.S.C. §2678" },
  { rule: "Social Security disability", cap: "25% of past-due benefits or the fee-agreement cap, whichever is less", cite: "42 U.S.C. §406; cap set by SSA notice" },
  { rule: "Workers' compensation", cap: "Typically 10–25%, judge-approved", cite: "State-specific; e.g., NY ~15%, CA 9–15%, TX 25%" },
  { rule: "Minors' settlements", cap: "Court-approved fee, often reduced to 25%", cite: "Probate/guardianship approval required in most states" },
];

const FAQS = [
  { question: "What is a typical contingency fee percentage?", answer: "33.33% (one-third) if the case settles before a lawsuit is filed, and 40% if a lawsuit is filed or the case goes to trial. Straightforward policy-limits cases sometimes settle at 25–30%, and appellate work can push the fee to 45%. Anything above 45% in a routine injury case is outside industry norms." },
  { question: "Do I pay anything if we lose the case?", answer: "In a pure contingency arrangement, no attorney's fee is owed if there is no recovery. Most retainers, however, make you responsible for advanced case costs even in a loss. Many firms waive costs on a loss as a practical matter — get that waiver in writing rather than relying on custom." },
  { question: "Are case costs deducted before or after the fee?", answer: "This single clause moves your net check more than a percentage point of fee. 'Fee on gross, then costs' is the common default and favors the firm. 'Costs first, then fee on the net' pays you more. Both are ethical and both are negotiable — ask which one the retainer uses and get the answer in the document." },
  { question: "Can I negotiate the contingency percentage?", answer: "Yes, everywhere except where statute fixes it (workers' comp, FTCA, SSA, and med-mal in capped states). Clear-liability cases against a well-funded carrier are the most negotiable. Interview two or three firms; ask each for the fee ladder, the cost-order clause, and a cost cap." },
  { question: "What exactly counts as a 'case cost'?", answer: "Court filing and service fees, medical-record retrieval, deposition transcripts, expert witness fees, mediator fees, investigator time, postage and courier, and trial exhibits. Total case costs commonly run $2,000–$5,000 for a pre-suit soft-tissue claim and $25,000–$150,000 for a filed catastrophic-injury case." },
  { question: "Can the firm charge interest or an administrative fee on advanced costs?", answer: "Some retainers add interest on advanced costs or a flat 3–5% 'administrative' or 'file' fee on top. Both are permitted in many states if disclosed, and both are negotiable. Strike them or cap them before signing." },
  { question: "What happens to medical liens and health-insurance subrogation?", answer: "Liens are paid from your share after the fee, not the firm's. Hospital liens, ERISA plan reimbursement, Medicare conditional payments, and Medicaid claims are all negotiable — often reduced by one-third under common-fund doctrines because the attorney created the recovery. Lien reduction can be worth more to you than a lower fee." },
  { question: "What if I fire my attorney mid-case?", answer: "The discharged firm generally asserts a charging lien for quantum meruit — the reasonable value of work performed — payable out of the eventual recovery. In practice the two firms divide the single contingency fee, so the client's net is usually unaffected. Ask any new firm to confirm that in writing." },
  { question: "Is the contingency fee calculated before or after the property-damage recovery?", answer: "Most personal-injury retainers exclude property damage and first-party MedPay/PIP benefits from the fee base, because those are handled administratively. If your retainer does not exclude them, ask for that carve-out — it can be worth several thousand dollars." },
  { question: "Do I pay a fee on the medical bills the settlement repays?", answer: "Yes, under the standard 'fee on gross' structure the fee is calculated on the full settlement including the portion that repays medical providers. This is why negotiating lien reductions matters: the fee is fixed, but the lien is not." },
  { question: "Is the attorney fee tax-deductible?", answer: "For a physical-injury settlement excluded from income under IRC §104(a)(2), the fee is not deductible because the underlying recovery is not taxable. For taxable recoveries — punitive damages, interest, most employment claims — the 2017 tax law eliminated the miscellaneous itemized deduction, though employment and civil-rights claims retain an above-the-line deduction under §62(a)(20). Confirm with a CPA." },
  { question: "What should be in a contingency fee agreement in writing?", answer: "Most states require contingency agreements to be written and signed. It should state the percentage at each stage, whether the fee is computed before or after costs, an itemized list of chargeable costs, whether costs are owed if you lose, who approves settlement (always you), how liens are handled, and how a closing statement will be provided at disbursement." },
];

export default function AttorneyContingencyFeeExplained() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Attorney Contingency Fees Explained: What You Actually Take Home (2026)"
        description="How contingency fees really work — the 33% vs 40% ladder, how case costs are deducted, statutory fee caps, lien math, and worked examples showing net-to-client."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Attorney Contingency Fees Explained",
            "How contingency fees work, typical percentages, cost deduction order, statutory caps, lien math, and worked examples showing your net.",
            URL,
            { datePublished: "2026-01-19", dateModified: REVIEWED },
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
            "No win, no fee" makes injury law accessible — but four clauses in the retainer (the fee ladder, the cost order, the cost cap, and the lien language) decide what actually lands in your bank account. Here is the full math, with worked examples.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Reviewed by the LegallySpoken editorial team · Last updated {new Date(REVIEWED).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · General information, not legal advice.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Save as PDF</Button>
          </div>
        </header>

        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">What a contingency fee actually is</h2>
          <p>
            A contingency fee is an attorney's fee payable only out of a recovery. Instead of paying $300–$700 an hour as the case runs, you assign the firm a percentage of the settlement or verdict, and the firm advances the case costs in the meantime. It is the standard arrangement in personal injury, wrongful death, product liability, mass tort, workers' compensation, Social Security disability, and most plaintiff-side employment cases (wrongful termination, discrimination, wage and hour).
          </p>
          <p>
            Contingency fees are prohibited in criminal defense and in domestic-relations matters in nearly every state (see ABA Model Rule 1.5(d)), and every state requires the agreement to be in writing and signed. Rule 1.5(a) also requires the total fee to be reasonable — which is the hook courts use to reduce fees that are wildly out of step with the work performed.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">The fee ladder</h2>
          <p>
            Most firms use a stepped fee that rises with the amount of work required. Ask for the ladder in writing, and ask exactly what event triggers each step — "when suit is filed" and "when the defendant answers" can be months apart.
          </p>
        </section>

        <Card className="mb-8">
          <CardContent className="pt-4 overflow-x-auto">
            <h3 className="font-bold mb-3">Typical contingency fee ladder</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stage</TableHead>
                  <TableHead className="whitespace-nowrap">Typical fee</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LADDER.map((l) => (
                  <TableRow key={l.stage}>
                    <TableCell>{l.stage}</TableCell>
                    <TableCell className="font-mono whitespace-nowrap">{l.fee}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{l.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AdSlot slot="mid-content" />

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 1 — $100,000 settlement, fee on gross</h2>
          <p>Case settles pre-suit at 33.33%, with $8,000 in advanced case costs and $12,000 in medical liens after negotiation.</p>
        </section>

        <Card className="mb-8 bg-muted/40">
          <CardContent className="pt-4">
            <Table>
              <TableBody>
                <TableRow><TableCell>Gross settlement</TableCell><TableCell className="text-right font-mono">$100,000</TableCell></TableRow>
                <TableRow><TableCell>− Attorney fee (33.33% of gross)</TableCell><TableCell className="text-right font-mono text-destructive">−$33,333</TableCell></TableRow>
                <TableRow><TableCell>− Case costs (filing, records, experts)</TableCell><TableCell className="text-right font-mono text-destructive">−$8,000</TableCell></TableRow>
                <TableRow><TableCell>− Medical liens (negotiated)</TableCell><TableCell className="text-right font-mono text-destructive">−$12,000</TableCell></TableRow>
                <TableRow className="font-bold border-t-2"><TableCell>Net to client</TableCell><TableCell className="text-right font-mono">$46,667</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 2 — same settlement, fee on net after costs</h2>
          <p>Identical facts, one clause changed: the fee is computed after case costs are deducted ($100,000 − $8,000 = $92,000 fee base).</p>
        </section>

        <Card className="mb-8 bg-muted/40">
          <CardContent className="pt-4">
            <Table>
              <TableBody>
                <TableRow><TableCell>Gross settlement</TableCell><TableCell className="text-right font-mono">$100,000</TableCell></TableRow>
                <TableRow><TableCell>− Case costs</TableCell><TableCell className="text-right font-mono text-destructive">−$8,000</TableCell></TableRow>
                <TableRow><TableCell>− Attorney fee (33.33% of $92,000)</TableCell><TableCell className="text-right font-mono text-destructive">−$30,664</TableCell></TableRow>
                <TableRow><TableCell>− Medical liens (negotiated)</TableCell><TableCell className="text-right font-mono text-destructive">−$12,000</TableCell></TableRow>
                <TableRow className="font-bold border-t-2"><TableCell>Net to client</TableCell><TableCell className="text-right font-mono">$49,336</TableCell></TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              Same firm, same percentage, same result in the case — a $2,669 swing (5.7% of the client's net) purely from the order of operations in one sentence of the retainer.
            </p>
          </CardContent>
        </Card>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Worked example 3 — filed case at 40% with real litigation costs</h2>
          <p>A herniated-disc case settles at mediation for $400,000 eighteen months after filing. Costs: $34,000 (two expert reports, four depositions, mediator, records). Health-plan ERISA reimbursement claim of $95,000, reduced to $63,000 under a common-fund argument.</p>
        </section>

        <Card className="mb-8 bg-muted/40">
          <CardContent className="pt-4">
            <Table>
              <TableBody>
                <TableRow><TableCell>Gross settlement</TableCell><TableCell className="text-right font-mono">$400,000</TableCell></TableRow>
                <TableRow><TableCell>− Attorney fee (40% of gross)</TableCell><TableCell className="text-right font-mono text-destructive">−$160,000</TableCell></TableRow>
                <TableRow><TableCell>− Litigation costs</TableCell><TableCell className="text-right font-mono text-destructive">−$34,000</TableCell></TableRow>
                <TableRow><TableCell>− ERISA reimbursement (reduced from $95,000)</TableCell><TableCell className="text-right font-mono text-destructive">−$63,000</TableCell></TableRow>
                <TableRow className="font-bold border-t-2"><TableCell>Net to client</TableCell><TableCell className="text-right font-mono">$143,000</TableCell></TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              The $32,000 lien reduction is worth more to this client than dropping the fee from 40% to 33.33% would have been on the costs line alone — which is why lien negotiation skill matters as much as the headline percentage.
            </p>
          </CardContent>
        </Card>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-2">What case costs actually look like</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Costs are separate from the fee and are almost always advanced by the firm and reimbursed at disbursement. Ask for a written estimate and a cap requiring your approval above a set figure.
          </p>
          <Card>
            <CardContent className="pt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cost item</TableHead>
                    <TableHead className="whitespace-nowrap">Typical range</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COSTS.map((c) => (
                    <TableRow key={c.item}>
                      <TableCell className="font-medium">{c.item}</TableCell>
                      <TableCell className="font-mono text-sm whitespace-nowrap">{c.range}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-3">
                Pre-suit soft-tissue claims typically total $500–$3,000 in costs. Filed cases with retained experts routinely reach $25,000–$150,000.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-2">Statutory fee caps you cannot negotiate around</h2>
          <Card>
            <CardContent className="pt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim type</TableHead>
                    <TableHead>Fee cap</TableHead>
                    <TableHead>Authority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CAPS.map((c) => (
                    <TableRow key={c.rule}>
                      <TableCell className="font-medium">{c.rule}</TableCell>
                      <TableCell className="text-sm">{c.cap}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.cite}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-3">
                Caps and dollar thresholds are adjusted by statute and agency notice — confirm the current figure before relying on it.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-bold mb-4">Run your own numbers</h2>
          <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
            <AttorneyFeeCalculator />
          </Suspense>
        </section>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Liens: the line most clients never see coming</h2>
          <p>
            After the fee and costs, whatever paid your medical care generally has a claim against the settlement. Hospital liens are statutory in most states and often subject to reduction. Health insurers assert subrogation or reimbursement; self-funded ERISA plans have the strongest position, though a plan's own document controls whether the common-fund doctrine and the make-whole rule apply. Medicare conditional payments must be resolved through the Benefits Coordination &amp; Recovery Center before disbursement, and Medicaid claims are limited by <em>Ahlborn</em> and <em>Gallardo</em> principles in many states.
          </p>
          <p>
            Practical point: a firm that reduces a $95,000 ERISA claim to $63,000 has delivered $32,000 of value that never shows up in the fee percentage comparison. Ask any firm you interview how they handle lien reduction and whether they charge separately for it (they should not).
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Red flags in a contingency retainer</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>A percentage above 40% for a straightforward pre-suit claim.</li>
            <li>No cost cap and no requirement to get your approval before incurring large expenses.</li>
            <li>Interest charged on advanced costs, or a flat "administrative fee" of 3–5% layered on top.</li>
            <li>"Non-refundable retainer" language inside a pure contingency agreement.</li>
            <li>The fee base includes property damage and MedPay/PIP benefits.</li>
            <li>Any clause letting the firm settle without your written authority.</li>
            <li>Refusal to itemize expected costs or to provide a written closing statement at disbursement.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Six questions to ask before you sign</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>What is the fee at each stage, and what exact event triggers the step up?</li>
            <li>Is the fee calculated on the gross or on the net after costs?</li>
            <li>Do I owe costs if we lose — and will you put a waiver in writing?</li>
            <li>What is the cost cap above which you need my approval?</li>
            <li>Are property damage, MedPay and PIP excluded from the fee base?</li>
            <li>Who negotiates the liens, and is that included in the fee?</li>
          </ol>

          <h2 className="text-2xl font-bold mt-6 mb-3">Bottom line</h2>
          <p>
            A contingency fee buys you representation with no money down and aligns the firm's incentive with yours. But the headline percentage is only one of four levers. Compare the fee ladder, the cost-order clause, the cost cap, and the lien-reduction practice across two or three firms — the spread between the best and worst retainer on the same case is routinely 5–15% of your net check.
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

        <Card className="my-8 border-amber-500/50 bg-amber-500/5">
          <CardContent className="pt-4 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm">
              Fee percentages, caps, and lien rules vary by state and change with legislation. This page is general information, not legal advice, and does not create an attorney-client relationship.
            </p>
          </CardContent>
        </Card>

        <section className="my-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Compare retainers before you sign</h3>
              <p className="text-sm text-muted-foreground mb-3">Get free consultations from two or three attorneys and negotiate the fee order, the cost cap, and the lien practice in writing.</p>
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
          { href: "/what-to-do-after-a-car-accident", label: "Car accident checklist", blurb: "Protect the claim before you hire anyone" },
        ]}
      />
      </main>
    </>
  );
}
