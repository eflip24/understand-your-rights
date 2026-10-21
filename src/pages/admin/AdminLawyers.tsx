import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/data/lawyerReview";

export default function AdminLawyers() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const load = async () => {
    const [{ data: l }, { data: r }] = await Promise.all([
      supabase.from("review_lawyers").select("*").order("created_at", { ascending: false }),
      supabase.from("review_requests").select("id, created_at, client_name, jurisdiction, status, lawyer_id").order("created_at", { ascending: false }).limit(100),
    ]);
    setLawyers(l ?? []); setRequests(r ?? []);
  };
  useEffect(() => { load(); }, []);
  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("review_lawyers").update({ status }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" }); else load();
  };
  const assign = async (reqId: string, lawyerId: string) => {
    await supabase.from("review_requests").update({ lawyer_id: lawyerId || null, status: lawyerId ? "with_lawyer" : "received" }).eq("id", reqId);
    load();
  };
  const approved = lawyers.filter((l) => l.status === "approved");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Review panel</h1>
        <p className="text-sm text-muted-foreground">Check each credential on the Law Society of Ireland "Find a Solicitor" register or the state bar site before approving.</p>
      </div>
      <div className="space-y-3">
        {lawyers.map((l) => (
          <Card key={l.id}><CardContent className="pt-6 flex flex-wrap justify-between gap-3">
            <div>
              <p className="font-semibold">{l.full_name} {l.firm_name && `· ${l.firm_name}`} <span className="text-xs uppercase">[{l.jurisdiction}] {l.status}</span></p>
              <p className="text-sm text-muted-foreground">{l.email} · {l.region} · Credential: {l.credential_number} · Insured: {l.has_insurance ? "yes" : "no"} · {formatPrice(l.fixed_price_cents, l.currency)}</p>
            </div>
            <div className="flex gap-2">
              {l.status !== "approved" && <Button size="sm" onClick={() => setStatus(l.id, "approved")}>Approve</Button>}
              {l.status !== "rejected" && <Button size="sm" variant="outline" onClick={() => setStatus(l.id, "rejected")}>Reject</Button>}
            </div>
          </CardContent></Card>
        ))}
        {lawyers.length === 0 && <p className="text-muted-foreground">No applications yet.</p>}
      </div>
      <div>
        <h2 className="text-xl font-bold">Review requests</h2>
        <div className="space-y-2 mt-3">
          {requests.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-3 border rounded-md p-3 text-sm">
              <span>{new Date(r.created_at).toLocaleDateString()} · {r.client_name} · {r.jurisdiction} · {r.status}</span>
              <select className="border rounded px-2 py-1 bg-background" value={r.lawyer_id ?? ""} onChange={(e) => assign(r.id, e.target.value)}>
                <option value="">Unassigned</option>
                {approved.filter((l) => l.jurisdiction === r.jurisdiction).map((l) => <option key={l.id} value={l.id}>{l.full_name}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
