/**
 * ToolGuideContent
 * ----------------
 * Long-form, entity-dense editorial content rendered underneath a
 * calculator. Turns a thin tool page into a genuinely useful guide page for
 * high-volume calculator queries (severance pay, alimony) without touching
 * the calculator logic.
 *
 * Add an entry to TOOL_GUIDES keyed by the tool id to give that tool the
 * same treatment. FAQs here are merged into the page's FAQ schema by
 * ToolPageLayout.
 */

export interface ToolGuideTable {
  caption: string;
  columns: string[];
  rows: string[][];
  note?: string;
}

export interface ToolGuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  tables?: ToolGuideTable[];
}

export interface ToolGuide {
  title: string;
  intro: string[];
  sections: ToolGuideSection[];
  faqs: { question: string; answer: string }[];
  reviewedOn: string;
  related?: { label: string; href: string }[];
}

import { workersCompSettlementRules } from "@/data/workersCompSettlementRules";
import { SOL_STATES } from "@/data/solData";

const wcStateRows = workersCompSettlementRules.map((r) => [
  r.state,
  `$${r.maxWeekly.toLocaleString("en-US")}/wk`,
  r.ttdRate,
  r.ppdSystem,
  `${Math.round(r.feeRate * 100)}% — ${r.feeNote}`,
]);

const solStateRows = [...SOL_STATES]
  .sort((a, b) => a.state.localeCompare(b.state))
  .map((s) => [
    s.state,
    s.entries.personal_injury ? `${s.entries.personal_injury.years} yrs` : "—",
    s.entries.medical_malpractice ? `${s.entries.medical_malpractice.years} yrs` : "—",
    s.entries.wrongful_death ? `${s.entries.wrongful_death.years} yrs` : "—",
    s.entries.written_contract ? `${s.entries.written_contract.years} yrs` : "—",
    s.entries.oral_contract ? `${s.entries.oral_contract.years} yrs` : "—",
    s.entries.fraud ? `${s.entries.fraud.years} yrs` : "—",
  ]);

export const TOOL_GUIDES: Record<string, ToolGuide> = {
  /* ------------------------------- workers' compensation settlement ---- */
  "workers-comp-settlement": {
    title: "Workers' comp settlements: how the number is actually built",
    reviewedOn: "2026-08-25",
    intro: [
      "A workers' compensation settlement is not one figure — it is three stacked pieces: the temporary disability already owed for time you missed, the permanent partial disability (PPD) award for whatever function you did not get back, and the value the carrier puts on your future medical care. Understanding which piece an adjuster is squeezing is the difference between accepting a low clincher and correcting it before you sign.",
      "Everything starts from your average weekly wage (AWW), normally the average of gross earnings over the 52 weeks before the injury, including overtime and often the value of employer-paid perks you lost. Your comp rate is usually two-thirds of that AWW, but every state applies a hard weekly maximum tied to the state average wage — which is why two workers with identical injuries and identical salaries can be paid very differently in Mississippi ($604/wk cap) and Iowa ($2,130/wk cap).",
      "The third variable, and the one most claimants never check, is how the state measures permanence. Scheduled-member states pay a set number of weeks per body part multiplied by your impairment rating. Whole-person states convert an AMA Guides rating into weeks or dollars. Wage-loss states such as Michigan and Pennsylvania largely ignore the rating and pay on the earnings you actually lost.",
    ],
    sections: [
      {
        heading: "The formula, step by step",
        bullets: [
          "Step 1 — Average weekly wage: total gross earnings for the 52 weeks before the injury ÷ 52 (concurrent employment often counts).",
          "Step 2 — Comp rate: AWW × the state wage-replacement rate (usually 66⅔%), then capped at the state weekly maximum.",
          "Step 3 — Temporary total disability: comp rate × weeks you were off work, minus the state's unpaid waiting period.",
          "Step 4 — Permanent partial disability: statutory weeks for the injured body part × your impairment rating percentage × comp rate.",
          "Step 5 — Future medical: the carrier's projection of surgeries, injections, therapy and prescriptions, discounted for the risk you never use it.",
          "Step 6 — Deductions: approved attorney fee, any advance, unpaid child support and a Medicare Set-Aside if you are Medicare-eligible.",
        ],
      },
      {
        heading: "Worked example: a back injury with a 15% rating",
        paragraphs: [
          "A warehouse worker in Illinois earning $900 a week suffers a lumbar disc injury, is off work for 20 weeks, and is given a 15% impairment rating to the person as a whole. The comp rate is $900 × 66⅔% = $600, which is below the Illinois maximum, so it stands. Temporary disability is $600 × 20 = $12,000. The permanent piece is 500 weeks (whole-person basis) × 15% = 75 weeks, × $600 = $45,000. Add $10,000 of projected future medical and the baseline is $67,000.",
          "Carriers rarely pay the baseline exactly. Full-and-final clinchers in that posture typically land between 70% and 115% of the scheduled value depending on liability disputes, the quality of the rating and whether the worker returned to full duty. At the 20% Illinois attorney fee cap, a $70,000 settlement nets roughly $56,000 before any lien.",
        ],
      },
      {
        heading: "What raises and lowers the offer",
        bullets: [
          "A second impairment rating from your own physician. Adjusters open with the IME rating, which is almost always the lower of the two.",
          "Surgery already performed, or a surgeon's written recommendation for future surgery — this is the largest single driver of future-medical value.",
          "Permanent work restrictions that the employer cannot accommodate, which can move the claim toward permanent total or a wage-differential award.",
          "Age and remaining work life: a 30-year-old with a shoulder restriction has decades of exposure, and carriers price that.",
          "Gaps in treatment, missed appointments and unrelated prior claims — all used to argue the condition is degenerative rather than work-related.",
          "Whether you accept a clincher (closes medical forever) or a stipulation (keeps medical open). Closing medical should cost the carrier meaningfully more.",
        ],
      },
      {
        heading: "Weekly caps, PPD basis and attorney fees by state",
        tables: [
          {
            caption: "Workers' compensation settlement variables for all 51 US jurisdictions",
            columns: ["Jurisdiction", "Max weekly benefit", "TTD rate", "How PPD is paid", "Approved attorney fee"],
            rows: wcStateRows,
            note: "Weekly maximums are re-set annually against each state's average weekly wage; figures shown are recent published benchmarks for estimating, not the operative number in your claim.",
          },
        ],
      },
      {
        heading: "Before you sign anything",
        bullets: [
          "Ask for the carrier's settlement breakdown in writing: indemnity, future medical and any credit for benefits already paid.",
          "Confirm whether Medicare's interests need protection. A required Medicare Set-Aside can consume a large share of the cash you expected.",
          "Check whether closing the claim also closes your right to reopen for a worsening condition — most clinchers do.",
          "Check any health-insurance or provider lien against the settlement before agreeing to a number.",
          "Verify the appeal deadline in your state if the claim was denied; several states allow as little as 14 to 30 days.",
        ],
      },
    ],
    faqs: [
      { question: "How is a workers' comp settlement calculated?", answer: "Take two-thirds of your average weekly wage (capped at the state maximum) to get your comp rate. Multiply it by the weeks you were off work for temporary disability, then by the statutory weeks for the injured body part times your impairment rating for permanent partial disability, and add the projected cost of future medical treatment." },
      { question: "What is the average workers' comp settlement for a back injury?", answer: "Back and spine claims commonly settle between $25,000 and $80,000, with surgical cases and high-wage claimants frequently exceeding $150,000. The spread is driven by the impairment rating, whether surgery is recommended, and the state's weekly cap." },
      { question: "Does a workers' comp settlement include pain and suffering?", answer: "No. Workers' compensation is a no-fault system that pays wage replacement, medical treatment and permanent impairment only. Pain and suffering is recoverable only in a separate third-party liability claim against someone other than your employer." },
      { question: "Is a workers' comp settlement taxable?", answer: "Workers' compensation benefits are generally not taxable under IRC § 104(a)(1). The exception is the offset situation: if the settlement reduces your Social Security disability benefits, the offset portion can become taxable." },
      { question: "How much does a workers' comp lawyer take?", answer: "Fees are capped by statute and must be approved by the judge or board. Most states allow 15% to 25% of the recovery, with a handful permitting up to 30–33% on contested amounts." },
      { question: "Should I accept the first workers' comp settlement offer?", answer: "Rarely. Opening offers are usually built on the insurer's IME rating and a thin future-medical figure. Getting an independent rating and a surgeon's future-care statement before negotiating typically moves the number more than any argument about liability." },
    ],
    related: [
      { label: "Workers' comp denied — what to do next", href: "/workers-comp-denied-what-next" },
      { label: "Impairment rating calculator", href: "/tools/consumer/impairment-rating-calculator" },
      { label: "Statute of limitations by state", href: "/statute-of-limitations-by-state" },
      { label: "Lost wages calculator", href: "/tools/consumer/lost-wages-calculator" },
    ],
  },

  /* ------------------------------------ statute of limitations lookup ---- */
  "statute-of-limitations": {
    title: "Statute of limitations by state: how long you have to file",
    reviewedOn: "2026-08-25",
    intro: [
      "A statute of limitations is a hard deadline. File one day late and the defendant can move to dismiss on that ground alone, no matter how strong the underlying claim is. The clock is set by state law and by the type of claim, which is why the same car crash can carry a one-year deadline in Louisiana and a six-year deadline in Maine.",
      "Two traps catch people far more often than the headline number. The first is the claim against a government body — city, county, state, transit authority or public hospital — which normally requires a written notice of claim within 30 to 180 days, long before the general statute expires. The second is the discovery rule: for latent injuries, fraud and professional malpractice, the clock may start when you knew or reasonably should have known of the harm, which can help or hurt depending on what the record shows about when you first suspected something.",
    ],
    sections: [
      {
        heading: "When the clock starts, pauses and stops",
        bullets: [
          "Accrual: usually the date of the injury, the breach, or the last payment on a debt.",
          "Discovery rule: for latent injury, fraud and malpractice, accrual can shift to the date you discovered — or should have discovered — the harm.",
          "Minority and incapacity: deadlines are commonly tolled while the claimant is a minor or legally incapacitated.",
          "Fraudulent concealment: a defendant who hides the wrong can be barred from relying on the statute.",
          "Statutes of repose: an absolute outer limit (often 6–12 years for construction and product claims) that runs regardless of discovery.",
          "Filing, not settling, stops the clock. Ongoing negotiation with an insurer does not extend anything unless there is a written tolling agreement.",
        ],
      },
      {
        heading: "Filing deadlines by state and claim type",
        tables: [
          {
            caption: "Standard civil statute of limitations, in years, for all 51 US jurisdictions",
            columns: ["Jurisdiction", "Personal injury", "Medical malpractice", "Wrongful death", "Written contract", "Oral contract", "Fraud"],
            rows: solStateRows,
            note: "Standard, non-tolled periods compiled from each state's civil practice code. Discovery rules, statutes of repose and government notice requirements can shorten or extend every figure here.",
          },
        ],
      },
      {
        heading: "Short deadlines people miss",
        bullets: [
          "Government tort claim notice: often 30–180 days, and it applies before you ever file suit.",
          "EEOC discrimination charge: 180 days, extended to 300 days in states with an equivalent fair-employment agency.",
          "Workers' compensation denial appeal: as little as 14–30 days from the denial notice in several states.",
          "Uninsured or underinsured motorist claims: governed by the policy's contractual limit, which can be shorter than the tort statute.",
          "Medical malpractice pre-suit notice or certificate of merit requirements, which add procedural steps inside the same window.",
          "Insurance bad-faith and prompt-pay complaints, which run on their own statutory clocks.",
        ],
      },
    ],
    faqs: [
      { question: "What is the statute of limitations for a personal injury claim?", answer: "Two years is the most common personal-injury deadline in the United States, but the range runs from one year (Kentucky, Louisiana, Tennessee) to six years (Maine, North Dakota). Check your own state, because the deadline is jurisdictional." },
      { question: "What happens if I miss the statute of limitations?", answer: "The defendant will move to dismiss and courts almost always grant it. The claim is not merely weakened; it is time-barred, and an insurer that knows the date has passed has no reason to pay anything." },
      { question: "Can a statute of limitations be extended?", answer: "Sometimes. The discovery rule, the claimant being a minor or incapacitated, the defendant leaving the state, fraudulent concealment, and a written tolling agreement can all extend or pause the period. None of them are safe to assume without legal advice." },
      { question: "Does the statute of limitations differ for suing a city or state?", answer: "Yes, and it is far shorter in practical terms. Most jurisdictions require a formal notice of claim within 30 to 180 days of the incident before any lawsuit against a public entity is allowed." },
      { question: "When does the clock start for a debt?", answer: "Typically the date of the last payment or last acknowledgment of the debt. Making even a small payment on an old debt can restart the clock in many states, which is why collectors push for one." },
    ],
    related: [
      { label: "Statute of limitations by state", href: "/statute-of-limitations-by-state" },
      { label: "Filing deadline calculator", href: "/tools/consumer/statute-of-limitations-deadline-calculator" },
      { label: "State legal deadlines dataset", href: "/data/settlement-deadlines" },
      { label: "Small claims court limits", href: "/courts" },
    ],
  },

  /* ------------------------------------------------ #13 severance ---- */
  "severance-pay": {
    title: "Severance pay: how it is calculated, taxed and negotiated",
    reviewedOn: "2026-08-07",
    intro: [
      "Severance pay is almost never required by federal law. The Fair Labor Standards Act does not mandate it, and outside of a written employment agreement, a collective bargaining agreement, a company policy that has hardened into an implied contract, or a state plant-closing statute, an employer can lawfully offer nothing at all. What drives most offers instead is the release: the employer wants a signed waiver of discrimination, wage-and-hour and wrongful-termination claims, and severance is the consideration paid for it.",
      "That is why the number is negotiable far more often than employees assume. The market convention is one to two weeks of base pay per year of service for individual contributors, two to four weeks for directors and senior professionals, and multi-month packages plus equity acceleration for executives with a change-of-control clause. Your leverage comes from three places: the strength of any legal claim you are being asked to release, how badly the employer needs a clean transition, and whether the layoff triggers WARN Act obligations the employer would rather resolve quietly.",
    ],
    sections: [
      {
        heading: "What a typical severance formula looks like",
        tables: [
          {
            caption: "Common severance benchmarks by role level (U.S. private sector)",
            columns: ["Level", "Weeks per year of service", "Typical floor", "Also commonly included"],
            rows: [
              ["Hourly / entry", "1 week", "2 weeks", "Accrued PTO payout where state law requires it"],
              ["Individual contributor / professional", "1–2 weeks", "4 weeks", "COBRA subsidy for 1–3 months, unused PTO"],
              ["Manager", "2 weeks", "8 weeks", "COBRA 3 months, prorated bonus, outplacement"],
              ["Director / senior professional", "2–4 weeks", "12 weeks", "Prorated bonus, partial equity vesting, outplacement"],
              ["VP and above / executive", "4–8 weeks (often 6–12 months flat)", "6 months", "Bonus target, equity acceleration, extended exercise window, mutual non-disparagement"],
            ],
            note: "Benchmarks reflect common U.S. private-sector practice, not a legal entitlement. Union contracts, offer letters and change-of-control agreements override convention.",
          },
        ],
      },
      {
        heading: "How severance is taxed",
        paragraphs: [
          "Severance is wages. It is reported on your W-2, and Social Security and Medicare are withheld on it just like salary. The common surprise is the withholding method: employers usually treat a lump sum as supplemental wages and withhold federal income tax at the flat 22% supplemental rate (37% on amounts above $1 million in a calendar year), which is often more or less than your actual marginal rate. The difference is reconciled on your return, so a large lump sum frequently produces a refund — or an unexpected balance due if your marginal rate is higher.",
        ],
        bullets: [
          "Lump sum vs salary continuation changes cash-flow and, in many states, when unemployment benefits begin.",
          "Severance can delay or reduce unemployment in states that allocate it to weeks of coverage — New York, California, Texas and Illinois all treat it differently.",
          "Payment for unused PTO is wages and taxed the same way; some states require it, others follow company policy.",
          "Amounts allocated in the agreement to emotional distress in a discrimination settlement may be taxed differently — allocation language matters and belongs in the negotiation.",
          "You cannot defer severance into a 401(k) after termination in most plans, so the tax hit lands in the year received. Splitting payments across two tax years is a legitimate negotiation point.",
        ],
      },
      {
        heading: "What is actually negotiable besides the dollar amount",
        bullets: [
          "Weeks of pay — anchor with the per-year convention, your tenure and any recent internal precedent.",
          "COBRA premium coverage, which can be worth $600–$2,000 a month for a family.",
          "A prorated bonus for the current performance period.",
          "Equity: accelerated vesting of the next tranche, and extending the 90-day post-termination option exercise window.",
          "Characterizing the separation as a layoff rather than a termination for cause, and agreeing on a neutral reference.",
          "Mutual non-disparagement, and removing or narrowing a non-compete or non-solicit.",
          "Deleting a confidentiality clause that would bar you from discussing unlawful conduct — many states now void such clauses, and the federal Speak Out Act limits them for harassment claims.",
          "Outplacement services, laptop retention and continued access to professional certifications.",
        ],
      },
      {
        heading: "Deadlines and the review windows the law gives you",
        paragraphs: [
          "If you are 40 or older, the Older Workers Benefit Protection Act requires that a release of age-discrimination claims give you at least 21 days to consider the agreement (45 days in a group layoff, with a disclosure listing the job titles and ages of everyone selected and not selected), plus 7 days to revoke after signing. An agreement that skips those windows does not validly waive an ADEA claim.",
        ],
        tables: [
          {
            caption: "Severance review windows and related deadlines",
            columns: ["Situation", "Time you get", "Source"],
            rows: [
              ["Individual release, age 40+", "21 days to consider, 7 to revoke", "OWBPA / ADEA"],
              ["Group layoff release, age 40+", "45 days to consider, 7 to revoke, plus age/title disclosure", "OWBPA"],
              ["Mass layoff or plant closing (100+ employees)", "60 days' advance notice or pay in lieu", "Federal WARN Act"],
              ["State mini-WARN (NY, NJ, CA and others)", "60–90 days, sometimes mandatory severance", "State statute"],
              ["EEOC discrimination charge", "180 or 300 days from the adverse action", "Title VII / ADEA"],
              ["Unemployment application", "File immediately — most states have a waiting week", "State agency"],
            ],
            note: "New Jersey's mini-WARN requires severance of one week per year of service in covered mass layoffs. Verify your state's rule before signing anything.",
          },
        ],
      },
      {
        heading: "How to counter an offer without blowing it up",
        bullets: [
          "Never sign in the room. Ask for the agreement in writing and use the full review window.",
          "Ask what the offer is based on — a formula, a policy, or discretion. A formula answer tells you where the flex is.",
          "Counter in writing, professionally, with one paragraph of rationale: tenure, transition value, and any specific claim you are being asked to release.",
          "Anchor above your target and name a specific number of weeks rather than a dollar figure.",
          "Bundle asks: weeks plus COBRA plus a neutral reference are easier to grant together than a single large cash increase.",
          "If you have a genuine discrimination, retaliation, wage or FMLA claim, an employment lawyer's letter typically pays for itself; most work on flat or contingency fees for severance review.",
        ],
      },
    ],
    faqs: [
      { question: "Is severance pay required by law?", answer: "Not under federal law. The FLSA does not require severance. You are only entitled to it if an employment contract, collective bargaining agreement, established company policy or a state statute such as New Jersey's mini-WARN requires it. Most severance is voluntary consideration paid in exchange for a signed release of claims." },
      { question: "How much severance pay is typical?", answer: "One to two weeks of base pay per year of service is the common benchmark for individual contributors, two to four weeks for directors and senior professionals, and several months to a year for executives with change-of-control terms. Tenure, level, the employer's precedent in prior layoffs and the strength of any claim you are releasing all move the number." },
      { question: "How is severance pay taxed?", answer: "As ordinary wages, reported on your W-2, with Social Security and Medicare withheld. Employers usually withhold federal income tax on a lump sum at the flat 22% supplemental rate — 37% on amounts over $1 million in a year — which is trued up when you file your return." },
      { question: "Does severance affect unemployment benefits?", answer: "It can. Some states allocate severance to specific weeks, which delays the start of benefits; others treat a lump sum as unrelated to the weeks you are unemployed and pay immediately. Salary continuation is more likely to delay benefits than a lump sum. File your claim right away and report the severance accurately." },
      { question: "Can I negotiate severance?", answer: "Yes, and it is expected at manager level and above. Employers build negotiating room into offers because they want the release signed. Counter in writing with a specific number of weeks and a short rationale, and bundle non-cash asks like COBRA coverage, a prorated bonus and a neutral reference." },
      { question: "How long do I have to decide on a severance offer?", answer: "If you are 40 or older and the agreement waives age-discrimination claims, federal law gives you 21 days to consider it (45 days in a group layoff) plus 7 days to revoke after signing. Under 40, the deadline is whatever the employer sets — but you can almost always ask for more time." },
      { question: "What am I giving up by signing?", answer: "Typically all claims that exist as of the signing date: discrimination, harassment, retaliation, wrongful termination, and often wage claims where state law permits waiver. You generally cannot waive the right to file an EEOC or NLRB charge, unemployment or workers' comp benefits, vested retirement money, or claims that arise after signing." },
      { question: "Do I get severance if I resign?", answer: "Usually not, because severance is paid to obtain a release when the employer ends the relationship. Exceptions exist where a contract provides for good-reason resignation, where a constructive discharge is credible, or where the employer wants a negotiated exit and a release." },
      { question: "Does severance include unused PTO and my final paycheck?", answer: "No — those are separate. Your final wages are owed regardless of whether you sign a release, and many states have strict final-paycheck deadlines. Accrued PTO payout depends on state law and company policy. Never let unpaid wages be presented as part of the severance consideration." },
      { question: "What happens to my stock options and RSUs?", answer: "Unvested equity is usually forfeited on the termination date, and vested options typically must be exercised within 90 days. Both are negotiable: partial acceleration of the next vesting tranche and an extended exercise window are common asks, and for tax purposes an extended window can convert incentive stock options to non-qualified options." },
      { question: "Can severance be paid in installments instead of a lump sum?", answer: "Yes — salary continuation keeps you on payroll and sometimes on benefits, which can be valuable. The trade-off is that it may delay unemployment benefits in some states, and it exposes you to employer insolvency risk. Section 409A rules also constrain how installment schedules can be changed once set." },
      { question: "Should I have a lawyer review my severance agreement?", answer: "Review is worth it whenever the package is more than a few weeks of pay, contains a non-compete, follows a complaint you made, or you believe the termination was discriminatory or retaliatory. Employment attorneys commonly review severance agreements on a flat fee, and a single negotiated clause often exceeds the cost." },
    ],
    related: [
      { label: "Severance fairness score", href: "/tools/employment/severance-offer-fairness-score" },
      { label: "Wrongful termination settlements", href: "/wrongful-termination-settlements" },
      { label: "Unemployment benefit estimator", href: "/tools/employment/unemployment-benefits-estimator" },
      { label: "Final paycheck rules by state", href: "/tools/employment/final-paycheck-deadline-lookup" },
      { label: "EEOC settlement calculator", href: "/tools/employment/eeoc-settlement-calculator" },
    ],
  },

  /* -------------------------------------------------- #14 alimony ---- */
  "alimony-calc": {
    title: "Alimony: how courts set the amount, the duration and the end date",
    reviewedOn: "2026-08-07",
    intro: [
      "Alimony — called spousal support in California, maintenance in New York, Illinois and Colorado, and spousal maintenance in Texas and Arizona — is a transfer payment intended to address the economic gap a divorce creates between two households. Roughly a dozen states publish an arithmetic guideline; the rest leave the amount to judicial discretion applied to a list of statutory factors. That is why the same facts can produce very different awards across a state line.",
      "Two numbers decide almost everything: the difference between the spouses' incomes, and the length of the marriage. Formula states convert those into a monthly figure and a term directly. Discretionary states reach a similar place indirectly, through need and ability to pay, the marital standard of living, each spouse's earning capacity, contributions as a homemaker, health, age and the custody arrangement.",
    ],
    sections: [
      {
        heading: "Formula states versus discretionary states",
        tables: [
          {
            caption: "How guideline states compute spousal support",
            columns: ["State", "Guideline formula", "Cap", "Duration guidance"],
            rows: [
              ["Illinois (750 ILCS 5/504)", "33⅓% of payer's net income minus 25% of recipient's net", "Combined 40% of net income", "20% of marriage length under 5 years, scaling to indefinite at 20+ years"],
              ["Colorado (C.R.S. 14-10-114)", "40% of higher income minus 50% of lower income", "40% of combined income", "Advisory schedule from 31% to 50% of marriage length"],
              ["California (temporary only)", "40% of payer's net minus 50% of recipient's net (local rules vary)", "Local guideline", "Post-judgment support is discretionary under Fam. Code § 4320"],
              ["Massachusetts (c. 208 § 53)", "30–35% of the difference in gross incomes", "Recipient's need", "Durational limits keyed to marriage length; indefinite after 20 years"],
              ["Texas (Fam. Code ch. 8)", "Need-based only", "$5,000/month or 20% of gross, whichever is less", "5, 7 or 10 years by marriage length; eligibility is restrictive"],
              ["Arizona (2023 guidelines)", "Formula based on income difference and marriage length", "Guideline range", "Guideline duration table"],
              ["New York (DRL § 236B)", "Statutory post-divorce maintenance formula on income up to the cap", "Income cap adjusted every two years", "Advisory schedule by marriage length"],
              ["Kansas", "Local judicial guidelines", "Statutory 121-month limit", "121 months maximum by statute"],
            ],
            note: "Formulas are summarized and simplified. Every state adjusts for child support, taxes, health insurance and mandatory retirement contributions — run your own state's worksheet before relying on a number.",
          },
        ],
      },
      {
        heading: "Types of alimony and what each one is for",
        tables: [
          {
            caption: "Alimony types",
            columns: ["Type", "Purpose", "Typical duration"],
            rows: [
              ["Temporary (pendente lite)", "Maintain the status quo while the divorce is pending", "Until final judgment"],
              ["Rehabilitative", "Fund education or retraining so the recipient becomes self-supporting", "2–5 years, tied to a written plan"],
              ["Durational / term", "Bridge an income gap after a short or moderate marriage", "Commonly 30–75% of marriage length"],
              ["Permanent / indefinite", "Long marriages where self-support is not realistic", "Until death, remarriage or modification"],
              ["Reimbursement", "Repay a spouse who funded the other's degree or license", "Fixed sum, often paid in installments"],
              ["Lump sum / alimony in gross", "Buy out the support obligation in one payment", "One-time; usually not modifiable"],
            ],
            note: "Florida abolished permanent alimony for cases filed after July 1, 2023, replacing it with durational caps of 50% of the marriage length for short marriages, 60% for moderate and 75% for long.",
          },
        ],
      },
      {
        heading: "Taxes: the 2019 rule change that still surprises people",
        paragraphs: [
          "For divorce or separation agreements executed after December 31, 2018, the Tax Cuts and Jobs Act eliminated the alimony deduction for the payer and made payments non-taxable to the recipient. Pre-2019 orders keep the old treatment — deductible to the payer, taxable to the recipient — unless the parties modify the order and expressly adopt the new rules. Because the payer no longer gets a deduction, post-2019 awards are frequently negotiated at a lower gross number than an equivalent pre-2019 award.",
        ],
        bullets: [
          "Child support has never been deductible or taxable, and is calculated before or alongside alimony in most states.",
          "A payment that ends within six months of a child's 18th birthday can be recharacterized by the IRS as disguised child support.",
          "Property division transfers between spouses incident to divorce are generally non-taxable events under IRC § 1041.",
          "Lump-sum buyouts are not deductible either, so the discount rate you use to price one matters.",
        ],
      },
      {
        heading: "When alimony ends, and how to modify it",
        bullets: [
          "Death of either party ends the obligation in nearly all states — which is why orders often require life insurance securing the payments.",
          "Remarriage of the recipient terminates most awards automatically; some require a motion.",
          "Cohabitation reduces or terminates support in a majority of states, though the proof standard varies from any shared residence to a marriage-like economic relationship.",
          "A substantial, involuntary and continuing change in circumstance — job loss, disability, retirement at full retirement age — supports a modification motion.",
          "Deliberate underemployment leads courts to impute income at earning capacity rather than actual earnings, often through a vocational evaluation.",
          "Lump-sum awards and support fixed by a non-modifiable agreement generally cannot be changed at all, which cuts both ways.",
          "Enforcement tools include income withholding, contempt, license suspension and interception of tax refunds.",
        ],
      },
    ],
    faqs: [
      { question: "How is alimony calculated?", answer: "In guideline states, by formula — usually a percentage of the payer's income minus a percentage of the recipient's, capped at a share of combined income. In discretionary states, judges weigh need and ability to pay against statutory factors such as marriage length, standard of living, earning capacity, age, health and contributions to the household. This calculator applies your state's guideline where one exists and a national income-shares approach where none does." },
      { question: "How long does alimony last?", answer: "Most awards run between 30% and 75% of the length of the marriage. Short marriages often produce short rehabilitative terms or no award at all, while marriages of 20 years or more can produce indefinite support in states that still allow it. Florida, Texas, Indiana, Kansas and several others impose statutory duration caps." },
      { question: "Is alimony taxable?", answer: "Not for agreements executed after December 31, 2018. Under the Tax Cuts and Jobs Act the payer gets no deduction and the recipient reports no income. Orders finalized before 2019 keep the old treatment unless they are modified and the parties expressly adopt the current rules." },
      { question: "Do I have to be married a certain number of years to get alimony?", answer: "No state sets a universal minimum, but marriage length is the strongest single predictor. Texas is the strictest, generally requiring a 10-year marriage plus an inability to meet minimum reasonable needs, or family violence within the past two years. Most states will consider support after marriages as short as a few years where there is a clear economic disparity." },
      { question: "Does cheating affect alimony?", answer: "In most states, no — they are no-fault for financial purposes. A minority, including Georgia, North Carolina, South Carolina and Virginia, do consider marital misconduct, and in a few of those adultery can bar an award entirely. Dissipating marital assets on an affair is treated as a property issue almost everywhere." },
      { question: "Can alimony be modified later?", answer: "Usually yes, on a showing of a substantial and continuing change in circumstances — significant income loss, disability, the recipient's remarriage or cohabitation, or good-faith retirement. Exceptions are lump-sum awards and support set by an agreement the parties made expressly non-modifiable." },
      { question: "What happens to alimony if the recipient moves in with a partner?", answer: "Most states allow reduction or termination on cohabitation, but the standard varies. Some require only proof of a shared residence; others require evidence of an interdependent, marriage-like economic relationship. The burden is on the payer, and a modification motion is required — you cannot stop paying unilaterally." },
      { question: "Can alimony and child support both be ordered?", answer: "Yes, and the order of calculation matters. Most states compute child support first and treat it as a deduction from the payer's available income for the alimony calculation, though a few reverse the sequence. Combined obligations are also frequently capped as a percentage of net income." },
      { question: "What if my ex refuses to pay?", answer: "Support orders are enforceable through income withholding, contempt proceedings that can carry jail time, judgment liens, driver's and professional license suspension, credit reporting and interception of tax refunds. Arrears generally do not disappear in bankruptcy — domestic support obligations are non-dischargeable." },
      { question: "Can I get alimony if I earn more than my spouse?", answer: "Generally not — support flows from the higher earner to the lower earner. Uncommon exceptions arise where the higher earner has an involuntary income drop, where a health condition creates need despite income, or where reimbursement support is owed for funding the other spouse's education." },
      { question: "Does retirement end alimony?", answer: "Not automatically, but retirement at full Social Security retirement age in good faith is a recognized ground for modification in most states, and several have codified it. Early or voluntary retirement taken to escape the obligation is treated as a deliberate reduction in income, and courts impute the prior earnings." },
      { question: "Is a lump-sum buyout better than monthly payments?", answer: "It depends on your risk tolerance. A buyout eliminates enforcement risk, collection hassle and future modification, but it is typically discounted to present value, is not modifiable if your circumstances change, and requires liquid assets. Monthly support preserves flexibility for both sides and can be secured with life insurance." },
    ],
    related: [
      { label: "Child support calculator", href: "/tools/family/child-support-calculator" },
      { label: "Divorce cost estimator", href: "/tools/family/divorce-cost-estimator" },
      { label: "Divorce house buyout calculator", href: "/tools/consumer/divorce-buyout-calculator" },
      { label: "Find a family law attorney", href: "/lawyer-near-me/family" },
    ],
  },
};

export function getToolGuide(toolId: string): ToolGuide | undefined {
  return TOOL_GUIDES[toolId];
}

export default function ToolGuideContent({
  guide,
  localePath,
}: {
  guide: ToolGuide;
  localePath: (p: string) => string;
}) {
  return (
    <article className="mb-10 border-t pt-8">
      <h2 className="font-serif text-2xl font-bold mb-2">{guide.title}</h2>
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
          <h3 className="font-serif text-lg font-bold mb-3">Keep going</h3>
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
