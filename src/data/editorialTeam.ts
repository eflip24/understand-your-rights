/**
 * Editorial team metadata.
 *
 * IMPORTANT: These are real operational roles, not invented attorney
 * credentials. LegallySpoken is a self-help legal information platform,
 * not a law firm. We do not hold out any team member as providing legal
 * advice or representation.
 */

export interface EditorialRole {
  id: string;
  name: string;
  role: string;
  bio: string;
  focusAreas?: string[];
  joinedAt: string; // ISO date
}

export const editorialTeam: EditorialRole[] = [
  {
    id: "editor-in-chief",
    name: "LegallySpoken Editorial Team",
    role: "Editor-in-Chief",
    bio:
      "Oversees content accuracy, editorial standards, and the review pipeline for every guide, calculator, and form on LegallySpoken.",
    focusAreas: ["Editorial policy", "Content quality", "Legal research standards"],
    joinedAt: "2024-01-15",
  },
  {
    id: "senior-legal-researcher",
    name: "Senior Legal Researcher",
    role: "Legal Research Lead",
    bio:
      "Verifies statutes, deadlines, and procedural rules against primary sources and state court rules before publication.",
    focusAreas: ["Statutes of limitations", "State procedural rules", "Court forms"],
    joinedAt: "2024-03-10",
  },
  {
    id: "consumer-finance-editor",
    name: "Consumer Finance Editor",
    role: "Finance & Debt Researcher",
    bio:
      "Reviews bankruptcy, debt settlement, tax, and fee-transparency content for clarity and current regulatory accuracy.",
    focusAreas: ["Bankruptcy", "Debt settlement", "Taxability of settlements"],
    joinedAt: "2024-05-22",
  },
  {
    id: "personal-injury-editor",
    name: "Personal Injury Editor",
    role: "PI & Insurance Researcher",
    bio:
      "Specializes in personal injury, auto insurance, workers' compensation, and mass-tort research and fact-checking.",
    focusAreas: ["Personal injury", "Insurance claims", "Workers' compensation"],
    joinedAt: "2024-06-14",
  },
  {
    id: "forms-compliance-editor",
    name: "Forms Compliance Editor",
    role: "Forms & E-Signature Lead",
    bio:
      "Audits fillable forms against official government editions and tracks state-specific signing and notarization requirements.",
    focusAreas: ["Court forms", "E-signatures", "Notarization rules"],
    joinedAt: "2024-08-01",
  },
];

export function getEditorialRole(id: string): EditorialRole | undefined {
  return editorialTeam.find((m) => m.id === id);
}

export function getDefaultAuthor(): EditorialRole {
  return editorialTeam[0];
}

export const editorialProcess = {
  steps: [
    {
      label: "Research",
      body:
        "Every article starts with primary-source research: state statutes, federal regulations, court rules, and official government forms.",
    },
    {
      label: "Draft",
      body:
        "Content is drafted in plain English with worked examples, data tables, and citations to statutes or official sources.",
    },
    {
      label: "Review",
      body:
        "A subject-area editor checks legal accuracy, updates deadlines and dollar amounts, and flags claims that need additional sourcing.",
    },
    {
      label: "Disclose",
      body:
        "We clearly label AI-assisted drafting, note when a page has not been reviewed by a licensed attorney, and date every review.",
    },
    {
      label: "Refresh",
      body:
        "High-traffic pages are re-reviewed quarterly; statutory or fee changes trigger immediate updates.",
    },
  ],
  aiDisclosure:
    "LegallySpoken uses AI-assisted drafting tools to speed up first drafts and translation. A human editor reviews, fact-checks, and approves every published page.",
};
