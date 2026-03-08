import { DiagnosticResult, SkillCategory } from "@/lib/skillData";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Download } from "lucide-react";

interface DiagnosticReportProps {
  result: DiagnosticResult;
  onRestart: () => void;
}

const categoryMeta: Record<SkillCategory, { label: string; description: string }> = {
  core: {
    label: "Core Skills",
    description: "Essential requirements — most job listings expect these.",
  },
  supporting: {
    label: "Supporting Skills",
    description: "Complementary tools and knowledge that strengthen applications.",
  },
  differentiator: {
    label: "Differentiators",
    description: "Skills that set candidates apart from the competition.",
  },
};

const ScoreBar = ({ label, score }: { label: string; score: number }) => {
  const color =
    score >= 70
      ? "bg-accent"
      : score >= 40
      ? "bg-secondary"
      : "bg-destructive";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground font-mono">{score}%</span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export const DiagnosticReport = ({ result, onRestart }: DiagnosticReportProps) => {
  const { role, matchedSkills, overallScore, coreScore, supportingScore, differentiatorScore } = result;

  const gaps = matchedSkills.filter((m) => !m.found);
  const matched = matchedSkills.filter((m) => m.found);

  const handleDownload = () => {
    const lines = [
      `SkillScope Diagnostic Report — ${role.label}`,
      `Overall Score: ${overallScore}%`,
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-1">
          Diagnostic Report
        </h1>
        <p className="text-muted-foreground">
          Target role: <span className="font-semibold text-foreground">{role.label}</span>
        </p>
      </div>

      {/* Overall Score */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-secondary flex items-center justify-center">
            <span className="text-2xl font-bold font-heading">{overallScore}%</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold font-heading">Overall Match</h2>
            <p className="text-sm text-muted-foreground">
              {overallScore >= 70
                ? "Strong alignment — focus on differentiators."
                : overallScore >= 40
                ? "Moderate coverage — core gaps need attention."
                : "Early stage — prioritise core skills."}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <ScoreBar label="Core Skills" score={coreScore} />
          <ScoreBar label="Supporting Skills" score={supportingScore} />
          <ScoreBar label="Differentiators" score={differentiatorScore} />
        </div>
      </div>

      {/* Skill Breakdown */}
      {(["core", "supporting", "differentiator"] as SkillCategory[]).map((cat) => {
        const catSkills = matchedSkills.filter((m) => m.skill.category === cat);
        const meta = categoryMeta[cat];
        return (
          <div key={cat} className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold font-heading mb-1">{meta.label}</h3>
            <p className="text-xs text-muted-foreground mb-4">{meta.description}</p>
            <div className="grid gap-2">
              {catSkills.map((m) => (
                <div
                  key={m.skill.name}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2.5">
                    {m.found ? (
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive shrink-0" />
                    )}
                    <span className="text-sm font-medium">{m.skill.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {m.skill.demandLevel}% demand
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Gaps Summary */}
      {gaps.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold font-heading mb-3">
            Recommended Development Areas
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            These skills appeared in market demand data but weren't detected in your CV. Prioritise by demand level.
          </p>
          <div className="flex flex-wrap gap-2">
            {gaps
              .sort((a, b) => b.skill.demandLevel - a.skill.demandLevel)
              .map((m) => (
                <span
                  key={m.skill.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/30 text-xs font-medium"
                >
                  {m.skill.name}
                  <span className="text-muted-foreground">{m.skill.demandLevel}%</span>
                </span>
              ))}
          </div>
        </div>
      )}

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
    </div>
  );
};
