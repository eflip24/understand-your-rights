import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLegalTermBySlug } from "@/data/legalTermPages";
import ContentPageLayout from "@/components/layout/ContentPageLayout";
import NotFound from "@/pages/NotFound";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLdGraph, definedTermSchema, faqSchema } from "@/components/seo/JsonLd";
import { linkifyLegalContent } from "@/lib/linkifyContent";

export default function LegalTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { t } = useTranslation(["terms", "common"]);
  if (!slug) return <NotFound />;

  const term = getLegalTermBySlug(slug);
  if (!term) return <NotFound />;

  const localizedTerm = t(`terms:${slug}.term`, { defaultValue: term.term });
  const localizedDef = t(`terms:${slug}.definition`, { defaultValue: term.definition });
  const localizedExp = t(`terms:${slug}.explanation`, { defaultValue: term.explanation });
  const localizedExample = t(`terms:${slug}.exampleClause`, { defaultValue: term.exampleClause });

  const url = `https://legallyspoken.com${location.pathname}`;
  const schemas = [
    definedTermSchema(localizedTerm, localizedDef, url),
    ...(term.faqs?.length ? [faqSchema(term.faqs)] : []),
  ];

  const linkedExplanation = linkifyLegalContent(
    localizedExp.split("\n\n").map((p) => `<p>${p}</p>`).join("")
  );

  return (
    <ContentPageLayout
      title={localizedTerm}
      subtitle={localizedDef}
      category={term.category}
      breadcrumbs={[
        { label: t("common:page.legalTerms"), href: "/legal-terms" },
        { label: localizedTerm },
      ]}
      relatedToolIds={term.relatedToolIds}
      relatedTermSlugs={term.relatedTermSlugs}
      faqs={term.faqs}
      metaTitle={`${localizedTerm} — ${t("common:page.definitionExamplesSuffix")}`}
      metaDescription={localizedDef}
    >
      <JsonLdGraph schemas={schemas} />

      {/* Definition Callout */}
      <Card className="bg-accent/5 border-accent/20 mb-8">
        <CardContent className="p-6">
          <p className="text-lg font-medium text-foreground">
            <span className="text-accent font-bold">{t("common:page.definition")}</span> {localizedDef}
          </p>
        </CardContent>
      </Card>

      {/* Explanation */}
      <div className="prose prose-slate max-w-none mb-8">
        <h2 className="text-2xl font-bold mb-4">{t("common:page.whatDoesMean", { term: localizedTerm })}</h2>
        <div
          className="[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: linkedExplanation }}
        />
      </div>

      {/* Example Clause */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{t("common:page.exampleClause")}</h2>
        <blockquote className="border-l-4 border-accent bg-secondary/50 p-4 rounded-r-lg italic text-muted-foreground">
          "{localizedExample}"
        </blockquote>
      </div>
    </ContentPageLayout>
  );
}
