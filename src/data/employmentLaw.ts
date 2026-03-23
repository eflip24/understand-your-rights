import type { PillarData } from "./autoAccidentLaw";

export const employmentLaw: PillarData = {
  basePath: "/employment-law",
  category: "Employment Law",
  pillarTitle: "Employment Law Guide — Know Your Workplace Rights",
  pillarMetaTitle: "Employment Law — Free Workplace Rights Guide | LegallySpoken",
  pillarMetaDescription: "Learn about employment law in plain English. Covers wrongful termination, discrimination, overtime, non-competes, and more. Free tools and state-specific info.",
  pillarIntro: "Employment law governs the relationship between employers and employees. Whether you're dealing with wrongful termination, workplace discrimination, wage disputes, or non-compete agreements, understanding your rights is the first step. This guide covers every major employment law topic with free tools and state-specific information.",
  clusters: [
    {
      slug: "wrongful-termination",
      title: "What Is Wrongful Termination?",
      metaTitle: "Wrongful Termination — Know Your Rights | LegallySpoken",
      metaDescription: "Learn what constitutes wrongful termination, how to identify it, and what legal options you have if you've been illegally fired.",
      content: `<h2>Understanding Wrongful Termination</h2>
<p>Wrongful termination occurs when an employer fires an employee in violation of federal or state laws, employment contracts, or public policy. While most US employment is "at-will," there are important exceptions.</p>
<h3>Common Types of Wrongful Termination</h3>
<p><strong>Discrimination-based:</strong> Firing someone because of race, gender, age, disability, religion, national origin, or other protected characteristics violates Title VII, the ADA, and the ADEA.</p>
<p><strong>Retaliation:</strong> Employers cannot fire you for reporting illegal activity (whistleblowing), filing a workers' comp claim, or exercising your legal rights.</p>
<p><strong>Breach of contract:</strong> If you have a written or implied employment contract, termination outside its terms may be wrongful.</p>
<p><strong>Violation of public policy:</strong> Firing someone for refusing to commit an illegal act, serving on jury duty, or exercising a legal right.</p>
<h3>What to Do If You Think You Were Wrongfully Terminated</h3>
<p>Document everything — save emails, performance reviews, and any evidence of the real reason for termination. File a complaint with the EEOC within 180 days (300 days in some states). Consider consulting an employment attorney.</p>
<h3>Damages You Can Recover</h3>
<p>Back pay, front pay, compensatory damages for emotional distress, punitive damages in some cases, and attorney's fees.</p>`,
      faqs: [
        { question: "Can I be fired for no reason in the US?", answer: "In most states, employment is 'at-will,' meaning either party can end the relationship at any time for any reason — except illegal ones. You cannot be fired for discriminatory reasons, retaliation, or in violation of a contract." },
        { question: "How long do I have to file a wrongful termination claim?", answer: "For federal claims through the EEOC, you generally have 180 days (or 300 days if your state has its own anti-discrimination agency). State law deadlines vary. Act quickly — these deadlines are strictly enforced." },
        { question: "What evidence do I need for a wrongful termination case?", answer: "Documentation is key: performance reviews, emails, witness statements, company policies, your employment contract, and any evidence showing the stated reason for termination was pretextual." },
      ],
      relatedToolIds: ["wrongful-termination-checklist", "settlement-estimator", "severance-pay-calculator"],
      relatedTermSlugs: ["breach", "damages", "liability"],
    },
    {
      slug: "at-will-employment",
      title: "At-Will Employment — Can You Be Fired Without Cause?",
      metaTitle: "At-Will Employment Explained — Can You Be Fired Without Cause? | LegallySpoken",
      metaDescription: "Understand at-will employment, its exceptions, and what protections you have even in at-will states.",
      content: `<h2>What Is At-Will Employment?</h2>
<p>At-will employment means your employer can fire you at any time, for any reason (or no reason), without warning — and you can quit at any time too. This is the default rule in 49 US states (Montana is the exception).</p>
<h3>Important Exceptions to At-Will Employment</h3>
<p><strong>Federal anti-discrimination laws:</strong> You can't be fired based on race, color, religion, sex, national origin, age (40+), disability, genetic information, or pregnancy.</p>
<p><strong>Implied contract:</strong> If an employee handbook promises progressive discipline or states you'll only be fired "for cause," that may create an implied contract.</p>
<p><strong>Public policy exception:</strong> Most states prohibit firing employees for reasons that violate public policy — like refusing to commit a crime or exercising a legal right.</p>
<p><strong>Covenant of good faith:</strong> Some states recognize an implied covenant that employers won't fire employees in bad faith (e.g., firing someone right before their pension vests).</p>
<h3>What "At-Will" Does NOT Mean</h3>
<p>At-will doesn't mean employers can do anything. They still can't discriminate, retaliate, or violate contractual obligations. The at-will doctrine has significant legal limits.</p>`,
      faqs: [
        { question: "Is Montana the only state that isn't at-will?", answer: "Yes. Montana's Wrongful Discharge from Employment Act requires employers to show 'good cause' for termination after a probationary period." },
        { question: "Can I be fired while on medical leave?", answer: "If you qualify for FMLA leave, your employer cannot fire you for taking it. However, they can terminate you for legitimate business reasons unrelated to your leave." },
      ],
      relatedToolIds: ["wrongful-termination-checklist", "employment-contract-checklist", "severance-pay-calculator"],
      relatedTermSlugs: ["breach", "good-faith", "termination"],
    },
    {
      slug: "workplace-discrimination",
      title: "Can I Sue My Employer for Discrimination?",
      metaTitle: "Workplace Discrimination — Can I Sue My Employer? | LegallySpoken",
      metaDescription: "Learn about workplace discrimination laws, protected classes, how to file a complaint, and when you can sue your employer.",
      content: `<h2>Workplace Discrimination Laws</h2>
<p>Federal and state laws prohibit employers from treating employees differently based on protected characteristics. Understanding these laws is the first step in protecting your rights.</p>
<h3>Protected Classes Under Federal Law</h3>
<p>Race, color, religion, sex (including pregnancy, sexual orientation, and gender identity), national origin, age (40+), disability, and genetic information.</p>
<h3>Types of Discrimination</h3>
<p><strong>Disparate treatment:</strong> Intentionally treating someone differently because of a protected characteristic.</p>
<p><strong>Disparate impact:</strong> Policies that appear neutral but disproportionately affect a protected group.</p>
<p><strong>Harassment:</strong> Unwelcome conduct based on a protected characteristic that creates a hostile work environment.</p>
<h3>How to File a Discrimination Complaint</h3>
<p>File a charge with the EEOC (or your state's fair employment agency). The EEOC will investigate and may attempt mediation. If they don't resolve it, they'll issue a "right to sue" letter allowing you to file a lawsuit.</p>`,
      faqs: [
        { question: "How do I prove workplace discrimination?", answer: "Evidence can include disparate treatment compared to similarly-situated employees, discriminatory comments, statistical patterns, timing of adverse actions, and departure from normal procedures." },
        { question: "What damages can I get in a discrimination case?", answer: "Back pay, front pay, compensatory damages (emotional distress), punitive damages (capped based on employer size), and attorney's fees." },
      ],
      relatedToolIds: ["wrongful-termination-checklist", "complaint-letter-generator", "settlement-estimator"],
      relatedTermSlugs: ["damages", "liability", "remedy"],
    },
    {
      slug: "contractor-vs-employee",
      title: "Contractor vs Employee — What's the Difference?",
      metaTitle: "Contractor vs Employee — Know the Difference | LegallySpoken",
      metaDescription: "Understand the legal differences between independent contractors and employees. Learn about misclassification and your rights.",
      content: `<h2>Contractor vs Employee Classification</h2>
<p>The distinction between independent contractor and employee is one of the most important — and most frequently litigated — issues in employment law. Misclassification can cost workers benefits, protections, and fair wages.</p>
<h3>Key Factors in Classification</h3>
<p><strong>Behavioral control:</strong> Does the company control how, when, and where you work? Employees receive detailed instructions; contractors control their own methods.</p>
<p><strong>Financial control:</strong> Do you have a significant investment in your own equipment? Do you have unreimbursed expenses? Can you seek other business opportunities? Contractors typically have more financial independence.</p>
<p><strong>Relationship type:</strong> Written contracts, employee benefits (insurance, pension, vacation), and the permanency of the relationship all factor in.</p>
<h3>Consequences of Misclassification</h3>
<p>Misclassified workers miss out on overtime pay, health insurance, workers' comp, unemployment insurance, and employer tax contributions. Employers face back taxes, penalties, and lawsuits.</p>`,
      faqs: [
        { question: "What is the ABC test for contractor classification?", answer: "Used in many states, the ABC test presumes a worker is an employee unless: (A) the worker is free from control, (B) the work is outside the company's usual business, and (C) the worker has an independent business or trade." },
        { question: "Can I sue if I'm misclassified as a contractor?", answer: "Yes. You can file a complaint with your state labor agency or the IRS, or bring a private lawsuit seeking unpaid overtime, benefits, and other damages." },
      ],
      relatedToolIds: ["contractor-vs-employee-checker", "freelance-rate-calculator", "invoice-interest-calculator"],
      relatedTermSlugs: ["breach", "liability", "remedy"],
    },
    {
      slug: "overtime-rights",
      title: "Overtime Pay Laws by State",
      metaTitle: "Overtime Pay Laws by State — Know Your Rights | LegallySpoken",
      metaDescription: "Understand federal and state overtime laws. Learn who qualifies, exemption rules, and how to calculate overtime pay.",
      content: `<h2>Understanding Overtime Laws</h2>
<p>The Fair Labor Standards Act (FLSA) requires employers to pay non-exempt employees 1.5x their regular rate for hours worked over 40 in a workweek. But state laws can provide additional protections.</p>
<h3>Who Is Exempt from Overtime?</h3>
<p>The FLSA exempts certain employees from overtime based on salary level and job duties:</p>
<p><strong>Executive exemption:</strong> Manages a department, directs 2+ employees, has hiring/firing authority.</p>
<p><strong>Administrative exemption:</strong> Performs office work related to business operations and exercises independent judgment.</p>
<p><strong>Professional exemption:</strong> Requires advanced knowledge in a field of science or learning.</p>
<p>The salary threshold is $35,568/year ($684/week) as of 2024. Some states have higher thresholds.</p>
<h3>How to Calculate Overtime</h3>
<p>Overtime = (hours over 40) × (regular hourly rate × 1.5). For salaried employees, divide annual salary by 52 weeks, then by 40 hours to get the hourly rate.</p>`,
      faqs: [
        { question: "Can my employer make me work overtime?", answer: "Generally yes — employers can require overtime. But they must pay the overtime premium. Refusing mandatory overtime can be grounds for discipline in most states." },
        { question: "Is comp time legal instead of overtime pay?", answer: "For private employers, no. The FLSA requires overtime to be paid in money, not compensatory time off. Government employers may offer comp time under certain conditions." },
      ],
      relatedToolIds: ["overtime-calculator", "salary-to-hourly-converter", "paycheck-calculator"],
      relatedTermSlugs: ["breach", "damages", "remedy"],
    },
    {
      slug: "workplace-harassment",
      title: "Sexual Harassment Laws at Work",
      metaTitle: "Workplace Harassment Laws — Your Rights Explained | LegallySpoken",
      metaDescription: "Learn about sexual harassment laws, how to report it, and your legal options. Covers quid pro quo and hostile work environment harassment.",
      content: `<h2>Workplace Harassment Laws</h2>
<p>Sexual harassment is a form of sex discrimination prohibited by Title VII of the Civil Rights Act. It can happen to anyone, regardless of gender, and includes both quid pro quo and hostile work environment harassment.</p>
<h3>Types of Sexual Harassment</h3>
<p><strong>Quid pro quo:</strong> A supervisor conditions employment benefits (raises, promotions, continued employment) on sexual favors.</p>
<p><strong>Hostile work environment:</strong> Unwelcome sexual conduct that is severe or pervasive enough to create an intimidating, hostile, or offensive work environment.</p>
<h3>What to Do If You're Being Harassed</h3>
<p>Document every incident with dates, times, witnesses, and details. Report through your company's complaint procedure. If the company doesn't act, file a charge with the EEOC within 180-300 days.</p>
<h3>Employer Liability</h3>
<p>Employers are automatically liable for supervisor harassment that results in a tangible employment action. For hostile environment claims, employers may have a defense if they had anti-harassment policies and the employee failed to use them.</p>`,
      faqs: [
        { question: "Can I be fired for reporting harassment?", answer: "No. Retaliation against employees who report harassment is illegal under Title VII. If you're fired, demoted, or otherwise punished for reporting, you have an additional legal claim." },
        { question: "Does harassment have to be sexual to be illegal?", answer: "No. Harassment based on any protected characteristic (race, religion, disability, etc.) is illegal if it's severe or pervasive enough to create a hostile work environment." },
      ],
      relatedToolIds: ["wrongful-termination-checklist", "complaint-letter-generator", "settlement-estimator"],
      relatedTermSlugs: ["liability", "damages", "remedy"],
    },
    {
      slug: "severance-agreements",
      title: "Understanding Severance Packages",
      metaTitle: "Severance Agreements — What You Need to Know | LegallySpoken",
      metaDescription: "Learn what to look for in a severance agreement, what's negotiable, and whether you should sign. Includes common clauses and red flags.",
      content: `<h2>Severance Agreements Explained</h2>
<p>Severance pay is compensation offered when an employee is laid off or terminated. While not legally required in most cases, it's common practice for companies to offer severance in exchange for a release of claims.</p>
<h3>What's Typically Included</h3>
<p><strong>Severance pay:</strong> Usually 1-2 weeks per year of service, but highly negotiable.</p>
<p><strong>Continued benefits:</strong> COBRA coverage, sometimes with the employer paying premiums for a period.</p>
<p><strong>Outplacement services:</strong> Job search assistance and career coaching.</p>
<p><strong>Release of claims:</strong> You agree not to sue the employer — this is the main thing they're paying for.</p>
<h3>What to Negotiate</h3>
<p>The amount of severance, length of benefit continuation, non-compete scope, non-disparagement terms, job reference language, and whether you can collect unemployment.</p>
<h3>Red Flags to Watch For</h3>
<p>Overly broad non-compete clauses, waiver of all future claims (including unknown ones), unreasonable non-disparagement terms, and very short deadlines to sign.</p>`,
      faqs: [
        { question: "Am I legally entitled to severance pay?", answer: "In most cases, no. The FLSA doesn't require severance. However, if your employer has a severance policy, employment contract, or ERISA plan promising severance, they must honor it." },
        { question: "Should I sign a severance agreement immediately?", answer: "No. You typically have 21 days to consider (45 days for group layoffs under the Older Workers Benefit Protection Act). Have an attorney review it before signing." },
      ],
      relatedToolIds: ["severance-pay-calculator", "non-compete-checker", "settlement-estimator"],
      relatedTermSlugs: ["breach", "waiver", "non-compete"],
    },
    {
      slug: "non-compete-agreements",
      title: "Are Non-Competes Enforceable?",
      metaTitle: "Non-Compete Agreements — Are They Enforceable? | LegallySpoken",
      metaDescription: "Learn about non-compete agreement enforceability by state, what makes them valid, and how to challenge an unreasonable non-compete.",
      content: `<h2>Non-Compete Agreements in 2026</h2>
<p>Non-compete agreements restrict employees from working for competitors or starting competing businesses after leaving a job. Their enforceability varies dramatically by state.</p>
<h3>States That Ban Non-Competes</h3>
<p>California, North Dakota, Oklahoma, and Minnesota have effectively banned non-competes for employees. Several other states (Colorado, Illinois, Oregon, Washington) severely restrict them.</p>
<h3>What Makes a Non-Compete Enforceable?</h3>
<p>Courts generally require: (1) reasonable time limits (typically 6-24 months), (2) reasonable geographic scope, (3) protection of a legitimate business interest (trade secrets, client relationships), and (4) adequate consideration (something given in exchange).</p>
<h3>How to Challenge a Non-Compete</h3>
<p>Arguments include: the restrictions are unreasonably broad, no legitimate business interest exists, inadequate consideration was given, you were fired without cause, or the agreement violates state law.</p>`,
      faqs: [
        { question: "Can I be forced to sign a non-compete after I'm already hired?", answer: "In some states, continued employment is sufficient consideration. In others, additional consideration (raise, promotion, bonus) is required. Without it, the non-compete may be unenforceable." },
        { question: "What happens if I violate a non-compete?", answer: "Your former employer can seek an injunction (court order to stop working), sue for damages, and potentially recover attorney's fees. However, enforceability depends on your state and the specific terms." },
      ],
      relatedToolIds: ["non-compete-checker", "nda-fairness-score", "clause-explainer"],
      relatedTermSlugs: ["non-compete", "breach", "injunction"],
    },
    {
      slug: "whistleblower-protections",
      title: "Whistleblower Rights in the US",
      metaTitle: "Whistleblower Protections — Know Your Rights | LegallySpoken",
      metaDescription: "Learn about federal and state whistleblower protection laws. Understand how to report illegal activity and what protections you have.",
      content: `<h2>Whistleblower Protections</h2>
<p>Whistleblower laws protect employees who report illegal or unethical conduct by their employers. Multiple federal and state laws provide these protections.</p>
<h3>Key Federal Whistleblower Laws</h3>
<p><strong>Sarbanes-Oxley Act:</strong> Protects employees of publicly traded companies who report securities fraud.</p>
<p><strong>False Claims Act (qui tam):</strong> Allows private citizens to sue on behalf of the government for fraud. Whistleblowers can receive 15-30% of any recovery.</p>
<p><strong>OSHA whistleblower protections:</strong> Cover employees who report workplace safety violations.</p>
<p><strong>Dodd-Frank Act:</strong> Protects individuals who report securities violations to the SEC. Whistleblowers may receive 10-30% of sanctions over $1 million.</p>
<h3>What Protections Do Whistleblowers Have?</h3>
<p>Protection from retaliation (termination, demotion, harassment), reinstatement, back pay, compensatory damages, and in some cases, financial rewards.</p>`,
      faqs: [
        { question: "Can I be fired for reporting my employer to OSHA?", answer: "No. Federal law prohibits retaliation against employees who report safety violations. If you're fired, you can file a whistleblower complaint with OSHA within 30 days." },
        { question: "Do I need a lawyer to be a whistleblower?", answer: "Not always, but it's highly recommended. Whistleblower cases are complex, and an attorney can help protect your rights and maximize any financial recovery." },
      ],
      relatedToolIds: ["complaint-letter-generator", "wrongful-termination-checklist", "settlement-estimator"],
      relatedTermSlugs: ["good-faith", "breach", "remedy"],
    },
    {
      slug: "wage-theft",
      title: "What to Do About Unpaid Wages",
      metaTitle: "Unpaid Wages & Wage Theft — Your Legal Options | LegallySpoken",
      metaDescription: "Learn about wage theft, unpaid wages, and how to recover money your employer owes you. Covers federal and state remedies.",
      content: `<h2>Wage Theft in America</h2>
<p>Wage theft — when employers fail to pay workers what they're legally owed — costs US workers an estimated $50 billion per year. It's the most common form of theft in the country.</p>
<h3>Common Forms of Wage Theft</h3>
<p><strong>Unpaid overtime:</strong> Not paying time-and-a-half for hours over 40/week.</p>
<p><strong>Minimum wage violations:</strong> Paying below federal ($7.25/hr) or state minimum wage.</p>
<p><strong>Off-the-clock work:</strong> Requiring work before clocking in or after clocking out.</p>
<p><strong>Tip theft:</strong> Employers keeping tips or requiring illegal tip pools.</p>
<p><strong>Final paycheck violations:</strong> Not paying all owed wages upon termination.</p>
<h3>How to Recover Unpaid Wages</h3>
<p>File a complaint with your state labor department or the federal Department of Labor. You can also file a private lawsuit under the FLSA, which allows recovery of double damages (liquidated damages) plus attorney's fees.</p>`,
      faqs: [
        { question: "How far back can I claim unpaid wages?", answer: "Under the FLSA, you can recover unpaid wages for up to 2 years (3 years if the violation was willful). State laws may allow longer lookback periods." },
        { question: "Can I file a class action for wage theft?", answer: "Yes. FLSA collective actions and state class actions are common for wage theft, especially when many employees are affected by the same policy or practice." },
      ],
      relatedToolIds: ["overtime-calculator", "minimum-wage-lookup", "paycheck-calculator"],
      relatedTermSlugs: ["breach", "damages", "class-action"],
    },
    {
      slug: "family-medical-leave",
      title: "FMLA Rights Explained",
      metaTitle: "FMLA — Family and Medical Leave Rights | LegallySpoken",
      metaDescription: "Understand your rights under the Family and Medical Leave Act. Covers eligibility, qualifying reasons, and employer obligations.",
      content: `<h2>Family and Medical Leave Act (FMLA)</h2>
<p>The FMLA entitles eligible employees to up to 12 weeks of unpaid, job-protected leave per year for qualifying family and medical reasons.</p>
<h3>Eligibility Requirements</h3>
<p>You must: (1) work for a covered employer (50+ employees within 75 miles), (2) have worked there for at least 12 months, and (3) have worked at least 1,250 hours in the past 12 months.</p>
<h3>Qualifying Reasons for FMLA Leave</h3>
<p><strong>Birth and care of a newborn:</strong> Both mothers and fathers qualify.</p>
<p><strong>Adoption or foster care placement.</strong></p>
<p><strong>Serious health condition:</strong> Your own or a spouse, child, or parent.</p>
<p><strong>Military family leave:</strong> Qualifying exigency or to care for a covered servicemember.</p>
<h3>Your Rights During FMLA Leave</h3>
<p>Your employer must maintain your health insurance. Upon return, you must be restored to the same or an equivalent position. Retaliation for taking FMLA leave is illegal.</p>`,
      faqs: [
        { question: "Is FMLA leave paid?", answer: "No. FMLA only guarantees unpaid leave. However, employers may require (or allow) you to use accrued paid leave concurrently. Some states have their own paid family leave programs." },
        { question: "Can my employer deny FMLA leave?", answer: "Only if you don't meet eligibility requirements or the reason doesn't qualify. Employers cannot deny eligible FMLA leave and cannot retaliate against employees who take it." },
      ],
      relatedToolIds: ["pto-calculator", "employment-contract-checklist", "wrongful-termination-checklist"],
      relatedTermSlugs: ["breach", "good-faith", "remedy"],
    },
    {
      slug: "unemployment-benefits",
      title: "How to File for Unemployment",
      metaTitle: "Unemployment Benefits — How to File & What to Expect | LegallySpoken",
      metaDescription: "Step-by-step guide to filing for unemployment benefits. Covers eligibility, how much you'll receive, and what to do if denied.",
      content: `<h2>Filing for Unemployment Benefits</h2>
<p>Unemployment insurance provides temporary income to workers who lose their jobs through no fault of their own. Each state administers its own program with different benefit amounts and eligibility rules.</p>
<h3>General Eligibility</h3>
<p>You typically qualify if: (1) you were laid off or terminated without cause, (2) you earned enough wages during a "base period," (3) you're able and available to work, and (4) you're actively seeking employment.</p>
<h3>How to File</h3>
<p>File through your state's unemployment agency (usually online). You'll need: Social Security number, employment history for the past 18 months, reason for separation, and banking information for direct deposit.</p>
<h3>How Much Will You Receive?</h3>
<p>Benefits typically replace about 40-50% of your previous wages, up to a state maximum. Duration is usually 26 weeks, though some states offer less.</p>
<h3>What If You're Denied?</h3>
<p>You have the right to appeal. Common denial reasons include: quitting voluntarily, being fired for misconduct, or not meeting earnings requirements. Appeals hearings are relatively informal but having documentation helps.</p>`,
      faqs: [
        { question: "Can I get unemployment if I quit?", answer: "Generally no, unless you quit for 'good cause' — such as unsafe working conditions, harassment, a significant pay cut, or being asked to do something illegal. Rules vary by state." },
        { question: "Can I work part-time and still get unemployment?", answer: "In most states, yes, but your benefits will be reduced based on your part-time earnings. Each state has different rules for how much you can earn before losing benefits." },
      ],
      relatedToolIds: ["severance-pay-calculator", "paycheck-calculator", "salary-to-hourly-converter"],
      relatedTermSlugs: ["breach", "good-faith", "remedy"],
    },
  ],
};
