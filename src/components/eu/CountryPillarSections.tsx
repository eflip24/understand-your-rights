import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ExternalLink } from "lucide-react";
import type { CountryPillar } from "@/data/eu/countryPillars";
import { pickPillarLocale } from "@/data/eu/countryPillars";
import type { LocaleCode } from "@/data/eu/countries";

interface Props {
  pillar: CountryPillar;
  locale: LocaleCode;
  labels: {
    legalSystem: string;
    howToFindLawyer: string;
    feesAndAid: string;
    barAssociation: string;
    crossBorderEU: string;
    faq: string;
    lastReviewed: string;
    aiAssisted: string;
  };
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n+/).map((para, i) => (
        <p key={i} className="leading-relaxed text-foreground/85 mb-3">
          {para}
        </p>
      ))}
    </>
  );
}

/**
 * Long-form pillar sections for an EU country page. Pure presentational —
 * content comes from src/data/eu/countryPillars.ts.
 */
export default function CountryPillarSections({ pillar, locale, labels }: Props) {
  const tagline = pickPillarLocale(pillar.hero.tagline, locale);
  const lede = pickPillarLocale(pillar.hero.lede, locale);

  return (
    <>
      <section className="mb-8" aria-label="Overview">
        <p className="text-lg text-foreground/90 font-medium mb-2">{tagline}</p>
        <p className="leading-relaxed text-foreground/85">{lede}</p>
        {pillar.aiAssisted && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {labels.aiAssisted}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{labels.legalSystem}</h2>
        <Paragraphs text={pickPillarLocale(pillar.legalSystem, locale)} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{labels.howToFindLawyer}</h2>
        <Paragraphs text={pickPillarLocale(pillar.howToFindLawyer, locale)} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{labels.feesAndAid}</h2>
        <Paragraphs text={pickPillarLocale(pillar.feesAndAid, locale)} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{labels.barAssociation}</h2>
        <Card>
          <CardContent className="p-4 space-y-3">
            <p className="font-semibold">{pickPillarLocale(pillar.barAssociation.name, locale)}</p>
            <Paragraphs text={pickPillarLocale(pillar.barAssociation.membershipRules, locale)} />
            <a
              href={pillar.barAssociation.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-accent underline hover:no-underline"
            >
              {pillar.barAssociation.verifyUrl.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">{labels.crossBorderEU}</h2>
        <Paragraphs text={pickPillarLocale(pillar.crossBorderEU, locale)} />
      </section>

      {pillar.faqs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">{labels.faq}</h2>
          <Accordion type="single" collapsible className="w-full">
            {pillar.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{pickPillarLocale(faq.q, locale)}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-foreground/85">
                  {pickPillarLocale(faq.a, locale)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      <p className="text-xs text-muted-foreground mb-6">
        {labels.lastReviewed}: {new Date(pillar.lastReviewed).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
      </p>
    </>
  );
}
