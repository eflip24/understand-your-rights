import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

/**
 * Banner shown on Tier-3 (English-only) pages when the user is on a non-EN locale.
 * Explains that the content is only available in English.
 */
export default function EnglishOnlyBanner() {
  const { t, i18n } = useTranslation();
  const [dismissed, setDismissed] = useState(false);
  const isNonEn = (i18n.language || "en").split("-")[0] !== "en";
  if (!isNonEn || dismissed) return null;
  return (
    <div className="bg-muted border-b border-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t("page.englishOnlyNotice", {
            defaultValue: "This guide is currently available in English only.",
          })}
        </p>
        <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
