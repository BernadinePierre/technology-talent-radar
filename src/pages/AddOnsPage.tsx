import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Briefcase, PenTool, CalendarCheck, Mic } from "lucide-react";

const addOns = [
  {
    icon: FileText,
    title: "Interview Pack",
    price: "£9",
    description: "Role-specific questions with model answers and a scoring rubric to practise with confidence.",
  },
  {
    icon: Briefcase,
    title: "Portfolio Brief Pack",
    price: "£12",
    description: "3 tailored project briefs with acceptance criteria and test cases — ready to build.",
  },
  {
    icon: PenTool,
    title: "CV Rewrite Pack",
    price: "£7",
    description: "Bullet rewrites with quantified impact suggestions and ATS-optimised structure.",
  },
  {
    icon: CalendarCheck,
    title: "90-Day Execution Plan",
    price: "£15",
    description: "Weekly sprints, practice sets, and checkpoints to track your skill-building journey.",
  },
  {
    icon: Mic,
    title: "Mock Interview Simulator",
    price: "£9",
    description: "Timed prompts with structured feedback to sharpen your interview performance.",
  },
];

const AddOnsPage = () => {
  const navigate = useNavigate();

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

      <div className="container py-10 md:py-16 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">Advanced Add-ons</h1>
        <p className="text-muted-foreground mb-10 max-w-xl">
          Accelerate your career switch with curated, role-specific resources. Each add-on is self-contained — no subscription required.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addon) => (
            <div
              key={addon.title}
              className="bg-card rounded-xl border border-border p-6 flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <addon.icon className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-base font-semibold font-heading mb-1">{addon.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {addon.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold font-heading">{addon.price}</span>
                <Button variant="hero" size="sm">
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          SkillScope — Add-ons contain original content only and are not derived from third-party data.
        </div>
      </footer>
    </div>
  );
};

export default AddOnsPage;
