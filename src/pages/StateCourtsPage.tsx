import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, Landmark, Scale, FileText, ExternalLink, MapPin } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema, faqSchema, articleSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/i18n/paths";
import { getStateCourts, COURTS_LAST_VERIFIED, smallClaimsCap } from "@/data/courts/stateCourts";
import { getStateBySlug } from "@/data/locations/stateData";
import { getCitiesByState } from "@/data/locations/cityData";
import { getStateSol } from "@/data/solData";

const SITE = "https://legallyspoken.com";

export default function StateCourtsPage() {
  const { state } = useParams<{ state: string }>();
  const lp = useLocalizedPath();
  const courts = state ? getStateCourts(state) : undefined;

  if (!courts) return <Navigate to={lp("/courts")} replace />;

  const legal = getStateBySlug(courts.slug);
  const cities = getCitiesByState(courts.slug);
  const sol = getStateSol(courts.abbr);
  const cap = smallClaimsCap(courts);

  const faqs = [
    {
      question: `What is the small claims limit in ${courts.name}?`,
      answer: `${courts.smallClaimsLimit}, set by ${courts.statute}. Claims above that amount must be filed in the ${courts.trialCourt}. You can sue for less than the cap, but you cannot split one dispute into several claims to get around it.`,
    },
    {
      question: `How much does it cost to file a small claims case in ${courts.name}?`,
      answer: `Published filing fees run ${courts.smallClaimsFee}, plus a separate service-of-process cost to deliver the papers to the defendant. If you cannot afford the fee, ask the clerk for a fee-waiver (in forma pauperis) application. Fees are set by ${courts.statute} and the court's current fee schedule.`,
    },
    {
      question: `Which ${courts.name} court hears my case?`,
      answer: `Money claims up to ${courts.smallClaimsLimit} go to the ${courts.limitedCourt}. Larger money claims, injury lawsuits, contract disputes, divorce and probate go to the ${courts.trialCourt}. Appeals go to the ${courts.appellateCourt || courts.highestCourt}.`,
    },
    {
      question: `How long do I have to file a lawsuit in ${courts.name}?`,
      answer: legal
        ? `The statute of limitations for personal injury in ${courts.name} is ${legal.personalInjurySOL} and for property damage ${legal.propertyDamageSOL}. Contract and other claim types have their own periods. Missing the deadline ends the claim no matter how strong it is.`
        : `Deadlines depend on the claim type. Check the statute of limitations for your specific claim before filing — missing it ends the case regardless of merit.`,
    },
    {
      question: `Do I need a lawyer in ${courts.name} small claims court?`,
      answer:
        courts.note ||
        `No. Small claims procedure in ${courts.name} is designed for people representing themselves. A lawyer is generally permitted but rarely economical at this claim size; for anything above the ${courts.smallClaimsLimit} cap, consult an attorney.`,
    },
    {
      question: `Can I file online in ${courts.name}?`,
      answer: courts.eFiling
        ? `${courts.name} uses ${courts.eFiling} for civil e-filing. Availability for small claims varies by county — check the clerk's page on ${courts.courtWebsite} before assuming you can file electronically.`
        : `${courts.name} does not operate a single statewide civil e-filing portal for self-represented filers. Check the county clerk's page on ${courts.courtWebsite}; many counties accept filings in person or by mail only.`,
    },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "US Courts", url: `${SITE}/courts` },
      { name: `${courts.name} Courts`, url: `${SITE}/courts/${courts.slug}` },
    ]),
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "GovernmentOrganization",
      name: `${courts.name} Judiciary`,
      url: courts.courtWebsite,
      areaServed: courts.name,
    },
    articleSchema(
      `${courts.name} Court System: Small Claims Limit, Filing Fees and Where to File`,
      `Court structure, small claims cap, filing fees and official contacts for ${courts.name}.`,
      `${SITE}/courts/${courts.slug}`,
      { datePublished: COURTS_LAST_VERIFIED, dateModified: COURTS_LAST_VERIFIED },
    ),
  ];

  return (
    <div className="container max-w-4xl py-8">
      <Head
        title={`${courts.name} Courts — Small Claims Limit, Filing Fees & Where to File`}
        description={`${courts.name} court system explained: small claims limit ${courts.smallClaimsLimit}, filing fees ${courts.smallClaimsFee}, which court hears your case, and the official ${courts.name} judiciary website.`}
        englishOnly
      />
      <JsonLdGraph schemas={schemas} />

      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link to={lp("/")} className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={lp("/courts")} className="hover:text-foreground">US Courts</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{courts.name}</span>
      </nav>

      <Badge variant="secondary" className="mb-3">{courts.abbr}</Badge>
      <h1 className="mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
        {courts.name} Court System: Where to File and What It Costs
      </h1>
      <p className="text-lg text-muted-foreground">
        Small claims in {courts.name} are capped at {courts.smallClaimsLimit} and heard in the{" "}
        {courts.limitedCourt}. Anything larger belongs in the {courts.trialCourt}.
      </p>

      <AuthorByline reviewedAt={COURTS_LAST_VERIFIED} className="my-6" />
      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Small claims limit</p>
          <p className="text-xl font-bold">{courts.smallClaimsLimit}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Small claims filing fee</p>
          <p className="text-xl font-bold">{courts.smallClaimsFee}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Governing statute</p>
          <p className="text-base font-semibold">{courts.statute}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Civil e-filing</p>
          <p className="text-base font-semibold">{courts.eFiling || "County-level filing — check the clerk"}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <Landmark className="h-5 w-5 text-accent" /> Court structure in {courts.name}
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">Level</th>
                <th scope="col" className="px-3 py-2 font-semibold">Court</th>
                <th scope="col" className="px-3 py-2 font-semibold">What it hears</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t align-top">
                <td className="px-3 py-2 font-medium">Limited jurisdiction</td>
                <td className="px-3 py-2">{courts.limitedCourt}</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Money claims up to {courts.smallClaimsLimit}, evictions, security-deposit disputes, minor offences.
                </td>
              </tr>
              <tr className="border-t align-top">
                <td className="px-3 py-2 font-medium">General jurisdiction</td>
                <td className="px-3 py-2">{courts.trialCourt}</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Injury and malpractice suits, contract claims above the cap, divorce, probate, injunctions, felonies.
                </td>
              </tr>
              {courts.appellateCourt && (
                <tr className="border-t align-top">
                  <td className="px-3 py-2 font-medium">Intermediate appellate</td>
                  <td className="px-3 py-2">{courts.appellateCourt}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    Reviews the trial record for legal error. No new evidence or witnesses.
                  </td>
                </tr>
              )}
              <tr className="border-t align-top">
                <td className="px-3 py-2 font-medium">Court of last resort</td>
                <td className="px-3 py-2">{courts.highestCourt}</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Final state-law authority. Review is usually discretionary.
                  {!courts.appellateCourt && " With no intermediate court, appeals come here directly."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {courts.note && (
          <p className="mt-3 rounded-lg border border-accent/20 bg-accent/5 p-3 text-sm text-muted-foreground">
            <strong className="text-foreground">Worth knowing:</strong> {courts.note}
          </p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <FileText className="h-5 w-5 text-accent" /> Filing a case in {courts.name}, step by step
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Send a written demand.</strong> Put the amount, the reason and a
            deadline in writing. Use our{" "}
            <Link to={lp("/forms/demand-letter")} className="text-accent hover:underline">demand letter builder</Link>{" "}
            and keep proof of delivery — the judge will ask.
          </li>
          <li>
            <strong className="text-foreground">Pick the right court.</strong>{" "}
            {cap
              ? `Under $${cap.toLocaleString()} goes to the ${courts.limitedCourt}; above it, the ${courts.trialCourt}.`
              : `Small money claims go to the ${courts.limitedCourt}; larger claims to the ${courts.trialCourt}.`}{" "}
            File in the county where the defendant lives or where the dispute happened.
          </li>
          <li>
            <strong className="text-foreground">File the complaint and pay the fee</strong> ({courts.smallClaimsFee}).
            Ask about a fee waiver if paying it would be a hardship.
          </li>
          <li>
            <strong className="text-foreground">Serve the defendant</strong> by the method the court allows — sheriff,
            process server or certified mail. Improper service is the single most common reason a case gets thrown out.
          </li>
          <li>
            <strong className="text-foreground">Prepare evidence.</strong> Contract, invoices, photos, texts, repair
            estimates and a one-page timeline. Bring three copies: judge, defendant, you.
          </li>
          <li>
            <strong className="text-foreground">Attend the hearing</strong> and, if you win, ask the clerk how to
            enforce the judgment. A judgment is not payment.
          </li>
        </ol>
      </section>

      <AdSlot slot="mid-content" className="my-8" />

      {(legal || sol) && (
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <Scale className="h-5 w-5 text-accent" /> Deadlines that apply before you file
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {legal && (
              <>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Personal injury deadline</p>
                  <p className="text-lg font-bold">{legal.personalInjurySOL}</p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Property damage deadline</p>
                  <p className="text-lg font-bold">{legal.propertyDamageSOL}</p>
                </div>
              </>
            )}
            {sol?.entries.written_contract && (
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Written contract</p>
                <p className="text-lg font-bold">{sol.entries.written_contract.years} years</p>
                <p className="text-xs text-muted-foreground">{sol.entries.written_contract.citation}</p>
              </div>
            )}
            {sol?.entries.oral_contract && (
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Oral contract</p>
                <p className="text-lg font-bold">{sol.entries.oral_contract.years} years</p>
                <p className="text-xs text-muted-foreground">{sol.entries.oral_contract.citation}</p>
              </div>
            )}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Full deadline table for every claim type:{" "}
            <Link to={lp("/data/settlement-deadlines")} className="text-accent hover:underline">
              state legal deadlines dataset
            </Link>
            .
          </p>
        </section>
      )}

      {cities.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <MapPin className="h-5 w-5 text-accent" /> Courthouses in {courts.name}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                to={lp(`/courts/${courts.slug}/${c.slug}`)}
                className="rounded-lg border bg-card p-4 transition hover:border-accent/50"
              >
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.courthouse.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">{courts.name} court FAQs</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.question} className="rounded-lg border bg-card p-4">
              <h3 className="mb-1 font-semibold">{f.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-6">
        <a
          href={courts.courtWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          <ExternalLink className="h-4 w-4" /> Official {courts.name} judiciary website
        </a>
        <p className="mt-3 text-xs text-muted-foreground">
          Figures verified {COURTS_LAST_VERIFIED} against {courts.statute} and the {courts.name}{" "}
          judiciary fee schedule. Limits and fees change by legislative session — confirm with the
          clerk before filing. This page is general legal information, not legal advice.
        </p>
      </section>
    </div>
  );
}
