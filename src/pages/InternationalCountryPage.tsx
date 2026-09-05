import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronRight, ExternalLink, Gavel, LifeBuoy, Timer } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema, faqSchema, articleSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/i18n/paths";
import { getJurisdictionBySlug } from "@/data/internationalJurisdictions";

const SITE = "https://legallyspoken.com";

export default function InternationalCountryPage() {
  const { slug } = useParams<{ slug: string }>();
  const lp = useLocalizedPath();
  const j = getJurisdictionBySlug(slug);

  if (!j) return <Navigate to="/international" replace />;

  const url = `${SITE}/international/${j.slug}`;
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "International", url: `${SITE}/international` },
      { name: j.country, url },
    ]),
    faqSchema(j.faqs),
    articleSchema(j.metaTitle, j.metaDescription, url, {
      datePublished: j.lastVerified,
      dateModified: j.lastVerified,
    }),
  ];

  return (
    <div className="container max-w-4xl py-8">
      <Head title={j.metaTitle} description={j.metaDescription} englishOnly />
      <JsonLdGraph schemas={schemas} />

      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link to={lp("/")} className="hover:text-accent">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link to={lp("/international")} className="hover:text-accent">International</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-foreground">{j.country}</span>
      </nav>

      <Badge variant="secondary" className="mb-3">{j.country}</Badge>
      <h1 className="mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
        {j.country}: claim deadlines, employment rights and small claims
      </h1>
      <p className="max-w-3xl text-lg text-muted-foreground">{j.tagline}</p>

      <AuthorByline reviewedAt={j.lastVerified} className="my-6" />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {j.quickFacts.map((f) => (
          <div key={f.label} className="rounded-lg border bg-card p-4">
            <p className="text-xs text-muted-foreground">{f.label}</p>
            <p className="mt-1 text-xl font-bold text-foreground">{f.value}</p>
            {f.note && <p className="mt-1 text-xs text-muted-foreground">{f.note}</p>}
          </div>
        ))}
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      <div className="mb-10 space-y-4">
        {j.intro.map((p, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </div>

      <section className="mb-12" aria-labelledby="deadlines">
        <h2 id="deadlines" className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
          <Timer className="h-5 w-5 text-accent" aria-hidden="true" /> Claim deadlines in {j.country}
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <caption className="sr-only">{j.country} limitation periods by claim type</caption>
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Claim type</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Time limit</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Authority</th>
              </tr>
            </thead>
            <tbody>
              {j.deadlines.map((d) => (
                <tr key={d.claim} className="border-t">
                  <th scope="row" className="px-4 py-3 text-left font-medium">{d.claim}</th>
                  <td className="px-4 py-3">{d.limit}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.authority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {j.topics.map((topic) => (
        <section key={topic.id} className="mb-12" aria-labelledby={topic.id}>
          <h2 id={topic.id} className="mb-4 font-serif text-2xl font-bold">{topic.heading}</h2>
          <div className="space-y-4">
            {topic.body.map((p, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </div>
          {topic.steps && (
            <ul className="mt-5 space-y-2 rounded-lg border bg-muted/30 p-5">
              {topic.steps.map((s) => (
                <li key={s} className="flex gap-2 text-sm">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="mb-12" aria-labelledby="small-claims">
        <h2 id="small-claims" className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
          <Gavel className="h-5 w-5 text-accent" aria-hidden="true" /> Small claims in {j.country}
        </h2>
        <dl className="grid gap-4 rounded-lg border bg-card p-5 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Value limit</dt>
            <dd className="font-semibold">{j.smallClaims.limit}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Forum</dt>
            <dd className="font-semibold">{j.smallClaims.court}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Filing fee</dt>
            <dd className="font-semibold">{j.smallClaims.fee}</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-muted-foreground">{j.smallClaims.note}</p>
      </section>

      <section className="mb-12" aria-labelledby="faq">
        <h2 id="faq" className="mb-4 font-serif text-2xl font-bold">{j.country} legal questions</h2>
        <div className="space-y-4">
          {j.faqs.map((f) => (
            <div key={f.question} className="rounded-lg border bg-card p-4">
              <h3 className="mb-1 font-semibold">{f.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12" aria-labelledby="help">
        <h2 id="help" className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
          <LifeBuoy className="h-5 w-5 text-accent" aria-hidden="true" /> Free help in {j.country}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {j.helpBodies.map((b) => (
            <li key={b.name} className="rounded-lg border bg-card p-4">
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                {b.name}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <p className="mt-1 text-sm text-muted-foreground">{b.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12" aria-labelledby="related">
        <h2 id="related" className="mb-4 font-serif text-2xl font-bold">Related resources</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {j.relatedUsPaths.map((r) => (
            <li key={r.path}>
              <Link to={lp(r.path)} className="text-accent hover:underline">{r.label}</Link>
            </li>
          ))}
          <li>
            <Link to={lp("/international")} className="text-accent hover:underline">
              All international legal guides
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby="sources">
        <h2 id="sources" className="mb-3 font-serif text-xl font-bold">Sources</h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {j.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="hover:underline">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Last verified {j.lastVerified}. This page is general legal information, not legal advice.
          Laws change — confirm any figure against the cited source before relying on it.
        </p>
      </section>

      <AdSlot slot="end-of-article" className="mt-12" />
    </div>
  );
}
