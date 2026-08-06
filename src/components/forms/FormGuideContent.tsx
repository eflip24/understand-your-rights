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
};

export function getFormGuide(slug: string): FormGuide | undefined {
  return FORM_GUIDES[slug];
}

export default function FormGuideContent({
  guide,
  title,
  localePath,
}: {
  guide: FormGuide;
  title: string;
  localePath: (p: string) => string;
}) {
  return (
    <article className="mt-12 border-t pt-8">
      <h2 className="font-serif text-2xl font-bold mb-2">
        {title.split("—")[0].trim()}: the complete guide
      </h2>
      <p className="text-xs text-muted-foreground mb-5">
        By the LegallySpoken Editorial Team · Last reviewed{" "}
        {new Date(guide.reviewedOn).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

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
