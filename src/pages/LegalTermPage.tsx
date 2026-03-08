import { useParams } from "react-router-dom";
import { getLegalTermBySlug } from "@/data/legalTermPages";
import ContentPageLayout from "@/components/layout/ContentPageLayout";
import NotFound from "@/pages/NotFound";
import { Card, CardContent } from "@/components/ui/card";

export default function LegalTermPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <NotFound />;

  const term = getLegalTermBySlug(slug);
  if (!term) return <NotFound />;

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
        {term.explanation.split("\n\n").map((para, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
        ))}
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
