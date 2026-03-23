import type { PillarData } from "./autoAccidentLaw";

export const criminalLaw: PillarData = {
  basePath: "/criminal-law",
  category: "Criminal Law",
  pillarTitle: "Criminal Law Guide — Understand the Legal Process, Your Rights & Defenses",
  pillarMetaTitle: "Criminal Law — Free Legal Guide | LegallySpoken",
  pillarMetaDescription: "Learn about criminal law in plain English. Covers DUI, felonies, misdemeanors, arrests, bail, plea bargaining, and expungement. Free state-specific info.",
  pillarIntro: "Criminal law defines offenses against the state and establishes the legal process for those accused of crimes. Whether you're facing a DUI, understanding the difference between felony and misdemeanor charges, or trying to clear your record, this guide explains the process step by step.",
  clusters: [
    {
      slug: "dui-consequences",
      title: "What Happens If You Get a DUI?",
      metaTitle: "DUI Consequences — What Happens After a DUI Arrest? | LegallySpoken",
      metaDescription: "Learn what happens after a DUI arrest including penalties, license suspension, court process, and long-term consequences by state.",
      content: `<h2>DUI Consequences Explained</h2>
<p>Driving under the influence (DUI/DWI) is one of the most commonly charged criminal offenses in the US. Consequences vary significantly by state but typically include fines, license suspension, and possible jail time.</p>
<h3>First Offense DUI</h3>
<p>Most first-offense DUIs are charged as misdemeanors. Typical penalties include: fines ($500-$2,000), license suspension (90 days to 1 year), probation (6-12 months), alcohol education classes, community service, and possible jail time (up to 6 months in some states).</p>
<h3>BAC Limits</h3>
<p>The legal limit is 0.08% BAC in all 50 states for drivers 21+. Commercial drivers: 0.04%. Under 21: zero tolerance (0.00-0.02% depending on state). Enhanced penalties often apply at 0.15% or higher.</p>
<h3>Long-Term Consequences</h3>
<p>A DUI stays on your record for 5-10 years (or permanently in some states). It can affect employment, professional licenses, car insurance rates, and even immigration status.</p>`,
      faqs: [
        { question: "Can I refuse a breathalyzer test?", answer: "You can, but all states have 'implied consent' laws. Refusing typically results in automatic license suspension (often longer than a DUI conviction) and can be used against you in court." },
        { question: "Can a DUI be expunged?", answer: "In some states, yes — after completing all sentence requirements and waiting a specified period. However, many states (like California) don't allow DUI expungement, only dismissal of the conviction." },
      ],
      relatedToolIds: ["statute-of-limitations-lookup", "settlement-estimator", "attorney-fee-calculator"],
      relatedTermSlugs: ["negligence", "damages", "liability"],
    },
    {
      slug: "felony-vs-misdemeanor",
      title: "Felony vs Misdemeanor — What's the Difference?",
      metaTitle: "Felony vs Misdemeanor — Key Differences Explained | LegallySpoken",
      metaDescription: "Understand the difference between felonies and misdemeanors including penalties, classification, and long-term impacts on your life.",
      content: `<h2>Felony vs Misdemeanor</h2>
<p>All crimes in the US are classified as either felonies, misdemeanors, or infractions. The classification determines the severity of punishment and long-term consequences.</p>
<h3>Misdemeanors</h3>
<p>Less serious crimes punishable by up to 1 year in county jail, fines, probation, and community service. Examples: petty theft, simple assault, disorderly conduct, first-offense DUI, trespassing.</p>
<h3>Felonies</h3>
<p>Serious crimes punishable by more than 1 year in state prison, substantial fines, and long probation periods. Examples: murder, robbery, burglary, drug trafficking, aggravated assault, arson.</p>
<h3>Long-Term Consequences of a Felony</h3>
<p>Loss of voting rights (varies by state), inability to possess firearms, difficulty finding employment, ineligibility for certain professional licenses, loss of federal benefits, and immigration consequences.</p>
<h3>"Wobbler" Offenses</h3>
<p>Some crimes can be charged as either a felony or misdemeanor depending on circumstances. Examples include assault, theft (based on amount), and drug possession. A good attorney may negotiate a felony down to a misdemeanor.</p>`,
      faqs: [
        { question: "Can a felony be reduced to a misdemeanor?", answer: "In some states and for certain 'wobbler' offenses, yes. Through plea bargaining, completing diversion programs, or post-conviction motions, a felony may be reduced to a misdemeanor." },
        { question: "Do misdemeanors show up on background checks?", answer: "Yes, both felonies and misdemeanors appear on criminal background checks. However, some states limit how far back employers can look, and certain misdemeanors may be expungeable." },
      ],
      relatedToolIds: ["statute-of-limitations-lookup", "attorney-fee-calculator", "settlement-estimator"],
      relatedTermSlugs: ["damages", "liability", "remedy"],
    },
    {
      slug: "arrest-process",
      title: "What Happens After You're Arrested",
      metaTitle: "The Arrest Process — What Happens After an Arrest | LegallySpoken",
      metaDescription: "Step-by-step guide to what happens after an arrest. Covers booking, arraignment, bail, and your constitutional rights.",
      content: `<h2>The Arrest Process Step by Step</h2>
<p>Being arrested is frightening. Understanding the process helps you protect your rights and make better decisions at each stage.</p>
<h3>1. The Arrest</h3>
<p>Police must have probable cause to arrest you. You'll be read your Miranda rights: the right to remain silent and the right to an attorney. Exercise both immediately.</p>
<h3>2. Booking</h3>
<p>At the police station, you'll be photographed, fingerprinted, and your personal belongings will be catalogued. You'll typically be allowed to make a phone call.</p>
<h3>3. Arraignment</h3>
<p>Your first court appearance, usually within 24-72 hours. The judge reads the charges, you enter a plea (guilty, not guilty, or no contest), and bail is set.</p>
<h3>4. Bail/Bond</h3>
<p>Bail is money deposited to ensure you'll appear at future court dates. Options include: cash bail, bail bond (pay 10-15% to a bondsman), release on own recognizance (ROR), or being held without bail for serious charges.</p>
<h3>5. Pre-Trial</h3>
<p>Discovery (evidence sharing), plea negotiations, pre-trial motions, and preparation for trial if no plea deal is reached.</p>`,
      faqs: [
        { question: "Can I be arrested without a warrant?", answer: "Yes, if police have probable cause to believe you committed a crime, especially for crimes committed in their presence. For most felonies, an arrest warrant isn't required." },
        { question: "Should I talk to the police without a lawyer?", answer: "No. Politely invoke your right to remain silent and request an attorney. Anything you say can and will be used against you. Even innocent statements can be misinterpreted or taken out of context." },
      ],
      relatedToolIds: ["attorney-fee-calculator", "statute-of-limitations-lookup", "complaint-letter-generator"],
      relatedTermSlugs: ["liability", "due-diligence", "remedy"],
    },
    {
      slug: "bail-and-bond",
      title: "How Bail and Bond Work",
      metaTitle: "Bail & Bond — How They Work & What to Expect | LegallySpoken",
      metaDescription: "Understand how bail and bond work in the US criminal justice system. Learn about bail amounts, bond agents, and conditions of release.",
      content: `<h2>Understanding Bail and Bond</h2>
<p>Bail is a fundamental part of the US criminal justice system. It allows the accused to remain free while awaiting trial, with financial incentive to appear in court.</p>
<h3>Types of Bail</h3>
<p><strong>Cash bail:</strong> Pay the full amount to the court. Refunded when you appear for all court dates (minus fees in some jurisdictions).</p>
<p><strong>Surety bond:</strong> Pay a bail bondsman 10-15% of the bail amount. The bondsman guarantees the full amount. The fee is non-refundable.</p>
<p><strong>Property bond:</strong> Use real estate as collateral for the bail amount.</p>
<p><strong>Release on recognizance (ROR):</strong> Released without paying, based on your ties to the community and flight risk assessment.</p>
<h3>Factors That Affect Bail Amount</h3>
<p>Severity of the crime, prior criminal history, flight risk, ties to the community, employment status, and danger to the public.</p>`,
      faqs: [
        { question: "What happens if I can't afford bail?", answer: "You may request a bail reduction hearing. Some jurisdictions have bail reform programs or pretrial services. Public defenders can argue for lower bail or ROR release." },
        { question: "Do I get bail money back?", answer: "If you paid cash bail and appear for all court dates, yes (minus any fees). If you used a bail bondsman, the 10-15% fee is never returned — that's the bondsman's payment." },
      ],
      relatedToolIds: ["attorney-fee-calculator", "loan-payment-calculator", "settlement-estimator"],
      relatedTermSlugs: ["collateral", "surety", "escrow"],
    },
    {
      slug: "plea-bargaining",
      title: "How Plea Bargaining Works",
      metaTitle: "Plea Bargaining — How It Works & What to Consider | LegallySpoken",
      metaDescription: "Learn how plea bargaining works in criminal cases. Understand charge bargaining, sentence bargaining, and when to accept or reject a plea deal.",
      content: `<h2>Plea Bargaining Explained</h2>
<p>Over 90% of criminal cases in the US are resolved through plea bargains rather than trials. Understanding the process is critical for anyone facing criminal charges.</p>
<h3>Types of Plea Bargains</h3>
<p><strong>Charge bargaining:</strong> The prosecutor agrees to drop some charges or reduce the charge to a lesser offense (e.g., felony to misdemeanor).</p>
<p><strong>Sentence bargaining:</strong> The defendant pleads guilty in exchange for a lighter sentence recommendation.</p>
<p><strong>Fact bargaining:</strong> The defendant agrees to stipulate certain facts in exchange for the prosecutor not introducing other facts.</p>
<h3>When to Accept a Plea Deal</h3>
<p>Consider: the strength of the evidence against you, the potential sentence if convicted at trial, the specific terms being offered, and your attorney's assessment of the case.</p>
<h3>Your Rights in Plea Bargaining</h3>
<p>You can never be forced to take a plea deal. The judge must ensure the plea is voluntary and that you understand the consequences. You have the right to reject any offer and go to trial.</p>`,
      faqs: [
        { question: "Can I withdraw a guilty plea?", answer: "Before sentencing, some states allow plea withdrawal for 'fair and just' reasons. After sentencing, it's much harder — typically requiring proof of involuntariness, ineffective counsel, or new evidence." },
        { question: "Will the judge always accept a plea deal?", answer: "No. While judges usually accept plea agreements, they have discretion to reject them if they find the terms too lenient or not in the interest of justice." },
      ],
      relatedToolIds: ["attorney-fee-calculator", "statute-of-limitations-lookup", "settlement-estimator"],
      relatedTermSlugs: ["good-faith", "breach", "remedy"],
    },
    {
      slug: "expungement",
      title: "How to Get a Criminal Record Expunged",
      metaTitle: "Expungement — How to Clear Your Criminal Record | LegallySpoken",
      metaDescription: "Learn how to get a criminal record expunged or sealed. Covers eligibility, the process, and state-specific rules.",
      content: `<h2>Criminal Record Expungement</h2>
<p>Expungement is the legal process of sealing or destroying criminal records so they don't appear on background checks. Eligibility and procedures vary significantly by state.</p>
<h3>Who Is Eligible?</h3>
<p>Generally: first-time offenders, those with completed sentences, non-violent offenders, and those with certain misdemeanor convictions. Most states exclude violent felonies and sex offenses.</p>
<h3>The Expungement Process</h3>
<p><strong>Step 1:</strong> Determine eligibility under your state's laws.</p>
<p><strong>Step 2:</strong> Obtain your criminal record from the court or state police.</p>
<p><strong>Step 3:</strong> File an expungement petition with the court where you were convicted.</p>
<p><strong>Step 4:</strong> Attend the hearing (if required) and present your case.</p>
<p><strong>Step 5:</strong> If granted, the record is sealed or destroyed.</p>
<h3>Expungement vs Sealing</h3>
<p>Expungement typically destroys the record entirely. Sealing hides it from public view but law enforcement and certain agencies can still access it.</p>`,
      faqs: [
        { question: "How long does expungement take?", answer: "Typically 3-6 months from filing to court order, though it can take longer in some jurisdictions. Processing and record updates may take additional time." },
        { question: "Can I say I was never arrested after expungement?", answer: "In most states, yes. Once a record is expunged, you can legally deny the arrest or conviction ever happened on job applications and most other inquiries. Government and law enforcement applications may be exceptions." },
      ],
      relatedToolIds: ["statute-of-limitations-lookup", "complaint-letter-generator", "attorney-fee-calculator"],
      relatedTermSlugs: ["remedy", "due-diligence", "standing"],
    },
    {
      slug: "drug-charges",
      title: "Drug Charges — Possession, Distribution & Penalties",
      metaTitle: "Drug Charges — Possession, Distribution & Penalties | LegallySpoken",
      metaDescription: "Understand drug possession and distribution charges, federal vs state laws, mandatory minimums, and defense strategies.",
      content: `<h2>Drug Charges in the US</h2>
<p>Drug laws in the US operate at both federal and state levels. Penalties depend on the type and amount of drug, whether it's possession or distribution, and the state where the offense occurs.</p>
<h3>Possession vs Distribution</h3>
<p><strong>Simple possession:</strong> Having a controlled substance for personal use. Often a misdemeanor for small amounts of most drugs.</p>
<p><strong>Possession with intent to distribute:</strong> Having enough quantity, packaging materials, scales, or cash to suggest you planned to sell. Usually a felony.</p>
<p><strong>Distribution/trafficking:</strong> Selling, transporting, or importing drugs. Carries the heaviest penalties including federal mandatory minimums.</p>
<h3>Drug Schedules</h3>
<p>The Controlled Substances Act classifies drugs into five schedules based on medical use and abuse potential. Schedule I (heroin, LSD, marijuana federally) carries the harshest penalties. Schedule V (cough preparations) the lightest.</p>
<h3>Marijuana: The Patchwork</h3>
<p>As of 2026, marijuana is legal for recreational use in 24 states and medical use in 38 states, but remains illegal under federal law. This creates complex legal situations, especially for businesses.</p>`,
      faqs: [
        { question: "Is marijuana legal in my state?", answer: "Marijuana laws vary dramatically. While 24 states have legalized recreational use and 38 allow medical use, it remains a Schedule I controlled substance under federal law. Check your specific state's current laws." },
        { question: "What are mandatory minimum sentences for drugs?", answer: "Federal mandatory minimums apply to certain drug quantities: e.g., 5+ grams of crack cocaine or 500+ grams of powder cocaine trigger a 5-year minimum. Many states are moving away from mandatory minimums for drug offenses." },
      ],
      relatedToolIds: ["statute-of-limitations-lookup", "attorney-fee-calculator", "complaint-letter-generator"],
      relatedTermSlugs: ["liability", "remedy", "jurisdiction"],
    },
    {
      slug: "domestic-violence-charges",
      title: "Domestic Violence Laws & Charges",
      metaTitle: "Domestic Violence Laws — Charges, Penalties & Protection | LegallySpoken",
      metaDescription: "Understand domestic violence laws, types of charges, protective orders, and defense options. Covers both victims' rights and accused persons' rights.",
      content: `<h2>Domestic Violence Laws</h2>
<p>Domestic violence encompasses physical abuse, emotional abuse, threats, stalking, and other harmful behavior between intimate partners, family members, or household members.</p>
<h3>Types of Charges</h3>
<p><strong>Misdemeanor DV:</strong> Minor physical altercations, threats without weapon, property damage. Penalties: up to 1 year jail, fines, mandatory counseling.</p>
<p><strong>Felony DV:</strong> Serious bodily injury, use of weapon, strangulation, repeat offenses. Penalties: 1-15+ years prison.</p>
<h3>Protective Orders</h3>
<p>Victims can obtain emergency protective orders (immediate, temporary), temporary restraining orders (2-3 weeks), and permanent protective orders (1-5 years). Violating a protective order is a separate criminal offense.</p>
<h3>Federal Implications</h3>
<p>A DV conviction (even misdemeanor) results in a lifetime ban on firearm possession under the Lautenberg Amendment. It can also affect immigration status, custody, and professional licenses.</p>`,
      faqs: [
        { question: "Can charges be dropped if the victim doesn't want to prosecute?", answer: "The victim doesn't control whether charges are filed or dropped — the prosecutor does. Many DV cases proceed even without the victim's cooperation, using other evidence like 911 calls, photos, and witness statements." },
        { question: "What is a no-contact order?", answer: "A court order prohibiting the accused from contacting the alleged victim. Violations can result in arrest and additional charges. It's different from a civil protective order, as it's issued as a condition of the criminal case." },
      ],
      relatedToolIds: ["complaint-letter-generator", "statute-of-limitations-lookup", "settlement-estimator"],
      relatedTermSlugs: ["liability", "injunction", "remedy"],
    },
    {
      slug: "traffic-violations",
      title: "Traffic Violations — Tickets, Points & Consequences",
      metaTitle: "Traffic Violations — Tickets, Points & What to Do | LegallySpoken",
      metaDescription: "Understand traffic violations from speeding tickets to reckless driving. Learn about point systems, fines, and how to fight a ticket.",
      content: `<h2>Traffic Violations Explained</h2>
<p>Traffic violations range from minor infractions to serious criminal offenses. Understanding the difference — and knowing your options — can save you money, points, and even your license.</p>
<h3>Types of Traffic Violations</h3>
<p><strong>Infractions:</strong> Minor violations like speeding (under 25 mph over), running a stop sign, or expired registration. Usually fines only, no jail time.</p>
<p><strong>Misdemeanors:</strong> Reckless driving, driving on a suspended license, hit and run with property damage only.</p>
<p><strong>Felonies:</strong> Vehicular homicide, hit and run with injuries, repeat DUI offenses.</p>
<h3>Point Systems</h3>
<p>Most states assign points to your license for violations. Accumulate too many points and you face license suspension. Points typically stay on your record for 2-5 years.</p>
<h3>Fighting a Traffic Ticket</h3>
<p>You have the right to contest any traffic ticket. Options include: requesting a trial, negotiating for a reduced charge, attending traffic school (in exchange for dismissal), or proving the citation was issued in error.</p>`,
      faqs: [
        { question: "Should I just pay the ticket or fight it?", answer: "Consider fighting it if: the fine is high, it will add significant points to your license, it could affect your insurance rates, or you have a legitimate defense. Traffic school may be an option to avoid points." },
        { question: "How many points before I lose my license?", answer: "This varies by state. Most states suspend your license at 12-15 points accumulated within 12-24 months. Some states use different scales or timeframes." },
      ],
      relatedToolIds: ["attorney-fee-calculator", "statute-of-limitations-lookup", "settlement-estimator"],
      relatedTermSlugs: ["negligence", "liability", "damages"],
    },
    {
      slug: "juvenile-law",
      title: "Juvenile Criminal Law — How the System Works",
      metaTitle: "Juvenile Law — How the Youth Justice System Works | LegallySpoken",
      metaDescription: "Understand how the juvenile justice system works differently from adult criminal court. Covers age limits, proceedings, and rehabilitation focus.",
      content: `<h2>The Juvenile Justice System</h2>
<p>The juvenile justice system handles criminal cases involving minors (typically under 18). It emphasizes rehabilitation over punishment and operates differently from adult criminal court.</p>
<h3>Key Differences from Adult Court</h3>
<p><strong>No jury trial:</strong> Juvenile cases are decided by a judge (in most states).</p>
<p><strong>Different terminology:</strong> "Adjudicated delinquent" instead of "convicted," "disposition" instead of "sentencing."</p>
<p><strong>Sealed records:</strong> Juvenile records are typically sealed or automatically expunged at age 18 or 21.</p>
<p><strong>Focus on rehabilitation:</strong> Sentences emphasize counseling, community service, probation, and educational programs rather than incarceration.</p>
<h3>When Juveniles Are Tried as Adults</h3>
<p>For serious crimes (murder, armed robbery), some states allow or require juveniles to be transferred to adult court. Factors include: the severity of the crime, the juvenile's age and prior record, and whether the juvenile system can effectively rehabilitate them.</p>`,
      faqs: [
        { question: "At what age can a juvenile be charged?", answer: "Most states set a minimum age of 10-12 for criminal prosecution, though some have no minimum age. The upper age limit for juvenile court is typically 17 (charged as an adult at 18), but this varies." },
        { question: "Will a juvenile record affect my child's future?", answer: "In most cases, juvenile records are sealed or expunged automatically. However, certain serious offenses may remain. When sealed, the record shouldn't appear on background checks for employment or education." },
      ],
      relatedToolIds: ["attorney-fee-calculator", "statute-of-limitations-lookup", "complaint-letter-generator"],
      relatedTermSlugs: ["due-diligence", "remedy", "standing"],
    },
  ],
};
