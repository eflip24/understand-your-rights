import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useLocalizedPath } from "@/i18n/paths";

/**
 * Mobile-only sticky bar for /tools/... pages.
 * Appears after the user scrolls past the tool card, giving a quick
 * "Back to tools" + "See related" tap without hunting for links.
 */
export default function ToolStickyMobileCta({
  toolName,
  category,
}: {
  toolName: string;
  category: string;
}) {
  const lp = useLocalizedPath();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Tool quick actions"
    >
      <div className="mx-auto flex max-w-4xl items-center gap-2 px-3 py-2">
        <Link
          to={lp(`/tools/${category}`)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground/80 shadow-sm active:scale-[0.98]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <div className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{toolName}</span>
        </div>
        <Link
          to={lp("/tools")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground shadow-sm active:scale-[0.98]"
        >
          <Sparkles className="h-3.5 w-3.5" /> More tools
        </Link>
      </div>
    </div>
  );
}
