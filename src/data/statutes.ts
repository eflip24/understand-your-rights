// Programmatic statute library — data-driven state × topic pages.
// Each topic has plain-English context + per-state values keyed by state slug.

import { stateData } from "@/data/locations/stateData";

export interface StatuteTopic {
  slug: string;
  title: (stateName: string) => string;
  shortLabel: string;
  category: string;
  intro: string;
  // Headline columns shown in the per-state summary card
  fields: { key: string; label: string }[];
  // Per-state values, keyed by state slug.
  // Missing states fall back to "Varies — check official statute".
  data: Record<string, Record<string, string>>;
  // Official statute citation source (label + URL builder).
  sourceLabel: string;
  sourceUrl: (stateName: string) => string;
  relatedToolIds: string[];
  faqs: (stateName: string) => { question: string; answer: string }[];
  body: (stateName: string, values: Record<string, string>) => string;
}

// Helper: build a record only for the provided pairs; everything else falls back.
const r = <T extends Record<string, Record<string, string>>>(x: T) => x;

// =================== TOPIC 1: SECURITY DEPOSIT LIMITS ===================
const securityDepositData = r({
  alabama: { maxDeposit: "1 month's rent", returnDeadline: "60 days", interest: "Not required" },
  alaska: { maxDeposit: "2 months' rent (if rent < $2,000)", returnDeadline: "14–30 days", interest: "Not required" },
  arizona: { maxDeposit: "1.5 months' rent", returnDeadline: "14 days", interest: "Not required" },
  arkansas: { maxDeposit: "2 months' rent", returnDeadline: "60 days", interest: "Not required" },
  california: { maxDeposit: "1 month's rent (as of 2024)", returnDeadline: "21 days", interest: "Not required (some cities require)" },
  colorado: { maxDeposit: "No statutory limit", returnDeadline: "30–60 days", interest: "Not required" },
  connecticut: { maxDeposit: "2 months (1 month if tenant ≥62)", returnDeadline: "30 days", interest: "Required (annual)" },
  delaware: { maxDeposit: "1 month (year+ lease)", returnDeadline: "20 days", interest: "Required if held by escrow" },
  florida: { maxDeposit: "No statutory limit", returnDeadline: "15–60 days", interest: "Required if held in interest-bearing account" },
  georgia: { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Not required" },
  hawaii: { maxDeposit: "1 month's rent", returnDeadline: "14 days", interest: "Not required" },
  idaho: { maxDeposit: "No statutory limit", returnDeadline: "21–30 days", interest: "Not required" },
  illinois: { maxDeposit: "No statutory limit", returnDeadline: "30–45 days", interest: "Required (25+ unit buildings)" },
  indiana: { maxDeposit: "No statutory limit", returnDeadline: "45 days", interest: "Not required" },
  iowa: { maxDeposit: "2 months' rent", returnDeadline: "30 days", interest: "Required after 5 years" },
  kansas: { maxDeposit: "1 month (unfurnished) / 1.5 (furnished)", returnDeadline: "30 days", interest: "Not required" },
  kentucky: { maxDeposit: "No statutory limit", returnDeadline: "30–60 days", interest: "Not required" },
  louisiana: { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Not required" },
  maine: { maxDeposit: "2 months' rent", returnDeadline: "21–30 days", interest: "Not required" },
  maryland: { maxDeposit: "2 months' rent", returnDeadline: "45 days", interest: "Required (annual, simple)" },
  massachusetts: { maxDeposit: "1 month's rent", returnDeadline: "30 days", interest: "Required (5%/year or actual)" },
  michigan: { maxDeposit: "1.5 months' rent", returnDeadline: "30 days", interest: "Not required" },
  minnesota: { maxDeposit: "No statutory limit", returnDeadline: "21 days", interest: "Required (1%/year)" },
  mississippi: { maxDeposit: "No statutory limit", returnDeadline: "45 days", interest: "Not required" },
  missouri: { maxDeposit: "2 months' rent", returnDeadline: "30 days", interest: "Not required" },
  montana: { maxDeposit: "No statutory limit", returnDeadline: "10–30 days", interest: "Not required" },
  nebraska: { maxDeposit: "1 month's rent", returnDeadline: "14 days", interest: "Not required" },
  nevada: { maxDeposit: "3 months' rent", returnDeadline: "30 days", interest: "Not required" },
  "new-hampshire": { maxDeposit: "1 month or $100 (greater)", returnDeadline: "30 days", interest: "Required if held > 1 year" },
  "new-jersey": { maxDeposit: "1.5 months' rent", returnDeadline: "30 days", interest: "Required (annual)" },
  "new-mexico": { maxDeposit: "1 month (lease < 1 yr)", returnDeadline: "30 days", interest: "Required if > 1 month" },
  "new-york": { maxDeposit: "1 month's rent", returnDeadline: "14 days", interest: "Required (6+ unit buildings)" },
  "north-carolina": { maxDeposit: "1.5–2 months' rent", returnDeadline: "30–60 days", interest: "Not required" },
  "north-dakota": { maxDeposit: "1 month's rent", returnDeadline: "30 days", interest: "Required if > $1,500" },
  ohio: { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Required (5%/year on > $50)" },
  oklahoma: { maxDeposit: "No statutory limit", returnDeadline: "45 days", interest: "Not required" },
  oregon: { maxDeposit: "No statutory limit", returnDeadline: "31 days", interest: "Not required" },
  pennsylvania: { maxDeposit: "2 months (1st year), 1 month after", returnDeadline: "30 days", interest: "Required after 2 years" },
  "rhode-island": { maxDeposit: "1 month's rent", returnDeadline: "20 days", interest: "Not required" },
  "south-carolina": { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Not required" },
  "south-dakota": { maxDeposit: "1 month's rent", returnDeadline: "14–45 days", interest: "Not required" },
  tennessee: { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Not required" },
  texas: { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Not required" },
  utah: { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Not required" },
  vermont: { maxDeposit: "No statutory limit", returnDeadline: "14 days", interest: "Not required" },
  virginia: { maxDeposit: "2 months' rent", returnDeadline: "45 days", interest: "Not required" },
  washington: { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Not required" },
  "west-virginia": { maxDeposit: "No statutory limit", returnDeadline: "60 days", interest: "Not required" },
  wisconsin: { maxDeposit: "No statutory limit", returnDeadline: "21 days", interest: "Not required" },
  wyoming: { maxDeposit: "No statutory limit", returnDeadline: "30 days", interest: "Not required" },
});

// =================== TOPIC 2: EVICTION NOTICE PERIOD ===================
const evictionData = r({
  alabama: { nonpayment: "7 days", leaseViolation: "7 days", noCause: "30 days" },
  alaska: { nonpayment: "7 days", leaseViolation: "10 days", noCause: "30 days" },
  arizona: { nonpayment: "5 days", leaseViolation: "10 days", noCause: "30 days" },
  arkansas: { nonpayment: "3 days (criminal) / 10 (civil)", leaseViolation: "14 days", noCause: "30 days" },
  california: { nonpayment: "3 business days", leaseViolation: "3 days", noCause: "30–60 days" },
  colorado: { nonpayment: "10 days", leaseViolation: "10 days", noCause: "21 days" },
  connecticut: { nonpayment: "9 days (after grace)", leaseViolation: "15 days", noCause: "3 days" },
  delaware: { nonpayment: "5 days", leaseViolation: "7 days", noCause: "60 days" },
  florida: { nonpayment: "3 days", leaseViolation: "7 days", noCause: "15 days" },
  georgia: { nonpayment: "Immediate (demand)", leaseViolation: "Immediate", noCause: "60 days" },
  hawaii: { nonpayment: "5 business days", leaseViolation: "10 days", noCause: "45 days" },
  idaho: { nonpayment: "3 days", leaseViolation: "3 days", noCause: "30 days" },
  illinois: { nonpayment: "5 days", leaseViolation: "10 days", noCause: "30 days" },
  indiana: { nonpayment: "10 days", leaseViolation: "Reasonable notice", noCause: "30 days" },
  iowa: { nonpayment: "3 days", leaseViolation: "7 days", noCause: "30 days" },
  kansas: { nonpayment: "3 days", leaseViolation: "14/30 days", noCause: "30 days" },
  kentucky: { nonpayment: "7 days", leaseViolation: "14 days", noCause: "30 days" },
  louisiana: { nonpayment: "5 days", leaseViolation: "5 days", noCause: "10 days" },
  maine: { nonpayment: "7 days", leaseViolation: "7 days", noCause: "30 days" },
  maryland: { nonpayment: "10 days (after demand)", leaseViolation: "30 days", noCause: "60 days" },
  massachusetts: { nonpayment: "14 days", leaseViolation: "7 days", noCause: "30 days" },
  michigan: { nonpayment: "7 days", leaseViolation: "30 days", noCause: "30 days" },
  minnesota: { nonpayment: "14 days", leaseViolation: "Immediate (lease)", noCause: "Per lease term" },
  mississippi: { nonpayment: "3 days", leaseViolation: "30 days", noCause: "30 days" },
  missouri: { nonpayment: "Immediate (demand)", leaseViolation: "10 days", noCause: "30 days" },
  montana: { nonpayment: "3 days", leaseViolation: "14 days", noCause: "30 days" },
  nebraska: { nonpayment: "7 days", leaseViolation: "14/30 days", noCause: "30 days" },
  nevada: { nonpayment: "7 judicial days", leaseViolation: "5 days", noCause: "30 days" },
  "new-hampshire": { nonpayment: "7 days", leaseViolation: "30 days", noCause: "30 days" },
  "new-jersey": { nonpayment: "Immediate (no notice required)", leaseViolation: "1 month", noCause: "Generally not allowed" },
  "new-mexico": { nonpayment: "3 days", leaseViolation: "7 days", noCause: "30 days" },
  "new-york": { nonpayment: "14 days", leaseViolation: "10 days", noCause: "30–90 days" },
  "north-carolina": { nonpayment: "10 days", leaseViolation: "Immediate", noCause: "7–30 days" },
  "north-dakota": { nonpayment: "3 days", leaseViolation: "3 days", noCause: "30 days" },
  ohio: { nonpayment: "3 days", leaseViolation: "3 days", noCause: "30 days" },
  oklahoma: { nonpayment: "5 days", leaseViolation: "10/15 days", noCause: "30 days" },
  oregon: { nonpayment: "72 hours / 144 hours", leaseViolation: "30 days", noCause: "30–90 days" },
  pennsylvania: { nonpayment: "10 days", leaseViolation: "15 days", noCause: "15–30 days" },
  "rhode-island": { nonpayment: "5 days (after due)", leaseViolation: "20 days", noCause: "30 days" },
  "south-carolina": { nonpayment: "5 days", leaseViolation: "14 days", noCause: "30 days" },
  "south-dakota": { nonpayment: "3 days", leaseViolation: "3 days", noCause: "30 days" },
  tennessee: { nonpayment: "14 days", leaseViolation: "14/30 days", noCause: "30 days" },
  texas: { nonpayment: "3 days (or per lease)", leaseViolation: "3 days", noCause: "30 days" },
  utah: { nonpayment: "3 days", leaseViolation: "3 days", noCause: "15 days" },
  vermont: { nonpayment: "14 days", leaseViolation: "30 days", noCause: "30–60 days" },
  virginia: { nonpayment: "5 days", leaseViolation: "21/30 days", noCause: "30 days" },
  washington: { nonpayment: "14 days", leaseViolation: "10 days", noCause: "20 days" },
  "west-virginia": { nonpayment: "Immediate (demand)", leaseViolation: "Immediate", noCause: "30 days" },
  wisconsin: { nonpayment: "5 days", leaseViolation: "5/14 days", noCause: "28 days" },
  wyoming: { nonpayment: "3 days", leaseViolation: "3 days", noCause: "30 days" },
});

// =================== TOPIC 3: MINIMUM WAGE ===================
const minimumWageData = r({
  alabama: { stateMin: "$7.25 (federal)", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  alaska: { stateMin: "$11.91", tippedMin: "$11.91 (no tip credit)", overtimeRule: ">8 hrs/day or >40/week" },
  arizona: { stateMin: "$14.70", tippedMin: "$11.70", overtimeRule: "Federal FLSA" },
  arkansas: { stateMin: "$11.00", tippedMin: "$2.63", overtimeRule: "Federal FLSA" },
  california: { stateMin: "$16.50", tippedMin: "$16.50 (no tip credit)", overtimeRule: ">8 hrs/day or >40/week" },
  colorado: { stateMin: "$14.81", tippedMin: "$11.79", overtimeRule: ">12 hrs/day or >40/week" },
  connecticut: { stateMin: "$16.35", tippedMin: "$6.38–$8.23", overtimeRule: "Federal FLSA" },
  delaware: { stateMin: "$15.00", tippedMin: "$2.23", overtimeRule: "Federal FLSA" },
  florida: { stateMin: "$13.00 (rising to $15 by 2026)", tippedMin: "$9.98", overtimeRule: "Federal FLSA" },
  georgia: { stateMin: "$7.25 (federal)", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  hawaii: { stateMin: "$14.00", tippedMin: "$12.75", overtimeRule: "Federal FLSA" },
  idaho: { stateMin: "$7.25", tippedMin: "$3.35", overtimeRule: "Federal FLSA" },
  illinois: { stateMin: "$15.00", tippedMin: "$9.00", overtimeRule: "Federal FLSA" },
  indiana: { stateMin: "$7.25", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  iowa: { stateMin: "$7.25", tippedMin: "$4.35", overtimeRule: "Federal FLSA" },
  kansas: { stateMin: "$7.25", tippedMin: "$2.13", overtimeRule: ">46 hrs/week (state)" },
  kentucky: { stateMin: "$7.25", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  louisiana: { stateMin: "$7.25 (federal)", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  maine: { stateMin: "$14.65", tippedMin: "$7.33", overtimeRule: "Federal FLSA" },
  maryland: { stateMin: "$15.00", tippedMin: "$3.63", overtimeRule: "Federal FLSA" },
  massachusetts: { stateMin: "$15.00", tippedMin: "$6.75", overtimeRule: "Federal FLSA" },
  michigan: { stateMin: "$12.48", tippedMin: "$4.74", overtimeRule: "Federal FLSA" },
  minnesota: { stateMin: "$11.13 (large) / $9.08 (small)", tippedMin: "Same as min (no tip credit)", overtimeRule: ">48 hrs/week (state)" },
  mississippi: { stateMin: "$7.25 (federal)", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  missouri: { stateMin: "$13.75", tippedMin: "$6.88", overtimeRule: "Federal FLSA" },
  montana: { stateMin: "$10.55", tippedMin: "Same as min (no tip credit)", overtimeRule: "Federal FLSA" },
  nebraska: { stateMin: "$13.50", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  nevada: { stateMin: "$12.00", tippedMin: "$12.00 (no tip credit)", overtimeRule: ">8 hrs/day if < 1.5x min" },
  "new-hampshire": { stateMin: "$7.25", tippedMin: "$3.27", overtimeRule: "Federal FLSA" },
  "new-jersey": { stateMin: "$15.49", tippedMin: "$5.62", overtimeRule: "Federal FLSA" },
  "new-mexico": { stateMin: "$12.00", tippedMin: "$3.00", overtimeRule: "Federal FLSA" },
  "new-york": { stateMin: "$16.50 (NYC/LI/Westchester) / $15.50 elsewhere", tippedMin: "$11.00–$13.75", overtimeRule: "Federal FLSA" },
  "north-carolina": { stateMin: "$7.25", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  "north-dakota": { stateMin: "$7.25", tippedMin: "$4.86", overtimeRule: "Federal FLSA" },
  ohio: { stateMin: "$10.70", tippedMin: "$5.35", overtimeRule: "Federal FLSA" },
  oklahoma: { stateMin: "$7.25", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  oregon: { stateMin: "$14.70 (standard)", tippedMin: "Same as min (no tip credit)", overtimeRule: "Federal FLSA" },
  pennsylvania: { stateMin: "$7.25", tippedMin: "$2.83", overtimeRule: "Federal FLSA" },
  "rhode-island": { stateMin: "$15.00", tippedMin: "$3.89", overtimeRule: "Federal FLSA" },
  "south-carolina": { stateMin: "$7.25 (federal)", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  "south-dakota": { stateMin: "$11.50", tippedMin: "$5.75", overtimeRule: "Federal FLSA" },
  tennessee: { stateMin: "$7.25 (federal)", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  texas: { stateMin: "$7.25", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  utah: { stateMin: "$7.25", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  vermont: { stateMin: "$14.01", tippedMin: "$7.01", overtimeRule: "Federal FLSA" },
  virginia: { stateMin: "$12.41", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
  washington: { stateMin: "$16.66", tippedMin: "$16.66 (no tip credit)", overtimeRule: "Federal FLSA" },
  "west-virginia": { stateMin: "$8.75", tippedMin: "$2.62", overtimeRule: "Federal FLSA" },
  wisconsin: { stateMin: "$7.25", tippedMin: "$2.33", overtimeRule: "Federal FLSA" },
  wyoming: { stateMin: "$7.25 (federal)", tippedMin: "$2.13", overtimeRule: "Federal FLSA" },
});

export const statuteTopics: StatuteTopic[] = [
  {
    slug: "security-deposit-limits",
    shortLabel: "Security Deposit Limits",
    category: "Landlord–Tenant",
    title: (s) => `${s} Security Deposit Laws — Limits, Returns & Interest`,
    intro:
      "Every state caps how much a landlord can charge for a security deposit, when it must be returned, and whether interest must be paid. Here's the plain-English version for your state.",
    fields: [
      { key: "maxDeposit", label: "Maximum deposit" },
      { key: "returnDeadline", label: "Return deadline after move-out" },
      { key: "interest", label: "Interest required" },
    ],
    data: securityDepositData,
    sourceLabel: "Official state landlord–tenant statute",
    sourceUrl: (s) => `https://www.google.com/search?q=${encodeURIComponent(s + " security deposit statute site:.gov")}`,
    relatedToolIds: ["security-deposit-calculator", "rental-agreement-generator", "habitability-tracker", "move-out-checklist-generator"],
    faqs: (s) => [
      { question: `What is the maximum security deposit in ${s}?`, answer: `See the table above for the current statutory cap. Some cities in ${s} impose stricter limits than the state.` },
      { question: `Can my landlord keep my deposit for normal wear and tear?`, answer: `No. In every state, landlords can only deduct for damage beyond ordinary wear and tear, unpaid rent, and cleaning costs that exceed normal use.` },
      { question: `What happens if my landlord misses the return deadline?`, answer: `Most states impose penalties — often 2–3x the deposit — when landlords miss the statutory return window without an itemized list of deductions.` },
      { question: `Do I have to leave a forwarding address?`, answer: `Yes. Almost every state requires you to provide a forwarding address in writing for the deposit return clock to start.` },
    ],
    body: (s, v) =>
      `In ${s}, landlords can charge up to **${v.maxDeposit}** as a security deposit. After you move out, the landlord must return the deposit (minus any itemized lawful deductions) within **${v.returnDeadline}**. Interest on held deposits: **${v.interest}**. If your landlord wrongfully withholds your deposit, you can usually sue in small claims court — and many states award double or triple damages for bad-faith withholding.`,
  },
  {
    slug: "eviction-notice-period",
    shortLabel: "Eviction Notice Period",
    category: "Landlord–Tenant",
    title: (s) => `${s} Eviction Notice Periods — Nonpayment, Lease Violation & No-Cause`,
    intro:
      "Before a landlord can file an eviction lawsuit, they must give the tenant a written notice. The required notice period depends on the reason. Here's what's required in your state.",
    fields: [
      { key: "nonpayment", label: "Nonpayment of rent" },
      { key: "leaseViolation", label: "Lease violation (cure or quit)" },
      { key: "noCause", label: "No-cause / end of tenancy" },
    ],
    data: evictionData,
    sourceLabel: "Official state eviction statute",
    sourceUrl: (s) => `https://www.google.com/search?q=${encodeURIComponent(s + " eviction notice statute site:.gov")}`,
    relatedToolIds: ["eviction-notice-period-lookup", "habitability-tracker", "rental-agreement-generator", "move-out-checklist-generator"],
    faqs: (s) => [
      { question: `How much notice does a landlord have to give before evicting in ${s}?`, answer: `It depends on the reason — see the table. Nonpayment notices are usually shortest; no-cause notices are longest.` },
      { question: `Can a landlord evict me without notice?`, answer: `In almost every state, no. Landlords must serve a written notice and, if you don't comply, file an eviction lawsuit. "Self-help" evictions (changing locks, shutting off utilities) are illegal.` },
      { question: `What happens if I pay rent during the notice period?`, answer: `In most states, paying the full rent owed during a nonpayment notice period stops the eviction. This is called the "right to cure."` },
      { question: `Can my landlord retaliate if I file a complaint?`, answer: `No. Federal and state law prohibit retaliatory evictions for at least 6 months after a tenant exercises a legal right.` },
    ],
    body: (s, v) =>
      `In ${s}, the required eviction notice depends on why the landlord is evicting. **Nonpayment of rent**: ${v.nonpayment}. **Lease violation** (with chance to cure): ${v.leaseViolation}. **No-cause / end of tenancy**: ${v.noCause}. The landlord must serve the notice in writing — verbal notices don't count. If you don't move or fix the issue within the notice period, the landlord can file an unlawful detainer (eviction) lawsuit; only a court order — not the landlord — can physically remove you.`,
  },
  {
    slug: "minimum-wage",
    shortLabel: "Minimum Wage",
    category: "Employment",
    title: (s) => `${s} Minimum Wage — Standard, Tipped & Overtime Rules`,
    intro:
      "State minimum wage laws often exceed the federal $7.25 floor. This page shows the current standard minimum, tipped minimum, and overtime trigger for your state.",
    fields: [
      { key: "stateMin", label: "Standard minimum wage" },
      { key: "tippedMin", label: "Tipped minimum wage" },
      { key: "overtimeRule", label: "Overtime rule" },
    ],
    data: minimumWageData,
    sourceLabel: "U.S. Department of Labor — State Minimum Wage Laws",
    sourceUrl: () => "https://www.dol.gov/agencies/whd/state/minimum-wage/state",
    relatedToolIds: ["minimum-wage-lookup", "overtime-calculator", "paycheck-calculator", "salary-to-hourly-converter"],
    faqs: (s) => [
      { question: `What is the current minimum wage in ${s}?`, answer: `See the table — but verify on the state Department of Labor site, as rates change every January (and sometimes mid-year).` },
      { question: `Can my employer pay me less than the federal minimum wage?`, answer: `No. Employers must pay the higher of the federal ($7.25) or applicable state/city minimum wage. Some cities (Seattle, NYC, Denver) require even more.` },
      { question: `How does tipped minimum wage work?`, answer: `In most states, an employer can pay a lower "tipped minimum" if the worker's tips bring total hourly pay to at least the standard minimum. If tips fall short, the employer must make up the difference.` },
      { question: `What about overtime?`, answer: `Federal law requires 1.5x pay for hours over 40/week. Some states (CA, AK, CO, NV) also require daily overtime over 8 hours.` },
    ],
    body: (s, v) =>
      `As of the most recent update, the standard minimum wage in ${s} is **${v.stateMin}**. Tipped employees can be paid as little as **${v.tippedMin}** per hour as long as tips bring total hourly pay up to the standard minimum. **Overtime**: ${v.overtimeRule}. Local minimum wages (city or county) may be higher than the state rate — always check both.`,
  },
];

export const statuteTopicsBySlug: Record<string, StatuteTopic> = Object.fromEntries(
  statuteTopics.map((t) => [t.slug, t])
);

// Returns rendered values for a state/topic, with safe fallbacks for missing data.
export function getStatuteValues(topic: StatuteTopic, stateSlug: string): Record<string, string> {
  const found = topic.data[stateSlug];
  if (found) return found;
  const fallback: Record<string, string> = {};
  topic.fields.forEach((f) => (fallback[f.key] = "Varies — check official statute"));
  return fallback;
}

export const allStateSlugs = stateData.map((s) => s.slug);
export const allStateNames: Record<string, string> = Object.fromEntries(stateData.map((s) => [s.slug, s.name]));
