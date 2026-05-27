import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import { JsonLdGraph, breadcrumbSchema, itemListSchema } from "@/components/seo/JsonLd";
import { euCountries } from "@/data/eu/countries";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { buildEuPath } from "@/lib/eu/resolveRoute";
import { COUNTRY_PILLARS, pickPillarLocale } from "@/data/eu/countryPillars";

const SITE = "https://legallyspoken.com";

export default function EuLawyersHub() {
  const locale = useLocaleFromUrl();
  const { t } = useTranslation("eu-lawyer");
  const hubPath = buildEuPath(locale, {});

  const schemas = [
    breadcrumbSchema([
      { name: t("breadcrumbs.home"), url: SITE },
      { name: t("breadcrumbs.findLawyer"), url: `${SITE}${hubPath}` },
    ]),
    itemListSchema(
      t("hub.browseByCountry"),
      euCountries.map((c) => ({
        url: `${SITE}${buildEuPath(locale, { country: c.code })}`,
        name: c.name[locale],
      })),
    ),
  ];

  return (
    <div className="container py-8 max-w-4xl">
      <EuLawyerHead
        title={`${t("hub.title")} | LegallySpoken`}
        description={t("hub.metaDescription")}
        canonicalRoute={{}}
      />
      <JsonLdGraph schemas={schemas} />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to={locale === "en" ? "/" : `/${locale}`} className="hover:text-foreground transition-colors">
          {t("breadcrumbs.home")}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{t("breadcrumbs.findLawyer")}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          {t("hub.title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{t("hub.intro")}</p>
      </div>

      <h2 className="text-2xl font-bold mb-3">{t("hub.browseByCountry")}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {euCountries.map((c) => {
          const tagline = pickPillarLocale(COUNTRY_PILLARS[c.code].hero.tagline, locale);
          return (
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
                  <p className="text-sm text-foreground/80 mb-2 line-clamp-2">{tagline}</p>
                  <span className="text-xs text-accent font-medium inline-flex items-center gap-1">
                    {t("browse")} <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="border-t pt-6 mt-8">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
