import { Link } from "react-router-dom";
import Head from "@/components/seo/Head";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocalizedPath } from "@/i18n/paths";

type Variant = "unfair-dismissal" | "settlement-agreement";
type Src = { label: string; url: string };

const CI_UD = { label: "Citizens Information – Unfair dismissal", url: "https://www.citizensinformation.ie/en/employment/unemployment-and-redundancy/dismissal/unfair-dismissal/" };
const WRC_D = { label: "Workplace Relations Commission – Dismissal", url: "https://www.workplacerelations.ie/en/what_you_should_know/ending%20the%20employment%20relationship/dismissal/" };
const REV = { label: "Revenue – Basic exemption", url: "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/lump-sum-payments/basic-exemption.aspx" };
const CI_RED = { label: "Citizens Information – Redundancy payments", url: "https://www.citizensinformation.ie/en/employment/unemployment-and-redundancy/redundancy/redundancy-payments/" };

const CONTENT: Record<Variant, {
  title: string; h1: string; description: string; intro: string;
  sections: { h: string; points: { t: string; s?: Src }[] }[];
  faqs: { q: string; a: string }[];
}> = {
  "unfair-dismissal": {
    title: "Unfair Dismissal in Ireland (2026): Rules, WRC Time Limits & Compensation",
    h1: "Unfair dismissal in Ireland: what counts, deadlines and compensation",
    description: "Plain-English guide to unfair dismissal in Ireland: the 12-month service rule, automatically unfair reasons, the 6-month WRC deadline, up to 104 weeks' pay, and getting a solicitor review.",
    intro: "Under the Unfair Dismissals Acts 1977–2015, a dismissal is presumed unfair unless your employer can show substantial grounds for it. Here is how the rules work and what to do quickly.",
    sections: [
      { h: "When a dismissal is unfair", points: [
        { t: "A dismissal is automatically unfair if it is because of trade union membership, religious or political opinions, taking legal proceedings, race, sexual orientation, age, Traveller community membership, pregnancy or family leave, unfair selection for redundancy, or making a protected disclosure.", s: CI_UD },
        { t: "Dismissals for capability, competence, conduct, legal bars to doing the job, or genuine redundancy are generally not unfair — but the employer must still follow fair procedures.", s: CI_UD },
        { t: "Constructive dismissal: if you resign because of your employer's conduct, it can still count as a dismissal, though the burden of proof shifts to you.", s: CI_UD },
      ]},
      { h: "Who can claim and the deadline", points: [
        { t: "You generally need at least 12 months' continuous service. This does not apply to automatically unfair reasons such as pregnancy, trade union activity or protected disclosures.", s: CI_UD },
        { t: "Complaints go to the Workplace Relations Commission (WRC) within 6 months of the dismissal date. This can be extended to 12 months only for reasonable cause.", s: WRC_D },
      ]},
      { h: "What you can be awarded", points: [
        { t: "Remedies are reinstatement, re-engagement or compensation. Compensation is capped at 104 weeks' remuneration for financial loss; if you suffered no financial loss, up to 4 weeks' pay.", s: CI_UD },
        { t: "Statutory redundancy (if your role genuinely ended) is 2 weeks' pay per year of service plus 1 week, with pay capped at €600 a week.", s: CI_RED },
      ]},
    ],
    faqs: [
      { q: "Do I need a solicitor for the WRC?", a: "No — you can bring a WRC complaint yourself, and costs are not normally awarded. Many people still get a solicitor to review their case and any settlement offer before the hearing." },
      { q: "My employer has offered money to drop my claim. Should I sign?", a: "A settlement usually waives your unfair dismissal claim and other claims. Check the amount against what the WRC could award and the tax treatment before signing." },
    ],
  },
  "settlement-agreement": {
    title: "Settlement Agreements in Ireland (2026): What to Check Before Signing",
    h1: "Settlement and severance agreements in Ireland: what to check before you sign",
    description: "Irish settlement agreement checklist: what claims you waive, statutory redundancy, the €10,160 + €765/year tax-free basic exemption, and fixed-fee solicitor review.",
    intro: "A settlement agreement trades a payment for you giving up claims against your employer. Once signed, it is usually final, so check the maths, the waiver and the tax before you sign.",
    sections: [
      { h: "Check the money", points: [
        { t: "Statutory redundancy is an entitlement, not a bonus: 2 weeks' pay per year of service plus 1 extra week, with weekly pay capped at €600, after 104 weeks' service.", s: CI_RED },
        { t: "Notice pay, accrued holidays, and bonus or commission earned up to your exit date should be paid on top of any ex-gratia sum.", s: CI_RED },
      ]},
      { h: "Check the tax", points: [
        { t: "Statutory redundancy is tax-free.", s: CI_RED },
        { t: "Ex-gratia termination payments are tax-free up to the basic exemption of €10,160 plus €765 for each full year of service, within a €200,000 lifetime limit. Increased exemptions and SCSB relief may give more.", s: REV },
        { t: "How each payment is labelled in the agreement changes the tax, so the same headline figure can leave you with very different take-home pay.", s: REV },
      ]},
      { h: "Check the waiver and restrictions", points: [
        { t: "Make sure the agreement lists which claims you are waiving, such as unfair dismissal, equality, wages, and notice. Ask for carve-outs for accrued pension rights and personal injury claims you don't know about yet.", s: WRC_D },
        { t: "Look for mutual confidentiality and non-disparagement clauses, an agreed reference, and whether any non-compete clause is being reaffirmed.", s: WRC_D },
        { t: "Employers often pay a contribution towards independent legal advice. Ask for it, because informed consent makes the waiver stronger for both sides.", s: WRC_D },
      ]},
    ],
    faqs: [
      { q: "How long should I get to consider it?", a: "There is no fixed statutory period in Ireland, but you should be given a reasonable time — at least several days — and be advised to get independent legal advice." },
      { q: "Will my employer pay for the solicitor?", a: "Often yes, typically a capped contribution. Ask in writing before you instruct a solicitor." },
    ],
  },
};

export default function IrelandEmploymentPage({ variant }: { variant: Variant }) {
  const c = CONTENT[variant];
  const lp = useLocalizedPath();
  const other = variant === "unfair-dismissal" ? "settlement-agreement" : "unfair-dismissal";
  return (
    <div className="container max-w-4xl py-10 px-4">
      <Head title={c.title} description={c.description} englishOnly />
      <p className="text-sm font-medium text-primary">Ireland · Employment law · Reviewed October 2026</p>
      <h1 className="font-serif text-3xl md:text-4xl font-bold mt-1">{c.h1}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{c.intro}</p>

      {c.sections.map((s) => (
        <section key={s.h} className="mt-8">
          <h2 className="font-serif text-2xl font-bold">{s.h}</h2>
          <ul className="mt-3 space-y-3 list-disc pl-6">
            {s.points.map((p) => (
              <li key={p.t}>{p.t}{p.s && <> <a href={p.s.url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-primary">({p.s.label})</a></>}</li>
            ))}
          </ul>
        </section>
      ))}

      <Card className="mt-10 border-primary/40"><CardContent className="pt-6 flex flex-wrap justify-between items-center gap-3">
        <div>
          <p className="font-semibold">Have an Irish solicitor review your agreement or offer</p>
          <p className="text-sm text-muted-foreground">Free AI red-flag summary, then a verified solicitor at a fixed fee you pay directly to them.</p>
        </div>
        <Button asChild><Link to={lp("/lawyer-review/severance-ireland")}>Start a review</Link></Button>
      </CardContent></Card>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold">Common questions</h2>
        {c.faqs.map((f) => (<div key={f.q} className="mt-4"><h3 className="font-semibold">{f.q}</h3><p className="text-muted-foreground">{f.a}</p></div>))}
      </section>

      <p className="mt-8 text-sm">Related: <Link className="underline" to={lp(`/ireland/${other}`)}>{CONTENT[other].h1}</Link></p>
      <p className="mt-6 text-xs text-muted-foreground">General information only, not legal advice. LegallySpoken is not a law firm. Figures checked against official sources in October 2026.</p>
    </div>
  );
}
