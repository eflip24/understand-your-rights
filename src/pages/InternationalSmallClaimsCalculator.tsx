import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, ExternalLink, Gavel, Scale } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema, faqSchema, articleSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalizedPath } from "@/i18n/paths";
import { getJurisdictionBySlug } from "@/data/internationalJurisdictions";
import {
  getSmallClaimsRules,
  smallClaimsRules,
  INTERNATIONAL_CALC_LAST_VERIFIED,
} from "@/data/internationalCalculators";

const SITE = "https://legallyspoken.com";

export default function InternationalSmallClaimsCalculator() {
  const { slug } = useParams<{ slug: string }>();
  const lp = useLocalizedPath();
  const rules = getSmallClaimsRules(slug);
  const jurisdiction = getJurisdictionBySlug(slug);

  const [amount, setAmount] = useState(2500);

  const result = useMemo(() => (rules ? rules.compute({ amount }) : null), [rules, amount]);

  if (!rules) return <Navigate to="/international" replace />;

  const url = `${SITE}/international/${rules.slug}/small-claims-cost`;
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "International", url: `${SITE}/international` },
      { name: rules.country, url: `${SITE}/international/${rules.slug}` },
      { name: "Small claims cost", url },
    ]),
    faqSchema(rules.faqs),
    articleSchema(rules.metaTitle, rules.metaDescription, url, {
      datePublished: INTERNATIONAL_CALC_LAST_VERIFIED,
      dateModified: INTERNATIONAL_CALC_LAST_VERIFIED,
    }),
  ];

  return (
    <div className="container max-w-4xl py-8">
      <Head title={rules.metaTitle} description={rules.metaDescription} englishOnly />
      <JsonLdGraph schemas={schemas} />

      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link to={lp("/")} className="hover:text-accent">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link to={lp("/international")} className="hover:text-accent">International</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link to={lp(`/international/${rules.slug}`)} className="hover:text-accent">{rules.country}</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-foreground">Small claims cost</span>
      </nav>

      <Badge variant="secondary" className="mb-3">{rules.country}</Badge>
      <h1 className="mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
        {rules.country} small claims cost &amp; eligibility checker
      </h1>
      <p className="max-w-3xl text-lg text-muted-foreground">
        Enter what you are owed to see whether it fits the small claims limit, what filing and hearing fees apply,
        whether lawyers can appear, and what you would keep if you win.
      </p>

      <AuthorByline reviewedAt={INTERNATIONAL_CALC_LAST_VERIFIED} className="my-6" />

      <nav aria-label="Other countries" className="mb-8 flex flex-wrap gap-2">
        {smallClaimsRules.map((r) => (
          <Link
            key={r.slug}
            to={lp(`/international/${r.slug}/small-claims-cost`)}
            className={`rounded-full border px-3 py-1 text-sm ${
              r.slug === rules.slug ? "border-accent bg-accent/10 font-semibold text-accent" : "hover:border-accent"
            }`}
          >
            {r.country}
          </Link>
        ))}
      </nav>

      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-10 grid gap-6 rounded-xl border bg-card p-6 md:grid-cols-2" aria-labelledby="calc">
        <h2 id="calc" className="sr-only">Small claims cost calculator</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount claimed ({rules.currency})</Label>
            <Input
              id="amount"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
            />
            <p className="mt-1 text-xs text-muted-foreground">Small claims limit: {rules.limitLabel}</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm">
            <p className="font-semibold">{rules.forum}</p>
            <p className="mt-1 text-muted-foreground">{rules.lawyersAllowed}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/30 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Result</p>
          <p className={`mt-1 font-serif text-2xl font-bold ${result?.eligible ? "text-accent" : ""}`}>
            {result?.eligible ? "Fits the small claims track" : "Over the small claims limit"}
          </p>
          <dl className="mt-5 space-y-3">
            <div className="border-t pt-3">
              <dt className="text-xs text-muted-foreground">Filing fee</dt>
              <dd className="font-semibold">{result?.filingFeeLabel}</dd>
            </div>
            <div className="border-t pt-3">
              <dt className="text-xs text-muted-foreground">Hearing fee</dt>
              <dd className="font-semibold">{result?.hearingFeeLabel}</dd>
            </div>
            <div className="border-t pt-3">
              <dt className="text-xs text-muted-foreground">Estimated total to run the claim</dt>
              <dd className="text-xl font-bold text-accent">{result?.totalLabel}</dd>
            </div>
            <div className="border-t pt-3">
              <dt className="text-xs text-muted-foreground">If you win</dt>
              <dd className="text-sm text-muted-foreground">{result?.netIfWin}</dd>
            </div>
          </dl>
          {!result?.eligible && (
            <p className="mt-4 rounded-md bg-background p-3 text-xs text-muted-foreground">{rules.overLimitAdvice}</p>
          )}
        </div>
      </section>

      <div className="mb-10 space-y-4">
        {rules.intro.map((p, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </div>

      <section className="mb-12" aria-labelledby="fees">
        <h2 id="fees" className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
          <Gavel className="h-5 w-5 text-accent" aria-hidden="true" /> {rules.country} small claims fee table
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <caption className="sr-only">{rules.country} small claims fees by claim value</caption>
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Claim value</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Filing fee</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Hearing fee</th>
              </tr>
            </thead>
            <tbody>
              {rules.feeTable.map((row) => (
                <tr key={row.band} className="border-t">
                  <th scope="row" className="px-4 py-3 text-left font-medium">{row.band}</th>
                  <td className="px-4 py-3">{row.filing}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.hearing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Appeals: {rules.appeal}</p>
      </section>

      <section className="mb-12" aria-labelledby="steps">
        <h2 id="steps" className="mb-4 font-serif text-2xl font-bold">How to file, step by step</h2>
        <ol className="space-y-3 rounded-lg border bg-muted/30 p-5">
          {rules.steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12" aria-labelledby="faq">
        <h2 id="faq" className="mb-4 font-serif text-2xl font-bold">Common questions</h2>
        <div className="space-y-4">
          {rules.faqs.map((f) => (
            <div key={f.question} className="rounded-lg border bg-card p-4">
              <h3 className="mb-1 font-semibold">{f.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12" aria-labelledby="related">
        <h2 id="related" className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
          <Scale className="h-5 w-5 text-accent" aria-hidden="true" /> Keep going
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>
            <Link to={lp(`/international/${rules.slug}`)} className="text-accent hover:underline">
              {rules.country} legal guide: deadlines and rights
            </Link>
          </li>
          <li>
            <Link to={lp(`/international/${rules.slug}/notice-period`)} className="text-accent hover:underline">
              {rules.country} notice period calculator
            </Link>
          </li>
          <li>
            <Link to={lp("/data/court-filing-fees")} className="text-accent hover:underline">
              US court filing fees by state
            </Link>
          </li>
          {jurisdiction?.relatedUsPaths.slice(0, 1).map((r) => (
            <li key={r.path}>
              <Link to={lp(r.path)} className="text-accent hover:underline">{r.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sources">
        <h2 id="sources" className="mb-3 font-serif text-xl font-bold">Sources</h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {rules.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 hover:underline">
                {s.name}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Last verified {INTERNATIONAL_CALC_LAST_VERIFIED}. Court fees change regularly — confirm the current figure
          with the court before filing. General legal information, not legal advice.
        </p>
      </section>

      <AdSlot slot="end-of-article" className="mt-12" />
    </div>
  );
}
