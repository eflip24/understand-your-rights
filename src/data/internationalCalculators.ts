/**
 * Rule engine for the international country calculators.
 *
 * Powers /international/:slug/notice-period and /international/:slug/small-claims-cost.
 * Figures are compiled from the statutes and official fee schedules listed in
 * `sources` on each rule set. Keep LAST_VERIFIED in sync when values change.
 */

export const INTERNATIONAL_CALC_LAST_VERIFIED = "2026-09-05";

export type CountrySlug =
  | "united-kingdom"
  | "ireland"
  | "canada"
  | "australia"
  | "new-zealand"
  | "south-africa";

export interface NoticeInput {
  /** Completed months of continuous service. */
  months: number;
  /** Gross pay per week, in local currency. */
  weeklyPay: number;
  /** Age in years (only used where the law bands by age). */
  age: number;
  /** Reason the employment is ending. */
  reason: "redundancy" | "employer-other" | "resignation";
}

export interface NoticeResultLine {
  label: string;
  value: string;
  note?: string;
}

export interface NoticeResult {
  noticeWeeks: number;
  noticeLabel: string;
  payInLieu: number;
  severanceWeeks: number;
  severanceAmount: number;
  severanceLabel: string;
  total: number;
  lines: NoticeResultLine[];
  deadline: string;
  deadlineNote: string;
  warnings: string[];
}

export interface NoticeRules {
  slug: CountrySlug;
  country: string;
  currency: string;
  currencySymbol: string;
  /** Whether the age input changes the answer. */
  usesAge: boolean;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  /** How the statutory notice ladder works, shown as a reference table. */
  noticeTable: { service: string; notice: string }[];
  severanceSummary: string;
  claimDeadline: string;
  claimForum: string;
  faqs: { question: string; answer: string }[];
  sources: { name: string; url: string }[];
  compute: (input: NoticeInput) => NoticeResult;
}

export interface SmallClaimsInput {
  /** Claim value in local currency. */
  amount: number;
}

export interface SmallClaimsResult {
  eligible: boolean;
  limitLabel: string;
  forum: string;
  filingFee: number | null;
  filingFeeLabel: string;
  hearingFee: number | null;
  hearingFeeLabel: string;
  totalLabel: string;
  lawyersAllowed: string;
  appeal: string;
  overLimitAdvice: string;
  netIfWin: string;
}

export interface SmallClaimsRules {
  slug: CountrySlug;
  country: string;
  currency: string;
  currencySymbol: string;
  limit: number;
  limitLabel: string;
  forum: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  feeTable: { band: string; filing: string; hearing: string }[];
  lawyersAllowed: string;
  appeal: string;
  overLimitAdvice: string;
  steps: string[];
  faqs: { question: string; answer: string }[];
  sources: { name: string; url: string }[];
  compute: (input: SmallClaimsInput) => SmallClaimsResult;
}

const money = (symbol: string, n: number) =>
  `${symbol}${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const round2 = (n: number) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ */
/* Notice period rules                                                 */
/* ------------------------------------------------------------------ */

export const noticeRules: NoticeRules[] = [
  {
    slug: "united-kingdom",
    country: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    usesAge: true,
    metaTitle: "UK Notice Period & Redundancy Pay Calculator (Statutory Minimums)",
    metaDescription:
      "Work out your UK statutory notice period, pay in lieu of notice and statutory redundancy pay from your length of service, age and weekly pay — plus the employment tribunal deadline.",
    intro: [
      "UK statutory notice is one week once you pass one month's service, then one week for each complete year, capped at twelve weeks. Your contract can give more but never less, and pay in lieu of notice is only lawful where the contract allows it or the parties agree.",
      "Statutory redundancy pay is separate and age-banded, requires two years' service, and uses a capped weekly figure rather than your actual pay if you earn above the cap.",
    ],
    noticeTable: [
      { service: "Under 1 month", notice: "None (statutory)" },
      { service: "1 month to 2 years", notice: "1 week" },
      { service: "2 to 12 years", notice: "1 week per complete year" },
      { service: "12 years or more", notice: "12 weeks (cap)" },
    ],
    severanceSummary:
      "Statutory redundancy pay: half a week per year served under 22, one week per year aged 22–40, and one and a half weeks per year aged 41 and over. Capped at 20 years of service and a statutory weekly maximum of £719.",
    claimDeadline: "3 months less one day",
    claimForum: "Employment Tribunal (after Acas early conciliation)",
    faqs: [
      {
        question: "How much notice must a UK employer give?",
        answer:
          "One week after one month's service, then one week for each complete year of service up to a maximum of twelve weeks. Your contract may give more, and the higher figure applies.",
      },
      {
        question: "Is statutory redundancy pay taxed?",
        answer:
          "Redundancy payments are tax free up to £30,000. Notice pay, holiday pay and any bonus element are taxable and subject to National Insurance in the normal way.",
      },
      {
        question: "How long do I have to bring an unfair dismissal claim?",
        answer:
          "Three months less one day from the effective date of termination, and you must start Acas early conciliation before you can lodge the tribunal claim.",
      },
    ],
    sources: [
      { name: "Employment Rights Act 1996 s.86 (notice)", url: "https://www.legislation.gov.uk/ukpga/1996/18/section/86" },
      { name: "GOV.UK — calculate your redundancy pay", url: "https://www.gov.uk/calculate-your-redundancy-pay" },
      { name: "Acas — notice periods", url: "https://www.acas.org.uk/notice-periods" },
    ],
    compute: ({ months, weeklyPay, age, reason }) => {
      const years = Math.floor(months / 12);
      const noticeWeeks = months < 1 ? 0 : Math.min(12, Math.max(1, years));
      const payInLieu = round2(noticeWeeks * weeklyPay);

      const CAP = 719;
      const cappedWeek = Math.min(weeklyPay, CAP);
      let severanceWeeks = 0;
      const warnings: string[] = [];

      if (reason === "redundancy") {
        if (years < 2) {
          warnings.push("Statutory redundancy pay needs two years' continuous service, so none is due yet.");
        } else {
          const countedYears = Math.min(20, years);
          // Years are counted backwards from the most recent, banded by the age reached in each year.
          for (let i = 0; i < countedYears; i++) {
            const ageInThatYear = age - i - 1;
            if (ageInThatYear >= 41) severanceWeeks += 1.5;
            else if (ageInThatYear >= 22) severanceWeeks += 1;
            else severanceWeeks += 0.5;
          }
          if (years > 20) warnings.push("Only the most recent 20 years of service count towards statutory redundancy pay.");
          if (weeklyPay > CAP)
            warnings.push(`Weekly pay is capped at £${CAP} for statutory redundancy pay, so your actual pay is not used in full.`);
        }
      }

      const severanceAmount = round2(severanceWeeks * cappedWeek);
      const includeNotice = reason !== "resignation";
      const total = round2((includeNotice ? payInLieu : 0) + severanceAmount);

      if (reason === "resignation")
        warnings.push("On resignation you give notice rather than receive it, and no redundancy pay is due.");

      return {
        noticeWeeks,
        noticeLabel: noticeWeeks === 0 ? "No statutory notice yet" : `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}`,
        payInLieu,
        severanceWeeks,
        severanceAmount,
        severanceLabel:
          reason === "redundancy"
            ? severanceWeeks > 0
              ? `${severanceWeeks} weeks at up to £${CAP}/week`
              : "Not yet eligible"
            : "Not applicable",
        total,
        lines: [
          { label: "Statutory notice", value: `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}`, note: "Contract may give more" },
          { label: "Pay in lieu of notice", value: money("£", payInLieu), note: "Taxable" },
          {
            label: "Statutory redundancy pay",
            value: money("£", severanceAmount),
            note: "Tax free up to £30,000",
          },
        ],
        deadline: "3 months less one day",
        deadlineNote:
          "Unfair dismissal and discrimination claims must start Acas early conciliation within three months less a day of dismissal.",
        warnings,
      };
    },
  },
  {
    slug: "ireland",
    country: "Ireland",
    currency: "EUR",
    currencySymbol: "€",
    usesAge: false,
    metaTitle: "Ireland Notice Period & Statutory Redundancy Calculator",
    metaDescription:
      "Calculate your Irish minimum notice period, pay in lieu and statutory redundancy lump sum from length of service and weekly pay, plus the WRC unfair dismissal deadline.",
    intro: [
      "The Minimum Notice and Terms of Employment Act sets a notice ladder that starts at one week after thirteen weeks' service and rises to eight weeks after fifteen years. Contracts can improve on it, never reduce it.",
      "Statutory redundancy is two weeks' pay per year of service plus one additional week, calculated on gross weekly pay capped at €600, and requires two years' continuous service.",
    ],
    noticeTable: [
      { service: "13 weeks to 2 years", notice: "1 week" },
      { service: "2 to 5 years", notice: "2 weeks" },
      { service: "5 to 10 years", notice: "4 weeks" },
      { service: "10 to 15 years", notice: "6 weeks" },
      { service: "15 years or more", notice: "8 weeks" },
    ],
    severanceSummary:
      "Statutory redundancy: two weeks' gross pay for each year of service plus one bonus week, using a weekly pay ceiling of €600. Two years' continuous service is required, and the lump sum is tax free.",
    claimDeadline: "6 months (extendable to 12 for reasonable cause)",
    claimForum: "Workplace Relations Commission",
    faqs: [
      {
        question: "What notice am I entitled to in Ireland?",
        answer:
          "From one week after thirteen weeks' service up to eight weeks after fifteen years, under the Minimum Notice and Terms of Employment Acts. Your contract may provide a longer period.",
      },
      {
        question: "How is Irish statutory redundancy calculated?",
        answer:
          "Two weeks' gross pay per year of service plus one extra week, with weekly pay capped at €600. The payment is tax free and requires two years' continuous service.",
      },
      {
        question: "How long do I have to bring an unfair dismissal claim?",
        answer:
          "Six months from the date of dismissal, extendable to twelve months where you can show reasonable cause for the delay. Claims are lodged with the Workplace Relations Commission.",
      },
    ],
    sources: [
      { name: "Minimum Notice and Terms of Employment Act 1973", url: "https://www.irishstatutebook.ie/eli/1973/act/4/enacted/en/html" },
      { name: "Citizens Information — redundancy payments", url: "https://www.citizensinformation.ie/en/employment/unemployment-and-redundancy/redundancy/redundancy-payments/" },
      { name: "Workplace Relations Commission", url: "https://www.workplacerelations.ie" },
    ],
    compute: ({ months, weeklyPay, reason }) => {
      const years = months / 12;
      let noticeWeeks = 0;
      if (months >= 180) noticeWeeks = 8;
      else if (months >= 120) noticeWeeks = 6;
      else if (months >= 60) noticeWeeks = 4;
      else if (months >= 24) noticeWeeks = 2;
      else if (months >= 3) noticeWeeks = 1;

      const payInLieu = round2(noticeWeeks * weeklyPay);
      const CAP = 600;
      const cappedWeek = Math.min(weeklyPay, CAP);
      const warnings: string[] = [];
      let severanceWeeks = 0;

      if (reason === "redundancy") {
        if (years < 2) warnings.push("Statutory redundancy requires two years' continuous service.");
        else {
          severanceWeeks = round2(2 * years + 1);
          if (weeklyPay > CAP) warnings.push("Weekly pay is capped at €600 for the statutory redundancy calculation.");
        }
      } else if (reason === "resignation") {
        warnings.push("On resignation you give notice; no redundancy lump sum arises.");
      }

      const severanceAmount = round2(severanceWeeks * cappedWeek);
      const total = round2((reason === "resignation" ? 0 : payInLieu) + severanceAmount);

      return {
        noticeWeeks,
        noticeLabel: noticeWeeks === 0 ? "No statutory notice yet" : `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}`,
        payInLieu,
        severanceWeeks,
        severanceAmount,
        severanceLabel:
          reason === "redundancy" && severanceWeeks > 0 ? `${severanceWeeks} weeks at up to €${CAP}/week` : "Not applicable",
        total,
        lines: [
          { label: "Minimum notice", value: `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}` },
          { label: "Pay in lieu of notice", value: money("€", payInLieu), note: "Taxable" },
          { label: "Statutory redundancy lump sum", value: money("€", severanceAmount), note: "Tax free" },
        ],
        deadline: "6 months",
        deadlineNote:
          "Unfair dismissal complaints go to the WRC within six months of dismissal, extendable to twelve for reasonable cause.",
        warnings,
      };
    },
  },
  {
    slug: "canada",
    country: "Canada",
    currency: "CAD",
    currencySymbol: "C$",
    usesAge: false,
    metaTitle: "Canada Termination Notice & Severance Pay Calculator (ESA Minimums)",
    metaDescription:
      "Estimate Canadian statutory termination notice, pay in lieu and severance pay from length of service and weekly pay, with the common-law reasonable notice range and filing deadlines.",
    intro: [
      "Employment standards notice in Canada is provincial. This calculator uses the Ontario ESA ladder — one week after three months, then one week per year to a maximum of eight — which most provinces closely resemble, and flags where your province may differ.",
      "Statutory minimums are a floor, not the answer. Where there is no enforceable termination clause, common-law reasonable notice is usually far higher, commonly assessed in the range of three to four weeks per year of service depending on age, seniority and re-employment prospects.",
    ],
    noticeTable: [
      { service: "Under 3 months", notice: "None" },
      { service: "3 months to 1 year", notice: "1 week" },
      { service: "1 to 8 years", notice: "1 week per year" },
      { service: "8 years or more", notice: "8 weeks (ESA cap)" },
    ],
    severanceSummary:
      "Ontario ESA severance pay is separate from notice: one week per year of service (including partial years pro-rated) up to 26 weeks, for employees with five or more years where the employer's payroll is at least C$2.5 million or 50+ employees were severed.",
    claimDeadline: "2 years (ESA claim); 90 days for federal unjust dismissal",
    claimForum: "Provincial employment standards branch or civil court",
    faqs: [
      {
        question: "How much termination notice am I owed in Canada?",
        answer:
          "Under Ontario's ESA, one week after three months' service, then one week per completed year to a maximum of eight weeks. Other provinces use similar ladders, and federally regulated employees have separate rules.",
      },
      {
        question: "What is common-law reasonable notice?",
        answer:
          "Where your contract does not validly limit you to statutory minimums, courts award reasonable notice based on age, length of service, character of employment and availability of similar work. Awards commonly land near three to four weeks per year of service, capped in practice around 24 months.",
      },
      {
        question: "How long do I have to make a claim?",
        answer:
          "Employment standards claims generally have a two-year window, wrongful dismissal lawsuits a two-year limitation period, and federally regulated unjust dismissal complaints just 90 days.",
      },
    ],
    sources: [
      { name: "Ontario Employment Standards Act, 2000", url: "https://www.ontario.ca/laws/statute/00e41" },
      { name: "Ontario — termination of employment", url: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/termination-employment" },
      { name: "Canada Labour Code — unjust dismissal", url: "https://laws-lois.justice.gc.ca/eng/acts/L-2/" },
    ],
    compute: ({ months, weeklyPay, reason }) => {
      const years = months / 12;
      const wholeYears = Math.floor(years);
      let noticeWeeks = 0;
      if (months >= 12) noticeWeeks = Math.min(8, wholeYears);
      else if (months >= 3) noticeWeeks = 1;

      const payInLieu = round2(noticeWeeks * weeklyPay);
      const warnings: string[] = [];
      let severanceWeeks = 0;

      if (reason !== "resignation" && years >= 5) {
        severanceWeeks = Math.min(26, round2(years));
        warnings.push(
          "ESA severance pay assumes an employer payroll of at least C$2.5 million or a mass severance — confirm before relying on it.",
        );
      } else if (reason === "resignation") {
        warnings.push("Resignation ends the entitlement to notice or severance unless it is a constructive dismissal.");
      }

      const severanceAmount = round2(severanceWeeks * weeklyPay);
      const commonLawLow = round2(Math.min(24, years * 3) * 4.33 * weeklyPay) / 4.33;
      const commonLawWeeksLow = round2(Math.min(104, years * 3));
      const commonLawWeeksHigh = round2(Math.min(104, years * 4));
      const total = round2((reason === "resignation" ? 0 : payInLieu) + severanceAmount);

      return {
        noticeWeeks,
        noticeLabel: noticeWeeks === 0 ? "No statutory notice yet" : `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}`,
        payInLieu,
        severanceWeeks,
        severanceAmount,
        severanceLabel: severanceWeeks > 0 ? `${severanceWeeks} weeks (ESA severance)` : "Not applicable",
        total,
        lines: [
          { label: "ESA notice", value: `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}` },
          { label: "Pay in lieu of notice", value: money("C$", payInLieu), note: "Taxable" },
          { label: "ESA severance pay", value: money("C$", severanceAmount) },
          {
            label: "Common-law reasonable notice (typical range)",
            value: `${commonLawWeeksLow}–${commonLawWeeksHigh} weeks`,
            note: `Roughly ${money("C$", round2(commonLawLow * 0 + commonLawWeeksLow * weeklyPay))}–${money(
              "C$",
              round2(commonLawWeeksHigh * weeklyPay),
            )} where no valid termination clause applies`,
          },
        ],
        deadline: "2 years",
        deadlineNote:
          "Wrongful dismissal suits and most ESA claims run on a two-year clock; federally regulated unjust dismissal complaints must be filed within 90 days.",
        warnings,
      };
    },
  },
  {
    slug: "australia",
    country: "Australia",
    currency: "AUD",
    currencySymbol: "A$",
    usesAge: true,
    metaTitle: "Australia Notice Period & Redundancy Pay Calculator (NES Minimums)",
    metaDescription:
      "Calculate your Australian National Employment Standards notice period, the extra week for over-45s, redundancy pay by years of service, and the 21-day unfair dismissal deadline.",
    intro: [
      "The National Employment Standards set minimum notice from one to four weeks based on continuous service, with an extra week for employees over 45 who have at least two years' service. Awards and contracts can provide more.",
      "NES redundancy pay runs on its own scale that rises to sixteen weeks at nine years and then drops to twelve weeks at ten years, because long-service leave becomes payable at that point.",
    ],
    noticeTable: [
      { service: "1 year or less", notice: "1 week" },
      { service: "1 to 3 years", notice: "2 weeks" },
      { service: "3 to 5 years", notice: "3 weeks" },
      { service: "More than 5 years", notice: "4 weeks" },
      { service: "Over 45 with 2+ years", notice: "Add 1 week" },
    ],
    severanceSummary:
      "NES redundancy pay: 4 weeks at 1 year, 6 at 2, 7 at 3, 8 at 4, 10 at 5, 11 at 6, 13 at 7, 14 at 8, 16 at 9 and 12 weeks at 10 years or more. Small business employers with fewer than 15 staff are generally exempt.",
    claimDeadline: "21 days",
    claimForum: "Fair Work Commission",
    faqs: [
      {
        question: "How much notice must an Australian employer give?",
        answer:
          "One to four weeks depending on continuous service, plus an additional week if you are over 45 with at least two years' service. Modern awards and contracts can require more.",
      },
      {
        question: "Why does redundancy pay drop at ten years?",
        answer:
          "The NES scale peaks at sixteen weeks for nine years of service and falls to twelve weeks at ten years, because employees with ten years generally become entitled to paid long service leave.",
      },
      {
        question: "How long do I have to lodge an unfair dismissal claim?",
        answer:
          "21 days from the day after the dismissal takes effect. The Fair Work Commission extends the deadline only in exceptional circumstances.",
      },
    ],
    sources: [
      { name: "Fair Work Act 2009 s.117 and s.119", url: "https://www.legislation.gov.au/C2009A00028/latest/text" },
      { name: "Fair Work Ombudsman — notice and redundancy", url: "https://www.fairwork.gov.au/ending-employment/notice-and-final-pay" },
      { name: "Fair Work Commission — unfair dismissal", url: "https://www.fwc.gov.au/job-loss-dismissal" },
    ],
    compute: ({ months, weeklyPay, age, reason }) => {
      const years = months / 12;
      let noticeWeeks = 1;
      if (years > 5) noticeWeeks = 4;
      else if (years > 3) noticeWeeks = 3;
      else if (years > 1) noticeWeeks = 2;
      if (age > 45 && years >= 2) noticeWeeks += 1;

      const payInLieu = round2(noticeWeeks * weeklyPay);
      const warnings: string[] = [];
      let severanceWeeks = 0;

      if (reason === "redundancy") {
        const scale: [number, number][] = [
          [1, 4],
          [2, 6],
          [3, 7],
          [4, 8],
          [5, 10],
          [6, 11],
          [7, 13],
          [8, 14],
          [9, 16],
        ];
        if (years >= 10) severanceWeeks = 12;
        else {
          for (const [minYears, weeks] of scale) if (years >= minYears) severanceWeeks = weeks;
        }
        if (severanceWeeks === 0) warnings.push("Redundancy pay starts at one year of continuous service.");
        warnings.push("Employers with fewer than 15 employees are generally exempt from NES redundancy pay.");
      } else if (reason === "resignation") {
        warnings.push("On resignation you give the notice; no redundancy pay applies.");
      }

      const severanceAmount = round2(severanceWeeks * weeklyPay);
      const total = round2((reason === "resignation" ? 0 : payInLieu) + severanceAmount);

      return {
        noticeWeeks,
        noticeLabel: `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}`,
        payInLieu,
        severanceWeeks,
        severanceAmount,
        severanceLabel: severanceWeeks > 0 ? `${severanceWeeks} weeks (NES scale)` : "Not applicable",
        total,
        lines: [
          { label: "NES notice", value: `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}`, note: age > 45 && years >= 2 ? "Includes the over-45 extra week" : undefined },
          { label: "Pay in lieu of notice", value: money("A$", payInLieu) },
          { label: "NES redundancy pay", value: money("A$", severanceAmount) },
        ],
        deadline: "21 days",
        deadlineNote: "Unfair dismissal and general protections dismissal claims must be lodged within 21 days of the dismissal taking effect.",
        warnings,
      };
    },
  },
  {
    slug: "new-zealand",
    country: "New Zealand",
    currency: "NZD",
    currencySymbol: "NZ$",
    usesAge: false,
    metaTitle: "New Zealand Notice Period Calculator & 90-Day Grievance Deadline",
    metaDescription:
      "Work out your New Zealand notice period, pay in lieu and redundancy position from your contract and service, and check the 90-day personal grievance deadline.",
    intro: [
      "New Zealand has no statutory notice ladder. Notice comes from your employment agreement, and where the agreement is silent the law requires 'fair and reasonable' notice — in practice usually two to four weeks, longer for senior roles.",
      "There is also no statutory redundancy pay. Compensation on redundancy is whatever your agreement provides, so the agreement, not the statute, is the document that decides the number.",
    ],
    noticeTable: [
      { service: "Any (agreement states a period)", notice: "As stated in the agreement" },
      { service: "Agreement silent — junior role", notice: "Usually 1–2 weeks" },
      { service: "Agreement silent — established role", notice: "Usually 2–4 weeks" },
      { service: "Agreement silent — senior/specialist", notice: "Often 1–3 months" },
      { service: "90-day trial period (small employers)", notice: "As stated, no grievance for dismissal" },
    ],
    severanceSummary:
      "There is no statutory redundancy pay in New Zealand. Any redundancy compensation is contractual, and the employer must still follow a genuine consultation process before deciding.",
    claimDeadline: "90 days",
    claimForum: "Raised with the employer, then Employment Relations Authority",
    faqs: [
      {
        question: "How much notice do I get in New Zealand?",
        answer:
          "Whatever your employment agreement says. If it is silent, notice must be fair and reasonable in the circumstances, which is commonly two to four weeks and longer for senior positions.",
      },
      {
        question: "Am I entitled to redundancy pay in New Zealand?",
        answer:
          "Only if your employment agreement provides for it. There is no statutory entitlement, although the employer must still consult genuinely and consider alternatives before making you redundant.",
      },
      {
        question: "What is the 90-day personal grievance deadline?",
        answer:
          "You must raise a personal grievance with your employer within 90 days of the problem occurring or coming to your notice. Sexual harassment grievances have a 12-month window.",
      },
    ],
    sources: [
      { name: "Employment Relations Act 2000", url: "https://www.legislation.govt.nz/act/public/2000/0024/latest/DLM58316.html" },
      { name: "Employment New Zealand — notice periods", url: "https://www.employment.govt.nz/ending-employment/notice-periods/" },
      { name: "Employment New Zealand — redundancy", url: "https://www.employment.govt.nz/ending-employment/redundancy/" },
    ],
    compute: ({ months, weeklyPay, reason }) => {
      const years = months / 12;
      let noticeWeeks = 2;
      if (years >= 5) noticeWeeks = 4;
      else if (years >= 2) noticeWeeks = 3;
      else if (months < 6) noticeWeeks = 1;

      const payInLieu = round2(noticeWeeks * weeklyPay);
      const warnings: string[] = [
        "This is a reasonableness estimate — your employment agreement's stated notice period overrides it in both directions.",
      ];
      if (reason === "redundancy")
        warnings.push("No statutory redundancy pay exists in New Zealand; check the redundancy clause in your agreement.");
      if (reason === "resignation") warnings.push("The same notice period usually applies when you resign.");

      return {
        noticeWeeks,
        noticeLabel: `About ${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}`,
        payInLieu,
        severanceWeeks: 0,
        severanceAmount: 0,
        severanceLabel: "Contractual only",
        total: reason === "resignation" ? 0 : payInLieu,
        lines: [
          { label: "Reasonable notice estimate", value: `${noticeWeeks} weeks`, note: "Agreement terms prevail" },
          { label: "Pay in lieu of notice", value: money("NZ$", payInLieu) },
          { label: "Statutory redundancy pay", value: "None", note: "Contractual entitlements only" },
        ],
        deadline: "90 days",
        deadlineNote: "Raise a personal grievance in writing with your employer within 90 days of the problem.",
        warnings,
      };
    },
  },
  {
    slug: "south-africa",
    country: "South Africa",
    currency: "ZAR",
    currencySymbol: "R",
    usesAge: false,
    metaTitle: "South Africa Notice Period & Severance Pay Calculator (BCEA)",
    metaDescription:
      "Calculate BCEA notice periods, pay in lieu and retrenchment severance pay in South Africa from your service and weekly pay, plus the 30-day CCMA referral deadline.",
    intro: [
      "The Basic Conditions of Employment Act sets three notice bands: one week in the first six months, two weeks from six months to a year, and four weeks after a year. Farm and domestic workers move to four weeks after six months.",
      "On retrenchment, severance of at least one week's remuneration per completed year of continuous service is payable on top of notice and accrued leave.",
    ],
    noticeTable: [
      { service: "Under 6 months", notice: "1 week" },
      { service: "6 months to 1 year", notice: "2 weeks" },
      { service: "1 year or more", notice: "4 weeks" },
      { service: "Farm/domestic, 6 months+", notice: "4 weeks" },
    ],
    severanceSummary:
      "Retrenchment severance: at least one week's remuneration for every completed year of continuous service. Unreasonably refusing a suitable alternative position offered by the employer forfeits the entitlement.",
    claimDeadline: "30 days",
    claimForum: "CCMA or bargaining council",
    faqs: [
      {
        question: "What notice period applies under the BCEA?",
        answer:
          "One week during the first six months, two weeks from six months to one year, and four weeks after one year of service. Farm and domestic workers get four weeks once they pass six months.",
      },
      {
        question: "How is retrenchment severance pay calculated in South Africa?",
        answer:
          "One week's remuneration for each completed year of continuous service, as a minimum. Contracts, policies or collective agreements can provide more.",
      },
      {
        question: "How long do I have to refer a dismissal to the CCMA?",
        answer:
          "30 days from the date of dismissal for unfair dismissal, and 90 days for an unfair labour practice. Late referrals need a condonation application.",
      },
    ],
    sources: [
      { name: "Basic Conditions of Employment Act 75 of 1997", url: "https://www.gov.za/documents/basic-conditions-employment-act" },
      { name: "Labour Relations Act 66 of 1995", url: "https://www.gov.za/documents/labour-relations-act" },
      { name: "CCMA — referring a dispute", url: "https://www.ccma.org.za" },
    ],
    compute: ({ months, weeklyPay, reason }) => {
      const years = Math.floor(months / 12);
      let noticeWeeks = 1;
      if (months >= 12) noticeWeeks = 4;
      else if (months >= 6) noticeWeeks = 2;

      const payInLieu = round2(noticeWeeks * weeklyPay);
      const warnings: string[] = [];
      let severanceWeeks = 0;

      if (reason === "redundancy") {
        severanceWeeks = years;
        if (years === 0) warnings.push("Severance is calculated per completed year, so under a year of service produces nothing.");
        warnings.push("The employer must also run a genuine section 189 consultation before retrenching.");
      } else if (reason === "resignation") {
        warnings.push("Resigning means you give the notice, and no severance arises.");
      }

      const severanceAmount = round2(severanceWeeks * weeklyPay);
      const total = round2((reason === "resignation" ? 0 : payInLieu) + severanceAmount);

      return {
        noticeWeeks,
        noticeLabel: `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}`,
        payInLieu,
        severanceWeeks,
        severanceAmount,
        severanceLabel: severanceWeeks > 0 ? `${severanceWeeks} week${severanceWeeks === 1 ? "" : "s"} (1 per completed year)` : "Not applicable",
        total,
        lines: [
          { label: "BCEA notice", value: `${noticeWeeks} week${noticeWeeks === 1 ? "" : "s"}` },
          { label: "Pay in lieu of notice", value: money("R", payInLieu) },
          { label: "Retrenchment severance", value: money("R", severanceAmount) },
        ],
        deadline: "30 days",
        deadlineNote: "Refer an unfair dismissal to the CCMA within 30 days; unfair labour practices carry 90 days.",
        warnings,
      };
    },
  },
];

export function getNoticeRules(slug?: string): NoticeRules | undefined {
  return noticeRules.find((r) => r.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Small claims fee rules                                              */
/* ------------------------------------------------------------------ */

interface FeeBand {
  upTo: number;
  filing: number;
  hearing: number;
}

function bandedFee(bands: FeeBand[], amount: number): { filing: number; hearing: number } {
  const band = bands.find((b) => amount <= b.upTo) ?? bands[bands.length - 1];
  return { filing: band.filing, hearing: band.hearing };
}

export const smallClaimsRules: SmallClaimsRules[] = [
  {
    slug: "united-kingdom",
    country: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    limit: 10000,
    limitLabel: "£10,000 (£1,000 for most personal injury)",
    forum: "County Court small claims track",
    metaTitle: "UK Small Claims Court Fees Calculator — Filing and Hearing Costs",
    metaDescription:
      "Enter your claim value to see the UK County Court issue fee, small claims hearing fee, total cost and what you can recover if you win on the small claims track.",
    intro: [
      "A County Court money claim carries two fees: an issue fee when you start it and a hearing fee once the claim is allocated to the small claims track. Both are recoverable from the defendant if you win.",
      "Claims up to £10,000 are normally allocated to the small claims track, where costs recovery is deliberately limited so that losing does not expose you to the other side's legal bill.",
    ],
    feeTable: [
      { band: "Up to £300", filing: "£35", hearing: "£27" },
      { band: "£300.01 to £500", filing: "£50", hearing: "£59" },
      { band: "£500.01 to £1,000", filing: "£70", hearing: "£85" },
      { band: "£1,000.01 to £1,500", filing: "£80", hearing: "£123" },
      { band: "£1,500.01 to £3,000", filing: "£115", hearing: "£181" },
      { band: "£3,000.01 to £5,000", filing: "£205", hearing: "£346" },
      { band: "£5,000.01 to £10,000", filing: "5% of the claim", hearing: "£346" },
    ],
    lawyersAllowed: "Permitted, but legal costs are not recoverable on the small claims track beyond fixed amounts.",
    appeal: "Appeal to a Circuit Judge with permission, on a point of law or serious procedural irregularity.",
    overLimitAdvice:
      "Above £10,000 the claim moves to the fast track or intermediate track, where the loser normally pays the winner's costs — a materially different risk profile.",
    steps: [
      "Send a letter before claim giving 14 days to respond, per the Practice Direction.",
      "Issue online through Money Claim Online for money claims up to £100,000.",
      "Apply for Help with Fees (form EX160) if you are on a low income or benefits.",
      "Prepare your documents bundle — the hearing is short and document-led.",
    ],
    faqs: [
      {
        question: "How much does it cost to make a small claim in the UK?",
        answer:
          "The issue fee ranges from £35 for claims up to £300 to 5% of the value for claims between £5,000 and £10,000, plus a hearing fee of £27 to £346. Both are recoverable from the defendant if you win.",
      },
      {
        question: "Can I get help with court fees?",
        answer:
          "Yes. The Help with Fees scheme can reduce or remove the fee if you receive certain benefits or are on a low income with limited savings. Apply before or at the same time as issuing the claim.",
      },
      {
        question: "Will I have to pay the other side's legal costs if I lose?",
        answer:
          "On the small claims track, no — costs recovery is limited to court fees, limited expenses and travel. That protection disappears if the claim is allocated to a higher track.",
      },
    ],
    sources: [
      { name: "GOV.UK — court fees (EX50)", url: "https://www.gov.uk/government/publications/fees-in-the-civil-and-family-courts-main-fees-ex50" },
      { name: "GOV.UK — make a court claim for money", url: "https://www.gov.uk/make-court-claim-for-money" },
      { name: "GOV.UK — Help with Fees", url: "https://www.gov.uk/get-help-with-court-fees" },
    ],
    compute: ({ amount }) => {
      const bands: FeeBand[] = [
        { upTo: 300, filing: 35, hearing: 27 },
        { upTo: 500, filing: 50, hearing: 59 },
        { upTo: 1000, filing: 70, hearing: 85 },
        { upTo: 1500, filing: 80, hearing: 123 },
        { upTo: 3000, filing: 115, hearing: 181 },
        { upTo: 5000, filing: 205, hearing: 346 },
        { upTo: 10000, filing: 0, hearing: 346 },
      ];
      const { filing, hearing } = bandedFee(bands, amount);
      const issue = amount > 5000 ? round2(amount * 0.05) : filing;
      const eligible = amount > 0 && amount <= 10000;
      const total = round2(issue + hearing);
      return {
        eligible,
        limitLabel: "£10,000",
        forum: "County Court small claims track",
        filingFee: issue,
        filingFeeLabel: money("£", issue),
        hearingFee: hearing,
        hearingFeeLabel: money("£", hearing),
        totalLabel: money("£", total),
        lawyersAllowed: "Permitted, but costs are not recoverable beyond fixed amounts.",
        appeal: "Permission-based appeal to a Circuit Judge.",
        overLimitAdvice:
          "Above £10,000 the claim leaves the small claims track and the loser normally pays the winner's legal costs.",
        netIfWin: eligible
          ? `If you win and the fees are recovered, you keep about ${money("£", round2(amount))}; if they are not, about ${money("£", round2(amount - total))}.`
          : "Outside the small claims track, so track allocation and costs risk change the maths.",
      };
    },
  },
  {
    slug: "ireland",
    country: "Ireland",
    currency: "EUR",
    currencySymbol: "€",
    limit: 2000,
    limitLabel: "€2,000",
    forum: "District Court Small Claims Procedure",
    metaTitle: "Ireland Small Claims Fee Calculator — €25 Procedure and Limits",
    metaDescription:
      "Check whether your dispute fits Ireland's €2,000 Small Claims Procedure, the flat €25 fee, what happens if the claim exceeds the limit, and the District Court alternative.",
    intro: [
      "Ireland's Small Claims Procedure is a flat-fee route through the District Court for consumer, minor property damage and small business disputes up to €2,000. The fee is €25 regardless of claim value.",
      "The Small Claims Registrar first tries to settle the dispute in writing. Only unresolved claims go to a District Court hearing, which keeps most matters entirely out of court.",
    ],
    feeTable: [
      { band: "Any amount up to €2,000", filing: "€25", hearing: "Included" },
      { band: "Over €2,000", filing: "District Court fees apply", hearing: "Varies" },
    ],
    lawyersAllowed: "You do not need a solicitor, and legal costs are not normally awarded in the Small Claims Procedure.",
    appeal: "Appeal from the District Court to the Circuit Court within 14 days of the order.",
    overLimitAdvice:
      "Above €2,000 you use the ordinary District Court (to €15,000) or Circuit Court (to €75,000), where solicitor costs and costs risk both apply.",
    steps: [
      "Complain in writing to the trader first and keep the reply.",
      "Apply online through the Courts Service Small Claims portal and pay €25.",
      "Respond to the Registrar's settlement attempt within the stated timeframe.",
      "Bring receipts, photos and correspondence to any hearing.",
    ],
    faqs: [
      {
        question: "How much does the Irish Small Claims Procedure cost?",
        answer: "A flat €25 application fee, whatever the value of the claim, with no separate hearing fee.",
      },
      {
        question: "What is the small claims limit in Ireland?",
        answer:
          "€2,000. Above that you use the ordinary District Court up to €15,000 or the Circuit Court up to €75,000.",
      },
      {
        question: "Do I need a solicitor for a small claim?",
        answer:
          "No. The procedure is designed for self-representation and legal costs are not normally awarded either way.",
      },
    ],
    sources: [
      { name: "Courts Service — Small Claims", url: "https://www.courts.ie/small-claims" },
      { name: "Citizens Information — Small Claims Procedure", url: "https://www.citizensinformation.ie/en/justice/courts-system/small-claims-procedure/" },
    ],
    compute: ({ amount }) => {
      const eligible = amount > 0 && amount <= 2000;
      const filing = eligible ? 25 : null;
      return {
        eligible,
        limitLabel: "€2,000",
        forum: "District Court Small Claims Procedure",
        filingFee: filing,
        filingFeeLabel: eligible ? "€25" : "District Court fees apply",
        hearingFee: 0,
        hearingFeeLabel: "Included",
        totalLabel: eligible ? "€25" : "Varies by court",
        lawyersAllowed: "Not required; costs are not normally awarded.",
        appeal: "To the Circuit Court within 14 days.",
        overLimitAdvice:
          "Above €2,000, use the District Court up to €15,000 or the Circuit Court up to €75,000, where costs risk applies.",
        netIfWin: eligible
          ? `Win and you keep about ${money("€", round2(amount - 25))} after the fee, or the full amount if the fee is awarded back.`
          : "Outside the €2,000 procedure, so ordinary court fees and solicitor costs apply.",
      };
    },
  },
  {
    slug: "canada",
    country: "Canada",
    currency: "CAD",
    currencySymbol: "C$",
    limit: 35000,
    limitLabel: "C$35,000 (Ontario; other provinces differ)",
    forum: "Small Claims Court",
    metaTitle: "Canada Small Claims Court Fee Calculator — Filing and Trial Costs",
    metaDescription:
      "Estimate Canadian small claims court costs: the plaintiff's claim filing fee, trial fee, and whether your claim fits the provincial monetary limit.",
    intro: [
      "Small claims limits and fees are provincial. This calculator uses Ontario, whose C$35,000 ceiling is the highest in the country, and flags where other provinces sit lower — Alberta at C$100,000 for civil claims, British Columbia at C$5,000 in the Civil Resolution Tribunal and C$35,000 in Provincial Court.",
      "Ontario charges an issuing fee that differs for infrequent and frequent claimants, plus a separate fee to set the matter down for trial.",
    ],
    feeTable: [
      { band: "Plaintiff's claim (infrequent claimant)", filing: "C$102", hearing: "C$293 trial fee" },
      { band: "Plaintiff's claim (frequent claimant)", filing: "C$215", hearing: "C$379 trial fee" },
      { band: "Defence, motion or amendment", filing: "C$54–C$127", hearing: "—" },
      { band: "Enforcement (writ, garnishment)", filing: "C$40–C$135", hearing: "—" },
    ],
    lawyersAllowed: "Lawyers and licensed paralegals may appear; costs awards are generally capped at 15% of the claim.",
    appeal: "Appeal to the Divisional Court where the claim exceeds C$3,500, within 30 days.",
    overLimitAdvice:
      "Above the provincial limit you either abandon the excess to stay in Small Claims Court or file in the Superior Court, where costs exposure rises sharply.",
    steps: [
      "Send a demand letter with a clear deadline before filing.",
      "File the Plaintiff's Claim (Form 7A) online through the Small Claims Court e-filing service.",
      "Serve the defendant within six months of filing.",
      "Attend the mandatory settlement conference before any trial date is set.",
    ],
    faqs: [
      {
        question: "What is the small claims limit in Canada?",
        answer:
          "It is provincial: C$35,000 in Ontario and British Columbia's Provincial Court, C$5,000 in BC's Civil Resolution Tribunal, C$100,000 in Alberta, and C$15,000 in Quebec.",
      },
      {
        question: "How much does it cost to file a small claim in Ontario?",
        answer:
          "About C$102 for an infrequent claimant or C$215 for a frequent claimant to issue the claim, plus roughly C$293–C$379 to set the action down for trial.",
      },
      {
        question: "Can I recover legal costs?",
        answer:
          "Representation costs in Ontario Small Claims Court are generally capped at 15% of the amount claimed, plus disbursements such as filing fees.",
      },
    ],
    sources: [
      { name: "Ontario — Small Claims Court fees", url: "https://www.ontario.ca/page/suing-someone-small-claims-court" },
      { name: "Courts of Justice Act — fee regulations", url: "https://www.ontario.ca/laws/statute/90c43" },
      { name: "BC Civil Resolution Tribunal", url: "https://civilresolutionbc.ca" },
    ],
    compute: ({ amount }) => {
      const eligible = amount > 0 && amount <= 35000;
      const filing = 102;
      const hearing = 293;
      const total = filing + hearing;
      return {
        eligible,
        limitLabel: "C$35,000 (Ontario)",
        forum: "Small Claims Court",
        filingFee: filing,
        filingFeeLabel: `${money("C$", filing)} (infrequent claimant)`,
        hearingFee: hearing,
        hearingFeeLabel: `${money("C$", hearing)} trial fee`,
        totalLabel: money("C$", total),
        lawyersAllowed: "Lawyers and paralegals allowed; costs generally capped at 15% of the claim.",
        appeal: "Divisional Court within 30 days where the claim exceeds C$3,500.",
        overLimitAdvice:
          "Above C$35,000 in Ontario you must abandon the excess or move to the Superior Court, where costs exposure is much higher.",
        netIfWin: eligible
          ? `Win and you keep roughly ${money("C$", round2(amount - total))} after fees, before any costs award in your favour.`
          : "Confirm your own province's limit — Alberta, Quebec and BC all differ from Ontario.",
      };
    },
  },
  {
    slug: "australia",
    country: "Australia",
    currency: "AUD",
    currencySymbol: "A$",
    limit: 100000,
    limitLabel: "A$10,000–A$100,000 depending on tribunal",
    forum: "State civil and administrative tribunal",
    metaTitle: "Australia Tribunal Small Claims Fee Calculator (NCAT, VCAT, QCAT)",
    metaDescription:
      "Estimate lodgement fees for Australian civil tribunal small claims by claim value, check the monetary limits for NCAT, VCAT and QCAT, and see whether lawyers can appear.",
    intro: [
      "Australian low-value disputes go to state civil and administrative tribunals rather than courts. NCAT, VCAT, QCAT and their equivalents each set their own monetary limits and tiered lodgement fees.",
      "Fees are modest and rise with claim value. Legal representation usually requires the tribunal's leave, which keeps hearings informal and costs low.",
    ],
    feeTable: [
      { band: "Up to A$3,000", filing: "About A$60", hearing: "Usually none" },
      { band: "A$3,001 to A$10,000", filing: "About A$120", hearing: "Usually none" },
      { band: "A$10,001 to A$30,000", filing: "About A$190", hearing: "Usually none" },
      { band: "Over A$30,000", filing: "About A$250 or higher", hearing: "Possible directions fees" },
    ],
    lawyersAllowed: "Generally require the tribunal's leave to appear, so most parties self-represent.",
    appeal: "Internal appeal panel on questions of law, with leave for questions of fact.",
    overLimitAdvice:
      "Above the tribunal's jurisdictional ceiling the dispute goes to the Magistrates or District Court, where costs follow the event.",
    steps: [
      "Complain to the trader in writing and keep the response.",
      "Lodge with the tribunal covering your state and pay the tiered fee.",
      "Attend conciliation — most tribunal matters settle before hearing.",
      "Bring quotes, invoices and photographs, not just a narrative.",
    ],
    faqs: [
      {
        question: "How much does it cost to lodge a tribunal claim in Australia?",
        answer:
          "Typically A$50 to A$250 depending on the claim value and the state tribunal. Concession rates are available for pension and health care card holders.",
      },
      {
        question: "What is the tribunal claim limit?",
        answer:
          "It varies: NCAT hears consumer claims to A$40,000 in its consumer and commercial division, VCAT has no general monetary cap in civil claims, and QCAT's minor civil disputes limit is A$25,000.",
      },
      {
        question: "Can I bring a lawyer?",
        answer:
          "Usually only with the tribunal's leave. Tribunals are designed for self-representation, which is why filing fees are low and hearings are informal.",
      },
    ],
    sources: [
      { name: "NSW Civil and Administrative Tribunal (NCAT)", url: "https://www.ncat.nsw.gov.au" },
      { name: "Victorian Civil and Administrative Tribunal (VCAT)", url: "https://www.vcat.vic.gov.au" },
      { name: "Queensland Civil and Administrative Tribunal (QCAT)", url: "https://www.qcat.qld.gov.au" },
    ],
    compute: ({ amount }) => {
      const bands: FeeBand[] = [
        { upTo: 3000, filing: 60, hearing: 0 },
        { upTo: 10000, filing: 120, hearing: 0 },
        { upTo: 30000, filing: 190, hearing: 0 },
        { upTo: Number.MAX_SAFE_INTEGER, filing: 250, hearing: 0 },
      ];
      const { filing } = bandedFee(bands, amount);
      const eligible = amount > 0 && amount <= 100000;
      return {
        eligible,
        limitLabel: "A$10,000–A$100,000 by tribunal",
        forum: "State civil and administrative tribunal",
        filingFee: filing,
        filingFeeLabel: `About ${money("A$", filing)}`,
        hearingFee: 0,
        hearingFeeLabel: "Usually none",
        totalLabel: `About ${money("A$", filing)}`,
        lawyersAllowed: "Leave of the tribunal usually required.",
        appeal: "Internal appeal panel; questions of law as of right.",
        overLimitAdvice:
          "Above the tribunal ceiling the matter goes to the Magistrates or District Court, where the loser pays costs.",
        netIfWin: eligible
          ? `Win and you keep about ${money("A$", round2(amount - filing))} after the lodgement fee, which the tribunal can order the other side to repay.`
          : "Check your state tribunal's monetary ceiling before lodging.",
      };
    },
  },
  {
    slug: "new-zealand",
    country: "New Zealand",
    currency: "NZD",
    currencySymbol: "NZ$",
    limit: 30000,
    limitLabel: "NZ$30,000",
    forum: "Disputes Tribunal",
    metaTitle: "New Zealand Disputes Tribunal Fee Calculator — NZ$30,000 Limit",
    metaDescription:
      "Check the New Zealand Disputes Tribunal filing fee for your claim value, the NZ$30,000 limit, why lawyers cannot appear, and what happens if your claim is larger.",
    intro: [
      "The Disputes Tribunal is New Zealand's small claims forum, hearing claims up to NZ$30,000. Fees are tiered by claim value and there is no separate hearing fee.",
      "Lawyers cannot represent parties. A referee hears the case informally, and the order is enforceable through the District Court.",
    ],
    feeTable: [
      { band: "Up to NZ$2,000", filing: "NZ$59", hearing: "Included" },
      { band: "NZ$2,001 to NZ$5,000", filing: "NZ$117", hearing: "Included" },
      { band: "NZ$5,001 to NZ$30,000", filing: "NZ$234", hearing: "Included" },
      { band: "Over NZ$30,000", filing: "District Court fees apply", hearing: "Varies" },
    ],
    lawyersAllowed: "Not permitted — parties represent themselves before a referee.",
    appeal: "Only where the referee conducted the hearing unfairly, by appeal to the District Court within 28 days.",
    overLimitAdvice:
      "Above NZ$30,000 you file in the District Court, or you can abandon the excess to stay in the Disputes Tribunal.",
    steps: [
      "Try to resolve it directly and keep the written record.",
      "File online through the Disputes Tribunal portal and pay the tiered fee.",
      "Bring quotes, invoices and photos — the referee decides on documents and testimony.",
      "Enforce an unpaid order through the District Court collections process.",
    ],
    faqs: [
      {
        question: "How much does the Disputes Tribunal cost?",
        answer:
          "NZ$59 for claims up to NZ$2,000, NZ$117 up to NZ$5,000 and NZ$234 up to NZ$30,000. There is no separate hearing fee.",
      },
      {
        question: "Can I take a lawyer to the Disputes Tribunal?",
        answer:
          "No. Legal representation is not allowed, which is what keeps the process fast, cheap and informal.",
      },
      {
        question: "Can I appeal a Disputes Tribunal decision?",
        answer:
          "Only on the ground that the referee conducted the proceedings unfairly and prejudiced the outcome, by appeal to the District Court within 28 days.",
      },
    ],
    sources: [
      { name: "Disputes Tribunal — fees", url: "https://www.disputestribunal.govt.nz" },
      { name: "Disputes Tribunals Act 1988", url: "https://www.legislation.govt.nz/act/public/1988/0110/latest/DLM133283.html" },
    ],
    compute: ({ amount }) => {
      const bands: FeeBand[] = [
        { upTo: 2000, filing: 59, hearing: 0 },
        { upTo: 5000, filing: 117, hearing: 0 },
        { upTo: 30000, filing: 234, hearing: 0 },
      ];
      const eligible = amount > 0 && amount <= 30000;
      const { filing } = bandedFee(bands, amount);
      return {
        eligible,
        limitLabel: "NZ$30,000",
        forum: "Disputes Tribunal",
        filingFee: eligible ? filing : null,
        filingFeeLabel: eligible ? money("NZ$", filing) : "District Court fees apply",
        hearingFee: 0,
        hearingFeeLabel: "Included",
        totalLabel: eligible ? money("NZ$", filing) : "Varies by court",
        lawyersAllowed: "Not permitted.",
        appeal: "District Court within 28 days, unfair conduct of hearing only.",
        overLimitAdvice:
          "Above NZ$30,000, file in the District Court or abandon the excess to stay in the tribunal.",
        netIfWin: eligible
          ? `Win and you keep about ${money("NZ$", round2(amount - filing))} after the filing fee.`
          : "Over the NZ$30,000 limit, so the District Court applies unless you reduce the claim.",
      };
    },
  },
  {
    slug: "south-africa",
    country: "South Africa",
    currency: "ZAR",
    currencySymbol: "R",
    limit: 20000,
    limitLabel: "R20,000",
    forum: "Small Claims Court",
    metaTitle: "South Africa Small Claims Court Calculator — R20,000 Limit, No Fees",
    metaDescription:
      "Check whether your claim fits South Africa's R20,000 Small Claims Court limit, why there is no filing fee, the compulsory letter of demand, and the Magistrates Court alternative.",
    intro: [
      "The Small Claims Court hears civil claims up to R20,000 and charges no filing fee at all. A commissioner, usually a practising attorney sitting voluntarily, decides the case.",
      "Before you can issue summons you must send a letter of demand giving the other side 14 days to pay. Legal representation is prohibited, and there is no appeal on the merits.",
    ],
    feeTable: [
      { band: "Any amount up to R20,000", filing: "No fee", hearing: "No fee" },
      { band: "Sheriff service (optional)", filing: "Sheriff tariff", hearing: "—" },
      { band: "R20,001 to R400,000", filing: "Magistrates Court fees", hearing: "Varies" },
      { band: "Over R400,000", filing: "High Court fees", hearing: "Varies" },
    ],
    lawyersAllowed: "Prohibited — both sides must appear in person.",
    appeal: "No appeal on the merits; review to the High Court for gross irregularity only.",
    overLimitAdvice:
      "Above R20,000 you use the District Magistrates Court (to R200,000), the Regional Court (to R400,000) or the High Court, all of which carry fees and costs risk.",
    steps: [
      "Send a letter of demand by registered post giving 14 days to pay.",
      "Take the letter, proof of posting and your documents to the clerk of the Small Claims Court.",
      "Have the summons served — personally or by the sheriff.",
      "Attend the hearing in person; no lawyer may appear for either side.",
    ],
    faqs: [
      {
        question: "How much does the South African Small Claims Court cost?",
        answer:
          "Nothing to file. The only possible cost is the sheriff's tariff if you use the sheriff to serve the summons rather than serving it yourself.",
      },
      {
        question: "What is the Small Claims Court limit in South Africa?",
        answer: "R20,000 per claim. Above that you must use the Magistrates Court or High Court.",
      },
      {
        question: "Can I appeal a Small Claims Court judgment?",
        answer:
          "Not on the merits. The only route is a High Court review where the commissioner committed a gross irregularity or exceeded their jurisdiction.",
      },
    ],
    sources: [
      { name: "Department of Justice — Small Claims Court", url: "https://www.justice.gov.za/scc/scc.htm" },
      { name: "Small Claims Courts Act 61 of 1984", url: "https://www.gov.za/documents/small-claims-courts-act" },
    ],
    compute: ({ amount }) => {
      const eligible = amount > 0 && amount <= 20000;
      return {
        eligible,
        limitLabel: "R20,000",
        forum: "Small Claims Court",
        filingFee: eligible ? 0 : null,
        filingFeeLabel: eligible ? "No fee" : "Magistrates Court fees apply",
        hearingFee: 0,
        hearingFeeLabel: "No fee",
        totalLabel: eligible ? "R0 (sheriff tariff optional)" : "Varies by court",
        lawyersAllowed: "Not permitted.",
        appeal: "High Court review for gross irregularity only.",
        overLimitAdvice:
          "Above R20,000, use the District Magistrates Court to R200,000, the Regional Court to R400,000, or the High Court.",
        netIfWin: eligible
          ? `Win and you keep the full ${money("R", round2(amount))} — there are no court fees to deduct.`
          : "Over R20,000, so court fees and legal costs enter the picture.",
      };
    },
  },
];

export function getSmallClaimsRules(slug?: string): SmallClaimsRules | undefined {
  return smallClaimsRules.find((r) => r.slug === slug);
}

export const calculatorCountries = noticeRules.map((r) => ({
  slug: r.slug,
  country: r.country,
  currency: r.currency,
}));
