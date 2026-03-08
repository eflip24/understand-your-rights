import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Trash2, FileText, Scale } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

interface SavedAnalysis {
  id: string;
  tool_slug: string;
  tool_name: string;
  created_at: string;
  result_data: Record<string, unknown>;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchAnalyses = async () => {
      const { data, error } = await supabase
        .from("saved_analyses")
        .select("id, tool_slug, tool_name, created_at, result_data")
        .order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setAnalyses((data as SavedAnalysis[]) || []);
      }
      setLoading(false);
    };
    fetchAnalyses();
  }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_analyses").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
      toast({ title: "Deleted", description: "Analysis removed." });
    }
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-12 px-4">
      <Helmet>
        <title>Dashboard | LegallySpoken</title>
      </Helmet>
      <div className="flex items-center gap-3 mb-8">
        <Scale className="h-7 w-7 text-accent" />
        <div>
          <h1 className="font-serif text-2xl font-bold">Your Dashboard</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <h2 className="font-semibold text-lg mb-4">Saved Analyses</h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : analyses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <FileText className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>No saved analyses yet.</p>
            <p className="text-sm mt-1">Use our AI tools and save the results to see them here.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/tools/ai">Browse AI Tools</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {analyses.map((analysis) => (
            <Card key={analysis.id}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{analysis.tool_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(analysis.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(analysis.id)}
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
