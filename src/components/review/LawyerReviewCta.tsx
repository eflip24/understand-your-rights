import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalizedPath } from "@/i18n/paths";

export default function LawyerReviewCta({ ireland = false }: { ireland?: boolean }) {
  const lp = useLocalizedPath();
  return (
    <div className="mt-6 rounded-lg border border-primary/40 bg-primary/5 p-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
        <div>
          <p className="font-semibold">Have a {ireland ? "solicitor" : "lawyer"} review your agreement</p>
          <p className="text-sm text-muted-foreground">Free AI red-flag summary, then a verified {ireland ? "solicitor" : "lawyer"} at a fixed price.</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button asChild><Link to={lp(ireland ? "/lawyer-review/severance-ireland" : "/lawyer-review/severance")}>Get it reviewed</Link></Button>
        {!ireland && <Button asChild variant="outline"><Link to={lp("/lawyer-review/severance-ireland")}>Ireland</Link></Button>}
      </div>
    </div>
  );
}
