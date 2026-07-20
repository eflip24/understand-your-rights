import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Download, FileText, History, Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import Head from "@/components/seo/Head";
import Breadcrumbs from "@/components/forms/Breadcrumbs";
import { useLocalizedPath } from "@/i18n/paths";
import { getFormBySlug } from "@/data/forms";
import { getPackBySlug } from "@/data/formPacks";
import { signedUrlFor } from "@/lib/documents/uploadDocument";

interface DocRow {
  id: string;
  slug: string;
  kind: "form" | "pack";
  variant: "watermarked" | "clean";
  status: "draft" | "completed" | "signed" | "purchased";
  storage_path: string;
  version: number;
  title: string | null;
  state_code: string | null;
  size_bytes: number | null;
  created_at: string;
}

const STATUS_LABEL: Record<DocRow["status"], string> = {
  draft: "Draft",
  completed: "Completed",
  signed: "Signed",
  purchased: "Purchased",
};

export default function MyDocumentsPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const lp = useLocalizedPath();
  const [rows, setRows] = useState<DocRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | DocRow["status"]>("all");
  const [kindFilter, setKindFilter] = useState<"all" | DocRow["kind"]>("all");

  useEffect(() => {
    document.title = "My Documents | LegallySpoken";
    if (!authLoading && !user) navigate(lp("/login"), { replace: true });
  }, [authLoading, user, navigate, lp]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("form_documents")
        .select("id, slug, kind, variant, status, storage_path, version, title, state_code, size_bytes, created_at")
        .order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Error loading documents", description: error.message, variant: "destructive" });
      } else {
        setRows((data as DocRow[]) || []);
      }
      setLoading(false);
    })();
  }, [user]);

  const grouped = useMemo(() => {
    const map = new Map<string, DocRow[]>();
    for (const r of rows) {
      const key = `${r.kind}:${r.slug}`;
      const arr = map.get(key) ?? [];
      arr.push(r);
      map.set(key, arr);
    }
    return Array.from(map.entries()).map(([key, versions]) => ({
      key,
      latest: versions[0],
      versions: versions.sort((a, b) => b.version - a.version),
    }));
  }, [rows]);

  const filtered = grouped.filter((g) => {
    if (kindFilter !== "all" && g.latest.kind !== kindFilter) return false;
    if (statusFilter !== "all" && g.latest.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const title = (g.latest.title || g.latest.slug).toLowerCase();
      if (!title.includes(q)) return false;
    }
    return true;
  });

  const download = async (row: DocRow) => {
    const url = await signedUrlFor(row.storage_path, 3600);
    if (!url) return toast({ title: "Couldn't create download link", variant: "destructive" });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const titleFor = (r: DocRow) =>
    r.title || (r.kind === "pack" ? getPackBySlug(r.slug)?.title : getFormBySlug(r.slug)?.title) || r.slug;

  if (authLoading) return <div className="min-h-[50vh] flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  return (
    <div className="container max-w-5xl py-8 px-4">
      <Head title="My Documents | LegallySpoken" description="All your saved and purchased fillable legal forms in one place." />
      <Breadcrumbs items={[{ label: "Home", href: lp("/") }, { label: "Dashboard", href: lp("/dashboard") }, { label: "My Documents" }]} />

      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">My Documents</h1>
          <p className="text-sm text-muted-foreground">Every free draft and purchased PDF, plus every past version.</p>
        </div>
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link to={lp("/dashboard")}><ArrowLeft className="h-4 w-4" /> Back to dashboard</Link>
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title…" className="ps-9" />
        </div>
        <Select value={kindFilter} onValueChange={(v) => setKindFilter(v as typeof kindFilter)}>
          <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="form">Forms</SelectItem>
            <SelectItem value="pack">Packs</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="signed">Signed</SelectItem>
            <SelectItem value="purchased">Purchased</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p>No documents yet.</p>
          <p className="text-sm mt-1">Complete a form and download it to see it here permanently.</p>
          <Button asChild variant="outline" className="mt-4"><Link to={lp("/forms")}>Browse forms</Link></Button>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(({ key, latest, versions }) => (
            <Card key={key}>
              <CardContent className="p-4 flex items-center gap-4 flex-wrap">
                <FileText className="h-5 w-5 text-accent shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm truncate">{titleFor(latest)}</p>
                    <Badge variant={latest.variant === "clean" ? "default" : "secondary"} className="text-[10px]">
                      {latest.variant === "clean" ? "CLEAN" : "FREE"}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">{STATUS_LABEL[latest.status]}</Badge>
                    {latest.state_code && <Badge variant="outline" className="text-[10px]">{latest.state_code}</Badge>}
                    {latest.kind === "pack" && <Badge variant="outline" className="text-[10px]">PACK</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    v{latest.version} · {new Date(latest.created_at).toLocaleString()} {latest.size_bytes ? `· ${Math.round(latest.size_bytes / 1024)} KB` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {versions.length > 1 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" variant="ghost" className="gap-1"><History className="h-3.5 w-3.5" /> {versions.length} versions</Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-72 p-2">
                        <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Version history</p>
                        {versions.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => download(v)}
                            className="w-full flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-secondary/60"
                          >
                            <span>v{v.version} <span className="text-xs text-muted-foreground">({v.variant})</span></span>
                            <span className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleDateString()}</span>
                          </button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  )}
                  <Button size="sm" onClick={() => download(latest)} className="gap-1 bg-accent text-accent-foreground hover:bg-gold-dark">
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="mt-8 text-xs text-muted-foreground">
        Documents are stored privately — only you can access them. LegallySpoken is not a law firm and this library is not a substitute for legal advice.
      </p>
    </div>
  );
}
