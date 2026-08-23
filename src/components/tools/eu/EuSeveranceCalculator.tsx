import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import type { EuCountryCode } from "@/data/eu/countries";
import {
  computeSeverance, EU_EMPLOYMENT_COUNTRIES, EU_TOOL_COUNTRY_ORDER,
  type DismissalReason,
} from "@/data/eu/employmentRules";
import { euCountries } from "@/data/eu/countries";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";

interface Props {
  /** Locks the country selector when the page is a country deep link. */
  fixedCountry?: EuCountryCode;
}

const REASONS: { value: DismissalReason; label: string }[] = [
  { value: "economic", label: "Redundancy / economic or objective grounds" },
  { value: "personal", label: "Conduct or capability (disciplinary)" },
  { value: "mutual", label: "Mutual termination / settlement" },
  { value: "unfair", label: "Dismissal I believe was unlawful" },
];

const eur = (n: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function EuSeveranceCalculator({ fixedCountry }: Props) {
  const locale = useLocaleFromUrl();
  const [country, setCountry] = useState<EuCountryCode>(fixedCountry ?? "de");
  const [salary, setSalary] = useState("3200");
  const [years, setYears] = useState("6");
  const [reason, setReason] = useState<DismissalReason>("economic");
  const [contractType, setContractType] = useState<"permanent" | "fixed-term">("permanent");

  const active = fixedCountry ?? country;

  const result = useMemo(
    () =>
      computeSeverance({
        country: active,
        monthlySalary: Math.max(0, Number(salary) || 0),
        years: Math.max(0, Number(years) || 0),
        reason,
        contractType,
      }),
    [active, salary, years, reason, contractType],
  );

  const rules = EU_EMPLOYMENT_COUNTRIES[active];
  const countryName = euCountries.find((c) => c.code === active)?.name[locale] ?? active.toUpperCase();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {!fixedCountry && (
          <div className="space-y-2">
            <Label htmlFor="eu-sev-country">Country of employment</Label>
            <Select value={country} onValueChange={(v) => setCountry(v as EuCountryCode)}>
              <SelectTrigger id="eu-sev-country"><SelectValue /></SelectTrigger>
              <SelectContent>
                {EU_TOOL_COUNTRY_ORDER.map((c) => (
                  <SelectItem key={c} value={c}>
                    {euCountries.find((x) => x.code === c)?.name[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="eu-sev-salary">Gross monthly salary (€)</Label>
          <Input
            id="eu-sev-salary" type="number" min={0} inputMode="decimal"
            value={salary} onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eu-sev-years">Completed years of service</Label>
          <Input
            id="eu-sev-years" type="number" min={0} step="0.5" inputMode="decimal"
            value={years} onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eu-sev-reason">Reason for termination</Label>
          <Select value={reason} onValueChange={(v) => setReason(v as DismissalReason)}>
            <SelectTrigger id="eu-sev-reason"><SelectValue /></SelectTrigger>
            <SelectContent>
              {REASONS.map((r) => (
                <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eu-sev-contract">Contract type</Label>
          <Select value={contractType} onValueChange={(v) => setContractType(v as "permanent" | "fixed-term")}>
            <SelectTrigger id="eu-sev-contract"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="permanent">Permanent (open-ended)</SelectItem>
              <SelectItem value="fixed-term">Fixed-term</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-accent/40 bg-accent/5">
        <CardContent className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            Estimated statutory range — {countryName}
          </p>
          <p className="text-3xl font-bold text-foreground">
            {result.zeroByDefault && result.low === 0 ? eur(0) : eur(result.low)}
            {result.high > result.low && <> – {eur(result.high)}</>}
          </p>
          <p className="text-sm text-foreground/80">
            <span className="font-medium">Formula applied:</span> {result.formula}
          </p>
          <p className="text-xs text-muted-foreground">Legal basis: {result.statute}</p>
        </CardContent>
      </Card>

      {result.notes.length > 0 && (
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
          {result.notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm">
          Estimate only, based on statutory minimums in {countryName} ({rules.severanceStatute}).
          Collective agreements, seniority allowances and negotiated settlements frequently pay more.
          This is general information, not legal advice — have a qualified lawyer review your
          termination letter before you sign anything.
        </AlertDescription>
      </Alert>
    </div>
  );
}
