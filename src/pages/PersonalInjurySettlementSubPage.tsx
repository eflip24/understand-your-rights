import { Link, Navigate, useParams } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ChevronRight, Printer, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Tier3Head from "@/components/seo/Tier3Head";
import {
  JsonLdGraph,
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  webApplicationSchema,
} from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { useLocalizedPath } from "@/i18n/paths";
import { piSubPages } from "@/data/piSettlementSubPages";
import { PI_TAXABILITY_FAQS } from "@/pages/PersonalInjurySettlementHub";

const SettlementEstimator = lazy(() => import("@/components/tools/SettlementEstimator"));

const SITE = "https://legallyspoken.com";

export default function PersonalInjurySettlementSubPage() {
  const { vertical } = useParams<{ vertical: string }>();
  const lp = useLocalizedPath();

  if (!vertical || !piSubPages[vertical]) {
    return <Navigate to="/personal-injury-settlements" replace />;
  }

  const data = piSubPages[vertical];
  const url = `${SITE}/personal-injury-settlements/${data.slug}`;

  const allFaqs = [...data.faqs, ...PI_TAXABILITY_FAQS.slice(0, 3)];

  return (
    <div className="container py-8 max-w-4xl">
      <Tier3Head title={data.metaTitle} description={data.metaDescription} />
      <JsonLdGraph
        schemas={[
          articleSchema(data.h1, data.metaDescription, url),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Personal Injury Settlements", url: `${SITE}/personal-injury-settlements` },
            { name: data.vertical, url },
          ]),
          faqSchema(allFaqs),
          webApplicationSchema(data.h1, data.metaDescription, url, ["US"]),
        ]}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp("/personal-injury-settlements")} className="hover:text-foreground">Personal Injury Settlements</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{data.vertical}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">{data.h1}</h1>
        <p className="text-lg text-muted-foreground">{data.intro}</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button size="sm" variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" /> Save as PDF
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to={lp(data.lawyerLink.path)}>{data.lawyerLink.label}</Link>
        </Button>
      </div>

      <AdSlot slot="above-content" className="mb-6" />

      {/* Key facts */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Key Facts</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.keyFacts.map((f) => (
            <Card key={f.label}>
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">{f.label}</p>
                <p className="text-lg font-bold text-accent">{f.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">{data.cpcNote}</p>
      </section>

      {/* Calculator */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Estimate Your {data.vertical} Settlement</h2>
        <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded-lg" />}>
          <SettlementEstimator />
        </Suspense>
      </section>

      {/* Filing deadline callout */}
      <div className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 flex gap-3">
        <Sparkles className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm">Watch your filing deadline</p>
          <p className="text-sm text-muted-foreground mt-1">{data.timelineNote}</p>
          <Link to={lp("/tools/consumer/statute-of-limitations-lookup")} className="text-sm text-accent underline mt-1 inline-block">
            Check your state's statute of limitations →
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">{data.vertical} Settlement FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {allFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`f-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <AdSlot slot="end-of-article" className="mb-8" />

      {/* Related sub-pages */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Related Settlement Calculators</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.values(piSubPages)
            .filter((p) => p.slug !== data.slug)
            .map((p) => (
              <Link
                key={p.slug}
                to={lp(`/personal-injury-settlements/${p.slug}`)}
                className="block rounded-lg border p-4 hover:bg-muted/50 transition"
              >
                <p className="font-semibold text-foreground">{p.h1}</p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.intro}</p>
              </Link>
            ))}
        </div>
      </section>

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This tool provides educational estimates only, not legal advice. Actual settlement values depend on jurisdiction, evidence, insurer posture, and negotiation. Consult a licensed personal injury attorney for a case evaluation.
        </p>
      </div>
    </div>
  );
}
