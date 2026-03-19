import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Head from "@/components/seo/Head";
import JsonLd, { articleSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import SmartLocalLink from "@/components/seo/SmartLocalLink";
import { tools } from "@/data/tools";
import type { PillarData } from "@/data/autoAccidentLaw";

interface PillarPageProps {
  data: PillarData;
}

const PILLAR_PAGES = [
  { path: "/auto-accident-law", label: "Auto Accident Law" },
  { path: "/personal-injury-law", label: "Personal Injury Law" },
  { path: "/insurance-law", label: "Insurance Law" },
];

const POPULAR_TOOL_IDS = ["settlement-estimator", "accident-damage", "insurance-premium", "insurance-quote-comparison"];

export default function PillarPage({ data }: PillarPageProps) {
  const SITE = "https://legallyspoken.com";

  const relatedPillars = PILLAR_PAGES.filter((p) => p.path !== data.basePath);
  const popularTools = tools.filter((t) => POPULAR_TOOL_IDS.includes(t.id));

  return (
    <div className="container py-8 max-w-4xl">
      <Head
        title={data.pillarMetaTitle}
        description={data.pillarMetaDescription}
      />
      <JsonLd data={articleSchema(data.pillarTitle, data.pillarMetaDescription, `${SITE}${data.basePath}`)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE },
        { name: data.category, url: `${SITE}${data.basePath}` },
      ])} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{data.category}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">{data.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">{data.pillarTitle}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{data.pillarIntro}</p>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Table of Contents */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">In This Guide</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.clusters.map((cluster, i) => (
            <Link key={cluster.slug} to={`${data.basePath}/${cluster.slug}`}>
              <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all group">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      {i + 1}
                    </span>
                    {cluster.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{cluster.metaDescription}</p>
                  <span className="text-xs text-accent font-medium mt-2 inline-flex items-center gap-1">
                    Read more <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tools */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Popular Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularTools.map((tool) => (
            <Link key={tool.id} to={`/tools/${tool.category}/${tool.slug}`}>
              <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <tool.icon className="h-4 w-4 text-accent" />
                    <CardTitle className="text-sm">{tool.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground line-clamp-2">{tool.shortDescription}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Related Guides */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Related Guides</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {relatedPillars.map((pillar) => (
            <Link key={pillar.path} to={pillar.path}>
              <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all group">
                <CardContent className="p-6 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{pillar.label}</p>
                    <p className="text-sm text-muted-foreground">Read the complete guide</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Smart Local Link */}
      <div className="mb-10">
        <SmartLocalLink category={data.category} />
      </div>

      <AdSlot slot="end-of-article" className="mb-8" />

      {/* Disclaimer */}
      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This content is for informational purposes only and does not constitute legal advice.
          Always consult a qualified attorney for legal questions specific to your situation.
        </p>
      </div>
    </div>
  );
}
