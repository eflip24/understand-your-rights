import { Card, CardContent } from "@/components/ui/card";

const ROWS = [
  ["Purpose", "Protects confidential information", "Restricts where/for whom you can work"],
  ["What it restricts", "Sharing of secrets", "Future employment & business activities"],
  ["Typical duration", "2–5 years (or perpetual for trade secrets)", "6 months to 2 years (varies by state)"],
  ["Enforceability", "Generally enforceable nationwide", "Limited or banned in CA, ND, OK, MN; restricted FTC rule pending"],
  ["Geographic scope", "Not applicable", "Must be reasonable (city/region typically)"],
  ["Consideration required", "Often included with employment", "Some states require extra pay/promotion"],
  ["Common red flags", "Overly broad definition of 'confidential'", "Worldwide scope, multi-year terms, vague 'industry' bans"],
];

export default function NDAvsNonCompete() {
  return (
    <div className="space-y-4">
      <Card><CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary"><tr><th className="text-left p-3"></th><th className="text-left p-3">NDA</th><th className="text-left p-3">Non-Compete</th></tr></thead>
          <tbody>{ROWS.map((row, i) => (
            <tr key={i} className="border-t"><td className="p-3 font-medium">{row[0]}</td><td className="p-3">{row[1]}</td><td className="p-3">{row[2]}</td></tr>
          ))}</tbody>
        </table>
      </CardContent></Card>
      <p className="text-xs text-muted-foreground italic">An employer may ask you to sign both. NDAs survive employment; non-competes apply after you leave.</p>
    </div>
  );
}
