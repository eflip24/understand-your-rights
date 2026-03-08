import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function BusinessNameChecker() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<null | { checks: { label: string; status: "pass" | "warn" | "fail"; note: string }[] }>(null);

  const check = () => {
    if (!name.trim()) return;
    const n = name.trim();
    const checks: { label: string; status: "pass" | "warn" | "fail"; note: string }[] = [];

    // Length check
    if (n.length <= 3) checks.push({ label: "Name Length", status: "warn", note: "Very short names may be hard to trademark and remember." });
    else if (n.length > 50) checks.push({ label: "Name Length", status: "warn", note: "Very long names are harder for customers to remember." });
    else checks.push({ label: "Name Length", status: "pass", note: `${n.length} characters — good length.` });

    // Special characters
    const specialChars = /[^a-zA-Z0-9\s&'-]/;
    if (specialChars.test(n)) checks.push({ label: "Special Characters", status: "warn", note: "Contains unusual characters that may cause issues with registration." });
    else checks.push({ label: "Special Characters", status: "pass", note: "No problematic special characters." });

    // Common entity suffixes
    const hasSuffix = /(LLC|Inc|Corp|Ltd|Co|LP|LLP|PC|PLLC)\.?$/i.test(n);
    if (hasSuffix) checks.push({ label: "Entity Suffix", status: "pass", note: "Includes a business entity suffix." });
    else checks.push({ label: "Entity Suffix", status: "warn", note: "Consider adding LLC, Inc, Corp, or Ltd depending on your entity type." });

    // Generic terms
    const genericTerms = ["the", "best", "top", "first", "great", "good", "super", "mega", "ultra"];
    const words = n.toLowerCase().split(/\s+/);
    const hasGeneric = words.some(w => genericTerms.includes(w));
    if (hasGeneric) checks.push({ label: "Uniqueness", status: "warn", note: "Contains generic terms that may make trademarking difficult." });
    else checks.push({ label: "Uniqueness", status: "pass", note: "No overly generic terms detected." });

    // Domain potential
    const domainName = n.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (domainName.length > 20) checks.push({ label: "Domain Potential", status: "warn", note: `"${domainName}.com" would be ${domainName.length} characters — consider shorter.` });
    else checks.push({ label: "Domain Potential", status: "pass", note: `"${domainName}.com" — ${domainName.length} characters, good for a domain.` });

    // Trademark search tip
    checks.push({ label: "Trademark Search", status: "warn", note: "Search the USPTO TESS database (tess2.uspto.gov) to check for existing trademarks." });

    setResult({ checks });
  };

  const statusIcon = (s: string) => s === "pass" ? "✅" : s === "warn" ? "⚠️" : "❌";

  return (
    <div className="space-y-6">
      <div>
        <Label>Business Name</Label>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Acme Solutions LLC" className="mt-1" />
      </div>
      <Button onClick={check} className="w-full">Check Business Name</Button>
      {result && (
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="font-serif font-bold text-lg">Name Analysis: "{name}"</h3>
            {result.checks.map((c, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <span className="text-lg">{statusIcon(c.status)}</span>
                <div>
                  <p className="font-medium text-sm">{c.label}</p>
                  <p className="text-sm text-muted-foreground">{c.note}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
