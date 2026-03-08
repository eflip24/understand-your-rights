import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

export default function PromissoryNoteGenerator() {
  const [lender, setLender] = useState("");
  const [borrower, setBorrower] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [termMonths, setTermMonths] = useState("");
  const [state, setState] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!lender || !borrower || !amount || !interestRate || !termMonths || !state) {
      toast.error("Please fill in all fields");
      return;
    }
    const amt = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const months = parseInt(termMonths);
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = monthlyRate > 0
      ? (amt * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      : amt / months;
    const totalPayment = monthlyPayment * months;
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + months);
    const maturity = maturityDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    setResult(`PROMISSORY NOTE

Date: ${today}
Principal Amount: $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })}
State: ${state}

FOR VALUE RECEIVED, the undersigned, ${borrower} ("Borrower"), promises to pay to the order of ${lender} ("Lender"), the principal sum of $${amt.toLocaleString("en-US", { minimumFractionDigits: 2 })}, together with interest thereon at the rate of ${rate}% per annum.

1. PAYMENT TERMS
Monthly payments of $${monthlyPayment.toFixed(2)} shall be due on the same day of each month, beginning one month from the date of this Note. The total amount payable over the term is $${totalPayment.toFixed(2)}.

2. MATURITY DATE
The entire unpaid principal balance, together with all accrued and unpaid interest, shall be due and payable on ${maturity}.

3. PREPAYMENT
Borrower may prepay this Note in whole or in part at any time without penalty.

4. LATE CHARGES
If any payment is not received within ten (10) days of its due date, Borrower shall pay a late charge of 5% of the overdue amount.

5. DEFAULT
The following shall constitute events of default:
a) Failure to make any payment when due;
b) Borrower becomes insolvent or files for bankruptcy;
c) Any material misrepresentation by Borrower.

Upon default, the entire unpaid balance shall become immediately due and payable at the option of the Lender.

6. GOVERNING LAW
This Note shall be governed by the laws of the State of ${state}.

7. WAIVER
Borrower waives presentment, demand for payment, notice of dishonor, and protest.

8. ATTORNEYS' FEES
In the event of default, Borrower shall pay all costs of collection, including reasonable attorneys' fees.


BORROWER:

_______________________________
${borrower}
Date: ________________


LENDER:

_______________________________
${lender}
Date: ________________`);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Lender Name</Label><Input value={lender} onChange={e => setLender(e.target.value)} placeholder="John Smith" /></div>
        <div><Label>Borrower Name</Label><Input value={borrower} onChange={e => setBorrower(e.target.value)} placeholder="Jane Doe" /></div>
        <div><Label>Principal Amount ($)</Label><Input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="10000" /></div>
        <div><Label>Annual Interest Rate (%)</Label><Input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} placeholder="5" /></div>
        <div><Label>Term (Months)</Label><Input type="number" value={termMonths} onChange={e => setTermMonths(e.target.value)} placeholder="12" /></div>
        <div>
          <Label>State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent>{states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={generate} className="w-full">Generate Promissory Note</Button>
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
