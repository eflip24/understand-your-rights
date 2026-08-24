/**
 * Pain-and-suffering (non-economic damages) rules by state.
 *
 * Two things drive what a pain-and-suffering figure is actually worth:
 *  1. whether the state caps non-economic damages, and in which case type, and
 *  2. how the state's comparative-fault rule reduces or bars the award.
 *
 * The comparative-fault rule already lives in `stateData`. This table adds the
 * cap layer. For the large majority of states there is NO cap on ordinary
 * personal-injury (auto, premises, product) non-economic damages — caps are
 * concentrated in medical-malpractice and claims against government bodies.
 * Where a state cap has been struck down by its supreme court we say so,
 * because that is exactly the detail insurers rely on claimants not knowing.
 *
 * Figures are indicative and several states index their cap to inflation
 * annually. Always confirm the current number before relying on it.
 */

export interface StatePainSufferingRule {
  /** Cap on non-economic damages in ordinary (non-medical) injury claims. */
  generalCap: string;
  /** Cap that applies in medical-malpractice claims. */
  medMalCap: string;
  /** One-line practical note for a claimant negotiating in this state. */
  note: string;
}

const NO_GENERAL_CAP = "No cap";

const r = (
  generalCap: string,
  medMalCap: string,
  note: string,
): StatePainSufferingRule => ({ generalCap, medMalCap, note });

export const painSufferingRules: Record<string, StatePainSufferingRule> = {
  AL: r(NO_GENERAL_CAP, "No cap (cap struck down in Moore v. Mobile Infirmary)", "Contributory negligence is the real risk here: 1% of fault can bar recovery entirely, so the fault fight matters more than the cap."),
  AK: r("$400,000 or $8,000 × life expectancy (higher for severe permanent impairment)", "$250,000 / $400,000 severe", "Alaska is one of the few states that caps non-economic damages in ordinary injury cases, not just malpractice."),
  AZ: r(NO_GENERAL_CAP, "No cap (barred by the Arizona Constitution)", "The Arizona Constitution forbids damage caps, which makes pain-and-suffering the largest part of most serious claims."),
  AR: r(NO_GENERAL_CAP, "No cap", "Arkansas voters and courts have repeatedly rejected caps; multiplier arguments run the case."),
  CA: r(NO_GENERAL_CAP, "$430,000 (non-death) / $600,000 (death), rising annually to $750,000 / $1M by 2033", "MICRA was amended in 2023 — the old $250,000 cap no longer applies and rises every January 1."),
  CO: r("~$729,790 (indexed, general non-economic)", "$300,000 within a $1M total cap", "Colorado indexes its caps for inflation, so quote the year of the injury, not today's figure."),
  CT: r(NO_GENERAL_CAP, "No cap", "No caps at all; comparative fault above 51% is the only bar."),
  DE: r(NO_GENERAL_CAP, "No cap", "No damage caps, but medical claims need an affidavit of merit at filing."),
  DC: r(NO_GENERAL_CAP, "No cap", "Contributory negligence still applies in DC — any fault of your own can defeat the claim."),
  FL: r(NO_GENERAL_CAP, "No cap (struck down in Estate of McCall and North Broward Hospital)", "Florida's PIP threshold matters more than any cap: you must clear the serious-injury threshold to claim pain and suffering at all."),
  GA: r(NO_GENERAL_CAP, "No cap (struck down in Nestlehutt, 2010)", "Georgia's cap is unconstitutional, so juries value pain and suffering without limit."),
  HI: r("$375,000 (pain and suffering)", "$375,000", "Hawaii caps pain and suffering in most tort claims, with exceptions for certain intentional torts."),
  ID: r("~$400,000+ (indexed annually)", "Same indexed cap", "Idaho's cap is adjusted each July by average wage growth; the cap does not apply to wilful or reckless conduct."),
  IL: r(NO_GENERAL_CAP, "No cap (struck down in Lebron, 2010)", "No caps, and Illinois juries in Cook County return some of the highest non-economic awards in the country."),
  IN: r(NO_GENERAL_CAP, "$1.8M total per act of malpractice", "Indiana caps the whole malpractice recovery, not just pain and suffering, with the Patient's Compensation Fund paying above $500,000."),
  IA: r(NO_GENERAL_CAP, "$2M (hospitals) / $1M (clinics) since 2023", "Iowa's 2023 reform created hard malpractice caps but left ordinary injury claims uncapped."),
  KS: r("$350,000", "$350,000", "Kansas caps non-economic damages in all personal-injury actions — one of the strictest general caps in the country."),
  KY: r(NO_GENERAL_CAP, "No cap (Kentucky Constitution §54 bars caps)", "Kentucky's constitution prohibits limiting damages, but its one-year statute of limitations is brutally short."),
  LA: r(NO_GENERAL_CAP, "$500,000 total (excluding future medical)", "Louisiana's malpractice cap covers all damages combined and has not been raised since 1975."),
  ME: r(NO_GENERAL_CAP, "$500,000 (wrongful death non-economic)", "Ordinary injury claims are uncapped; wrongful death has a statutory limit."),
  MD: r("~$935,000 (indexed +$15,000 each year)", "~$935,000 (separate schedule)", "Maryland's cap rises every year and contributory negligence still applies — both must be checked."),
  MA: r(NO_GENERAL_CAP, "$500,000 unless substantial or permanent impairment", "The malpractice cap falls away when the injury is permanent, so document permanency early."),
  MI: r(NO_GENERAL_CAP, "~$597,000 / ~$1.06M (indexed)", "No-fault reform in 2019 changed what medical costs are recoverable; pain and suffering requires a serious impairment of body function."),
  MN: r(NO_GENERAL_CAP, "No cap", "Minnesota has no caps; the no-fault tort threshold is the gate for auto claims."),
  MS: r("$1M", "$500,000", "Mississippi caps both general and malpractice non-economic damages."),
  MO: r(NO_GENERAL_CAP, "~$450,000 / ~$840,000 catastrophic (indexed)", "Only malpractice is capped; the cap is inflation-adjusted every year."),
  MT: r(NO_GENERAL_CAP, "$250,000", "Montana caps malpractice non-economic damages only."),
  NE: r(NO_GENERAL_CAP, "$2.25M total", "Nebraska's cap is a total recovery cap, and the Excess Liability Fund pays above the provider's share."),
  NV: r(NO_GENERAL_CAP, "$430,000 in 2024, rising $80,000 a year to $750,000", "Nevada's cap was rewritten by AB 404; the number depends on the year the claim accrued."),
  NH: r(NO_GENERAL_CAP, "No cap (struck down in Carson v. Maurer)", "No caps; comparative fault above 50% bars recovery."),
  NJ: r(NO_GENERAL_CAP, "No cap", "New Jersey's verbal-threshold election on your auto policy decides whether you can claim pain and suffering at all — check the declarations page."),
  NM: r(NO_GENERAL_CAP, "$750,000+ (independent providers, indexed)", "New Mexico's 2021 reform staggered the cap by provider type."),
  NY: r(NO_GENERAL_CAP, "No cap", "No caps, but New York's serious-injury threshold under Insurance Law §5102(d) must be met in auto cases."),
  NC: r(NO_GENERAL_CAP, "~$656,000 (indexed)", "Contributory negligence applies — being 1% at fault can end the claim."),
  ND: r(NO_GENERAL_CAP, "$500,000", "Only malpractice is capped."),
  OH: r("$250,000 or 3× economic, max $350,000 / $500,000 per occurrence", "Same structure", "Ohio caps non-economic damages in most tort claims, but the cap disappears for permanent and substantial physical deformity or loss of a limb or organ."),
  OK: r(NO_GENERAL_CAP, "No cap (struck down in Beason v. I.E. Miller, 2019)", "Oklahoma's cap is void; juries value pain and suffering without limit."),
  OR: r(NO_GENERAL_CAP, "No cap (Busch v. McInnis, 2020)", "Oregon's cap no longer applies to personal-injury claims."),
  PA: r(NO_GENERAL_CAP, "No cap (Pennsylvania Constitution bars caps)", "No caps; punitive damages in malpractice are limited to 200% of compensatory."),
  RI: r(NO_GENERAL_CAP, "No cap", "Pure comparative fault plus no caps makes Rhode Island claimant-friendly on value."),
  SC: r(NO_GENERAL_CAP, "~$600,000 per provider (indexed)", "Malpractice caps rise with the CPI each year."),
  SD: r(NO_GENERAL_CAP, "$500,000", "Only malpractice is capped."),
  TN: r("$750,000 / $1M catastrophic", "$750,000 / $1M catastrophic", "Tennessee's cap applies to all civil actions and the one-year limitation period is among the shortest in the US."),
  TX: r(NO_GENERAL_CAP, "$250,000 per provider, $500,000 total", "Texas's malpractice caps are hard and unindexed; ordinary injury claims are uncapped."),
  UT: r(NO_GENERAL_CAP, "~$480,000 (indexed)", "Utah's malpractice cap is adjusted annually."),
  VT: r(NO_GENERAL_CAP, "No cap", "No caps in any tort category."),
  VA: r(NO_GENERAL_CAP, "$2.7M+ total, rising $50,000 a year", "Virginia caps total malpractice recovery and applies contributory negligence."),
  WA: r(NO_GENERAL_CAP, "No cap (struck down in Sofie v. Fibreboard)", "No caps; pure comparative fault preserves partial recovery at any fault level."),
  WV: r(NO_GENERAL_CAP, "$250,000 / $500,000 catastrophic (indexed)", "Only malpractice is capped."),
  WI: r(NO_GENERAL_CAP, "$750,000", "The Injured Patients and Families Compensation Fund pays economic damages above the provider's limits."),
  WY: r(NO_GENERAL_CAP, "No cap (Wyoming Constitution bars caps)", "No caps of any kind."),
};

export function getPainSufferingRule(abbr: string): StatePainSufferingRule {
  return (
    painSufferingRules[abbr] ??
    r(NO_GENERAL_CAP, "Check state statute", "Confirm the current cap and comparative-fault rule before relying on any figure.")
  );
}

/** States that cap non-economic damages in ordinary (non-malpractice) injury claims. */
export const generalCapStates = Object.entries(painSufferingRules)
  .filter(([, v]) => v.generalCap !== NO_GENERAL_CAP)
  .map(([k]) => k);
