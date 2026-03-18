import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Head from "@/components/seo/Head";
import JsonLd, { itemListSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { practiceAreas, usStates, stateToSlug } from "@/data/localLawyers";

const SITE = "https://legallyspoken.com";

export default function LocalLawyersAreaPage() {
  const { area } = useParams<{ area: string }>();
  const practiceArea = practiceAreas.find((pa) => pa.slug === area);

  if (!practiceArea) return <Navigate to="/local-lawyers" replace />;

  return (
    <div className="container py-8 max-w-4xl">
      <Head
        title={practiceArea.metaTitle}
        description={practiceArea.metaDescription}
      />
      <JsonLd data={itemListSchema(
        practiceArea.title,
        usStates.map((state) => ({
          url: `${SITE}/local-lawyers/${practiceArea.slug}/${stateToSlug(state)}`,
          name: `${practiceArea.shortTitle} Lawyers in ${state}`,
        }))
      )} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE },
        { name: "Find a Lawyer", url: `${SITE}/local-lawyers` },
        { name: practiceArea.shortTitle, url: `${SITE}/local-lawyers/${practiceArea.slug}` },
      ])} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/local-lawyers" className="hover:text-foreground transition-colors">Find a Lawyer</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{practiceArea.shortTitle}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">Attorney Directory</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">{practiceArea.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{practiceArea.description}</p>
      </div>

      {practiceArea.relatedPillarPath && (
        <div className="mb-8 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-sm text-muted-foreground">
            📚 Want to learn more?{" "}
            <Link to={practiceArea.relatedPillarPath} className="text-accent font-medium hover:underline">
              Read our free {practiceArea.shortTitle} law guide →
            </Link>
          </p>
        </div>
      )}

      <AdSlot slot="above-content" className="mb-8" />

      {/* States Grid */}
      <h2 className="text-2xl font-bold mb-4">Browse by State</h2>
      <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-4">
        {usStates.map((state) => (
          <Link key={state} to={`/local-lawyers/${practiceArea.slug}/${stateToSlug(state)}`}>
            <Card className="hover:shadow-sm hover:border-accent/30 transition-all cursor-pointer">
              <CardContent className="p-3 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{state}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mt-4 mb-8">
        State-specific lawyer listings are coming soon. In the meantime, use your state bar association's directory to find qualified attorneys.
      </p>

      <AdSlot slot="end-of-article" className="mb-8" />

      {/* Disclaimer */}
      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This directory is for informational purposes only. Always verify credentials and consult directly with a lawyer.
        </p>
      </div>
    </div>
  );
}
