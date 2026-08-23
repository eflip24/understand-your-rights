import { Link } from "react-router-dom";
import { Calculator, CalendarClock, ArrowRight, Scale } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph } from "@/components/seo/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/i18n/paths";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { euCountries } from "@/data/eu/countries";
import { EU_TOOL_COUNTRY_ORDER, EU_TOOL_COUNTRY_SLUGS, EU_EMPLOYMENT_COUNTRIES, pickText } from "@/data/eu/employmentRules";

const SITE = "https://legallyspoken.com";

const TOOLS = [
  {
    slug: "severance-calculator",
    icon: Calculator,
    title: "EU severance calculator",
    blurb:
      "Estimate statutory dismissal compensation in Germany, France, Spain, Italy and Portugal — with the formula and statute behind every figure.",
  },
  {
    slug: "notice-period-calculator",
    icon: CalendarClock,
    title: "EU notice period calculator",
    blurb:
      "Work out the statutory notice your employer owes you (or you owe them), the last working day, and what pay in lieu would be worth.",
  },
];

export default function EuToolsHubPage() {
  const lp = useLocalizedPath();
  const locale = useLocaleFromUrl();

  const schemas = [
    {
      "@type": "CollectionPage",
      name: "European legal calculators",
      url: `${SITE}/eu-tools`,
      description:
        "Free European employment law calculators: statutory severance and notice periods for Germany, France, Spain, Italy and Portugal.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "EU tools", item: `${SITE}/eu-tools` },
      ],
    },
  ];

  return (
    <div className="container max-w-5xl px-4 py-10">
      <Head
        title="EU legal calculators — severance & notice periods"
        description="Free calculators for European employment law: statutory severance and notice periods in Germany, France, Spain, Italy and Portugal, with the statute behind each result."
      />
      <JsonLdGraph schemas={schemas} />

      <header className="mb-10">
        <Badge variant="secondary" className="mb-3">Europe</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          European legal calculators
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Country-specific maths for the two questions every dismissed employee in the EU asks first:
          how much am I owed, and how long is my notice? Each result shows the formula and the article
          of the labour code it comes from.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 mb-12">
        {TOOLS.map((t) => (
          <Card key={t.slug} className="hover:border-accent/60 transition-colors">
            <CardContent className="p-6">
              <t.icon className="h-6 w-6 text-accent mb-3" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                <Link to={lp(`/eu-tools/${t.slug}`)} className="hover:text-accent">
                  {t.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground mb-4">{t.blurb}</p>
              <div className="flex flex-wrap gap-2">
                {EU_TOOL_COUNTRY_ORDER.map((c) => (
                  <Link
                    key={c}
                    to={lp(`/eu-tools/${t.slug}/${EU_TOOL_COUNTRY_SLUGS[c]}`)}
                    className="text-xs rounded-full border border-border px-3 py-1 hover:border-accent hover:text-accent transition-colors"
                  >
                    {euCountries.find((x) => x.code === c)?.name[locale]}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">How termination pay works, country by country</h2>
        <div className="space-y-4">
          {EU_TOOL_COUNTRY_ORDER.map((c) => {
            const rules = EU_EMPLOYMENT_COUNTRIES[c];
            const name = euCountries.find((x) => x.code === c)?.name[locale];
            return (
              <Card key={c}>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-1">{name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{pickText(rules.intro, locale)}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link to={lp(`/eu-tools/severance-calculator/${EU_TOOL_COUNTRY_SLUGS[c]}`)} className="text-accent hover:underline inline-flex items-center gap-1">
                      Severance in {name} <ArrowRight className="h-3 w-3" />
                    </Link>
                    <Link to={lp(`/eu-tools/notice-period-calculator/${EU_TOOL_COUNTRY_SLUGS[c]}`)} className="text-accent hover:underline inline-flex items-center gap-1">
                      Notice period <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-muted/30 p-6">
        <Scale className="h-5 w-5 text-accent mb-2" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Need a lawyer in your country?</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Employment deadlines in Europe are short — three weeks in Germany, twenty working days in Spain.
          Our EU directory explains how to instruct a lawyer and what fees to expect.
        </p>
        <Link to={lp("/lawyer-eu")} className="text-accent hover:underline text-sm inline-flex items-center gap-1">
          Browse the EU lawyer directory <ArrowRight className="h-3 w-3" />
        </Link>
      </section>
    </div>
  );
}
