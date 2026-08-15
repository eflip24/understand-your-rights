import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { legalClauses, getLegalClauseCategories } from "@/data/legalClauses";
import Head from "@/components/seo/Head";
import { JsonLdGraph, faqSchema } from "@/components/seo/JsonLd";
import { useLocalizedPath } from "@/i18n/paths";

const HIGH_RISK_CLAUSES: { label: string; controls: string; redFlag: string }[] = [
  { label: "Indemnification", controls: "Who pays third-party claims, defense costs and legal fees", redFlag: "One-sided, uncapped, covering \"any and all claims\" including the other side's own negligence" },
  { label: "Limitation of liability", controls: "The ceiling on what either side can recover", redFlag: "Cap set at fees paid in the last month, while your exposure stays unlimited" },
  { label: "Arbitration and class waiver", controls: "Whether you can go to court or join others", redFlag: "Mandatory arbitration in a distant city, costs shared, class actions waived" },
  { label: "Governing law and venue", controls: "Which state's law applies and where you must sue", redFlag: "A state neither party operates in, chosen because its law favours the drafter" },
  { label: "Termination", controls: "How and when the deal ends, and what survives", redFlag: "Termination for convenience for them only, with no refund of prepaid amounts" },
  { label: "Auto-renewal", controls: "Whether the contract rolls over automatically", redFlag: "Multi-year renewal with a 90-day notice window buried mid-paragraph" },
  { label: "Non-compete / non-solicit", controls: "What you may do after the relationship ends", redFlag: "Nationwide scope, multi-year duration, no consideration — often unenforceable but still chilling" },
  { label: "Confidentiality", controls: "What information is protected and for how long", redFlag: "Perpetual obligation with no carve-outs for public or independently developed information" },
  { label: "Force majeure", controls: "Excuses for non-performance in a crisis", redFlag: "Excuses their performance but not yours, and does not excuse payment obligations either way" },
  { label: "Assignment", controls: "Whether the contract can be transferred", redFlag: "They may assign freely to any acquirer; you may not assign at all" },
];

const HUB_FAQS = [
  {
    question: "Which contract clauses matter most?",
    answer:
      "Indemnification, limitation of liability, termination, dispute resolution (arbitration, governing law, venue) and payment terms. Those five decide who bears the cost when the deal goes wrong. Everything else is usually negotiable detail.",
  },
  {
    question: "Can a clause be unenforceable even after I sign it?",
    answer:
      "Yes. Courts routinely refuse to enforce clauses that waive gross negligence or willful misconduct, penalty clauses disguised as liquidated damages, overbroad non-competes, and terms found unconscionable — typically hidden, one-sided terms in a take-it-or-leave-it contract. Signing does not make an illegal term legal.",
  },
  {
    question: "What is the difference between indemnify and hold harmless?",
    answer:
      "Indemnify means reimbursing losses after they occur. Hold harmless means not holding the other party responsible in the first place, and in many jurisdictions it also covers claims brought directly between the parties. Most contracts use both phrases together for that reason.",
  },
  {
    question: "How do I push back on a bad clause without killing the deal?",
    answer:
      "Ask for mutuality rather than deletion. \"Make the indemnity mutual\", \"cap both sides at 12 months of fees\", \"let either party terminate on 30 days' notice\". Reasonable counterparties accept symmetry, and the ask signals you read the document.",
  },
  {
    question: "Do I need a lawyer to review a contract?",
    answer:
      "For low-value, standard agreements, understanding the clauses here is usually enough. For anything with personal guarantees, equity, non-competes, or liability above what you could absorb, a paid hour of review is cheaper than the clause you missed.",
  },
];

export default function LegalClausesDirectory() {
  const { t } = useTranslation(["clauses", "common"]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getLegalClauseCategories();
  const lp = useLocalizedPath();

  const localized = useMemo(
    () =>
      legalClauses.map((c) => ({
        ...c,
        title: t(`clauses:${c.slug}.title`, { defaultValue: c.title }) as string,
        explanation: t(`clauses:${c.slug}.explanation`, { defaultValue: c.explanation }) as string,
      })),
    [t],
  );

  const filtered = useMemo(() => {
    let result = localized;
    if (selectedCategory) result = result.filter((c) => c.category === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q) || c.explanation.toLowerCase().includes(q));
    }
    return [...result].sort((a, b) => a.title.localeCompare(b.title));
  }, [search, selectedCategory, localized]);

  return (
    <div className="container py-8 max-w-5xl">
      <Head
        title="Legal Clauses Guide — Common Contract Clauses Explained | LegallySpoken"
        description={`Explore ${legalClauses.length} common contract clauses with examples, enforceability notes, and red flags. Understand what each clause means before you sign.`}
        titleKey="common:legalClausesDirectory.metaTitle"
        descriptionKey="common:legalClausesDirectory.metaDescription"
      />
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("common:legalClausesDirectory.title", { defaultValue: "Legal Clauses Guide" })}</h1>
        <p className="text-muted-foreground text-lg">
          {t("common:legalClausesDirectory.subtitle", { defaultValue: "{{count}} common contract clauses explained with examples and red flags.", count: legalClauses.length }) as string}
        </p>
      </div>

      <JsonLdGraph schemas={[faqSchema(HUB_FAQS)]} />

      {/* Editorial intro */}
      <div className="prose prose-slate max-w-none mb-8 [&_p]:text-muted-foreground [&_p]:leading-relaxed">
        <p>
          A contract is only as good as its clauses. Most disputes are not about the headline price — they are about
          the paragraphs at the back: who pays when something goes wrong, how the deal ends, where you have to sue,
          and what happens to the money already paid. This library explains each clause in plain English, shows real
          wording, and flags the drafting tricks that shift risk onto the party who signs without reading.
        </p>
        <p>
          Use it two ways: before you sign, look up each clause you do not understand; before you draft, copy the
          neutral sample wording and adjust it. Every clause page lists what the clause does, what a fair version
          looks like, and the red flags that justify pushing back.
        </p>
      </div>

      {/* Clause risk table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3">The clauses that decide who wins a dispute</h2>
        <div className="rounded-lg border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold">Clause</th>
                <th className="text-left p-3 font-semibold">What it controls</th>
                <th className="text-left p-3 font-semibold">Red flag wording</th>
              </tr>
            </thead>
            <tbody>
              {HIGH_RISK_CLAUSES.map((row, i) => (
                <tr key={row.label} className={i % 2 ? "bg-muted/20" : ""}>
                  <td className="p-3 font-medium text-foreground align-top">{row.label}</td>
                  <td className="p-3 text-muted-foreground align-top">{row.controls}</td>
                  <td className="p-3 text-muted-foreground align-top">{row.redFlag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("common:legalClausesDirectory.searchPlaceholder", { defaultValue: "Search clauses..." }) as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant={selectedCategory === null ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory(null)}>
          {t("common:legalClausesDirectory.all", { defaultValue: "All" })}
        </Badge>
        {categories.map((cat) => (
          <Badge key={cat} variant={selectedCategory === cat ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory(cat)}>{cat}</Badge>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((clause) => (
          <Link key={clause.slug} to={lp(`/legal-clauses/${clause.slug}`)}>
            <Card className="hover:shadow-md hover:border-accent/30 transition-all h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{clause.title}</h3>
                  <Badge variant="secondary" className="shrink-0 text-xs">{clause.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{clause.explanation}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-accent">
                  {t("common:legalClausesDirectory.stats", {
                    defaultValue: "{{examples}} examples • {{flags}} red flags",
                    examples: clause.exampleClauses.length,
                    flags: clause.redFlags.length,
                  }) as string}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Hub FAQs */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Contract clause questions</h2>
        <div className="space-y-3">
          {HUB_FAQS.map((f) => (
            <div key={f.question} className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-1.5">{f.question}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          {t("common:legalClausesDirectory.empty", { defaultValue: "No clauses found matching your search." })}
        </p>
      )}
    </div>
  );
}
