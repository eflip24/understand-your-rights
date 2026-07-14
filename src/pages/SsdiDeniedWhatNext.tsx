import { Link } from "react-router-dom";
import { ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/ssdi-denied-what-next`;

const FAQS = [
  {
    question: "How long do I have to appeal an SSDI denial?",
    answer:
      "60 days from the date you receive the denial notice (SSA presumes you received it 5 days after the date on the letter, so effectively 65 days). Missing the deadline forces you to start a whole new application and lose any back-pay accrued from your original onset date.",
  },
  {
    question: "What are the four levels of SSDI appeal?",
    answer:
      "1) Reconsideration — a fresh reviewer at the state Disability Determination Services (DDS). 2) Hearing before an Administrative Law Judge (ALJ) — the highest approval level, currently 50–55% nationwide. 3) Appeals Council review in Falls Church, VA. 4) Federal district court under 42 U.S.C. § 405(g). Most winning claims are won at the ALJ hearing.",
  },
  {
    question: "Why did SSA deny my claim?",
    answer:
      "The most common denial reasons are: (1) 'not disabled' under the 5-step sequential evaluation of 20 CFR § 404.1520 — meaning SSA found you can still perform past relevant work or other work in the national economy; (2) insufficient medical evidence; (3) failure to follow prescribed treatment; (4) working over Substantial Gainful Activity ($1,620/month non-blind, $2,700/month blind in 2025); or (5) failure to attend a consultative exam.",
  },
  {
    question: "How much does an SSDI appeal lawyer cost?",
    answer:
      "SSA caps disability representative fees at 25% of back pay OR $7,200, whichever is less (raised from $6,000 in 2022). Fees are contingent — you pay nothing if you lose — and are deducted directly from back pay by SSA. Out-of-pocket costs (medical record copies, expert reports) are usually $100–$400.",
  },
  {
    question: "Can I work part-time while appealing?",
    answer:
      "Yes, but earnings must stay below Substantial Gainful Activity ($1,620/month in 2025 for non-blind, $2,700/month for blind). Earning over SGA is per se non-disability under 20 CFR § 404.1571. Trial Work Period rules only apply after you're approved.",
  },
  {
    question: "What's the difference between SSDI and SSI?",
    answer:
      "SSDI (Title II) requires enough work credits (typically 20 credits in the last 10 years). SSI (Title XVI) is needs-based with an asset limit of $2,000 individual / $3,000 couple. Many claimants file 'concurrent' claims — SSI covers the 5-month SSDI waiting period and the 24-month Medicare wait.",
  },
];

export default function SsdiDeniedWhatNext() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="SSDI Denied? Here's What to Do Next (2026 Appeal Guide)"
        description="Step-by-step SSDI denial appeal guide — reconsideration, ALJ hearing, Appeals Council, and federal court. Includes deadlines, back pay math, and the 5-step sequential evaluation."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "SSDI Denied — What to Do Next",
            "Complete guide to appealing an SSDI denial through reconsideration, ALJ hearing, Appeals Council, and federal court.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "SSDI Denied — What Next", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span>SSDI Denied — What Next</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-3">SSDI Denied? Here's Exactly What to Do Next</h1>
          <p className="text-lg text-muted-foreground">
            About 65% of initial SSDI applications are denied. That's not the end — it's the start of the appeal process, and appeals win at meaningfully higher rates than initial claims. Here's how the four levels work, the deadlines you cannot miss, and what to do if your long-term disability carrier is also involved.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />Save as PDF
            </Button>
          </div>
        </header>

        <InMarketEntityBlock
          category="Social Security Disability · Federal Benefits"
          intro={
            <>
              <p className="mb-2">
                SSDI claims are decided under the Social Security Act (42 U.S.C. § 423) and the 5-step sequential evaluation of 20 CFR § 404.1520. Denials fall into two categories: technical (insufficient work credits, income over SGA, failure to cooperate) and medical (SSA concludes you can perform past work or other work in the national economy). Technical denials require a different fix than medical denials — usually documenting more work quarters or resolving the SGA earnings problem.
              </p>
              <p>
                The appeal ladder runs through DDS Reconsideration, an ALJ hearing at the Office of Hearings Operations (OHO), the Appeals Council in Falls Church, VA, and finally federal district court under 42 U.S.C. § 405(g). ALJ hearings currently approve 50–55% of claimants nationwide — dramatically higher than the ~30% initial approval rate. Attorney fees are capped at 25% of back pay or $7,200 by 42 U.S.C. § 406.
              </p>
            </>
          }
          entities={[
            "42 U.S.C. § 423", "42 U.S.C. § 405(g)", "42 U.S.C. § 406", "20 CFR § 404.1520",
            "5-step sequential evaluation", "Substantial Gainful Activity", "Residual Functional Capacity",
            "Grid rules", "Medical-Vocational Guidelines", "Listing of Impairments (Blue Book)",
            "Disability Determination Services", "Administrative Law Judge",
            "Office of Hearings Operations", "Appeals Council", "Vocational Expert",
            "Medical Expert", "Consultative Examination",
            "Trial Work Period", "Ticket to Work", "Extended Period of Eligibility",
            "Concurrent SSI claim", "Established Onset Date", "Date Last Insured",
          ]}
          relatedTerms={[
            { label: "SSDI back pay estimator", href: localePath("/tools/consumer/ssdi-back-pay-estimator") },
            { label: "Long-term disability claim guide", href: localePath("/long-term-disability-claim-guide") },
            { label: "Workers' comp settlement calculator", href: localePath("/tools/employment/workers-comp-settlement-calculator") },
            { label: "Find a disability lawyer", href: localePath("/lawyer-near-me/disability") },
          ]}
        />

        <section className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">The four levels of SSDI appeal</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Approval rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">Reconsideration (DDS)</TableCell><TableCell>60 days</TableCell><TableCell>3–6 months</TableCell><TableCell>~13–15%</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">ALJ hearing (OHO)</TableCell><TableCell>60 days from recon denial</TableCell><TableCell>9–18 months wait</TableCell><TableCell>50–55%</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Appeals Council</TableCell><TableCell>60 days from ALJ denial</TableCell><TableCell>12–18 months</TableCell><TableCell>~2% reversal, ~11% remand</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Federal district court (§ 405(g))</TableCell><TableCell>60 days from AC decision</TableCell><TableCell>12–24 months</TableCell><TableCell>~50% remand</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <AdSlot slot="mid-content" />

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">The 5-step sequential evaluation — where you actually lost</h2>
          <p>SSA denials are almost always based on one of the five steps in 20 CFR § 404.1520:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li><strong>Step 1 — SGA:</strong> Are you working above Substantial Gainful Activity? If yes, denied.</li>
            <li><strong>Step 2 — Severe impairment:</strong> Do you have a medically determinable impairment that significantly limits basic work activities for 12+ months?</li>
            <li><strong>Step 3 — Listing:</strong> Does your condition meet or equal a Listing of Impairments (the "Blue Book")? If yes, approved without further analysis.</li>
            <li><strong>Step 4 — Past relevant work:</strong> Given your Residual Functional Capacity (RFC), can you perform any past relevant work from the last 15 years? Most denials happen here.</li>
            <li><strong>Step 5 — Other work:</strong> Can you perform any other work in the national economy given your age, education, work experience, and RFC? The Grid Rules (Medical-Vocational Guidelines) direct a "disabled" finding for older claimants with limited education and unskilled work histories.</li>
          </ol>

          <h2 className="text-2xl font-bold mt-6 mb-3">Winning at the ALJ hearing</h2>
          <p>
            The ALJ hearing is where most successful claims win. Preparation is everything: an updated RFC form from each treating physician mapping specific limitations onto the 8-hour workday, cross-examination of the Vocational Expert on DOT/O*NET codes and Skilled/Semi-Skilled/Unskilled classifications, and identifying Grid Rule combinations that direct a finding of disability. Attorneys typically prepare a written pre-hearing brief citing specific medical evidence to the applicable listing or Grid Rule.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Coordination with long-term disability (LTD)</h2>
          <p>
            If you have both an SSDI claim and an ERISA-governed LTD claim with Unum, Cigna, MetLife, Hartford, Prudential, or Lincoln, coordinate carefully. SSDI approval retroactively creates an LTD offset — the carrier claws back back pay dollar-for-dollar. Never sign a carrier's "SSDI advance" reimbursement agreement without reviewing the terms; some create personal liability that survives even if LTD later denies. See the <Link to={localePath("/long-term-disability-claim-guide")} className="text-accent hover:underline">long-term disability claim guide</Link> for the offset mechanics.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Back pay math after approval</h2>
          <p>
            Once approved, back pay runs from the later of (a) your Established Onset Date + 5-month waiting period or (b) 12 months before your application date. If you filed 24 months ago with an onset 30 months ago, back pay = ~19 months × your Primary Insurance Amount. Estimate yours with the <Link to={localePath("/tools/consumer/ssdi-back-pay-estimator")} className="text-accent hover:underline">SSDI back-pay estimator</Link>.
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
              <h3 className="font-bold mb-2">Talk to a disability attorney before your deadline runs</h3>
              <p className="text-sm text-muted-foreground mb-3">
                SSDI attorneys work on contingency (25% of back pay, capped at $7,200) and offer free case reviews. The 60-day deadline to appeal is jurisdictional — miss it and you lose your original onset date and years of potential back pay.
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
