import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Target, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";
import heroRadar from "@/assets/hero-cube.png";
import logo from "@/assets/logo.png";

const steps = [
  {
    icon: FileText,
    title: "Upload your CV",
    description: "Paste your CV text or upload a document to extract your skills.",
  },
  {
    icon: Target,
    title: "Select target role",
    description: "Choose the technical role you're aiming for.",
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
          <div className="flex items-center gap-2">
            <img src={logo} alt="Tech Talent Radar logo" className="h-8 w-8" />
            <span className="font-heading text-xl font-bold text-primary tracking-tight">
              Tech Talent Radar
            </span>
          </div>
          <Button variant="hero" size="sm" onClick={() => navigate("/diagnostic")}>
            Run Diagnostic
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-navy">
        <div className="container py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
                See the gap between your{" "}
                <span className="text-gradient">skills</span> and the role you want.
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-lg leading-relaxed">
                Compare your CV against live UK tech job demand. Get a clear diagnostic of what you have, what you're missing, and what to learn next.
              </p>
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/diagnostic")}
                className="group"
              >
                Run Free Report
                <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="flex gap-4 mt-4">
                <a
                  href="#how-it-works"
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground/90 transition-colors underline underline-offset-4"
                >
                  How does it work?
                </a>
                <a
                  href="#why-this-tool"
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground/90 transition-colors underline underline-offset-4"
                >
                  Why this tool exists
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src={heroRadar}
                alt="Radar chart comparing candidate skills against market demand"
                className="rounded-xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container py-20 pb-12 scroll-mt-20">
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-10 text-xs text-muted-foreground"
        >
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span>Your CV data is processed securely and is never stored or shared with third parties.</span>
        </motion.div>
      </section>

      {/* Why This Tool Exists */}
      <section id="why-this-tool" className="border-t border-border scroll-mt-20">
        <div className="container py-20 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-heading">
              Why This Tool Exists
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-lg font-medium text-foreground">The goal is simple: clarity.</p>
              <ul className="space-y-1 pl-0 list-none">
                <li>Clarity about what you already have.</li>
                <li>Clarity about what you're missing.</li>
                <li>Clarity about where to focus your time.</li>
              </ul>
              <p>
                The tech job market moves fast, and the signals aren't always clear. People say "learn the right skills", but figuring out what those actually are often means digging through countless job descriptions and trying to interpret patterns on your own.
              </p>
              <p>I built Tech Talent Radar to make that process simpler.</p>
              <p>
                Instead of guessing what employers want, the tool compares your current skills with real market demand and shows where you stand. Not in theory, but based on the skills employers are actually listing in job postings.
              </p>
              <p>
                Tech Talent Radar is here to give people a clearer picture of the gap between where they are and where they want to go, so that they can focus their efforts with intention instead of guesswork.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          Tech Talent Radar™. Built for career switchers & aspiring technologists.
        </div>
      </footer>
    </div>
  );
};

export default Index;
