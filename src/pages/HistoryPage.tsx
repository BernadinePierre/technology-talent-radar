import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Eye, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface SavedResult {
  id: string;
  role_label: string;
  role_value: string;
  region: string;
  experience: string;
  overall_score: number;
  core_score: number;
  supporting_score: number;
  differentiator_score: number;
  created_at: string;
}

const HistoryPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [results, setResults] = useState<SavedResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchResults = async () => {
      const { data, error } = await supabase
        .from("diagnostic_results")
        .select("id, role_label, role_value, region, experience, overall_score, core_score, supporting_score, differentiator_score, created_at")
        .order("created_at", { ascending: false });
      if (error) toast.error("Failed to load history");
      else setResults(data || []);
      setLoading(false);
    };
    fetchResults();
  }, [user]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("diagnostic_results").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else setResults((prev) => prev.filter((r) => r.id !== id));
  };

  const scoreColor = (score: number) =>
    score >= 70 ? "text-accent" : score >= 40 ? "text-secondary" : "text-destructive";

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Home
          </Button>
          <span className="font-heading text-xl font-bold text-primary tracking-tight">
            SkillScope
          </span>
        </div>
      </nav>

      <div className="container py-8 md:py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading">Your History</h1>
            <p className="text-muted-foreground text-sm">Past diagnostic results</p>
          </div>
          <Button variant="hero" onClick={() => navigate("/diagnostic")}>
            New Diagnostic
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No diagnostics yet</p>
            <p className="text-sm mt-1">Run your first diagnostic to see it here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-5 flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold truncate">{r.role_label}</h3>
                  <p className="text-xs text-muted-foreground">
                    {r.region} · {r.experience} · {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-2xl font-bold font-heading ${scoreColor(r.overall_score)}`}>
                  {r.overall_score}%
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/diagnostic/result/${r.id}`)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(r.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
