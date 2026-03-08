import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const baseItems = [
  "Give written notice per lease terms (typically 30-60 days)",
  "Review lease for move-out requirements",
  "Schedule move-out inspection with landlord",
  "Document current condition with photos/video",
  "Patch nail holes and touch up paint",
  "Clean all rooms thoroughly",
  "Clean inside all cabinets and closets",
  "Clean kitchen appliances (oven, fridge, microwave, dishwasher)",
  "Clean bathrooms (toilets, tubs, sinks, mirrors)",
  "Clean all windows inside",
  "Vacuum/mop all floors",
  "Replace any burnt-out light bulbs",
  "Remove all personal belongings",
  "Remove all trash and debris",
  "Return all keys, garage remotes, and access cards",
  "Cancel/transfer utilities",
  "Update mailing address with USPS",
  "Provide forwarding address to landlord for deposit return",
];

const featureItems: Record<string, string[]> = {
  pets: [
    "Deep clean carpets (pet stain treatment)",
    "Clean pet hair from all surfaces",
    "Treat any pet odors",
    "Repair any pet damage (scratches, chew marks)",
    "Clean outdoor areas if applicable",
  ],
  parking: [
    "Clean parking space/garage",
    "Remove oil stains from parking area",
    "Return parking passes or remotes",
  ],
  furnished: [
    "Verify all furniture is present per inventory list",
    "Clean all provided furniture",
    "Report any damaged furniture items",
    "Return furniture to original positions",
  ],
  yard: [
    "Mow lawn and trim edges",
    "Remove weeds from garden beds",
    "Clean patio/deck area",
    "Remove any personal plants or decorations",
    "Coil and store garden hoses",
  ],
  storage: [
    "Empty storage unit completely",
    "Clean storage unit",
    "Return storage keys",
  ],
};

export default function MoveOutChecklistGenerator() {
  const [propertyType, setPropertyType] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleFeature = (f: string) => {
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const allItems = [...baseItems, ...features.flatMap(f => featureItems[f] || [])];
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = allItems.length > 0 ? (checkedCount / allItems.length) * 100 : 0;

  const copyChecklist = () => {
    const text = allItems.map((item, i) => `${checked[item] ? "☑" : "☐"} ${item}`).join("\n");
    navigator.clipboard.writeText(text);
    toast.success("Checklist copied!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Property Type</Label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Property Features (select all that apply)</Label>
          <div className="flex flex-wrap gap-3 mt-2">
            {Object.keys(featureItems).map(f => (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={features.includes(f)} onCheckedChange={() => toggleFeature(f)} />
                <span className="text-sm capitalize">{f}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={() => setGenerated(true)} className="w-full">Generate Checklist</Button>
      {generated && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg">Move-Out Checklist</h3>
              <Button variant="outline" size="sm" onClick={copyChecklist}>Copy</Button>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-muted-foreground">{checkedCount} of {allItems.length} completed ({Math.round(progress)}%)</p>
            <div className="space-y-2">
              {allItems.map(item => (
                <label key={item} className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-muted/50">
                  <Checkbox checked={!!checked[item]} onCheckedChange={() => setChecked(prev => ({ ...prev, [item]: !prev[item] }))} className="mt-0.5" />
                  <span className={`text-sm ${checked[item] ? "line-through text-muted-foreground" : ""}`}>{item}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
