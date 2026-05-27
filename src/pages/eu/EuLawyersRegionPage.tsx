import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, MapPin, Scale, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import BarDisclaimerNotice from "@/components/eu/BarDisclaimerNotice";
import { JsonLdGraph, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { resolveEuRoute, buildEuPath } from "@/lib/eu/resolveRoute";
import { getEuCountry } from "@/data/eu/countries";
import { getEuRegion } from "@/data/eu/regions";
import { getEuCityByCanonical } from "@/data/eu/cities";
import { euAreasForCountry } from "@/data/eu/practiceAreas";
import { pickRegionIntro } from "@/data/eu/regionIntros";

const SITE = "https://legallyspoken.com";

export default function EuLawyersRegionPage() {
  const params = useParams<{ country: string; region: string }>();
  const locale = useLocaleFromUrl();
  const { t } = useTranslation("eu-lawyer");

  const canonical = resolveEuRoute(locale, params);
  if (!canonical || !canonical.country || !canonical.region)
    return <Navigate to={buildEuPath(locale, {})} replace />;

  const country = getEuCountry(canonical.country)!;
  const region = getEuRegion(canonical.country, canonical.region)!;
  const areas = euAreasForCountry(canonical.country);
  const intro = pickRegionIntro(canonical.country, region.canonical, locale);

  const cities = region.cities
    .map((c) => getEuCityByCanonical(canonical.country!, c))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  // Use the country's first available practice area as the default deep-link
  // target so region-page city cards reach a working /{country}/{area}/{city}.
  const defaultArea = areas[0];

  const countryPath = buildEuPath(locale, { country: canonical.country });
  const regionPath = buildEuPath(locale, canonical);
  const regionUrl = `${SITE}${regionPath}`;

  const ctx = { region: region.name[locale], country: country.name[locale] };

  const schemas = [
    breadcrumbSchema([
      { name: t("breadcrumbs.home"), url: SITE },
      { name: t("breadcrumbs.findLawyer"), url: `${SITE}${buildEuPath(locale, {})}` },
      { name: country.name[locale], url: `${SITE}${countryPath}` },
      { name: region.name[locale], url: regionUrl },
    ]),
    {
      "@type": "Place",
      name: region.name[locale],
      url: regionUrl,
      containedInPlace: { "@type": "Country", name: country.name[locale] },
      ...(region.courtOfAppeal && {
        containsPlace: { "@type": "GovernmentBuilding", name: region.courtOfAppeal },
      }),
    },
    cities.length > 0 && defaultArea
      ? itemListSchema(
          t("region.citiesIn", { ...ctx, defaultValue: `Cities in ${region.name[locale]}` }),
          cities.map((c) => ({
            url: `${SITE}${buildEuPath(locale, {
              country: canonical.country,
              area: defaultArea.canonical,
              city: c.canonical,
            })}`,
            name: c.name[locale],
          })),
        )
      : null,
  ].filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="container py-8 max-w-4xl">
      <EuLawyerHead
        title={`${t("region.metaTitle", { ...ctx, defaultValue: `Lawyers in ${region.name[locale]}, ${country.name[locale]}` })} | LegallySpoken`}
        description={
          intro?.text.slice(0, 158) ??
          t("region.metaDescription", ctx, {
            defaultValue: `Find lawyers and legal information for ${region.name[locale]} in ${country.name[locale]}.`,
          })
        }
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
        <Link to={countryPath} className="hover:text-foreground transition-colors">
          {country.name[locale]}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{region.name[locale]}</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          {t("region.heading", { ...ctx, defaultValue: `Lawyers in ${region.name[locale]}` })}
        </h1>
        <p className="text-sm text-muted-foreground">
          {country.name[locale]}
        </p>
      </div>

      <BarDisclaimerNotice country={canonical.country} locale={locale} />

      {intro && (
        <section className="mb-6">
          <p className="text-base leading-relaxed text-foreground/90">{intro.text}</p>
          {intro.locale !== locale && (
            <p className="mt-2 text-xs text-muted-foreground italic">
              {t("region.shownInEnglish", {
                defaultValue: "This regional overview is currently shown in English; a localised version is being prepared.",
              })}
            </p>
          )}
        </section>
      )}

      <div className="grid gap-3 sm:grid-cols-3 mb-8 text-sm">
        {(() => {
          const capitalCity = getEuCityByCanonical(canonical.country, region.capital);
          return capitalCity ? (
            <Card>
              <CardContent className="p-3 flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t("region.capital", { defaultValue: "Capital" })}
                  </div>
                  <div className="font-medium">{capitalCity.name[locale]}</div>
                </div>
              </CardContent>
            </Card>
          ) : null;
        })()}
        {region.courtOfAppeal && (
          <Card>
            <CardContent className="p-3 flex items-start gap-2">
              <Scale className="h-4 w-4 mt-0.5 text-accent shrink-0" aria-hidden="true" />
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("region.courtOfAppeal", { defaultValue: "Court of appeal" })}
                </div>
                <div className="font-medium">{region.courtOfAppeal}</div>
              </div>
            </CardContent>
          </Card>
        )}
        {region.barChamber && (
          <Card>
            <CardContent className="p-3 flex items-start gap-2">
              <Building2 className="h-4 w-4 mt-0.5 text-accent shrink-0" aria-hidden="true" />
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("region.barChamber", { defaultValue: "Bar chamber" })}
                </div>
                {region.barChamber.url ? (
                  <a
                    href={region.barChamber.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline-offset-2 hover:underline"
                  >
                    {region.barChamber.name}
                  </a>
                ) : (
                  <div className="font-medium">{region.barChamber.name}</div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {cities.length > 0 && defaultArea && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">
            {t("region.citiesIn", { ...ctx, defaultValue: `Cities in ${region.name[locale]}` })}
          </h2>
          <div className="grid gap-2 sm:grid-cols-3">
            {cities.map((c) => (
              <Link
                key={c.canonical}
                to={buildEuPath(locale, {
                  country: canonical.country,
                  area: defaultArea.canonical,
                  city: c.canonical,
                })}
              >
                <Card className="hover:shadow-sm hover:border-accent/30 transition-all">
                  <CardContent className="p-3 text-sm font-medium flex items-center justify-between">
                    <span>{c.name[locale]}</span>
                    {c.tier === "primary" && <Badge variant="outline" className="text-xs">★</Badge>}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{t("country.practiceAreas")}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {areas.map((a) => (
            <Link
              key={a.canonical}
              to={`${buildEuPath(locale, { country: canonical.country, area: a.canonical })}?region=${region.canonical}`}
            >
              <Card className="hover:shadow-sm hover:border-accent/30 transition-all">
                <CardContent className="p-3 text-sm font-medium">{a.name[locale]}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="mb-8">
        <Link
          to={countryPath}
          className="text-sm text-accent hover:underline inline-flex items-center gap-1"
        >
          ← {t("region.backToCountry", { ...ctx, defaultValue: `Back to ${country.name[locale]}` })}
        </Link>
      </div>

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
