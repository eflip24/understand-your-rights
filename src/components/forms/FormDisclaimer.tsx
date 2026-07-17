import { AlertTriangle } from "lucide-react";

/**
 * Reusable disclaimer shown on every form page and on the forms hub.
 * Emphasises that LegallySpoken is not a law firm and generated PDFs
 * are self-help templates, not official government forms.
 */
export default function FormDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Not legal advice.</strong> Generated PDFs are self-help templates
        based on the information you enter, not official government forms. Review with a licensed attorney before
        relying on any completed document.
      </p>
    );
  }
  return (
    <aside className="mt-8 rounded-lg border bg-secondary/40 p-4 text-sm text-muted-foreground">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 text-accent mt-0.5" />
        <div className="space-y-2 leading-relaxed">
          <p>
            <strong className="text-foreground">Legal disclaimer.</strong> LegallySpoken is not a law firm and does
            not provide legal advice. The forms on this site are plain-English self-help templates generated from
            the information you enter — they are not official IRS, USCIS, or state-issued documents.
          </p>
          <p>
            Laws vary by state and change over time. Before signing, filing, or relying on any generated PDF,
            review it with a licensed attorney in your jurisdiction.
          </p>
        </div>
      </div>
    </aside>
  );
}
