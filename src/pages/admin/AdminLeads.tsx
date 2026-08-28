import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface LeadRow {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  state_code: string | null;
  city: string | null;
  claim_type: string;
  incident_date: string | null;
  description: string | null;
  estimated_value_cents: number | null;
  sol_open: boolean | null;
  quality_score: number;
  tier: string;
  status: string;
  source_path: string | null;
}

const STATUSES = ["new", "contacted", "qualified", "sold", "rejected"];

const money = (cents: number | null) =>
  cents == null ? "—" : `$${Math.round(cents / 100).toLocaleString()}`;

const tierVariant = (tier: string) =>
  tier === "premium" ? "default" : tier === "standard" ? "secondary" : "outline";

export default function AdminLeads() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("case_leads")
        .select(
          "id, created_at, full_name, email, phone, state_code, city, claim_type, incident_date, description, estimated_value_cents, sol_open, quality_score, tier, status, source_path",
        )
        .order("quality_score", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) {
        toast({ title: "Load failed", description: error.message, variant: "destructive" });
      }
      setRows((data as LeadRow[]) || []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (tier !== "all" && r.tier !== tier) return false;
      if (status !== "all" && r.status !== status) return false;
      if (!needle) return true;
      return [r.full_name, r.email, r.claim_type, r.state_code, r.city]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(needle));
    });
  }, [rows, q, tier, status]);

  const stats = useMemo(() => {
    const premium = rows.filter((r) => r.tier === "premium").length;
    const open = rows.filter((r) => r.status === "new").length;
    const avg = rows.length
      ? Math.round(rows.reduce((s, r) => s + r.quality_score, 0) / rows.length)
      : 0;
    return { total: rows.length, premium, open, avg };
  }, [rows]);

  const setLeadStatus = async (id: string, next: string) => {
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: next } : r)));
    const { error } = await supabase.from("case_leads").update({ status: next }).eq("id", id);
    if (error) {
      setRows(prev);
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    }
  };

  const exportCsv = () => {
    const head = [
      "created_at",
      "score",
      "tier",
      "status",
      "name",
      "email",
      "phone",
      "state",
      "city",
      "claim_type",
      "incident_date",
      "est_value_usd",
      "sol_open",
      "source_path",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const body = filtered.map((r) =>
      [
        r.created_at,
        r.quality_score,
        r.tier,
        r.status,
        r.full_name,
        r.email,
        r.phone,
        r.state_code,
        r.city,
        r.claim_type,
        r.incident_date,
        r.estimated_value_cents == null ? "" : Math.round(r.estimated_value_cents / 100),
        r.sol_open,
        r.source_path,
      ]
        .map(esc)
        .join(","),
    );
    const blob = new Blob([[head.join(","), ...body].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `case-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-8 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading leads…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Case leads</h1>
        <p className="text-sm text-muted-foreground">
          Free case-review submissions, scored by claim economics, filing window and
          contactability. Highest value first.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total leads", value: stats.total },
          { label: "Premium tier", value: stats.premium },
          { label: "Awaiting contact", value: stats.open },
          { label: "Average score", value: stats.avg },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border p-4">
            <div className="text-2xl font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search name, email, claim, state…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tiers</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={exportCsv}>
          <Download className="h-4 w-4" /> CSV
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Score</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Claim</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Est. value</TableHead>
              <TableHead>Filing window</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold tabular-nums">{r.quality_score}</span>
                    <Badge variant={tierVariant(r.tier)}>{r.tier}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{r.full_name}</div>
                  <div className="text-xs text-muted-foreground">{r.email}</div>
                  {r.phone ? <div className="text-xs text-muted-foreground">{r.phone}</div> : null}
                </TableCell>
                <TableCell>
                  <div className="capitalize">{r.claim_type.replace(/-/g, " ")}</div>
                  {r.incident_date ? (
                    <div className="text-xs text-muted-foreground">on {r.incident_date}</div>
                  ) : null}
                </TableCell>
                <TableCell className="text-sm">
                  {[r.city, r.state_code].filter(Boolean).join(", ") || "—"}
                </TableCell>
                <TableCell className="tabular-nums">{money(r.estimated_value_cents)}</TableCell>
                <TableCell className="text-sm">
                  {r.sol_open === true ? "Open" : r.sol_open === false ? "Likely expired" : "Unknown"}
                </TableCell>
                <TableCell>
                  <Select value={r.status} onValueChange={(v) => setLeadStatus(r.id, v)}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                  No leads match these filters yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
