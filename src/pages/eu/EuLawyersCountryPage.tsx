import { useParams, Navigate, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { resolveEuRoute, buildEuPath } from "@/lib/eu/resolveRoute";
import { getEuCountry } from "@/data/eu/countries";
import { euAreasForCountry } from "@/data/eu/practiceAreas";
import { euCitiesForCountry } from "@/data/eu/cities";

export default function EuLawyersCountryPage() {
  const params = useParams<{ country: string }>();
  const locale = useLocaleFromUrl();

  const canonical = resolveEuRoute(locale, params);
  if (!canonical) return <Navigate to={buildEuPath(locale, { country: "fr" }).replace(/\/fr$/, "")} replace />;

  const country = getEuCountry(canonical.country)!;
  const areas = euAreasForCountry(canonical.country);
  const cities = euCitiesForCountry(canonical.country);

  return (
    <div className="container py-8 max-w-4xl">
      <EuLawyerHead
        title={`Find a Lawyer in ${country.name[locale]} | LegallySpoken`}
        description={`Browse lawyers across ${country.name[locale]} by practice area and city.`}
        canonicalRoute={canonical}
        noindex
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to={locale === "en" ? "/" : `/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={buildEuPath(locale, { country: "fr" }).replace(/\/(?:france|francia|frankreich|franca)$/, "")} className="hover:text-foreground transition-colors">
          Find a Lawyer
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{country.name[locale]}</span>
      </nav>

      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">Coming soon — Phase B</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          Lawyers in {country.name[locale]}
        </h1>
      </div>

      <h2 className="text-2xl font-bold mb-3">Practice areas</h2>
      <div className="grid gap-2 sm:grid-cols-2 mb-8">
        {areas.map((a) => (
          <Link key={a.canonical} to={buildEuPath(locale, { country: canonical.country, area: a.canonical })}>
            <Card className="hover:shadow-sm hover:border-accent/30 transition-all">
              <CardContent className="p-3 text-sm font-medium">{a.name[locale]}</CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">Cities</h2>
      <div className="grid gap-2 sm:grid-cols-3">
        {cities.map((c) => (
          <Card key={c.canonical}>
            <CardContent className="p-3 text-sm font-medium">{c.name[locale]}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
