import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, Scale, LogOut, LayoutDashboard, LogIn, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminRole } from "@/hooks/useAdminRole";
import { cn } from "@/lib/utils";

const toolsLinks = [
  { label: "All Tools", href: "/tools" },
  { label: "Contract Tools", href: "/tools/contract" },
  { label: "Consumer Tools", href: "/tools/consumer" },
  { label: "Employment Tools", href: "/tools/employment" },
  { label: "Document Generators", href: "/tools/generators" },
  { label: "AI Analysis", href: "/tools/ai" },
  { label: "Business Tools", href: "/tools/business" },
  { label: "Finance Tools", href: "/tools/finance" },
  { label: "Real Estate Tools", href: "/tools/realestate" },
  { label: "Energy Tools", href: "/tools/energy" },
];

const guidesLinks = [
  { label: "Auto Accident Law", href: "/auto-accident-law" },
  { label: "Personal Injury Law", href: "/personal-injury-law" },
  { label: "Insurance Law", href: "/insurance-law" },
  { label: "Employment Law", href: "/employment-law" },
  { label: "Criminal Law", href: "/criminal-law" },
  { label: "Landlord-Tenant Law", href: "/landlord-tenant-law" },
  { label: "AI & Tech Law", href: "/ai-tech-law" },
];

const resourcesLinks = [
  { label: "Legal Terms", href: "/legal-terms" },
  { label: "Legal Clauses", href: "/legal-clauses" },
  { label: "Contract Types", href: "/contract-types" },
  { label: "Blog", href: "/blog" },
];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="w-full px-6 flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Scale className="w-[28px] h-[28px] text-accent" />
          <span className="font-serif text-xl font-bold text-foreground">
            Legally<span className="text-accent">Spoken</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground">Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2">
                  {toolsLinks.map((link) => (
                    <NavDropdownItem key={link.href} href={link.href} label={link.label} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground">Guides</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] gap-1 p-3">
                  {guidesLinks.map((link) => (
                    <NavDropdownItem key={link.href} href={link.href} label={link.label} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground">Resources</NavigationMenuTrigger>
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
                to="/local-lawyers"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Find a Lawyer
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 max-w-xs w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-secondary border-none"
            />
          </div>
        </form>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin" className="gap-1.5">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard" className="gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1.5 text-muted-foreground">
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login" className="gap-1.5">
                <LogIn className="h-4 w-4" />
                Log in
              </Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetTitle className="font-serif text-lg">Menu</SheetTitle>
                <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </form>
                <nav className="mt-6 flex flex-col gap-1">
                  <MobileAccordion title="Tools" links={toolsLinks} onClose={() => setMobileOpen(false)} />
                  <MobileAccordion title="Guides" links={guidesLinks} onClose={() => setMobileOpen(false)} />
                  <MobileAccordion title="Resources" links={resourcesLinks} onClose={() => setMobileOpen(false)} />
                  <Link
                    to="/local-lawyers"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                  >
                    Find a Lawyer
                  </Link>

                  <div className="border-t border-border my-2" />
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setMobileOpen(false)}
                          className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary flex items-center gap-2"
                        >
                          <Shield className="h-4 w-4" />
                          Admin
                        </Link>
                      )}
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary flex items-center gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { handleSignOut(); setMobileOpen(false); }}
                        className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary flex items-center gap-2 text-left w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-3 text-sm font-medium text-accent hover:text-foreground transition-colors rounded-md hover:bg-secondary flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Log in
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
        <div className="ml-3 border-l border-border pl-3 flex flex-col gap-0.5">
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
