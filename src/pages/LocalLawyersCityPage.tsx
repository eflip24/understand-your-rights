import React, { Suspense } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, MapPin, Scale, Clock, Shield, Phone, Globe, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema, localBusinessSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { practiceAreas } from "@/data/localLawyers";
import { getStateBySlug } from "@/data/locations/stateData";
import { getCityBySlug } from "@/data/locations/cityData";
import { getLawyerListings } from "@/data/locations/lawyerListings";
import type { MapMarker } from "@/components/maps/LocalMap";
import SettlementEstimator from "@/components/tools/SettlementEstimator";

const LocalMap = React.lazy(() => import("@/components/maps/LocalMap"));

const SITE = "https://legallyspoken.com";

export default function LocalLawyersCityPage() {
  const { area, state, city } = useParams<{ area: string; state: string; city: string }>();
  const practiceArea = practiceAreas.find((pa) => pa.slug === area);
  const stateInfo = state ? getStateBySlug(state) : undefined;
  const cityInfo = state && city ? getCityBySlug(state, city) : undefined;

  if (!practiceArea || !stateInfo || !cityInfo) return <Navigate to="/lawyer-near-me" replace />;

  const lawyers = getLawyerListings(stateInfo.slug, cityInfo.slug);

  const negligenceLabel = stateInfo.negligenceRule === "contributory"
    ? "contributory negligence (any fault bars recovery)"
    : stateInfo.negligenceRule === "pure comparative"
    ? "pure comparative negligence"
    : `modified comparative negligence (${stateInfo.negligenceRule.includes("50%") ? "50%" : "51%"} bar)`;

  const pageTitle = `${practiceArea.shortTitle} Lawyers in ${cityInfo.name}, ${stateInfo.abbreviation}`;

  // Build map markers
  const mapMarkers: MapMarker[] = [
    {
      position: [cityInfo.courthouse.lat, cityInfo.courthouse.lng],
      title: cityInfo.courthouse.name,
      address: cityInfo.courthouse.address,
      type: "courthouse",
    },
    ...lawyers.map((l) => ({
      position: [l.lat, l.lng] as [number, number],
      title: l.name,
      address: l.address,
      type: "lawyer" as const,
    })),
  ];

  // JSON-LD schemas
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "Find a Lawyer", url: `${SITE}/lawyer-near-me` },
      { name: practiceArea.shortTitle, url: `${SITE}/lawyer-near-me/${practiceArea.slug}` },
      { name: stateInfo.name, url: `${SITE}/lawyer-near-me/${practiceArea.slug}/${stateInfo.slug}` },
      { name: cityInfo.name, url: `${SITE}/lawyer-near-me/${practiceArea.slug}/${stateInfo.slug}/${cityInfo.slug}` },
    ]),
    localBusinessSchema({
      name: cityInfo.courthouse.name,
      address: cityInfo.courthouse.address,
      lat: cityInfo.courthouse.lat,
      lng: cityInfo.courthouse.lng,
      url: `${SITE}/lawyer-near-me/${practiceArea.slug}/${stateInfo.slug}/${cityInfo.slug}`,
    }),
    ...lawyers.map((l) =>
      localBusinessSchema({
        name: l.name,
        address: l.address,
        lat: l.lat,
        lng: l.lng,
        url: l.website || `${SITE}/lawyer-near-me/${practiceArea.slug}/${stateInfo.slug}/${cityInfo.slug}`,
      })
    ),
  ];

  return (
    <div className="container py-8 max-w-4xl">
      <Head
        title={`${pageTitle} | LegallySpoken`}
        description={`Find ${practiceArea.shortTitle.toLowerCase()} lawyers in ${cityInfo.name}, ${stateInfo.name}. ${stateInfo.name} statute of limitations: ${stateInfo.personalInjurySOL}. Free local courthouse info and settlement calculator.`}
      />
      <JsonLdGraph schemas={schemas} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/lawyer-near-me" className="hover:text-foreground transition-colors">Find a Lawyer</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/lawyer-near-me/${practiceArea.slug}`} className="hover:text-foreground transition-colors">{practiceArea.shortTitle}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/lawyer-near-me/${practiceArea.slug}/${stateInfo.slug}`} className="hover:text-foreground transition-colors">{stateInfo.name}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{cityInfo.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">{cityInfo.name}, {stateInfo.abbreviation}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
          {pageTitle}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Connect with experienced {practiceArea.shortTitle.toLowerCase()} attorneys in {cityInfo.name}. Get local courthouse information and estimate your potential settlement.
        </p>
      </div>

      <AdSlot slot="above-content" className="mb-8" />

      {/* Section 1 — Featured Law Firms */}
      {lawyers.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-accent" />
            Featured Law Firms in {cityInfo.name}
          </h2>
          <div className="grid gap-4">
            {lawyers.map((lawyer, idx) => {
              const isRelevant = lawyer.practiceAreas.some(
                (pa) => practiceArea.shortTitle.toLowerCase().includes(pa.toLowerCase()) || pa.toLowerCase().includes(practiceArea.shortTitle.toLowerCase())
              );
              return (
                <div key={idx} className="rounded-lg border bg-card p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-foreground">{lawyer.name}</h3>
                    {isRelevant && (
                      <Badge variant="default" className="self-start text-xs shrink-0">Relevant to {practiceArea.shortTitle}</Badge>
                    )}
                  </div>
                  {lawyer.description && (
                    <p className="text-sm text-muted-foreground mb-3">{lawyer.description}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {lawyer.address}
                  </div>
                  <div className="flex flex-wrap gap-4 mb-3">
                    {lawyer.phone && (
                      <a
                        href={`tel:${lawyer.phone.replace(/[^+\d]/g, "")}`}
                        className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {lawyer.phone}
                      </a>
                    )}
                    {lawyer.website && (
                      <a
                        href={lawyer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                      >
                        <Globe className="h-4 w-4" />
                        Visit Website
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {lawyer.practiceAreas.map((pa) => (
                      <Badge key={pa} variant="outline" className="text-xs">{pa}</Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Section 2 — Legal Context */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Scale className="h-5 w-5 text-accent" />
          {practiceArea.shortTitle} Claims in {cityInfo.name}
        </h2>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p>
            Filing a {practiceArea.shortTitle.toLowerCase()} claim in {cityInfo.name} requires understanding {stateInfo.name} law.
            The statute of limitations for personal injury cases in {stateInfo.name} is <strong>{stateInfo.personalInjurySOL}</strong>,
            and for property damage it is <strong>{stateInfo.propertyDamageSOL}</strong>.
          </p>
          <p>
            {stateInfo.name} follows <strong>{negligenceLabel}</strong> rules.
            {stateInfo.negligenceRule === "contributory"
              ? " This means if you are found even 1% at fault, you may be barred from recovering damages. Having an experienced attorney is critical in contributory negligence states."
              : stateInfo.negligenceRule === "pure comparative"
              ? " This means your compensation is reduced by your percentage of fault, but you can still recover even if you are primarily at fault."
              : ` This means you can recover damages only if your fault is less than ${stateInfo.negligenceRule.includes("50%") ? "50%" : "51%"}.`
            }
          </p>
          <p>
            {stateInfo.name} requires minimum auto insurance coverage of <strong>{stateInfo.minAutoInsurance}</strong> (bodily injury per person / per accident / property damage).
            {stateInfo.noFault && ` As a no-fault state, ${stateInfo.name} requires drivers to carry Personal Injury Protection (PIP) coverage, and minor injury claims go through your own insurance first.`}
          </p>
        </div>
      </section>

      {/* Section 3 — Local Courthouse */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-accent" />
          Local Courthouse — {cityInfo.name}
        </h2>
        <div className="rounded-lg border bg-card p-4 mb-4">
          <h3 className="font-semibold text-foreground mb-1">{cityInfo.courthouse.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{cityInfo.courthouse.address}</p>
          <div className="flex flex-wrap gap-4">
            {cityInfo.courthouse.phone && (
              <a
                href={`tel:${cityInfo.courthouse.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                <Phone className="h-4 w-4" />
                {cityInfo.courthouse.phone}
              </a>
            )}
            {cityInfo.courthouse.website && (
              <a
                href={cityInfo.courthouse.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                <Globe className="h-4 w-4" />
                Official Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Section 4 — Map with all markers */}
      <section className="mb-8">
        <Suspense fallback={<Skeleton className="h-[300px] md:h-[400px] w-full rounded-lg" />}>
          <LocalMap
            center={[cityInfo.courthouse.lat, cityInfo.courthouse.lng]}
            markers={mapMarkers}
          />
        </Suspense>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-blue-500" /> Courthouse</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-green-500" /> Law Firm</span>
        </div>
      </section>

      <AdSlot slot="mid-content" className="my-8" />

      {/* Section 5 — Settlement Estimator */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" />
          Estimate Your Settlement Value
        </h2>
        <p className="text-muted-foreground mb-4">
          Use our free settlement estimator to get a rough idea of what your {practiceArea.shortTitle.toLowerCase()} case in {cityInfo.name}, {stateInfo.abbreviation} might be worth.
        </p>
        <div className="rounded-lg border bg-card p-4 md:p-6">
          <SettlementEstimator />
        </div>
      </section>

      {/* Key Facts */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-accent" />
          Key Legal Facts for {stateInfo.name}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Personal Injury SOL</p>
            <p className="text-xl font-bold text-foreground">{stateInfo.personalInjurySOL}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Property Damage SOL</p>
            <p className="text-xl font-bold text-foreground">{stateInfo.propertyDamageSOL}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Negligence Rule</p>
            <p className="text-sm font-semibold text-foreground capitalize">{stateInfo.negligenceRule}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Min. Auto Insurance</p>
            <p className="text-xl font-bold text-foreground">{stateInfo.minAutoInsurance}</p>
            {stateInfo.noFault && <Badge variant="outline" className="mt-1 text-xs">No-Fault State</Badge>}
          </div>
        </div>
      </section>

      {practiceArea.relatedPillarPath && (
        <div className="mb-8 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-sm text-muted-foreground">
            Want to learn more about {practiceArea.shortTitle.toLowerCase()} law?{" "}
            <Link to={practiceArea.relatedPillarPath} className="text-accent font-medium hover:underline">
              Read our comprehensive guide →
            </Link>
          </p>
        </div>
      )}

      <AdSlot slot="end-of-article" className="my-8" />

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This page is for informational purposes only and does not constitute legal advice.
          Statute of limitations and legal rules may have exceptions. Always consult with a licensed attorney in {stateInfo.name} for advice about your specific situation.
        </p>
      </div>
    </div>
  );
}
