import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { practiceAreas } from "@/data/localLawyers";
import { getStateBySlug, stateData } from "@/data/locations/stateData";
import { getCitiesByState } from "@/data/locations/cityData";

const SITE = "https://legallyspoken.com";

export default function LocalLawyersStatePage() {
  const { area, state } = useParams<{ area: string; state: string }>();
  const practiceArea = practiceAreas.find((pa) => pa.slug === area);
  const stateInfo = state ? getStateBySlug(state) : undefined;

  if (!practiceArea || !stateInfo) return <Navigate to="/lawyer-near-me" replace />;

  const cities = getCitiesByState(stateInfo.slug);

  const negligenceLabel = stateInfo.negligenceRule === "contributory"
    ? "Contributory negligence (any fault bars recovery)"
    : stateInfo.negligenceRule === "pure comparative"
    ? "Pure comparative negligence"
    : `Modified comparative negligence (${stateInfo.negligenceRule.includes("50%") ? "50%" : "51%"} bar)`;

  return (
    <div className="container py-8 max-w-4xl">
      <Head
        title={`${practiceArea.shortTitle} Lawyers in ${stateInfo.name} | LegallySpoken`}
        description={`Find ${practiceArea.shortTitle.toLowerCase()} lawyers in ${stateInfo.name}. ${stateInfo.name} statute of limitations: ${stateInfo.personalInjurySOL}. Free courthouse info and settlement calculator.`}
      />
      <JsonLdGraph schemas={[
        breadcrumbSchema([
          { name: "Home", url: SITE },
          { name: "Find a Lawyer", url: `${SITE}/lawyer-near-me` },
          { name: practiceArea.shortTitle, url: `${SITE}/lawyer-near-me/${practiceArea.slug}` },
          { name: stateInfo.name, url: `${SITE}/lawyer-near-me/${practiceArea.slug}/${stateInfo.slug}` },
        ]),
        cities.length > 0 ? itemListSchema(
          `${practiceArea.shortTitle} Lawyers in ${stateInfo.name}`,
          cities.map((c) => ({
            url: `${SITE}/lawyer-near-me/${practiceArea.slug}/${stateInfo.slug}/${c.slug}`,
            name: `${practiceArea.shortTitle} Lawyers in ${c.name}`,
          }))
        ) : null,
      ]} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/lawyer-near-me" className="hover:text-foreground transition-colors">Find a Lawyer</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/lawyer-near-me/${practiceArea.slug}`} className="hover:text-foreground transition-colors">{practiceArea.shortTitle}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{stateInfo.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">{stateInfo.abbreviation} Attorney Directory</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          {practiceArea.shortTitle} Lawyers in {stateInfo.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Find qualified {practiceArea.shortTitle.toLowerCase()} attorneys in {stateInfo.name}. Understand your rights under {stateInfo.name} law.
        </p>
      </div>

      {/* State Legal Summary */}
      <div className="rounded-lg border bg-card p-5 mb-8 space-y-3">
        <h2 className="text-xl font-semibold text-foreground">{stateInfo.name} Legal Overview</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-md bg-muted">
            <p className="text-sm text-muted-foreground">Personal Injury Statute of Limitations</p>
            <p className="text-lg font-bold text-foreground">{stateInfo.personalInjurySOL}</p>
          </div>
          <div className="p-3 rounded-md bg-muted">
            <p className="text-sm text-muted-foreground">Property Damage SOL</p>
            <p className="text-lg font-bold text-foreground">{stateInfo.propertyDamageSOL}</p>
          </div>
          <div className="p-3 rounded-md bg-muted">
            <p className="text-sm text-muted-foreground">Negligence Rule</p>
            <p className="text-sm font-semibold text-foreground">{negligenceLabel}</p>
          </div>
          <div className="p-3 rounded-md bg-muted">
            <p className="text-sm text-muted-foreground">Min. Auto Insurance</p>
            <p className="text-lg font-bold text-foreground">{stateInfo.minAutoInsurance}</p>
            {stateInfo.noFault && <Badge variant="outline" className="mt-1 text-xs">No-Fault State</Badge>}
          </div>
        </div>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Cities Grid */}
      {cities.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Browse by City</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {cities.map((city) => (
              <Link key={city.slug} to={`/lawyer-near-me/${practiceArea.slug}/${stateInfo.slug}/${city.slug}`}>
                <Card className="hover:shadow-sm hover:border-accent/30 transition-all cursor-pointer">
                  <CardContent className="p-3 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{city.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-lg border bg-muted/50 p-6 text-center mb-8">
          <p className="text-muted-foreground">City-specific pages for {stateInfo.name} are coming soon. In the meantime, use your state bar association's directory to find qualified attorneys.</p>
        </div>
      )}

      {practiceArea.relatedPillarPath && (
        <div className="mt-8 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-sm text-muted-foreground">
            📚 Want to learn more?{" "}
            <Link to={practiceArea.relatedPillarPath} className="text-accent font-medium hover:underline">
              Read our free {practiceArea.shortTitle} law guide →
            </Link>
          </p>
        </div>
      )}

      <AdSlot slot="end-of-article" className="my-8" />

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This directory is for informational purposes only. Legal data is general guidance and may not reflect recent changes. Always verify with a licensed attorney.
        </p>
      </div>
    </div>
  );
}
