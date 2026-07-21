import { Globe2 } from "lucide-react";
import { EU_COUNTRIES } from "@/data/euForms";

interface Props {
  value: string;
  onChange: (code: string) => void;
}

/** Compact EU country picker for the /eu-forms hub. Persists selection to
 *  localStorage so it survives navigation. */
export default function EuCountrySelector({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm">
      <Globe2 className="h-4 w-4 text-accent" />
      <label htmlFor="eu-country" className="text-muted-foreground">
        Country:
      </label>
      <select
        id="eu-country"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-none bg-transparent font-medium text-foreground focus:outline-none focus:ring-0"
      >
        {EU_COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
