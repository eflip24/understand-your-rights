import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Bookmark, Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface SaveAnalysisButtonProps {
  toolSlug: string;
  toolName: string;
  inputData: Record<string, unknown>;
  resultData: Record<string, unknown>;
}

export default function SaveAnalysisButton({ toolSlug, toolName, inputData, resultData }: SaveAnalysisButtonProps) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        <Link to="/login" className="text-accent hover:underline">Log in</Link> to save this analysis.
      </p>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from("saved_analyses").insert({
      user_id: user.id,
      tool_slug: toolSlug,
      tool_name: toolName,
      input_data: inputData as any,
      result_data: resultData as any,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Save Failed", description: error.message, variant: "destructive" });
    } else {
      setSaved(true);
      toast({ title: "Saved!", description: "Analysis saved to your dashboard." });
    }
  };

  if (saved) {
    return (
      <Button variant="outline" disabled className="w-full gap-2">
        <CheckCircle className="h-4 w-4 text-green-600" />
        Saved to Dashboard
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={handleSave} disabled={saving} className="w-full gap-2">
      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bookmark className="h-4 w-4" />}
      Save Analysis
    </Button>
  );
}
