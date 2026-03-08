import { useState } from "react";
import { DiagnosticResult, SkillCategory } from "@/lib/skillData";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Download, TrendingUp, Heart } from "lucide-react";

interface DiagnosticReportProps {
  result: DiagnosticResult;
  onRestart: () => void;
}

type Tab = "readiness" | "skills" | "market" | "plan";

const categoryMeta: Record<SkillCategory, { label: string; description: string }> = {
  core: { label: "Core Skills", description: "Essential requirements — most job listings expect these." },
  supporting: { label: "Supporting Skills", description: "Complementary tools and knowledge that strengthen applications." },
  differentiator: { label: "Differentiators", description: "Skills that set candidates apart from the competition." },
};

const ScoreBar = ({ label, score }: { label: string; score: number }) => {
  const color = score >= 70 ? "bg-accent" : score >= 40 ? "bg-secondary" : "bg-destructive";
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground font-mono">{score}%</span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
};

export const DiagnosticReport = ({ result, onRestart }: DiagnosticReportProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("readiness");
  const [skillCat, setSkillCat] = useState<SkillCategory>("core");

  const { role, matchedSkills, overallScore, coreScore, supportingScore, differentiatorScore } = result;
  const gaps = matchedSkills.filter((m) => !m.found);
  const matched = matchedSkills.filter((m) => m.found);
  const topGaps = gaps.sort((a, b) => b.skill.demandLevel - a.skill.demandLevel).slice(0, 5);

  // Generate 30-day plan items from top gaps
  const planItems = topGaps.slice(0, 5).map((g) => {
    const templates = [
      `Complete a ${g.skill.name} practice project`,
      `Take an online course on ${g.skill.name}`,
      `Build a portfolio piece using ${g.skill.name}`,
      `Attend a ${g.skill.name} workshop or webinar`,
      `Read documentation and tutorials for ${g.skill.name}`,
    ];
    return templates[topGaps.indexOf(g) % templates.length];
  });

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
      "",
      "30-DAY ACTION PLAN:",
      ...planItems.map((item, i) => `  ${i + 1}. ${item}`),
      "",
      "Labour market data derived from IT Jobs Watch (CC BY-NC-SA 4.0).",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `skillscope-${role.value}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "readiness", label: "Readiness" },
    { key: "skills", label: "Skills Map" },
    { key: "market", label: "Market Snapshot" },
    { key: "plan", label: "30-Day Plan" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-1">Diagnostic Report</h1>
        <p className="text-muted-foreground">
          Target role: <span className="font-semibold text-foreground">{role.label}</span>
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex-1 text-sm font-medium rounded-md px-3 py-2 transition-colors ${
              activeTab === t.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "readiness" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-[200px_1fr] gap-6">
            {/* Readiness score circle */}
            <div className="bg-card rounded-xl border border-border p-6 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Readiness Score</h3>
              <div className="w-28 h-28 rounded-full border-[6px] border-accent flex items-center justify-center mb-3">
                <span className="text-3xl font-bold font-heading">{overallScore}%</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {overallScore >= 70
                  ? "Strong alignment"
                  : overallScore >= 40
                  ? "Moderate — core gaps need focus"
                  : "Early stage — prioritise core skills"}
              </p>
            </div>

            {/* Score bars + top gaps */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <ScoreBar label="Core Skills" score={coreScore} />
                <ScoreBar label="Supporting Skills" score={supportingScore} />
                <ScoreBar label="Differentiators" score={differentiatorScore} />
              </div>

              {topGaps.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-sm font-semibold font-heading mb-3">Top Skill Gaps</h3>
                  <ol className="space-y-2">
                    {topGaps.map((g, i) => (
                      <li key={g.skill.name} className="flex items-center gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span>{g.skill.name}</span>
                        <span className="text-muted-foreground text-xs ml-auto font-mono">{g.skill.demandLevel}%</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "skills" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-lg font-semibold font-heading">Skills Map</h3>

          {/* Category tabs */}
          <div className="flex gap-2">
            {(["core", "supporting", "differentiator"] as SkillCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSkillCat(cat)}
                className={`text-sm font-medium px-4 py-1.5 rounded-md transition-colors ${
                  skillCat === cat
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {categoryMeta[cat].label}
              </button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">{categoryMeta[skillCat].description}</p>

          <div className="flex flex-wrap gap-2">
            {matchedSkills
              .filter((m) => m.skill.category === skillCat)
              .map((m) => (
                <span
                  key={m.skill.name}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium ${
                    m.found
                      ? "bg-accent/10 border-accent/30 text-foreground"
                      : "bg-muted/50 border-border text-muted-foreground"
                  }`}
                >
                  {m.found ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-destructive/60" />
                  )}
                  {m.skill.name}
                </span>
              ))}
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            Source: <a href="https://www.itjobswatch.co.uk/" target="_blank" rel="noopener noreferrer" className="underline text-secondary">IT Jobs Watch</a>
          </p>
        </div>
      )}

      {activeTab === "market" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-lg font-semibold font-heading">Market Snapshot</h3>
          <p className="text-xs text-muted-foreground">Indicative signals for {role.label} roles in the UK.</p>

          <div className="grid sm:grid-cols-3 gap-4">
            <MarketCard label="Median Salary" value="Market rate" sub="Based on advertised roles" />
            <MarketCard label="Demand Trend" value="Stable" sub="6-month direction" icon />
            <MarketCard label="Posting Volume" value="Active" sub="Current UK listings" />
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            Source: <a href="https://www.itjobswatch.co.uk/" target="_blank" rel="noopener noreferrer" className="underline text-secondary">IT Jobs Watch</a>
          </p>
        </div>
      )}

      {activeTab === "plan" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="text-lg font-semibold font-heading">30-Day Action Plan</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Focus on closing your top skill gaps with these actionable steps.
          </p>
          <div className="space-y-3">
            {planItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
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

      {/* Contribution card */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-destructive" />
          <h3 className="text-lg font-semibold font-heading">Support continued development</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          SkillScope is free to use. Contributions help keep the tool running and improving. This does not unlock extra features — it keeps the tool free for everyone.
        </p>
        <div className="flex flex-wrap gap-2">
          {["£3", "£7", "£15"].map((amount) => (
            <Button key={amount} variant="outline" size="sm" className="min-w-[60px]">
              {amount}
            </Button>
          ))}
          <Button variant="outline" size="sm">
            Custom
          </Button>
        </div>
      </div>

      {/* Attribution footer */}
      <p className="text-xs text-center text-muted-foreground pt-4 border-t border-border">
        Labour market data derived from IT Jobs Watch (CC BY-NC-SA 4.0).
      </p>
    </div>
  );
};

const MarketCard = ({ label, value, sub, icon }: { label: string; value: string; sub: string; icon?: boolean }) => (
  <div className="bg-muted/50 rounded-lg p-4 space-y-1">
    <p className="text-xs text-muted-foreground font-medium">{label}</p>
    <div className="flex items-center gap-1.5">
      <p className="text-lg font-bold font-heading">{value}</p>
      {icon && <TrendingUp className="w-4 h-4 text-accent" />}
    </div>
    <p className="text-xs text-muted-foreground">{sub}</p>
  </div>
);
