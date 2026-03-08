import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Tags, Eye, FilePen } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [postsRes, catsRes] = await Promise.all([
        supabase.from("blog_posts").select("id, status"),
        supabase.from("blog_categories").select("id"),
      ]);
      const posts = postsRes.data || [];
      return {
        totalPosts: posts.length,
        published: posts.filter((p) => p.status === "published").length,
        drafts: posts.filter((p) => p.status === "draft").length,
        categories: catsRes.data?.length || 0,
      };
    },
  });

  const cards = [
    { label: "Total Posts", value: stats?.totalPosts ?? "–", icon: FileText },
    { label: "Published", value: stats?.published ?? "–", icon: Eye },
    { label: "Drafts", value: stats?.drafts ?? "–", icon: FilePen },
    { label: "Categories", value: stats?.categories ?? "–", icon: Tags },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-foreground mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
