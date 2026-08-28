import { useState } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { captureEstimate, type EstimateLine } from "@/lib/capture";

interface Props {
  /** Only render once the tool has produced a number. */
  show: boolean;
  toolId?: string;
  toolName: string;
  claimType?: string;
  stateCode?: string | null;
  /** One-line plain-English summary of the result. */
  summary?: string;
  lines?: EstimateLine[];
  /** ISO date — when known, the visitor also gets a reminder before it. */
  deadlineDate?: string | null;
  className?: string;
}

/**
 * Post-result email capture.
 *
 * A visitor who calculates a number and leaves is worth one ad impression;
 * one who leaves an email can be brought back to a high-intent page —
 * especially with a real filing deadline attached.
 */
export default function EmailEstimateCapture({
  show,
  toolId,
  toolName,
  claimType,
  stateCode,
  summary,
  lines,
  deadlineDate,
  className = "mt-6",
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  if (!show) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!consent) {
      setError("Please tick the consent box so we can email you.");
      return;
    }
    setStatus("sending");
    try {
      await captureEstimate({
        email,
        consent: true,
        toolId,
        toolName,
        claimType,
        stateCode,
        summary,
        lines,
        deadlineDate,
      });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <Card className={className}>
        <CardContent className="flex items-start gap-3 p-5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div>
            <p className="font-medium">Sent — check your inbox.</p>
            <p className="text-sm text-muted-foreground">
              Your {toolName.toLowerCase()} results are on their way
              {deadlineDate ? `, and we'll remind you before your ${deadlineDate} filing deadline.` : "."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <Mail className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold leading-tight">Email me this estimate</h3>
            <p className="text-sm text-muted-foreground">
              We'll send the full breakdown
              {deadlineDate ? " plus a reminder before your filing deadline expires" : ""}. No spam,
              unsubscribe in one click.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <Button type="submit" disabled={status === "sending"} className="sm:w-auto">
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending
                </>
              ) : (
                "Send my results"
              )}
            </Button>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id={`consent-${toolId ?? "estimate"}`}
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
            />
            <Label
              htmlFor={`consent-${toolId ?? "estimate"}`}
              className="text-xs font-normal leading-snug text-muted-foreground"
            >
              Email me my results and occasional deadline reminders. This is general legal
              information, not legal advice, and does not create an attorney-client relationship.
            </Label>
          </div>

          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </form>
      </CardContent>
    </Card>
  );
}
