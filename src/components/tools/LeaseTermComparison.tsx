import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaseData {
  rent: string;
  deposit: string;
  termMonths: string;
  utilities: string;
  petDeposit: string;
  parking: string;
  laundry: string;
}

const empty: LeaseData = { rent: "", deposit: "", termMonths: "", utilities: "", petDeposit: "", parking: "", laundry: "" };

export default function LeaseTermComparison() {
  const [a, setA] = useState<LeaseData>({ ...empty });
  const [b, setB] = useState<LeaseData>({ ...empty });
  const [compared, setCompared] = useState(false);

  const update = (setter: React.Dispatch<React.SetStateAction<LeaseData>>, field: keyof LeaseData, val: string) =>
    setter(prev => ({ ...prev, [field]: val }));

  const totalMonthly = (d: LeaseData) => (parseFloat(d.rent) || 0) + (parseFloat(d.utilities) || 0) + (parseFloat(d.parking) || 0) + (parseFloat(d.laundry) || 0);
  const totalUpfront = (d: LeaseData) => (parseFloat(d.deposit) || 0) + (parseFloat(d.petDeposit) || 0) + (parseFloat(d.rent) || 0);
  const totalCost = (d: LeaseData) => totalMonthly(d) * (parseInt(d.termMonths) || 12) + (parseFloat(d.deposit) || 0) + (parseFloat(d.petDeposit) || 0);

  const highlight = (valA: number, valB: number) => {
    if (valA < valB) return { a: "text-accent font-bold", b: "" };
    if (valB < valA) return { a: "", b: "text-accent font-bold" };
    return { a: "", b: "" };
  };

  const fields: { label: string; key: keyof LeaseData; prefix?: string }[] = [
    { label: "Monthly Rent", key: "rent", prefix: "$" },
    { label: "Security Deposit", key: "deposit", prefix: "$" },
    { label: "Lease Term (months)", key: "termMonths" },
    { label: "Monthly Utilities", key: "utilities", prefix: "$" },
    { label: "Pet Deposit", key: "petDeposit", prefix: "$" },
    { label: "Monthly Parking", key: "parking", prefix: "$" },
    { label: "Monthly Laundry", key: "laundry", prefix: "$" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {[{ data: a, setter: setA, label: "Lease A" }, { data: b, setter: setB, label: "Lease B" }].map(({ data, setter, label }) => (
          <Card key={label}>
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-serif font-bold text-lg">{label}</h3>
              {fields.map(f => (
                <div key={f.key}>
                  <Label className="text-xs">{f.label}</Label>
                  <Input type="number" value={data[f.key]} onChange={e => update(setter, f.key, e.target.value)} placeholder="0" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={() => setCompared(true)} className="w-full">Compare Leases</Button>
      {compared && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-serif font-bold text-lg mb-4">Comparison Results</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">Lease A</TableHead>
                  <TableHead className="text-center">Lease B</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { label: "Total Monthly Cost", a: totalMonthly(a), b: totalMonthly(b) },
                  { label: "Move-in Cost", a: totalUpfront(a), b: totalUpfront(b) },
                  { label: "Total Lease Cost", a: totalCost(a), b: totalCost(b) },
                ].map(row => {
                  const h = highlight(row.a, row.b);
                  return (
                    <TableRow key={row.label}>
                      <TableCell className="font-medium">{row.label}</TableCell>
                      <TableCell className={`text-center ${h.a}`}>${row.a.toLocaleString()}</TableCell>
                      <TableCell className={`text-center ${h.b}`}>${row.b.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium">💡 Best Value: {totalCost(a) <= totalCost(b) ? "Lease A" : "Lease B"}</p>
              <p className="text-muted-foreground mt-1">Saves ${Math.abs(totalCost(a) - totalCost(b)).toLocaleString()} over the lease term</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
