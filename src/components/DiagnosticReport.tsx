import { useState, useEffect } from "react";
import { DiagnosticResult, SkillCategory } from "@/lib/skillData";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Download, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { MarketAnalysis } from "@/components/MarketAnalysis";
import { supabase } from "@/integrations/supabase/client";

interface DiagnosticReportProps {
  result: DiagnosticResult;
  onRestart: () => void;
}

const categoryMeta: Record<SkillCategory, { label: string; description: string; color: string }> = {
  core: {
    label: "Core Skills",
    description: "Essential requirements — most job listings expect these.",
    color: "bg-secondary text-secondary-foreground",
  },
  supporting: {
    label: "Supporting Skills",
    description: "Complementary tools and knowledge that strengthen applications.",
    color: "bg-accent text-accent-foreground",
  },
  differentiator: {
    label: "Differentiators",
    description: "Skills that set candidates apart from the competition.",
    color: "bg-primary text-primary-foreground",
  },
};

/* ── Gauge ── */
const ReadinessGauge = ({ score }: { score: number }) => {
  const radius = 70;
  const stroke = 12;
  const circumference = Math.PI * radius; // half-circle
  const offset = circumference - (score / 100) * circumference;

  const gaugeColor =
    score >= 70
      ? "hsl(var(--accent))"
      : score >= 40
      ? "hsl(var(--secondary))"
      : "hsl(var(--destructive))";

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="100" viewBox="0 0 180 100" className="overflow-visible">
        {/* Background arc */}
        <path
          d="M 10 90 A 70 70 0 0 1 170 90"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Score arc */}
        <motion.path
          d="M 10 90 A 70 70 0 0 1 170 90"
          fill="none"
          stroke={gaugeColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="-mt-14 text-center">
        <motion.span
          className="text-4xl font-bold font-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {score}%
        </motion.span>
      </div>
    </div>
  );
};

/* ── Skills Map Tab Content ── */
const SkillsTabContent = ({
  skills,
  category,
}: {
  skills: DiagnosticResult["matchedSkills"];
  category: SkillCategory;
}) => {
  const catSkills = skills.filter((m) => m.skill.category === category);
  const meta = categoryMeta[category];

  return (
    <div>
      <p className="text-xs text-muted-foreground mb-4">{meta.description}</p>
      <div className="flex flex-wrap gap-2">
        {catSkills.map((m) => (
          <span
            key={m.skill.name}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              m.found
                ? meta.color
                : "bg-muted/60 text-muted-foreground"
            }`}
          >
            {m.found ? (
              <CheckCircle2 className="w-3 h-3 shrink-0" />
            ) : (
              <XCircle className="w-3 h-3 shrink-0" />
            )}
            {m.skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export const DiagnosticReport = ({ result, onRestart }: DiagnosticReportProps) => {
  const { role, region, experience, matchedSkills, overallScore, coreScore, supportingScore, differentiatorScore } = result;
  const [activeTab, setActiveTab] = useState<SkillCategory>("core");

  const gaps = matchedSkills.filter((m) => !m.found);
  const topGaps = [...gaps]
    .sort((a, b) => b.skill.demandLevel - a.skill.demandLevel)
    .slice(0, 5);

  const handleDownload = () => {
    const matched = matchedSkills.filter((m) => m.found);
    const lines = [
      `SkillScope Readiness Report — ${role.label}`,
      `Readiness Score: ${overallScore}%`,
      `Core: ${coreScore}% | Supporting: ${supportingScore}% | Differentiators: ${differentiatorScore}%`,
      "",
      "MATCHED SKILLS:",
      ...matched.map((m) => `  ✓ ${m.skill.name} (${m.skill.category})`),
      "",
      "SKILL GAPS:",
      ...gaps.map((m) => `  ✗ ${m.skill.name} (${m.skill.category}, demand: ${m.skill.demandLevel}%)`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `skillscope-${role.value}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate action items from top gaps
  const actionItems = topGaps.slice(0, 3).map((g) => {
    const actions: Record<string, string> = {
      SQL: "Complete an SQL practice project on real datasets",
      Python: "Build a Python portfolio project (e.g., data pipeline)",
      "CI/CD": "Learn CI/CD with an online course or hands-on lab",
      Docker: "Containerise a personal project with Docker",
      Kubernetes: "Set up a local K8s cluster and deploy an app",
      AWS: "Earn an AWS Cloud Practitioner certification",
      Terraform: "Write Terraform configs for a sample infrastructure",
      "Machine Learning": "Complete a Kaggle competition or ML course",
    };
    return actions[g.skill.name] || `Study ${g.skill.name} through courses or hands-on projects`;
  });



  const topStrengthCategory = coreScore >= supportingScore && coreScore >= differentiatorScore
    ? "core skills"
    : supportingScore >= differentiatorScore
    ? "supporting skills"
    : "differentiators";

  const weakestCategory = coreScore <= supportingScore && coreScore <= differentiatorScore
    ? "core skills"
    : supportingScore <= differentiatorScore
    ? "supporting skills"
    : "differentiators";

  const scoreSummary =
    overallScore >= 70
      ? `Great news — you're well-positioned for this role! Your ${topStrengthCategory} are a strong match. To truly stand out, focus on sharpening your ${weakestCategory}. Check the action plan below for your next steps.`
      : overallScore >= 40
      ? `You're building a solid foundation — your ${topStrengthCategory} show real promise. Closing the gaps in ${weakestCategory} will make a big difference. See the action plan below to accelerate your progress.`
      : `Every expert started here — you've taken the first step! Focus on building your ${weakestCategory} to gain momentum. The action plan below maps out exactly where to begin.`;

  const tabs: { key: SkillCategory; label: string }[] = [
    { key: "core", label: "Core Skills" },
    { key: "supporting", label: "Supporting Skills" },
    { key: "differentiator", label: "Differentiators" },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-1">
          Readiness Report
        </h1>
        <p className="text-muted-foreground">
          Target role: <span className="font-semibold text-foreground">{role.label}</span>
        </p>
      </div>

      {/* Top Row: Gauge + Gaps */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Readiness Score Card */}
        <div className="md:col-span-2 bg-card rounded-xl border border-border p-6 flex flex-col items-center">
          <h2 className="text-sm font-semibold font-heading text-muted-foreground mb-4 uppercase tracking-wider">
            Readiness Score
          </h2>
          <ReadinessGauge score={overallScore} />

          {/* Mini score bars */}
          <div className="w-full mt-6 space-y-3">
            {[
              { label: "Core", score: coreScore, color: "bg-secondary" },
              { label: "Supporting", score: supportingScore, color: "bg-accent" },
              { label: "Differentiators", score: differentiatorScore, color: "bg-primary" },
            ].map((bar) => (
              <div key={bar.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{bar.label}</span>
                  <span className="text-muted-foreground font-mono">{bar.score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${bar.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.score}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mt-5 leading-relaxed">
            {scoreSummary}
          </p>
        </div>

        {/* Top Skill Gaps + Skills Map */}
        <div className="md:col-span-3 space-y-6">
          {/* Top Skill Gaps */}
          {topGaps.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-sm font-semibold font-heading text-muted-foreground mb-3 uppercase tracking-wider">
                Top Skill Gaps
              </h3>
              <ol className="space-y-2">
                {topGaps.map((g, i) => (
                  <li
                    key={g.skill.name}
                    className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-muted/40"
                  >
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium flex-1">{g.skill.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {g.skill.demandLevel}% demand
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Skills Map */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-sm font-semibold font-heading text-muted-foreground mb-4 uppercase tracking-wider">
              Skills Map
            </h3>
            {/* Tabs */}
            <div className="flex gap-1 mb-4 bg-muted/50 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 text-xs font-medium px-3 py-2 rounded-md transition-all ${
                    activeTab === tab.key
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <SkillsTabContent skills={matchedSkills} category={activeTab} />
          </div>
        </div>
      </div>


      {/* Market Analysis */}
      <MarketAnalysis
        roleLabel={role.label}
        roleValue={role.value}
        region={region}
        experience={experience}
      />

      {/* 30-Day Action Plan */}
      {actionItems.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-sm font-semibold font-heading text-muted-foreground mb-4 uppercase tracking-wider">
            30-Day Action Plan
          </h3>
          <div className="space-y-3">
            {actionItems.map((action, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 px-3 rounded-lg bg-muted/30"
              >
                <TrendingUp className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-sm">{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attribution */}
      <p className="text-center text-[11px] text-muted-foreground">
        Labour market data derived from IT Jobs Watch (CC BY-NC-SC 4.0).
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="hero" size="lg" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-1" />
          Download Report
        </Button>
        <Button variant="outline" size="lg" onClick={onRestart}>
          <RotateCcw className="w-4 h-4 mr-1" />
          New Diagnostic
        </Button>
      </div>
    </motion.div>
  );
};
