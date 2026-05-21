import { useParams, Navigate, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { resolveEuRoute, buildEuPath } from "@/lib/eu/resolveRoute";
import { getEuCountry } from "@/data/eu/countries";
import { getEuAreaByCanonical } from "@/data/eu/practiceAreas";
import { euCitiesForCountry } from "@/data/eu/cities";

export default function EuLawyersAreaPage() {
  const params = useParams<{ country: string; area: string }>();
  const locale = useLocaleFromUrl();

  const canonical = resolveEuRoute(locale, params);
  if (!canonical || !canonical.area) return <Navigate to="/lawyer-eu" replace />;

  const country = getEuCountry(canonical.country)!;
  const area = getEuAreaByCanonical(canonical.area)!;
  const cities = euCitiesForCountry(canonical.country);

  return (
    <div className="container py-8 max-w-4xl">
      <EuLawyerHead
        title={`${area.name[locale]} — ${country.name[locale]} | LegallySpoken`}
        description={`${area.name[locale]} lawyers across ${country.name[locale]}. Browse by city.`}
        canonicalRoute={canonical}
        noindex
      />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to={locale === "en" ? "/" : `/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={buildEuPath(locale, { country: canonical.country })} className="hover:text-foreground transition-colors">
          {country.name[locale]}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{area.name[locale]}</span>
      </nav>

      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">Coming soon — Phase B</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          {area.name[locale]} — {country.name[locale]}
        </h1>
      </div>

      <h2 className="text-2xl font-bold mb-3">Cities</h2>
      <div className="grid gap-2 sm:grid-cols-3">
        {cities.map((c) => (
          <Link key={c.canonical} to={buildEuPath(locale, { country: canonical.country, area: canonical.area, city: c.canonical })}>
            <Card className="hover:shadow-sm hover:border-accent/30 transition-all">
              <CardContent className="p-3 text-sm font-medium">{c.name[locale]}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
