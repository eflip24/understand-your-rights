import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import type { EuCountryCode } from "@/data/eu/countries";
import { euCountries } from "@/data/eu/countries";
import { EU_TOOL_COUNTRY_SLUGS } from "@/data/eu/employmentRules";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { useLocalizedPath } from "@/i18n/paths";

interface Props {
  /** When set, links point at the country-scoped calculator pages. */
  country?: EuCountryCode;
  className?: string;
}

/**
 * Shared callout linking to the /eu-tools employment calculators.
 * Used from EU country pillars, the EU forms hub and US severance tooling.
 */
export default function EuToolsCrossLink({ country, className = "" }: Props) {
  const locale = useLocaleFromUrl();
  const lp = useLocalizedPath();

  const suffix = country ? `/${EU_TOOL_COUNTRY_SLUGS[country]}` : "";
  const countryName = country
    ? euCountries.find((c) => c.code === country)?.name[locale] ?? country.toUpperCase()
    : undefined;

  return (
    <section className={`rounded-xl border border-border/70 bg-secondary/30 p-6 ${className}`}>
      <div className="flex items-start gap-3">
        <Calculator className="mt-1 h-5 w-5 text-accent shrink-0" aria-hidden="true" />
        <div>
          <h2 className="font-serif text-xl font-bold">
            {countryName
              ? `Dismissed in ${countryName}? Run the numbers first`
              : "Employment calculators for Europe"}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Free statutory estimates for severance and notice periods under German, French, Spanish,
            Italian and Portuguese labour law — with the article each formula comes from.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to={lp(`/eu-tools/severance-calculator${suffix}`)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground/85 transition hover:border-accent/50 hover:text-accent"
            >
              Severance calculator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={lp(`/eu-tools/notice-period-calculator${suffix}`)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground/85 transition hover:border-accent/50 hover:text-accent"
            >
              Notice period calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
