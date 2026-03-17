export interface PracticeArea {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  relatedPillarPath?: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: "personal-injury",
    title: "Personal Injury Lawyers Near Me",
    shortTitle: "Personal Injury",
    metaTitle: "Find a Personal Injury Lawyer Near You | LegallySpoken",
    metaDescription: "Browse personal injury lawyers near you. Compare ratings, read reviews, and get free consultations.",
    description: "Personal injury lawyers help victims of accidents, medical malpractice, and other negligence recover compensation for injuries, lost wages, and pain and suffering.",
    relatedPillarPath: "/personal-injury-law",
  },
  {
    slug: "car-accident",
    title: "Car Accident Lawyers Near Me",
    shortTitle: "Car Accident",
    metaTitle: "Find a Car Accident Lawyer Near You | LegallySpoken",
    metaDescription: "Browse car accident lawyers near you. Compare ratings, read reviews, and get free consultations.",
    description: "Car accident lawyers specialize in helping crash victims navigate insurance claims, establish fault, and pursue maximum compensation for injuries and property damage.",
    relatedPillarPath: "/auto-accident-law",
  },
  {
    slug: "workers-compensation",
    title: "Workers Compensation Lawyers",
    shortTitle: "Workers' Comp",
    metaTitle: "Find a Workers' Compensation Lawyer Near You | LegallySpoken",
    metaDescription: "Browse workers' compensation lawyers near you. Get help with workplace injury claims and denied benefits.",
    description: "Workers' compensation lawyers help injured employees navigate the claims process, appeal denied benefits, and pursue third-party claims when applicable.",
  },
  {
    slug: "employment",
    title: "Employment Lawyers Near Me",
    shortTitle: "Employment",
    metaTitle: "Find an Employment Lawyer Near You | LegallySpoken",
    metaDescription: "Browse employment lawyers near you. Get help with wrongful termination, discrimination, wage disputes, and more.",
    description: "Employment lawyers handle workplace disputes including wrongful termination, discrimination, harassment, wage theft, and contract violations.",
  },
  {
    slug: "insurance-dispute",
    title: "Insurance Dispute Lawyers",
    shortTitle: "Insurance Dispute",
    metaTitle: "Find an Insurance Dispute Lawyer Near You | LegallySpoken",
    metaDescription: "Browse insurance dispute lawyers near you. Get help with denied claims, bad faith, and coverage disputes.",
    description: "Insurance dispute lawyers help policyholders fight denied claims, bad faith practices, and coverage disputes with auto, health, home, and life insurance companies.",
    relatedPillarPath: "/insurance-law",
  },
  {
    slug: "real-estate",
    title: "Real Estate Lawyers Near Me",
    shortTitle: "Real Estate",
    metaTitle: "Find a Real Estate Lawyer Near You | LegallySpoken",
    metaDescription: "Browse real estate lawyers near you. Get help with property transactions, disputes, and lease issues.",
    description: "Real estate lawyers assist with property purchases, sales, lease disputes, title issues, zoning matters, and landlord-tenant conflicts.",
  },
  {
    slug: "family-law",
    title: "Family Law Attorneys",
    shortTitle: "Family Law",
    metaTitle: "Find a Family Law Attorney Near You | LegallySpoken",
    metaDescription: "Browse family law attorneys near you. Get help with divorce, custody, support, and adoption.",
    description: "Family law attorneys handle divorce, child custody, child support, spousal support, adoption, prenuptial agreements, and domestic violence cases.",
  },
  {
    slug: "bankruptcy",
    title: "Bankruptcy Lawyers Near Me",
    shortTitle: "Bankruptcy",
    metaTitle: "Find a Bankruptcy Lawyer Near You | LegallySpoken",
    metaDescription: "Browse bankruptcy lawyers near you. Get help with Chapter 7, Chapter 13, and debt relief options.",
    description: "Bankruptcy lawyers guide individuals and businesses through Chapter 7, Chapter 13, and Chapter 11 filings, helping manage debt and protect assets.",
  },
  {
    slug: "criminal-defense",
    title: "Criminal Defense Lawyers",
    shortTitle: "Criminal Defense",
    metaTitle: "Find a Criminal Defense Lawyer Near You | LegallySpoken",
    metaDescription: "Browse criminal defense lawyers near you. Get help with misdemeanors, felonies, DUI, and more.",
    description: "Criminal defense lawyers represent individuals charged with crimes, from misdemeanors to felonies, ensuring their rights are protected throughout the legal process.",
  },
  {
    slug: "immigration",
    title: "Immigration Lawyers Near Me",
    shortTitle: "Immigration",
    metaTitle: "Find an Immigration Lawyer Near You | LegallySpoken",
    metaDescription: "Browse immigration lawyers near you. Get help with visas, green cards, citizenship, and deportation defense.",
    description: "Immigration lawyers help with visa applications, green card petitions, citizenship, asylum claims, deportation defense, and employer-sponsored immigration.",
  },
  {
    slug: "truck-accident",
    title: "Truck Accident Lawyers Near Me",
    shortTitle: "Truck Accident",
    metaTitle: "Find a Truck Accident Lawyer Near You | LegallySpoken",
    metaDescription: "Browse truck accident lawyers near you. Get specialized help with commercial trucking accident claims and federal regulation violations.",
    description: "Truck accident lawyers specialize in commercial vehicle crashes involving semi-trucks, 18-wheelers, and delivery trucks. They understand federal trucking regulations and how to pursue claims against trucking companies.",
    relatedPillarPath: "/auto-accident-law",
  },
  {
    slug: "medical-malpractice",
    title: "Medical Malpractice Lawyers Near Me",
    shortTitle: "Medical Malpractice",
    metaTitle: "Find a Medical Malpractice Lawyer Near You | LegallySpoken",
    metaDescription: "Browse medical malpractice lawyers near you. Get help with surgical errors, misdiagnosis, birth injuries, and medication mistakes.",
    description: "Medical malpractice lawyers help patients harmed by healthcare provider negligence. They handle cases involving surgical errors, misdiagnosis, delayed treatment, birth injuries, and medication errors.",
    relatedPillarPath: "/personal-injury-law",
  },
];

export const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming",
];

export function stateToSlug(state: string): string {
  return state.toLowerCase().replace(/\s+/g, "-");
}
