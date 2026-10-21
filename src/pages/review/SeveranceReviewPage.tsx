import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, FileText, Clock, Scale, Loader2 } from "lucide-react";
import Head from "@/components/seo/Head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLocalizedPath } from "@/i18n/paths";
import { REVIEW_JURISDICTIONS, ReviewJurisdiction, formatPrice, irishStatutoryRedundancy } from "@/data/lawyerReview";

interface LawyerRow {
  id: string; full_name: string; firm_name: string | null; region: string | null;
  fixed_price_cents: number; currency: string; turnaround_hours: number; bio: string | null;
}

export default function SeveranceReviewPage({ jurisdiction }: { jurisdiction: ReviewJurisdiction }) {
  const j = REVIEW_JURISDICTIONS[jurisdiction];
  const { user } = useAuth();
  const lp = useLocalizedPath();
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState<LawyerRow[]>([]);
  const [lawyerId, setLawyerId] = useState<string>("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [offer, setOffer] = useState("");
  const [deadline, setDeadline] = useState("");
  const [concerns, setConcerns] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [weekly, setWeekly] = useState("");
  const [years, setYears] = useState("");

  useEffect(() => {
    supabase.from("review_lawyers")
      .select("id, full_name, firm_name, region, fixed_price_cents, currency, turnaround_hours, bio")
      .eq("status", "approved").eq("jurisdiction", jurisdiction).order("fixed_price_cents")
      .then(({ data }) => setLawyers((data as LawyerRow[]) ?? []));
  }, [jurisdiction]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate(lp(`/login?redirect=${encodeURIComponent(j.path)}`)); return; }
    if (!file && text.trim().length < 50) {
      toast({ title: "Add your agreement", description: "Upload the file or paste its text.", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      const { data: row, error } = await supabase.from("review_requests").insert([{
        client_id: user.id, jurisdiction, region: region || null, client_name: name,
        client_email: user.email ?? "", lawyer_id: lawyerId || null,
        answers: { offer, deadline, concerns, pastedText: text.slice(0, 50000) },
      }]).select("id").single();
      if (error || !row) throw error ?? new Error("Could not save");
      if (file) {
        const path = `${user.id}/${row.id}/agreement-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("reviews").upload(path, file);
        if (upErr) throw upErr;
        await supabase.from("review_requests").update({ document_path: path }).eq("id", row.id);
      }
      // Free AI first pass (only on pasted text, only when asked by submitting)
      if (text.trim().length >= 50) {
        const { data: ai } = await supabase.functions.invoke("analyze-contract", { body: { toolType: "red-flag-scanner", text } });
        if (ai && !ai.error) {
          await supabase.from("review_requests").update({ ai_summary: ai, status: lawyerId ? "with_lawyer" : "ai_ready" }).eq("id", row.id);
        }
      } else if (lawyerId) {
        await supabase.from("review_requests").update({ status: "with_lawyer" }).eq("id", row.id);
      }
      if (lawyerId) await supabase.functions.invoke("notify-review", { body: { requestId: row.id, event: "assigned" } }).catch(() => {});
      navigate(lp("/my-reviews"));
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err?.message ?? "Please try again.", variant: "destructive" });
    } finally { setBusy(false); }
  };

  const est = jurisdiction === "ie" ? irishStatutoryRedundancy(Number(weekly), Number(years)) : 0;
  const title = jurisdiction === "ie"
    ? "Severance & Settlement Agreement Review by an Irish Solicitor"
    : "Severance Agreement Review by a Licensed Lawyer";

  return (
    <div className="container max-w-5xl py-10 px-4">
      <Head
        title={`${title} | Fixed Fee | LegallySpoken`}
        description={`Upload your severance or settlement agreement, get a free plain-English AI red-flag summary, then choose a verified ${j.lawyerWord} at a fixed price (${j.typicalPrice}).`}
      />
      <p className="text-sm font-medium text-primary">{j.label}</p>
      <h1 className="font-serif text-3xl md:text-4xl font-bold mt-1">{title}</h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
        Before you sign away your rights, have a {j.lawyerWord} check the numbers, the waiver and the restrictions.
        Start with a free AI summary, then pick a verified {j.lawyerWord} who reviews it for a fixed price.
      </p>

      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {[
          { icon: FileText, t: "1. Upload", d: "Your agreement stays private." },
          { icon: Scale, t: "2. Free AI summary", d: "Red flags in plain English." },
          { icon: ShieldCheck, t: `3. Choose a ${j.lawyerWord}`, d: "Verified, fixed price, paid directly to them." },
          { icon: Clock, t: "4. Get your review", d: "Signed review letter in your account." },
        ].map((s) => (
          <Card key={s.t}><CardContent className="pt-6"><s.icon className="h-6 w-6 text-primary" /><p className="font-semibold mt-2">{s.t}</p><p className="text-sm text-muted-foreground">{s.d}</p></CardContent></Card>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold">What to know first</h2>
        <ul className="mt-3 space-y-2">
          {j.facts.map((f) => (
            <li key={f.text} className="text-muted-foreground">
              {f.text} <a href={f.url} target="_blank" rel="noopener noreferrer" className="underline text-primary">({f.source})</a>
            </li>
          ))}
        </ul>
        {jurisdiction === "ie" && (
          <Card className="mt-4"><CardContent className="pt-6 grid sm:grid-cols-3 gap-3 items-end">
            <div><Label>Gross weekly pay (€)</Label><Input inputMode="decimal" value={weekly} onChange={(e) => setWeekly(e.target.value)} /></div>
            <div><Label>Years of service</Label><Input inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} /></div>
            <p className="text-sm">Statutory minimum: <strong className="text-lg">{formatPrice(est * 100, "eur")}</strong></p>
          </CardContent></Card>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-bold">Available {j.lawyerWord}s</h2>
        {lawyers.length === 0 ? (
          <p className="mt-2 text-muted-foreground">
            We're onboarding verified {j.lawyerWord}s now. Submit your agreement and we'll match you as soon as one is available — you still get the free AI summary straight away.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {lawyers.map((l) => (
              <button type="button" key={l.id} onClick={() => setLawyerId(l.id === lawyerId ? "" : l.id)}
                className={`text-left rounded-lg border p-4 transition ${lawyerId === l.id ? "border-primary ring-2 ring-primary" : "border-border"}`}>
                <p className="font-semibold">{l.full_name}{l.firm_name ? ` · ${l.firm_name}` : ""}</p>
                <p className="text-sm text-muted-foreground">{l.region}</p>
                <p className="mt-1"><strong>{formatPrice(l.fixed_price_cents, l.currency)}</strong> · {l.turnaround_hours}h turnaround</p>
                {l.bio && <p className="text-sm mt-1 text-muted-foreground line-clamp-3">{l.bio}</p>}
              </button>
            ))}
          </div>
        )}
      </section>

      <Card className="mt-10">
        <CardHeader><CardTitle>Start your review</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Your name</Label><Input required value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><Label>{jurisdiction === "ie" ? "County" : "State"}</Label><Input value={region} onChange={(e) => setRegion(e.target.value)} /></div>
              <div><Label>Amount offered ({j.symbol})</Label><Input value={offer} onChange={(e) => setOffer(e.target.value)} /></div>
              <div><Label>Deadline to sign</Label><Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></div>
            </div>
            <div><Label>What worries you most?</Label><Textarea value={concerns} onChange={(e) => setConcerns(e.target.value)} /></div>
            <div><Label>Upload agreement (PDF or Word, max 15MB)</Label><Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
            <div><Label>Or paste the text (needed for the free AI summary)</Label><Textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} /></div>
            <Button type="submit" disabled={busy} size="lg">
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {user ? "Submit for review" : "Sign in to continue"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-8 text-xs text-muted-foreground">
        LegallySpoken is not a law firm and does not give legal advice. The AI summary is general information only.
        Legal advice is given solely by the independent {j.lawyerWord} you choose, who sets their own fee and is paid directly by you.
        LegallySpoken does not share in {j.lawyerWord}s' fees. Are you a {j.lawyerWord}?{" "}
        <Link to={lp("/lawyer-review/join")} className="underline">Join the panel</Link>.
      </p>
    </div>
  );
}
