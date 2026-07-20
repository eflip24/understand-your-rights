import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowRight,
  HeartPulse,
  Car,
  HardHat,
  Briefcase,
  ShieldAlert,
  Home,
  HeartHandshake,
  Wallet,
  Gavel,
  Globe2,
  Truck,
  Stethoscope,
  Users,
  ShieldCheck,
  Sparkles,
  Scale,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, itemListSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { practiceAreas } from "@/data/localLawyers";
import { stateData } from "@/data/locations/stateData";
import { useLocalizedPath } from "@/i18n/paths";
import LawyerDirectoryHero from "@/components/lawyers/LawyerDirectoryHero";
import LawyerSituationTiles from "@/components/lawyers/LawyerSituationTiles";

const SITE = "https://legallyspoken.com";

const AREA_ICONS: Record<string, LucideIcon> = {
  "personal-injury": HeartPulse,
  "car-accident": Car,
  "workers-compensation": HardHat,
  employment: Briefcase,
  "insurance-dispute": ShieldAlert,
  "real-estate": Home,
  "family-law": HeartHandshake,
  bankruptcy: Wallet,
  "criminal-defense": Gavel,
  immigration: Globe2,
  "truck-accident": Truck,
  "medical-malpractice": Stethoscope,
};

export default function LocalLawyersDirectory() {
  const lp = useLocalizedPath();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return practiceAreas;
    return practiceAreas.filter(
      (a) =>
        a.shortTitle.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="container py-10">
      <Tier3Head
        title="Find a Lawyer Near You — Free Attorney Directory | LegallySpoken"
        description="Browse verified lawyers by practice area. Find personal injury, car accident, employment, insurance, and other lawyers near you."
      />
      <JsonLdGraph
        schemas={[
          itemListSchema(
            "Local Lawyers Directory",
            practiceAreas.map((pa) => ({ url: `${SITE}/lawyer-near-me/${pa.slug}`, name: pa.title })),
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Find a Lawyer", url: `${SITE}/lawyer-near-me` },
          ]),
        ]}
      />

      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link to={lp("/")} className="transition-colors hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Find a Lawyer</span>
      </nav>

      <LawyerDirectoryHero query={query} onQueryChange={setQuery} totalAreas={practiceAreas.length} />

      <LawyerSituationTiles />

      <AdSlot slot="above-content" className="my-10" />

      {/* Practice Areas Grid */}
      <section className="mt-4">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">Browse by practice area</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} of {practiceAreas.length} areas
              {query ? ` matching "${query}"` : ""}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
            <p className="mb-1 text-lg font-semibold">No practice areas match that search</p>
            <p className="text-sm text-muted-foreground">
              Try another keyword, or{" "}
              <button onClick={() => setQuery("")} className="text-accent underline-offset-2 hover:underline">
                clear the search
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((area) => {
              const Icon = AREA_ICONS[area.slug] ?? Users;
              return (
                <div
                  key={area.slug}
                  className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg focus-within:ring-2 focus-within:ring-accent"
                >
                  <Link
                    to={lp(`/lawyer-near-me/${area.slug}`)}
                    className="absolute inset-0 rounded-xl focus:outline-none"
                    aria-label={`Browse ${area.shortTitle} lawyers`}
                  />
                  <div className="relative flex items-start gap-3">
                    <div className="rounded-lg bg-accent/10 p-2.5 text-accent ring-1 ring-accent/20 transition-all group-hover:bg-accent/15 group-hover:ring-accent/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Practice Area
                      </span>
                      <h3 className="mt-0.5 font-serif text-base font-bold leading-tight text-foreground">
                        {area.shortTitle}
                      </h3>
                    </div>
                  </div>
                  <p className="relative mt-3 flex-1 text-sm text-muted-foreground">{area.description}</p>
                  <div className="relative mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Free consult · No obligation
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-foreground/70 transition-colors group-hover:text-accent">
                      Browse lawyers
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  {area.relatedPillarPath && (
                    <Link
                      to={lp(area.relatedPillarPath)}
                      className="relative mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/70 transition hover:border-accent/50 hover:text-accent"
                    >
                      <BookOpen className="h-3 w-3" /> Read the law guide
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* State chooser */}
      <section aria-labelledby="lawyer-state-heading" className="mt-14">
        <div className="mb-4">
          <h2 id="lawyer-state-heading" className="font-serif text-2xl font-bold md:text-3xl">
            Browse lawyers by state
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Jump straight to state-specific listings and legal rules.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {stateData.map((s) => (
            <Link
              key={s.slug}
              to={lp(`/lawyer-near-me/personal-injury/${s.slug}`)}
              title={s.name}
              className="rounded-lg border border-border bg-background px-2 py-2 text-center text-sm font-semibold text-foreground/80 shadow-sm transition hover:border-accent/50 hover:text-accent"
            >
              {s.abbreviation}
            </Link>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="mt-14 grid gap-4 rounded-2xl border border-border bg-muted/20 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: ShieldCheck, title: "Attorney-verified", desc: "Listings reviewed for credentials." },
          { Icon: Sparkles, title: "Free consultations", desc: "Most attorneys offer a free first call." },
          { Icon: Scale, title: "50-state coverage", desc: "Lawyers and rules in every U.S. state." },
          { Icon: Users, title: "No referral fees", desc: "We don't take a cut of your case." },
        ].map(({ Icon, title, desc }) => (
          <Card key={title} className="flex items-start gap-3 border-0 bg-background/60 p-4 shadow-none">
            <div className="rounded-lg bg-accent/10 p-2 text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
          </Card>
        ))}
      </section>

      <AdSlot slot="end-of-article" className="mt-10" />

      {/* Disclaimer */}
      <div className="mt-10 rounded-xl border border-border bg-muted/20 p-5">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> This directory is for
          informational purposes only. LegallySpoken does not endorse any specific attorney. Always
          verify credentials and consult directly with a lawyer before hiring.
        </p>
      </div>
    </div>
  );
}
