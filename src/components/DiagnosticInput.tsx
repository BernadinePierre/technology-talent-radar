import { useState } from "react";
import { Button } from "@/components/ui/button";
import { roles, ukRegions, experienceLevels } from "@/lib/skillData";
import type { DiagnosticFormData } from "@/pages/DiagnosticPage";
import { Upload, FileText, Loader2 } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

interface DiagnosticInputProps {
  onSubmit: (data: DiagnosticFormData) => void;
}

export const DiagnosticInput = ({ onSubmit }: DiagnosticInputProps) => {
  const [cvText, setCvText] = useState("");
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [experience, setExperience] = useState("");

  const isValid = cvText.trim().length > 50 && role && region && experience;

  const [uploading, setUploading] = useState(false);

  const extractTextFromPdf = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .map((item: any) => item.str)
        .join(" ");
      pages.push(text);
    }

    return pages.join("\n\n").trim();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith(".pdf")) {
      setUploading(true);
      try {
        const text = await extractTextFromPdf(file);
        if (text.length > 50) {
          setCvText(text);
        } else {
          setCvText("PDF loaded but text extraction was limited — please paste your CV text manually.");
        }
      } catch {
        setCvText("Could not read PDF — please paste your CV text manually.");
      } finally {
        setUploading(false);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCvText(ev.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ cvText, role, region, experience });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">
          Skill Gap Diagnostic
        </h1>
      <p className="text-muted-foreground">
          Paste your CV (and optionally your LinkedIn profile) below, then select your target role to see how you compare with market demand.
        </p>
      </div>

      {/* CV Input */}
      <div className="space-y-3">
        <label className="text-sm font-medium font-heading" htmlFor="cv-text">
          Your CV Content
        </label>
        <textarea
          id="cv-text"
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          placeholder="Paste your CV text here (and optionally your LinkedIn profile) — include your skills, experience, and tools you've worked with…"
          className="w-full min-h-[200px] rounded-lg border border-input bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y font-body"
          aria-label="CV text input"
        />
        <div className="flex items-center gap-3">
          <label
            htmlFor="cv-file"
            className={`inline-flex items-center gap-2 text-sm text-secondary cursor-pointer hover:underline ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Extracting text…" : "Upload .pdf or .txt file"}
          </label>
          <input
            id="cv-file"
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileUpload}
            className="sr-only"
            aria-label="Upload CV file"
          />
          {cvText.length > 0 && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {cvText.length} characters
            </span>
          )}
          <span className="text-xs text-muted-foreground italic">Multiple files can be uploaded, but one at a time</span>
        </div>
      </div>

      {/* Role Select */}
      <div className="space-y-2">
        <label className="text-sm font-medium font-heading" htmlFor="role-select">
          Target Role
        </label>
        <select
          id="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
          aria-label="Select target role"
        >
          <option value="">Select a role…</option>
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Region & Experience */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium font-heading" htmlFor="region-select">
            UK Region
          </label>
          <select
            id="region-select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
            aria-label="Select UK region"
          >
            <option value="">Select region…</option>
            {ukRegions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium font-heading" htmlFor="experience-select">
            Years of Experience
          </label>
          <select
            id="experience-select"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-body"
            aria-label="Select experience level"
          >
            <option value="">Select level…</option>
            {experienceLevels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        disabled={!isValid}
        className="w-full sm:w-auto"
      >
        Run Diagnostic
      </Button>
    </form>
  );
};
