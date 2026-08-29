import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download } from "lucide-react";
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
import { AD_SLOT_IDS, AUTO_ADS_ONLY } from "@/lib/adsense";

interface AdEventRow {
  event_type: string;
  slot: string;
  page_type: string;
  path: string;
  created_at: string;
}

interface Agg {
  key: string;
  impressions: number;
  clicks: number;
}

const RANGES = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

function aggregate(rows: AdEventRow[], keyOf: (r: AdEventRow) => string): Agg[] {
  const map = new Map<string, Agg>();
  for (const r of rows) {
    const key = keyOf(r) || "—";
    const entry = map.get(key) || { key, impressions: 0, clicks: 0 };
    if (r.event_type === "click") entry.clicks += 1;
    else entry.impressions += 1;
    map.set(key, entry);
  }
  return [...map.values()].sort((a, b) => b.impressions - a.impressions);
}

const ctr = (a: Agg) => (a.impressions ? (a.clicks / a.impressions) * 100 : 0);

export default function AdminAds() {
  const [rows, setRows] = useState<AdEventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const since = new Date(Date.now() - Number(range) * 86400000).toISOString();
      const { data, error } = await supabase
        .from("ad_events")
        .select("event_type, slot, page_type, path, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(20000);
      if (cancelled) return;
      if (error) {
        toast({ title: "Load failed", description: error.message, variant: "destructive" });
      }
      setRows((data as AdEventRow[]) || []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [range]);

  const bySlot = useMemo(() => aggregate(rows, (r) => r.slot), [rows]);
  const byPageType = useMemo(() => aggregate(rows, (r) => r.page_type), [rows]);
  const byPath = useMemo(() => aggregate(rows, (r) => r.path).slice(0, 25), [rows]);

  const totals = useMemo(
    () => ({
      impressions: rows.filter((r) => r.event_type !== "click").length,
      clicks: rows.filter((r) => r.event_type === "click").length,
    }),
    [rows],
  );

  const exportCsv = () => {
    const lines = ["scope,key,impressions,clicks,ctr_pct"];
    const push = (scope: string, list: Agg[]) =>
      list.forEach((a) =>
        lines.push(`${scope},"${a.key}",${a.impressions},${a.clicks},${ctr(a).toFixed(2)}`),
      );
    push("slot", bySlot);
    push("page_type", byPageType);
    push("path", byPath);
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ad-performance-${range}d.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const table = (title: string, label: string, list: Agg[]) => (
    <section className="rounded-lg border bg-card">
      <h2 className="px-4 py-3 text-sm font-semibold border-b">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{label}</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">CTR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-muted-foreground text-sm">
                No data in this range yet.
              </TableCell>
            </TableRow>
          )}
          {list.map((a) => (
            <TableRow key={a.key}>
              <TableCell className="font-medium break-all">{a.key}</TableCell>
              <TableCell className="text-right">{a.impressions.toLocaleString()}</TableCell>
              <TableCell className="text-right">{a.clicks.toLocaleString()}</TableCell>
              <TableCell className="text-right">{ctr(a).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );

  const namedUnits = Object.entries(AD_SLOT_IDS);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Ad performance</h1>
          <p className="text-sm text-muted-foreground">
            First-party view and click tracking by placement, page type and page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Views</p>
          <p className="text-2xl font-bold">{totals.impressions.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">Clicks</p>
          <p className="text-2xl font-bold">{totals.clicks.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs uppercase text-muted-foreground">CTR</p>
          <p className="text-2xl font-bold">
            {totals.impressions ? ((totals.clicks / totals.impressions) * 100).toFixed(2) : "0.00"}%
          </p>
        </div>
      </div>

      <section className="rounded-lg border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">Placement configuration</h2>
          <Badge variant={AUTO_ADS_ONLY ? "secondary" : "default"}>
            {AUTO_ADS_ONLY ? "Auto ads only" : "Named units active"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {AUTO_ADS_ONLY
            ? "No named ad units are configured, so Google decides every placement and per-slot reporting is unavailable. Create a display unit per placement in AdSense and set the matching environment variable to switch that placement to a named unit."
            : "Named units are in use. Placements without an ID still fall back to auto format."}
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {namedUnits.map(([slot, id]) => (
            <div key={slot} className="flex items-center justify-between rounded border px-3 py-2 text-sm">
              <span className="font-medium">{slot}</span>
              <span className="text-muted-foreground font-mono text-xs">
                {id || `VITE_ADSENSE_SLOT_${slot.replace(/-/g, "_").toUpperCase()}`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : (
        <div className="space-y-6">
          {table("By placement", "Slot", bySlot)}
          {table("By page type", "Page type", byPageType)}
          {table("Top pages", "Path", byPath)}
        </div>
      )}
    </div>
  );
}
