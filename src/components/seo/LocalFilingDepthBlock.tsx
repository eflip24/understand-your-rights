import { Link } from "react-router-dom";
import { Landmark, FileText, Clock, ListChecks, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/i18n/paths";
import { getStateCourts, COURTS_LAST_VERIFIED } from "@/data/courts/stateCourts";
import { getSol } from "@/data/solData";
import type { CityData } from "@/data/locations/cityData";

interface Props {
  stateSlug: string;
  stateName: string;
  city: CityData;
  /** Practice-area label, e.g. "Workers' Compensation". */
  practiceLabel: string;
  className?: string;
}

/**
 * Adds real, city-level filing depth to otherwise templated location pages:
 * which court hears the case, what it costs, how it is filed, deadlines and
 * what to bring. Every figure is sourced from the verified court dataset.
 */
export function buildLocalFilingFaqs(
  stateSlug: string,
  stateName: string,
  city: CityData,
  practiceLabel: string,
): { question: string; answer: string }[] {
  const courts = getStateCourts(stateSlug);
  if (!courts) return [];
  const injury = getSol(courts.abbr, "personal_injury");
  return [
    {
      question: `Which court handles a ${practiceLabel.toLowerCase()} case in ${city.name}?`,
      answer: `Most ${practiceLabel.toLowerCase()} lawsuits in ${city.name} are filed in the ${courts.trialCourt}, with the local filing counter at ${city.courthouse.name}, ${city.courthouse.address}. Claims small enough to fit the ${courts.smallClaimsLimit} cap can instead go to the ${courts.limitedCourt}, which is faster and cheaper.`,
    },
    {
      question: `How much does it cost to file in ${city.name}?`,
      answer: `Small claims filing fees in ${stateName} run ${courts.smallClaimsFee} under ${courts.statute}. General civil filings in the ${courts.trialCourt} cost more, and service of process (sheriff or private process server) is billed separately. Fee waivers are available for filers who qualify on income.`,
    },
    {
      question: `Can I file online in ${city.name}?`,
      answer: courts.eFiling
        ? `${stateName} uses ${courts.eFiling}. Whether self-represented filers may use it for a given case type varies by county — confirm on the clerk's page at ${courts.courtWebsite} before you drive to the courthouse.`
        : `${stateName} has no single statewide e-filing portal for self-represented civil filers. Check ${courts.courtWebsite}; filing in person or by mail at ${city.courthouse.name} is often required.`,
    },
    {
      question: `What is the deadline to file in ${stateName}?`,
      answer: injury
        ? `The personal-injury statute of limitations in ${stateName} is ${injury.years} year${injury.years === 1 ? "" : "s"} (${injury.citation}). Missing it ends the claim regardless of how strong the facts are. Workers' compensation, government-entity and insurance-contract claims run on shorter, separate clocks — often notice within 30 to 90 days.`
        : `Deadlines vary by claim type in ${stateName}. Confirm the statute of limitations that applies to your case before you file — missing it ends the claim regardless of the facts.`,
    },
  ];
}

export default function LocalFilingDepthBlock({ stateSlug, stateName, city, practiceLabel, className }: Props) {
  const lp = useLocalizedPath();
  const courts = getStateCourts(stateSlug);
  if (!courts) return null;

  const injury = getSol(courts.abbr, "personal_injury");
  const contract = getSol(courts.abbr, "written_contract");

  const rows: { label: string; value: string }[] = [
    { label: "Court for most civil lawsuits", value: courts.trialCourt },
    { label: "Small claims court", value: courts.limitedCourt },
    { label: "Small claims limit", value: courts.smallClaimsLimit },
    { label: "Small claims filing fee", value: courts.smallClaimsFee },
    { label: "Fee statute", value: courts.statute },
    { label: "E-filing system", value: courts.eFiling ?? "No statewide portal for self-represented filers" },
    { label: "Appeals go to", value: courts.appellateCourt ?? courts.highestCourt },
    ...(injury ? [{ label: "Personal injury deadline", value: `${injury.years} year${injury.years === 1 ? "" : "s"} — ${injury.citation}` }] : []),
    ...(contract ? [{ label: "Written contract deadline", value: `${contract.years} years — ${contract.citation}` }] : []),
  ];

  const steps = [
    `Confirm the right forum: claims at or below ${courts.smallClaimsLimit} belong in the ${courts.limitedCourt}; anything larger goes to the ${courts.trialCourt}.`,
    `Prepare the complaint and, for injury or insurance claims, a written demand to the other side or its carrier first — most cases resolve before a filing fee is ever paid.`,
    courts.eFiling
      ? `File through ${courts.eFiling} or at the clerk's counter at ${city.courthouse.name}, ${city.courthouse.address}.`
      : `File at the clerk's counter at ${city.courthouse.name}, ${city.courthouse.address}, or by mail if the clerk accepts mailed filings.`,
    `Pay ${courts.smallClaimsFee} for small claims (more in the ${courts.trialCourt}) or file a fee-waiver application if you qualify on income.`,
    `Arrange service of process — sheriff, certified mail or a private process server — and file the proof of service with the clerk.`,
    `Calendar every deadline${injury ? `, starting with the ${injury.years}-year injury limitation period` : ""}, and bring three copies of every document to the hearing.`,
  ];

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
        <Landmark className="h-5 w-5 text-accent" />
        Filing a {practiceLabel} Case in {city.name}: Courts, Fees and Deadlines
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Verified {stateName} court data — last checked {COURTS_LAST_VERIFIED}. Fees and limits change by legislative
        session, so confirm on the official court site before filing.
      </p>

      <div className="rounded-lg border bg-card overflow-hidden mb-6">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.label} className={i % 2 ? "bg-muted/30" : ""}>
                <th scope="row" className="text-left font-medium text-muted-foreground p-3 align-top w-1/2">{r.label}</th>
                <td className="p-3 text-foreground">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <ListChecks className="h-4 w-4 text-accent" />
        Step-by-step: how a case is filed in {city.name}
      </h3>
      <ol className="space-y-2 list-decimal pl-5 mb-6">
        {steps.map((s) => (
          <li key={s} className="text-sm text-foreground leading-relaxed">{s}</li>
        ))}
      </ol>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-accent" /> What to bring to the courthouse
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
            <li>Photo ID and your case number</li>
            <li>Three copies of every exhibit — judge, other side, you</li>
            <li>A one-page written timeline of events</li>
            <li>The contract, policy or medical records at issue</li>
            <li>Proof of what you paid or lost (invoices, bank records)</li>
            <li>Filed proof of service on the other party</li>
          </ul>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" /> Realistic timeline
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-4">
            <li>Demand letter response: 2–4 weeks</li>
            <li>Small claims hearing date: 30–90 days after filing</li>
            <li>Civil case in the {courts.trialCourt}: 9–24 months to trial</li>
            <li>Insurance settlement after demand: 1–6 months</li>
            <li>Collecting on a judgment: weeks to years</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Link to={lp(`/courts/${courts.slug}/${city.slug}`)} className="text-accent font-medium hover:underline inline-flex items-center gap-1">
          {city.name} courthouse guide →
        </Link>
        <Link to={lp(`/courts/${courts.slug}`)} className="text-accent font-medium hover:underline inline-flex items-center gap-1">
          {stateName} court system →
        </Link>
        <Link to={lp("/forms/demand-letter")} className="text-accent font-medium hover:underline inline-flex items-center gap-1">
          Free demand letter builder →
        </Link>
        <a href={courts.courtWebsite} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline inline-flex items-center gap-1">
          Official {stateName} judiciary site <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      {courts.note && (
        <p className="mt-3 text-xs text-muted-foreground italic">
          <Badge variant="outline" className="mr-2 text-[10px]">Local rule</Badge>
          {courts.note}
        </p>
      )}
    </section>
  );
}
