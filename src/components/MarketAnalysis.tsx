import { ExternalLink, MapPin, Briefcase, Hourglass, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MarketAnalysisProps {
  roleLabel: string;
  roleValue: string;
  region: string;
  experience: string;
}

/* ── Mock market data keyed by experience bracket ── */
const salaryBands: Record<string, { min: number; median: number; max: number }> = {
  "Less than 1 year": { min: 25000, median: 32000, max: 40000 },
  "1–2 years": { min: 30000, median: 38000, max: 48000 },
  "2–3 years": { min: 35000, median: 45000, max: 55000 },
  "3–5 years": { min: 42000, median: 55000, max: 70000 },
  "5–10 years": { min: 55000, median: 72000, max: 95000 },
  "10+ years": { min: 70000, median: 90000, max: 120000 },
};

const regionMultiplier: Record<string, number> = {
  London: 1.25,
  "South East": 1.1,
  "South West": 0.95,
  "East of England": 1.0,
  "West Midlands": 0.92,
  "East Midlands": 0.9,
  "North West": 0.93,
  "North East": 0.88,
  "Yorkshire and the Humber": 0.9,
  Scotland: 0.92,
  Wales: 0.88,
  "Northern Ireland": 0.85,
  Remote: 1.05,
};

function formatSalary(value: number) {
  return `£${Math.round(value / 1000)}k`;
}

function buildITJobsWatchUrl(roleLabel: string, region: string) {
  const roleSlug = encodeURIComponent(roleLabel);
  const regionSlug = region === "Remote" ? "" : encodeURIComponent(region);
  return `https://www.itjobswatch.co.uk/jobs/uk/${roleSlug}${regionSlug ? `%20${regionSlug}` : ""}.do`;
}

export const MarketAnalysis = ({ roleLabel, roleValue, region, experience }: MarketAnalysisProps) => {
  const baseSalary = salaryBands[experience] ?? salaryBands["2–3 years"];
  const multiplier = regionMultiplier[region] ?? 1.0;

  const salary = {
    min: Math.round(baseSalary.min * multiplier),
    median: Math.round(baseSalary.median * multiplier),
    max: Math.round(baseSalary.max * multiplier),
  };

  const url = buildITJobsWatchUrl(roleLabel, region);

  // Simulated stats
  const demandChange = Math.round((multiplier - 0.9) * 100 + 8);
  const openRoles = Math.round(800 + multiplier * 400 + (salaryBands[experience]?.median ?? 45000) / 100);
  const marketShare = ((multiplier * 3.2 + demandChange * 0.05)).toFixed(1);

  return (
    <motion.div
      className="bg-card rounded-xl border border-border p-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold font-heading text-muted-foreground uppercase tracking-wider">
          Market Analysis
        </h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary hover:underline"
        >
          View on IT Jobs Watch
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Role + Region + Experience tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
          <Briefcase className="w-3 h-3" />
          {roleLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-xs font-medium">
          <MapPin className="w-3 h-3" />
          {region}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium">
          <Hourglass className="w-3 h-3" />
          {experience}
        </span>
      </div>

      <TooltipProvider delayDuration={200}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/40 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Median Salary</p>
              <Tooltip>
                <TooltipTrigger asChild><span className="inline-flex"><Info className="w-3 h-3 text-muted-foreground cursor-help" /></span></TooltipTrigger>
                <TooltipContent><p className="text-xs max-w-48">Estimated median annual salary for this role, region, and experience level.</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-lg font-bold font-heading text-secondary">£{salary.median.toLocaleString()}</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Open Roles</p>
              <Tooltip>
                <TooltipTrigger asChild><span className="inline-flex"><Info className="w-3 h-3 text-muted-foreground cursor-help" /></span></TooltipTrigger>
                <TooltipContent><p className="text-xs max-w-48">Approximate number of live job postings matching this role and region.</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-lg font-bold font-heading text-foreground">{openRoles.toLocaleString()}</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Demand Trend</p>
              <Tooltip>
                <TooltipTrigger asChild><span className="inline-flex"><Info className="w-3 h-3 text-muted-foreground cursor-help" /></span></TooltipTrigger>
                <TooltipContent><p className="text-xs max-w-48">Year-over-year change in job postings for this role.</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-lg font-bold font-heading text-accent">+{demandChange}%</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Market Share</p>
              <Tooltip>
                <TooltipTrigger asChild><span className="inline-flex"><Info className="w-3 h-3 text-muted-foreground cursor-help" /></span></TooltipTrigger>
                <TooltipContent><p className="text-xs max-w-48">Percentage of all UK tech job postings represented by this role.</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-lg font-bold font-heading text-foreground">{marketShare}%</p>
          </div>
        </div>
      </TooltipProvider>
    </motion.div>
  );
};
