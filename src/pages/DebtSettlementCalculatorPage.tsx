import { Link } from "react-router-dom";
import { ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema, webApplicationSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import DebtSettlementCalculator from "@/components/tools/DebtSettlementCalculator";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/debt-settlement-calculator`;

const FAQS = [
  {
    question: "How long does a debt-settlement program take to finish?",
    answer:
      "Most programs are built around a 24- to 48-month escrow schedule, because the first account cannot be settled until enough cash has accumulated to fund a lump sum. Accounts settled in months 1-12 are usually the smallest balances; the largest creditor is typically settled last, which is also when litigation risk peaks.",
  },
  {
    question: "Do I keep paying the creditor while I save for a settlement?",
    answer:
      "No — and that is the mechanism. Settlement leverage exists only once an account is delinquent and heading for charge-off at 180 days. That is also the source of the credit damage, collection calls and lawsuit exposure, which is why the strategy suits people who are already behind rather than people who are current.",
  },
  {
    question: "How much are debt-settlement company fees?",
    answer:
      "Typically 15% to 25% of the enrolled balance. Under the FTC Telemarketing Sales Rule, 16 CFR § 310.4, a for-profit company that negotiated by phone cannot charge any fee until it has settled at least one account and you have made a payment on that settlement. Advance fees demanded before a settlement is reached are a violation.",
  },
  {
    question: "Can I negotiate directly with the creditor myself?",
    answer:
      "Yes, and it removes the 15% to 25% program fee entirely. Call the pre-charge-off recovery department, ask for the settlement authority on the account, and insist on a written settlement agreement stating the amount, the deadline and that the balance will be reported as settled in full before you send any funds.",
  },
  {
    question: "What should the written settlement letter say?",
    answer:
      "It should identify the account number, state the exact settlement amount and payment date, confirm that payment resolves the account in full, specify the credit-bureau reporting language, and confirm that the creditor will not sell or transfer any remaining balance. Never pay by giving live access to your bank account.",
  },
  {
    question: "Will a settled account still be sold to a debt buyer?",
    answer:
      "It should not be if the agreement says the account is resolved in full, but zombie-debt resale does happen. Keep the settlement letter and proof of payment indefinitely; if a buyer such as Midland, Portfolio Recovery, LVNV or Cavalry later contacts you, the letter plus an FDCPA validation demand ends it.",
  },
  {
    question: "How does settlement compare to a nonprofit debt-management plan?",
    answer:
      "A DMP through an NFCC-affiliated agency keeps you current, pays the balance in full at a reduced interest rate over three to five years, and does far less credit damage. Settlement pays less than the full balance but damages credit and can create taxable forgiven income. DMPs suit people who can afford full repayment at a lower rate; settlement does not.",
  },
  {
    question: "Can I be sued during the program, and what happens if I am?",
    answer:
      "Yes. Discover and Capital One in particular file suit on mid-size balances. Never ignore the summons: answering within the state's deadline preserves defences such as the statute of limitations and lack of standing, and most cases settle after an answer is filed. Ignoring it produces a default judgment, then wage garnishment.",
  },
  {
    question: "What happens to my credit score and for how long?",
    answer:
      "Expect a 100- to 150-point drop for a previously good score, driven mostly by the delinquencies rather than the settlement itself. Charge-offs and settled accounts remain on the report for seven years from the original delinquency date, though the practical impact fades substantially after roughly two years of clean payment history.",
  },
  {
    question: "Do medical and student loan debts work the same way?",
    answer:
      "Medical debt settles at a steep discount and, under current credit-bureau policy, paid medical collections are removed from reports. Federal student loans do not belong in a settlement program at all: income-driven repayment, deferment and forgiveness programs are far better options, and federal loans survive bankruptcy absent an undue-hardship showing.",
  },
  {
    question: "Is a debt-settlement attorney worth the extra cost?",
    answer:
      "When litigation has started or is likely, yes: an attorney can answer the complaint, assert FDCPA and FCRA counterclaims, and negotiate from a stronger position. For a small number of pre-litigation accounts, direct negotiation usually produces the same discount at a fraction of the cost.",
  },
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
            { datePublished: "2026-02-10", dateModified: "2026-08-08", author: "Consumer Finance Editor" },
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

        <AuthorByline authorId="consumer-finance-editor" reviewedAt="2026-08-08" compact className="mb-6" />

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

          <h2 className="text-2xl font-bold mt-6 mb-3">All-in cost comparison: settlement vs. DMP vs. Chapter 7</h2>
          <p>
            The table below models a $40,000 unsecured balance for a filer with modest assets. The settlement
            column assumes a 45% settlement, a 20% program fee, and tax on the forgiven amount at a 22%
            marginal rate with no insolvency exclusion available.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cost component</TableHead>
                <TableHead>Debt settlement</TableHead>
                <TableHead>Debt management plan</TableHead>
                <TableHead>Chapter 7</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Paid to creditors</TableCell><TableCell className="font-mono">$18,000</TableCell><TableCell className="font-mono">$40,000</TableCell><TableCell className="font-mono">$0</TableCell></TableRow>
              <TableRow><TableCell>Program / filing fees</TableCell><TableCell className="font-mono">$8,000</TableCell><TableCell className="font-mono">$1,750</TableCell><TableCell className="font-mono">$338 court + $1,200–$2,500 attorney</TableCell></TableRow>
              <TableRow><TableCell>Tax on forgiven debt</TableCell><TableCell className="font-mono">≈$4,840</TableCell><TableCell className="font-mono">$0</TableCell><TableCell className="font-mono">$0 (§ 108(a)(1)(A))</TableCell></TableRow>
              <TableRow><TableCell>Total out of pocket</TableCell><TableCell className="font-mono font-semibold">≈$30,840</TableCell><TableCell className="font-mono font-semibold">≈$41,750</TableCell><TableCell className="font-mono font-semibold">≈$1,538–$2,838</TableCell></TableRow>
              <TableRow><TableCell>Time to resolution</TableCell><TableCell>24–48 months</TableCell><TableCell>36–60 months</TableCell><TableCell>~4 months</TableCell></TableRow>
              <TableRow><TableCell>Credit report impact</TableCell><TableCell>7 years from first delinquency</TableCell><TableCell>Minimal; accounts stay current</TableCell><TableCell>10 years from filing</TableCell></TableRow>
              <TableRow><TableCell>Lawsuit / garnishment risk</TableCell><TableCell>High during accumulation</TableCell><TableCell>Low</TableCell><TableCell>None after the automatic stay</TableCell></TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground">
            Illustrative model, not a quote. Chapter 7 requires passing the means test and surrendering
            non-exempt assets; settlement leaves accounts exposed to suit until each one is resolved.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3">Where the leverage sits in the collection timeline</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account stage</TableHead>
                <TableHead>Who holds the file</TableHead>
                <TableHead>Realistic discount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Current, hardship request</TableCell><TableCell>Issuer hardship desk</TableCell><TableCell className="font-mono">Rate reduction only, 0% principal</TableCell></TableRow>
              <TableRow><TableCell>30–89 days late</TableCell><TableCell>Internal collections</TableCell><TableCell className="font-mono">0–10%</TableCell></TableRow>
              <TableRow><TableCell>90–179 days late</TableCell><TableCell>Pre-charge-off recovery</TableCell><TableCell className="font-mono">30–50%</TableCell></TableRow>
              <TableRow><TableCell>Charged off, in-house</TableCell><TableCell>Recovery / agency placement</TableCell><TableCell className="font-mono">40–60%</TableCell></TableRow>
              <TableRow><TableCell>Sold to a debt buyer</TableCell><TableCell>Midland, PRA, LVNV, Cavalry</TableCell><TableCell className="font-mono">60–80%</TableCell></TableRow>
              <TableRow><TableCell>Suit filed, pre-judgment</TableCell><TableCell>Collection law firm</TableCell><TableCell className="font-mono">40–60%, often on a payment plan</TableCell></TableRow>
              <TableRow><TableCell>Judgment entered</TableCell><TableCell>Judgment creditor</TableCell><TableCell className="font-mono">0–30%; garnishment leverage flips</TableCell></TableRow>
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

        <RelatedIntentStrip
          cluster="Debt & bankruptcy cluster"
          links={[
            { label: "Chapter 7 vs Chapter 13", href: "/chapter-7-vs-chapter-13", blurb: "Means test, exemptions and timelines." },
            { label: "Bankruptcy vs debt settlement", href: "/bankruptcy-vs-debt-settlement", blurb: "Side-by-side cost and credit impact." },
            { label: "Wage garnishment calculator", href: "/tools/finance/wage-garnishment-calculator", blurb: "What a judgment creditor can take." },
            { label: "Statute of limitations lookup", href: "/tools/consumer/statute-of-limitations-lookup", blurb: "Check whether old debt is time-barred." },
          ]}
        />

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
