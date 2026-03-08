import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useContractAnalysis<T>(toolType: string) {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyze = async (payload: Record<string, string>) => {
    setIsLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-contract", {
        body: { toolType, ...payload },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResult(data as T);
    } catch (err: any) {
      toast({
        title: "Analysis Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, analyze, setResult };
}
