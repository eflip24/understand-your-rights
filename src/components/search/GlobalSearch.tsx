import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, BookOpen, Calculator, FileText, Gavel, Layers3, MapPinned, Search, Scale } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalizedPath } from "@/i18n/paths";
import { getSearchIndex, groupResults, KIND_LABEL, searchAll, type SearchEntry, type SearchKind } from "@/lib/searchIndex";
import { cn } from "@/lib/utils";

const ICONS: Record<SearchKind, typeof Search> = {
  tool: Calculator,
  guide: BookOpen,
  form: FileText,
  pack: Layers3,
  term: Scale,
  state: MapPinned,
  page: Gavel,
};

interface GlobalSearchProps {
  className?: string;
  compact?: boolean;
}

export default function GlobalSearch({ className, compact = false }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const lp = useLocalizedPath();
  const { t } = useTranslation();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => searchAll(query, 48), [query]);
  const groups = useMemo(() => groupResults(results), [results]);
  const totalIndexed = getSearchIndex().length;

  const openResult = (entry: SearchEntry) => {
    setOpen(false);
    setQuery("");
    navigate(lp(entry.path));
  };

  return (
    <>
      <Button
        type="button"
        variant={compact ? "ghost" : "outline"}
        onClick={() => setOpen(true)}
        className={cn(
          compact ? "h-9 w-9 p-0" : "h-9 w-full justify-between gap-3 border-border bg-secondary/60 px-3 text-muted-foreground hover:bg-secondary hover:text-foreground",
          className,
        )}
        aria-label={t("globalSearch.aria")}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Search className="h-4 w-4 shrink-0" />
          {!compact && <span className="truncate text-sm">{t("globalSearch.trigger")}</span>}
        </span>
        {!compact && <CommandShortcut className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] sm:inline">⌘K</CommandShortcut>}
      </Button>

      {/* Ranking happens in searchIndex.ts, so cmdk's own fuzzy filter is disabled. */}
      <CommandDialog shouldFilter={false} open={open} onOpenChange={(nextOpen) => { setOpen(nextOpen); if (!nextOpen) setQuery(""); }}>
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-serif text-base font-bold text-foreground">{t("globalSearch.title")}</p>
              <p className="text-xs text-muted-foreground">{t("globalSearch.subtitle", { count: totalIndexed })}</p>
            </div>
            <Badge variant="outline" className="hidden shrink-0 sm:inline-flex">{t("globalSearch.badge")}</Badge>
          </div>
        </div>
        <CommandInput value={query} onValueChange={setQuery} placeholder={t("globalSearch.placeholder")} />
        <CommandList className="max-h-[min(60vh,520px)] p-2">
          {!query.trim() ? (
            <CommandEmpty className="py-10">
              <Search className="mx-auto mb-3 h-7 w-7 text-muted-foreground" />
              <p className="font-medium text-foreground">{t("globalSearch.emptyTitle")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("globalSearch.emptyHint")}</p>
            </CommandEmpty>
          ) : (
            <>
              <CommandEmpty>{t("globalSearch.noResults")}</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.kind} heading={KIND_LABEL[group.kind]}>
                  {group.items.map((entry) => {
                    const Icon = ICONS[entry.kind];
                    return (
                      <CommandItem key={entry.id} value={`${entry.title} ${entry.subtitle ?? ""}`} onSelect={() => openResult(entry)} className="gap-3 py-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{entry.title}</span>
                          {entry.subtitle && <span className="mt-0.5 block truncate text-xs text-muted-foreground">{entry.subtitle}</span>}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
