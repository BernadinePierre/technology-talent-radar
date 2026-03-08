import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DiagnosticInput } from "@/components/DiagnosticInput";
import { DiagnosticReport } from "@/components/DiagnosticReport";
import { DiagnosticResult, extractSkillsFromCV, generateDiagnostic } from "@/lib/skillData";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface DiagnosticFormData {
  cvText: string;
  role: string;
  region: string;
  experience: string;
}

const DiagnosticPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"input" | "processing" | "results">("input");
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleSubmit = (data: DiagnosticFormData) => {
    setStep("processing");

    // Simulate processing
    setTimeout(() => {
      const cvSkills = extractSkillsFromCV(data.cvText);
      const diagnostic = generateDiagnostic(cvSkills, data.role, data.region, data.experience);
      setResult(diagnostic);
      setStep("results");
    }, 2000);
  };

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
        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DiagnosticInput onSubmit={handleSubmit} />
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-6"
            >
              <div className="w-16 h-16 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
              <div className="text-center">
                <h2 className="text-xl font-semibold font-heading mb-2">Analysing your CV</h2>
                <p className="text-muted-foreground text-sm animate-pulse-soft">
                  Extracting skills and comparing with market demand…
                </p>
              </div>
            </motion.div>
          )}

          {step === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DiagnosticReport
                result={result}
                onRestart={() => {
                  setStep("input");
                  setResult(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiagnosticPage;
