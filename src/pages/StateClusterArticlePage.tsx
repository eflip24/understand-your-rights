import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, MapPin, Scale, Shield, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Head from "@/components/seo/Head";
import { JsonLdGraph, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import SmartLocalLink from "@/components/seo/SmartLocalLink";
import { linkifyLegalContent } from "@/lib/linkifyContent";
import { getStateVariant, getNegligenceExplanation, getNoFaultExplanation, stateData } from "@/data/stateVariants";
import { tools } from "@/data/tools";

export default function StateClusterArticlePage() {
  const { pillar, state, slug } = useParams<{ pillar: string; state: string; slug: string }>();
  const SITE = "https://legallyspoken.com";

  if (!pillar || !state || !slug) return <Navigate to="/" replace />;

  const variant = getStateVariant(pillar, state, slug);
  if (!variant) return <Navigate to={`/${pillar}`} replace />;

  const { state: stateInfo, pillar: pillarData, article } = variant;
  const stateName = stateInfo.name;
  const stateTitle = `${article.title} in ${stateName}`;
  const metaTitle = `${article.title} in ${stateName} (2026) | LegallySpoken`;
  const metaDescription = `${article.metaDescription} State-specific guide for ${stateName} including statute of limitations, negligence rules, and insurance requirements.`;
  const url = `${SITE}/${pillar}/${state}/${slug}`;

  const relatedTools = tools.filter((t) => article.relatedToolIds.includes(t.id));
  const linkedContent = linkifyLegalContent(article.content);

  // Nearby states for internal linking (alphabetically adjacent)
  const stateIdx = stateData.findIndex((s) => s.slug === state);
  const nearbyStates = stateData.filter((_, i) => Math.abs(i - stateIdx) <= 3 && i !== stateIdx).slice(0, 5);

  return (
    <div className="container py-8 max-w-4xl">
      <Head title={metaTitle} description={metaDescription} ogType="article" />
      <JsonLdGraph schemas={[
        articleSchema(stateTitle, metaDescription, url),
        breadcrumbSchema([
          { name: "Home", url: SITE },
          { name: pillarData.category, url: `${SITE}${pillarData.basePath}` },
          { name: stateName, url },
        ]),
        article.faqs.length > 0 ? faqSchema(article.faqs) : null,
      ]} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={pillarData.basePath} className="hover:text-foreground transition-colors">{pillarData.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`${pillarData.basePath}/${slug}`} className="hover:text-foreground transition-colors">{article.title}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{stateName}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{pillarData.category}</Badge>
          <Badge variant="outline" className="gap-1"><MapPin className="h-3 w-3" />{stateName}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">{stateTitle}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{metaDescription}</p>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span>✍️ LegallySpoken Editorial Team</span>
          <span>📖 {Math.max(4, Math.ceil(article.content.replace(/<[^>]+>/g, "").split(/\s+/).length / 238) + 1)} min read</span>
          <span>🔄 Last reviewed: March 2026</span>
        </div>
      </div>

      {/* State-Specific Legal Panel */}
      <Card className="border-accent/30 bg-accent/5 mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-accent" />
            {stateName} Legal Overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Statute of Limitations</p>
                <p className="text-sm text-muted-foreground">Personal Injury: {stateInfo.personalInjurySOL}</p>
                <p className="text-sm text-muted-foreground">Property Damage: {stateInfo.propertyDamageSOL}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Negligence Rule</p>
                <p className="text-sm text-muted-foreground capitalize">{stateInfo.negligenceRule}</p>
                <p className="text-xs text-muted-foreground mt-1">{getNegligenceExplanation(stateInfo.negligenceRule)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Min. Auto Insurance</p>
                <p className="text-sm text-muted-foreground">{stateInfo.minAutoInsurance} (BI/BI per accident/PD)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Fault System</p>
                <p className="text-sm text-muted-foreground">{getNoFaultExplanation(stateInfo.noFault, stateName)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Main Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none mb-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground"
        dangerouslySetInnerHTML={{ __html: linkedContent }}
      />

      <AdSlot slot="mid-content" className="my-8" />

      {/* FAQ */}
      {article.faqs.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions — {stateName}</h2>
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
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <tool.icon className="h-4 w-4 text-accent" />
                      <p className="font-semibold text-sm">{tool.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{tool.shortDescription}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Read this guide for other states */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3">Read This Guide for Other States</h2>
        <div className="flex flex-wrap gap-2">
          {nearbyStates.map((s) => (
            <Link key={s.slug} to={`/${pillar}/${s.slug}/${slug}`}>
              <Badge variant="outline" className="hover:bg-accent/10 transition-colors cursor-pointer">{s.name}</Badge>
            </Link>
          ))}
          <Link to={`${pillarData.basePath}/${slug}`}>
            <Badge variant="secondary" className="hover:bg-accent/10 transition-colors cursor-pointer">View all states →</Badge>
          </Link>
        </div>
      </div>

      {/* Smart Local Link */}
      <SmartLocalLink category={pillarData.category} state={stateInfo.slug} />

      <AdSlot slot="end-of-article" className="mb-8" />

      <div className="border-t pt-6 mt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This content is for informational purposes only and does not constitute legal advice.
          Laws in {stateName} may change. Always consult a qualified attorney licensed in {stateName} for legal questions specific to your situation.
        </p>
      </div>
    </div>
  );
}
