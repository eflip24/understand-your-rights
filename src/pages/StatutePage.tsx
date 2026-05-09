import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, ExternalLink, Scale } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema, faqSchema, articleSchema } from "@/components/seo/JsonLd";
import { statuteTopicsBySlug, getStatuteValues, allStateNames, statuteTopics } from "@/data/statutes";
import { getStateBySlug } from "@/data/locations/stateData";
import { tools } from "@/data/tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function StatutePage() {
  const { state: stateSlug = "", topic: topicSlug = "" } = useParams();
  const topic = statuteTopicsBySlug[topicSlug];
  const stateInfo = getStateBySlug(stateSlug);

  if (!topic || !stateInfo) return <Navigate to="/laws" replace />;

  const stateName = stateInfo.name;
  const values = getStatuteValues(topic, stateSlug);
  const url = `https://legallyspoken.com/laws/${stateSlug}/${topicSlug}`;
  const title = topic.title(stateName);
  const description = `${topic.shortLabel} in ${stateName}: ${topic.fields.map((f) => `${f.label} — ${values[f.key]}`).join("; ")}.`;
  const reviewedDate = new Date().toISOString().split("T")[0];

  const relatedTools = tools.filter((t) => topic.relatedToolIds.includes(t.id));
  const otherTopicsForState = statuteTopics.filter((t) => t.slug !== topicSlug);

  return (
    <div className="container py-8 max-w-4xl">
      <Head title={`${title} | LegallySpoken`} description={description} />
      <JsonLdGraph
        schemas={[
          breadcrumbSchema([
            { name: "Home", url: "https://legallyspoken.com/" },
            { name: "Statute Library", url: "https://legallyspoken.com/laws" },
            { name: stateName, url: `https://legallyspoken.com/laws/${stateSlug}/${topicSlug}` },
            { name: topic.shortLabel, url },
          ]),
          articleSchema(title, description, url),
          faqSchema(topic.faqs(stateName)),
        ]}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/laws" className="hover:text-foreground">Statute Library</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{stateName} — {topic.shortLabel}</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{topic.category}</Badge>
          <Badge variant="outline">{stateName}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground">{topic.intro}</p>
      </div>

      {/* Key facts table */}
      <Card className="mb-8 border-accent/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="h-4 w-4 text-accent" /> {stateName} at a glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid sm:grid-cols-2 gap-4">
            {topic.fields.map((f) => (
              <div key={f.key} className="border-b border-border pb-2">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{f.label}</dt>
                <dd className="font-semibold">{values[f.key]}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* Body */}
      <div className="prose prose-sm max-w-none mb-8 text-foreground">
        <p>{topic.body(stateName, values).split("**").map((chunk, i) => (i % 2 === 1 ? <strong key={i}>{chunk}</strong> : <span key={i}>{chunk}</span>))}</p>
      </div>

      {/* Source */}
      <Card className="mb-8 bg-secondary/40">
        <CardContent className="p-4 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Official source</p>
            <p className="text-sm font-medium">{topic.sourceLabel}</p>
            <p className="text-xs text-muted-foreground mt-1">Last reviewed: {reviewedDate}</p>
          </div>
          <a
            href={topic.sourceUrl(stateName)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-sm text-accent hover:underline inline-flex items-center gap-1"
          >
            View statute <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </CardContent>
      </Card>

      {/* FAQs */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {topic.faqs(stateName).map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Related Free Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedTools.map((t) => (
              <Link key={t.id} to={`/tools/${t.category}/${t.slug}`}>
                <Card className="h-full hover:border-accent/40 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <t.icon className="h-4 w-4 text-accent" />
                      <span className="font-semibold text-sm">{t.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.shortDescription}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* More topics for this state */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3">More {stateName} laws</h2>
        <div className="flex flex-wrap gap-2">
          {otherTopicsForState.map((t) => (
            <Link
              key={t.slug}
              to={`/laws/${stateSlug}/${t.slug}`}
              className="text-sm px-3 py-1.5 rounded border border-border hover:border-accent hover:bg-accent/5 transition-colors"
            >
              {t.shortLabel}
            </Link>
          ))}
        </div>
      </div>

      {/* Same topic, other states */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-3">{topic.shortLabel} in other states</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.entries(allStateNames).filter(([slug]) => slug !== stateSlug).slice(0, 15).map(([slug, name]) => (
            <Link
              key={slug}
              to={`/laws/${slug}/${topicSlug}`}
              className="text-sm px-2 py-1 rounded hover:text-accent transition-colors"
            >
              {name}
            </Link>
          ))}
          <Link to="/laws" className="text-sm px-2 py-1 text-accent hover:underline">View all →</Link>
        </div>
      </div>

      <p className="text-xs text-muted-foreground border-t pt-6">
        <strong>Disclaimer:</strong> This is general legal information, not legal advice. State statutes change frequently — verify current rules with the official source above or consult a licensed attorney in {stateName}.
      </p>
    </div>
  );
}
