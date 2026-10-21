import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Head from "@/components/seo/Head";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLocalizedPath } from "@/i18n/paths";
import ReviewTracker from "@/components/review/ReviewTracker";
import LawyerListingCard from "@/components/review/LawyerListingCard";

export default function LawyerPortalPage() {
  const { user } = useAuth();
  const lp = useLocalizedPath();
  const [lawyer, setLawyer] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    if (!user) return;
    const { data: l } = await supabase.from("review_lawyers").select("id, status, full_name, jurisdiction").eq("user_id", user.id).maybeSingle();
    setLawyer(l);
    if (l?.status === "approved") {
      const { data } = await supabase.from("review_requests").select("*").eq("lawyer_id", l.id).order("created_at", { ascending: false });
      setRows(data ?? []);
    }
  }, [user]);
  useEffect(() => { load(); }, [load]);

  const open = async (path: string) => {
    const { data } = await supabase.storage.from("reviews").createSignedUrl(path, 600);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };
  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("review_requests").update({ status }).eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    if (status === "declined") await supabase.functions.invoke("notify-review", { body: { requestId: id, event: "declined" } }).catch(() => {});
    load();
  };
  const deliver = async (r: any, file: File | undefined) => {
    if (!file) return;
    const path = `${r.client_id}/${r.id}/review-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("reviews").upload(path, file);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); return; }
    await supabase.from("review_requests").update({ delivered_path: path, lawyer_note: notes[r.id] ?? r.lawyer_note, status: "delivered" }).eq("id", r.id);
    await supabase.functions.invoke("notify-review", { body: { requestId: r.id, event: "delivered" } }).catch(() => {});
    toast({ title: "Delivered — the client has been emailed" }); load();
  };

  if (!user) return <div className="container py-16 text-center"><Button asChild><Link to={lp("/login?redirect=/lawyer-portal")}>Sign in</Link></Button></div>;
  if (lawyer?.status !== "approved") return (
    <div className="container py-16 text-center">
      <p>{lawyer ? `Your application is ${lawyer.status}.` : "You're not on the panel yet."}</p>
      <Button asChild className="mt-3"><Link to={lp("/lawyer-review/join")}>Panel application</Link></Button>
    </div>
  );

  return (
    <div className="container max-w-4xl py-10 px-4">
      <Head title="Lawyer portal | LegallySpoken" description="Review requests." noindex />
      <h1 className="font-serif text-3xl font-bold">Lawyer portal</h1>
      <p className="text-muted-foreground">Welcome, {lawyer.full_name}. Keep all case communication here.</p>
      <LawyerListingCard jurisdiction={lawyer.jurisdiction} />
      {rows.length === 0 && <p className="mt-6 text-muted-foreground">No requests assigned yet.</p>}
      <div className="space-y-4 mt-6">
        {rows.map((r) => (
          <Card key={r.id}><CardContent className="pt-6 space-y-3">
            <div className="flex justify-between flex-wrap gap-2">
              <p className="font-semibold">{r.client_name} · {r.region ?? (r.jurisdiction === "ie" ? "Ireland" : "US")}</p>
              <ReviewTracker status={r.status} />
            </div>
            <p className="text-sm">Offer: {r.answers?.offer || "—"} · Deadline: {r.answers?.deadline || "—"}</p>
            {r.answers?.concerns && <p className="text-sm">Concerns: {r.answers.concerns}</p>}
            {r.ai_summary?.summary && <div className="rounded-md bg-muted p-3 text-sm"><p className="font-semibold">AI briefing (verify)</p><p>{r.ai_summary.summary}</p>
              <ul className="list-disc pl-5 mt-1">{(r.ai_summary.findings ?? []).map((f: any, i: number) => <li key={i}><strong>{f.severity}</strong> — {f.clause}: {f.issue}</li>)}</ul></div>}
            <div className="flex flex-wrap gap-2">
              {r.document_path && <Button variant="outline" onClick={() => open(r.document_path)}>Open agreement</Button>}
              {r.status !== "delivered" && r.status !== "declined" && <Button variant="outline" onClick={() => setStatus(r.id, "declined")}>Decline</Button>}
            </div>
            {r.status !== "delivered" && r.status !== "declined" && (
              <div className="space-y-2">
                <Textarea placeholder="Note to client" value={notes[r.id] ?? ""} onChange={(e) => setNotes({ ...notes, [r.id]: e.target.value })} />
                <label className="text-sm block">Upload signed review letter to deliver:
                  <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => deliver(r, e.target.files?.[0])} /></label>
              </div>
            )}
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
