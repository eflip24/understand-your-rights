import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLegalClauseBySlug } from "@/data/legalClauses";
import ContentPageLayout from "@/components/layout/ContentPageLayout";
import NotFound from "@/pages/NotFound";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { JsonLdGraph, articleSchema, faqSchema } from "@/components/seo/JsonLd";

export default function LegalClausePage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { t } = useTranslation(["clauses", "common"]);
  if (!slug) return <NotFound />;

  const clause = getLegalClauseBySlug(slug);
  if (!clause) return <NotFound />;

  const title = t(`clauses:${slug}.title`, { defaultValue: clause.title }) as string;
  const explanation = t(`clauses:${slug}.explanation`, { defaultValue: clause.explanation }) as string;

  const url = `https://legallyspoken.com${location.pathname}`;
  const schemas = [
    articleSchema(title, explanation.slice(0, 155), url),
    ...(clause.faqs?.length ? [faqSchema(clause.faqs)] : []),
  ];

  return (
    <ContentPageLayout
      title={title}
      category={clause.category}
      breadcrumbs={[
        { label: t("common:nav.resources.clauses", { defaultValue: "Legal Clauses" }) as string, href: "/legal-clauses" },
        { label: title },
      ]}
      relatedToolIds={clause.relatedToolIds}
      relatedTermSlugs={clause.relatedTermSlugs}
      faqs={clause.faqs}
      metaTitle={`${title} — ${t("common:legalClausePage.metaSuffix", { defaultValue: "Guide & Examples | LegallySpoken" })}`}
      metaDescription={explanation.slice(0, 155) + "..."}
    >
      <JsonLdGraph schemas={schemas} />

      {/* Explanation */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{t("common:legalClausePage.whatIs", { defaultValue: "What Is a {{title}}?", title }) as string}</h2>
        <p className="text-muted-foreground leading-relaxed">{explanation}</p>
      </div>

      {/* Example Clauses */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{t("common:legalClausePage.exampleLanguage", { defaultValue: "Example Clause Language" })}</h2>
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
          <AlertTriangle className="h-5 w-5 text-destructive" /> {t("common:legalClausePage.redFlags", { defaultValue: "Red Flags to Watch For" })}
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
        <h2 className="text-2xl font-bold mb-4">{t("common:legalClausePage.enforceability", { defaultValue: "Enforceability Notes" })}</h2>
        <p className="text-muted-foreground leading-relaxed">{clause.enforceabilityNotes}</p>
      </div>
    </ContentPageLayout>
  );
}
