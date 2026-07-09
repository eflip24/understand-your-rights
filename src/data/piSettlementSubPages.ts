export interface PiSubPageData {
  slug: string;
  vertical: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  cpcNote: string;
  keyFacts: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  timelineNote: string;
  lawyerLink: { label: string; path: string };
  /** Contextual signal block — how carriers value this specific claim type. */
  adjusterPlaybook: {
    category: string;
    /** 2–3 paragraph explanation with named carrier + software entities. */
    paragraphs: string[];
    /** In-market entity chips — carriers, coverage codes, statutes, medical terms. */
    entities: string[];
  };
}

export const piSubPages: Record<string, PiSubPageData> = {
  "car-accident": {
    slug: "car-accident",
    vertical: "Car Accident",
    h1: "Car Accident Settlement Calculator",
    metaTitle: "Car Accident Settlement Calculator — Estimate Your Claim | LegallySpoken",
    metaDescription: "Free car accident settlement calculator. Estimate medical bills, lost wages, pain and suffering, and net recovery after attorney fees. State-aware.",
    intro:
      "Insurance adjusters typically calculate car accident settlements by adding your economic damages (medical bills, lost wages, property damage) and applying a 1.5×–5× multiplier for pain and suffering, adjusted for comparative fault and the defendant's policy limits.",
    cpcNote: "Most auto settlements resolve in 6–14 months once medical treatment plateaus (Maximum Medical Improvement).",
    keyFacts: [
      { label: "Average settlement (soft tissue)", value: "$3,000 – $25,000" },
      { label: "Average settlement (with surgery)", value: "$75,000 – $300,000+" },
      { label: "Statute of limitations (most states)", value: "2 – 3 years" },
      { label: "Typical attorney contingency", value: "33% pre-suit / 40% litigation" },
    ],
    faqs: [
      {
        question: "What is the average car accident settlement amount?",
        answer:
          "Nationwide, soft-tissue car accident claims settle for $3,000–$25,000. Cases involving surgery, permanent injury, or clear liability regularly exceed $100,000. The single biggest driver is the defendant's insurance policy limit — many auto policies cap at $25,000–$100,000 per person.",
      },
      {
        question: "How long does a car accident settlement take?",
        answer:
          "Most auto settlements resolve within 6–14 months of the crash. Cases requiring surgery or where liability is disputed can take 18–36 months. Once your attorney sends a demand letter with your medical records, insurers typically respond within 30–60 days.",
      },
      {
        question: "Do I need a lawyer to settle my car accident?",
        answer:
          "For property-damage-only or minor soft-tissue claims, no. For anything involving surgery, permanent injury, disputed fault, or an insurer that lowballs you, studies (Insurance Research Council) show represented claimants recover 2–3× more, net of fees.",
      },
      {
        question: "Are car accident settlements taxable?",
        answer:
          "The compensatory portion (medical bills, pain and suffering related to physical injury, lost wages tied to the injury) is generally federal-tax-free under IRC § 104(a)(2). Punitive damages and interest are taxable.",
      },
    ],
    timelineNote: "Filing deadline in most states: 2 years from the date of the crash. Some states are shorter (LA=1yr, KY=1yr for injury). Miss the deadline and your claim is dead.",
    lawyerLink: { label: "Find a Car Accident Lawyer Near You", path: "/lawyer-near-me/car-accident" },
  },
  "motorcycle-accident": {
    slug: "motorcycle-accident",
    vertical: "Motorcycle Accident",
    h1: "Motorcycle Accident Settlement Calculator",
    metaTitle: "Motorcycle Accident Settlement Calculator — Estimate Your Payout",
    metaDescription: "Free motorcycle accident settlement calculator. Motorcycle claims settle for 3–5× auto averages due to injury severity. See your estimated recovery.",
    intro:
      "Motorcycle crashes produce far more severe injuries than car crashes — the average motorcycle claim settles for 3–5× a comparable auto claim. Insurance adjusters know this and often make aggressive lowball offers to unrepresented riders.",
    cpcNote: "Watch for helmet-law bias: in non-helmet states, insurers may argue comparative fault if you weren't wearing one, even where legal.",
    keyFacts: [
      { label: "Average settlement (moderate injury)", value: "$40,000 – $175,000" },
      { label: "Average settlement (with surgery/TBI)", value: "$200,000 – $1M+" },
      { label: "Fatal-crash rate vs cars", value: "28× higher (NHTSA)" },
      { label: "Typical contingency fee", value: "33% pre-suit / 40% litigation" },
    ],
    faqs: [
      {
        question: "What is the average motorcycle accident settlement?",
        answer:
          "Motorcycle settlements average $40,000–$175,000 for moderate injuries and frequently exceed $250,000 for cases involving surgery, TBI, or road rash requiring skin grafts. Wrongful-death motorcycle cases regularly settle for $500,000–$2M+.",
      },
      {
        question: "Does not wearing a helmet reduce my motorcycle settlement?",
        answer:
          "In states without universal helmet laws (about 28 states), insurers may argue comparative negligence for head injuries. In helmet-required states, riding without one is per-se negligence for head/neck injuries. It rarely bars recovery for orthopedic or road-rash injuries.",
      },
      {
        question: "Can I recover if I was partially at fault for the motorcycle crash?",
        answer:
          "In 46 states plus DC, yes — your recovery is reduced by your fault percentage. In pure contributory-negligence states (AL, MD, NC, VA, DC), any fault bars recovery entirely, though motorcycle cases often succeed on 'last clear chance' doctrine.",
      },
      {
        question: "Should I hire a motorcycle-specific lawyer?",
        answer:
          "Yes if possible. Motorcycle cases require an attorney who knows the physics of two-wheel crashes, common car-driver bias in juries, and expert accident reconstructionists. Most PI attorneys who handle these charge the same contingency (33–40%) as auto cases.",
      },
    ],
    timelineNote: "Same SOL as car accidents in most states (2–3 years), but preserve the bike itself and gear — they're key evidence.",
    lawyerLink: { label: "Find a Motorcycle Accident Lawyer", path: "/lawyer-near-me/personal-injury" },
  },
  "truck-accident": {
    slug: "truck-accident",
    vertical: "Truck Accident",
    h1: "Truck Accident Settlement Calculator",
    metaTitle: "Truck Accident Settlement Calculator — Semi & 18-Wheeler Claims",
    metaDescription: "Free commercial truck accident settlement calculator. Semi-truck cases break policy limits ($750k federal minimum). Estimate your recovery.",
    intro:
      "Commercial trucks carry federally-mandated minimum policies of $750,000 (freight) to $5 million (hazmat) — dramatically higher than typical auto policies. Truck settlements average 5–10× standard auto claims, but require FMCSR expertise and quick evidence preservation.",
    cpcNote: "Trucking companies must preserve ELD (Electronic Logging Device), driver hours, maintenance records, and dashcam. Send a spoliation letter within days.",
    keyFacts: [
      { label: "Federal minimum policy (freight)", value: "$750,000" },
      { label: "Federal minimum (hazmat)", value: "$5,000,000" },
      { label: "Average settlement (serious injury)", value: "$250,000 – $2M" },
      { label: "Wrongful-death truck cases", value: "$1M – $10M+" },
    ],
    faqs: [
      {
        question: "What is the average truck accident settlement?",
        answer:
          "Truck accident settlements average $250,000–$2 million for serious injuries. Because commercial trucks carry $750k–$5M minimum federal policies, these cases rarely hit policy limits like auto cases do — the injury value is what caps recovery.",
      },
      {
        question: "Who can be sued after a semi-truck crash?",
        answer:
          "Typically multiple defendants: the driver, the trucking company (employer liability + negligent hiring), the truck owner (if separate), the cargo loader (if shifting cargo caused the crash), and the maintenance provider. Each has separate insurance layers.",
      },
      {
        question: "What is a spoliation letter and why does it matter?",
        answer:
          "A formal written demand that the trucking company preserve ELD logs, driver hours, dashcam, maintenance records, and the truck itself. Federal rules only require carriers to retain some records for 6 months — send the letter within 30 days of the crash.",
      },
      {
        question: "How long do truck accident settlements take?",
        answer:
          "Typically 12–36 months. Complex multi-defendant cases with disputed liability take longer. Most experienced truck-accident firms will not settle before you reach Maximum Medical Improvement, especially with spinal injuries.",
      },
    ],
    timelineNote: "Federal FMCSR record retention is short — some records purge in 6 months. Preserve evidence immediately.",
    lawyerLink: { label: "Find a Truck Accident Lawyer", path: "/lawyer-near-me/truck-accident" },
  },
  "bodily-injury": {
    slug: "bodily-injury",
    vertical: "Bodily Injury",
    h1: "Bodily Injury Settlement Calculator",
    metaTitle: "Bodily Injury Settlement Calculator — Insurance Claim Estimator",
    metaDescription: "Estimate a bodily injury (BI) insurance settlement. Medical bills × multiplier + lost wages, capped by policy limits. Free calculator.",
    intro:
      "'Bodily injury' (BI) refers to the physical-injury portion of a liability insurance claim, separate from property damage. Every auto, homeowner, and general-liability policy has BI limits (e.g., '25/50/25' = $25k per person / $50k per crash / $25k property).",
    cpcNote: "If damages exceed the at-fault party's BI limit, look at your own UIM (Underinsured Motorist) coverage and the defendant's umbrella/excess policies.",
    keyFacts: [
      { label: "Typical auto BI per-person limit", value: "$25,000 – $250,000" },
      { label: "Typical homeowner BI limit", value: "$100,000 – $500,000" },
      { label: "Umbrella policy range", value: "$1M – $5M" },
      { label: "State minimum BI (varies)", value: "FL $10k • CA $15k • TX $30k" },
    ],
    faqs: [
      {
        question: "What is a bodily injury settlement?",
        answer:
          "The portion of an insurance liability settlement that compensates for physical injuries — medical bills, lost wages, pain and suffering. It's separate from 'property damage' (PD), which covers vehicle repairs or property losses.",
      },
      {
        question: "What happens if my bodily injury claim exceeds the policy limit?",
        answer:
          "You have four options: (1) accept the policy limit and release the defendant, (2) tap your own UIM coverage, (3) pursue the defendant's personal assets (rarely worth it), or (4) pursue an umbrella/excess policy if one exists. A bad-faith failure-to-settle claim may open the full policy.",
      },
      {
        question: "How is a bodily injury demand letter calculated?",
        answer:
          "Attorneys typically demand 3–5× documented medical bills + lost wages + a reasonable pain-and-suffering multiplier, deliberately anchoring high. Adjusters respond with 40–60% of the demand; the case usually settles at 60–80% of the demand after negotiation.",
      },
      {
        question: "Are bodily injury settlement funds taxable?",
        answer:
          "No, under IRC § 104(a)(2), compensation for physical injuries — including related emotional distress and lost wages tied to the injury — is federal-income-tax-free. Punitive damages, interest, and pure emotional-distress claims (not tied to physical injury) are taxable.",
      },
    ],
    timelineNote: "Most BI claims must be filed with the insurer within 30 days and lawsuits filed within the state SOL (typically 2 years for auto, 2–3 for general negligence).",
    lawyerLink: { label: "Find a Personal Injury Lawyer", path: "/lawyer-near-me/personal-injury" },
  },
};
