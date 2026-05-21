import { useParams, Navigate, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { resolveEuRoute, buildEuPath } from "@/lib/eu/resolveRoute";
import { getEuCountry } from "@/data/eu/countries";
import { getEuAreaByCanonical } from "@/data/eu/practiceAreas";
import { getEuCityByCanonical } from "@/data/eu/cities";
import { listingsForCity } from "@/data/eu/lawyerListings.eu";

export default function EuLawyersCityPage() {
  const params = useParams<{ country: string; area: string; city: string }>();
  const locale = useLocaleFromUrl();

  const canonical = resolveEuRoute(locale, params);
  if (!canonical || !canonical.area || !canonical.city) return <Navigate to="/lawyer-eu" replace />;

  const country = getEuCountry(canonical.country)!;
  const area = getEuAreaByCanonical(canonical.area)!;
  const city = getEuCityByCanonical(canonical.country, canonical.city)!;
  const listings = listingsForCity(canonical.country, canonical.city);

  return (
    <div className="container py-8 max-w-4xl">
      <EuLawyerHead
        title={`${area.name[locale]} — ${city.name[locale]}, ${country.name[locale]} | LegallySpoken`}
        description={`${area.name[locale]} lawyers in ${city.name[locale]}, ${country.name[locale]}.`}
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
        <Link to={buildEuPath(locale, { country: canonical.country, area: canonical.area })} className="hover:text-foreground transition-colors">
          {area.name[locale]}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{city.name[locale]}</span>
      </nav>

      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">Coming soon — Phase B</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          {area.name[locale]} lawyers in {city.name[locale]}
        </h1>
        <p className="text-muted-foreground">
          {listings.length === 0
            ? "Listings for this city will be added in a later phase."
            : `${listings.length} lawyer(s) listed.`}
        </p>
      </div>

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> Verify credentials with{" "}
          <a href={country.barAssociationUrl} target="_blank" rel="noopener noreferrer" className="underline">
            the national bar association
          </a>{" "}
          before retaining counsel.
        </p>
      </div>
    </div>
  );
}
