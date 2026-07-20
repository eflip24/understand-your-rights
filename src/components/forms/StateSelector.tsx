import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, MapPin, ShieldCheck } from "lucide-react";
import { US_STATES, PRIORITY_STATES, getStateRules } from "@/data/stateFormRules";

interface Props {
  value?: string;
  onChange: (code: string) => void;
  label?: string;
}

export default function StateSelector({ value, onChange, label = "Select the state where this document will be used" }: Props) {
  const rules = getStateRules(value);
  return (
    <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 space-y-3">
      <div className="flex items-start gap-2">
        <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground">{label}</label>
          <p className="mt-0.5 text-xs text-muted-foreground">
            State law changes notice periods, required clauses, and deposit rules. We cover CA, NY, TX, FL, IL, PA, and OH in depth — other states show general defaults.
          </p>
          <div className="mt-2 max-w-xs">
            <Select value={value ?? ""} onValueChange={onChange}>
              <SelectTrigger><SelectValue placeholder="Choose a state…" /></SelectTrigger>
              <SelectContent className="max-h-72">
                <div className="px-2 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Priority coverage</div>
                {US_STATES.filter((s) => (PRIORITY_STATES as readonly string[]).includes(s.code)).map((s) => (
                  <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                ))}
                <div className="mt-1 px-2 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">All other states</div>
                {US_STATES.filter((s) => !(PRIORITY_STATES as readonly string[]).includes(s.code)).map((s) => (
                  <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {value && (
        <div className="rounded-md border border-border/60 bg-background p-3 text-xs leading-relaxed">
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            {rules.isDefault ? (
              <><AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> Using general defaults for {rules.name}</>
            ) : (
              <><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> {rules.name} — state-specific rules active</>
            )}
          </div>
          <p className="mt-1 text-muted-foreground">
            The document you generate will include the notice periods, disclosures, and clauses required in {rules.name}. Rules shown are general guidance, not legal advice — local ordinances (e.g. rent control, city eviction rules) can add requirements.
          </p>
        </div>
      )}
    </div>
  );
}
