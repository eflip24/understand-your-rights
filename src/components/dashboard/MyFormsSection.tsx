import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Download, Trash2, Play, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { getFormBySlug } from "@/data/forms";
import { generateFormPdf, downloadBlob } from "@/lib/pdf/generateFormPdf";
import { useLocalizedPath } from "@/i18n/paths";

interface DraftRow {
  id: string;
  form_slug: string;
  step: number;
  data: Record<string, unknown>;
  progress_pct: number;
  updated_at: string;
}

interface PurchaseRow {
  id: string;
  form_slug: string;
  created_at: string;
}

export default function MyFormsSection() {
  const { user } = useAuth();
  const lp = useLocalizedPath();
  const [drafts, setDrafts] = useState<DraftRow[]>([]);
  const [purchases, setPurchases] = useState<PurchaseRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const [{ data: d }, { data: p }] = await Promise.all([
        supabase.from("form_drafts").select("id, form_slug, step, data, progress_pct, updated_at").order("updated_at", { ascending: false }),
        supabase.from("form_purchases").select("id, form_slug, created_at").order("created_at", { ascending: false }),
      ]);
      if (cancelled) return;
      setDrafts((d as DraftRow[]) || []);
      setPurchases((p as PurchaseRow[]) || []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user]);

  if (!user) return null;
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const inProgress = drafts.filter((d) => d.progress_pct < 100);
  const completedFree = drafts.filter((d) => d.progress_pct >= 100 && !purchases.some((p) => p.form_slug === d.form_slug));
  const purchasedRows = purchases.map((p) => ({ purchase: p, draft: drafts.find((d) => d.form_slug === p.form_slug) }));

  const handleDeleteDraft = async (id: string) => {
    const { error } = await supabase.from("form_drafts").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    toast({ title: "Draft deleted" });
  };

  const handleDownload = async (slug: string, data: Record<string, unknown>, watermark: boolean) => {
    const form = getFormBySlug(slug);
    if (!form) return;
    try {
      const blob = await generateFormPdf({ form, data, watermark });
      downloadBlob(blob, `${slug}-${watermark ? "free-draft" : "clean"}.pdf`);
    } catch (e) {
      toast({ title: "PDF error", description: String(e), variant: "destructive" });
    }
  };

  return (
    <section className="mb-10">
      <h2 className="mb-4 font-semibold text-lg">My Forms</h2>
      <Tabs defaultValue="in-progress">
        <TabsList>
          <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed Free ({completedFree.length})</TabsTrigger>
          <TabsTrigger value="purchased">Purchased ({purchases.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-4 space-y-3">
          {inProgress.length === 0 ? (
            <EmptyState message="You have no forms in progress." />
          ) : inProgress.map((d) => {
            const form = getFormBySlug(d.form_slug);
            if (!form) return null;
            return (
              <Card key={d.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <FileText className="h-5 w-5 text-accent shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{form.title}</p>
                    <p className="text-xs text-muted-foreground">Updated {new Date(d.updated_at).toLocaleDateString()}</p>
                    <Progress value={d.progress_pct} className="mt-2 h-1.5" />
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button asChild size="sm" variant="outline" className="gap-1">
                      <Link to={lp(`/forms/${form.slug}`)}><Play className="h-3.5 w-3.5" /> Continue</Link>
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDeleteDraft(d.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-3">
          {completedFree.length === 0 ? (
            <EmptyState message="No completed free forms yet." />
          ) : completedFree.map((d) => {
            const form = getFormBySlug(d.form_slug);
            if (!form) return null;
            return (
              <Card key={d.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <FileText className="h-5 w-5 text-accent shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{form.title}</p>
                    <p className="text-xs text-muted-foreground">Completed {new Date(d.updated_at).toLocaleDateString()}</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => handleDownload(d.form_slug, d.data, true)}>
                    <Download className="h-3.5 w-3.5" /> Free PDF
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="purchased" className="mt-4 space-y-3">
          {purchasedRows.length === 0 ? (
            <EmptyState message="You haven't purchased any clean PDFs yet." />
          ) : purchasedRows.map(({ purchase, draft }) => {
            const form = getFormBySlug(purchase.form_slug);
            if (!form) return null;
            return (
              <Card key={purchase.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <FileText className="h-5 w-5 text-accent shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{form.title}</p>
                    <p className="text-xs text-muted-foreground">Purchased {new Date(purchase.created_at).toLocaleDateString()}</p>
                  </div>
                  <Button
                    size="sm"
                    className="gap-1 bg-accent text-accent-foreground hover:bg-gold-dark"
                    onClick={() => draft && handleDownload(purchase.form_slug, draft.data, false)}
                    disabled={!draft}
                  >
                    <Download className="h-3.5 w-3.5" /> Clean PDF
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card>
      <CardContent className="p-6 text-center text-sm text-muted-foreground">{message}</CardContent>
    </Card>
  );
}
