import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Target, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Upload your CV",
    description: "Paste your CV text or upload a document to extract your skills.",
  },
  {
    icon: Target,
    title: "Select target role",
    description: "Choose the UK tech role you're aiming for.",
  },
  {
    icon: BarChart3,
    title: "Get your diagnostic",
    description: "See exactly where you stand against real market demand.",
  },
];

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
      <section className="gradient-navy">
        <div className="container py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Know your{" "}
              <span className="text-gradient">skill gaps</span>
              <br />
              before the market does.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-lg leading-relaxed">
              Compare your CV against real UK tech job demand. Get a clear diagnostic of what you have, what you're missing, and what to learn next.
            </p>
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

      {/* How it works */}
      <section className="container py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-14 font-heading"
        >
          How it works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card rounded-xl border border-border p-6 text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-sm font-semibold text-muted-foreground mb-1">
                Step {i + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2 font-heading">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
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

export default Index;
