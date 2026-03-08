import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DiagnosticReport } from "@/components/DiagnosticReport";
import { DiagnosticResult } from "@/lib/skillData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user || !id) return;
    const fetch = async () => {
      const { data, error } = await supabase
        .from("diagnostic_results")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        toast.error("Result not found");
        navigate("/history");
        return;
      }
      // Reconstruct DiagnosticResult from DB row
      const matchedSkills = (data.matched_skills as any[]).map((m: any) => ({
        skill: m.skill,
        found: m.found,
      }));
      setResult({
        role: { label: data.role_label, value: data.role_value, skills: matchedSkills.map((m) => m.skill) },
        region: data.region,
        experience: data.experience,
        matchedSkills,
        overallScore: data.overall_score,
        coreScore: data.core_score,
        supportingScore: data.supporting_score,
        differentiatorScore: data.differentiator_score,
      });
      setLoading(false);
    };
    fetch();
  }, [user, id, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/history")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            History
          </Button>
          <span className="font-heading text-xl font-bold text-primary tracking-tight">
            Tech Talent Radar
          </span>
        </div>
      </nav>

      <div className="container py-8 md:py-12 max-w-3xl">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
          </div>
        ) : result ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DiagnosticReport result={result} onRestart={() => navigate("/diagnostic")} />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default ResultPage;
