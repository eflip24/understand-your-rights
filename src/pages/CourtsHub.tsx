import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Landmark, Search, Scale, FileText } from "lucide-react";
import Head from "@/components/seo/Head";
import { JsonLdGraph, breadcrumbSchema, faqSchema, itemListSchema, articleSchema } from "@/components/seo/JsonLd";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/i18n/paths";
import { stateCourts, COURTS_LAST_VERIFIED, COURT_SOURCES } from "@/data/courts/stateCourts";

const SITE = "https://legallyspoken.com";

const FAQS = [
  {
    question: "Which court do I file my case in?",
    answer:
      "It depends on how much money is in dispute and what kind of case it is. Money claims under your state's small claims cap go to the limited-jurisdiction court (justice, magistrate, district or county court, depending on the state). Larger claims, injunctions, divorce and most injury lawsuits go to the general-jurisdiction trial court — usually called the Superior, District, Circuit or Common Pleas Court.",
  },
  {
    question: "How much does it cost to file a civil case?",
    answer:
      "Small claims filing fees in the tables on these pages run from about $4 in South Dakota to roughly $379 in parts of Illinois. General civil filing fees are higher, commonly $100–$450. Most courts waive fees if you file a fee-waiver affidavit showing you cannot afford them.",
  },
  {
    question: "Can I bring a lawyer to small claims court?",
    answer:
      "It varies by state. California, Nebraska, Idaho, Kansas and Arizona (unless both sides agree) bar attorneys from representing parties at the small claims hearing. Montana allows one only if both sides have one. Most other states permit lawyers freely, though many people appear without one.",
  },
  {
    question: "What is the difference between a trial court and an appellate court?",
    answer:
      "A trial court hears evidence, takes testimony and decides the facts. An appellate court does not retry the case — it reviews the trial record for legal error. Most states have an intermediate appellate court; a handful (Delaware, Maine, Montana, New Hampshire, Rhode Island, South Dakota, Vermont, Wyoming) send appeals straight to the state supreme court.",
  },
  {
    question: "Do these pages list individual judges?",
    answer:
      "No. We publish court-level information — structure, jurisdiction, filing rules, fees and official contact details — verified against state judiciary sources. We do not publish profiles of individual judges.",
  },
  {
    question: "How current is this information?",
    answer:
      `Every record on these pages was last verified on ${COURTS_LAST_VERIFIED} against the statute or fee schedule cited in the table. Legislatures adjust small claims caps and fee schedules frequently, so confirm the figure on the official court website before you file.`,
  },
];

export default function CourtsHub() {
  const lp = useLocalizedPath();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return stateCourts;
    return stateCourts.filter(
      (s) =>
        s.name.toLowerCase().includes(needle) ||
        s.abbr.toLowerCase() === needle ||
        s.trialCourt.toLowerCase().includes(needle) ||
        s.limitedCourt.toLowerCase().includes(needle),
    );
  }, [q]);

  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: SITE },
      { name: "US Courts", url: `${SITE}/courts` },
    ]),
    itemListSchema(
      "US state court systems",
      stateCourts.map((s) => ({ url: `${SITE}/courts/${s.slug}`, name: `${s.name} courts` })),
    ),
    faqSchema(FAQS),
    articleSchema(
      "US Court Systems: Where to File, What It Costs, and Which Court Hears Your Case",
      "Court structure, small claims limits, filing fees and official contacts for all 51 US jurisdictions.",
      `${SITE}/courts`,
      undefined,
      COURTS_LAST_VERIFIED,
      COURTS_LAST_VERIFIED,
    ),
  ];

  return (
    <div className="container max-w-5xl py-8">
      <Head
        title="US Court Systems by State — Small Claims Limits, Filing Fees & Where to File"
        description="Which court hears your case in each US state, the small claims dollar limit, filing fee ranges, the governing statute and the official judiciary website. All 51 jurisdictions."
        englishOnly
      />
      <JsonLdGraph schemas={schemas} />

      <Badge variant="secondary" className="mb-3">51 jurisdictions</Badge>
      <h1 className="mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
        US Court Systems: Where to File and What It Costs
      </h1>
      <p className="max-w-3xl text-lg text-muted-foreground">
        Every US state runs its own court system with its own names, dollar thresholds and filing
        rules. This reference answers the two questions people actually have before filing: which
        court hears my case, and what will it cost to start it?
      </p>

      <AuthorByline reviewedAt={COURTS_LAST_VERIFIED} className="my-6" />
      <AdSlot slot="above-content" className="mb-8" />

      <section className="mb-8 rounded-lg border bg-card p-5">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
          <Scale className="h-5 w-5 text-accent" /> How US state courts are organised
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Nearly every state uses the same four-layer shape, even though the names change at the
            state line. At the bottom sits a <strong className="text-foreground">limited-jurisdiction court</strong> —
            justice, magistrate, county, district or municipal — which handles small money claims,
            evictions, traffic matters and minor offences. Its small claims division uses simplified
            procedure so people can appear without a lawyer.
          </p>
          <p>
            Above it sits the <strong className="text-foreground">general-jurisdiction trial court</strong>, called the
            Superior Court in California and Washington, the Circuit Court in Florida and Illinois,
            the District Court in Texas and Minnesota, and the Court of Common Pleas in Ohio and
            Pennsylvania. New York inverts the usual naming: its trial court is the Supreme Court,
            while its highest court is the Court of Appeals. Injury lawsuits, contract disputes above
            the small claims cap, divorce and probate all start here.
          </p>
          <p>
            Appeals go to an <strong className="text-foreground">intermediate appellate court</strong> in most states, then
            to the <strong className="text-foreground">state court of last resort</strong>. Eight states have no intermediate
            court, so an appeal goes straight to the top. Federal claims — civil rights suits, ERISA
            disability appeals, most patent and bankruptcy matters — run on a separate federal track
            regardless of which state you live in.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Landmark className="h-5 w-5 text-accent" /> Court systems by state
          </h2>
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a state or court name"
              aria-label="Search state court systems"
              className="pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">State</th>
                <th scope="col" className="px-3 py-2 font-semibold">Trial court</th>
                <th scope="col" className="px-3 py-2 font-semibold">Small claims court</th>
                <th scope="col" className="px-3 py-2 font-semibold">Limit</th>
                <th scope="col" className="px-3 py-2 font-semibold">Filing fee</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.slug} className="border-t align-top">
                  <td className="px-3 py-2 font-medium">
                    <Link to={lp(`/courts/${s.slug}`)} className="text-accent hover:underline">
                      {s.name}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{s.trialCourt}</td>
                  <td className="px-3 py-2 text-muted-foreground">{s.limitedCourt}</td>
                  <td className="px-3 py-2 font-semibold">{s.smallClaimsLimit}</td>
                  <td className="px-3 py-2 text-muted-foreground">{s.smallClaimsFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="mt-3 text-sm text-muted-foreground">No state matches “{q}”.</p>
        )}
      </section>

      <AdSlot slot="mid-content" className="my-8" />

      <section className="mb-8 rounded-lg border bg-card p-5">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
          <FileText className="h-5 w-5 text-accent" /> Before you file
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Send a written demand first — many courts expect it, and most disputes settle at this stage. Our <Link to={lp("/forms/demand-letter")} className="text-accent hover:underline">demand letter builder</Link> produces one in a few minutes.</li>
          <li>Check the filing deadline for your claim type in the <Link to={lp("/data/settlement-deadlines")} className="text-accent hover:underline">state legal deadlines dataset</Link>. Filing one day late ends the case regardless of merit.</li>
          <li>Sue in the county where the defendant lives or where the dispute happened — filing in the wrong venue gets the case dismissed or transferred.</li>
          <li>Bring the contract, invoices, photos, texts and a one-page timeline. Judges in small claims decide on documents far more often than on argument.</li>
          <li>Winning is not collecting. Ask the clerk what enforcement tools the court offers — wage garnishment, bank levy or a property lien.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <div key={f.question} className="rounded-lg border bg-card p-4">
              <h3 className="mb-1 font-semibold">{f.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Sources and methodology
        </h2>
        <p className="mb-2 text-xs text-muted-foreground">
          Small claims limits, fee ranges and statutory citations are compiled from published
          statutory surveys and each state's own judiciary website, last verified {COURTS_LAST_VERIFIED}.
          Court names describe the standard civil structure; some counties operate additional
          specialised courts.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
          {COURT_SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This page is general legal information, not legal advice.
          Confirm every figure with the official court before filing.
        </p>
      </section>
    </div>
  );
}
