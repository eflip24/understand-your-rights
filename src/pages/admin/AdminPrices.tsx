import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface PriceRow {
  slug: string;
  title: string;
  kind: "form" | "pack";
  amount_cents: number;
  currency: string;
  active: boolean;
  _dirty?: boolean;
  _saving?: boolean;
}

export default function AdminPrices() {
  const [rows, setRows] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("form_prices")
        .select("slug, title, kind, amount_cents, currency, active")
        .order("kind", { ascending: false })
        .order("slug");
      if (error) toast({ title: "Load failed", description: error.message, variant: "destructive" });
      setRows((data as PriceRow[]) || []);
      setLoading(false);
    })();
  }, []);

  const updateRow = (slug: string, patch: Partial<PriceRow>) => {
    setRows((prev) => prev.map((r) => (r.slug === slug ? { ...r, ...patch, _dirty: true } : r)));
  };

  const saveRow = async (row: PriceRow) => {
    setRows((prev) => prev.map((r) => (r.slug === row.slug ? { ...r, _saving: true } : r)));
    const { error } = await supabase
      .from("form_prices")
      .update({
        title: row.title,
        amount_cents: row.amount_cents,
        currency: row.currency.toLowerCase(),
        active: row.active,
      })
      .eq("slug", row.slug);
    setRows((prev) =>
      prev.map((r) => (r.slug === row.slug ? { ...r, _saving: false, _dirty: Boolean(error) } : r)),
    );
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Saved", description: `${row.slug} updated.` });
  };

  const filtered = rows.filter(
    (r) => !q || r.slug.toLowerCase().includes(q.toLowerCase()) || r.title.toLowerCase().includes(q.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl font-bold">Form & Pack Pricing</h1>
        <p className="text-sm text-muted-foreground">
          These prices drive Stripe checkout for every paid form and pack. Amounts are stored in cents.
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search slug or title…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slug</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-20">Kind</TableHead>
              <TableHead className="w-32">Amount (cents)</TableHead>
              <TableHead className="w-32">Display</TableHead>
              <TableHead className="w-24">Currency</TableHead>
              <TableHead className="w-20">Active</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.slug}>
                <TableCell className="font-mono text-xs">{row.slug}</TableCell>
                <TableCell>
                  <Input
                    value={row.title}
                    onChange={(e) => updateRow(row.slug, { title: e.target.value })}
                    className="h-8 text-sm"
                  />
                </TableCell>
                <TableCell className="text-xs uppercase text-muted-foreground">{row.kind}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={0}
                    value={row.amount_cents}
                    onChange={(e) => updateRow(row.slug, { amount_cents: Number(e.target.value) })}
                    className="h-8 text-sm"
                  />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {(row.amount_cents / 100).toLocaleString(undefined, {
                    style: "currency",
                    currency: row.currency || "usd",
                  })}
                </TableCell>
                <TableCell>
                  <Input
                    value={row.currency}
                    onChange={(e) => updateRow(row.slug, { currency: e.target.value })}
                    className="h-8 text-sm uppercase"
                    maxLength={3}
                  />
                </TableCell>
                <TableCell>
                  <Switch checked={row.active} onCheckedChange={(v) => updateRow(row.slug, { active: v })} />
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={row._dirty ? "default" : "outline"}
                    disabled={!row._dirty || row._saving}
                    onClick={() => saveRow(row)}
                    className="gap-1"
                  >
                    {row._saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
