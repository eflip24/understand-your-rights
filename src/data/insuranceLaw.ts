import type { PillarData } from "./autoAccidentLaw";

export const insuranceLaw: PillarData = {
  basePath: "/insurance-law",
  category: "Insurance Law",
  pillarTitle: "Insurance Law Guide — Understand Your Policy, Your Rights & How to Fight Denials",
  pillarMetaTitle: "Insurance Law — Free Legal Guide | LegallySpoken",
  pillarMetaDescription: "Learn about insurance law in plain English. Free tools, state-specific info, and FAQs. No lawyer required to get started.",
  pillarIntro: "Insurance law governs the relationship between policyholders and insurance companies. This guide helps you understand your policy, know your rights, and fight unfair claim denials.",
  clusters: [
    {
      slug: "appeal-denied-claim",
      title: "How to Appeal a Denied Insurance Claim",
      metaTitle: "Appeal a Denied Insurance Claim — Step-by-Step Guide | LegallySpoken",
      metaDescription: "Learn how to appeal a denied insurance claim. Step-by-step process, sample letters, and tips for overturning claim denials.",
      content: `<h2>Appealing a Denied Insurance Claim</h2>
<p>Insurance claim denials are frustrating but common. Understanding the appeal process can help you overturn unfair denials.</p>
<h3>Common Denial Reasons</h3><p>Policy exclusions, missed deadlines, insufficient documentation, pre-existing conditions, and coverage disputes.</p>
<h3>The Appeal Process</h3>
<p><strong>Step 1:</strong> Read the denial letter carefully to understand the specific reason.<br/>
<strong>Step 2:</strong> Gather supporting documentation — medical records, repair estimates, policy documents.<br/>
<strong>Step 3:</strong> Write a formal appeal letter addressing each denial reason with evidence.<br/>
<strong>Step 4:</strong> Submit within the appeal deadline (typically 30-180 days).<br/>
<strong>Step 5:</strong> If denied again, escalate to your state's insurance commissioner.</p>`,
      faqs: [
        { question: "How long do I have to appeal a denied claim?", answer: "Appeal deadlines vary by policy and state, typically 30-180 days from the denial. Check your denial letter for the specific deadline." },
        { question: "Can I hire a lawyer for an insurance appeal?", answer: "Yes. Many insurance attorneys work on contingency for denied claims, especially for large claims or bad faith situations." },
      ],
      relatedToolIds: ["complaint-letter-generator", "dispute-letter-generator"],
      relatedTermSlugs: ["good-faith", "breach", "remedy"],
    },
    {
      slug: "bad-faith-insurance",
      title: "Bad Faith Insurance Practices",
      metaTitle: "Bad Faith Insurance — Know Your Rights | LegallySpoken",
      metaDescription: "Learn what constitutes bad faith insurance practices and how to hold insurers accountable. Includes state-specific information.",
      content: `<h2>Bad Faith Insurance</h2>
<p>Insurance companies have a legal duty to handle claims fairly and in good faith. When they don't, you may have a bad faith claim.</p>
<h3>Common Bad Faith Practices</h3><p>Unreasonable claim delays, lowball settlement offers, failing to investigate properly, misrepresenting policy terms, and denying valid claims without explanation.</p>
<h3>Types of Bad Faith Claims</h3>
<p><strong>First-Party:</strong> When your own insurer acts in bad faith on your claim.<br/>
<strong>Third-Party:</strong> When the other party's insurer acts in bad faith during settlement negotiations.</p>
<h3>Remedies for Bad Faith</h3><p>Compensatory damages, consequential damages, and in many states, punitive damages and attorney fees.</p>`,
      faqs: [
        { question: "How do I prove bad faith?", answer: "You need to show the insurer had no reasonable basis for denying or delaying your claim and knew or recklessly disregarded this fact." },
      ],
      relatedToolIds: ["complaint-letter-generator", "dispute-letter-generator"],
      relatedTermSlugs: ["good-faith", "breach", "damages"],
    },
    {
      slug: "homeowners-policy-guide",
      title: "Understanding Your Homeowners Policy",
      metaTitle: "Homeowners Insurance Policy Guide | LegallySpoken",
      metaDescription: "Understand your homeowners insurance policy. Learn about coverage types, common exclusions, and how to make sure you're properly covered.",
      content: `<h2>Homeowners Insurance Explained</h2>
<p>Your homeowners insurance policy is a complex document. Understanding its components helps you ensure adequate coverage and avoid surprises at claim time.</p>
<h3>Coverage Types</h3>
<p><strong>Dwelling (Coverage A):</strong> Covers your home's structure.<br/>
<strong>Other Structures (Coverage B):</strong> Covers detached garages, fences, sheds.<br/>
<strong>Personal Property (Coverage C):</strong> Covers belongings inside the home.<br/>
<strong>Liability (Coverage E):</strong> Covers legal liability for injuries on your property.<br/>
<strong>Medical Payments (Coverage F):</strong> Covers minor injury medical costs for visitors.</p>
<h3>Common Exclusions</h3><p>Floods, earthquakes, maintenance issues, mold, nuclear hazards, and intentional damage are typically excluded.</p>`,
      faqs: [
        { question: "Does homeowner's insurance cover flooding?", answer: "No. Standard homeowners policies exclude flood damage. You need separate flood insurance, typically through the National Flood Insurance Program (NFIP) or a private insurer." },
      ],
      relatedToolIds: ["security-deposit-calculator", "lease-term-comparison"],
      relatedTermSlugs: ["indemnification", "liability", "warranty"],
    },
    {
      slug: "health-insurance-denial",
      title: "Health Insurance Denial Rights",
      metaTitle: "Health Insurance Denial — Your Rights & How to Appeal | LegallySpoken",
      metaDescription: "Know your rights when a health insurance claim is denied. Learn about internal and external appeals under the ACA.",
      content: `<h2>Health Insurance Denial Rights</h2>
<p>Under the Affordable Care Act, you have the right to appeal health insurance denials through both internal and external review processes.</p>
<h3>Internal Appeal</h3><p>You must first appeal to your insurance company. They must review the denial using different reviewers than those who made the original decision.</p>
<h3>External Review</h3><p>If the internal appeal fails, you can request an external review by an independent third party. The external reviewer's decision is binding on the insurer.</p>
<h3>Expedited Appeals</h3><p>If your health situation is urgent, you can request an expedited internal review (completed within 72 hours) or simultaneous internal and external reviews.</p>`,
      faqs: [
        { question: "Can my insurance company deny a procedure my doctor recommends?", answer: "Yes, insurers can deny coverage for procedures they deem not medically necessary, experimental, or outside your plan's coverage. However, you have appeal rights to challenge the decision." },
      ],
      relatedToolIds: ["complaint-letter-generator"],
      relatedTermSlugs: ["good-faith", "breach", "remedy"],
    },
    {
      slug: "life-insurance-disputes",
      title: "Life Insurance Claim Disputes",
      metaTitle: "Life Insurance Claim Disputes — Guide | LegallySpoken",
      metaDescription: "Learn about common life insurance claim disputes and how to fight denied death benefit claims.",
      content: `<h2>Life Insurance Claim Disputes</h2>
<p>Life insurance claim denials add financial stress during an already difficult time. Understanding common dispute reasons helps you fight for the benefits you're owed.</p>
<h3>Common Denial Reasons</h3><p>Material misrepresentation on the application, policy lapse due to non-payment, contestability period claims, excluded causes of death, and beneficiary disputes.</p>
<h3>The Contestability Period</h3><p>During the first 2 years after policy purchase, the insurer can investigate and potentially deny claims based on application misrepresentations.</p>
<h3>Fighting a Denial</h3><p>Request the complete claim file, review the specific denial reason, gather supporting documentation, and file a formal appeal.</p>`,
      faqs: [
        { question: "Can a life insurance claim be denied for suicide?", answer: "Most policies include a suicide exclusion for the first 2 years. After the exclusion period, suicide is typically covered." },
      ],
      relatedToolIds: ["dispute-letter-generator"],
      relatedTermSlugs: ["breach", "good-faith", "remedy"],
    },
    {
      slug: "auto-coverage-types",
      title: "Auto Insurance Coverage Types Explained",
      metaTitle: "Auto Insurance Coverage Types — Complete Guide | LegallySpoken",
      metaDescription: "Understand auto insurance coverage types: liability, collision, comprehensive, UM/UIM, and more. Know what you need.",
      content: `<h2>Auto Insurance Coverage Types</h2>
<p>Auto insurance isn't one-size-fits-all. Understanding each coverage type helps you build a policy that truly protects you.</p>
<h3>Liability Coverage</h3><p>Required in nearly every state. Covers damage you cause to others — both bodily injury and property damage.</p>
<h3>Collision Coverage</h3><p>Covers damage to your own vehicle from collisions, regardless of fault.</p>
<h3>Comprehensive Coverage</h3><p>Covers non-collision damage: theft, vandalism, weather, animal strikes, and falling objects.</p>
<h3>Uninsured/Underinsured Motorist</h3><p>Covers you when the at-fault driver has no or insufficient insurance.</p>
<h3>Medical Payments / PIP</h3><p>Covers medical expenses for you and passengers regardless of fault.</p>`,
      faqs: [
        { question: "What's the minimum auto insurance required?", answer: "Requirements vary by state but typically include liability coverage. Most states require minimum bodily injury and property damage limits." },
      ],
      relatedToolIds: ["auto-loan-calculator"],
      relatedTermSlugs: ["liability", "indemnification", "subrogation"],
    },
    {
      slug: "subrogation-explained",
      title: "Insurance Subrogation Explained",
      metaTitle: "Insurance Subrogation — How It Works | LegallySpoken",
      metaDescription: "Learn how insurance subrogation works, when your insurer can recover payments from at-fault parties, and how it affects you.",
      content: `<h2>What Is Subrogation?</h2>
<p>Subrogation is the process by which your insurance company recovers money it paid on your claim from the party that caused the loss.</p>
<h3>How It Works</h3><p>After paying your claim, your insurer "steps into your shoes" and pursues the at-fault party (or their insurer) for reimbursement.</p>
<h3>How Subrogation Affects You</h3><p>If subrogation is successful, you may recover your deductible. However, your right to independently pursue the at-fault party may be limited.</p>
<h3>Waiver of Subrogation</h3><p>Some contracts include a waiver of subrogation, preventing the insurer from pursuing a third party. This is common in commercial leases and construction contracts.</p>`,
      faqs: [
        { question: "Will I get my deductible back through subrogation?", answer: "Possibly. If your insurer successfully recovers the full amount from the at-fault party, you should receive your deductible back. Partial recoveries may result in a proportional deductible refund." },
      ],
      relatedToolIds: ["late-fee-calculator"],
      relatedTermSlugs: ["subrogation", "indemnification", "liability"],
    },
    {
      slug: "file-complaint-against-insurer",
      title: "How to File a Complaint Against an Insurer",
      metaTitle: "File a Complaint Against an Insurance Company | LegallySpoken",
      metaDescription: "Step-by-step guide to filing a complaint against your insurance company with your state's insurance commissioner.",
      content: `<h2>Filing a Complaint Against Your Insurer</h2>
<p>When your insurance company treats you unfairly, your state's department of insurance can investigate and intervene.</p>
<h3>When to File</h3><p>File a complaint for unreasonable delays, unfair claim denials, misrepresentation of coverage, or failure to communicate.</p>
<h3>The Process</h3>
<p><strong>Step 1:</strong> Document all interactions with your insurer.<br/>
<strong>Step 2:</strong> Visit your state's Department of Insurance website.<br/>
<strong>Step 3:</strong> Complete the complaint form with details and supporting documents.<br/>
<strong>Step 4:</strong> The department will contact the insurer and investigate.</p>
<h3>What to Expect</h3><p>Investigations typically take 30-60 days. The department can require the insurer to respond and may take enforcement action for violations.</p>`,
      faqs: [
        { question: "Can the insurance commissioner force my insurer to pay?", answer: "The commissioner can't directly award you money, but they can investigate, impose fines, and pressure the insurer to comply with the law. Their involvement often leads to resolution." },
      ],
      relatedToolIds: ["complaint-letter-generator", "dispute-letter-generator"],
      relatedTermSlugs: ["good-faith", "breach"],
    },
    {
      slug: "umbrella-insurance",
      title: "Umbrella Insurance — Do You Need It?",
      metaTitle: "Umbrella Insurance — Do You Need It? | LegallySpoken",
      metaDescription: "Learn what umbrella insurance covers, who needs it, and how it works. Understand excess liability coverage and when it kicks in.",
      content: `<h2>What Is Umbrella Insurance?</h2>
<p>An umbrella policy provides extra liability coverage beyond the limits of your auto, homeowners, or other insurance policies.</p>
<h3>What It Covers</h3><p>Bodily injury and property damage liability beyond your other policies' limits. Some policies also cover claims like libel, slander, and false imprisonment.</p>
<h3>Who Needs It</h3><p>Consider umbrella insurance if you have significant assets, own rental property, frequently host guests, have a pool or trampoline, or are at higher risk of lawsuits.</p>
<h3>How It Works</h3><p>Umbrella coverage kicks in after your underlying policy limits are exhausted. For example, if your auto liability is $300,000 and you face a $500,000 judgment, your umbrella policy covers the remaining $200,000.</p>
<h3>Cost</h3><p>Umbrella policies are relatively affordable — typically $150-$300/year for $1 million in coverage.</p>`,
      faqs: [
        { question: "Does umbrella insurance cover my business?", answer: "No. Personal umbrella policies don't cover business-related liability. You'd need a commercial umbrella policy for business risks." },
      ],
      relatedToolIds: ["net-worth-calculator"],
      relatedTermSlugs: ["liability", "indemnification", "damages"],
    },
    {
      slug: "insurance-fraud",
      title: "Insurance Fraud — What Counts & Penalties",
      metaTitle: "Insurance Fraud — What Counts & Penalties | LegallySpoken",
      metaDescription: "Learn what constitutes insurance fraud, how it's detected, and the severe criminal and civil penalties.",
      content: `<h2>Insurance Fraud</h2>
<p>Insurance fraud is any act committed to obtain an insurance benefit to which one is not entitled. It's a serious crime with severe consequences.</p>
<h3>Types of Insurance Fraud</h3>
<p><strong>Hard Fraud:</strong> Deliberately staging accidents, arsons, or thefts to collect insurance money.<br/>
<strong>Soft Fraud:</strong> Exaggerating legitimate claims or misrepresenting information on applications.</p>
<h3>How Fraud Is Detected</h3><p>Insurers use special investigation units (SIUs), data analytics, social media monitoring, and cooperation with law enforcement to detect fraud.</p>
<h3>Penalties</h3><p>Insurance fraud is a felony in most states. Penalties include prison time, fines, restitution, and a permanent criminal record. Even soft fraud can result in policy cancellation, claim denial, and civil penalties.</p>`,
      faqs: [
        { question: "Is exaggerating a claim considered fraud?", answer: "Yes. Inflating the value of a claim, even slightly, is considered soft fraud and can result in claim denial, policy cancellation, and potentially criminal charges." },
      ],
      relatedToolIds: ["complaint-letter-generator"],
      relatedTermSlugs: ["fraud", "breach", "perjury"],
    },
  ],
};
