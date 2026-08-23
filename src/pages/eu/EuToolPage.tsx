import { Link, useParams } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph, webApplicationSchema, faqSchema } from "@/components/seo/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import AdSlot from "@/components/ads/AdSlot";
import AuthorByline from "@/components/seo/AuthorByline";
import NotFound from "@/pages/NotFound";
import EuSeveranceCalculator from "@/components/tools/eu/EuSeveranceCalculator";
import EuNoticePeriodCalculator from "@/components/tools/eu/EuNoticePeriodCalculator";
import { euCountries } from "@/data/eu/countries";
import {
  EU_EMPLOYMENT_COUNTRIES, EU_TOOL_COUNTRY_ORDER, EU_TOOL_COUNTRY_SLUGS,
  countryFromToolSlug, pickText,
} from "@/data/eu/employmentRules";
import { useLocalizedPath } from "@/i18n/paths";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";

const SITE = "https://legallyspoken.com";

type ToolSlug = "severance-calculator" | "notice-period-calculator";

const TOOL_META: Record<ToolSlug, { title: string; description: string; intro: string }> = {
  "severance-calculator": {
    title: "EU severance calculator",
    description:
      "Estimate statutory dismissal compensation under German, French, Spanish, Italian and Portuguese labour law.",
    intro:
      "Severance in Europe is set by national labour codes, not by negotiation alone. Enter your salary, service and the reason given for the termination to see the statutory range, the formula applied, and the article it comes from.",
  },
  "notice-period-calculator": {
    title: "EU notice period calculator",
    description:
      "Work out statutory notice periods, the last working day and pay in lieu across Germany, France, Spain, Italy and Portugal.",
    intro:
      "Notice periods in Europe grow with seniority and differ depending on who ends the contract. Enter your details to see the statutory minimum, the resulting last working day, and what payment in lieu of notice would be worth.",
  },
};

const GENERIC_FAQS = [
  {
    q: "Do these figures include collective agreements?",
    a: "No. Every result is the statutory floor set by national law. Tarifverträge, conventions collectives, convenios colectivos, CCNLs and IRCTs regularly improve on it, so check the agreement that covers your role and take the better of the two.",
  },
  {
    q: "Is severance taxed in the EU?",
    a: "Usually yes, though most countries tax it more favourably than ordinary salary — Germany applies the Fünftelregelung, France exempts the statutory portion within limits, and Spain exempts statutory redundancy up to €180,000. Treat the numbers here as gross.",
  },
  {
    q: "How fast do I have to act after a dismissal?",
    a: "Very fast. Germany gives three weeks to file a Kündigungsschutzklage, Spain twenty working days, France twelve months for most dismissal claims, and Portugal sixty days for contesting a disciplinary dismissal. Missing the deadline usually ends the claim regardless of merits.",
  },
];

export default function EuToolPage({ slug }: { slug: ToolSlug }) {
  const { country: countrySlug } = useParams<{ country?: string }>();
  const lp = useLocalizedPath();
  const locale = useLocaleFromUrl();

  const country = countryFromToolSlug(countrySlug);
  if (countrySlug && !country) return <NotFound />;

  const meta = TOOL_META[slug];
  const countryName = country
    ? euCountries.find((c) => c.code === country)?.name[locale] ?? country.toUpperCase()
    : undefined;
  const rules = country ? EU_EMPLOYMENT_COUNTRIES[country] : undefined;

  const path = country ? `/eu-tools/${slug}/${EU_TOOL_COUNTRY_SLUGS[country]}` : `/eu-tools/${slug}`;
  const title = country ? `${meta.title.replace("EU ", "")} — ${countryName}` : meta.title;
  const description = country
    ? `${countryName}: ${meta.description}`.slice(0, 155)
    : meta.description;

  const faqs = [
    ...(rules ? rules.faqs.map((f) => ({ q: pickText(f.q, locale), a: pickText(f.a, locale) })) : []),
    ...GENERIC_FAQS,
  ];

  const schemas = [
    webApplicationSchema(title, description, `${SITE}${path}`, country ? [country.toUpperCase()] : ["DE", "FR", "ES", "IT", "PT"]),
    faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "EU tools", item: `${SITE}/eu-tools` },
        { "@type": "ListItem", position: 3, name: meta.title, item: `${SITE}/eu-tools/${slug}` },
        ...(country
          ? [{ "@type": "ListItem", position: 4, name: countryName, item: `${SITE}${path}` }]
          : []),
      ],
    },
  ];

  return (
    <div className="container max-w-4xl px-4 py-8 pb-20">
      <Head title={title.slice(0, 60)} description={description} />
      <JsonLdGraph schemas={schemas} />

      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to={lp("/eu-tools")} className="hover:text-foreground">EU tools</Link>
        <ChevronRight className="h-3 w-3" />
        {country ? (
          <>
            <Link to={lp(`/eu-tools/${slug}`)} className="hover:text-foreground">{meta.title}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{countryName}</span>
          </>
        ) : (
          <span className="text-foreground">{meta.title}</span>
        )}
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          {rules ? pickText(rules.intro, locale) : meta.intro}
        </p>
        <AuthorByline authorId="senior-legal-researcher" compact className="mt-3" />
      </header>

      <AdSlot slot="above-content" className="mb-8" />

      <Card className="mb-10 shadow-md">
        <CardContent className="p-4 sm:p-6">
          {slug === "severance-calculator" ? (
            <EuSeveranceCalculator fixedCountry={country} />
          ) : (
            <EuNoticePeriodCalculator fixedCountry={country} />
          )}
        </CardContent>
      </Card>

      <AdSlot slot="post-result" className="mb-10" />

      {!country && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">Country guides</h2>
          <div className="flex flex-wrap gap-2">
            {EU_TOOL_COUNTRY_ORDER.map((c) => (
              <Link
                key={c}
                to={lp(`/eu-tools/${slug}/${EU_TOOL_COUNTRY_SLUGS[c]}`)}
                className="rounded-full border border-border px-4 py-1.5 text-sm hover:border-accent hover:text-accent transition-colors"
              >
                {euCountries.find((x) => x.code === c)?.name[locale]}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">Frequently asked questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {rules && (
        <section className="mb-10 rounded-lg border border-border bg-muted/30 p-5">
          <h2 className="text-lg font-semibold text-foreground mb-2">Official sources</h2>
          <ul className="space-y-1 text-sm">
            {rules.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-accent hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-lg border border-border p-5">
        <h2 className="text-lg font-semibold text-foreground mb-2">Next steps</h2>
        <div className="flex flex-col gap-2 text-sm">
          <Link to={lp(slug === "severance-calculator" ? "/eu-tools/notice-period-calculator" : "/eu-tools/severance-calculator")} className="text-accent hover:underline inline-flex items-center gap-1">
            {slug === "severance-calculator" ? "Check your notice period" : "Estimate your severance"} <ArrowRight className="h-3 w-3" />
          </Link>
          <Link to={lp("/lawyer-eu")} className="text-accent hover:underline inline-flex items-center gap-1">
            Find an employment lawyer in your country <ArrowRight className="h-3 w-3" />
          </Link>
          <Link to={lp("/eu-forms")} className="text-accent hover:underline inline-flex items-center gap-1">
            European legal forms and templates <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
    </div>
  );
}
