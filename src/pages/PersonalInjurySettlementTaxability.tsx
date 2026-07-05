import { Link } from "react-router-dom";
import { ChevronRight, Printer, FileText, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import ToolRecommender from "@/components/tools/ToolRecommender";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/personal-injury-settlements/taxability`;

const FAQS = [
  {
    question: "Are personal injury settlements taxable by the IRS?",
    answer:
      "The compensatory portion tied to physical injury or physical sickness is excluded from federal gross income under IRC § 104(a)(2). This includes medical bills, pain and suffering caused by the injury, and lost wages tied to the injury. Punitive damages, pre/post-judgment interest, and pure emotional-distress claims are taxable as ordinary income.",
  },
  {
    question: "Do I owe federal tax on the medical portion of my settlement?",
    answer:
      "No — unless you already deducted those medical expenses on a prior year's return. Under the 'tax benefit rule' (IRC § 111), any portion you previously deducted must be included in income the year you receive the reimbursement.",
  },
  {
    question: "Are pain and suffering damages taxable?",
    answer:
      "Not if they stem from a physical injury or physical sickness. Pain and suffering awarded in cases of pure emotional distress — for example, employment discrimination without physical injury, defamation, or invasion of privacy — is fully taxable.",
  },
  {
    question: "Are punitive damages taxable?",
    answer:
      "Yes, always. Punitive damages are taxable as ordinary income even in physical-injury cases (see O'Gilvie v. United States, 519 U.S. 79). Insist the settlement agreement allocate compensatory vs punitive amounts in writing — otherwise the IRS may treat more of the total as punitive.",
  },
  {
    question: "Is pre-judgment or post-judgment interest taxable?",
    answer:
      "Yes. Interest is always taxable as ordinary income and reported on Form 1099-INT, even when the underlying settlement is tax-free.",
  },
  {
    question: "Are lost wages in a personal injury settlement taxable?",
    answer:
      "In a personal injury case, lost wages tied to the physical injury are tax-free under IRC § 104(a)(2). In an employment case without physical injury (e.g., wrongful termination), lost wages are taxed as W-2 wages and subject to payroll tax.",
  },
  {
    question: "How are structured settlements taxed?",
    answer:
      "Periodic payments from a structured settlement retain the tax treatment of the underlying claim. The physical-injury portion stays tax-free — including the imputed interest built into future payments (IRC § 104(a)(2) plus § 130). Selling or factoring a structured settlement can trigger tax consequences; get specialized advice first.",
  },
  {
    question: "What about attorney fees — am I taxed on the lawyer's share?",
    answer:
      "In a tax-free personal injury settlement the fee doesn't matter for federal tax — the whole recovery is excluded. In taxable settlements you're generally taxed on the gross amount and can only deduct legal fees in narrow circumstances (IRC § 62(a)(20) covers most discrimination and whistleblower cases as above-the-line deductions).",
  },
  {
    question: "Do I have to report a tax-free settlement on my return?",
    answer:
      "Not on the federal return — but keep the settlement agreement, IRS Publication 4345, and a fee ledger for at least 7 years. States mostly follow the federal treatment; a handful (e.g., punitive damages in Alabama) diverge. Check your state's rules or ask a CPA.",
  },
  {
    question: "What if the defendant sends me a 1099 for a tax-free settlement?",
    answer:
      "It happens. Report the 1099 amount on Schedule 1 Line 8z ('other income') and then back it out on Line 24z as 'IRC § 104(a)(2) exclusion.' Attach a copy of the settlement agreement showing the physical-injury allocation.",
  },
];

const TAXABLE = [
  { label: "Punitive damages", note: "Always taxable — even in physical-injury cases." },
  { label: "Pre-judgment and post-judgment interest", note: "Reported on 1099-INT." },
  { label: "Emotional-distress damages without physical injury", note: "e.g., pure defamation, harassment without injury." },
  { label: "Employment back pay / front pay", note: "Taxed as W-2 wages plus payroll tax." },
  { label: "Previously deducted medical expenses", note: "Tax-benefit rule under IRC § 111." },
];

const TAX_FREE = [
  { label: "Medical bills for physical injury", note: "As long as you didn't previously deduct them." },
  { label: "Pain and suffering from physical injury", note: "Fully excluded under IRC § 104(a)(2)." },
  { label: "Lost wages tied to physical injury", note: "Different from wage-only employment claims." },
  { label: "Wrongful death compensatory damages", note: "Federal exclusion; state may vary." },
  { label: "Workers' comp payments", note: "Fully exempt under IRC § 104(a)(1)." },
  { label: "Structured settlement periodic payments", note: "Including imputed interest under § 130." },
];

const CHECKLIST = [
  "Get the settlement agreement in writing with a clear allocation between compensatory (physical injury), punitive, interest, and wage components.",
  "Keep a copy of IRS Publication 4345 ('Settlements — Taxability') with your tax records.",
  "Track any prior-year medical deductions related to the injury — these become taxable under the tax-benefit rule.",
  "Ask your attorney whether IRC § 62(a)(20) applies (discrimination, whistleblower, civil rights — above-the-line fee deduction).",
  "Request Form W-9 documentation from defense counsel to control how 1099s are issued.",
  "If you receive a 1099 for a tax-free amount, report and back-out on Schedule 1 with a written explanation.",
  "Confirm your state's treatment separately — Alabama, New Jersey, and a few others deviate from federal rules on punitive or interest components.",
  "Consult a CPA before signing any settlement above ~$50,000 — allocation choices are locked once you sign.",
];

export default function PersonalInjurySettlementTaxability() {
  const lp = useLocalizedPath();

  return (
    <div className="container py-8 max-w-4xl">
      <Tier3Head
        title="Are Personal Injury Settlements Taxable? IRS Rules Explained (2026)"
        description="Complete guide to personal injury settlement taxes: IRC § 104(a)(2), physical-injury exclusion, punitive damages, interest, structured settlements, 1099 handling, and a printable tax checklist."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Are Personal Injury Settlements Taxable? IRS Rules Explained",
            "Full guide to federal and state taxation of personal injury settlements, including punitive damages, interest, structured settlements, and 1099 handling.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Personal Injury Settlements", url: `${SITE}/personal-injury-settlements` },
            { name: "Taxability", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp("/personal-injury-settlements")} className="hover:text-foreground">Personal Injury Settlements</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Taxability</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          Are Personal Injury Settlements Taxable? A Plain-English IRS Guide
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Short answer: the compensatory portion for physical injury or physical sickness is <strong>federal-income-tax-free</strong> under IRC § 104(a)(2). Punitive damages, interest, and non-injury emotional-distress damages are <strong>taxable</strong>. Below: exactly what's taxed, what isn't, how to handle a 1099, and a printable pre-signing checklist.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button size="sm" variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" /> Save this guide as PDF
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={lp("/personal-injury-settlements")}>Open Settlement Calculator</Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={lp("/lawyer-near-me/personal-injury")}>Find a Personal Injury Lawyer</Link>
        </Button>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-10 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-4">
            <p className="flex items-center gap-2 font-bold text-emerald-700 mb-2">
              <CheckCircle2 className="h-5 w-5" /> Tax-Free
            </p>
            <ul className="space-y-2 text-sm">
              {TAX_FREE.map((r) => (
                <li key={r.label}>
                  <span className="font-medium text-foreground">{r.label}</span>
                  <span className="block text-xs text-muted-foreground">{r.note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="flex items-center gap-2 font-bold text-destructive mb-2">
              <XCircle className="h-5 w-5" /> Taxable
            </p>
            <ul className="space-y-2 text-sm">
              {TAXABLE.map((r) => (
                <li key={r.label}>
                  <span className="font-medium text-foreground">{r.label}</span>
                  <span className="block text-xs text-muted-foreground">{r.note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">The One Rule That Controls Everything: IRC § 104(a)(2)</h2>
        <p className="text-muted-foreground mb-3">
          Federal tax law excludes from gross income "the amount of any damages (other than punitive damages) received... on account of personal physical injuries or physical sickness." The Supreme Court in <em>Commissioner v. Schleier</em> (515 U.S. 323) added two tests: the underlying claim must be tort-based, and the damages must flow from a <strong>physical</strong> injury. Emotional distress alone doesn't qualify — a physical injury must anchor the claim.
        </p>
        <p className="text-muted-foreground">
          Practical consequence: the settlement <strong>agreement's allocation language</strong> drives the tax outcome. A settlement labeled entirely "personal injury damages" is treated far more favorably than one that lumps punitive, interest, and compensatory into a single number.
        </p>
      </section>

      <section className="mb-10 rounded-lg border bg-muted/30 p-5">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-accent" /> Pre-Signing Tax Checklist
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
          {CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <Button size="sm" variant="outline" className="mt-4" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" /> Print / Save as PDF
        </Button>
      </section>

      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Full FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`tx-${i}`}>
              <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mb-10 rounded-lg border border-amber-500/40 bg-amber-500/5 p-5">
        <p className="flex items-center gap-2 font-bold text-amber-700 mb-2">
          <AlertTriangle className="h-5 w-5" /> One-line warning
        </p>
        <p className="text-sm text-muted-foreground">
          Once you sign, you can't renegotiate the allocation. If any part of the payment could be structured as compensatory-physical-injury, make sure the agreement says so — in writing — before the deal closes.
        </p>
      </section>

      <ToolRecommender topic="personal-injury" />

      <AdSlot slot="end-of-article" className="mb-8" />

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> Educational overview only, not tax or legal advice. Federal rules are current as of 2026 but change; state treatment varies. Consult a CPA and your attorney before signing a settlement or filing a return that includes settlement proceeds.
        </p>
      </div>
    </div>
  );
}
