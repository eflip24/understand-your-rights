import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const businessTypes: Record<string, string[]> = {
  "Freelance/Consulting": ["Software/Subscriptions", "Home Office", "Internet/Phone", "Professional Development", "Marketing/Advertising", "Travel", "Meals (Business)", "Insurance", "Legal/Accounting", "Office Supplies"],
  "Retail/E-commerce": ["Inventory/COGS", "Shipping/Packaging", "Platform Fees", "Marketing/Advertising", "Rent/Lease", "Utilities", "Insurance", "POS/Software", "Employee Wages", "Returns/Refunds"],
  "Restaurant/Food Service": ["Food/Ingredients", "Beverages", "Rent/Lease", "Utilities", "Employee Wages", "Equipment/Maintenance", "Licenses/Permits", "Insurance", "Marketing", "Cleaning/Supplies"],
  "Professional Services": ["Rent/Office Space", "Employee Wages", "Software/Technology", "Insurance", "Marketing/Advertising", "Travel", "Professional Development", "Office Supplies", "Legal/Accounting", "Utilities"],
  "Construction/Trades": ["Materials/Supplies", "Equipment Rental", "Vehicle Expenses", "Insurance", "Licenses/Permits", "Subcontractor Payments", "Employee Wages", "Tools", "Fuel", "Safety Equipment"],
};

export default function BusinessExpenseTracker() {
  const [businessType, setBusinessType] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [result, setResult] = useState("");

  const categories = businessType ? businessTypes[businessType] || [] : [];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const generate = () => {
    const cats = selectedCategories.length > 0 ? selectedCategories : categories;
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" });
    const template = `BUSINESS EXPENSE TRACKING TEMPLATE
Business Type: ${businessType}
Period: ${today}
${"=".repeat(60)}

${cats.map((cat, i) => `${i + 1}. ${cat}
   Date        | Description              | Amount    | Receipt?
   ------------|--------------------------|-----------|--------
   ___/___/___ | ________________________ | $________ | ☐
   ___/___/___ | ________________________ | $________ | ☐
   ___/___/___ | ________________________ | $________ | ☐
   ___/___/___ | ________________________ | $________ | ☐
   ___/___/___ | ________________________ | $________ | ☐
   Subtotal:                              | $________
`).join("\n")}
${"=".repeat(60)}
MONTHLY SUMMARY
${cats.map(cat => `  ${cat}: $________`).join("\n")}
  
  TOTAL EXPENSES: $________

NOTES:
- Keep all receipts for expenses over $75
- Mileage rate for ${new Date().getFullYear()}: $0.67/mile (IRS standard)
- Consult your accountant for deduction eligibility
`;
    setResult(template);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Template copied!");
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Business Type</Label>
        <Select value={businessType} onValueChange={v => { setBusinessType(v); setSelectedCategories([]); }}>
          <SelectTrigger><SelectValue placeholder="Select business type" /></SelectTrigger>
          <SelectContent>{Object.keys(businessTypes).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {categories.length > 0 && (
        <div>
          <Label>Expense Categories (select to customize, or leave all for full template)</Label>
          <div className="grid gap-2 mt-2 sm:grid-cols-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-muted/50">
                <Checkbox checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleCategory(cat)} />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <Button onClick={generate} className="w-full" disabled={!businessType}>Generate Expense Template</Button>
      {result && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end mb-2"><Button variant="outline" size="sm" onClick={copy}>Copy</Button></div>
            <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-4 rounded-lg overflow-auto max-h-[500px]">{result}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
