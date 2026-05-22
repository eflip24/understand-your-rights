import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import EuLawyerHead from "@/components/seo/EuLawyerHead";
import { JsonLdGraph, breadcrumbSchema, itemListSchema, faqSchema } from "@/components/seo/JsonLd";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { resolveEuRoute, buildEuPath } from "@/lib/eu/resolveRoute";
import { getEuCountry } from "@/data/eu/countries";
import { getEuAreaByCanonical } from "@/data/eu/practiceAreas";
import { euCitiesForCountry } from "@/data/eu/cities";

const SITE = "https://legallyspoken.com";

export default function EuLawyersAreaPage() {
  const params = useParams<{ country: string; area: string }>();
  const locale = useLocaleFromUrl();
  const { t } = useTranslation("eu-lawyer");

  const canonical = resolveEuRoute(locale, params);
  if (!canonical || !canonical.country || !canonical.area)
    return <Navigate to={buildEuPath(locale, {})} replace />;

  const country = getEuCountry(canonical.country)!;
  const area = getEuAreaByCanonical(canonical.area)!;
  const cities = euCitiesForCountry(canonical.country);

  const ctx = { country: country.name[locale], area: area.name[locale] };
  const faqs = [
    { question: t("area.faq.q1", ctx), answer: t("area.faq.a1", ctx) },
    { question: t("area.faq.q2", ctx), answer: t("area.faq.a2", ctx) },
    { question: t("area.faq.q3", ctx), answer: t("area.faq.a3", ctx) },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: t("breadcrumbs.home"), url: SITE },
      { name: t("breadcrumbs.findLawyer"), url: `${SITE}${buildEuPath(locale, {})}` },
      { name: country.name[locale], url: `${SITE}${buildEuPath(locale, { country: canonical.country })}` },
      { name: area.name[locale], url: `${SITE}${buildEuPath(locale, canonical)}` },
    ]),
    itemListSchema(
      t("area.browseByCity"),
      cities.map((c) => ({
        url: `${SITE}${buildEuPath(locale, { country: canonical.country, area: canonical.area, city: c.canonical })}`,
        name: c.name[locale],
      })),
    ),
    faqSchema(faqs),
  ];

  return (
    <div className="container py-8 max-w-4xl">
      <EuLawyerHead
        title={`${t("area.metaTitle", ctx)} | LegallySpoken`}
        description={t("area.metaDescription", ctx)}
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
        <span className="text-foreground">{area.name[locale]}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
          {t("area.heading", ctx)}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{t("area.intro", ctx)}</p>
      </div>

      <h2 className="text-2xl font-bold mb-3">{t("area.browseByCity")}</h2>
      <div className="grid gap-2 sm:grid-cols-3 mb-8">
        {cities.map((c) => (
          <Link key={c.canonical} to={buildEuPath(locale, { country: canonical.country, area: canonical.area, city: c.canonical })}>
            <Card className="hover:shadow-sm hover:border-accent/30 transition-all">
              <CardContent className="p-3 text-sm font-medium">{c.name[locale]}</CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{t("area.faqHeading")}</h2>
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
          <strong>Disclaimer:</strong> {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
