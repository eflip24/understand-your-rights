import { Link } from "react-router-dom";
import { ChevronRight, Scale, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Tier3Head from "@/components/seo/Tier3Head";
import {
  JsonLdGraph,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
} from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { useLocalizedPath } from "@/i18n/paths";
import { massTortCases } from "@/data/massTortCases";

const SITE = "https://legallyspoken.com";

const HUB_FAQS = [
  {
    question: "What is a mass tort lawsuit?",
    answer:
      "A mass tort is a civil action brought by many plaintiffs against one or a few corporate defendants — typically pharma companies, manufacturers, or chemical producers — for the same defective product or exposure. Unlike class actions, each plaintiff keeps an individual case with an individual payout based on their injury.",
  },
  {
    question: "How is a mass tort different from a class action?",
    answer:
      "In a class action, one verdict binds every class member and payouts are usually equal or formulaic. In a mass tort MDL (Multidistrict Litigation), cases are consolidated for pretrial efficiency but each plaintiff proves individual damages and receives an individualized payout.",
  },
  {
    question: "Do I pay anything upfront to join a mass tort?",
    answer:
      "No. Every mass-tort attorney works on contingency — typically 33%–40% of the recovery, plus case costs (expert witnesses, medical record retrieval, filing fees). You pay nothing if there is no recovery.",
  },
  {
    question: "Are mass tort settlements taxable?",
    answer:
      "The compensatory portion for physical injury is federal-tax-free under IRC § 104(a)(2). Punitive damages, interest, and any award for emotional distress not tied to physical injury are taxable.",
  },
  {
    question: "How long does a mass tort case take?",
    answer:
      "From filing to payout: 2–6 years is typical. Bellwether trials (test cases) usually happen 12–24 months into an MDL, and global settlements often follow the first few bellwether verdicts.",
  },
];

const STATUS_COLOR: Record<string, string> = {
  Active: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  Settling: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  "Pending Bellwether": "bg-amber-500/10 text-amber-700 border-amber-500/30",
  "Recently Settled": "bg-purple-500/10 text-purple-700 border-purple-500/30",
};

export default function MassTortHub() {
  const lp = useLocalizedPath();
  const url = `${SITE}/mass-tort-lawsuits`;
  const cases = Object.values(massTortCases);

  return (
    <div className="container py-8 max-w-5xl">
      <Tier3Head
        title="Mass Tort Lawsuit Settlements 2026 — MDL Payout Amounts | LegallySpoken"
        description="Current mass tort MDL settlement amounts and eligibility for Camp Lejeune, Roundup, Tylenol autism, hair relaxer, Ozempic, Paraquat, 3M earplugs, and talcum powder."
      />
      <JsonLdGraph
        schemas={[
          articleSchema(
            "Mass Tort Lawsuit Settlements 2026",
            "Current MDL settlement amounts, eligibility, and status for the largest active mass tort cases in the United States.",
            url,
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Mass Tort Lawsuits", url },
          ]),
          faqSchema(HUB_FAQS),
          itemListSchema(
            "Active Mass Tort Cases",
            cases.map((c) => ({
              name: c.name,
              url: `${SITE}/mass-tort-lawsuits/${c.slug}`,
            })),
          ),
        ]}
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Mass Tort Lawsuits</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          Mass Tort Lawsuit Settlements & MDL Payouts (2026)
        </h1>
        <p className="text-lg text-muted-foreground">
          Current settlement amounts, eligibility criteria, and MDL status for the largest active mass tort cases in the United States. Updated monthly with court filings and settlement announcements.
        </p>
      </header>

      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Active Mass Tort Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <Link
              key={c.slug}
              to={lp(`/mass-tort-lawsuits/${c.slug}`)}
              className="block rounded-lg border p-5 hover:border-accent hover:bg-muted/40 transition"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-lg text-foreground">{c.name}</h3>
                <Badge variant="outline" className={STATUS_COLOR[c.status] || ""}>
                  {c.status}
                </Badge>
              </div>
              {c.mdlNumber && (
                <p className="text-xs text-muted-foreground mb-2">
                  {c.mdlNumber} · {c.court}
                </p>
              )}
              <p className="text-sm text-muted-foreground line-clamp-3">{c.intro}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">What Is a Mass Tort?</h2>
        <Card>
          <CardContent className="pt-6 space-y-4 text-sm text-muted-foreground">
            <p>
              A <strong className="text-foreground">mass tort</strong> is a civil action where many injured plaintiffs sue one or a few defendants — typically pharmaceutical companies, product manufacturers, or chemical producers — for the same defective product or exposure. Cases are usually consolidated in a federal Multidistrict Litigation (MDL) to streamline discovery.
            </p>
            <p>
              Unlike a <strong className="text-foreground">class action</strong>, each plaintiff in a mass tort keeps an individual case and receives an individual payout based on injury severity, exposure length, and evidence quality. Most settlements use a <em>tier matrix</em> assigning payout ranges by injury type.
            </p>
            <div className="flex gap-3 items-start rounded-md border border-amber-500/40 bg-amber-500/10 p-3">
              <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs">
                <strong>Deadlines matter.</strong> Every mass tort has a statute of limitations plus MDL-specific filing cutoffs. Miss either and your claim is barred. Free consultations with mass-tort firms carry no obligation and typically screen eligibility in one call.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Mass Tort FAQ</h2>
        <div className="space-y-4">
          {HUB_FAQS.map((f, i) => (
            <Card key={i}>
              <CardContent className="pt-5">
                <h3 className="font-semibold text-foreground mb-2 flex gap-2">
                  <Scale className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                  {f.question}
                </h3>
                <p className="text-sm text-muted-foreground">{f.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <AdSlot slot="end-of-article" className="mb-8" />

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This page is educational and reflects publicly available information about pending litigation. It is not legal advice and does not create an attorney-client relationship. Settlement projections are analyst estimates and may not reflect final payouts. Consult a licensed attorney for a case evaluation.
        </p>
      </div>
    </div>
  );
}
