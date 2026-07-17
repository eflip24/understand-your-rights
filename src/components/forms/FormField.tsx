import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormFieldDef } from "@/data/forms";

interface Props {
  field: FormFieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
  error?: string;
}

/**
 * Renders one FormFieldDef using shadcn primitives with plain-English help
 * text below the label. Kept intentionally dumb — parent owns state.
 */
export default function FormField({ field, value, onChange, error }: Props) {
  const id = `field-${field.id}`;
  const showError = Boolean(error);

  const common = (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {field.label}
        {field.required && <span className="text-destructive ms-1">*</span>}
      </Label>
      {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
    </div>
  );

  const errorNode = showError && (
    <p className="text-xs text-destructive mt-1">{error}</p>
  );

  switch (field.type) {
    case "textarea":
      return (
        <div>
          {common}
          <Textarea
            id={id}
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="mt-1.5"
            rows={4}
          />
          {errorNode}
        </div>
      );
    case "select":
      return (
        <div>
          {common}
          <Select value={(value as string) || ""} onValueChange={onChange}>
            <SelectTrigger id={id} className="mt-1.5">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorNode}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-start gap-2">
          <Checkbox
            id={id}
            checked={Boolean(value)}
            onCheckedChange={(v) => onChange(Boolean(v))}
            className="mt-0.5"
          />
          <div>
            <Label htmlFor={id} className="text-sm cursor-pointer">
              {field.label}
              {field.required && <span className="text-destructive ms-1">*</span>}
            </Label>
            {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
            {errorNode}
          </div>
        </div>
      );
    default: {
      const inputType =
        field.type === "email"
          ? "email"
          : field.type === "date"
          ? "date"
          : field.type === "number"
          ? "number"
          : "text";
      return (
        <div>
          {common}
          <Input
            id={id}
            type={inputType}
            value={(value as string | number | undefined) ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            inputMode={field.type === "ssn" || field.type === "ein" ? "numeric" : undefined}
            className="mt-1.5"
          />
          {errorNode}
        </div>
      );
    }
  }
}
