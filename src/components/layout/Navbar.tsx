import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Search, Scale, LogOut, LayoutDashboard, LogIn, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LangSwitcher from "@/components/layout/LangSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminRole } from "@/hooks/useAdminRole";
import { useLocalizedPath } from "@/i18n/paths";
import { cn } from "@/lib/utils";

function NavDropdownItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          onClick={onClick}
          className="block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10"
        >
          {label}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminRole();
  const { t } = useTranslation();
  const lp = useLocalizedPath();

  const toolsLinks = [
    { label: t("nav.tools.allTools"), href: lp("/tools") },
    { label: t("nav.tools.contract"), href: lp("/tools/contract") },
    { label: t("nav.tools.consumer"), href: lp("/tools/consumer") },
    { label: t("nav.tools.employment"), href: lp("/tools/employment") },
    { label: t("nav.tools.generators"), href: lp("/tools/generators") },
    { label: t("nav.tools.ai"), href: lp("/tools/ai") },
    { label: t("nav.tools.business"), href: lp("/tools/business") },
    { label: t("nav.tools.finance"), href: lp("/tools/finance") },
    { label: t("nav.tools.realestate"), href: lp("/tools/realestate") },
    { label: t("nav.tools.energy"), href: lp("/tools/energy") },
  ];

  const guidesLinks = [
    { label: t("nav.guides.auto"), href: lp("/auto-accident-law") },
    { label: t("nav.guides.pi"), href: lp("/personal-injury-law") },
    { label: t("nav.guides.insurance"), href: lp("/insurance-law") },
    { label: t("nav.guides.employment"), href: lp("/employment-law") },
    { label: t("nav.guides.criminal"), href: lp("/criminal-law") },
    { label: t("nav.guides.landlord"), href: lp("/landlord-tenant-law") },
    { label: t("nav.guides.aiTech"), href: lp("/ai-tech-law") },
  ];

  const resourcesLinks = [
    { label: t("nav.resources.terms"), href: lp("/legal-terms") },
    { label: t("nav.resources.clauses"), href: lp("/legal-clauses") },
    { label: t("nav.resources.contracts"), href: lp("/contract-types") },
    { label: t("nav.resources.blog"), href: lp("/blog") },
    { label: t("nav.resources.about"), href: lp("/about") },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${lp("/tools")}?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate(lp("/"));
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="w-full px-3 sm:px-6 flex h-14 items-center justify-between gap-2 sm:gap-4">
        <Link to={lp("/")} className="flex items-center gap-2 shrink-0 min-w-0">
          <Scale className="w-7 h-7 text-accent shrink-0" />
          <span className="font-serif text-lg sm:text-xl font-bold text-foreground truncate">
            Legally<span className="text-accent">Spoken</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground">{t("nav.tools")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2">
                  {toolsLinks.map((link) => (
                    <NavDropdownItem key={link.href} href={link.href} label={link.label} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground">{t("nav.guides")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] gap-1 p-3">
                  {guidesLinks.map((link) => (
                    <NavDropdownItem key={link.href} href={link.href} label={link.label} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground">{t("nav.resources")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[240px] gap-1 p-3">
                  {resourcesLinks.map((link) => (
                    <NavDropdownItem key={link.href} href={link.href} label={link.label} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to={lp("/forms")}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Forms
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to={lp("/eu-forms")}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                EU Forms
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to={lp("/lawyer-near-me")}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("nav.findLawyer")}
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 max-w-xs w-full">
          <div className="relative w-full">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("nav.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 h-9 bg-secondary border-none"
            />
          </div>
        </form>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to={lp("/admin")} className="gap-1.5">
                    <Shield className="h-4 w-4" />
                    {t("nav.admin")}
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to={lp("/dashboard")} className="gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  {t("nav.dashboard")}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5 text-muted-foreground">
                <LogOut className="h-4 w-4" />
                {t("nav.logOut")}
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to={lp("/login")} className="gap-1.5">
                <LogIn className="h-4 w-4" />
                {t("nav.logIn")}
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          <div className="hidden sm:block">
            <LangSwitcher variant="navbar" />
          </div>
          <ThemeToggle />

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t("nav.menu")}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetTitle className="font-serif text-lg">{t("nav.menu")}</SheetTitle>
                <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="mt-4">
                  <div className="relative">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("nav.search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ps-9"
                    />
                  </div>
                </form>
                <div className="mt-4 sm:hidden">
                  <LangSwitcher variant="navbar" />
                </div>
                <nav className="mt-6 flex flex-col gap-1">
                  <MobileAccordion title={t("nav.tools")} links={toolsLinks} onClose={() => setMobileOpen(false)} />
                  <MobileAccordion title={t("nav.guides")} links={guidesLinks} onClose={() => setMobileOpen(false)} />
                  <MobileAccordion title={t("nav.resources")} links={resourcesLinks} onClose={() => setMobileOpen(false)} />
                  <Link
                    to={lp("/forms")}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                  >
                    Forms
                  </Link>
                  <Link
                    to={lp("/eu-forms")}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                  >
                    EU Forms
                  </Link>
                  <Link
                    to={lp("/lawyer-near-me")}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                  >
                    {t("nav.findLawyer")}
                  </Link>

                  <div className="border-t border-border my-2" />
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          to={lp("/admin")}
                          onClick={() => setMobileOpen(false)}
                          className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary flex items-center gap-2"
                        >
                          <Shield className="h-4 w-4" />
                          {t("nav.admin")}
                        </Link>
                      )}
                      <Link
                        to={lp("/dashboard")}
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary flex items-center gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        {t("nav.dashboard")}
                      </Link>
                      <button
                        onClick={() => { handleSignOut(); setMobileOpen(false); }}
                        className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary flex items-center gap-2 text-left w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        {t("nav.logOut")}
                      </button>
                    </>
                  ) : (
                    <Link
                      to={lp("/login")}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-3 text-sm font-medium text-accent hover:text-foreground transition-colors rounded-md hover:bg-secondary flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      {t("nav.logIn")}
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileAccordion({ title, links, onClose }: { title: string; links: { label: string; href: string }[]; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors">
        {title}
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ms-3 border-s border-border ps-3 flex flex-col gap-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
