export interface MassTortCase {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  status: "Active" | "Settling" | "Pending Bellwether" | "Recently Settled";
  mdlNumber?: string;
  court?: string;
  intro: string;
  eligibility: string[];
  injuries: string[];
  settlementRanges: { tier: string; range: string; notes: string }[];
  deadlines: string;
  keyDates: { date: string; event: string }[];
  faqs: { question: string; answer: string }[];
  evidenceChecklist: string[];
  updatedAt: string;
}

export const massTortCases: Record<string, MassTortCase> = {
  "camp-lejeune": {
    slug: "camp-lejeune",
    name: "Camp Lejeune Water Contamination",
    h1: "Camp Lejeune Settlement Amounts & Eligibility (2026)",
    metaTitle: "Camp Lejeune Settlement Calculator & Payout Amounts | LegallySpoken",
    metaDescription: "Camp Lejeune Justice Act payouts by tier and injury. Eligibility, filing deadline (Aug 10, 2024 was the CLJA cutoff — see appeal windows), and settlement ranges.",
    status: "Settling",
    court: "E.D.N.C. (Camp Lejeune Justice Act of 2022)",
    intro:
      "The Camp Lejeune Justice Act of 2022 lets veterans, family members, and workers exposed to contaminated water at Camp Lejeune between August 1953 and December 1987 sue the U.S. government. The DOJ Elective Option pays $100,000–$550,000 based on injury tier and exposure length.",
    eligibility: [
      "Present at Camp Lejeune for 30+ cumulative days between Aug 1, 1953 and Dec 31, 1987",
      "Diagnosed with a qualifying injury (see below)",
      "Filed administrative claim with JAG within statutory window",
    ],
    injuries: [
      "Kidney cancer",
      "Liver cancer",
      "Non-Hodgkin's lymphoma",
      "Leukemia (adult)",
      "Bladder cancer",
      "Multiple myeloma",
      "Parkinson's disease",
      "Kidney disease / end-stage renal disease",
      "Systemic sclerosis / scleroderma",
    ],
    settlementRanges: [
      { tier: "Tier 1 (Kidney cancer, liver cancer, non-Hodgkin's lymphoma, leukemia, bladder cancer)", range: "$150,000 – $450,000", notes: "Base payout by exposure length (30–364 days, 1–5 yrs, 5+ yrs)" },
      { tier: "Tier 2 (Multiple myeloma, Parkinson's, kidney disease, systemic sclerosis)", range: "$100,000 – $400,000", notes: "Lower base, same exposure-tier structure" },
      { tier: "Wrongful death", range: "+$100,000", notes: "Added to injury payout" },
    ],
    deadlines:
      "Administrative claim deadline was August 10, 2024. If your claim was filed and denied (or not resolved in 6 months), you have 180 days to file suit in E.D.N.C.",
    keyDates: [
      { date: "Aug 10, 2022", event: "CLJA signed into law" },
      { date: "Sep 6, 2024", event: "DOJ Elective Option settlement framework launched" },
      { date: "Aug 10, 2024", event: "Administrative claim filing deadline (CLOSED)" },
      { date: "2025–2026", event: "Bellwether trials and mass settlement rollout" },
    ],
    faqs: [
      { question: "How much is a Camp Lejeune settlement worth?", answer: "Under the DOJ Elective Option, payouts range from $100,000 (Tier 2, shortest exposure) to $550,000 (Tier 1, 5+ years exposure). Wrongful death adds $100,000. Litigated cases with severe damages may recover more." },
      { question: "Is it too late to file a Camp Lejeune claim?", answer: "The administrative claim window closed August 10, 2024. If you filed timely, you can still pursue litigation. If you missed the deadline, consult an attorney — very limited exceptions may apply." },
      { question: "Are Camp Lejeune settlements taxable?", answer: "Compensatory damages for physical injury are federal-tax-free under IRC § 104(a)(2). Interest and any punitive components would be taxable." },
      { question: "Do I lose my VA benefits if I take a CLJA settlement?", answer: "No, but the government offsets VA disability compensation already paid for the same injury against the CLJA award." },
    ],
    evidenceChecklist: [
      "DD-214 or duty station records proving Camp Lejeune presence 1953–1987",
      "Housing/base access records for family members",
      "Medical records with diagnosis date and pathology",
      "VA claim records if previously filed",
      "Death certificate (wrongful death claims)",
    ],
    updatedAt: "2026-07",
  },
  "roundup": {
    slug: "roundup",
    name: "Roundup (Glyphosate) Cancer Lawsuit",
    h1: "Roundup Settlement Amounts & NHL Lawsuit Update (2026)",
    metaTitle: "Roundup Lawsuit Settlement Amounts & Eligibility | LegallySpoken",
    metaDescription: "Roundup non-Hodgkin's lymphoma settlements average $100K–$250K, with trial verdicts up to $2B. Bayer's $10.9B program details and eligibility.",
    status: "Settling",
    mdlNumber: "MDL 2741",
    court: "N.D. Cal.",
    intro:
      "Bayer's $10.9 billion Roundup settlement program compensates plaintiffs diagnosed with non-Hodgkin's lymphoma (NHL) after glyphosate exposure. Individual payouts typically range $5,000–$250,000+, with jury verdicts reaching $2 billion (later reduced).",
    eligibility: [
      "Regular Roundup exposure (residential, agricultural, or occupational) for 1+ year",
      "Diagnosed with non-Hodgkin's lymphoma or a subtype (DLBCL, follicular, B-cell, T-cell, CLL)",
      "Diagnosis typically within statute of limitations from date of discovery",
    ],
    injuries: [
      "Non-Hodgkin's lymphoma (all subtypes)",
      "Diffuse large B-cell lymphoma (DLBCL)",
      "Follicular lymphoma",
      "Chronic lymphocytic leukemia (CLL)",
      "Multiple myeloma (contested)",
    ],
    settlementRanges: [
      { tier: "Minimal exposure / early-stage NHL", range: "$5,000 – $50,000", notes: "Point-based Bayer matrix" },
      { tier: "Moderate exposure / treated NHL", range: "$100,000 – $250,000", notes: "Most Tier 2 cases" },
      { tier: "Heavy exposure / severe NHL / trial-track", range: "$250,000 – $2M+", notes: "Bellwether verdicts (reduced on appeal)" },
    ],
    deadlines: "Statute of limitations is 1–6 years from diagnosis depending on state. The discovery rule extends this in most jurisdictions.",
    keyDates: [
      { date: "Aug 2018", event: "Johnson v. Monsanto — $289M verdict (reduced)" },
      { date: "Jun 2020", event: "Bayer announces $10.9B settlement" },
      { date: "2023–2026", event: "Ongoing trial track for opt-outs and new filings" },
    ],
    faqs: [
      { question: "What is the average Roundup settlement?", answer: "Bayer's matrix averages $160,000, but individual payouts range from $5,000 (minimal exposure, brief treatment) to $250,000+ for severe cases. Trial verdicts have reached $2 billion but were reduced on appeal." },
      { question: "Do I qualify for a Roundup lawsuit if I used it at home?", answer: "Yes. Residential users (homeowners, gardeners) with regular exposure and an NHL diagnosis qualify. Landscapers, farmers, and groundskeepers typically receive higher payouts due to heavier exposure." },
      { question: "Is Roundup still being sold?", answer: "Yes, but Bayer removed glyphosate from U.S. residential Roundup in 2023. Agricultural glyphosate products remain on the market." },
    ],
    evidenceChecklist: [
      "Proof of Roundup purchase or occupational use (receipts, employer records, application logs)",
      "Medical records showing NHL diagnosis and subtype",
      "Pathology reports",
      "Treatment records (chemo, radiation, stem-cell transplant)",
      "Timeline of exposure years",
    ],
    updatedAt: "2026-07",
  },
  "tylenol-autism": {
    slug: "tylenol-autism",
    name: "Tylenol Autism / ADHD Lawsuit",
    h1: "Tylenol Autism Lawsuit Settlement Update (2026)",
    metaTitle: "Tylenol Autism Lawsuit Settlement Amounts & Status | LegallySpoken",
    metaDescription: "Tylenol (acetaminophen) autism/ADHD MDL status, projected settlement ranges, eligibility, and Daubert ruling impact. Free case estimate.",
    status: "Pending Bellwether",
    mdlNumber: "MDL 3043",
    court: "S.D.N.Y.",
    intro:
      "Plaintiffs allege that prenatal acetaminophen (Tylenol) use caused autism spectrum disorder or ADHD in their children. In December 2023, Judge Denise Cote excluded plaintiffs' key causation experts under Daubert, dismissing most claims. Appeal to the Second Circuit is pending; state-court cases continue.",
    eligibility: [
      "Mother used branded Tylenol or store-brand acetaminophen during pregnancy (typically 2nd or 3rd trimester)",
      "Child diagnosed with ASD or ADHD",
      "Retailer defendants (Walmart, CVS, Walgreens, etc.) remain in state courts even after MDL ruling",
    ],
    injuries: [
      "Autism spectrum disorder (ASD)",
      "Attention-deficit/hyperactivity disorder (ADHD)",
    ],
    settlementRanges: [
      { tier: "Pre-Daubert projections (ADHD)", range: "$50,000 – $150,000", notes: "Historical MDL analyst estimates — subject to appeal outcome" },
      { tier: "Pre-Daubert projections (severe ASD)", range: "$300,000 – $600,000", notes: "Requires proven causation, currently blocked in MDL" },
      { tier: "State-court retailer claims", range: "Uncertain", notes: "Active in CA, IL — no matrix yet" },
    ],
    deadlines: "Statute of limitations varies (typically 2–3 years from diagnosis). File a claim to preserve rights pending appeal.",
    keyDates: [
      { date: "Oct 2022", event: "MDL 3043 created" },
      { date: "Dec 2023", event: "Daubert ruling excludes plaintiffs' causation experts" },
      { date: "2024–2026", event: "Second Circuit appeal; state-court cases proceeding" },
    ],
    faqs: [
      { question: "Is there a Tylenol autism settlement yet?", answer: "No. The MDL was largely dismissed at the Daubert stage in December 2023. Plaintiffs' appeal to the Second Circuit is pending. State-court cases against retailers remain active." },
      { question: "Should I still file a Tylenol autism claim?", answer: "If the statute of limitations is close to running in your state, consult an attorney about filing to preserve rights — the appeal could revive the MDL. Many firms are pausing new intake." },
      { question: "What triggered the lawsuit?", answer: "A 2018 Johns Hopkins/NIH study and later meta-analyses reported an association between prenatal acetaminophen exposure and neurodevelopmental disorders. FDA and Kenvue (J&J spinoff) dispute the causal link." },
    ],
    evidenceChecklist: [
      "Proof of prenatal acetaminophen use (pharmacy records, receipts, prenatal-care notes)",
      "Child's ASD or ADHD diagnosis records (DSM-5)",
      "Mother's medical records from pregnancy",
      "Timeline of use by trimester",
    ],
    updatedAt: "2026-07",
  },
  "hair-relaxer": {
    slug: "hair-relaxer",
    name: "Hair Relaxer Cancer Lawsuit",
    h1: "Hair Relaxer Lawsuit Settlement Amounts (2026)",
    metaTitle: "Hair Relaxer Lawsuit Settlement Amounts & Eligibility | LegallySpoken",
    metaDescription: "Chemical hair relaxer uterine and ovarian cancer MDL status. Projected settlement ranges $100K–$1.5M, eligibility, and evidence needed.",
    status: "Active",
    mdlNumber: "MDL 3060",
    court: "N.D. Ill.",
    intro:
      "Plaintiffs allege chemical hair relaxers (L'Oréal Dark & Lovely, SoftSheen-Carson Optimum, Strength of Nature Motions, Namaste's Organic Root Stimulator, Revlon Realistic) caused uterine, ovarian, endometrial, and breast cancers. NIH's 2022 Sister Study linked relaxer use to a 2.5× uterine cancer risk.",
    eligibility: [
      "Regular hair relaxer use for 1+ year",
      "Diagnosed with uterine, ovarian, endometrial, or breast cancer",
      "Diagnosis typically within statute of limitations from date of discovery",
    ],
    injuries: [
      "Uterine cancer",
      "Ovarian cancer",
      "Endometrial cancer",
      "Uterine fibroids (contested Tier 3)",
      "Breast cancer (evolving science)",
    ],
    settlementRanges: [
      { tier: "Tier 1 — Uterine or ovarian cancer, aggressive treatment, hysterectomy", range: "$300,000 – $1,500,000", notes: "Analyst projections; no MDL settlement yet" },
      { tier: "Tier 2 — Endometrial cancer, surgery only", range: "$100,000 – $300,000", notes: "Projections" },
      { tier: "Tier 3 — Fibroids requiring hysterectomy", range: "$20,000 – $75,000", notes: "Contested tier" },
    ],
    deadlines: "Statute of limitations 2–6 years from diagnosis. Discovery rule generally applies.",
    keyDates: [
      { date: "Oct 2022", event: "NIH Sister Study published" },
      { date: "Feb 2023", event: "MDL 3060 consolidated in N.D. Ill." },
      { date: "2026", event: "Bellwether selection ongoing" },
    ],
    faqs: [
      { question: "How much is a hair relaxer lawsuit worth?", answer: "No global settlement exists yet. Analyst projections for Tier 1 uterine or ovarian cancer cases with hysterectomy range from $300,000 to $1.5M; less severe endometrial cases $100K–$300K." },
      { question: "Which hair relaxer brands are in the lawsuit?", answer: "Primary defendants include L'Oréal, SoftSheen-Carson, Strength of Nature, Namaste Laboratories, Revlon, and Godrej. Brands include Dark & Lovely, Motions, Optimum, ORS Olive Oil, and Just for Me." },
      { question: "Do I need to have used relaxers for years to qualify?", answer: "Most attorneys screen for at least 12 months of regular use (4+ applications per year), consistent with the NIH study exposure threshold." },
    ],
    evidenceChecklist: [
      "Brand names and years of relaxer use (self-report is standard)",
      "Salon records if professionally applied",
      "Cancer diagnosis records and pathology",
      "Surgery records (hysterectomy, oophorectomy)",
      "Family cancer history (helps rule out hereditary causes)",
    ],
    updatedAt: "2026-07",
  },
  "ozempic": {
    slug: "ozempic",
    name: "Ozempic / GLP-1 Gastroparesis Lawsuit",
    h1: "Ozempic Lawsuit Settlement Amounts & Status (2026)",
    metaTitle: "Ozempic Lawsuit Update — Gastroparesis Settlements | LegallySpoken",
    metaDescription: "Ozempic, Wegovy, Mounjaro gastroparesis and ileus lawsuit MDL 3094 status, eligibility, and projected settlement ranges.",
    status: "Active",
    mdlNumber: "MDL 3094",
    court: "E.D. Pa.",
    intro:
      "Plaintiffs allege Novo Nordisk (Ozempic, Wegovy, Rybelsus) and Eli Lilly (Mounjaro, Trulicity) failed to warn about severe gastroparesis, intestinal obstruction, and ileus risks. MDL 3094 was created in February 2024 and is in early discovery.",
    eligibility: [
      "Took Ozempic, Wegovy, Rybelsus, Mounjaro, Trulicity, or Saxenda",
      "Diagnosed with gastroparesis, cyclic vomiting, ileus, or intestinal obstruction",
      "Onset during or after GLP-1 use",
    ],
    injuries: [
      "Gastroparesis (stomach paralysis)",
      "Intestinal obstruction / ileus",
      "Cyclic vomiting syndrome",
      "Severe malnutrition requiring hospitalization",
      "Gallbladder disease (contested)",
    ],
    settlementRanges: [
      { tier: "Severe gastroparesis with feeding tube / repeat hospitalization", range: "$400,000 – $700,000", notes: "Very early analyst projections" },
      { tier: "Moderate gastroparesis, hospitalized 1–2×", range: "$100,000 – $400,000", notes: "Projections" },
      { tier: "Mild persistent symptoms", range: "$25,000 – $100,000", notes: "Projections" },
    ],
    deadlines: "Statute of limitations 2–4 years from diagnosis in most states. File early — MDL is still consolidating.",
    keyDates: [
      { date: "Feb 2024", event: "MDL 3094 created" },
      { date: "Sep 2024", event: "FDA updated Ozempic label to include ileus warning" },
      { date: "2026", event: "Bellwether case selection expected" },
    ],
    faqs: [
      { question: "Is there an Ozempic settlement yet?", answer: "No. MDL 3094 is in early discovery. Any global settlement is likely 2027 or later. Individual cases can still be filed to preserve rights." },
      { question: "Which GLP-1 drugs are covered?", answer: "Ozempic, Wegovy, Rybelsus (semaglutide, Novo Nordisk) and Mounjaro, Trulicity, Zepbound (tirzepatide/dulaglutide, Eli Lilly), plus Saxenda (liraglutide)." },
      { question: "Do I qualify if I only had mild nausea?", answer: "Probably not. Attorneys typically screen for confirmed gastroparesis (gastric-emptying study), ileus, or hospitalization — not routine nausea, which is listed on the label." },
    ],
    evidenceChecklist: [
      "Prescription records showing GLP-1 use and dates",
      "Gastric-emptying study or endoscopy confirming diagnosis",
      "Hospital admission records",
      "ER visit records for vomiting/obstruction",
      "Weight-loss timeline (helps establish causation window)",
    ],
    updatedAt: "2026-07",
  },
  "paraquat": {
    slug: "paraquat",
    name: "Paraquat Parkinson's Disease Lawsuit",
    h1: "Paraquat Parkinson's Settlement Amounts (2026)",
    metaTitle: "Paraquat Parkinson's Lawsuit Settlement Amounts | LegallySpoken",
    metaDescription: "Paraquat herbicide Parkinson's disease MDL 3004 status. Syngenta/Chevron settlement talks, eligibility, and projected payouts $100K–$2M.",
    status: "Active",
    mdlNumber: "MDL 3004",
    court: "S.D. Ill.",
    intro:
      "Farmers, licensed applicators, and agricultural workers exposed to paraquat dichloride (Gramoxone) allege the herbicide caused their Parkinson's disease. Syngenta and Chevron are lead defendants. A tentative $187.5M settlement covering ~5,800 cases was announced in 2024; new filings continue.",
    eligibility: [
      "Occupational or bystander exposure to paraquat (Gramoxone, Firestorm, Helmquat, Parazone)",
      "Diagnosed with Parkinson's disease (typically 5+ years post-exposure)",
      "Licensed applicator status strengthens case (registration records)",
    ],
    injuries: [
      "Parkinson's disease",
      "Parkinsonism (contested)",
    ],
    settlementRanges: [
      { tier: "Licensed applicator, heavy exposure, advanced PD", range: "$500,000 – $2,000,000", notes: "Analyst projections; 2024 partial settlement averaged ~$32K/case for early tier" },
      { tier: "Farm worker, moderate exposure, moderate PD", range: "$150,000 – $500,000", notes: "Projections" },
      { tier: "Bystander exposure, early PD", range: "$50,000 – $150,000", notes: "Projections" },
    ],
    deadlines: "Statute of limitations 2–6 years from PD diagnosis. Discovery rule generally applies.",
    keyDates: [
      { date: "Jun 2021", event: "MDL 3004 consolidated" },
      { date: "Oct 2024", event: "Syngenta/Chevron announce $187.5M partial settlement" },
      { date: "2025–2026", event: "Continued bellwether trials for opt-outs" },
    ],
    faqs: [
      { question: "How much are Paraquat settlements paying?", answer: "The 2024 partial settlement averaged ~$32,000 per case for the initial group. Later bellwether verdicts and individual settlements for heavy-exposure applicators with advanced PD are projected at $500K–$2M." },
      { question: "Who qualifies for a Paraquat lawsuit?", answer: "Licensed applicators, farm workers, and agricultural bystanders with documented paraquat exposure and a Parkinson's diagnosis (typically 5+ years post-exposure) qualify." },
      { question: "Is Paraquat banned in the U.S.?", answer: "No, but it is banned in 60+ countries. In the U.S., paraquat is restricted to certified applicators only. EPA is reviewing its registration." },
    ],
    evidenceChecklist: [
      "Pesticide applicator license and renewal records",
      "Employer records showing paraquat handling",
      "Purchase records (Gramoxone, Firestorm)",
      "Parkinson's diagnosis and neurologist notes",
      "DAT scan or specialist consult confirming PD",
    ],
    updatedAt: "2026-07",
  },
  "3m-earplugs": {
    slug: "3m-earplugs",
    name: "3M Combat Arms Earplugs (CAEv2)",
    h1: "3M Earplug Settlement Payouts by Rank & Injury (2026)",
    metaTitle: "3M Combat Arms Earplug Settlement Amounts | LegallySpoken",
    metaDescription: "3M CAEv2 earplug $6B settlement details. Payout tiers, eligibility, and how much veterans are receiving for tinnitus and hearing loss.",
    status: "Recently Settled",
    mdlNumber: "MDL 2885",
    court: "N.D. Fla.",
    intro:
      "3M's $6.01 billion Combat Arms Earplug (CAEv2) settlement resolved ~260,000 veteran claims for tinnitus and hearing loss caused by defective dual-ended earplugs issued to service members between 2003 and 2015. Most payouts are complete; some late-filed claims and appeals remain.",
    eligibility: [
      "Served in U.S. military between 2003 and 2015",
      "Issued 3M Combat Arms Earplugs (CAEv2)",
      "Diagnosed with tinnitus and/or hearing loss",
      "Filed claim before the settlement cutoff (most opt-in windows closed 2023)",
    ],
    injuries: [
      "Tinnitus",
      "Bilateral or unilateral sensorineural hearing loss",
      "Migraines associated with hearing damage (contested)",
    ],
    settlementRanges: [
      { tier: "Tinnitus only, no hearing loss", range: "$5,000 – $30,000", notes: "Base tier under $6B matrix" },
      { tier: "Mild-moderate hearing loss + tinnitus", range: "$30,000 – $100,000", notes: "" },
      { tier: "Severe hearing loss / documented in-service audiogram decline", range: "$100,000 – $250,000+", notes: "Bellwether verdicts reached $77M reduced to matrix levels" },
    ],
    deadlines: "Global settlement filing deadlines have passed for most claimants. Late claims are highly restricted — consult an attorney immediately if you have not filed.",
    keyDates: [
      { date: "2018", event: "3M settled DOJ False Claims Act suit for $9.1M" },
      { date: "2019", event: "MDL 2885 consolidated" },
      { date: "Aug 2023", event: "$6.01B global settlement announced" },
      { date: "2024–2025", event: "Payouts distributed" },
    ],
    faqs: [
      { question: "How much are 3M earplug payouts?", answer: "Payouts under the $6.01B settlement matrix range from $5,000 for tinnitus-only to $250,000+ for severe bilateral hearing loss with clear in-service audiogram decline. Average payout is approximately $24,000 due to the large tinnitus-only cohort." },
      { question: "Can I still file a 3M earplug claim?", answer: "The primary filing windows closed in 2023. Late filings are highly restricted. Contact an MDL attorney immediately if you have a documented in-service diagnosis but did not file." },
      { question: "Does the settlement affect my VA benefits?", answer: "The settlement does not offset VA disability compensation for hearing loss or tinnitus. You keep both." },
    ],
    evidenceChecklist: [
      "DD-214 with 2003–2015 service dates",
      "MOS/duty station records showing weapons or artillery exposure",
      "In-service audiograms (STR — Service Treatment Records)",
      "VA disability rating for hearing loss or tinnitus",
      "Current audiologist evaluation",
    ],
    updatedAt: "2026-07",
  },
  "talcum-powder": {
    slug: "talcum-powder",
    name: "Talcum Powder Ovarian Cancer Lawsuit",
    h1: "Talcum Powder Settlement Amounts & J&J Bankruptcy Update (2026)",
    metaTitle: "Talcum Powder Lawsuit Settlement Amounts | LegallySpoken",
    metaDescription: "Johnson & Johnson talcum powder ovarian cancer and mesothelioma settlements. $8.9B proposed plan, eligibility, and payout tiers.",
    status: "Settling",
    mdlNumber: "MDL 2738",
    court: "D.N.J.",
    intro:
      "Johnson & Johnson faces 60,000+ claims that talc-based Johnson's Baby Powder and Shower to Shower caused ovarian cancer and mesothelioma from asbestos contamination. J&J's proposed $8.9B settlement via subsidiary LTL Management has been rejected twice by bankruptcy courts; a third attempt is pending.",
    eligibility: [
      "Regular perineal talc use (Johnson's Baby Powder, Shower to Shower) for 4+ years",
      "Diagnosed with ovarian cancer or mesothelioma",
      "Occupational asbestos exposure via talc (mesothelioma cases)",
    ],
    injuries: [
      "Ovarian cancer",
      "Fallopian tube cancer",
      "Primary peritoneal cancer",
      "Mesothelioma (asbestos-in-talc cases)",
    ],
    settlementRanges: [
      { tier: "Mesothelioma", range: "$1,000,000 – $10,000,000+", notes: "Jury verdicts have exceeded $100M individually" },
      { tier: "Ovarian cancer — advanced stage, hysterectomy", range: "$100,000 – $500,000", notes: "Under proposed $8.9B plan" },
      { tier: "Ovarian cancer — early stage, treated", range: "$20,000 – $100,000", notes: "Under proposed plan" },
    ],
    deadlines: "Statute of limitations 2–6 years from diagnosis. Discovery rule generally applies. Bankruptcy proceedings may create bar dates — monitor closely.",
    keyDates: [
      { date: "May 2020", event: "J&J discontinues U.S. sale of talc baby powder" },
      { date: "Oct 2021", event: "J&J files 'Texas Two-Step' bankruptcy via LTL Management" },
      { date: "2023", event: "Third Circuit dismisses first LTL bankruptcy" },
      { date: "2024", event: "Second LTL bankruptcy dismissed" },
      { date: "2025–2026", event: "Third $8.9B plan and continued individual trials" },
    ],
    faqs: [
      { question: "How much is a talcum powder lawsuit worth?", answer: "Mesothelioma verdicts routinely exceed $10M individually. Ovarian cancer settlement offers under J&J's proposed $8.9B plan average ~$150K per claimant, but individual trial verdicts have reached $2.1B (later reduced)." },
      { question: "Is Johnson's Baby Powder still sold?", answer: "J&J stopped selling talc-based baby powder in the U.S. in 2020 and globally in 2023. It now sells cornstarch-based baby powder." },
      { question: "Do I qualify without proving asbestos?", answer: "For ovarian cancer, no — the theory is talc particles cause chronic inflammation. For mesothelioma, asbestos-in-talc exposure must be established (talc geology and product testing)." },
    ],
    evidenceChecklist: [
      "History of talc product use (self-report, receipts if available)",
      "Ovarian cancer or mesothelioma diagnosis and pathology",
      "Surgery records",
      "BRCA test results (helps rule out hereditary cause for ovarian cases)",
      "Occupational history (mesothelioma cases)",
    ],
    updatedAt: "2026-07",
  },
};

export const massTortSlugs = Object.keys(massTortCases);
