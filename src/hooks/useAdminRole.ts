import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useAdminRole() {
  const { user, loading: authLoading } = useAuth();

  const { data: isAdmin = false, isLoading } = useQuery({
    queryKey: ["admin-role", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .eq("role", "admin");
      return (data?.length ?? 0) > 0;
    },
    enabled: !!user && !authLoading,
    staleTime: 10 * 60 * 1000, // 10 min cache
  });

  return { isAdmin, loading: authLoading || isLoading };
}
