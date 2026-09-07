import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, Clock, ExternalLink, Scale } from "lucide-react";
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
  getNoticeRules,
  noticeRules,
  INTERNATIONAL_CALC_LAST_VERIFIED,
  type NoticeInput,
} from "@/data/internationalCalculators";

const SITE = "https://legallyspoken.com";

export default function InternationalNoticeCalculator() {
  const { slug } = useParams<{ slug: string }>();
  const lp = useLocalizedPath();
  const rules = getNoticeRules(slug);
  const jurisdiction = getJurisdictionBySlug(slug);

  const [months, setMonths] = useState(48);
  const [weeklyPay, setWeeklyPay] = useState(800);
  const [age, setAge] = useState(38);
  const [reason, setReason] = useState<NoticeInput["reason"]>("redundancy");

  const result = useMemo(() => {
    if (!rules) return null;
    return rules.compute({ months, weeklyPay, age, reason });
  }, [rules, months, weeklyPay, age, reason]);

  if (!rules) return <Navigate to="/international" replace />;

  const url = `${SITE}/international/${rules.slug}/notice-period`;
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "International", url: `${SITE}/international` },
      { name: rules.country, url: `${SITE}/international/${rules.slug}` },
      { name: "Notice period calculator", url },
    ]),
    faqSchema(rules.faqs),
    articleSchema(rules.metaTitle, rules.metaDescription, url, {
      datePublished: INTERNATIONAL_CALC_LAST_VERIFIED,
      dateModified: INTERNATIONAL_CALC_LAST_VERIFIED,
    }),
  ];

  const sym = rules.currencySymbol;

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
        <span className="text-foreground">Notice period</span>
      </nav>

      <Badge variant="secondary" className="mb-3">{rules.country}</Badge>
      <h1 className="mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
        {rules.country} notice period &amp; severance calculator
      </h1>
      <p className="max-w-3xl text-lg text-muted-foreground">
        Enter your service, pay and reason for leaving to see the minimum notice, pay in lieu and any severance
        entitlement, plus the deadline to challenge the dismissal.
      </p>

      <AuthorByline reviewedAt={INTERNATIONAL_CALC_LAST_VERIFIED} className="my-6" />

      <nav aria-label="Other countries" className="mb-8 flex flex-wrap gap-2">
        {noticeRules.map((r) => (
          <Link
            key={r.slug}
            to={lp(`/international/${r.slug}/notice-period`)}
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
        <h2 id="calc" className="sr-only">Calculator</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="months">Completed months of service</Label>
            <Input
              id="months"
              type="number"
              min={0}
              max={600}
              value={months}
              onChange={(e) => setMonths(Math.max(0, Number(e.target.value) || 0))}
            />
            <p className="mt-1 text-xs text-muted-foreground">{(months / 12).toFixed(1)} years</p>
          </div>
          <div>
            <Label htmlFor="pay">Gross weekly pay ({rules.currency})</Label>
            <Input
              id="pay"
              type="number"
              min={0}
              value={weeklyPay}
              onChange={(e) => setWeeklyPay(Math.max(0, Number(e.target.value) || 0))}
            />
          </div>
          {rules.usesAge && (
            <div>
              <Label htmlFor="age">Your age</Label>
              <Input
                id="age"
                type="number"
                min={16}
                max={90}
                value={age}
                onChange={(e) => setAge(Math.max(16, Number(e.target.value) || 16))}
              />
            </div>
          )}
          <div>
            <Label htmlFor="reason">Reason employment is ending</Label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value as NoticeInput["reason"])}
              className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="redundancy">Redundancy / retrenchment</option>
              <option value="employer-other">Other employer-initiated dismissal</option>
              <option value="resignation">I am resigning</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/30 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Your estimate</p>
          <p className="mt-1 font-serif text-3xl font-bold">{result?.noticeLabel}</p>
          <p className="text-sm text-muted-foreground">minimum notice</p>

          <dl className="mt-5 space-y-3">
            {result?.lines.map((line) => (
              <div key={line.label} className="border-t pt-3">
                <dt className="text-xs text-muted-foreground">{line.label}</dt>
                <dd className="font-semibold">{line.value}</dd>
                {line.note && <p className="text-xs text-muted-foreground">{line.note}</p>}
              </div>
            ))}
            <div className="border-t pt-3">
              <dt className="text-xs text-muted-foreground">Estimated total payable</dt>
              <dd className="text-xl font-bold text-accent">
                {sym}
                {result?.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </dd>
            </div>
          </dl>

          {result?.warnings.length ? (
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              {result.warnings.map((w) => (
                <li key={w} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="mb-10 rounded-lg border-l-4 border-accent bg-accent/5 p-5" aria-labelledby="deadline">
        <h2 id="deadline" className="mb-1 flex items-center gap-2 font-serif text-xl font-bold">
          <Clock className="h-5 w-5 text-accent" aria-hidden="true" /> Deadline to challenge: {result?.deadline}
        </h2>
        <p className="text-sm text-muted-foreground">{result?.deadlineNote}</p>
        <p className="mt-2 text-sm text-muted-foreground">Forum: {rules.claimForum}</p>
      </section>

      <div className="mb-10 space-y-4">
        {rules.intro.map((p, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </div>

      <section className="mb-12" aria-labelledby="ladder">
        <h2 id="ladder" className="mb-4 font-serif text-2xl font-bold">{rules.country} notice ladder</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <caption className="sr-only">{rules.country} statutory notice by length of service</caption>
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Length of service</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Minimum notice</th>
              </tr>
            </thead>
            <tbody>
              {rules.noticeTable.map((row) => (
                <tr key={row.service} className="border-t">
                  <th scope="row" className="px-4 py-3 text-left font-medium">{row.service}</th>
                  <td className="px-4 py-3">{row.notice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{rules.severanceSummary}</p>
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
            <Link to={lp(`/international/${rules.slug}/small-claims-cost`)} className="text-accent hover:underline">
              {rules.country} small claims cost checker
            </Link>
          </li>
          <li>
            <Link to={lp("/tools/employment/severance-pay-calculator")} className="text-accent hover:underline">
              US severance pay calculator
            </Link>
          </li>
          {jurisdiction?.relatedUsPaths.slice(0, 2).map((r) => (
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
          Last verified {INTERNATIONAL_CALC_LAST_VERIFIED}. Estimates are general legal information, not legal advice.
          Your contract, award or collective agreement may give more than the statutory minimum.
        </p>
      </section>

      <AdSlot slot="end-of-article" className="mt-12" />
    </div>
  );
}
