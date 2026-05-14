import { useLocation, useNavigate } from "react-router-dom";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { LOCALE_LABELS, SUPPORTED_LOCALES, type SupportedLocale } from "@/i18n/config";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";
import { buildLocaleUrl } from "@/i18n/paths";
import { cn } from "@/lib/utils";

interface LangSwitcherProps {
  variant?: "navbar" | "footer";
  className?: string;
}

export default function LangSwitcher({ variant = "navbar", className }: LangSwitcherProps) {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const current = useLocaleFromUrl();
  const { t } = useTranslation();

  const onPick = (locale: SupportedLocale) => {
    if (locale === current) return;
    navigate(buildLocaleUrl(locale, pathname, search, hash));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "navbar" ? "sm" : "sm"}
          className={cn(
            "gap-1.5",
            variant === "footer" && "text-primary-foreground/70 hover:text-accent hover:bg-transparent",
            className,
          )}
          aria-label={t("language.switcher", "Language")}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{LOCALE_LABELS[current].native}</span>
          <span className="sm:hidden uppercase">{current}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t("language.switcher", "Language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORTED_LOCALES.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onSelect={() => onPick(loc)}
            className="flex items-center justify-between gap-2 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span aria-hidden="true">{LOCALE_LABELS[loc].flag}</span>
              <span>{LOCALE_LABELS[loc].native}</span>
            </span>
            {loc === current && <Check className="h-4 w-4 text-accent" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
