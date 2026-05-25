import React, { Suspense } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, MapPin, Phone, Globe, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import BarDisclaimerNotice from "@/components/eu/BarDisclaimerNotice";
import { JsonLdGraph, breadcrumbSchema, localBusinessSchema, faqSchema } from "@/components/seo/JsonLd";
import type { MapMarker } from "@/components/maps/LocalMap";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { resolveEuRoute, buildEuPath } from "@/lib/eu/resolveRoute";
import { getEuCountry } from "@/data/eu/countries";
import { getEuAreaByCanonical } from "@/data/eu/practiceAreas";
import { getEuCityByCanonical } from "@/data/eu/cities";
import { listingsForCity } from "@/data/eu/lawyerListings.eu";

const LocalMap = React.lazy(() => import("@/components/maps/LocalMap"));
const SITE = "https://legallyspoken.com";

export default function EuLawyersCityPage() {
  const params = useParams<{ country: string; area: string; city: string }>();
  const locale = useLocaleFromUrl();
  const { t } = useTranslation("eu-lawyer");

  const canonical = resolveEuRoute(locale, params);
  if (!canonical || !canonical.country || !canonical.area || !canonical.city)
    return <Navigate to={buildEuPath(locale, {})} replace />;

  const country = getEuCountry(canonical.country)!;
  const area = getEuAreaByCanonical(canonical.area)!;
  const city = getEuCityByCanonical(canonical.country, canonical.city)!;
  const listings = listingsForCity(canonical.country, canonical.city);
  const cityUrl = `${SITE}${buildEuPath(locale, canonical)}`;

  const ctx = { country: country.name[locale], area: area.name[locale], city: city.name[locale] };
  const faqs = [
    { question: t("city.faq.q1", ctx), answer: t("city.faq.a1", ctx) },
    { question: t("city.faq.q2", ctx), answer: t("city.faq.a2", ctx) },
  ];

  const markers: MapMarker[] = listings.map((l) => ({
    position: [l.lat, l.lng] as [number, number],
    title: l.name,
    address: l.address,
    type: "lawyer" as const,
  }));

  const schemas = [
    breadcrumbSchema([
      { name: t("breadcrumbs.home"), url: SITE },
      { name: t("breadcrumbs.findLawyer"), url: `${SITE}${buildEuPath(locale, {})}` },
      { name: country.name[locale], url: `${SITE}${buildEuPath(locale, { country: canonical.country })}` },
      { name: area.name[locale], url: `${SITE}${buildEuPath(locale, { country: canonical.country, area: canonical.area })}` },
      { name: city.name[locale], url: cityUrl },
    ]),
    ...listings.map((l) =>
      localBusinessSchema({
        name: l.name,
        address: l.address,
        lat: l.lat,
        lng: l.lng,
        url: l.website || cityUrl,
      }),
    ),
    faqSchema(faqs),
  ];

  return (
    <div className="container py-8 max-w-4xl">
      <EuLawyerHead
        title={`${t("city.metaTitle", ctx)} | LegallySpoken`}
        description={t("city.metaDescription", ctx)}
        canonicalRoute={canonical}
      />
      <JsonLdGraph schemas={schemas} />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to={locale === "en" ? "/" : `/${locale}`} className="hover:text-foreground transition-colors">{t("breadcrumbs.home")}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={buildEuPath(locale, {})} className="hover:text-foreground transition-colors">{t("breadcrumbs.findLawyer")}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={buildEuPath(locale, { country: canonical.country })} className="hover:text-foreground transition-colors">{country.name[locale]}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={buildEuPath(locale, { country: canonical.country, area: canonical.area })} className="hover:text-foreground transition-colors">{area.name[locale]}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{city.name[locale]}</span>
      </nav>

      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">{city.name[locale]}, {country.name[locale]}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          {t("city.heading", ctx)}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{t("city.intro", ctx)}</p>
      </div>

      <BarDisclaimerNotice country={canonical.country} locale={locale} />

      {listings.length > 0 ? (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{t("city.listings")}</h2>
          <div className="grid gap-4">
            {listings.map((l, i) => (
              <div key={i} className="rounded-lg border bg-card p-4 md:p-5">
                <h3 className="font-semibold text-lg text-foreground mb-1">{l.name}</h3>
                {l.description && <p className="text-sm text-muted-foreground mb-3">{l.description}</p>}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {l.address}
                </div>
                <div className="flex flex-wrap gap-4">
                  {l.phone && (
                    <a href={`tel:${l.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                      <Phone className="h-4 w-4" />{l.phone}
                    </a>
                  )}
                  {l.email && (
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                      <Mail className="h-4 w-4" />{l.email}
                    </a>
                  )}
                  {l.website && (
                    <a href={l.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                      <Globe className="h-4 w-4" />Website
                    </a>
                  )}
                </div>
                {l.barNumber && <p className="text-xs text-muted-foreground mt-2">Bar #: {l.barNumber}</p>}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-6 text-sm text-muted-foreground">
            {t("city.noListings", ctx)}
          </CardContent>
        </Card>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{t("city.mapTitle")}</h2>
        <div aria-hidden="true">
          <Suspense fallback={<Skeleton className="h-[300px] md:h-[400px] w-full rounded-lg" />}>
            <LocalMap center={[city.lat, city.lng]} markers={markers} />
          </Suspense>
        </div>
        <p className="sr-only">
          Map of {listings.length} listed firms in {city.name[locale]}. Use the list above for accessible navigation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{t("city.faqHeading")}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <div className="border-t pt-6">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> {t("city.barAssociation")}{" "}
          <a href={country.barAssociationUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {country.name[locale]}
          </a>
          . {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
