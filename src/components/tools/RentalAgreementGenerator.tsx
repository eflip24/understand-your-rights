import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

export default function RentalAgreementGenerator() {
  const [landlord, setLandlord] = useState("");
  const [tenant, setTenant] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [termMonths, setTermMonths] = useState("12");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!landlord || !tenant || !address || !city || !state || !rent || !deposit) {
      toast.error("Please fill in all fields");
      return;
    }
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + parseInt(termMonths));
    const end = endDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    setResult(`RESIDENTIAL LEASE AGREEMENT

Date: ${today}
State: ${state}

This Residential Lease Agreement ("Agreement") is entered into by and between:

LANDLORD: ${landlord}
TENANT: ${tenant}

1. PREMISES
The Landlord hereby leases to the Tenant the property located at:
${address}, ${city}, ${state}

2. TERM
This lease shall commence on ${today} and shall terminate on ${end}, a period of ${termMonths} months.

3. RENT
The Tenant agrees to pay monthly rent of $${parseFloat(rent).toLocaleString("en-US", { minimumFractionDigits: 2 })} due on the 1st day of each month. Rent shall be payable to the Landlord at the address above or as otherwise directed.

4. SECURITY DEPOSIT
The Tenant shall pay a security deposit of $${parseFloat(deposit).toLocaleString("en-US", { minimumFractionDigits: 2 })} upon execution of this Agreement. The deposit shall be returned within the time period required by ${state} law, less any deductions for damages beyond normal wear and tear.

5. LATE FEES
Rent not received within five (5) days of the due date shall incur a late fee of 5% of the monthly rent amount.

6. UTILITIES
Unless otherwise agreed in writing, the Tenant shall be responsible for all utilities and services to the premises.

7. MAINTENANCE AND REPAIRS
The Tenant shall maintain the premises in good condition. The Landlord shall be responsible for structural repairs and maintenance of building systems.

8. USE OF PREMISES
The premises shall be used exclusively as a private residence. No commercial activities shall be conducted on the premises.

9. ENTRY BY LANDLORD
The Landlord may enter the premises with at least 24 hours' written notice for inspections, repairs, or showings, except in emergencies.

10. PETS
No pets shall be allowed on the premises without prior written consent of the Landlord. A separate pet agreement and additional deposit may be required.

11. ALTERATIONS
The Tenant shall not make any alterations, additions, or improvements without the prior written consent of the Landlord.

12. TERMINATION
Either party may terminate this Agreement at the end of the lease term by providing at least 30 days' written notice. If no notice is given, the lease shall convert to a month-to-month tenancy.

13. DEFAULT
If the Tenant fails to pay rent or violates any term of this Agreement, the Landlord may pursue remedies as allowed by ${state} law, including termination of the lease and eviction proceedings.

14. GOVERNING LAW
This Agreement shall be governed by the laws of the State of ${state}.

15. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties. Any modifications must be in writing and signed by both parties.


LANDLORD:

_______________________________
${landlord}
Date: ________________


TENANT:

_______________________________
${tenant}
Date: ________________`);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Landlord Name</Label><Input value={landlord} onChange={e => setLandlord(e.target.value)} placeholder="Property Owner LLC" /></div>
        <div><Label>Tenant Name</Label><Input value={tenant} onChange={e => setTenant(e.target.value)} placeholder="Jane Doe" /></div>
        <div><Label>Property Address</Label><Input value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main St, Apt 4" /></div>
        <div><Label>City</Label><Input value={city} onChange={e => setCity(e.target.value)} placeholder="Los Angeles" /></div>
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent>{states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Monthly Rent ($)</Label><Input type="number" value={rent} onChange={e => setRent(e.target.value)} placeholder="1500" /></div>
        <div><Label>Security Deposit ($)</Label><Input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="1500" /></div>
        <div><Label>Lease Term (Months)</Label><Input type="number" value={termMonths} onChange={e => setTermMonths(e.target.value)} placeholder="12" /></div>
      </div>
      <Button onClick={generate} className="w-full">Generate Rental Agreement</Button>
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
