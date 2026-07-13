import { Link } from "react-router-dom";
import { ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema, webApplicationSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import DebtSettlementCalculator from "@/components/tools/DebtSettlementCalculator";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/debt-settlement-calculator`;

const FAQS = [
  {
    question: "How much does debt settlement typically save?",
    answer:
      "Industry data (National Association of Consumer Advocates, CFPB) shows creditors accept 40–60% of the balance on old, charged-off unsecured debt. After 20–25% program fees and taxes on the forgiven portion (Form 1099-C), most consumers net 20–40% savings versus paying in full — smaller than advertised, but larger than doing nothing.",
  },
  {
    question: "Is forgiven debt taxable?",
    answer:
      "Yes. Under IRC § 61(a)(11), cancelled debt over $600 is reported on Form 1099-C and taxed as ordinary income. IRC § 108(a)(1)(B) excludes it if you were insolvent (liabilities > assets) on the day before settlement — file Form 982 with your return. Chapter 7 or 13 bankruptcy discharge is separately excluded under § 108(a)(1)(A).",
  },
  {
    question: "How badly does debt settlement hurt my credit?",
    answer:
      "Settlement requires accounts to become 90–180 days delinquent, then reports as 'settled for less than owed.' FICO scores typically drop 100–150 points and the settled tradeline stays 7 years from first delinquency. Bankruptcy is 7 (Ch. 13) or 10 (Ch. 7) years but usually rebuilds faster because the balance is zero.",
  },
  {
    question: "Can creditors sue while I'm in a settlement program?",
    answer:
      "Yes. Debt-settlement companies do not stop lawsuits. Chase, Discover, Capital One, American Express, Citibank, and buyers like Midland Credit Management, Portfolio Recovery Associates, and LVNV Funding routinely file suit on accounts over $3,000 during the accumulation phase. Only bankruptcy triggers an automatic stay (11 U.S.C. § 362) that halts collections.",
  },
  {
    question: "Which debts can be settled?",
    answer:
      "Unsecured consumer debt: credit cards, personal loans, medical bills, some private student loans, deficiency balances after repossession. Not settleable: federal student loans (use IDR / PSLF / discharge programs), child support, most tax debt, secured debt where the collateral still exists, and recent debts (creditors want charge-off aging first).",
  },
  {
    question: "How is a debt-settlement attorney different from a debt-relief company?",
    answer:
      "The FTC Telemarketing Sales Rule (16 CFR § 310.4(a)(5)) bans non-attorney debt-relief companies from collecting fees before settling at least one account. Attorney-model programs collect legal fees under state bar rules. Attorneys can also appear in court if a creditor sues — non-attorney companies cannot.",
  },
];

export default function DebtSettlementCalculatorPage() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Debt Settlement Calculator: Payoff, 1099-C Tax & Fees (2026)"
        description="Free debt settlement calculator estimates lump-sum payoff, program fees, and taxes on forgiven debt (Form 1099-C, IRC § 108 insolvency). Compare vs. bankruptcy."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Debt Settlement Calculator",
            "Estimate lump-sum settlement payoff, program fees, and tax on cancelled debt after applying the IRC § 108 insolvency exclusion.",
            URL,
          ),
          webApplicationSchema(
            "Debt Settlement Calculator",
            "Free calculator for lump-sum debt settlement payoff, program fees, and 1099-C tax exposure.",
            URL,
            ["US"],
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Tools", url: `${SITE}/tools` },
            { name: "Debt Settlement Calculator", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to={localePath("/")} className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={localePath("/tools")} className="hover:text-primary">Tools</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Debt Settlement Calculator</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-3">Debt Settlement Calculator: What You'll Actually Pay</h1>
          <p className="text-lg text-muted-foreground">
            Estimate the lump-sum payoff, program fees, and 1099-C tax exposure on forgiven debt — then compare against Chapter 7 and Chapter 13 bankruptcy.
          </p>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />Save as PDF
            </Button>
          </div>
        </header>

        <InMarketEntityBlock
          category="Debt Relief · Consumer Bankruptcy"
          intro={
            <>
              <p className="mb-2">
                Debt-settlement outcomes are driven by a small set of creditors and debt-buyers: Chase, Discover, Capital One, American Express, Citibank, Bank of America, Synchrony, and Wells Fargo on the originator side, and Midland Credit Management, Portfolio Recovery Associates, LVNV Funding, and Cavalry SPV on the buyer side. Each has documented settlement authority ranges — American Express rarely takes below 55%, while charged-off Discover and Synchrony accounts often settle at 30–40%.
              </p>
              <p>
                The number that matters isn't the settlement percentage — it's the all-in cost after 15–25% program fees, taxes on the 1099-C forgiven balance (IRC § 61(a)(11)), and the FICO impact. When the insolvency exclusion under IRC § 108(a)(1)(B) applies, or when unsecured debt exceeds ~40% of annual income, Chapter 7 bankruptcy is usually cheaper.
              </p>
            </>
          }
          entities={[
            "Chase", "Discover", "Capital One", "American Express", "Citibank", "Bank of America", "Synchrony",
            "Wells Fargo", "Midland Credit Management", "Portfolio Recovery Associates", "LVNV Funding",
            "Cavalry SPV", "Form 1099-C", "Form 982", "IRC § 61(a)(11)", "IRC § 108(a)(1)(B)",
            "Chapter 7 bankruptcy", "Chapter 13 bankruptcy", "Automatic stay (11 U.S.C. § 362)",
            "FDCPA", "TCPA", "FCRA", "Means test", "Charge-off", "Statute of limitations on debt",
            "FTC Telemarketing Sales Rule", "16 CFR § 310.4",
          ]}
          relatedTerms={[
            { label: "Bankruptcy vs. debt settlement", href: localePath("/bankruptcy-vs-debt-settlement") },
            { label: "Wage garnishment calculator", href: localePath("/tools/finance/wage-garnishment-calculator") },
            { label: "Debt payoff calculator", href: localePath("/tools/finance/debt-payoff-calculator") },
            { label: "Find a bankruptcy lawyer", href: localePath("/lawyer-near-me/bankruptcy") },
          ]}
        />

        <section className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <DebtSettlementCalculator />
            </CardContent>
          </Card>
        </section>

        <AdSlot slot="mid-content" />

        <section className="prose prose-sm max-w-none my-8">
          <h2 className="text-2xl font-bold mt-6 mb-3">How creditors decide whether to settle</h2>
          <p>
            Original creditors (Chase, Discover, Capital One, Amex, Citi, BofA, Synchrony, Wells Fargo) operate on internal <strong>charge-off schedules</strong>: at 180 days of nonpayment (Regulation Z, 12 CFR § 1026.7), the account is written off as a loss and either kept in-house recovery or sold. Once sold to a debt-buyer, the balance was purchased for 4–8 cents on the dollar — which is why buyers like Midland, Portfolio Recovery, LVNV, and Cavalry will accept 20–40% settlements that originators refuse.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Typical settlement authority by creditor</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Creditor / Buyer</TableHead>
                <TableHead>Common settlement range</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>American Express</TableCell><TableCell className="font-mono">55–75%</TableCell><TableCell>Rarely settles below 50%; closes account for life.</TableCell></TableRow>
              <TableRow><TableCell>Chase</TableCell><TableCell className="font-mono">40–60%</TableCell><TableCell>Sells to buyers quickly; better terms post-sale.</TableCell></TableRow>
              <TableRow><TableCell>Discover</TableCell><TableCell className="font-mono">40–55%</TableCell><TableCell>Aggressive litigator; sues on balances $3K+.</TableCell></TableRow>
              <TableRow><TableCell>Capital One</TableCell><TableCell className="font-mono">35–50%</TableCell><TableCell>Uses internal recovery long before selling.</TableCell></TableRow>
              <TableRow><TableCell>Citibank</TableCell><TableCell className="font-mono">40–55%</TableCell><TableCell>Willing to structure 3–12 month payment plans.</TableCell></TableRow>
              <TableRow><TableCell>Synchrony</TableCell><TableCell className="font-mono">30–45%</TableCell><TableCell>Store-card debt often the easiest to settle.</TableCell></TableRow>
              <TableRow><TableCell>Midland / Portfolio Recovery / LVNV</TableCell><TableCell className="font-mono">20–40%</TableCell><TableCell>Debt-buyers; verify chain of title (FDCPA § 809).</TableCell></TableRow>
            </TableBody>
          </Table>

          <h2 className="text-2xl font-bold mt-6 mb-3">The 1099-C tax trap</h2>
          <p>
            Any forgiven balance over $600 triggers a Form 1099-C from the creditor. That amount is taxable as ordinary income under <strong>IRC § 61(a)(11)</strong> unless an exclusion applies. The most common is the <strong>insolvency exclusion</strong>, IRC § 108(a)(1)(B): if your total liabilities exceeded your total assets on the day before the debt was cancelled, you can exclude cancelled debt up to the amount of insolvency by filing Form 982 with your return. Discharge in bankruptcy is separately excluded under § 108(a)(1)(A) and never generates a 1099-C tax.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Statute of limitations on old debt</h2>
          <p>
            Every state limits how long a creditor can sue on written contracts and credit-card debt — most commonly 3–6 years, though some states run to 10. Once expired, the debt is "time-barred" but not extinguished; making any payment or written acknowledgement can reset the clock in many states. Debt-buyers frequently sue on time-barred accounts hoping for a default judgment; showing up with an FDCPA § 809 validation demand and a SOL affirmative defense usually ends the case.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">When bankruptcy beats settlement</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Unsecured debt exceeds ~40% of your annual gross income.</li>
            <li>A creditor has already sued or garnished wages.</li>
            <li>You have non-exempt assets you're not willing to liquidate through settlement failure.</li>
            <li>You do not qualify for the § 108 insolvency exclusion (tax bill would consume the savings).</li>
            <li>You need immediate relief — the automatic stay (11 U.S.C. § 362) is instant.</li>
          </ul>
          <p>
            Chapter 7 wipes qualifying unsecured debt in ~4 months for filers who pass the means test (11 U.S.C. § 707(b)). Chapter 13 restructures debt over 3–5 years and is often used to save a home from foreclosure. Compare both against your settlement scenario using the calculator above.
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
              <h3 className="font-bold mb-2">Not sure which path is right?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Compare debt settlement, Chapter 7, and Chapter 13 side-by-side before you commit — the wrong choice can cost 2–3× more over the next 24 months.
              </p>
              <Button asChild>
                <Link to={localePath("/bankruptcy-vs-debt-settlement")}>Bankruptcy vs. debt settlement →</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
