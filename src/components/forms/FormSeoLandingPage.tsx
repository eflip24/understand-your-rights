import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Download, ShieldCheck, ArrowRight } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph } from "@/components/seo/JsonLd";
import RelatedIntentStrip from "@/components/seo/RelatedIntentStrip";
import Breadcrumbs from "@/components/forms/Breadcrumbs";
import { useLocalizedPath } from "@/i18n/paths";

interface HowToStep { name: string; text: string }
interface FaqItem { q: string; a: string }

export interface FormSeoLandingProps {
  slug: string;
  wizardSlug: string;
  wizardQuery?: string; // e.g. "state=CA"
  h1: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  intro: string;
  useCases: string[];
  howToSteps: HowToStep[];
  faqs: FaqItem[];
  keywords?: string[];
  breadcrumbTail: { label: string; href?: string }[];
  stateBlock?: { title: string; statute?: string; bullets: string[] };
  related?: { label: string; href: string; blurb?: string }[];
  isGovernmentForm?: boolean;
  governmentAgency?: string;
}

const SITE = "https://legallyspoken.com";

export default function FormSeoLandingPage(props: FormSeoLandingProps) {
  const lp = useLocalizedPath();
  const navigate = useNavigate();
  const wizardHref =
    lp(`/forms/${props.wizardSlug}`) + (props.wizardQuery ? `?${props.wizardQuery}` : "");
  const canonicalPath = `/forms/${props.slug}`;
  const canonicalUrl = `${SITE}${canonicalPath}`;

  const webPageSchema = {
    "@type": "WebPage",
    name: props.h1,
    description: props.metaDescription,
    url: canonicalUrl,
    keywords: (props.keywords ?? []).join(", "),
  };
  const howToSchema = {
    "@type": "HowTo",
    name: `How to fill out ${props.tagline.split("•")[0].trim()}`,
    description: props.intro.slice(0, 220),
    totalTime: "PT10M",
    step: props.howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: props.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Legal Forms", item: `${SITE}/forms` },
      { "@type": "ListItem", position: 3, name: props.h1, item: canonicalUrl },
    ],
  };
  const govSchema = props.isGovernmentForm
    ? {
        "@type": "GovernmentService",
        name: props.h1,
        provider: { "@type": "GovernmentOrganization", name: props.governmentAgency },
        serviceType: "Tax form" as const,
        areaServed: { "@type": "Country", name: "United States" },
      }
    : null;

  return (
    <div className="min-h-screen">
      <Head title={props.metaTitle} description={props.metaDescription} />
      <JsonLdGraph
        schemas={[webPageSchema, howToSchema, faqSchema, breadcrumbSchema, govSchema]}
      />

      <div className="container max-w-5xl py-8 px-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: lp("/") },
            { label: "Forms", href: lp("/forms") },
            ...props.breadcrumbTail,
          ]}
        />

        {/* HERO */}
        <header className="mt-4 mb-8">
          <p className="text-sm uppercase tracking-wide text-primary font-semibold">
            {props.tagline}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 leading-tight">
            {props.h1}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{props.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => navigate(wizardHref)}>
              Start filling it out — free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No login required
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-primary" />
                E-signature ready
              </span>
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4 text-primary" />
                Instant PDF
              </span>
            </div>
          </div>
        </header>

        {/* USE CASES */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Who uses this form</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {props.useCases.map((u) => (
              <li key={u} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-none" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* STATE-SPECIFIC RULES */}
        {props.stateBlock && (
          <section className="mb-10">
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-serif text-2xl font-bold mb-2">
                  {props.stateBlock.title}
                </h2>
                {props.stateBlock.statute && (
                  <p className="text-xs text-muted-foreground mb-4 font-mono">
                    Authority: {props.stateBlock.statute}
                  </p>
                )}
                <ul className="space-y-2">
                  {props.stateBlock.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-bold flex-none">§</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}

        {/* HOW TO */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">
            How to fill it out — step by step
          </h2>
          <ol className="space-y-4">
            {props.howToSteps.map((s, i) => (
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

        {/* CTA MID */}
        <section className="mb-10">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Ready to fill it out?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Guided wizard, autosave, e-signature, instant PDF. Free.
                </p>
              </div>
              <Button size="lg" onClick={() => navigate(wizardHref)}>
                Start now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {props.faqs.map((f, i) => (
              <div key={i} className="border-b border-border pb-4">
                <h3 className="font-semibold text-base mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="mb-8 text-xs text-muted-foreground border-t border-border pt-4">
          <p>
            <strong>Legal disclaimer:</strong> LegallySpoken provides self-help legal
            forms and information. We are not a law firm and do not provide legal advice.
            Form templates are general-purpose and may not fit every situation — consult
            a licensed attorney in your jurisdiction for advice on your specific matter.
          </p>
        </section>

        {props.related && props.related.length > 0 && (
          <RelatedIntentStrip
            cluster="Legal forms"
            heading="More free forms in this cluster"
            links={props.related}
          />
        )}
      </div>
    </div>
  );
}
