import { useState } from "react";
import { Scale, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { captureLead, US_STATES } from "@/lib/capture";

export const CLAIM_OPTIONS: { value: string; label: string }[] = [
  { value: "car-accident", label: "Car accident" },
  { value: "truck-accident", label: "Truck accident" },
  { value: "motorcycle-accident", label: "Motorcycle accident" },
  { value: "slip-and-fall", label: "Slip and fall" },
  { value: "medical-malpractice", label: "Medical malpractice" },
  { value: "nursing-home-abuse", label: "Nursing home abuse" },
  { value: "wrongful-death", label: "Wrongful death" },
  { value: "mesothelioma", label: "Mesothelioma / asbestos" },
  { value: "dog-bite", label: "Dog bite" },
  { value: "workers-comp", label: "Workers' compensation" },
  { value: "wrongful-termination", label: "Wrongful termination" },
  { value: "employment", label: "Other employment issue" },
  { value: "insurance-denial", label: "Insurance claim denial" },
  { value: "long-term-disability", label: "Long-term disability" },
  { value: "ssdi", label: "SSDI / SSI" },
  { value: "debt-bankruptcy", label: "Debt or bankruptcy" },
  { value: "family", label: "Family law" },
  { value: "other", label: "Something else" },
];

interface Props {
  /** Pre-selects the dropdown when the form sits under a specific tool or pillar. */
  defaultClaimType?: string;
  defaultStateCode?: string | null;
  /** Carries the calculator's own number through as lead-value signal. */
  estimatedValueCents?: number | null;
  solOpen?: boolean | null;
  toolId?: string;
  heading?: string;
  blurb?: string;
  className?: string;
}

/**
 * Free case-review request.
 *
 * A qualified legal lead is worth far more than the ad impression on the
 * same page, and calculator traffic qualifies itself: the visitor has
 * already told us claim type, state and rough value.
 */
export default function CaseReviewForm({
  defaultClaimType = "other",
  defaultStateCode = null,
  estimatedValueCents = null,
  solOpen = null,
  toolId,
  heading = "Get a free case review",
  blurb = "Tell us what happened and we'll review whether your claim is worth pursuing — no cost, no obligation.",
  className = "mt-8",
}: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stateCode, setStateCode] = useState(defaultStateCode ?? "");
  const [city, setCity] = useState("");
  const [claimType, setClaimType] = useState(defaultClaimType);
  const [incidentDate, setIncidentDate] = useState("");
  const [description, setDescription] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!consent) {
      setError("Please confirm you understand this is not legal advice.");
      return;
    }
    setStatus("sending");
    try {
      await captureLead({
        fullName,
        email,
        consent: true,
        phone: phone || undefined,
        stateCode: stateCode || null,
        city: city || undefined,
        claimType,
        incidentDate: incidentDate || null,
        description: description || undefined,
        estimatedValueCents,
        solOpen,
        toolId,
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
        <CardContent className="flex items-start gap-3 p-6">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div>
            <p className="font-medium">Request received.</p>
            <p className="text-sm text-muted-foreground">
              We've emailed you a confirmation with your reference number. Keep every document
              connected to your claim — records, correspondence, photos and receipts.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className} id="case-review">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-5">
          <Scale className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold leading-tight">{heading}</h2>
            <p className="text-sm text-muted-foreground">{blurb}</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="cr-name">Full name</Label>
              <Input
                id="cr-name"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cr-email">Email</Label>
              <Input
                id="cr-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cr-phone">Phone (optional)</Label>
              <Input
                id="cr-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cr-claim">Type of claim</Label>
              <Select value={claimType} onValueChange={setClaimType}>
                <SelectTrigger id="cr-claim">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {CLAIM_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cr-state">State</Label>
              <Select value={stateCode} onValueChange={setStateCode}>
                <SelectTrigger id="cr-state">
                  <SelectValue placeholder="Choose your state" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {US_STATES.map((s) => (
                    <SelectItem key={s.abbr} value={s.abbr}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cr-city">City (optional)</Label>
              <Input id="cr-city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cr-date">Date it happened (optional)</Label>
              <Input
                id="cr-date"
                type="date"
                max={new Date().toISOString().slice(0, 10)}
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cr-desc">What happened?</Label>
            <Textarea
              id="cr-desc"
              rows={4}
              maxLength={2000}
              placeholder="Injuries, treatment so far, who was involved, what the insurer has said."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Detail matters — the more specific you are, the more useful the review.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="cr-consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
            />
            <Label htmlFor="cr-consent" className="text-xs font-normal leading-snug text-muted-foreground">
              I agree to be contacted by email about this request. I understand LegallySpoken is not
              a law firm, does not provide legal advice, and that submitting this form does not
              create an attorney-client relationship. Statutes of limitations apply to legal claims.
            </Label>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button type="submit" disabled={status === "sending"} size="lg">
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting
              </>
            ) : (
              "Request my free case review"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
