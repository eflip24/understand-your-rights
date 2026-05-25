import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import BarDisclaimerNotice from "@/components/eu/BarDisclaimerNotice";
import { JsonLdGraph, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { resolveEuRoute, buildEuPath } from "@/lib/eu/resolveRoute";
import { getEuCountry } from "@/data/eu/countries";
import { euAreasForCountry } from "@/data/eu/practiceAreas";
import { euCitiesForCountry } from "@/data/eu/cities";

const SITE = "https://legallyspoken.com";

export default function EuLawyersCountryPage() {
  const params = useParams<{ country: string }>();
  const locale = useLocaleFromUrl();
  const { t } = useTranslation("eu-lawyer");

  const canonical = resolveEuRoute(locale, params);
  if (!canonical || !canonical.country) return <Navigate to={buildEuPath(locale, {})} replace />;

  const country = getEuCountry(canonical.country)!;
  const areas = euAreasForCountry(canonical.country);
  const cities = euCitiesForCountry(canonical.country);
  const countryPath = buildEuPath(locale, { country: canonical.country });

  const schemas = [
    breadcrumbSchema([
      { name: t("breadcrumbs.home"), url: SITE },
      { name: t("breadcrumbs.findLawyer"), url: `${SITE}${buildEuPath(locale, {})}` },
      { name: country.name[locale], url: `${SITE}${countryPath}` },
    ]),
    itemListSchema(
      t("country.practiceAreas"),
      areas.map((a) => ({
        url: `${SITE}${buildEuPath(locale, { country: canonical.country, area: a.canonical })}`,
        name: a.name[locale],
      })),
    ),
  ];

  return (
    <div className="container py-8 max-w-4xl">
      <EuLawyerHead
        title={`${t("country.metaTitle", { country: country.name[locale] })} | LegallySpoken`}
        description={t("country.metaDescription", { country: country.name[locale] })}
        canonicalRoute={canonical}
      />
      <JsonLdGraph schemas={schemas} />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to={locale === "en" ? "/" : `/${locale}`} className="hover:text-foreground transition-colors">
          {t("breadcrumbs.home")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={buildEuPath(locale, {})} className="hover:text-foreground transition-colors">
          {t("breadcrumbs.findLawyer")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{country.name[locale]}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          {t("country.heading", { country: country.name[locale] })}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {t("country.intro", { country: country.name[locale] })}
        </p>
      </div>

      <BarDisclaimerNotice country={canonical.country} locale={locale} />

      <h2 className="text-2xl font-bold mb-3">{t("country.practiceAreas")}</h2>
      <div className="grid gap-2 sm:grid-cols-2 mb-8">
        {areas.map((a) => (
          <Link key={a.canonical} to={buildEuPath(locale, { country: canonical.country, area: a.canonical })}>
            <Card className="hover:shadow-sm hover:border-accent/30 transition-all">
              <CardContent className="p-3 text-sm font-medium">{a.name[locale]}</CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">{t("country.cities")}</h2>
      <div className="grid gap-2 sm:grid-cols-3 mb-8">
        {cities.map((c) => (
          <Card key={c.canonical}>
            <CardContent className="p-3 text-sm font-medium flex items-center justify-between">
              <span>{c.name[locale]}</span>
              {c.tier === "primary" && <Badge variant="outline" className="text-xs">★</Badge>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
