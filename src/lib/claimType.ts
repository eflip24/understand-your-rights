/**
 * Maps a page slug or tool id onto the claim-type vocabulary the lead
 * scorer uses, so a case-review form pre-selects the right claim without
 * every page having to hard-code it.
 */
const RULES: [RegExp, string][] = [
  [/mesothelioma|asbestos|camp-lejeune|roundup|mass-tort/, "mesothelioma"],
  [/truck|18-wheeler|semi/, "truck-accident"],
  [/motorcycle/, "motorcycle-accident"],
  [/nursing-home/, "nursing-home-abuse"],
  [/medical-malpractice|malpractice/, "medical-malpractice"],
  [/wrongful-death/, "wrongful-death"],
  [/dog-bite/, "dog-bite"],
  [/slip|premises/, "slip-and-fall"],
  [/workers-comp|work-injury|impairment|ppd/, "workers-comp"],
  [/wrongful-termination|severance|eeoc|discrimination/, "wrongful-termination"],
  [/employment|wage|overtime|garnishment|non-compete/, "employment"],
  [/insurance-claim-denied|insurance-denial|homeowners-insurance|diminished-value/, "insurance-denial"],
  [/long-term-disability|ltd-/, "long-term-disability"],
  [/ssdi|ssi|social-security/, "ssdi"],
  [/chapter-7|chapter-13|bankruptcy|debt/, "debt-bankruptcy"],
  [/alimony|custody|child-support|divorce/, "family"],
  [/car-accident|auto-accident|uber|lyft|rideshare|pain-and-suffering|personal-injury|settlement/, "car-accident"],
];

export function claimTypeFromSlug(slug: string | undefined | null): string {
  const s = (slug ?? "").toLowerCase();
  for (const [re, claim] of RULES) if (re.test(s)) return claim;
  return "other";
}
