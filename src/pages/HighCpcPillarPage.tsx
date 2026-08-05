import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Tier3Head from "@/components/seo/Tier3Head";
import Head from "@/components/seo/Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import InMarketEntityBlock from "@/components/seo/InMarketEntityBlock";
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";
import ToolRecommender from "@/components/tools/ToolRecommender";
import PillarStateChooser from "@/components/seo/PillarStateChooser";
import AdSlot from "@/components/ads/AdSlot";
import NotFound from "@/pages/NotFound";
import { getPhase8Pillar, type Phase8Pillar } from "@/data/phase8Pillars";
import { useLocalizedPath } from "@/i18n/paths";
import { useLocalizedGuide } from "@/i18n/guideTranslationOverrides";

const SITE = "https://legallyspoken.com";

export default function HighCpcPillarPage({ slug: slugProp }: { slug?: string }) {
  const params = useParams();
  const slug = slugProp ?? params.slug ?? "";
  const data = getPhase8Pillar(slug);
  if (!data) return <NotFound />;
  return <PillarBody data={data} />;
}

function PillarBody({ data: source }: { data: Phase8Pillar }) {
  const lp = useLocalizedPath();
  // Locale overlay: translated copy when this guide exists in the active
  // locale, English otherwise (with English-only hreflang scope).
  const { guide: data, isTranslated } = useLocalizedGuide(source);
  const url = `${SITE}/${data.slug}`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.h1,
    description: data.metaDescription,
    totalTime: "PT15M",
    step: data.howTo.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <div className="min-h-screen">
      {isTranslated ? (
        <Head title={data.metaTitle} description={data.metaDescription} ogType="article" />
      ) : (
        <Tier3Head title={data.metaTitle} description={data.metaDescription} ogType="article" />
      )}
      <JsonLdGraph
        schemas={[
          articleSchema(data.h1, data.metaDescription, url, {
            datePublished: data.datePublished,
            dateModified: data.dateModified,
          }),
          howToSchema,
          faqSchema(data.faqs),
          breadcrumbSchema([
            { name: "Home", url: `${SITE}/` },
            { name: data.category, url },
            { name: data.h1, url },
          ]),
        ]}
      />

      <div className="container max-w-7xl py-10 px-4 xl:grid xl:grid-cols-[minmax(0,56rem)_300px] xl:gap-10 xl:justify-center">
        <div className="max-w-4xl w-full mx-auto xl:mx-0">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-wide text-accent font-semibold">
            {data.tagline}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 leading-tight">
            {data.h1}
          </h1>
          {data.dateModified && (
            <p className="text-xs text-muted-foreground mt-3">
              By the LegallySpoken Editorial Team · Last reviewed{" "}
              {new Date(data.dateModified).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </header>

        <InMarketEntityBlock
          category={data.entityBlock.category}
          intro={data.entityBlock.intro}
          entities={data.entityBlock.entities}
          relatedTerms={data.entityBlock.relatedTerms}
        />

        <div className="prose-legal space-y-4 mb-8">
          {data.intro.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        <AdSlot slot="above-content" className="mb-8" />

        {/* KEY FACTS */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Key numbers at a glance</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {data.keyFacts.map((f) => (
              <div key={f.label} className="rounded-md border bg-muted/30 p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
                <p className="font-semibold mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRIMARY CTA */}
        <Card className="bg-primary/5 border-primary/20 mb-10">
          <CardContent className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold">{data.primaryCta.label}</h2>
              <p className="text-sm text-muted-foreground mt-1">{data.primaryCta.description}</p>
            </div>
            <Button asChild size="lg">
              <Link to={lp(data.primaryCta.path)}>
                Open the calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* SECTIONS */}
        {data.sections.map((s, i) => (
          <section key={i} className="mb-10">
            <h2 className="font-serif text-2xl font-bold mb-3">{s.heading}</h2>
            {s.paragraphs?.map((p, j) => (
              <p key={j} className="prose-legal text-muted-foreground leading-relaxed mb-3">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-none" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.tables?.map((t) => (
              <figure key={t.caption} className="my-6 overflow-x-auto">
                <figcaption className="text-sm font-semibold mb-2">{t.caption}</figcaption>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/60">
                      {t.columns.map((c) => (
                        <th key={c} className="border px-3 py-2 text-left font-semibold">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((r, ri) => (
                      <tr key={ri} className={ri % 2 ? "bg-muted/20" : undefined}>
                        {r.map((cell, ci) => (
                          <td key={ci} className="border px-3 py-2 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {t.note && (
                  <p className="text-xs text-muted-foreground mt-2">{t.note}</p>
                )}
              </figure>
            ))}
            {i === 1 && <AdSlot slot="mid-content" className="mt-8" />}
          </section>
        ))}

        {/* HOW TO */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Step by step: what to do next</h2>
          <ol className="space-y-4">
            {data.howTo.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-base">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* LAWYER CTA */}
        <Card className="border-accent/30 bg-accent/5 mb-10">
          <CardContent className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-accent mt-1 flex-none" />
              <div>
                <h2 className="font-serif text-xl font-bold">{data.lawyerCta.label}</h2>
                <p className="text-sm text-muted-foreground mt-1">{data.lawyerCta.description}</p>
              </div>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to={lp(data.lawyerCta.path)}>
                Browse the directory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {data.faqs.map((f, i) => (
              <div key={i} className="border-b border-border pb-4">
                <h3 className="font-semibold text-base mb-2">{f.question}</h3>
                <p className="text-sm text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <PillarStateChooser slug={data.slug} />

        <AdSlot slot="end-of-article" className="mb-10" />

        {data.recommenderTopic && (
          <ToolRecommender topic={data.recommenderTopic} className="mb-10" />
        )}

        <RelatedIntentStrip
          cluster={data.cluster}
          heading="Continue in this cluster"
          links={data.related}
        />

        <section className="mt-8 text-xs text-muted-foreground border-t border-border pt-4">
          <p>
            <strong>Legal disclaimer:</strong> LegallySpoken provides legal information and
            self-help tools, not legal advice. We are not a law firm. Amounts, deadlines and
            rules described here are general and vary by state and by case — consult a licensed
            attorney in your jurisdiction before acting on anything on this page.
          </p>
        </section>
        </div>

        {/* Desktop sidebar rail — sticky ad unit alongside long-form copy. */}
        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <AdSlot slot="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
