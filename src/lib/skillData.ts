export type SkillCategory = "core" | "supporting" | "differentiator";

export interface Skill {
  name: string;
  category: SkillCategory;
  demandLevel: number; // 0-100
}

export interface RoleData {
  label: string;
  value: string;
  skills: Skill[];
}

export const roles: RoleData[] = [
  {
    label: "Data Engineer",
    value: "data-engineer",
    skills: [
      { name: "Python", category: "core", demandLevel: 95 },
      { name: "SQL", category: "core", demandLevel: 98 },
      { name: "Apache Spark", category: "core", demandLevel: 78 },
      { name: "AWS", category: "core", demandLevel: 85 },
      { name: "ETL Pipelines", category: "core", demandLevel: 88 },
      { name: "Airflow", category: "supporting", demandLevel: 72 },
      { name: "Kafka", category: "supporting", demandLevel: 65 },
      { name: "Docker", category: "supporting", demandLevel: 70 },
      { name: "Terraform", category: "supporting", demandLevel: 55 },
      { name: "dbt", category: "supporting", demandLevel: 62 },
      { name: "Data Modelling", category: "supporting", demandLevel: 75 },
      { name: "CI/CD", category: "supporting", demandLevel: 58 },
      { name: "Databricks", category: "differentiator", demandLevel: 52 },
      { name: "Snowflake", category: "differentiator", demandLevel: 48 },
      { name: "Kubernetes", category: "differentiator", demandLevel: 42 },
      { name: "Scala", category: "differentiator", demandLevel: 35 },
      { name: "Real-time Streaming", category: "differentiator", demandLevel: 38 },
    ],
  },
  {
    label: "Analytics Engineer",
    value: "analytics-engineer",
    skills: [
      { name: "SQL", category: "core", demandLevel: 98 },
      { name: "dbt", category: "core", demandLevel: 90 },
      { name: "Python", category: "core", demandLevel: 80 },
      { name: "Data Modelling", category: "core", demandLevel: 92 },
      { name: "Git", category: "core", demandLevel: 85 },
      { name: "Looker", category: "supporting", demandLevel: 60 },
      { name: "Tableau", category: "supporting", demandLevel: 55 },
      { name: "Snowflake", category: "supporting", demandLevel: 68 },
      { name: "BigQuery", category: "supporting", demandLevel: 62 },
      { name: "Airflow", category: "supporting", demandLevel: 50 },
      { name: "AWS", category: "supporting", demandLevel: 58 },
      { name: "Stakeholder Communication", category: "differentiator", demandLevel: 45 },
      { name: "Fivetran", category: "differentiator", demandLevel: 38 },
      { name: "Spark", category: "differentiator", demandLevel: 30 },
    ],
  },
  {
    label: "DevOps Engineer",
    value: "devops-engineer",
    skills: [
      { name: "AWS", category: "core", demandLevel: 92 },
      { name: "Docker", category: "core", demandLevel: 95 },
      { name: "Kubernetes", category: "core", demandLevel: 88 },
      { name: "CI/CD", category: "core", demandLevel: 93 },
      { name: "Terraform", category: "core", demandLevel: 85 },
      { name: "Linux", category: "core", demandLevel: 90 },
      { name: "Python", category: "supporting", demandLevel: 72 },
      { name: "Ansible", category: "supporting", demandLevel: 60 },
      { name: "Monitoring (Prometheus/Grafana)", category: "supporting", demandLevel: 68 },
      { name: "Git", category: "supporting", demandLevel: 82 },
      { name: "Bash/Shell Scripting", category: "supporting", demandLevel: 75 },
      { name: "Azure", category: "differentiator", demandLevel: 55 },
      { name: "GCP", category: "differentiator", demandLevel: 42 },
      { name: "Service Mesh", category: "differentiator", demandLevel: 30 },
      { name: "GitOps", category: "differentiator", demandLevel: 38 },
    ],
  },
  {
    label: "Software Engineer",
    value: "software-engineer",
    skills: [
      { name: "JavaScript/TypeScript", category: "core", demandLevel: 95 },
      { name: "Python", category: "core", demandLevel: 88 },
      { name: "Git", category: "core", demandLevel: 92 },
      { name: "REST APIs", category: "core", demandLevel: 90 },
      { name: "SQL", category: "core", demandLevel: 82 },
      { name: "React", category: "supporting", demandLevel: 78 },
      { name: "Node.js", category: "supporting", demandLevel: 75 },
      { name: "Docker", category: "supporting", demandLevel: 68 },
      { name: "CI/CD", category: "supporting", demandLevel: 65 },
      { name: "AWS", category: "supporting", demandLevel: 70 },
      { name: "Testing (Unit/Integration)", category: "supporting", demandLevel: 72 },
      { name: "System Design", category: "differentiator", demandLevel: 55 },
      { name: "Microservices", category: "differentiator", demandLevel: 48 },
      { name: "GraphQL", category: "differentiator", demandLevel: 35 },
      { name: "Kubernetes", category: "differentiator", demandLevel: 40 },
    ],
  },
];

export const ukRegions = [
  "London",
  "South East",
  "South West",
  "East of England",
  "West Midlands",
  "East Midlands",
  "North West",
  "North East",
  "Yorkshire and the Humber",
  "Scotland",
  "Wales",
  "Northern Ireland",
  "Remote",
];

export const experienceLevels = [
  "Less than 1 year",
  "1–2 years",
  "2–3 years",
  "3–5 years",
  "5+ years",
];

export function extractSkillsFromCV(cvText: string): string[] {
  const allSkills = new Set<string>();
  roles.forEach((role) => {
    role.skills.forEach((skill) => allSkills.add(skill.name));
  });

  const normalizedCV = cvText.toLowerCase();
  const found: string[] = [];

  allSkills.forEach((skill) => {
    const variants = [skill.toLowerCase()];
    // Handle slash-separated skills
    if (skill.includes("/")) {
      skill.split("/").forEach((s) => variants.push(s.trim().toLowerCase()));
    }
    // Handle parenthetical
    const parenMatch = skill.match(/^(.*?)\s*\((.*?)\)$/);
    if (parenMatch) {
      variants.push(parenMatch[1].trim().toLowerCase());
      variants.push(parenMatch[2].trim().toLowerCase());
    }

    if (variants.some((v) => normalizedCV.includes(v))) {
      found.push(skill);
    }
  });

  return found;
}

export interface DiagnosticResult {
  role: RoleData;
  matchedSkills: { skill: Skill; found: boolean }[];
  overallScore: number;
  coreScore: number;
  supportingScore: number;
  differentiatorScore: number;
}

export function generateDiagnostic(
  cvSkills: string[],
  roleValue: string
): DiagnosticResult {
  const role = roles.find((r) => r.value === roleValue)!;
  const cvSkillsLower = new Set(cvSkills.map((s) => s.toLowerCase()));

  const matchedSkills = role.skills.map((skill) => ({
    skill,
    found: cvSkillsLower.has(skill.name.toLowerCase()),
  }));

  const scoreCategory = (cat: SkillCategory) => {
    const catSkills = matchedSkills.filter((m) => m.skill.category === cat);
    if (catSkills.length === 0) return 0;
    const matched = catSkills.filter((m) => m.found).length;
    return Math.round((matched / catSkills.length) * 100);
  };

  const coreScore = scoreCategory("core");
  const supportingScore = scoreCategory("supporting");
  const differentiatorScore = scoreCategory("differentiator");
  const overallScore = Math.round(
    coreScore * 0.5 + supportingScore * 0.3 + differentiatorScore * 0.2
  );

  return { role, matchedSkills, overallScore, coreScore, supportingScore, differentiatorScore };
}
