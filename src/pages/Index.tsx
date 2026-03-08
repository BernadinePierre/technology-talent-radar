import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <span className="font-heading text-xl font-bold text-primary tracking-tight">
            SkillScope
          </span>
          <Button variant="hero" size="sm" onClick={() => navigate("/diagnostic")}>
            Run Diagnostic
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="container py-16 md:py-24 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold font-heading leading-tight mb-4"
          >
            Bridge Your Skills to Your Dream Job
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-10"
          >
            Find out where you stand and how to level up.
          </motion.p>

          {/* 3-step explainer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 bg-background rounded-xl border border-border px-6 py-4 mb-10"
          >
            <Step num={1} text="Upload CV or LinkedIn Profile" />
            <Chevron />
            <Step num={2} text="Choose Your Target Role" />
            <Chevron />
            <Step num={3} text="Get Your Free Diagnostic Report" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/diagnostic")}
              className="group"
            >
              Run Free Diagnostic
              <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="gradient-electric py-3">
        <p className="text-center text-sm text-secondary-foreground/90">
          Market context uses IT Jobs Watch (CC BY-NC-SA 4.0).
        </p>
      </div>

      {/* Preview section */}
      <section className="container py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 font-heading">
            What you'll get
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
            A clear diagnostic of your skills against real market demand — completely free.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <PreviewCard
              title="Readiness Score"
              description="See your overall match percentage and top 5 skill gaps at a glance."
            />
            <PreviewCard
              title="Skills Map"
              description="Skills grouped into Core, Supporting, and Differentiators with demand levels."
            />
            <PreviewCard
              title="Market Snapshot"
              description="Salary median, trend direction, and demand signals from IT Jobs Watch."
            />
            <PreviewCard
              title="30-Day Action Plan"
              description="A short, actionable checklist to close your top gaps fast."
            />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          SkillScope — Built for career switchers & early-career technologists.
        </div>
      </footer>
    </div>
  );
};

const Step = ({ num, text }: { num: number; text: string }) => (
  <div className="flex items-center gap-2">
    <span className="w-7 h-7 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center shrink-0">
      {num}
    </span>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const Chevron = () => (
  <span className="text-muted-foreground mx-1 hidden sm:inline">›</span>
);

const PreviewCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-card rounded-xl border border-border p-6">
    <h3 className="text-base font-semibold font-heading mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default Index;
