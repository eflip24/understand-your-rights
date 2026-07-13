import { Link } from "react-router-dom";
import { ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema, webApplicationSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/auto-insurance-claim-guide`;

const FAQS = [
  {
    question: "How long do I have to file an auto insurance claim?",
    answer:
      "Most carriers require 'prompt notice' — practically 24–72 hours. The separate statute of limitations for a bodily-injury lawsuit is 1–6 years depending on state (Kentucky and Tennessee at 1 year; Maine and North Dakota at 6). Missing carrier notice deadlines can give the insurer a coverage defense even when the SOL hasn't run.",
  },
  {
    question: "Should I give a recorded statement to the other driver's insurer?",
    answer:
      "No. You have no contractual duty to the adverse carrier. Anything you say is transcribed and fed into claim-scoring software like Colossus, ClaimIQ, or Mitchell Decision Point, which flags inconsistencies and downgrades your general-damages multiplier. Politely decline and route them to your attorney.",
  },
  {
    question: "What is 'diminished value' and can I claim it?",
    answer:
      "Diminished value (DV) is the market-value loss a repaired vehicle carries because Carfax shows an accident. 3rd-party DV claims are recognized in most states; 1st-party DV is only recoverable in about a dozen (Georgia's Mabry v. State Farm is the leading case). Typical recovery is 10–25% of pre-loss value on a properly documented claim.",
  },
  {
    question: "What if the at-fault driver is uninsured or underinsured?",
    answer:
      "You tap your own uninsured motorist (UM) or underinsured motorist (UIM) coverage. UIM 'stacks' on top of the at-fault driver's limits in stacking states, and 'sets off' (reduces dollar-for-dollar) in non-stacking states. UM/UIM also usually covers hit-and-run.",
  },
  {
    question: "Does the insurance company pay my medical bills as they come in?",
    answer:
      "Not from the liability side. Bodily-injury liability pays a lump sum at settlement. Interim treatment is paid by MedPay (if you have it, typically $1K–$25K no-fault), PIP in no-fault states like Florida/New York/Michigan, or your health insurance (which then asserts a subrogation lien against your settlement).",
  },
  {
    question: "How does the adjuster decide how much my claim is worth?",
    answer:
      "Adjusters run your medical specials, ICD-10 codes, treatment duration, and injury type through claim-scoring software (Colossus at Allstate/CSAA, ClaimIQ at Travelers, Mitchell Decision Point at many others). The software outputs a general-damages range. Soft-tissue-only claims with short treatment are steered into a MIST (Minor Impact Soft Tissue) protocol that caps offers.",
  },
  {
    question: "When should I hire a lawyer instead of handling it myself?",
    answer:
      "Any of: injuries requiring more than a single ER visit, missed work over two weeks, disputed liability, commercial vehicle or rideshare involvement, UIM/UM claim, or an initial offer that doesn't cover your medical bills. Attorneys typically increase net recovery even after their 33.33% fee.",
  },
];

export default function AutoInsuranceClaimGuide() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Auto Insurance Claim Guide: How Adjusters Value Your Claim (2026)"
        description="Step-by-step auto insurance claim guide covering BI, UM/UIM, MedPay, PIP, diminished value, adjuster software (Colossus, ClaimIQ, Mitchell), and how to maximize your payout."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Auto Insurance Claim Guide",
            "How the auto insurance claim process works — from first notice through settlement — including coverage stacks, adjuster software, and diminished value.",
            URL,
          ),
          webApplicationSchema(
            "Auto Insurance Claim Tools",
            "Free calculators to estimate settlement value, attorney fees, and pain-and-suffering multipliers.",
            URL,
            ["US"],
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Personal Injury Law", url: `${SITE}/personal-injury-law` },
            { name: "Auto Insurance Claim Guide", url: URL },
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
          <span>Auto Insurance Claim Guide</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-3">Auto Insurance Claim Guide: How Adjusters Actually Value Your Claim</h1>
          <p className="text-lg text-muted-foreground">
            A carrier-by-carrier walkthrough of the auto-insurance claim process — from the first notice call through the final release — with the coverage stacks, software, and negotiation levers that decide what your check looks like.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />Save as PDF
            </Button>
          </div>
        </header>

        <InMarketEntityBlock
          category="Auto Insurance · Personal Injury"
          intro={
            <>
              <p className="mb-2">
                Every U.S. auto claim runs through the same short list of carriers — State Farm, GEICO, Progressive, Allstate, Liberty Mutual, Nationwide, Farmers, USAA, and Travelers — and each one uses claim-scoring software (Colossus, ClaimIQ, Mitchell Decision Point) to convert your ICD-10 codes, treatment duration, and property damage into a settlement range. Understanding the coverage stack and how the software reads your file is the difference between the initial low-ball and a fair recovery.
              </p>
              <p>
                Coverage is layered: bodily-injury liability (BI), property damage (PD), uninsured motorist (UM), underinsured motorist (UIM), medical payments (MedPay), personal injury protection (PIP) in no-fault states, and collision/comprehensive on your own vehicle. Add subrogation from your health plan and hospital liens, and the gross settlement is rarely what lands in your bank account.
              </p>
            </>
          }
          entities={[
            "State Farm", "GEICO", "Progressive", "Allstate", "Liberty Mutual", "Nationwide",
            "Farmers", "USAA", "Travelers", "Colossus", "ClaimIQ", "Mitchell Decision Point",
            "Bodily Injury (BI)", "UM / UIM", "MedPay", "PIP", "Diminished Value",
            "MIST protocol", "ICD-10 codes", "Subrogation", "Hospital lien", "Comparative negligence",
            "Policy limits demand", "Stowers demand", "Bad faith", "IRC § 104(a)(2)",
          ]}
          relatedTerms={[
            { label: "Personal injury settlement estimator", href: localePath("/tools/personal-injury/settlement-estimator") },
            { label: "Attorney fee calculator", href: localePath("/tools/personal-injury/attorney-fee-calculator") },
            { label: "Pain & suffering explained", href: localePath("/how-pain-and-suffering-is-calculated") },
            { label: "Statute of limitations by state", href: localePath("/tools/personal-injury/statute-of-limitations") },
            { label: "Find an auto-accident lawyer", href: localePath("/lawyer-near-me/personal-injury") },
          ]}
        />

        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">The seven-step claim timeline</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>First Notice of Loss (FNOL).</strong> Report to your carrier within 24 hours; they open a claim number and assign an adjuster. Do not call the other driver's carrier yourself.</li>
            <li><strong>Property damage triage.</strong> Vehicle inspected; estimate written by an in-house or IA (independent appraiser). ACV (actual cash value) is set for total losses using CCC, Mitchell, or Audatex valuation.</li>
            <li><strong>Medical treatment &amp; documentation.</strong> Consistent, gap-free treatment through MMI (maximum medical improvement). Every gap over 30 days is flagged by Colossus as "resolved."</li>
            <li><strong>Demand package.</strong> Once at MMI, send the adjuster medical records, bills, wage-loss verification, and a demand letter framing liability and damages.</li>
            <li><strong>Negotiation.</strong> Adjuster runs the file through claim-scoring software and issues a first offer — historically 35–55% of a reasonable settlement number. Counter with documentation.</li>
            <li><strong>Settlement &amp; release.</strong> A general release resolves all bodily-injury claims. Verify UM/UIM has been preserved before signing.</li>
            <li><strong>Lien resolution.</strong> Negotiate down health-insurance subrogation, ERISA, Medicare/Medicaid, and hospital liens before disbursing the net check.</li>
          </ol>
        </section>

        <Card className="mb-8">
          <CardContent className="pt-4">
            <h3 className="font-bold mb-3">Coverage stack cheat sheet</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Pays for</TableHead>
                  <TableHead>Typical limits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>Bodily Injury (BI) liability</TableCell><TableCell>Other party's injuries when you're at fault</TableCell><TableCell className="font-mono">25/50 – 250/500</TableCell></TableRow>
                <TableRow><TableCell>Property Damage (PD)</TableCell><TableCell>Other party's vehicle/property</TableCell><TableCell className="font-mono">$25K – $100K</TableCell></TableRow>
                <TableRow><TableCell>Uninsured Motorist (UM)</TableCell><TableCell>You, when the at-fault driver has no insurance</TableCell><TableCell className="font-mono">Matches BI</TableCell></TableRow>
                <TableRow><TableCell>Underinsured Motorist (UIM)</TableCell><TableCell>You, when at-fault limits are exhausted</TableCell><TableCell className="font-mono">Matches BI</TableCell></TableRow>
                <TableRow><TableCell>MedPay</TableCell><TableCell>Your medical bills regardless of fault</TableCell><TableCell className="font-mono">$1K – $25K</TableCell></TableRow>
                <TableRow><TableCell>PIP (no-fault states)</TableCell><TableCell>Medical + lost wages regardless of fault</TableCell><TableCell className="font-mono">$10K – $250K</TableCell></TableRow>
                <TableRow><TableCell>Collision / Comprehensive</TableCell><TableCell>Your vehicle (crash / theft / weather)</TableCell><TableCell className="font-mono">ACV − deductible</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AdSlot slot="mid-content" />

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">How claim-scoring software actually values your file</h2>
          <p>
            The adjuster's "gut number" is really a report from <strong>Colossus</strong> (Allstate, CSAA, many farm bureaus), <strong>ClaimIQ</strong> (Travelers), or <strong>Mitchell Decision Point</strong> (many mid-size carriers). Each system converts inputs — ICD-10 diagnosis codes, CPT treatment codes, treatment duration, provider type, and impairment ratings — into a general-damages multiplier applied to your medical specials.
          </p>
          <p>
            The single biggest lever is <strong>treatment consistency</strong>. A file with 8 weeks of chiropractic + PT and a documented pain scale scores 2–3× higher than the same injuries treated sporadically. The software also weights specialty visits (orthopedist, neurologist) more heavily than primary care, and flags any 30-day treatment gap as "healed."
          </p>
          <p>
            A soft-tissue-only claim with under $2,500 in specials is auto-routed into a <strong>MIST (Minor Impact Soft Tissue)</strong> track that pins offers at 1.0–1.5× specials. Escaping MIST requires imaging (MRI showing herniation or bulge), an EMG/NCV, or specialist documentation.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Carrier-by-carrier tendencies</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>State Farm</strong> — Highest volume; conservative first offers, moves at mediation. Strong UIM benefits.</li>
            <li><strong>GEICO</strong> — Fast on liability decisions, aggressive on soft-tissue MIST tracks. Recorded-statement requests are heavy.</li>
            <li><strong>Progressive</strong> — Uses Snapshot/telematics data even on liability disputes. Litigation-shy on clear-liability cases.</li>
            <li><strong>Allstate</strong> — Originator of Colossus; famously aggressive on multiplier suppression. "Good Hands vs. Boxing Gloves" reputation.</li>
            <li><strong>Liberty Mutual / Nationwide / Farmers</strong> — Mid-market posture; realistic on clear liability, defensive on comparative fault.</li>
            <li><strong>USAA</strong> — Higher first offers to members, but tough negotiators once suit is filed.</li>
            <li><strong>Travelers</strong> — Runs ClaimIQ; disciplined negotiators, strong on commercial and rideshare claims.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-6 mb-3">Policy limits and the Stowers demand</h2>
          <p>
            When damages clearly exceed the at-fault driver's policy limits, a properly framed <strong>policy limits demand</strong> (called a "Stowers demand" in Texas) shifts bad-faith exposure to the carrier. If the insurer refuses a reasonable within-limits offer and a jury later awards more, the carrier can be on the hook for the entire excess verdict — the leverage that unlocks UIM and personal-asset settlements.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Diminished value: the coverage most people miss</h2>
          <p>
            Even a perfectly repaired vehicle loses market value once Carfax reports an accident. Third-party diminished-value claims are recognized in most states; a documented DV appraisal (Edmunds/NADA + independent appraiser) commonly recovers 10–25% of pre-loss value. It's paid separately from your bodily-injury settlement and does not affect the BI negotiation.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Taxes: what's actually taxable?</h2>
          <p>
            Under <strong>IRC § 104(a)(2)</strong>, damages for physical injuries and physical sickness are excluded from gross income — this covers medical bills, pain &amp; suffering tied to physical injury, and most wrongful-death recoveries. Lost wages tied to physical injury are also excluded. What <em>is</em> taxable: punitive damages, interest on the judgment, and emotional-distress damages not stemming from physical injury.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Red flags that mean call a lawyer today</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Adjuster requests a recorded statement or signed medical authorization before you've reached MMI.</li>
            <li>First offer arrives before you've submitted a demand package.</li>
            <li>Liability disputed despite a clear police report.</li>
            <li>Comparative-fault percentage assigned without an interview.</li>
            <li>Commercial vehicle, rideshare (Uber/Lyft), or government-owned vehicle involved.</li>
            <li>Health insurer or hospital sends a subrogation letter.</li>
          </ul>
        </section>

        <section className="my-8">
          <ToolRecommender topic="personal-injury" title="Run your claim through our free calculators" />
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
              <h3 className="font-bold mb-2">Get a case evaluation before you sign a release</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Most personal-injury attorneys offer free consultations and work on contingency (no fee unless you recover). Compare 2–3 firms and negotiate the fee order in writing.
              </p>
              <Button asChild>
                <Link to={localePath("/lawyer-near-me/personal-injury")}>Find an auto-accident lawyer near me</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
