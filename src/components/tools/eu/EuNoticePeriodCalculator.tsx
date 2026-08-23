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
import { euCountries } from "@/data/eu/countries";
import {
  addDays, computeNotice, EU_EMPLOYMENT_COUNTRIES, EU_TOOL_COUNTRY_ORDER,
} from "@/data/eu/employmentRules";
import { useLocaleFromUrl } from "@/i18n/LocaleSync";

interface Props {
  fixedCountry?: EuCountryCode;
}

const eur = (n: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function EuNoticePeriodCalculator({ fixedCountry }: Props) {
  const locale = useLocaleFromUrl();
  const [country, setCountry] = useState<EuCountryCode>(fixedCountry ?? "de");
  const [years, setYears] = useState("6");
  const [side, setSide] = useState<"employer" | "employee">("employer");
  const [salary, setSalary] = useState("3200");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [override, setOverride] = useState("");

  const active = fixedCountry ?? country;

  const result = useMemo(
    () =>
      computeNotice(
        {
          country: active,
          years: Math.max(0, Number(years) || 0),
          byEmployer: side === "employer",
          overrideDays: override ? Math.max(0, Number(override) || 0) : undefined,
        },
        Math.max(0, Number(salary) || 0),
      ),
    [active, years, side, salary, override],
  );

  const endDate = startDate ? addDays(startDate, result.days) : "";
  const rules = EU_EMPLOYMENT_COUNTRIES[active];
  const countryName = euCountries.find((c) => c.code === active)?.name[locale] ?? active.toUpperCase();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {!fixedCountry && (
          <div className="space-y-2">
            <Label htmlFor="eu-not-country">Country of employment</Label>
            <Select value={country} onValueChange={(v) => setCountry(v as EuCountryCode)}>
              <SelectTrigger id="eu-not-country"><SelectValue /></SelectTrigger>
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
          <Label htmlFor="eu-not-side">Who is terminating?</Label>
          <Select value={side} onValueChange={(v) => setSide(v as "employer" | "employee")}>
            <SelectTrigger id="eu-not-side"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="employer">Employer (dismissal)</SelectItem>
              <SelectItem value="employee">Employee (resignation)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eu-not-years">Completed years of service</Label>
          <Input
            id="eu-not-years" type="number" min={0} step="0.5" inputMode="decimal"
            value={years} onChange={(e) => setYears(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eu-not-salary">Gross monthly salary (€)</Label>
          <Input
            id="eu-not-salary" type="number" min={0} inputMode="decimal"
            value={salary} onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eu-not-start">Notice served on</Label>
          <Input
            id="eu-not-start" type="date"
            value={startDate} onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eu-not-override">Collective agreement notice (days, optional)</Label>
          <Input
            id="eu-not-override" type="number" min={0} inputMode="numeric"
            placeholder="e.g. 90"
            value={override} onChange={(e) => setOverride(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-accent/40 bg-accent/5">
        <CardContent className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground">Statutory notice period — {countryName}</p>
          <p className="text-3xl font-bold text-foreground">{result.label}</p>
          <div className="grid gap-2 sm:grid-cols-2 text-sm text-foreground/80">
            <p><span className="font-medium">Calendar days:</span> {result.days}</p>
            {endDate && <p><span className="font-medium">Last working day:</span> {endDate}</p>}
            {typeof result.payInLieu === "number" && (
              <p><span className="font-medium">Pay in lieu equivalent:</span> {eur(result.payInLieu)}</p>
            )}
          </div>
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
          Indicative only. Notice in {countryName} is set by {rules.noticeStatute} and can be extended by
          your contract or the applicable collective agreement. Deadlines for challenging a dismissal are
          short — check them before the notice period runs out.
        </AlertDescription>
      </Alert>
    </div>
  );
}
