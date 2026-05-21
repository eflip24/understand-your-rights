import { Link } from "react-router-dom";
import { ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import { euCountries } from "@/data/eu/countries";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { buildEuPath } from "@/lib/eu/resolveRoute";

export default function EuLawyersHub() {
  const locale = useLocaleFromUrl();

  return (
    <div className="container py-8 max-w-4xl">
      {/* Hub uses the first country as canonical anchor; full hub canonicalization
          comes in B3 with the dedicated multi-country JSON-LD graph. */}
      <EuLawyerHead
        title="Find a Lawyer in Europe — LegallySpoken"
        description="Browse verified lawyers across France, Germany, Spain, Italy, and Portugal. Search by country, practice area, and city."
        canonicalRoute={{ country: "fr" }}
        noindex
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to={locale === "en" ? "/" : `/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Find a Lawyer (Europe)</span>
      </nav>

      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">Coming soon — Phase B</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          Find a Lawyer in Europe
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          European lawyer directory covering France, Germany, Spain, Italy and Portugal.
          Information architecture is live; lawyer listings are populated in a later phase.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {euCountries.map((c) => (
          <Link key={c.code} to={buildEuPath(locale, { country: c.code })}>
            <Card className="h-full hover:shadow-md hover:border-accent/30 transition-all group">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-base">{c.name[locale]}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <span className="text-xs text-accent font-medium inline-flex items-center gap-1">
                  Browse <ArrowRight className="h-3 w-3" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="border-t pt-6 mt-8">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This directory is for informational purposes only. Verify credentials with the relevant national bar association before retaining counsel.
        </p>
      </div>
    </div>
  );
}
