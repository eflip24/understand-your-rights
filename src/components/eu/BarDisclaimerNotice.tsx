import { ShieldAlert } from "lucide-react";
import { BAR_DISCLAIMERS } from "@/data/eu/barDisclaimers";
import type { EuCountryCode } from "@/data/eu/countries";
import type { SupportedLocale } from "@/i18n/config";

interface Props {
  country: EuCountryCode;
  locale: SupportedLocale;
  className?: string;
}

/**
 * Per-country bar association disclaimer notice. Required at top of every
 * EU lawyer directory page to satisfy BRAO §43b (DE), RIN art. 10 (FR),
 * and equivalent professional-publication rules in other EU bars.
 */
export default function BarDisclaimerNotice({ country, locale, className = "" }: Props) {
  const d = BAR_DISCLAIMERS[country];
  if (!d) return null;
  const label = d.barLabel[locale] ?? d.barLabel.en;
  const body = d.body[locale] ?? d.body.en;

  return (
    <aside
      role="note"
      aria-label={label}
      className={`mb-6 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-foreground/85 ${className}`}
    >
      <div className="flex gap-3">
        <ShieldAlert className="h-5 w-5 shrink-0 text-accent mt-0.5" aria-hidden="true" />
        <div>
          <p className="leading-relaxed">{body}</p>
          <a
            href={d.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-accent underline hover:no-underline"
          >
            {label} →
          </a>
        </div>
      </div>
    </aside>
  );
}
