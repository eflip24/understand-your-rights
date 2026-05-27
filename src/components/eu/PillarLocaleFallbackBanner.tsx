import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import type { EuCountryCode, LocaleCode } from "@/data/eu/countries";

const LANGUAGE_LABEL: Record<EuCountryCode, Record<LocaleCode, string>> = {
  de: { en: "German", de: "Deutsch", fr: "allemand", es: "alemán", it: "tedesco", pt: "alemão" },
  fr: { en: "French", de: "Französisch", fr: "français", es: "francés", it: "francese", pt: "francês" },
  es: { en: "Spanish", de: "Spanisch", fr: "espagnol", es: "español", it: "spagnolo", pt: "espanhol" },
  it: { en: "Italian", de: "Italienisch", fr: "italien", es: "italiano", it: "italiano", pt: "italiano" },
  pt: { en: "Portuguese", de: "Portugiesisch", fr: "portugais", es: "portugués", it: "portoghese", pt: "português" },
};

interface Props {
  country: EuCountryCode;
  countryName: string;
  locale: LocaleCode;
  /** When true, suppress the banner — every field has a localised value. */
  fullyLocalized?: boolean;
}

/**
 * Shown on EU country pillar pages when the active locale is neither English
 * nor the country's own language AND at least one field still falls back to
 * English. Post-B8 this rarely fires.
 */
export default function PillarLocaleFallbackBanner({ country, countryName, locale, fullyLocalized }: Props) {
  const { t } = useTranslation("eu-lawyer");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;
  if (locale === "en" || locale === country) return null;
  if (fullyLocalized) return null;

  const language = LANGUAGE_LABEL[country][locale];

  return (
    <div className="bg-muted border border-border rounded-md mb-6">
      <div className="px-4 py-2 flex items-start justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t("pillarLocaleFallback", {
            country: countryName,
            language,
            defaultValue:
              "Detailed guidance for {{country}} is currently shown in English. Native {{language}} translations are on the way.",
          })}
        </p>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
