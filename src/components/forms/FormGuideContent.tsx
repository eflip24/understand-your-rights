/**
 * FormGuideContent
 * ----------------
 * Long-form, entity-dense editorial content rendered underneath a form
 * wizard. Turns a thin "fill out the form" page into a genuinely useful
 * guide page for high-volume form queries (power of attorney, eviction
 * notice, etc.) without touching the wizard logic.
 *
 * Add a new entry to FORM_GUIDES keyed by the form slug to give that form
 * the same treatment.
 */

import AuthorByline from "@/components/seo/AuthorByline";

export interface FormGuideTable {
  caption: string;
  columns: string[];
  rows: string[][];
  note?: string;
}

export interface FormGuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  tables?: FormGuideTable[];
}

export interface FormGuide {
  /** Short editorial lede shown above the sections. */
  intro: string[];
  sections: FormGuideSection[];
  faqs: { question: string; answer: string }[];
  reviewedOn: string;
  related?: { label: string; href: string }[];
}

export const FORM_GUIDES: Record<string, FormGuide> = {
  "power-of-attorney-financial": {
    reviewedOn: "2026-08-06",
    intro: [
      "A financial power of attorney (also called a durable power of attorney for finances, or a statutory POA in states that publish an official form) lets you name an agent — sometimes called an attorney-in-fact — to handle money matters on your behalf. Depending on how you draft it, that authority can cover banking, real property, tax filings, retirement accounts, insurance, government benefits and business interests.",
      "Two choices drive everything else in the document. First, durable versus springing: a durable POA takes effect on signing and survives your incapacity, while a springing POA only activates when a physician certifies incapacity. Second, scope: a general POA grants broad authority, a limited or special POA grants authority for one transaction or one time window. Roughly 30 states have adopted a version of the Uniform Power of Attorney Act (UPOAA), which standardizes agent duties and gives banks a statutory reason to accept the form.",
    ],
    sections: [
      {
        heading: "Durable vs springing vs limited — which one you actually need",
        tables: [
          {
            caption: "Financial power of attorney types compared",
            columns: ["Type", "When it takes effect", "Best for", "Main drawback"],
            rows: [
              ["Durable (general)", "Immediately on signing; survives incapacity", "Most estate-planning and caregiving situations", "Agent has authority right away — choose carefully"],
              ["Springing", "Only after a physician certifies incapacity", "People uncomfortable granting immediate authority", "Banks often delay while verifying the certification"],
              ["Limited / special", "Immediately, for one defined purpose", "A single closing, vehicle sale or tax filing", "Useless outside the stated transaction"],
              ["Non-durable general", "Immediately; ends at incapacity", "Short absences (deployment, travel)", "Fails exactly when it is usually needed"],
              ["Military POA", "Immediately, per 10 U.S.C. § 1044b", "Service members; valid in every state", "Requires a military legal assistance notary"],
            ],
            note: "Every type ends automatically at the principal's death — after death, only an executor or successor trustee can act.",
          },
        ],
      },
      {
        heading: "Powers you can grant, and the ones that need explicit language",
        paragraphs: [
          "Most statutory forms grant broad subject-matter authority by check box, but a defined group of 'hot powers' must be granted expressly because they can change who inherits your estate. Under the UPOAA, an agent cannot make gifts, create or amend a trust, change beneficiary designations, create rights of survivorship, delegate authority, or waive survivor benefits unless the document says so in plain terms.",
        ],
        bullets: [
          "Banking and investment transactions — the most commonly used power in practice.",
          "Real property: buying, selling, mortgaging, and signing closing documents.",
          "Tax matters — most agencies also want IRS Form 2848 on file for federal representation.",
          "Retirement plans and IRAs, including rollovers and required minimum distributions.",
          "Insurance and annuity transactions, including claims and policy changes.",
          "Government benefits — note that Social Security does not accept a POA; it requires a Representative Payee application.",
          "Hot powers (gifting, beneficiary changes, trust amendments) must be granted expressly.",
        ],
      },
      {
        heading: "Signing requirements by state",
        paragraphs: [
          "Notarization is the practical requirement everywhere, because banks and title companies will not accept an un-notarized POA even where the statute technically permits one. Several states additionally require two witnesses, and a few impose specific witness qualifications.",
        ],
        tables: [
          {
            caption: "Execution requirements for a financial POA (representative states)",
            columns: ["State", "Notary", "Witnesses", "Notes"],
            rows: [
              ["California", "Notary or 2 witnesses", "2 (if not notarized)", "Statutory Uniform POA form in Probate Code § 4401"],
              ["New York", "Required", "2 (neither may be the agent)", "Statutory Short Form; strict 2021 amendments"],
              ["Texas", "Required", "Not required", "Durable POA Act, Estates Code ch. 751"],
              ["Florida", "Required", "2", "Springing POAs no longer valid if signed after Oct 1, 2011"],
              ["Illinois", "Required", "1 (plus notary)", "Statutory Short Form POA for Property"],
              ["Pennsylvania", "Required", "2", "Notice page and agent acknowledgment both required"],
              ["Ohio", "Required", "Not required", "UPOAA state"],
              ["Georgia", "Required", "1", "2017 UPOAA-based statutory form"],
            ],
            note: "Requirements summarized from state POA statutes. Verify your state's current rule — recording is also required if the agent will sign real-estate documents.",
          },
        ],
      },
      {
        heading: "Why banks reject a valid power of attorney (and how to prevent it)",
        bullets: [
          "The document is old. Many institutions balk at a POA signed more than 5–10 years ago even though POAs do not expire by law.",
          "It is not the bank's own form. Large banks maintain internal POA forms; presenting yours early, while the principal still has capacity, lets you sign theirs as a backup.",
          "The hot power needed is not expressly granted.",
          "It is a springing POA and the incapacity certification is missing or stale.",
          "No original or certified copy — some institutions refuse photocopies.",
          "Under UPOAA states, an institution that refuses without a statutory reason can be liable for attorney fees; a written demand citing that provision often resolves it.",
        ],
      },
      {
        heading: "What your agent may and may not do",
        paragraphs: [
          "An agent is a fiduciary. That means acting in your interest, keeping your money separate from theirs, keeping records, and following your known expectations. Self-dealing, gifting to themselves without express authority, and commingling funds are the three behaviors that produce most POA abuse litigation and, in many states, criminal exploitation charges.",
        ],
        bullets: [
          "Cannot change your will or act as your executor by virtue of the POA.",
          "Cannot vote for you or make healthcare decisions — that needs a separate healthcare POA and living will.",
          "Cannot act after your death; authority terminates immediately.",
          "Cannot transfer authority to someone else unless delegation is expressly granted.",
          "Should sign as: 'Your Name, by Agent Name, Attorney-in-Fact' — never their own name alone.",
        ],
      },
      {
        heading: "How to revoke a power of attorney",
        bullets: [
          "Sign a written revocation, notarized, identifying the original POA by date.",
          "Deliver it to the agent in writing and keep proof of delivery.",
          "Send copies to every bank, brokerage, insurer and title company that has the original on file — institutions are protected if they act in good faith before receiving notice.",
          "Record the revocation in the county land records if the original POA was recorded.",
          "Execute a replacement POA naming a new agent so you are not left without one.",
        ],
      },
    ],
    faqs: [
      { question: "Does a financial power of attorney need to be notarized?", answer: "In practice, always. A handful of states technically allow witnesses instead, but banks, brokerages and title companies routinely refuse an un-notarized POA, and any POA used for real-estate transactions must be notarized to be recordable." },
      { question: "What is the difference between durable and springing?", answer: "A durable POA is effective the moment you sign and remains effective if you later lose capacity. A springing POA only becomes effective when a physician certifies incapacity. Durable is far more usable; springing creates delay at the exact moment the agent needs to act, and Florida no longer honors springing POAs signed after October 1, 2011." },
      { question: "Can my agent change my will or beneficiaries?", answer: "Never the will. Beneficiary designations on accounts and policies can only be changed if the document expressly grants that hot power. Without express language, a beneficiary change by an agent is voidable and can expose the agent to a fiduciary-breach claim." },
      { question: "Does a power of attorney work for Social Security or the IRS?", answer: "Not by itself. Social Security ignores POAs and requires a Representative Payee application. The IRS requires Form 2848 (Power of Attorney and Declaration of Representative) for someone to represent you before the agency, though a POA can authorize signing a return in narrow circumstances." },
      { question: "Can I name two agents to act together?", answer: "Yes — co-agents can be required to act jointly or permitted to act independently. Joint authority reduces abuse risk but slows every transaction and causes bank rejections when only one signature is presented. Naming one primary agent plus a successor is usually cleaner." },
      { question: "When does a financial power of attorney expire?", answer: "It ends at your death, on the date you write into the document, on revocation, when a court appoints a guardian or conservator in some states, or — for a spouse-agent — on divorce in most states. It does not expire from age alone, though institutions may question documents older than five to ten years." },
      { question: "Is a power of attorney the same as guardianship?", answer: "No. A POA is a voluntary grant you make while you have capacity. Guardianship or conservatorship is imposed by a court after capacity is lost, costs thousands of dollars, and puts your finances under ongoing court supervision. Having a durable POA is the main way to avoid that proceeding." },
      { question: "Do I need a separate healthcare power of attorney?", answer: "Yes. A financial POA does not authorize medical decisions. You need a healthcare power of attorney (or healthcare proxy) plus a living will for treatment preferences, and a HIPAA authorization so your agent can access medical records." },
      { question: "Can I write a power of attorney myself without a lawyer?", answer: "Yes in every state. What matters is using your state's execution requirements, granting the hot powers you actually need, and naming a trustworthy agent. Complex estates, business succession, Medicaid planning or family conflict are the situations where an attorney review is worth the fee." },
      { question: "What if a bank refuses my power of attorney?", answer: "Ask for the refusal in writing and the specific reason. In UPOAA states an institution must accept a properly executed POA or state a statutory basis for refusal within seven business days, and unreasonable refusal can expose it to a court order plus attorney fees. Presenting the bank's own POA form while the principal still has capacity avoids the fight entirely." },
      { question: "Does my agent get paid?", answer: "Only if the document says so. Many POAs authorize reasonable compensation plus reimbursement of expenses. Family agents commonly serve without a fee but should still keep receipts and records, because a court or a later-appointed fiduciary can demand an accounting." },
      { question: "Is a power of attorney valid in another state?", answer: "Generally yes — states honor a POA validly executed under the law of the state where it was signed, and UPOAA states codify that rule. But if you move permanently, execute a fresh POA on your new state's statutory form so local banks and title companies do not resist it." },
    ],
    related: [
      { label: "Healthcare power of attorney", href: "/forms/healthcare-power-of-attorney" },
      { label: "Living will", href: "/forms/living-will" },
      { label: "HIPAA authorization", href: "/forms/hipaa-authorization" },
      { label: "Last will and testament", href: "/forms/last-will-and-testament" },
      { label: "Personal planning pack", href: "/forms/personal-planning-pack" },
    ],
  },

  "eviction-notice": {
    reviewedOn: "2026-08-07",
    intro: [
      "An eviction notice — called a notice to quit, notice to vacate, or pay-or-quit notice depending on the state — is the document that starts a lawful eviction. It is not the eviction itself. In every U.S. state the sequence is the same: serve a written notice, wait out the statutory cure or vacate period, then file an unlawful detainer or summary possession case in the local court if the tenant has not paid, cured, or moved.",
      "The notice is also the single most common reason landlords lose eviction cases. Judges dismiss filings for the wrong notice type, a day-count that ignores weekends or the mailing rule, a missing itemization of rent owed, service by a method the statute does not allow, or naming the wrong parties. A dismissal is rarely with prejudice, but it costs the landlord the filing fee and several more weeks of unpaid occupancy.",
    ],
    sections: [
      {
        heading: "The four notice types, and which one your situation calls for",
        tables: [
          {
            caption: "Eviction notice types compared",
            columns: ["Notice type", "Use it when", "Can the tenant fix it?", "Typical period"],
            rows: [
              ["Pay rent or quit", "Rent is late or partially paid", "Yes — paying in full stops the eviction", "3–14 days"],
              ["Cure or quit", "A lease term is violated (unauthorized pet, occupant, subletting, nuisance)", "Yes — correcting the violation stops it", "3–30 days"],
              ["Unconditional quit", "Serious conduct: illegal activity, severe property damage, repeat violations", "No", "3–30 days"],
              ["Notice to terminate tenancy (no cause)", "Month-to-month tenancy ending where no-cause termination is still allowed", "N/A", "30–90 days"],
            ],
            note: "Just-cause jurisdictions (California under AB 1482, Oregon, Washington, New Jersey, and many cities) restrict or prohibit no-cause terminations for tenants past an occupancy threshold.",
          },
        ],
      },
      {
        heading: "Notice periods by state",
        paragraphs: [
          "Day counts are statutory and unforgiving. Most states count calendar days and exclude the day of service; several exclude weekends and legal holidays for short notices; and many add extra days when the notice is served by mail rather than in person.",
        ],
        tables: [
          {
            caption: "Nonpayment-of-rent notice periods (representative states, 2026)",
            columns: ["State", "Pay-or-quit period", "Lease-violation cure", "No-cause termination (month-to-month)"],
            rows: [
              ["California", "3 business days", "3 days to cure", "30 days (<1 yr) / 60 days (1 yr+); just cause under AB 1482"],
              ["New York", "14 days", "10 days to cure", "30/60/90 days by length of occupancy"],
              ["Texas", "3 days (lease may shorten)", "3 days", "30 days"],
              ["Florida", "3 business days", "7 days to cure", "30 days (monthly tenancy)"],
              ["Illinois", "5 days", "10 days", "30 days; Chicago adds RLTO requirements"],
              ["Pennsylvania", "10 days", "15/30 days by lease term", "15 days (<1 yr) / 30 days (1 yr+)"],
              ["Ohio", "3 days", "3 days", "30 days"],
              ["Georgia", "Immediate demand for possession", "Per lease", "60 days"],
              ["Michigan", "7 days", "30 days", "30 days"],
              ["Arizona", "5 days", "10 days (health/safety: 5 days)", "30 days"],
              ["Washington", "14 days", "10 days", "20 days; just cause required"],
              ["North Carolina", "10 days", "Per lease", "7 days (monthly tenancy)"],
            ],
            note: "Periods summarized from state landlord-tenant statutes and current as of the review date. Local rent-control and just-cause ordinances frequently impose longer periods — always check the city and county rules for the property address.",
          },
        ],
      },
      {
        heading: "Serving the notice so it survives a challenge",
        bullets: [
          "Personal delivery to the tenant is the strongest method and starts the clock immediately in every state.",
          "Substituted service — leaving it with a competent adult at the residence or workplace plus mailing a copy — is allowed in most states but usually adds days to the period.",
          "Posting and mailing (nail and mail) is a last resort and only after documented attempts at personal service in most jurisdictions.",
          "Certified mail alone is insufficient in several states, and a refused certified letter can defeat proof of service — send first-class as well.",
          "Photograph the posted notice with a timestamp, keep the mailing receipt, and complete a proof-of-service declaration the same day.",
          "Never use self-help: changing locks, removing doors, shutting off utilities or removing belongings exposes landlords to statutory damages that commonly run to two or three months' rent plus the tenant's attorney fees.",
        ],
      },
      {
        heading: "What must appear on the face of the notice",
        bullets: [
          "Full names of every adult tenant on the lease, plus 'and all others in possession' where the state allows it.",
          "The complete property address including unit number.",
          "For nonpayment: the exact amount of rent due, the periods it covers, and — in states like California — the name, address and hours of the person authorized to receive payment.",
          "A clear statement of what the tenant must do and by what date, and what happens if they do not.",
          "The date of the notice, the landlord or agent's signature, and contact information.",
          "Any state-mandated language: fee itemization, retaliation disclosures, right-to-counsel notices, or federal CARES Act 30-day language for covered properties.",
        ],
      },
      {
        heading: "After the notice period expires",
        paragraphs: [
          "If the tenant has not paid, cured, or vacated, the landlord files an eviction complaint (unlawful detainer, forcible entry and detainer, or summary possession) with the county court. Filing fees typically run $50–$400, service of the summons adds $30–$150, and contested hearings are usually scheduled within one to six weeks depending on the county's docket. Only a sheriff or marshal may execute a writ of possession — never the landlord.",
        ],
        tables: [
          {
            caption: "Typical landlord cost and timeline for an uncontested eviction",
            columns: ["Stage", "Typical time", "Typical cost"],
            rows: [
              ["Notice period", "3–30 days", "$0–$75 (service)"],
              ["Filing the complaint", "1–3 days", "$50–$400"],
              ["Service of summons", "3–10 days", "$30–$150"],
              ["Hearing and judgment", "1–6 weeks", "$0 (or attorney fees $500–$2,500)"],
              ["Writ of possession / lockout", "3–14 days", "$50–$400 sheriff fee"],
            ],
            note: "Contested cases, jury demands and habitability counterclaims can extend the timeline by months. Figures are national ranges, not quotes.",
          },
        ],
      },
    ],
    faqs: [
      { question: "How many days' notice do I have to give before evicting a tenant?", answer: "It depends on the state and the reason. Nonpayment notices run 3 to 14 days in most states, lease-violation cure periods run 3 to 30 days, and no-cause terminations of a month-to-month tenancy typically require 30 to 90 days. Check your state's rule and any local ordinance before choosing a date." },
      { question: "Can I evict a tenant without a written notice?", answer: "No. Every state requires written notice before an eviction case can be filed, and courts dismiss filings where the notice is missing, defective, or improperly served. The only narrow exceptions involve a fixed-term lease that expired on its own terms in a few states." },
      { question: "Does the tenant have to move out when the notice period ends?", answer: "Legally they should, but if they do not, you cannot remove them yourself. You must file an eviction case, obtain a judgment for possession, and have a sheriff or marshal execute the writ. Self-help lockouts are illegal everywhere and carry statutory penalties." },
      { question: "What happens if the tenant pays after I serve a pay-or-quit notice?", answer: "If they pay the full amount demanded within the notice period, the notice is satisfied and the tenancy continues. Accepting a partial payment — or any payment after the period expires — can waive the notice in many states, so document what you accept and, where allowed, accept it expressly 'for use and occupancy only, without waiver.'" },
      { question: "Can I evict a tenant with no lease?", answer: "Yes. A tenant paying rent without a written lease is a month-to-month or at-will tenant with the same statutory protections. You terminate with the state's no-cause notice period, typically 30 days, longer in just-cause jurisdictions." },
      { question: "How do I serve an eviction notice correctly?", answer: "Personal delivery is safest. If that fails, most states allow substituted service on an adult at the property plus a mailed copy, and posting-and-mailing as a last resort. Complete a proof of service the same day, keep photographs of any posting, and retain mailing receipts — service is the most commonly challenged element at the hearing." },
      { question: "Can a tenant fight the eviction notice?", answer: "Yes. Common defenses are defective notice or service, retaliation for a code complaint or repair request, discrimination, breach of the warranty of habitability, acceptance of rent after the notice, and failure to follow local just-cause or rent-control procedures. A valid defense usually results in dismissal, not just a delay." },
      { question: "Is an eviction notice the same as an eviction?", answer: "No. The notice is a pre-suit demand. The eviction is a court judgment for possession followed by a sheriff-executed writ. Nothing about serving a notice permits changing locks, removing property, or shutting off utilities." },
      { question: "How much does it cost to evict a tenant?", answer: "An uncontested eviction typically runs $150 to $1,000 in filing, service and sheriff fees, plus attorney fees of roughly $500 to $2,500 where counsel is used. Contested cases with habitability counterclaims cost considerably more and can take several months." },
      { question: "Do I need a lawyer to evict a tenant?", answer: "Individual landlords may appear on their own in most small-claims-style eviction courts, but LLCs and corporations must be represented by counsel in many states. If the tenant has a lawyer, has raised habitability or retaliation, or the property is in a just-cause jurisdiction, hiring a landlord-tenant attorney is usually cheaper than a dismissal." },
      { question: "Can I evict during winter or a state of emergency?", answer: "Some states and cities restrict lockouts during extreme cold or declared emergencies, and federally subsidized or federally backed properties carry additional notice requirements. Check both the state statute and any active local emergency order before serving." },
      { question: "What if some occupants are not on the lease?", answer: "Name every adult you know of and add 'and all other occupants' if your state permits it. Unnamed occupants can otherwise claim they were not parties to the judgment and force a second proceeding after the lockout." },
    ],
    related: [
      { label: "Residential lease agreement", href: "/forms/residential-lease-agreement" },
      { label: "Lease termination letter", href: "/forms/lease-termination-letter" },
      { label: "Demand letter for unpaid rent", href: "/forms/demand-letter" },
      { label: "Landlord starter pack", href: "/forms/landlord-starter-pack" },
      { label: "Eviction notice lookup tool", href: "/tools/realestate/eviction-notice-lookup" },
    ],
  },
};


export function getFormGuide(slug: string): FormGuide | undefined {
  return FORM_GUIDES[slug];
}

export default function FormGuideContent({
  guide,
  title,
  localePath,
  authorId,
}: {
  guide: FormGuide;
  title: string;
  localePath: (p: string) => string;
  authorId?: string;
}) {
  return (
    <article className="mt-12 border-t pt-8">
      <h2 className="font-serif text-2xl font-bold mb-2">
        {title.split("—")[0].trim()}: the complete guide
      </h2>
      <AuthorByline
        authorId={authorId}
        reviewedAt={guide.reviewedOn}
        compact
        className="mb-5"
      />

      {guide.intro.map((p, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {p}
        </p>
      ))}

      {guide.sections.map((s, i) => (
        <section key={i} className="mb-8">
          <h3 className="font-serif text-xl font-bold mb-3">{s.heading}</h3>
          {s.paragraphs?.map((p, j) => (
            <p key={j} className="text-muted-foreground leading-relaxed mb-3">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-muted-foreground">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {s.tables?.map((t) => (
            <figure key={t.caption} className="my-5 overflow-x-auto">
              <figcaption className="text-sm font-semibold mb-2">{t.caption}</figcaption>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted/60">
                    {t.columns.map((c) => (
                      <th key={c} className="border px-3 py-2 text-left font-semibold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r, ri) => (
                    <tr key={ri} className={ri % 2 ? "bg-muted/20" : undefined}>
                      {r.map((cell, ci) => (
                        <td key={ci} className="border px-3 py-2 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {t.note && <p className="text-xs text-muted-foreground mt-2">{t.note}</p>}
            </figure>
          ))}
        </section>
      ))}

      <section className="mb-8">
        <h3 className="font-serif text-xl font-bold mb-3">Frequently asked questions</h3>
        <div className="space-y-4">
          {guide.faqs.map((f, i) => (
            <div key={i} className="border-b border-border pb-3">
              <h4 className="font-semibold text-base mb-1">{f.question}</h4>
              <p className="text-sm text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {guide.related && guide.related.length > 0 && (
        <section className="rounded-lg border bg-muted/30 p-5">
          <h3 className="font-serif text-lg font-bold mb-3">Related documents</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {guide.related.map((r) => (
              <li key={r.href}>
                <a href={localePath(r.href)} className="text-accent hover:underline text-sm">
                  {r.label} →
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
