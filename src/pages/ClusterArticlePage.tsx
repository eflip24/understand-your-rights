import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, ThumbsUp, ThumbsDown, Calculator } from "lucide-react";
import { useState } from "react";
import { tools } from "@/data/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Head from "@/components/seo/Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import SmartLocalLink from "@/components/seo/SmartLocalLink";
import { linkifyLegalContent } from "@/lib/linkifyContent";
import type { PillarData } from "@/data/autoAccidentLaw";

interface ClusterArticlePageProps {
  data: PillarData;
}

export default function ClusterArticlePage({ data }: ClusterArticlePageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const SITE = "https://legallyspoken.com";

  const article = data.clusters.find((c) => c.slug === slug);
  if (!article) return <Navigate to={data.basePath} replace />;

  const relatedTools = tools.filter((t) => article.relatedToolIds.includes(t.id));
  const linkedContent = linkifyLegalContent(article.content);

  // Determine the best CTA tool for this pillar
  const ctaTool = data.category === "Insurance Law"
    ? tools.find((t) => t.id === "insurance-premium")
    : tools.find((t) => t.id === "settlement-estimator");

  return (
    <div className="container py-8 max-w-4xl">
      <Head
        title={article.metaTitle}
        description={article.metaDescription}
        ogType="article"
      />
      <JsonLdGraph schemas={[
        articleSchema(article.title, article.metaDescription, `${SITE}${data.basePath}/${article.slug}`),
        breadcrumbSchema([
          { name: "Home", url: SITE },
          { name: data.category, url: `${SITE}${data.basePath}` },
          { name: article.title, url: `${SITE}${data.basePath}/${article.slug}` },
        ]),
        article.faqs.length > 0 ? faqSchema(article.faqs) : null,
      ]} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={data.basePath} className="hover:text-foreground transition-colors">{data.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{article.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">{data.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">{article.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{article.metaDescription}</p>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none mb-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground"
        dangerouslySetInnerHTML={{ __html: linkedContent }}
      />

      {/* CTA Banner */}
      {ctaTool && (
        <Link to={`/tools/${ctaTool.category}/${ctaTool.slug}`}>
          <Card className="border-accent/30 bg-accent/5 hover:bg-accent/10 hover:shadow-md transition-all group mb-10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Calculator className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground text-lg">{ctaTool.name}</p>
                <p className="text-sm text-muted-foreground">{ctaTool.shortDescription}</p>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">Free Tool</Badge>
            </CardContent>
          </Card>
        </Link>
      )}

      <AdSlot slot="mid-content" className="my-8" />

      {/* Related Terms */}
      {article.relatedTermSlugs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">Related Legal Terms</h2>
          <div className="flex flex-wrap gap-2">
            {article.relatedTermSlugs.map((termSlug) => (
              <Link key={termSlug} to={`/legal-terms/${termSlug}`}>
                <Badge variant="outline" className="hover:bg-accent/10 transition-colors cursor-pointer capitalize">
                  {termSlug.replace(/-/g, " ")}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {article.faqs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {article.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link key={tool.id} to={`/tools/${tool.category}/${tool.slug}`}>
                <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <tool.icon className="h-4 w-4 text-accent" />
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tool.shortDescription}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Smart Local Link */}
      <div className="mb-10">
        <SmartLocalLink category={data.category} />
      </div>

      <AdSlot slot="end-of-article" className="mb-8" />

      {/* Helpful */}
      <div className="border-t pt-6 mt-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Was this helpful?</span>
          <div className="flex gap-2">
            <Button variant={helpful === true ? "default" : "outline"} size="sm" onClick={() => setHelpful(true)} className="gap-1">
              <ThumbsUp className="h-3.5 w-3.5" /> Yes
            </Button>
            <Button variant={helpful === false ? "default" : "outline"} size="sm" onClick={() => setHelpful(false)} className="gap-1">
              <ThumbsDown className="h-3.5 w-3.5" /> No
            </Button>
          </div>
          {helpful !== null && <span className="text-sm text-muted-foreground">Thanks for your feedback!</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          <strong>Disclaimer:</strong> This content is for informational purposes only and does not constitute legal advice.
          Always consult a qualified attorney for legal questions specific to your situation.
        </p>
      </div>
    </div>
  );
}
