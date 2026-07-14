import { Link } from "react-router-dom";
import { ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema, howToSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/long-term-disability-claim-guide`;

const FAQS = [
  {
    question: "What is the difference between short-term and long-term disability?",
    answer:
      "Short-term disability (STD) usually covers 60–70% of wages for 3–6 months after a 1–14 day elimination period. Long-term disability (LTD) picks up after STD ends and can pay to age 65, Social Security Retirement Age, or a defined benefit period — typically 60% of pre-disability earnings, capped at $10,000–$20,000/month.",
  },
  {
    question: "Is my LTD policy governed by ERISA?",
    answer:
      "Almost every employer-sponsored group LTD policy is governed by ERISA (29 U.S.C. § 1001 et seq.). ERISA preempts state law, limits your remedies to plan benefits + attorney fees (no pain and suffering, no punitives), and reviews under an arbitrary-and-capricious standard if the plan grants discretionary authority. Individual (IDI) policies you paid for personally are governed by state contract and bad-faith law — much better for the claimant.",
  },
  {
    question: "What is the 'own occupation' vs 'any occupation' definition?",
    answer:
      "Most group LTD policies pay under 'own occupation' for the first 24 months — meaning you can't perform the material duties of your specific job. After 24 months, the definition switches to 'any occupation' — you must be unable to perform any gainful occupation for which you are reasonably qualified. This 24-month switch is when most claims get terminated.",
  },
  {
    question: "Can Unum, Cigna, MetLife, or Hartford deny my claim?",
    answer:
      "Yes — and they do routinely. Unum (including Provident and Colonial Life), Cigna/New York Life, MetLife, Hartford, Lincoln, Prudential, Reliance Standard, Guardian, Standard, and Mutual of Omaha all use in-house medical reviewers, surveillance, and Functional Capacity Evaluations (FCEs) to build denial files. Unum was the subject of a multi-state regulatory settlement in 2004 for improper denials.",
  },
  {
    question: "Do I need a lawyer for an LTD claim?",
    answer:
      "For an initial claim, sometimes not. For a denied claim, almost always. ERISA requires you to exhaust administrative appeals before you can sue — and the record you build in that appeal is the ONLY evidence a federal court will consider later. Missing a piece of medical evidence in the appeal usually means losing the lawsuit. Most ERISA disability attorneys work on contingency (25–40%).",
  },
  {
    question: "Are LTD benefits taxable?",
    answer:
      "If your employer paid the premiums with pre-tax dollars, benefits are taxable ordinary income under IRC § 105. If you paid premiums with after-tax dollars (or the employer imputed premium as W-2 income), benefits are tax-free under IRC § 104(a)(3). Individual policies you paid privately are always tax-free.",
  },
];

const STEPS = [
  { name: "Read the policy — SPD + full plan document", text: "ERISA § 104(b)(4) requires the plan to provide these within 30 days of a written request. You need both the Summary Plan Description and the full policy to identify the definition of disability, elimination period, offset provisions, mental/nervous limits, and pre-existing condition exclusions." },
  { name: "Document restrictions and limitations with your treating physicians", text: "Insurers care about R&Ls — specific functional restrictions (sitting, standing, lifting, cognition, attendance) — not diagnoses. Ask each treating provider to complete an Attending Physician Statement (APS) and, for musculoskeletal claims, a Functional Capacity Evaluation (FCE)." },
  { name: "File the initial claim with all supporting evidence", text: "Submit the APS, medical records, an Activities of Daily Living questionnaire, an occupational description matching the DOT/O*NET code the insurer will use, and any objective testing (MRI, EMG, neuropsych, cardiopulmonary)." },
  { name: "Comply with the elimination period", text: "The elimination period (usually 90 or 180 days) is the unpaid waiting period. Keep working with providers and documenting symptoms — a gap here becomes an insurer's argument that you weren't continuously disabled." },
  { name: "Respond to the insurer's medical review", text: "Expect an Independent Medical Examination (IME), a Functional Capacity Evaluation (FCE), and possibly surveillance. Request copies of all IME reports before responding." },
  { name: "If denied, file an ERISA appeal within 180 days", text: "ERISA § 503 and 29 CFR § 2560.503-1 require the insurer to give you the full claim file and 180 days to appeal. This appeal is your ONE chance to add evidence — a federal court will not consider anything not in the administrative record." },
  { name: "File suit under 29 U.S.C. § 1132(a)(1)(B) in federal court", text: "After exhausting appeals, you have the plan-specified limitations period (often shortened to 3 years from proof-of-loss) to file. Discovery is essentially nil; the judge reviews the paper record. Attorney fees are recoverable under § 1132(g)." },
];

export default function LongTermDisabilityClaimGuide() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Long-Term Disability Claim Guide: ERISA, Unum, Cigna & MetLife (2026)"
        description="Step-by-step LTD claim guide — ERISA appeals, own vs. any occupation, IME/FCE tactics, and how Unum, Cigna, MetLife, and Hartford build denials. Written for denied claimants."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Long-Term Disability Claim Guide",
            "Complete LTD claim guide covering ERISA appeals, definitions of disability, and insurer denial tactics.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Long-Term Disability Claim Guide", url: URL },
          ]),
          faqSchema(FAQS),
          howToSchema(
            "How to file a long-term disability claim",
            "A 7-step guide to filing an LTD claim under an ERISA group policy or individual disability policy.",
            STEPS,
          ),
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Long-Term Disability Claim Guide</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-3">Long-Term Disability Claim Guide (ERISA + Individual Policies)</h1>
          <p className="text-lg text-muted-foreground">
            LTD claims are decided on paper. The record you build during the initial claim and the ERISA appeal is almost always the only evidence a federal court will ever see. Here's how to build it right — and what Unum, Cigna, MetLife, and Hartford are looking for when they build a denial.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />Save as PDF
            </Button>
          </div>
        </header>

        <InMarketEntityBlock
          category="Long-Term Disability · ERISA"
          intro={
            <>
              <p className="mb-2">
                Long-term disability claims sit at the intersection of ERISA (29 U.S.C. § 1001), the Social Security Act, and state insurance law. Group LTD policies issued through an employer are almost always governed by ERISA, which strips away jury trials, punitive damages, and bad-faith remedies — leaving benefits and attorney fees as the only recovery under 29 U.S.C. § 1132(a)(1)(B).
              </p>
              <p>
                The major carriers — Unum, Cigna/New York Life, MetLife, Hartford, Lincoln Financial, Prudential, Reliance Standard, Guardian, Standard Insurance, and Mutual of Omaha — use in-house medical directors, IME networks, Functional Capacity Evaluations, and surveillance to challenge subjective conditions (fibromyalgia, chronic fatigue, chronic pain, mental/nervous, long-COVID). Understanding the "own occupation" vs. "any occupation" switch at 24 months, mental-nervous 24-month limits, and offset provisions (SSDI, workers' comp, state disability) is the difference between a paid claim and a five-year federal lawsuit.
              </p>
            </>
          }
          entities={[
            "ERISA § 502(a)(1)(B)", "29 U.S.C. § 1132", "29 CFR § 2560.503-1",
            "Summary Plan Description", "Own occupation", "Any occupation",
            "Elimination period", "Attending Physician Statement", "Functional Capacity Evaluation",
            "Independent Medical Examination", "Mental/nervous limitation", "Pre-existing condition exclusion",
            "SSDI offset", "Workers' comp offset", "Firestone deference",
            "Unum", "Cigna / New York Life", "MetLife", "Hartford", "Lincoln Financial",
            "Prudential", "Reliance Standard", "Guardian", "Standard Insurance", "Mutual of Omaha",
            "IRC § 104(a)(3)", "IRC § 105",
          ]}
          relatedTerms={[
            { label: "SSDI back pay estimator", href: localePath("/tools/consumer/ssdi-back-pay-estimator") },
            { label: "SSDI denied — what next", href: localePath("/ssdi-denied-what-next") },
            { label: "Workers' comp settlement calculator", href: localePath("/tools/employment/workers-comp-settlement-calculator") },
            { label: "Find a disability lawyer", href: localePath("/lawyer-near-me/disability") },
          ]}
        />

        <section className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">The 7-step LTD claim timeline</h2>
              <ol className="space-y-4 list-decimal list-inside">
                {STEPS.map((s) => (
                  <li key={s.name}>
                    <span className="font-semibold">{s.name}</span>
                    <p className="text-sm text-muted-foreground mt-1 ml-6">{s.text}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        <AdSlot slot="mid-content" />

        <section className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Major LTD carrier tendencies</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Known tactics</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">Unum (Provident, Colonial Life)</TableCell><TableCell>In-house medical review, aggressive 24-month "any occ" transition denials, extensive surveillance. Subject of 2004 multi-state regulatory settlement.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Cigna / New York Life</TableCell><TableCell>Heavy use of Transferable Skills Analysis (TSA) at the 24-month switch. Denies mental/nervous at the 24-month cap.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">MetLife</TableCell><TableCell>Frequent IMEs, tight FCE reliance, uses vocational reviewers to identify sedentary "any occupation" jobs.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Hartford</TableCell><TableCell>Peer-review physicians rarely examine the claimant. Uses SSDI approval as leverage to demand SSDI offset even before award.</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Lincoln, Prudential, Reliance Standard</TableCell><TableCell>Contract limitations shortened to 3 years from proof-of-loss. Miss the deadline, lose the case.</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">The 24-month "any occupation" trap</h2>
          <p>
            The single biggest cause of LTD terminations is the definition switch at 24 months of paid benefits. During the first 24 months, "disability" means you can't perform your <strong>own occupation</strong>. After 24 months, most policies require you to be unable to perform <strong>any occupation</strong> for which you are reasonably qualified by education, training, or experience, at a defined percentage of pre-disability earnings (typically 60–80%).
          </p>
          <p>
            Two months before the switch, the insurer orders a fresh IME, an FCE, and a vocational Transferable Skills Analysis. If the vocational reviewer identifies even one sedentary occupation (customer service rep, order clerk, surveillance-system monitor) that pays 60% of your prior wage and matches your FCE-documented capacity, the claim terminates. Preparing for the 24-month switch begins at month 18 — not month 23.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">SSDI + LTD: how the offset works</h2>
          <p>
            Every group LTD policy has an "other income" or "offset" clause. When you're approved for SSDI, the LTD carrier reduces the monthly LTD benefit dollar-for-dollar by the primary and dependent SSDI amount. Most policies also require repayment of past overpayments — if SSDI awards 18 months of retroactive benefits, the carrier claws back 18 months of LTD.
          </p>
          <p>
            Because of the offset, the LTD carrier <strong>wants</strong> you to win SSDI, and often refers you to a vendor SSDI representative (Allsup, Advantage 2000, GENEX). You are not required to use them — you can use your own SSDI attorney under a 25%/$7,200 fee cap (see the <Link to={localePath("/tools/consumer/ssdi-back-pay-estimator")} className="text-accent hover:underline">SSDI back-pay estimator</Link>).
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Mental / nervous and self-reported symptom limits</h2>
          <p>
            Nearly every group LTD policy limits benefits for mental/nervous conditions and self-reported symptoms (fibromyalgia, chronic fatigue, chronic pain, long-COVID) to 24 months lifetime unless you are hospitalized. Structuring the claim to identify a physical or objective diagnosis (positive MRI/EMG findings, cardiopulmonary testing, neuropsych testing) can avoid the 24-month cap.
          </p>
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
              <h3 className="font-bold mb-2">Talk to an ERISA disability attorney</h3>
              <p className="text-sm text-muted-foreground mb-3">
                If your LTD claim has been denied or is approaching the 24-month "any occupation" review, the appeal you file is the only record a federal court will ever see. Most ERISA disability attorneys work on contingency and offer free case reviews.
              </p>
              <Button asChild>
                <Link to={localePath("/lawyer-near-me/disability")}>Find a disability lawyer near me</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
