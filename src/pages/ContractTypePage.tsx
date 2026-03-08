import { useParams, Link, useLocation } from "react-router-dom";
import { getContractTypeBySlug } from "@/data/contractTypes";
import ContentPageLayout from "@/components/layout/ContentPageLayout";
import NotFound from "@/pages/NotFound";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import JsonLd, { articleSchema, faqSchema } from "@/components/seo/JsonLd";

export default function ContractTypePage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <NotFound />;

  const contractType = getContractTypeBySlug(slug);
  if (!contractType) return <NotFound />;

  return (
    <ContentPageLayout
      title={contractType.title}
      category={contractType.category}
      breadcrumbs={[
        { label: "Contract Types", href: "/contract-types" },
        { label: contractType.title },
      ]}
      relatedToolIds={contractType.relatedToolIds}
      relatedClauseSlugs={contractType.keyClauseSlugs}
      faqs={contractType.faqs}
      metaTitle={`${contractType.title} — Guide & Key Clauses | LegallySpoken`}
      metaDescription={contractType.description.slice(0, 155) + "..."}
    >
      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        {contractType.description.split("\n\n").map((para, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
        ))}
      </div>

      {/* Key Clauses */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Clauses Typically Found</h2>
        <div className="flex flex-wrap gap-2">
          {contractType.keyClauseSlugs.map((slug) => (
            <Link key={slug} to={`/legal-clauses/${slug}`}>
              <Badge variant="secondary" className="hover:bg-accent/20 transition-colors cursor-pointer capitalize text-sm py-1.5 px-3">
                {slug.replace(/-clause$/, "").replace(/-/g, " ")}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Common Risks */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" /> Common Risks
        </h2>
        <Card className="border-destructive/20">
          <CardContent className="p-6">
            <ul className="space-y-2">
              {contractType.commonRisks.map((risk, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-destructive font-bold mt-0.5">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </ContentPageLayout>
  );
}
