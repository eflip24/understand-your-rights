import { useParams, Navigate, Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AdSlot from "@/components/ads/AdSlot";
import { useLocalizedPath } from "@/i18n/paths";
import { getKeywordCluster, keywordClusters } from "@/data/keywordClusters";

const SITE = "https://legallyspoken.com";

export default function KeywordClusterPage() {
  const { slug } = useParams<{ slug: string }>();
  const lp = useLocalizedPath();
  const cluster = slug ? getKeywordCluster(slug) : undefined;
  if (!cluster) return <Navigate to={lp("/answers")} replace />;

  const url = `${SITE}/answers/${cluster.slug}`;

  return (
    <div className="container py-8 max-w-4xl">
      <Head title={cluster.metaTitle} description={cluster.metaDescription} ogType="article" />
      <JsonLdGraph
        schemas={[
          articleSchema(cluster.title, cluster.metaDescription, url),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Answers", url: `${SITE}/answers` },
            { name: cluster.title, url },
          ]),
          faqSchema(cluster.faqs),
        ]}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to={lp("/")} className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp("/answers")} className="hover:text-foreground transition-colors">Answers</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground line-clamp-1">{cluster.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <Badge variant="secondary" className="mb-3">{cluster.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">{cluster.title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{cluster.metaDescription}</p>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span>✍️ LegallySpoken Editorial Team</span>
          <span>🔄 Last reviewed: March 2026</span>
        </div>
      </header>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Answer */}
      <div className="prose-legal mb-8 space-y-4 text-muted-foreground leading-relaxed [&_strong]:text-foreground [&_em]:text-foreground/90">
        {cluster.answer.map((p, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
        ))}
      </div>

      {/* Primary CTA */}
      <Link to={lp(cluster.primaryCta.path)} className="block mb-10">
        <Card className="border-accent/30 bg-accent/5 hover:bg-accent/10 hover:shadow-md transition-all group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-lg">{cluster.primaryCta.label}</p>
              <p className="text-sm text-muted-foreground">{cluster.primaryCta.description}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-accent hidden sm:block group-hover:translate-x-1 transition-transform" />
          </CardContent>
        </Card>
      </Link>

      {/* Entity facts */}
      <section className="mb-10 rounded-lg border bg-secondary/30 p-6">
        <h2 className="text-lg font-bold mb-3">Key facts &amp; entities</h2>
        <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
          {cluster.entityFacts.map((f, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent shrink-0">•</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <AdSlot slot="mid-content" className="my-8" />

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {cluster.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Related links */}
      {cluster.relatedLinks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">Related guides &amp; tools</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {cluster.relatedLinks.map((l) => (
              <Link
                key={l.path}
                to={lp(l.path)}
                className="flex items-center justify-between rounded-md border px-4 py-3 text-sm hover:border-accent/40 hover:bg-accent/5 transition-colors"
              >
                <span className="font-medium">{l.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Keyphrase footer (helps long-tail matching, kept subtle) */}
      <section className="mb-8 text-xs text-muted-foreground">
        <p>
          Also searched:{" "}
          {cluster.keyphrases.map((k, i) => (
            <span key={k}>
              <em>{k}</em>
              {i < cluster.keyphrases.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <AdSlot slot="end-of-article" className="mb-8" />

      <p className="text-xs text-muted-foreground border-t pt-6">
        <strong>Disclaimer:</strong> Informational only — not legal advice. Consult a licensed attorney for guidance on your specific situation.
      </p>

      {/* More clusters */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">More answers</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {keywordClusters
            .filter((c) => c.slug !== cluster.slug)
            .slice(0, 4)
            .map((c) => (
              <Link key={c.slug} to={lp(`/answers/${c.slug}`)} className="block">
                <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all">
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">{c.category}</Badge>
                    <p className="font-semibold text-sm leading-snug">{c.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
        <div className="mt-4">
          <Button asChild variant="outline" size="sm">
            <Link to={lp("/answers")}>Browse all answers</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
