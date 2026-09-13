import { Link } from "react-router-dom";
import ContentPageLayout from "@/components/layout/ContentPageLayout";
import AuthorByline from "@/components/seo/AuthorByline";
import AdSlot from "@/components/ads/AdSlot";
import { JsonLdGraph, breadcrumbSchema, articleSchema } from "@/components/seo/JsonLd";
import { useLocalizedPath } from "@/i18n/paths";

const SITE = "https://legallyspoken.com";
const PATH = "/english-speaking-lawyer-in-spain";
const REVIEWED = "2026-09-13";

/**
 * Dedicated guide for the single largest search cluster the site already earns
 * impressions for: people outside Spain (Denmark, Sweden, Norway, the
 * Netherlands, Germany, the UK) looking for a lawyer in Spain.
 *
 * The native-language sections exist because those are the literal queries
 * Search Console reports ("advokat i spanien", "advokat i spania",
 * "advocaat spaanstalig", "abogado spain") — each carries genuine summary
 * content in that language rather than a translated stub.
 */

const FEES = [
  {
    matter: "Property purchase (conveyancing)",
    range: "0.8% – 1.5% of price, minimum €1,200–€1,800",
    note: "Covers title search at the Registro de la Propiedad, charges and debts, licence and habitation checks, deposit contract and completion. Separate from notary, registry and transfer tax.",
  },
  {
    matter: "Spanish inheritance / probate (non-resident heir)",
    range: "€1,500 – €4,500 plus disbursements",
    note: "Grant acceptance deed, NIE for each heir, succession tax return within 6 months of death (extendable once by 6 months on request).",
  },
  {
    matter: "NIE, residency or TIE application",
    range: "€250 – €900",
    note: "A gestoría can often file this more cheaply; use an abogado where the application follows a refusal or an immigration complication.",
  },
  {
    matter: "Unfair dismissal claim (despido improcedente)",
    range: "€900 – €3,000, or a percentage of the award",
    note: "The claim window is 20 working days from dismissal — the shortest deadline in Spanish employment law.",
  },
  {
    matter: "Civil litigation (contract, developer, insurer)",
    range: "Abogado fee plus a separate procurador fee",
    note: "Most court claims require both. Budget the procurador separately; the tariff is modest but it is a second bill.",
  },
  {
    matter: "Bank, mortgage or insurance complaint",
    range: "€600 – €2,000, sometimes success-based",
    note: "Internal complaint to the entity first, then the Banco de España or DGSFP claims service before court.",
  },
];

const VERIFY = [
  {
    q: "Ask for the colegiado number and the bar",
    a: "Every practising Spanish lawyer holds a number with a provincial bar (Colegio de Abogados). Ask for the number and the province, then check it with that bar directly. A lawyer who will not give you the number is not one you should instruct.",
  },
  {
    q: "Confirm you are hiring an abogado, not a gestor",
    a: "A gestoría handles paperwork and tax filings legitimately, but is not a lawyer, cannot advise you on law, and is not covered by professional indemnity insurance in the same way. Many foreign buyers discover this only when something goes wrong.",
  },
  {
    q: "Get the fee in writing before any work starts",
    a: "Ask for a hoja de encargo (engagement letter) stating the fixed fee or hourly rate, what is excluded, and whether IVA (21%) is included. Quotes to foreign clients are often quoted net of IVA.",
  },
  {
    q: "Never let the seller's or agent's lawyer act for you",
    a: "The notary is neutral and acts for neither side. The estate agent is paid by the seller. If the same firm is introduced by the seller, instruct someone independent.",
  },
  {
    q: "Check who actually does the work in your language",
    a: "Firms advertise English, Danish, Swedish, Dutch or German. Ask which named person handles your file in that language, and whether court documents will be translated or only summarised.",
  },
];

const FAQS = [
  {
    question: "Do I need a Spanish lawyer to buy property in Spain?",
    answer:
      "It is not legally required — the notary will complete a sale without one — but the notary does not check the property's debts, planning position or licence status for you. An independent abogado does the searches at the Land Registry and town hall before you commit your deposit. That deposit is usually 10% and is normally lost if you walk away.",
  },
  {
    question: "How do I check a Spanish lawyer is genuine?",
    answer:
      "Ask for their colegiado (bar membership) number and the province of the Colegio de Abogados they belong to, then verify it with that bar. Spanish bars maintain public registers of admitted lawyers.",
  },
  {
    question: "What is the difference between an abogado and a procurador?",
    answer:
      "The abogado advises you and argues your case. The procurador is a separate court agent who files documents and receives service. Most Spanish court proceedings require both, so litigation carries two professional fees.",
  },
  {
    question: "Can I instruct a Spanish lawyer without travelling to Spain?",
    answer:
      "Yes, in most matters. You grant a power of attorney (poder notarial) before a notary in your own country, apostilled and translated by a sworn translator, or at a Spanish consulate. Many purchases and inheritances are completed entirely by proxy.",
  },
  {
    question: "How long do I have to challenge a dismissal in Spain?",
    answer:
      "Twenty working days from the effective date of dismissal to file the conciliation claim. The deadline is strict and weekends and public holidays are excluded, but it moves fast — take advice in the first week.",
  },
  {
    question: "How much does Spanish inheritance tax cost a foreign heir?",
    answer:
      "Succession tax (Impuesto sobre Sucesiones y Donaciones) is set regionally, so the bill depends on the autonomous community where the assets sit and your relationship to the deceased. Some regions apply very large reductions to spouses and children. The return is due within six months of death, extendable once by six months if requested in the fifth month.",
  },
  {
    question: "Is an English-language contract valid in Spain?",
    answer:
      "A contract in English can be valid between the parties, but public deeds and court filings are in Spanish, and a sworn (jurada) translation is needed for official use. Where a bilingual contract exists, check which language version governs — it is usually Spanish.",
  },
  {
    question: "Can I use legal aid in Spain as a foreign national?",
    answer:
      "Justicia gratuita is available on means-tested grounds to EU citizens and lawful residents, applied for through the local bar association. Thresholds are tied to the IPREM income indicator and vary with household size.",
  },
];

export default function LawyerInSpainGuide() {
  const lp = useLocalizedPath();

  return (
    <ContentPageLayout
      title="Finding an English-speaking lawyer in Spain"
      subtitle="How Spanish legal practice actually works for foreign buyers, heirs, residents and employees — who does what, what it costs, and how to check a lawyer is real before you pay anything."
      category="Spain · Cross-border"
      metaTitle="English-Speaking Lawyer in Spain: Costs, Checks & How to Hire (2026)"
      metaDescription="Independent guide to hiring a lawyer in Spain from abroad: abogado vs gestor vs notario, typical fees by matter, how to verify a colegiado number, and deadlines that catch foreign clients out."
      breadcrumbs={[
        { label: "Find a lawyer in Europe", href: "/lawyer-eu" },
        { label: "Spain" },
      ]}
      relatedToolIds={["severance-calculator"]}
      faqs={FAQS}
    >
      <JsonLdGraph
        schemas={[
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Find a lawyer in Europe", url: `${SITE}/lawyer-eu` },
            { name: "English-speaking lawyer in Spain", url: `${SITE}${PATH}` },
          ]),
          articleSchema(
            "Finding an English-speaking lawyer in Spain",
            "How Spanish legal practice works for foreign buyers, heirs, residents and employees: professional roles, typical fees, verification checks and key deadlines.",
            `${SITE}${PATH}`,
            REVIEWED,
          ),
        ]}
      />

      <AuthorByline reviewedAt={REVIEWED} compact className="mb-6" />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Start with the four roles — most mistakes happen here</h2>
        <p>
          Spanish practice divides work between professionals in a way that surprises
          people from the UK, Ireland, the Nordics and the Netherlands, where one
          solicitor usually handles everything. Getting the roles wrong is the single
          most common and most expensive error foreign clients make.
        </p>
        <ul>
          <li>
            <strong>Abogado</strong> — a qualified lawyer admitted to a provincial bar
            (Colegio de Abogados), holding a colegiado number. Only an abogado advises
            you on law and represents you in court.
          </li>
          <li>
            <strong>Procurador</strong> — a court agent who files and receives documents.
            Most litigation requires one in addition to your abogado.
          </li>
          <li>
            <strong>Gestor / gestoría</strong> — an administrative agent. Entirely
            legitimate for tax filings, vehicle transfers and routine paperwork, but not
            a lawyer and not permitted to give legal advice.
          </li>
          <li>
            <strong>Notario</strong> — a public official who certifies the deed. The
            notary is neutral, acts for neither buyer nor seller, and will not tell you
            whether the price, the debts or the building licence are in your interest.
          </li>
        </ul>

        <h2>What a Spanish lawyer typically costs</h2>
        <p>
          Fees are not fixed by tariff. These are indicative market ranges for foreign
          clients, before IVA at 21% and before third-party costs such as notary,
          registry, translation and tax. Always ask for the figure in writing.
        </p>
      </div>

      <div className="my-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="p-3 text-left font-semibold">Matter</th>
              <th className="p-3 text-left font-semibold">Typical fee range</th>
              <th className="p-3 text-left font-semibold">What it covers / watch for</th>
            </tr>
          </thead>
          <tbody>
            {FEES.map((f) => (
              <tr key={f.matter} className="border-t align-top">
                <td className="p-3 font-medium">{f.matter}</td>
                <td className="p-3 whitespace-nowrap">{f.range}</td>
                <td className="p-3 text-muted-foreground">{f.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdSlot slot="mid-content" className="my-8" />

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Five checks before you pay anything</h2>
        <ol>
          {VERIFY.map((v) => (
            <li key={v.q} className="mb-3">
              <strong>{v.q}.</strong> {v.a}
            </li>
          ))}
        </ol>

        <h2>Deadlines that catch foreign clients out</h2>
        <ul>
          <li>
            <strong>Dismissal claim: 20 working days.</strong> Conciliation must be filed
            within 20 working days of the dismissal taking effect. Missing it generally
            ends the claim.
          </li>
          <li>
            <strong>Inheritance tax: 6 months.</strong> The succession tax return is due
            within six months of death, extendable once by six months if the extension is
            requested during the fifth month.
          </li>
          <li>
            <strong>Property deposit contract.</strong> A contrato de arras typically
            forfeits the buyer's 10% deposit on withdrawal, and obliges the seller to
            repay double on theirs. Do the legal searches before signing it, not after.
          </li>
          <li>
            <strong>Insurance and bank complaints.</strong> You normally have to exhaust
            the entity's internal complaints service before the Banco de España or the
            insurance regulator will look at the case.
          </li>
        </ul>

        <h2>If your matter is employment-related</h2>
        <p>
          Dismissal compensation in Spain is calculated from your daily salary and years
          of service, with different formulas for objective and unfair dismissal. Our{" "}
          <Link to={lp("/eu-tools/severance-calculator/spain")}>
            Spanish severance calculator
          </Link>{" "}
          and{" "}
          <Link to={lp("/eu-tools/notice-period-calculator/spain")}>
            notice period calculator
          </Link>{" "}
          produce an estimate before you speak to anyone, so you can judge whether a
          settlement offer is reasonable.
        </p>
      </div>

      <section className="my-10 space-y-6 rounded-xl border bg-muted/30 p-6">
        <h2 className="text-2xl font-bold">In your own language</h2>
        <p className="text-sm text-muted-foreground">
          Short summaries for readers searching from Denmark, Sweden, Norway and the
          Netherlands. The full guide above is in English.
        </p>

        <div lang="da">
          <h3 className="font-semibold">Advokat i Spanien — dansk sammenfatning</h3>
          <p className="text-muted-foreground">
            I Spanien er arbejdet delt mellem flere fagpersoner. En{" "}
            <em>abogado</em> er den egentlige advokat og er medlem af et provinsielt
            advokatsamfund (Colegio de Abogados) med et colegiado-nummer, som du altid
            bør bede om og kontrollere. En <em>gestor</em> ordner papirarbejde, men er
            ikke advokat. <em>Notaren</em> er neutral og repræsenterer hverken køber
            eller sælger — han kontrollerer ikke boligens gæld eller byggetilladelse for
            dig. Ved boligkøb koster en uafhængig advokat typisk 0,8–1,5 % af prisen, og
            arvesager for udenlandske arvinger 1.500–4.500 €. Fristen for at anfægte en
            afskedigelse er kun 20 arbejdsdage, og spansk arveafgift skal angives inden
            seks måneder efter dødsfaldet. Du kan give fuldmagt (poder notarial) hos en
            notar i Danmark og behøver derfor sjældent at rejse.
          </p>
        </div>

        <div lang="sv">
          <h3 className="font-semibold">Advokat i Spanien — svensk sammanfattning</h3>
          <p className="text-muted-foreground">
            Spansk juridik fördelas mellan flera yrkesroller. <em>Abogado</em> är
            advokaten, inskriven i ett provinsiellt advokatsamfund med ett
            colegiado-nummer som du bör begära och kontrollera. En <em>gestoría</em>
            {" "}sköter administration men får inte ge juridisk rådgivning, och{" "}
            <em>notarien</em> är neutral och granskar inte fastighetens skulder eller
            bygglov åt dig. Räkna med 0,8–1,5 % av köpeskillingen för en oberoende
            advokat vid fastighetsköp och 1 500–4 500 € i arvsärenden. Vid uppsägning
            gäller endast 20 arbetsdagar för att inleda förlikningsförfarandet, och
            arvsskatten ska deklareras inom sex månader. Begär alltid ett skriftligt
            uppdragsavtal (hoja de encargo) med angivet arvode och om moms (IVA 21 %)
            ingår.
          </p>
        </div>

        <div lang="no">
          <h3 className="font-semibold">Advokat i Spania — norsk sammendrag</h3>
          <p className="text-muted-foreground">
            I Spania deles arbeidet mellom flere yrkesgrupper. <em>Abogado</em> er
            advokaten, medlem av et provinsielt advokatsamfunn med et colegiado-nummer du
            bør be om og sjekke. En <em>gestor</em> håndterer papirarbeid, men er ikke
            advokat. <em>Notaren</em> er nøytral og kontrollerer ikke boligens heftelser
            eller byggetillatelse på dine vegne. Ved boligkjøp ligger uavhengig advokat
            vanligvis på 0,8–1,5 % av kjøpesummen, arvesaker på 1 500–4 500 €. Frist for
            å bestride en oppsigelse er 20 virkedager, og arveavgift må meldes innen seks
            måneder etter dødsfallet. Du kan gi fullmakt (poder notarial) hos notarius i
            Norge, med apostille og statsautorisert oversettelse.
          </p>
        </div>

        <div lang="nl">
          <h3 className="font-semibold">
            Spaanstalige of Nederlandstalige advocaat in Spanje — samenvatting
          </h3>
          <p className="text-muted-foreground">
            In Spanje is het werk verdeeld over verschillende beroepen. De{" "}
            <em>abogado</em> is de advocaat, ingeschreven bij een provinciale orde
            (Colegio de Abogados) met een colegiado-nummer dat u altijd kunt opvragen en
            controleren. Een <em>gestoría</em> verzorgt administratie maar geeft geen
            juridisch advies, en de <em>notaris</em> is neutraal: hij controleert niet of
            de woning schulden of een geldige bouwvergunning heeft. Reken bij aankoop van
            onroerend goed op 0,8–1,5 % van de koopsom voor een onafhankelijke advocaat
            en op € 1.500–4.500 bij erfeniszaken. Een ontslag moet binnen 20 werkdagen
            worden aangevochten en de successieaangifte binnen zes maanden. Vraag altijd
            een schriftelijke opdrachtbevestiging met vermelding of de btw (IVA 21 %) is
            inbegrepen.
          </p>
        </div>
      </section>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Where to go next</h2>
        <ul>
          <li>
            <Link to={lp("/lawyer-eu/spain")}>Lawyers in Spain by city and practice area</Link>
          </li>
          <li>
            <Link to={lp("/eu-tools")}>European employment calculators</Link>
          </li>
          <li>
            <Link to={lp("/eu-forms")}>EU legal forms and GDPR request packs</Link>
          </li>
          <li>
            <Link to={lp("/lawyer-eu")}>Find a lawyer elsewhere in Europe</Link>
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Fee ranges are indicative market figures gathered from published bar guidance
          and professional tariffs, last reviewed {REVIEWED}. LegallySpoken is not a law
          firm and does not provide legal advice or lawyer referrals for payment.
        </p>
      </div>
    </ContentPageLayout>
  );
}
