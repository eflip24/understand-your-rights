import { useParams } from "react-router-dom";
import { getLegalClauseBySlug } from "@/data/legalClauses";
import ContentPageLayout from "@/components/layout/ContentPageLayout";
import NotFound from "@/pages/NotFound";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function LegalClausePage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <NotFound />;

  const clause = getLegalClauseBySlug(slug);
  if (!clause) return <NotFound />;

  return (
    <ContentPageLayout
      title={clause.title}
      category={clause.category}
      breadcrumbs={[
        { label: "Legal Clauses", href: "/legal-clauses" },
        { label: clause.title },
      ]}
      relatedToolIds={clause.relatedToolIds}
      relatedTermSlugs={clause.relatedTermSlugs}
      faqs={clause.faqs}
      metaTitle={`${clause.title} — Guide & Examples | LegallySpoken`}
      metaDescription={clause.explanation.slice(0, 155) + "..."}
    >
      {/* Explanation */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What Is a {clause.title}?</h2>
        <p className="text-muted-foreground leading-relaxed">{clause.explanation}</p>
      </div>

      {/* Example Clauses */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Example Clause Language</h2>
        <div className="space-y-4">
          {clause.exampleClauses.map((ex, i) => (
            <blockquote key={i} className="border-l-4 border-accent bg-secondary/50 p-4 rounded-r-lg italic text-muted-foreground text-sm">
              "{ex}"
            </blockquote>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" /> Red Flags to Watch For
        </h2>
        <Card className="border-destructive/20">
          <CardContent className="p-6">
            <ul className="space-y-2">
              {clause.redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-destructive font-bold mt-0.5">•</span>
                  {flag}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Enforceability */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Enforceability Notes</h2>
        <p className="text-muted-foreground leading-relaxed">{clause.enforceabilityNotes}</p>
      </div>
    </ContentPageLayout>
  );
}
