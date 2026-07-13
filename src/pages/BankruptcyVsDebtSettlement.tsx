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
const URL = `${SITE}/bankruptcy-vs-debt-settlement`;

const FAQS = [
  {
    question: "Which is cheaper — bankruptcy or debt settlement?",
    answer:
      "For unsecured debt above ~$15,000, Chapter 7 bankruptcy is usually cheaper. Total cost is typically $1,500–$2,500 in attorney fees plus a $338 filing fee, and the debt is wiped in ~4 months. Settlement on the same $15,000 balance averages $8,000–$10,000 all-in (payoff + 20–25% fees + 1099-C tax) over 24–48 months.",
  },
  {
    question: "Which hurts my credit less?",
    answer:
      "Short-term, both drop FICO scores 100–200 points. Long-term, bankruptcy filers often rebuild faster because the discharged balance reports as $0. Settlement leaves 'settled for less than owed' tradelines that lenders treat almost as harshly. Chapter 13 stays 7 years; Chapter 7 stays 10 years; settled accounts stay 7 years from first delinquency.",
  },
  {
    question: "Can I keep my house and car in bankruptcy?",
    answer:
      "Almost always, if payments are current. Chapter 7 exempts equity up to state or federal limits (federal homestead exemption is $27,900 per filer as of 2024; states like Florida and Texas allow unlimited homestead). Chapter 13 lets you catch up mortgage arrears over 3–5 years and strip wholly-unsecured second mortgages.",
  },
  {
    question: "What debts survive bankruptcy?",
    answer:
      "Non-dischargeable under 11 U.S.C. § 523: most federal student loans (absent Brunner-test hardship), child support, alimony, most recent income taxes, criminal restitution, and debts from fraud or willful injury. Everything else — credit cards, medical bills, personal loans, most old tax debt, deficiency balances — is dischargeable.",
  },
  {
    question: "Do I qualify for Chapter 7?",
    answer:
      "You must pass the § 707(b) means test: household income below the state median automatically qualifies; above the median requires disposable income under ~$9,075 over 5 years. Attorneys use the Trustee's B22A calculation. Filers who fail Chapter 7 can usually still file Chapter 13.",
  },
];

export default function BankruptcyVsDebtSettlement() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Bankruptcy vs. Debt Settlement: Full Cost Comparison (2026)"
        description="Chapter 7 vs. Chapter 13 vs. debt settlement — total cost, credit impact, timeline, and tax exposure compared side-by-side with the means test and 1099-C rules."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Bankruptcy vs. Debt Settlement",
            "Side-by-side comparison of Chapter 7, Chapter 13, and debt settlement — cost, credit impact, timeline, and tax exposure.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Debt Settlement Calculator", url: `${SITE}/debt-settlement-calculator` },
            { name: "Bankruptcy vs. Debt Settlement", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={localePath("/debt-settlement-calculator")} className="hover:text-primary">Debt Settlement</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Bankruptcy vs. Debt Settlement</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-3">Bankruptcy vs. Debt Settlement: The Real Cost Comparison</h1>
          <p className="text-lg text-muted-foreground">
            Chapter 7, Chapter 13, and debt settlement all "get rid of debt" — but the total cost, credit impact, timeline, and tax exposure are wildly different. Here's the honest comparison.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />Save as PDF
            </Button>
          </div>
        </header>

        <InMarketEntityBlock
          category="Consumer Bankruptcy · Debt Relief"
          intro={
            <>
              <p className="mb-2">
                Consumer-debt options are governed by two very different regimes: the U.S. Bankruptcy Code (Title 11) for Chapter 7 liquidation and Chapter 13 reorganization, and the FTC Telemarketing Sales Rule (16 CFR § 310.4) plus state bar rules for private debt settlement. Each path interacts with the FDCPA, FCRA, TCPA, and IRS treatment of cancelled debt (Form 1099-C, IRC § 108) in different ways.
              </p>
              <p>
                Choosing correctly comes down to five variables: total unsecured debt, household income vs. state median (means test), non-exempt assets, whether you've been sued, and whether you qualify for the insolvency exclusion. Get any of those wrong and the "cheaper" option ends up costing twice as much.
              </p>
            </>
          }
          entities={[
            "Chapter 7 bankruptcy", "Chapter 13 bankruptcy", "11 U.S.C. § 707(b) means test",
            "11 U.S.C. § 362 automatic stay", "11 U.S.C. § 523 non-dischargeable debt",
            "Form 1099-C", "Form 982", "IRC § 108(a)(1)(A)", "IRC § 108(a)(1)(B)",
            "Homestead exemption", "Federal exemptions", "State exemptions",
            "FDCPA", "FCRA", "TCPA", "16 CFR § 310.4", "Trustee",
            "341 meeting", "Reaffirmation agreement", "Redemption", "Lien stripping",
          ]}
          relatedTerms={[
            { label: "Debt settlement calculator", href: localePath("/debt-settlement-calculator") },
            { label: "Wage garnishment calculator", href: localePath("/tools/finance/wage-garnishment-calculator") },
            { label: "Debt payoff calculator", href: localePath("/tools/finance/debt-payoff-calculator") },
            { label: "Find a bankruptcy lawyer", href: localePath("/lawyer-near-me/bankruptcy") },
          ]}
        />

        <section className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Side-by-side comparison</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factor</TableHead>
                    <TableHead>Debt Settlement</TableHead>
                    <TableHead>Chapter 7</TableHead>
                    <TableHead>Chapter 13</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>Typical cost on $25K debt</TableCell><TableCell className="font-mono">$13K–$17K</TableCell><TableCell className="font-mono">~$2K</TableCell><TableCell className="font-mono">$3K–$4K + plan</TableCell></TableRow>
                  <TableRow><TableCell>Timeline</TableCell><TableCell>24–48 months</TableCell><TableCell>~4 months</TableCell><TableCell>36–60 months</TableCell></TableRow>
                  <TableRow><TableCell>Stops lawsuits / garnishment?</TableCell><TableCell>No</TableCell><TableCell>Yes (§ 362 stay)</TableCell><TableCell>Yes (§ 362 stay)</TableCell></TableRow>
                  <TableRow><TableCell>Credit report duration</TableCell><TableCell>7 years</TableCell><TableCell>10 years</TableCell><TableCell>7 years</TableCell></TableRow>
                  <TableRow><TableCell>Tax on forgiven debt</TableCell><TableCell>1099-C taxable (unless § 108 insolvent)</TableCell><TableCell>Excluded</TableCell><TableCell>Excluded</TableCell></TableRow>
                  <TableRow><TableCell>Keep house / car?</TableCell><TableCell>Yes</TableCell><TableCell>If within exemptions</TableCell><TableCell>Yes, can cure arrears</TableCell></TableRow>
                  <TableRow><TableCell>Risk of failure</TableCell><TableCell>High — creditors can refuse or sue</TableCell><TableCell>Low if means test passes</TableCell><TableCell>Moderate — 3–5 yr plan compliance</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <AdSlot slot="mid-content" />

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">Chapter 7: liquidation in ~4 months</h2>
          <p>
            Chapter 7 wipes qualifying unsecured debt in ~90–120 days. Filing triggers the <strong>automatic stay</strong> under 11 U.S.C. § 362 — garnishments, lawsuits, and collection calls stop immediately. A trustee reviews your <strong>Schedule A/B</strong> (assets) against state or federal exemptions and liquidates non-exempt property (rare — most filers keep everything). After the <strong>341 meeting</strong> and the 60-day objection window, the court issues a discharge order.
          </p>
          <p>
            Eligibility requires passing the § 707(b) <strong>means test</strong>: household income below the state median automatically qualifies; above the median requires the Form B22A calculation to show insufficient disposable income to fund a Chapter 13 plan. Total cost is generally $1,500–$2,500 in attorney fees plus the $338 filing fee.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Chapter 13: reorganization over 3–5 years</h2>
          <p>
            Chapter 13 is the tool for filers who fail the means test, have non-exempt assets they want to keep, or need to cure mortgage arrears to save a home from foreclosure. Debtors propose a plan paying disposable income to a trustee over 36 or 60 months; unsecured creditors receive whatever's left after priority debts (taxes, support), secured arrears, and administrative expenses. At plan completion, remaining unsecured balances are discharged.
          </p>
          <p>
            Chapter 13 uniquely allows <strong>lien stripping</strong> of wholly-unsecured second mortgages (when the home is worth less than the first mortgage), <strong>cramdown</strong> of car loans older than 910 days to fair market value, and cure of arrears on secured debt through the plan.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Debt settlement: privately negotiated, no court protection</h2>
          <p>
            Settlement is a private negotiation with each creditor — Chase, Discover, Capital One, Amex, Citi, BofA, Synchrony, Wells Fargo, or a debt-buyer like Midland, Portfolio Recovery, LVNV, or Cavalry. Under the FTC Telemarketing Sales Rule (16 CFR § 310.4(a)(5)), a non-attorney debt-relief company cannot collect fees before settling at least one account. Programs typically require accounts to go 90–180 days delinquent so creditors accept discounted lump sums.
          </p>
          <p>
            Two structural risks: creditors are not required to accept anything, and they can sue during the accumulation phase. Forgiven amounts over $600 generate a Form 1099-C, taxable as ordinary income under IRC § 61(a)(11) unless the § 108(a)(1)(B) insolvency exclusion applies.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">When settlement actually makes sense</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Total unsecured debt under ~$15,000.</li>
            <li>You have the cash flow to accumulate lump sums in 12–24 months.</li>
            <li>No lawsuits pending; no garnishment.</li>
            <li>You're insolvent on paper (§ 108 exclusion neutralizes the 1099-C tax).</li>
            <li>Bankruptcy is disqualifying for your career (federal security clearance, some finance/legal roles).</li>
          </ul>
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
              <h3 className="font-bold mb-2">Talk to a bankruptcy attorney before you decide</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Most consumer-bankruptcy attorneys offer free consultations. A one-hour meeting can save 24+ months and thousands of dollars if you're leaning the wrong direction.
              </p>
              <Button asChild>
                <Link to={localePath("/lawyer-near-me/bankruptcy")}>Find a bankruptcy lawyer near me</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
