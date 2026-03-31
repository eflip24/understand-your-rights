import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

const toolLinks = [
  { label: "All Tools", href: "/tools" },
  { label: "Contract Tools", href: "/tools/contract" },
  { label: "Consumer Tools", href: "/tools/consumer" },
  { label: "Employment Tools", href: "/tools/employment" },
  { label: "Document Generators", href: "/tools/generators" },
  { label: "AI Analysis", href: "/tools/ai" },
];

const guideLinks = [
  { label: "Auto Accident Law", href: "/auto-accident-law" },
  { label: "Personal Injury Law", href: "/personal-injury-law" },
  { label: "Insurance Law", href: "/insurance-law" },
  { label: "Employment Law", href: "/employment-law" },
  { label: "Criminal Law", href: "/criminal-law" },
  { label: "Landlord-Tenant Law", href: "/landlord-tenant-law" },
  { label: "AI & Tech Law", href: "/ai-tech-law" },
];

const resourceLinks = [
  { label: "Legal Terms", href: "/legal-terms" },
  { label: "Legal Clauses", href: "/legal-clauses" },
  { label: "Contract Types", href: "/contract-types" },
  { label: "Find a Lawyer", href: "/lawyer-near-me" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
];

const legalLinks = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-accent" />
              <span className="font-serif text-lg font-bold">
                Legally<span className="text-accent">Spoken</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              Simple legal tools for everyday people. Not a lawyer, not legal advice.
            </p>
          </div>

          {/* Tools */}
          <FooterColumn title="Tools" links={toolLinks} />

          {/* Legal Guides */}
          <FooterColumn title="Legal Guides" links={guideLinks} />

          {/* Resources */}
          <FooterColumn title="Resources" links={resourceLinks} />

          {/* Legal */}
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© {new Date().getFullYear()} LegallySpoken. All rights reserved.</p>
            <p className="text-center md:text-right max-w-md">
              <strong>Disclaimer:</strong> This site provides general legal information, not legal advice. Consult a qualified attorney for specific legal questions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-serif font-semibold mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-primary-foreground/70">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className="hover:text-accent transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
