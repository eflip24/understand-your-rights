import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function GoverningLawIdentifier() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ governingLaw: string | null; venue: string | null; arbitration: string | null; juryWaiver: boolean; classWaiver: boolean } | null>(null);

  const analyze = () => {
    const gl = text.match(/governed by[^.]{0,200}laws? of[^.]{0,80}/i)?.[0] || text.match(/laws? of (?:the\s)?(?:State|Commonwealth) of [A-Z][a-zA-Z ]+/)?.[0] || null;
    const venue = text.match(/(?:venue|jurisdiction|forum)[^.]{0,200}/i)?.[0]?.slice(0, 200) || null;
    const arb = text.match(/arbitrat[a-z]+[^.]{0,200}/i)?.[0]?.slice(0, 200) || null;
    setResult({
      governingLaw: gl,
      venue,
      arbitration: arb,
      juryWaiver: /waiv[a-z]*\s*(?:any\s*)?(?:right\s*to\s*a?\s*)?jury/i.test(text),
      classWaiver: /class\s*action\s*waiv|no\s*class\s*action/i.test(text),
    });
  };

  return (
    <div className="space-y-4">
      <Textarea placeholder="Paste your contract..." value={text} onChange={(e) => setText(e.target.value)} rows={10} />
      <Button onClick={analyze} disabled={text.trim().length < 30}>Identify Governing Law</Button>
      {result && (
        <Card><CardContent className="p-4 space-y-2 text-sm">
          <p><strong>Governing Law:</strong> {result.governingLaw || "Not found"}</p>
          <p><strong>Venue/Jurisdiction:</strong> {result.venue || "Not found"}</p>
          <p><strong>Arbitration:</strong> {result.arbitration || "Not found"}</p>
          <p><strong>Jury Trial Waiver:</strong> {result.juryWaiver ? "Yes ⚠" : "No"}</p>
          <p><strong>Class Action Waiver:</strong> {result.classWaiver ? "Yes ⚠" : "No"}</p>
        </CardContent></Card>
      )}
    </div>
  );
}
