import React, { Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, Landmark, Phone, Globe, FileText, Scale } from "lucide-react";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, breadcrumbSchema, faqSchema, localBusinessSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocalizedPath } from "@/i18n/paths";
import { getStateCourts, COURTS_LAST_VERIFIED } from "@/data/courts/stateCourts";
import { getCityBySlug } from "@/data/locations/cityData";
import { getStateBySlug } from "@/data/locations/stateData";

const LocalMap = React.lazy(() => import("@/components/maps/LocalMap"));

const SITE = "https://legallyspoken.com";

export default function CityCourtPage() {
  const { state, city } = useParams<{ state: string; city: string }>();
  const lp = useLocalizedPath();
  const courts = state ? getStateCourts(state) : undefined;
  const cityInfo = state && city ? getCityBySlug(state, city) : undefined;
  const legal = state ? getStateBySlug(state) : undefined;

  if (!courts || !cityInfo) return <Navigate to={lp("/courts")} replace />;

  const ch = cityInfo.courthouse;

  const faqs = [
    {
      question: `Where is the courthouse in ${cityInfo.name}?`,
      answer: `${ch.name} is located at ${ch.address}${ch.phone ? `, and the clerk's office can be reached on ${ch.phone}` : ""}. Confirm the correct division and courtroom before travelling — larger counties split civil, family and criminal dockets across separate buildings.`,
    },
    {
      question: `Which court handles small claims in ${cityInfo.name}?`,
      answer: `Small claims in ${courts.name} are heard in the ${courts.limitedCourt}, with a cap of ${courts.smallClaimsLimit} and filing fees of ${courts.smallClaimsFee}. Larger civil claims go to the ${courts.trialCourt}.`,
    },
    {
      question: `What should I bring to a hearing in ${cityInfo.name}?`,
      answer: `Photo ID, three copies of every document (judge, other side, you), your written timeline, the contract or policy at issue, proof of what you paid or lost, and proof that the other side was served. Arrive early — most courthouses run airport-style security and phones may be restricted.`,
    },
    {
      question: `Can I file my case online?`,
      answer: courts.eFiling
        ? `${courts.name} uses ${courts.eFiling}. Whether self-represented filers can use it for small claims varies by county — check the clerk's page at ${courts.courtWebsite} first.`
        : `${courts.name} has no single statewide portal for self-represented civil filers. Check the clerk's page at ${courts.courtWebsite}; filing in person or by mail is often required.`,
    },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "US Courts", url: `${SITE}/courts` },
      { name: `${courts.name} Courts`, url: `${SITE}/courts/${courts.slug}` },
      { name: `${cityInfo.name} Courthouse`, url: `${SITE}/courts/${courts.slug}/${cityInfo.slug}` },
    ]),
    localBusinessSchema({
      name: ch.name,
      address: ch.address,
      lat: ch.lat,
      lng: ch.lng,
      url: ch.website || `${SITE}/courts/${courts.slug}/${cityInfo.slug}`,
    }),
    faqSchema(faqs),
  ];

  return (
    <div className="container max-w-4xl py-8">
      <Tier3Head
        title={`${ch.name}, ${cityInfo.name} — Filing, Fees & Contact | LegallySpoken`}
        description={`${ch.name} in ${cityInfo.name}, ${courts.abbr}: address, clerk contact, which court hears your case, ${courts.name} small claims limit ${courts.smallClaimsLimit} and filing fees ${courts.smallClaimsFee}.`}
      />
      <JsonLdGraph schemas={schemas} />

      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp("/courts")} className="hover:text-foreground">US Courts</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp(`/courts/${courts.slug}`)} className="hover:text-foreground">{courts.name}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{cityInfo.name}</span>
      </nav>

      <Badge variant="secondary" className="mb-3">{cityInfo.name}, {courts.abbr}</Badge>
      <h1 className="mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
        {ch.name} — {cityInfo.name} Court Information
      </h1>
      <p className="text-lg text-muted-foreground">
        Address, clerk contact, which court hears your case and what it costs to file in{" "}
        {cityInfo.name}, {courts.name}.
      </p>

      <AuthorByline reviewedAt={COURTS_LAST_VERIFIED} className="my-6" />
      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <Landmark className="h-5 w-5 text-accent" /> Courthouse details
        </h2>
        <div className="rounded-lg border bg-card p-5">
          <h3 className="mb-1 text-lg font-semibold">{ch.name}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{ch.address}</p>
          <div className="flex flex-wrap gap-4">
            {ch.phone && (
              <a href={`tel:${ch.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                <Phone className="h-4 w-4" /> {ch.phone}
              </a>
            )}
            {ch.website && (
              <a href={ch.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                <Globe className="h-4 w-4" /> Court website
              </a>
            )}
            <a href={courts.courtWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
              <Globe className="h-4 w-4" /> {courts.name} judiciary
            </a>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg md:h-[400px]" />}>
          <LocalMap
            center={[ch.lat, ch.lng]}
            markers={[{ position: [ch.lat, ch.lng], title: ch.name, address: ch.address, type: "courthouse" }]}
          />
        </Suspense>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <Scale className="h-5 w-5 text-accent" /> Which court hears your case
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">Your dispute</th>
                <th scope="col" className="px-3 py-2 font-semibold">Court</th>
                <th scope="col" className="px-3 py-2 font-semibold">Cost to start</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t align-top">
                <td className="px-3 py-2">Money claim up to {courts.smallClaimsLimit}</td>
                <td className="px-3 py-2 text-muted-foreground">{courts.limitedCourt}</td>
                <td className="px-3 py-2 text-muted-foreground">{courts.smallClaimsFee}</td>
              </tr>
              <tr className="border-t align-top">
                <td className="px-3 py-2">Eviction or security deposit</td>
                <td className="px-3 py-2 text-muted-foreground">{courts.limitedCourt}</td>
                <td className="px-3 py-2 text-muted-foreground">Varies by county; typically similar to small claims</td>
              </tr>
              <tr className="border-t align-top">
                <td className="px-3 py-2">Injury, malpractice or larger contract claim</td>
                <td className="px-3 py-2 text-muted-foreground">{courts.trialCourt}</td>
                <td className="px-3 py-2 text-muted-foreground">Higher civil filing fee — ask the clerk</td>
              </tr>
              <tr className="border-t align-top">
                <td className="px-3 py-2">Appeal of a trial decision</td>
                <td className="px-3 py-2 text-muted-foreground">{courts.appellateCourt || courts.highestCourt}</td>
                <td className="px-3 py-2 text-muted-foreground">Notice of appeal plus record and transcript costs</td>
              </tr>
            </tbody>
          </table>
        </div>
        {legal && (
          <p className="mt-3 text-sm text-muted-foreground">
            Filing deadlines in {courts.name}: personal injury {legal.personalInjurySOL}, property
            damage {legal.propertyDamageSOL}. Full table in the{" "}
            <Link to={lp("/data/settlement-deadlines")} className="text-accent hover:underline">
              state legal deadlines dataset
            </Link>
            .
          </p>
        )}
      </section>

      <AdSlot slot="mid-content" className="my-8" />

      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <FileText className="h-5 w-5 text-accent" /> Prepare before you go
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Send a written demand first — <Link to={lp("/forms/demand-letter")} className="text-accent hover:underline">build one here</Link>.</li>
          <li>Bring three copies of every exhibit and a one-page chronology of events.</li>
          <li>Confirm the courtroom and division with the clerk the day before; dockets move.</li>
          <li>If you are being evicted, read the <Link to={lp("/forms/eviction-notice")} className="text-accent hover:underline">eviction notice guide</Link> for the notice period that had to be given.</li>
          <li>Need representation? Browse <Link to={lp("/lawyer-near-me")} className="text-accent hover:underline">attorneys near {cityInfo.name}</Link>.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">{cityInfo.name} courthouse FAQs</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.question} className="rounded-lg border bg-card p-4">
              <h3 className="mb-1 font-semibold">{f.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          Courthouse details and {courts.name} filing figures verified {COURTS_LAST_VERIFIED} against{" "}
          {courts.statute} and official judiciary sources. We publish court-level information only —
          not profiles of individual judges. This page is general legal information, not legal advice.
        </p>
      </div>
    </div>
  );
}
