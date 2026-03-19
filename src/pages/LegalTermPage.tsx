import { useParams, useLocation } from "react-router-dom";
import { getLegalTermBySlug } from "@/data/legalTermPages";
import ContentPageLayout from "@/components/layout/ContentPageLayout";
import NotFound from "@/pages/NotFound";
import { Card, CardContent } from "@/components/ui/card";
import JsonLd, { definedTermSchema, faqSchema } from "@/components/seo/JsonLd";
import { linkifyLegalContent } from "@/lib/linkifyContent";

export default function LegalTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  if (!slug) return <NotFound />;

  const term = getLegalTermBySlug(slug);
  if (!term) return <NotFound />;

  const url = `https://legallyspoken.com${location.pathname}`;
  const schemas = [
    definedTermSchema(term.term, term.definition, url),
    ...(term.faqs?.length ? [faqSchema(term.faqs)] : []),
  ].filter(Boolean);

  const linkedExplanation = linkifyLegalContent(
    term.explanation.split("\n\n").map((p) => `<p>${p}</p>`).join("")
  );

  return (
    <ContentPageLayout
      title={term.term}
      subtitle={term.definition}
      category={term.category}
      breadcrumbs={[
        { label: "Legal Terms", href: "/legal-terms" },
        { label: term.term },
      ]}
      relatedToolIds={term.relatedToolIds}
      relatedTermSlugs={term.relatedTermSlugs}
      faqs={term.faqs}
      metaTitle={`${term.term} — Definition & Examples | LegallySpoken`}
      metaDescription={term.definition}
    >
      {schemas.map((s, i) => <JsonLd key={i} data={s as Record<string, unknown>} />)}

      {/* Definition Callout */}
      <Card className="bg-accent/5 border-accent/20 mb-8">
        <CardContent className="p-6">
          <p className="text-lg font-medium text-foreground">
            <span className="text-accent font-bold">Definition:</span> {term.definition}
          </p>
        </CardContent>
      </Card>

      {/* Explanation */}
      <div className="prose prose-slate max-w-none mb-8">
        <h2 className="text-2xl font-bold mb-4">What Does "{term.term}" Mean?</h2>
        <div
          className="[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: linkedExplanation }}
        />
      </div>

      {/* Example Clause */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Example Clause</h2>
        <blockquote className="border-l-4 border-accent bg-secondary/50 p-4 rounded-r-lg italic text-muted-foreground">
          "{term.exampleClause}"
        </blockquote>
      </div>
    </ContentPageLayout>
  );
}
