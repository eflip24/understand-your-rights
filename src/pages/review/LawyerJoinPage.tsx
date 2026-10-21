import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Head from "@/components/seo/Head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLocalizedPath } from "@/i18n/paths";
import { REVIEW_JURISDICTIONS, ReviewJurisdiction } from "@/data/lawyerReview";

export default function LawyerJoinPage() {
  const { user } = useAuth();
  const lp = useLocalizedPath();
  const [existing, setExisting] = useState<string | null>(null);
  const [jur, setJur] = useState<ReviewJurisdiction>("ie");
  const [f, setF] = useState({ full_name: "", firm_name: "", region: "", credential_number: "", price: "", turnaround: "48", payment_link: "", bio: "" });
  const [insured, setInsured] = useState(false);
  const [busy, setBusy] = useState(false);
  const j = REVIEW_JURISDICTIONS[jur];

  useEffect(() => {
    if (!user) return;
    supabase.from("review_lawyers").select("status").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => setExisting(data?.status ?? null));
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!insured) { toast({ title: "Insurance required", description: "Panel members must hold professional indemnity insurance.", variant: "destructive" }); return; }
    setBusy(true);
    const { data: created, error } = await supabase.from("review_lawyers").insert([{
      user_id: user.id, email: user.email ?? "", jurisdiction: jur, currency: j.currency,
      full_name: f.full_name, firm_name: f.firm_name || null, region: f.region || null,
      credential_number: f.credential_number, has_insurance: insured,
      fixed_price_cents: Math.round(Number(f.price) * 100), turnaround_hours: Number(f.turnaround) || 48,
      payment_link: f.payment_link || null, bio: f.bio || null,
    }]).select("id").single();
    setBusy(false);
    if (error) { toast({ title: "Could not submit", description: error.message, variant: "destructive" }); return; }
    if (created) await supabase.functions.invoke("notify-review", { body: { requestId: created.id, event: "lawyer_applied" } }).catch(() => {});
    setExisting("pending");
  };

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="container max-w-3xl py-10 px-4">
      <Head title="Join the LegallySpoken Review Panel | Solicitors & Lawyers" description="Freelance solicitors in Ireland and licensed US lawyers: receive pre-prepared severance and contract review requests at your own fixed fee, paid directly to you." />
      <h1 className="font-serif text-3xl font-bold">Join the review panel</h1>
      <p className="mt-3 text-muted-foreground">
        For freelance and locum solicitors in Ireland and licensed lawyers in the US. Clients arrive with their agreement and a structured AI briefing already prepared.
        You set your own fixed fee and clients pay you directly — we never take a share of your fee. Panel membership will be a flat monthly listing fee (free during the pilot).
      </p>
      <ul className="mt-4 list-disc pl-6 text-sm text-muted-foreground space-y-1">
        <li>Ireland: you must hold a current practising certificate and professional indemnity insurance, and follow the LSRA advertising regulations.</li>
        <li>US: active bar membership in good standing in the state(s) you list and malpractice insurance.</li>
        <li>All case messages and files stay in the secure portal — never by personal email or WhatsApp.</li>
      </ul>

      {!user ? (
        <Card className="mt-8"><CardContent className="pt-6">
          <p>Create an account or sign in first.</p>
          <div className="mt-3 flex gap-3">
            <Button asChild><Link to={lp("/signup?redirect=/lawyer-review/join")}>Create account</Link></Button>
            <Button asChild variant="outline"><Link to={lp("/login?redirect=/lawyer-review/join")}>Sign in</Link></Button>
          </div>
        </CardContent></Card>
      ) : existing ? (
        <Card className="mt-8"><CardContent className="pt-6">
          <p className="font-semibold">Application status: {existing}</p>
          <p className="text-sm text-muted-foreground mt-1">We check every credential by hand against the Law Society or state bar register before you go live.</p>
          {existing === "approved" && <Button asChild className="mt-3"><Link to={lp("/lawyer-portal")}>Open lawyer portal</Link></Button>}
        </CardContent></Card>
      ) : (
        <Card className="mt-8">
          <CardHeader><CardTitle>Application</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="flex gap-2">
                {(["ie", "us"] as ReviewJurisdiction[]).map((k) => (
                  <Button key={k} type="button" variant={jur === k ? "default" : "outline"} onClick={() => setJur(k)}>{REVIEW_JURISDICTIONS[k].label}</Button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full name</Label><Input required value={f.full_name} onChange={set("full_name")} /></div>
                <div><Label>Firm (optional)</Label><Input value={f.firm_name} onChange={set("firm_name")} /></div>
                <div><Label>{j.credentialLabel}</Label><Input required value={f.credential_number} onChange={set("credential_number")} /></div>
                <div><Label>{j.regionLabel}</Label><Input value={f.region} onChange={set("region")} /></div>
                <div><Label>Your fixed fee per review ({j.symbol})</Label><Input required inputMode="decimal" value={f.price} onChange={set("price")} /></div>
                <div><Label>Turnaround (hours)</Label><Input inputMode="numeric" value={f.turnaround} onChange={set("turnaround")} /></div>
              </div>
              <div><Label>Your payment link or how clients pay you</Label><Input placeholder="e.g. your firm's Stripe or invoice link" value={f.payment_link} onChange={set("payment_link")} /></div>
              <div><Label>Short bio</Label><Textarea value={f.bio} onChange={set("bio")} /></div>
              <label className="flex items-center gap-2 text-sm"><Checkbox checked={insured} onCheckedChange={(v) => setInsured(Boolean(v))} /> I hold current professional indemnity insurance</label>
              <Button type="submit" disabled={busy}>Submit application</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
