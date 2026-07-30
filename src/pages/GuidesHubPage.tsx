import { Link } from "react-router-dom";
import { ChevronRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Tier3Head from "@/components/seo/Tier3Head";
import { JsonLdGraph, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import { useLocalizedPath } from "@/i18n/paths";
import { guideGroups, allGuides } from "@/data/guideIndex";

const SITE = "https://legallyspoken.com";

export default function GuidesHubPage() {
  const lp = useLocalizedPath();

  return (
    <div className="container py-8 max-w-6xl">
      <Tier3Head
        title="Legal Guides — Settlements, Claim Denials & Benefits | LegallySpoken"
        description="Every LegallySpoken guide in one place: injury settlement values, insurance claim denials, disability and workers' comp appeals, bankruptcy comparisons, mass torts, and DUI penalties by state."
      />
      <JsonLdGraph
        schemas={[
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Guides", url: `${SITE}/guides` },
          ]),
          itemListSchema(
            "LegallySpoken legal guides",
            allGuides.map((g) => ({ name: g.title, url: `${SITE}${g.path}` })),
          ),

        ]}
      />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to={lp("/")} className="hover:text-accent">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-foreground">Guides</span>
      </nav>

      <header className="mb-10 max-w-3xl">
        <Badge variant="secondary" className="mb-3 gap-1.5">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          {allGuides.length} guides
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Legal guides
        </h1>
        <p className="text-lg text-muted-foreground">
          Plain-English explainers on what claims are worth, why insurers deny them, and what
          your next step is — with the calculators that put real numbers behind each answer.
        </p>
      </header>

      <AdSlot slot="above-content" className="mb-10" />

      <div className="space-y-12">
        {guideGroups.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <h2
              id={`group-${group.id}`}
              className="font-serif text-2xl font-bold text-foreground mb-1"
            >
              {group.label}
            </h2>
            <p className="text-muted-foreground mb-5">{group.description}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.entries.map((entry) => (
                <Card
                  key={entry.path}
                  className="group h-full transition-shadow hover:shadow-md focus-within:shadow-md"
                >
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground leading-snug">
                        <Link to={lp(entry.path)} className="after:absolute after:inset-0 relative">
                          {entry.title}
                        </Link>
                      </h3>
                      {entry.badge && (
                        <Badge variant="outline" className="shrink-0 text-xs">
                          {entry.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex-1">{entry.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Read guide
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <AdSlot slot="end-of-article" className="mt-12" />
    </div>
  );
}
