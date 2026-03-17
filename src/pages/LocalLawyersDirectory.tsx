import { Link } from "react-router-dom";
import { ChevronRight, Users, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Head from "@/components/seo/Head";
import JsonLd, { itemListSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { practiceAreas } from "@/data/localLawyers";

const SITE = "https://legallyspoken.com";

export default function LocalLawyersDirectory() {
  return (
    <div className="container py-8 max-w-4xl">
      <Head
        title="Find a Lawyer Near You — Free Attorney Directory | LegallySpoken"
        description="Browse verified lawyers by practice area. Find personal injury, car accident, employment, insurance, and other lawyers near you."
      />
      <JsonLd data={itemListSchema(
        "Local Lawyers Directory",
        practiceAreas.map((pa) => ({ url: `${SITE}/local-lawyers/${pa.slug}`, name: pa.title }))
      )} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE },
        { name: "Find a Lawyer", url: `${SITE}/local-lawyers` },
      ])} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Find a Lawyer</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">Attorney Directory</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">Find a Lawyer Near You</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Browse our free attorney directory by practice area. Find the right lawyer for your legal needs.
        </p>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Practice Areas Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {practiceAreas.map((area) => (
          <Link key={area.slug} to={`/local-lawyers/${area.slug}`}>
            <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all group">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-base">{area.shortTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{area.description}</p>
                <span className="text-xs text-accent font-medium inline-flex items-center gap-1">
                  Find lawyers <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <AdSlot slot="end-of-article" className="mt-8" />

      {/* Disclaimer */}
      <div className="border-t pt-6 mt-8">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This directory is for informational purposes only. LegallySpoken does not endorse any specific attorney.
          Always verify credentials and consult directly with a lawyer before hiring.
        </p>
      </div>
    </div>
  );
}
