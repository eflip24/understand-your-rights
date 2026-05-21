import { Link } from "react-router-dom";
import { Scale } from "lucide-react";
import { useTranslation } from "react-i18next";
import { openConsentSettings } from "@/lib/consent";
import LangSwitcher from "@/components/layout/LangSwitcher";
import { useLocalizedPath } from "@/i18n/paths";

export default function Footer() {
  const { t } = useTranslation();
  const lp = useLocalizedPath();

  const toolLinks = [
    { label: t("nav.tools.allTools"), href: lp("/tools") },
    { label: t("nav.tools.contract"), href: lp("/tools/contract") },
    { label: t("nav.tools.consumer"), href: lp("/tools/consumer") },
    { label: t("nav.tools.employment"), href: lp("/tools/employment") },
    { label: t("nav.tools.generators"), href: lp("/tools/generators") },
    { label: t("nav.tools.ai"), href: lp("/tools/ai") },
  ];

  const guideLinks = [
    { label: t("nav.guides.auto"), href: lp("/auto-accident-law") },
    { label: t("nav.guides.pi"), href: lp("/personal-injury-law") },
    { label: t("nav.guides.insurance"), href: lp("/insurance-law") },
    { label: t("nav.guides.employment"), href: lp("/employment-law") },
    { label: t("nav.guides.criminal"), href: lp("/criminal-law") },
    { label: t("nav.guides.landlord"), href: lp("/landlord-tenant-law") },
    { label: t("nav.guides.aiTech"), href: lp("/ai-tech-law") },
  ];

  const resourceLinks = [
    { label: t("nav.resources.statutes"), href: lp("/laws") },
    { label: t("nav.resources.terms"), href: lp("/legal-terms") },
    { label: t("nav.resources.clauses"), href: lp("/legal-clauses") },
    { label: t("nav.resources.contracts"), href: lp("/contract-types") },
    { label: t("nav.findLawyer"), href: lp("/lawyer-near-me") },
    { label: "Find a Lawyer (Europe)", href: lp("/lawyer-eu") },
    { label: t("nav.resources.blog"), href: lp("/blog") },
    { label: t("nav.resources.about"), href: lp("/about") },
  ];

  const legalLinks = [
    { label: t("footer.links.disclaimer"), href: lp("/disclaimer") },
    { label: t("footer.links.privacy"), href: lp("/privacy-policy") },
    { label: t("footer.links.terms"), href: lp("/terms-of-service") },
  ];

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <Link to={lp("/")} className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-accent" />
              <span className="font-serif text-lg font-bold">
                Legally<span className="text-accent">Spoken</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70">{t("footer.tagline")}</p>
          </div>

          <FooterColumn title={t("footer.tools")} links={toolLinks} />
          <FooterColumn title={t("footer.guides")} links={guideLinks} />
          <FooterColumn title={t("footer.resources")} links={resourceLinks} />
          <FooterColumn title={t("footer.legal")} links={legalLinks} />
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© {new Date().getFullYear()} LegallySpoken. {t("footer.rights")}</p>
            <div className="flex items-center gap-4">
              <LangSwitcher variant="footer" />
              <button
                type="button"
                onClick={openConsentSettings}
                className="hover:text-accent transition-colors underline"
              >
                {t("footer.cookieSettings")}
              </button>
            </div>
            <p className="text-center md:text-right max-w-md">
              <strong>{t("footer.disclaimer")}</strong> {t("footer.disclaimerBody")}
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
