import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const URL = `${SITE}/mesothelioma-settlement-guide`;

const FAQS = [
  {
    question: "What is the average mesothelioma settlement amount?",
    answer:
      "Historical data from the RAND Institute and published verdicts put average mesothelioma settlements at roughly $1 million to $1.4 million, with trial verdicts averaging $2.4 million. Pleural mesothelioma cases with clear occupational exposure and living plaintiffs generally settle at the high end; peritoneal mesothelioma and wrongful-death claims vary more widely.",
  },
  {
    question: "How long does a mesothelioma lawsuit take?",
    answer:
      "Because mesothelioma is terminal, most jurisdictions grant an expedited trial preference (e.g., California CCP § 36) that moves cases to trial within 120 days of filing. Settlements often close in 6–18 months. Asbestos trust fund claims (separate from lawsuits) typically pay in 90 days to 12 months.",
  },
  {
    question: "Can I file if the exposed family member has died?",
    answer:
      "Yes. The estate or eligible survivors can file a wrongful-death or survival action. Filing deadlines run from the date of death (typically 1–3 years) — not the date of diagnosis — in most states.",
  },
  {
    question: "What is the asbestos trust fund system?",
    answer:
      "Bankrupt asbestos defendants (Johns Manville, Owens Corning, W.R. Grace, Babcock & Wilcox, and 60+ others) fund § 524(g) trusts under the Bankruptcy Code. Combined trust assets exceed $30 billion. Claims are paid at a fixed 'payment percentage' (often 5–45% of scheduled value) and can run in parallel with lawsuits against solvent defendants.",
  },
  {
    question: "Are mesothelioma settlements taxable?",
    answer:
      "Compensatory damages for physical illness are federal-tax-free under IRC § 104(a)(2). Punitive damages and any interest on the award are taxable ordinary income. Trust-fund payments follow the same rule.",
  },
  {
    question: "Do veterans get extra compensation?",
    answer:
      "Yes. About 30% of all mesothelioma diagnoses are U.S. veterans (Navy shipyard, engine room, and boiler exposure). VA disability at the 100% schedular rate for mesothelioma pays over $3,800/month, plus DIC benefits for surviving spouses. VA benefits are separate from — and do not offset — asbestos lawsuit or trust recoveries.",
  },
  {
    question: "How much do mesothelioma lawyers charge?",
    answer:
      "Contingency fees of 33.33%–40% are standard, plus case costs (expert witnesses, exposure reconstruction, medical illustrators). Because mesothelioma cases require product-identification investigators and industrial-hygiene experts, expenses often run $50,000–$250,000 — all fronted by the firm.",
  },
];

const TRUST_FUNDS = [
  { trust: "Johns Manville Trust", est: "$2.5B", pct: "5.1%", notes: "Largest and oldest asbestos trust (1988)" },
  { trust: "Owens Corning / Fibreboard", est: "$5.0B", pct: "12.4%", notes: "Combined post-bankruptcy trust" },
  { trust: "W.R. Grace Trust", est: "$3.0B", pct: "31%", notes: "Zonolite/Libby vermiculite" },
  { trust: "Babcock & Wilcox", est: "$1.85B", pct: "10.35%", notes: "Boiler and power-plant exposure" },
  { trust: "Halliburton / DII Industries", est: "$4.3B", pct: "40%", notes: "One of the higher-paying trusts" },
  { trust: "U.S. Gypsum Asbestos PI Trust", est: "$3.9B", pct: "20%", notes: "Joint compound, ceiling products" },
  { trust: "Combustion Engineering 524(g)", est: "$1.4B", pct: "26%", notes: "Industrial boilers" },
  { trust: "Federal-Mogul / T&N", est: "$1.1B", pct: "17.5%", notes: "Automotive gaskets, brake linings" },
];

const TIMELINE = [
  { step: "1. Diagnosis & records", detail: "Pathology confirms mesothelioma (pleural, peritoneal, or pericardial). Attorney collects biopsy, imaging, treatment records." },
  { step: "2. Exposure history", detail: "Investigators reconstruct job sites, products, and dates using union records, SSA earnings history, and product-ID depositions." },
  { step: "3. Filing (expedited)", detail: "Complaint filed in a plaintiff-friendly venue with trial-preference motion. Discovery begins immediately." },
  { step: "4. Plaintiff deposition", detail: "Preserved-testimony deposition — critical because of terminal prognosis. Videotaped and admissible at trial." },
  { step: "5. Settlement negotiations", detail: "Solvent defendants settle in tiers throughout discovery. Trust claims are filed in parallel." },
  { step: "6. Trial or global settlement", detail: "Remaining defendants either settle before trial or proceed to jury. Trial verdicts average $2.4M." },
  { step: "7. Payout & liens", detail: "Medicare/Medicaid, VA, and health-plan liens are negotiated. IRC § 104(a)(2) compensatory portion is tax-free." },
];

export default function MesotheliomaSettlementGuide() {
  const localePath = useLocalizedPath();

  return (
    <>
      <Tier3Head
        title="Mesothelioma Settlement Amounts & Trust Fund Guide (2026)"
        description="Average mesothelioma settlements ($1M–$1.4M), trust-fund payment percentages, VA benefits, filing deadlines, and how asbestos lawsuits are valued in 2026."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Mesothelioma Settlement Guide",
            "How mesothelioma settlements are valued in 2026: average amounts, § 524(g) asbestos trust funds, VA benefits, and the expedited litigation timeline.",
            URL,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Mass Tort Lawsuits", url: `${SITE}/mass-tort-lawsuits` },
            { name: "Mesothelioma Settlement Guide", url: URL },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link to={localePath("/")} className="hover:text-accent">Home</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li><Link to={localePath("/mass-tort-lawsuits")} className="hover:text-accent">Mass Tort Lawsuits</Link></li>
            <ChevronRight className="w-4 h-4" />
            <li className="text-foreground">Mesothelioma Settlement Guide</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Mesothelioma Settlement Amounts & Asbestos Trust Fund Guide (2026)
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Mesothelioma is a rare, aggressive cancer caused almost exclusively by asbestos exposure.
          Because causation is well-established and defendants are numerous, settlements are among the
          highest in U.S. personal-injury litigation — averaging $1M–$1.4M, with trial verdicts averaging $2.4M.
        </p>

        <InMarketEntityBlock
          category="Mesothelioma · Asbestos Litigation · VA Benefits"
          intro={
            <>
              Mesothelioma cases sit at the intersection of toxic-tort litigation, § 524(g) bankruptcy
              trusts, and VA disability compensation. Recoveries typically come from three sources:
              solvent-defendant settlements, asbestos trust-fund claims, and veterans' benefits — often
              combined for a single plaintiff.
            </>
          }
          entities={[
            "pleural mesothelioma",
            "peritoneal mesothelioma",
            "Johns Manville Trust",
            "Owens Corning",
            "W.R. Grace",
            "§ 524(g) asbestos trust",
            "chrysotile asbestos",
            "amphibole asbestos",
            "occupational exposure",
            "Navy shipyard exposure",
            "boiler / gasket / insulation",
            "wrongful death",
            "trial preference",
            "IRC § 104(a)(2)",
            "VA DIC benefits",
            "product identification",
            "industrial hygiene",
            "MDL 875 (E.D. Pa.)",
          ]}
          relatedTerms={[
            { label: "Mass tort hub", href: "/mass-tort-lawsuits" },
            { label: "Personal injury settlements", href: "/personal-injury-settlements" },
            { label: "Settlement taxability", href: "/personal-injury-settlements/taxability" },
            { label: "Contingency fees", href: "/attorney-contingency-fee-explained" },
            { label: "Pain and suffering", href: "/how-pain-and-suffering-is-calculated" },
          ]}
        />

        <AdSlot slot="mesothelioma-top" />

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Average Settlement Amounts</h2>
          <div className="grid gap-4 sm:grid-cols-3 mb-4">
            <Card><CardContent className="p-4">
              <p className="text-xs uppercase text-muted-foreground">Average settlement</p>
              <p className="text-2xl font-bold text-accent">$1M – $1.4M</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <p className="text-xs uppercase text-muted-foreground">Average trial verdict</p>
              <p className="text-2xl font-bold text-accent">$2.4M</p>
            </CardContent></Card>
            <Card><CardContent className="p-4">
              <p className="text-xs uppercase text-muted-foreground">Combined trust exposure</p>
              <p className="text-2xl font-bold text-accent">$30B+</p>
            </CardContent></Card>
          </div>
          <p className="text-sm text-muted-foreground">
            Data sources: RAND Institute for Civil Justice, Mealey's Litigation Report, published
            jury verdicts. Individual outcomes depend on exposure evidence, defendant solvency, jurisdiction,
            and whether the plaintiff is living at trial.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Asbestos § 524(g) Trust Funds</h2>
          <p className="mb-4 text-muted-foreground">
            When an asbestos defendant files Chapter 11, all present and future claims are channeled
            into a § 524(g) trust. Each trust publishes a Trust Distribution Procedure (TDP) with
            scheduled values by disease and a payment percentage that determines the actual payout.
            Trust claims run in parallel with tort litigation.
          </p>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trust</TableHead>
                  <TableHead>Est. Assets</TableHead>
                  <TableHead>Payment %</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRUST_FUNDS.map((t) => (
                  <TableRow key={t.trust}>
                    <TableCell className="font-medium">{t.trust}</TableCell>
                    <TableCell>{t.est}</TableCell>
                    <TableCell>{t.pct}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Payment percentages are periodically adjusted by each trust. Values shown reflect most recent
            published TDPs and are illustrative.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Case Timeline (Expedited)</h2>
          <ol className="space-y-3">
            {TIMELINE.map((s) => (
              <li key={s.step} className="rounded-lg border p-4">
                <p className="font-semibold">{s.step}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <AdSlot slot="mesothelioma-mid" />

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Veterans & Mesothelioma</h2>
          <p className="mb-3 text-muted-foreground">
            Roughly 30% of U.S. mesothelioma diagnoses are veterans — primarily Navy personnel exposed
            in shipyards, engine rooms, and boiler rooms from the 1940s through the 1970s. VA benefits
            are separate from and do not offset asbestos lawsuit or trust recoveries.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Service-connected disability at 100% schedular rate: $3,800+/month (2026)</li>
            <li>Dependency and Indemnity Compensation (DIC) for surviving spouses: $1,600+/month</li>
            <li>Special Monthly Compensation (SMC) available for aid & attendance</li>
            <li>VA healthcare covers mesothelioma treatment at VA-designated centers</li>
            <li>Filing an asbestos lawsuit does NOT waive VA benefits (unlike the general FTCA rule,
                because asbestos suits target private manufacturers, not the U.S. government)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Filing Deadlines (Statutes of Limitations)</h2>
          <p className="mb-3 text-muted-foreground">
            Every state applies the <strong>discovery rule</strong> to mesothelioma — the clock starts
            at diagnosis, not exposure. Typical windows:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Personal injury (living plaintiff): 1–6 years from diagnosis (state-dependent)</li>
            <li>Wrongful death: 1–3 years from date of death</li>
            <li>Asbestos trust claims: usually 3 years from diagnosis, per each trust's TDP</li>
            <li>Veterans' DIC claims: no fixed deadline, but effective date runs from filing</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mb-10 rounded-lg border bg-muted/30 p-6">
          <h2 className="text-2xl font-bold mb-3">Related tools & guides</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li><Link to={localePath("/mass-tort-lawsuits")} className="text-accent hover:underline">Active mass tort lawsuits →</Link></li>
            <li><Link to={localePath("/personal-injury-settlements")} className="text-accent hover:underline">Personal injury settlement calculator →</Link></li>
            <li><Link to={localePath("/personal-injury-settlements/taxability")} className="text-accent hover:underline">Are settlements taxable? →</Link></li>
            <li><Link to={localePath("/attorney-contingency-fee-explained")} className="text-accent hover:underline">Contingency fees explained →</Link></li>
            <li><Link to={localePath("/how-pain-and-suffering-is-calculated")} className="text-accent hover:underline">Pain & suffering calculation →</Link></li>
            <li><Link to={localePath("/lawyer-near-me")} className="text-accent hover:underline">Find a mesothelioma lawyer →</Link></li>
          </ul>
        </section>

        <p className="text-xs text-muted-foreground border-t pt-4">
          Educational information only, not legal or medical advice. Mesothelioma cases are highly
          fact-specific — consult a board-certified asbestos attorney for evaluation of your claim.
        </p>
      </div>
    </>
  );
}
