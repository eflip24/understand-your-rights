import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stateData } from "@/data/locations/stateData";
import { useLocalizedPath } from "@/i18n/paths";

interface LegalTriageProps {
  className?: string;
}

type Situation = {
  id: string;
  label: string;
  detail: string;
  path: string;
};

const situations: Situation[] = [
  { id: "injury", label: "I was injured", detail: "Accident, medical issue, or someone else's negligence", path: "/personal-injury-settlements" },
  { id: "insurance", label: "My insurance claim was denied", detail: "Health, car, homeowners, or disability coverage", path: "/car-insurance-claim-denied" },
  { id: "work", label: "I have a work problem", detail: "Pay, termination, discrimination, or workers' comp", path: "/employment-law" },
  { id: "housing", label: "I have a housing problem", detail: "Lease, deposit, eviction, or landlord dispute", path: "/landlord-tenant-law" },
  { id: "document", label: "I need a document", detail: "Agreement, notice, letter, or fillable government form", path: "/forms" },
  { id: "debt", label: "I am dealing with debt", detail: "Collections, settlement, bankruptcy, or garnishment", path: "/debt-settlement-calculator" },
  { id: "criminal", label: "I was accused of a crime", detail: "DUI, arrest, charge, or criminal court process", path: "/dui-first-offense-guide" },
  { id: "other", label: "Something else", detail: "Search the full library of legal tools and guides", path: "/tools" },
];

const timingOptions = [
  { id: "today", label: "It is happening now" },
  { id: "recent", label: "It happened recently" },
  { id: "older", label: "It happened more than a year ago" },
  { id: "unsure", label: "I am not sure" },
];

const STORAGE_KEY = "legallyspoken-jurisdiction";

export default function LegalTriage({ className }: LegalTriageProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState<Situation | null>(null);
  const [jurisdiction, setJurisdiction] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "unknown");
  const [timing, setTiming] = useState("");
  const navigate = useNavigate();
  const lp = useLocalizedPath();

  const state = useMemo(() => stateData.find((item) => item.slug === jurisdiction), [jurisdiction]);

  const reset = () => {
    setStep(1);
    setSituation(null);
    setTiming("");
  };

  const close = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) reset();
  };

  const chooseJurisdiction = (value: string) => {
    setJurisdiction(value);
    if (value !== "unknown") localStorage.setItem(STORAGE_KEY, value);
  };

  const finish = () => {
    if (!situation) return;
    const params = new URLSearchParams();
    if (jurisdiction !== "unknown") params.set("state", jurisdiction);
    if (timing) params.set("timing", timing);
    const suffix = params.toString() ? `?${params.toString()}` : "";
    close(false);
    navigate(lp(`${situation.path}${suffix}`));
  };

  return (
    <>
      <Button type="button" variant="outline" onClick={() => setOpen(true)} className={className}>
        <Sparkles className="h-4 w-4" />
        Not sure where to start?
      </Button>

      <Dialog open={open} onOpenChange={close}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {step === 1 ? <ShieldCheck className="h-5 w-5" /> : step === 2 ? <MapPin className="h-5 w-5" /> : <Check className="h-5 w-5" />}
            </div>
            <DialogTitle className="font-serif text-2xl">Find your next legal step</DialogTitle>
            <DialogDescription>
              A short orientation flow. It does not create an attorney-client relationship or provide legal advice.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3 flex items-center gap-2" aria-label={`Step ${step} of 3`}>
            {[1, 2, 3].map((item) => <span key={item} className={`h-1.5 flex-1 rounded-full ${item <= step ? "bg-accent" : "bg-muted"}`} />)}
          </div>

          {step === 1 && (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {situations.map((item) => (
                <Button key={item.id} type="button" variant="outline" onClick={() => { setSituation(item); setStep(2); }} className="h-auto min-h-16 justify-start gap-3 px-4 py-3 text-left">
                  <span className="min-w-0"><span className="block font-semibold">{item.label}</span><span className="mt-0.5 block whitespace-normal text-xs font-normal text-muted-foreground">{item.detail}</span></span>
                  <ArrowRight className="ms-auto h-4 w-4 shrink-0 text-muted-foreground" />
                </Button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="triage-jurisdiction" className="mb-2 block text-sm font-semibold">Where did this happen?</label>
                <Select value={jurisdiction} onValueChange={chooseJurisdiction}>
                  <SelectTrigger id="triage-jurisdiction"><SelectValue placeholder="Choose a state or skip" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unknown">I am not ready to choose</SelectItem>
                    {stateData.map((item) => <SelectItem key={item.slug} value={item.slug}>{item.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                {state && <p className="mt-2 text-xs text-muted-foreground">We will remember {state.name} on this device and use it to personalize state resources.</p>}
              </div>
              <div className="flex justify-between gap-3">
                <Button type="button" variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button type="button" onClick={() => setStep(3)}>Continue <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-5 space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold">How recent is it?</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {timingOptions.map((option) => <Button key={option.id} type="button" variant={timing === option.id ? "default" : "outline"} onClick={() => setTiming(option.id)} className="justify-start">{timing === option.id && <Check className="h-4 w-4" />}{option.label}</Button>)}
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <Button type="button" variant="ghost" onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4" /> Back</Button>
                <Button type="button" disabled={!timing} onClick={finish}>See my next step <ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
