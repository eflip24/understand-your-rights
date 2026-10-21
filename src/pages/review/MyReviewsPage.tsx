import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Head from "@/components/seo/Head";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useLocalizedPath } from "@/i18n/paths";
import ReviewTracker from "@/components/review/ReviewTracker";
import { formatPrice } from "@/data/lawyerReview";

export default function MyReviewsPage() {
  const { user, loading } = useAuth();
  const lp = useLocalizedPath();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("review_requests")
      .select("id, created_at, status, jurisdiction, ai_summary, delivered_path, lawyer_note, review_lawyers(full_name, fixed_price_cents, currency, payment_link, email)")
      .eq("client_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setRows(data ?? []));
  }, [user]);

  const download = async (path: string) => {
    const { data } = await supabase.storage.from("reviews").createSignedUrl(path, 600);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  if (!loading && !user) return <div className="container py-16 text-center"><Button asChild><Link to={lp("/login?redirect=/my-reviews")}>Sign in to see your reviews</Link></Button></div>;

  return (
    <div className="container max-w-3xl py-10 px-4">
      <Head title="My lawyer reviews | LegallySpoken" description="Track your agreement reviews." noindex />
      <h1 className="font-serif text-3xl font-bold">My reviews</h1>
      {rows.length === 0 && <p className="mt-4 text-muted-foreground">No reviews yet. <Link className="underline" to={lp("/lawyer-review/severance")}>Start one</Link>.</p>}
      <div className="space-y-4 mt-6">
        {rows.map((r) => (
          <Card key={r.id}><CardContent className="pt-6 space-y-3">
            <p className="text-sm text-muted-foreground">{new Date(r.created_at).toLocaleDateString()} · Severance review · {r.jurisdiction === "ie" ? "Ireland" : "US"}</p>
            <ReviewTracker status={r.status} />
            {r.review_lawyers && (
              <p className="text-sm">Your lawyer: <strong>{r.review_lawyers.full_name}</strong> — {formatPrice(r.review_lawyers.fixed_price_cents, r.review_lawyers.currency)}, paid directly to them
                {r.review_lawyers.payment_link && <> · <a className="underline" href={r.review_lawyers.payment_link} target="_blank" rel="noopener noreferrer">Pay your lawyer</a></>}</p>
            )}
            {r.ai_summary?.summary && (
              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-semibold">Free AI summary (not legal advice) — risk: {r.ai_summary.riskLevel}</p>
                <p className="mt-1">{r.ai_summary.summary}</p>
                <ul className="list-disc pl-5 mt-2">{(r.ai_summary.findings ?? []).slice(0, 6).map((f: any, i: number) => <li key={i}><strong>{f.severity}:</strong> {f.issue}</li>)}</ul>
              </div>
            )}
            {r.lawyer_note && <p className="text-sm"><strong>Note from your lawyer:</strong> {r.lawyer_note}</p>}
            {r.delivered_path && <Button onClick={() => download(r.delivered_path)}>Download signed review</Button>}
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
