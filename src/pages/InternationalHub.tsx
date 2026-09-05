import { Link } from "react-router-dom";
import { ChevronRight, Globe2, Scale } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema, faqSchema, itemListSchema, articleSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalizedPath } from "@/i18n/paths";
import { internationalJurisdictions, INTERNATIONAL_LAST_VERIFIED } from "@/data/internationalJurisdictions";

const SITE = "https://legallyspoken.com";

const FAQS = [
  {
    question: "Which countries does this section cover?",
    answer:
      "The United Kingdom, Ireland, Canada and Australia — the four English-speaking common-law systems most often searched alongside US legal questions. Each country page covers claim deadlines, employment claims, consumer rights and the low-cost small claims route.",
  },
  {
    question: "Why do claim deadlines differ so much between countries?",
    answer:
      "Limitation periods are set by national or state legislation, not by any shared rule. A personal injury claim must be started within two years in Ireland, three years in the UK and most Australian states, and two years from discovery in most Canadian provinces.",
  },
  {
    question: "Can I use the US calculators for a non-US claim?",
    answer:
      "Use them for structure, not for figures. The way damages are broken down — lost earnings, medical costs, future care — travels well, but caps, tariffs and tax treatment are country-specific and are explained on each country page.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. These pages are plain-English reference material compiled from the legislation and government sources cited at the bottom of each page. For advice on your own situation, speak to a qualified lawyer in that jurisdiction.",
  },
];

export default function InternationalHub() {
  const lp = useLocalizedPath();

  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "International", url: `${SITE}/international` },
    ]),
    itemListSchema(
      "International legal guides",
      internationalJurisdictions.map((j) => ({
        name: `${j.country} legal guide`,
        url: `${SITE}/international/${j.slug}`,
      })),
    ),
    faqSchema(FAQS),
    articleSchema(
      "International Legal Guides: Claim Deadlines, Employment Rights and Small Claims",
      "Claim deadlines, employment claim windows, consumer rights and small claims limits for the UK, Ireland, Canada and Australia.",
      `${SITE}/international`,
      { datePublished: INTERNATIONAL_LAST_VERIFIED, dateModified: INTERNATIONAL_LAST_VERIFIED },
    ),
  ];

  return (
    <div className="container max-w-5xl py-8">
      <Head
        title="International Legal Guides — UK, Ireland, Canada & Australia Claim Deadlines"
        description="Claim deadlines, employment tribunal and Fair Work time limits, consumer rights and small claims limits for the UK, Ireland, Canada and Australia — compiled from official legislation."
        englishOnly
      />
      <JsonLdGraph schemas={schemas} />

      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link to={lp("/")} className="hover:text-accent">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-foreground">International</span>
      </nav>

      <Badge variant="secondary" className="mb-3 gap-1.5">
        <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
        {internationalJurisdictions.length} jurisdictions
      </Badge>
      <h1 className="mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
        International legal guides
      </h1>
      <p className="max-w-3xl text-lg text-muted-foreground">
        Most legal answers online assume you are in the United States. These pages cover the other
        four English-speaking common-law systems people search alongside US law — with the two
        numbers that decide a case before the merits are argued: how long you have to claim, and
        which forum hears it.
      </p>

      <AuthorByline reviewedAt={INTERNATIONAL_LAST_VERIFIED} className="my-6" />
      <AdSlot slot="above-content" className="mb-8" />

      <div className="grid gap-5 sm:grid-cols-2">
        {internationalJurisdictions.map((j) => (
          <Card key={j.slug} className="group h-full transition-shadow hover:shadow-md">
            <CardContent className="flex h-full flex-col p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h2 className="font-serif text-xl font-bold">
                  <Link to={lp(`/international/${j.slug}`)} className="relative after:absolute after:inset-0">
                    {j.country}
                  </Link>
                </h2>
                <Badge variant="outline" className="shrink-0 text-xs">{j.currency}</Badge>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{j.tagline}</p>
              <dl className="mt-auto grid grid-cols-2 gap-3 text-sm">
                {j.quickFacts.slice(0, 2).map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs text-muted-foreground">{f.label}</dt>
                    <dd className="font-semibold text-foreground">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-12" aria-labelledby="compare">
        <h2 id="compare" className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold">
          <Scale className="h-5 w-5 text-accent" aria-hidden="true" /> Deadlines compared at a glance
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <caption className="sr-only">Key claim deadlines and small claims limits by country</caption>
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Country</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Injury claim</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Employment claim</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Small claims limit</th>
              </tr>
            </thead>
            <tbody>
              {internationalJurisdictions.map((j) => (
                <tr key={j.slug} className="border-t">
                  <th scope="row" className="px-4 py-3 text-left font-medium">
                    <Link to={lp(`/international/${j.slug}`)} className="text-accent hover:underline">
                      {j.country}
                    </Link>
                  </th>
                  <td className="px-4 py-3">{j.quickFacts[0]?.value}</td>
                  <td className="px-4 py-3">{j.quickFacts[1]?.value}</td>
                  <td className="px-4 py-3">{j.smallClaims.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Last verified {INTERNATIONAL_LAST_VERIFIED}. Figures are compiled from the legislation cited on each country page.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="faq">
        <h2 id="faq" className="mb-4 font-serif text-2xl font-bold">Common questions</h2>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <div key={f.question} className="rounded-lg border bg-card p-4">
              <h3 className="mb-1 font-semibold">{f.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slot="end-of-article" className="mt-12" />
    </div>
  );
}
