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

export const roles: RoleData[] = ([
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
    label: "Data Analyst",
    value: "data-analyst",
    skills: [
      { name: "SQL", category: "core", demandLevel: 96 },
      { name: "Excel", category: "core", demandLevel: 90 },
      { name: "Python", category: "core", demandLevel: 75 },
      { name: "Tableau", category: "core", demandLevel: 82 },
      { name: "Power BI", category: "core", demandLevel: 85 },
      { name: "Data Visualisation", category: "supporting", demandLevel: 78 },
      { name: "Statistical Analysis", category: "supporting", demandLevel: 68 },
      { name: "Stakeholder Communication", category: "supporting", demandLevel: 72 },
      { name: "Google Analytics", category: "supporting", demandLevel: 55 },
      { name: "R", category: "differentiator", demandLevel: 40 },
      { name: "Looker", category: "differentiator", demandLevel: 38 },
      { name: "A/B Testing", category: "differentiator", demandLevel: 35 },
    ],
  },
  {
    label: "Business Intelligence (BI) Developer",
    value: "bi-developer",
    skills: [
      { name: "SQL", category: "core", demandLevel: 96 },
      { name: "Power BI", category: "core", demandLevel: 90 },
      { name: "SSRS", category: "core", demandLevel: 78 },
      { name: "SSIS", category: "core", demandLevel: 75 },
      { name: "Data Warehousing", category: "core", demandLevel: 85 },
      { name: "Tableau", category: "supporting", demandLevel: 68 },
      { name: "Data Modelling", category: "supporting", demandLevel: 72 },
      { name: "Python", category: "supporting", demandLevel: 55 },
      { name: "Azure", category: "supporting", demandLevel: 60 },
      { name: "DAX", category: "differentiator", demandLevel: 52 },
      { name: "Looker", category: "differentiator", demandLevel: 35 },
    ],
  },
  {
    label: "BI Analyst",
    value: "bi-analyst",
    skills: [
      { name: "SQL", category: "core", demandLevel: 95 },
      { name: "Power BI", category: "core", demandLevel: 88 },
      { name: "Excel", category: "core", demandLevel: 85 },
      { name: "Data Visualisation", category: "core", demandLevel: 80 },
      { name: "Tableau", category: "supporting", demandLevel: 65 },
      { name: "Stakeholder Communication", category: "supporting", demandLevel: 70 },
      { name: "Python", category: "supporting", demandLevel: 50 },
      { name: "DAX", category: "differentiator", demandLevel: 45 },
      { name: "Google Data Studio", category: "differentiator", demandLevel: 35 },
    ],
  },
  {
    label: "Data Scientist",
    value: "data-scientist",
    skills: [
      { name: "Python", category: "core", demandLevel: 96 },
      { name: "Machine Learning", category: "core", demandLevel: 92 },
      { name: "SQL", category: "core", demandLevel: 85 },
      { name: "Statistical Analysis", category: "core", demandLevel: 90 },
      { name: "Pandas/NumPy", category: "core", demandLevel: 88 },
      { name: "Scikit-learn", category: "supporting", demandLevel: 75 },
      { name: "TensorFlow/PyTorch", category: "supporting", demandLevel: 68 },
      { name: "R", category: "supporting", demandLevel: 55 },
      { name: "Data Visualisation", category: "supporting", demandLevel: 65 },
      { name: "NLP", category: "differentiator", demandLevel: 48 },
      { name: "Deep Learning", category: "differentiator", demandLevel: 52 },
      { name: "MLOps", category: "differentiator", demandLevel: 42 },
      { name: "A/B Testing", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "Machine Learning Engineer",
    value: "ml-engineer",
    skills: [
      { name: "Python", category: "core", demandLevel: 96 },
      { name: "Machine Learning", category: "core", demandLevel: 95 },
      { name: "TensorFlow/PyTorch", category: "core", demandLevel: 88 },
      { name: "MLOps", category: "core", demandLevel: 82 },
      { name: "Docker", category: "core", demandLevel: 78 },
      { name: "SQL", category: "supporting", demandLevel: 72 },
      { name: "AWS", category: "supporting", demandLevel: 75 },
      { name: "Kubernetes", category: "supporting", demandLevel: 65 },
      { name: "CI/CD", category: "supporting", demandLevel: 60 },
      { name: "Deep Learning", category: "differentiator", demandLevel: 55 },
      { name: "NLP", category: "differentiator", demandLevel: 48 },
      { name: "Spark", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "AI Engineer",
    value: "ai-engineer",
    skills: [
      { name: "Python", category: "core", demandLevel: 96 },
      { name: "LLMs/Generative AI", category: "core", demandLevel: 92 },
      { name: "Machine Learning", category: "core", demandLevel: 88 },
      { name: "TensorFlow/PyTorch", category: "core", demandLevel: 85 },
      { name: "REST APIs", category: "core", demandLevel: 80 },
      { name: "NLP", category: "supporting", demandLevel: 72 },
      { name: "Docker", category: "supporting", demandLevel: 68 },
      { name: "AWS", category: "supporting", demandLevel: 65 },
      { name: "Vector Databases", category: "supporting", demandLevel: 58 },
      { name: "Prompt Engineering", category: "differentiator", demandLevel: 55 },
      { name: "RAG", category: "differentiator", demandLevel: 50 },
      { name: "Fine-tuning", category: "differentiator", demandLevel: 42 },
    ],
  },
  {
    label: "Database Administrator (DBA)",
    value: "dba",
    skills: [
      { name: "SQL", category: "core", demandLevel: 98 },
      { name: "Database Performance Tuning", category: "core", demandLevel: 92 },
      { name: "PostgreSQL", category: "core", demandLevel: 85 },
      { name: "MySQL", category: "core", demandLevel: 80 },
      { name: "Backup & Recovery", category: "core", demandLevel: 88 },
      { name: "SQL Server", category: "supporting", demandLevel: 75 },
      { name: "Oracle", category: "supporting", demandLevel: 65 },
      { name: "Linux", category: "supporting", demandLevel: 68 },
      { name: "Monitoring", category: "supporting", demandLevel: 70 },
      { name: "Cloud Databases", category: "differentiator", demandLevel: 55 },
      { name: "NoSQL", category: "differentiator", demandLevel: 48 },
      { name: "Automation/Scripting", category: "differentiator", demandLevel: 42 },
    ],
  },
  {
    label: "Cloud Engineer",
    value: "cloud-engineer",
    skills: [
      { name: "AWS", category: "core", demandLevel: 92 },
      { name: "Azure", category: "core", demandLevel: 85 },
      { name: "Terraform", category: "core", demandLevel: 82 },
      { name: "Linux", category: "core", demandLevel: 88 },
      { name: "Networking", category: "core", demandLevel: 78 },
      { name: "Docker", category: "supporting", demandLevel: 72 },
      { name: "Kubernetes", category: "supporting", demandLevel: 68 },
      { name: "CI/CD", category: "supporting", demandLevel: 65 },
      { name: "Python", category: "supporting", demandLevel: 60 },
      { name: "GCP", category: "differentiator", demandLevel: 50 },
      { name: "Security", category: "differentiator", demandLevel: 55 },
      { name: "Cost Optimisation", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "Cloud Architect",
    value: "cloud-architect",
    skills: [
      { name: "AWS", category: "core", demandLevel: 95 },
      { name: "Azure", category: "core", demandLevel: 88 },
      { name: "Solution Architecture", category: "core", demandLevel: 92 },
      { name: "Networking", category: "core", demandLevel: 85 },
      { name: "Security", category: "core", demandLevel: 82 },
      { name: "Terraform", category: "supporting", demandLevel: 78 },
      { name: "Kubernetes", category: "supporting", demandLevel: 72 },
      { name: "Microservices", category: "supporting", demandLevel: 68 },
      { name: "Cost Optimisation", category: "supporting", demandLevel: 60 },
      { name: "GCP", category: "differentiator", demandLevel: 48 },
      { name: "Serverless", category: "differentiator", demandLevel: 52 },
      { name: "Well-Architected Framework", category: "differentiator", demandLevel: 45 },
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
    label: "Site Reliability Engineer (SRE)",
    value: "sre",
    skills: [
      { name: "Linux", category: "core", demandLevel: 92 },
      { name: "Kubernetes", category: "core", demandLevel: 90 },
      { name: "Monitoring (Prometheus/Grafana)", category: "core", demandLevel: 88 },
      { name: "CI/CD", category: "core", demandLevel: 85 },
      { name: "Python", category: "core", demandLevel: 80 },
      { name: "AWS", category: "supporting", demandLevel: 78 },
      { name: "Docker", category: "supporting", demandLevel: 75 },
      { name: "Incident Management", category: "supporting", demandLevel: 72 },
      { name: "Terraform", category: "supporting", demandLevel: 68 },
      { name: "SLOs/SLIs/SLAs", category: "differentiator", demandLevel: 55 },
      { name: "Chaos Engineering", category: "differentiator", demandLevel: 38 },
      { name: "Go", category: "differentiator", demandLevel: 42 },
    ],
  },
  {
    label: "Platform Engineer",
    value: "platform-engineer",
    skills: [
      { name: "Kubernetes", category: "core", demandLevel: 92 },
      { name: "Docker", category: "core", demandLevel: 90 },
      { name: "Terraform", category: "core", demandLevel: 88 },
      { name: "CI/CD", category: "core", demandLevel: 85 },
      { name: "AWS", category: "core", demandLevel: 82 },
      { name: "Python", category: "supporting", demandLevel: 72 },
      { name: "Go", category: "supporting", demandLevel: 65 },
      { name: "Linux", category: "supporting", demandLevel: 78 },
      { name: "GitOps", category: "supporting", demandLevel: 60 },
      { name: "Service Mesh", category: "differentiator", demandLevel: 45 },
      { name: "Internal Developer Platforms", category: "differentiator", demandLevel: 50 },
      { name: "Backstage", category: "differentiator", demandLevel: 35 },
    ],
  },
  {
    label: "Infrastructure Engineer",
    value: "infrastructure-engineer",
    skills: [
      { name: "Linux", category: "core", demandLevel: 92 },
      { name: "Networking", category: "core", demandLevel: 88 },
      { name: "AWS", category: "core", demandLevel: 85 },
      { name: "Terraform", category: "core", demandLevel: 80 },
      { name: "Virtualisation", category: "core", demandLevel: 78 },
      { name: "Docker", category: "supporting", demandLevel: 70 },
      { name: "Ansible", category: "supporting", demandLevel: 65 },
      { name: "Bash/Shell Scripting", category: "supporting", demandLevel: 72 },
      { name: "Monitoring", category: "supporting", demandLevel: 68 },
      { name: "Azure", category: "differentiator", demandLevel: 52 },
      { name: "Storage Systems", category: "differentiator", demandLevel: 45 },
      { name: "Security", category: "differentiator", demandLevel: 48 },
    ],
  },
  {
    label: "Systems Administrator",
    value: "systems-administrator",
    skills: [
      { name: "Linux", category: "core", demandLevel: 92 },
      { name: "Windows Server", category: "core", demandLevel: 85 },
      { name: "Networking", category: "core", demandLevel: 82 },
      { name: "Active Directory", category: "core", demandLevel: 80 },
      { name: "Virtualisation", category: "core", demandLevel: 78 },
      { name: "Bash/Shell Scripting", category: "supporting", demandLevel: 72 },
      { name: "Backup & Recovery", category: "supporting", demandLevel: 70 },
      { name: "Monitoring", category: "supporting", demandLevel: 65 },
      { name: "Security", category: "supporting", demandLevel: 62 },
      { name: "Cloud (AWS/Azure)", category: "differentiator", demandLevel: 55 },
      { name: "Automation/Scripting", category: "differentiator", demandLevel: 50 },
      { name: "Docker", category: "differentiator", demandLevel: 40 },
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
  {
    label: "Backend Developer",
    value: "backend-developer",
    skills: [
      { name: "Python", category: "core", demandLevel: 90 },
      { name: "SQL", category: "core", demandLevel: 92 },
      { name: "REST APIs", category: "core", demandLevel: 95 },
      { name: "Git", category: "core", demandLevel: 88 },
      { name: "Node.js", category: "core", demandLevel: 82 },
      { name: "Docker", category: "supporting", demandLevel: 72 },
      { name: "PostgreSQL", category: "supporting", demandLevel: 75 },
      { name: "Redis", category: "supporting", demandLevel: 60 },
      { name: "CI/CD", category: "supporting", demandLevel: 65 },
      { name: "AWS", category: "supporting", demandLevel: 68 },
      { name: "Microservices", category: "differentiator", demandLevel: 52 },
      { name: "GraphQL", category: "differentiator", demandLevel: 42 },
      { name: "Message Queues", category: "differentiator", demandLevel: 45 },
    ],
  },
  {
    label: "Frontend Developer",
    value: "frontend-developer",
    skills: [
      { name: "JavaScript/TypeScript", category: "core", demandLevel: 96 },
      { name: "React", category: "core", demandLevel: 92 },
      { name: "HTML/CSS", category: "core", demandLevel: 95 },
      { name: "Git", category: "core", demandLevel: 88 },
      { name: "Responsive Design", category: "core", demandLevel: 85 },
      { name: "Next.js", category: "supporting", demandLevel: 72 },
      { name: "Testing (Unit/Integration)", category: "supporting", demandLevel: 68 },
      { name: "REST APIs", category: "supporting", demandLevel: 75 },
      { name: "Tailwind CSS", category: "supporting", demandLevel: 65 },
      { name: "Accessibility", category: "differentiator", demandLevel: 55 },
      { name: "Performance Optimisation", category: "differentiator", demandLevel: 48 },
      { name: "Vue.js", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "Full Stack Developer",
    value: "full-stack-developer",
    skills: [
      { name: "JavaScript/TypeScript", category: "core", demandLevel: 95 },
      { name: "React", category: "core", demandLevel: 90 },
      { name: "Node.js", category: "core", demandLevel: 88 },
      { name: "SQL", category: "core", demandLevel: 85 },
      { name: "REST APIs", category: "core", demandLevel: 92 },
      { name: "Git", category: "supporting", demandLevel: 82 },
      { name: "Docker", category: "supporting", demandLevel: 65 },
      { name: "AWS", category: "supporting", demandLevel: 68 },
      { name: "CI/CD", category: "supporting", demandLevel: 60 },
      { name: "Testing (Unit/Integration)", category: "supporting", demandLevel: 70 },
      { name: "GraphQL", category: "differentiator", demandLevel: 42 },
      { name: "Next.js", category: "differentiator", demandLevel: 50 },
      { name: "Microservices", category: "differentiator", demandLevel: 38 },
    ],
  },
  {
    label: "Python Developer",
    value: "python-developer",
    skills: [
      { name: "Python", category: "core", demandLevel: 98 },
      { name: "Django/Flask/FastAPI", category: "core", demandLevel: 90 },
      { name: "SQL", category: "core", demandLevel: 85 },
      { name: "REST APIs", category: "core", demandLevel: 88 },
      { name: "Git", category: "core", demandLevel: 82 },
      { name: "Docker", category: "supporting", demandLevel: 68 },
      { name: "PostgreSQL", category: "supporting", demandLevel: 72 },
      { name: "Testing (pytest)", category: "supporting", demandLevel: 65 },
      { name: "CI/CD", category: "supporting", demandLevel: 60 },
      { name: "Celery", category: "differentiator", demandLevel: 45 },
      { name: "AWS", category: "differentiator", demandLevel: 52 },
      { name: "Async Python", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "Java Developer",
    value: "java-developer",
    skills: [
      { name: "Java", category: "core", demandLevel: 98 },
      { name: "Spring Boot", category: "core", demandLevel: 92 },
      { name: "SQL", category: "core", demandLevel: 85 },
      { name: "REST APIs", category: "core", demandLevel: 90 },
      { name: "Git", category: "core", demandLevel: 82 },
      { name: "Maven/Gradle", category: "supporting", demandLevel: 75 },
      { name: "Docker", category: "supporting", demandLevel: 68 },
      { name: "Microservices", category: "supporting", demandLevel: 72 },
      { name: "JUnit", category: "supporting", demandLevel: 65 },
      { name: "Kubernetes", category: "differentiator", demandLevel: 48 },
      { name: "Kafka", category: "differentiator", demandLevel: 52 },
      { name: "AWS", category: "differentiator", demandLevel: 55 },
    ],
  },
  {
    label: ".NET Developer",
    value: "dotnet-developer",
    skills: [
      { name: "C#", category: "core", demandLevel: 98 },
      { name: ".NET/ASP.NET", category: "core", demandLevel: 95 },
      { name: "SQL", category: "core", demandLevel: 88 },
      { name: "REST APIs", category: "core", demandLevel: 90 },
      { name: "Git", category: "core", demandLevel: 82 },
      { name: "Azure", category: "supporting", demandLevel: 75 },
      { name: "Entity Framework", category: "supporting", demandLevel: 72 },
      { name: "Docker", category: "supporting", demandLevel: 62 },
      { name: "CI/CD", category: "supporting", demandLevel: 65 },
      { name: "Microservices", category: "differentiator", demandLevel: 50 },
      { name: "Blazor", category: "differentiator", demandLevel: 38 },
      { name: "Azure DevOps", category: "differentiator", demandLevel: 48 },
    ],
  },
  {
    label: "JavaScript Developer",
    value: "javascript-developer",
    skills: [
      { name: "JavaScript/TypeScript", category: "core", demandLevel: 98 },
      { name: "React", category: "core", demandLevel: 90 },
      { name: "Node.js", category: "core", demandLevel: 88 },
      { name: "HTML/CSS", category: "core", demandLevel: 85 },
      { name: "Git", category: "core", demandLevel: 82 },
      { name: "REST APIs", category: "supporting", demandLevel: 78 },
      { name: "Next.js", category: "supporting", demandLevel: 68 },
      { name: "Testing (Jest/Cypress)", category: "supporting", demandLevel: 65 },
      { name: "SQL", category: "supporting", demandLevel: 60 },
      { name: "Vue.js", category: "differentiator", demandLevel: 45 },
      { name: "GraphQL", category: "differentiator", demandLevel: 42 },
      { name: "Angular", category: "differentiator", demandLevel: 38 },
    ],
  },
  {
    label: "Cyber Security Analyst",
    value: "cyber-security-analyst",
    skills: [
      { name: "SIEM", category: "core", demandLevel: 92 },
      { name: "Incident Response", category: "core", demandLevel: 90 },
      { name: "Vulnerability Management", category: "core", demandLevel: 88 },
      { name: "Network Security", category: "core", demandLevel: 85 },
      { name: "Threat Analysis", category: "core", demandLevel: 82 },
      { name: "Firewalls/IDS/IPS", category: "supporting", demandLevel: 75 },
      { name: "Linux", category: "supporting", demandLevel: 68 },
      { name: "Python", category: "supporting", demandLevel: 60 },
      { name: "Compliance (ISO 27001/NIST)", category: "supporting", demandLevel: 65 },
      { name: "Cloud Security", category: "differentiator", demandLevel: 55 },
      { name: "Penetration Testing", category: "differentiator", demandLevel: 48 },
      { name: "SOAR", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "Security Engineer",
    value: "security-engineer",
    skills: [
      { name: "Network Security", category: "core", demandLevel: 92 },
      { name: "Cloud Security", category: "core", demandLevel: 88 },
      { name: "Security Architecture", category: "core", demandLevel: 85 },
      { name: "Python", category: "core", demandLevel: 78 },
      { name: "Penetration Testing", category: "core", demandLevel: 82 },
      { name: "Linux", category: "supporting", demandLevel: 75 },
      { name: "Docker", category: "supporting", demandLevel: 65 },
      { name: "CI/CD Security", category: "supporting", demandLevel: 60 },
      { name: "Terraform", category: "supporting", demandLevel: 55 },
      { name: "Kubernetes Security", category: "differentiator", demandLevel: 48 },
      { name: "DevSecOps", category: "differentiator", demandLevel: 52 },
      { name: "Threat Modelling", category: "differentiator", demandLevel: 42 },
    ],
  },
  {
    label: "Information Security Manager",
    value: "information-security-manager",
    skills: [
      { name: "Risk Management", category: "core", demandLevel: 95 },
      { name: "ISO 27001", category: "core", demandLevel: 90 },
      { name: "Security Policy", category: "core", demandLevel: 88 },
      { name: "Compliance", category: "core", demandLevel: 85 },
      { name: "Incident Response", category: "core", demandLevel: 82 },
      { name: "GDPR", category: "supporting", demandLevel: 75 },
      { name: "Stakeholder Communication", category: "supporting", demandLevel: 78 },
      { name: "Audit Management", category: "supporting", demandLevel: 70 },
      { name: "NIST", category: "supporting", demandLevel: 65 },
      { name: "Cloud Security", category: "differentiator", demandLevel: 55 },
      { name: "CISM/CISSP", category: "differentiator", demandLevel: 60 },
      { name: "Security Awareness Training", category: "differentiator", demandLevel: 42 },
    ],
  },
  {
    label: "Data Governance Analyst",
    value: "data-governance-analyst",
    skills: [
      { name: "Data Governance Frameworks", category: "core", demandLevel: 92 },
      { name: "Data Quality", category: "core", demandLevel: 90 },
      { name: "GDPR", category: "core", demandLevel: 85 },
      { name: "Metadata Management", category: "core", demandLevel: 82 },
      { name: "SQL", category: "core", demandLevel: 78 },
      { name: "Data Cataloguing", category: "supporting", demandLevel: 72 },
      { name: "Stakeholder Communication", category: "supporting", demandLevel: 68 },
      { name: "Data Lineage", category: "supporting", demandLevel: 65 },
      { name: "Policy Documentation", category: "supporting", demandLevel: 60 },
      { name: "Master Data Management", category: "differentiator", demandLevel: 50 },
      { name: "Collibra/Informatica", category: "differentiator", demandLevel: 45 },
      { name: "Python", category: "differentiator", demandLevel: 38 },
    ],
  },
  {
    label: "Compliance Analyst (Technology)",
    value: "compliance-analyst",
    skills: [
      { name: "Regulatory Compliance", category: "core", demandLevel: 92 },
      { name: "GDPR", category: "core", demandLevel: 88 },
      { name: "Risk Assessment", category: "core", demandLevel: 85 },
      { name: "Audit", category: "core", demandLevel: 82 },
      { name: "Policy Documentation", category: "core", demandLevel: 80 },
      { name: "ISO 27001", category: "supporting", demandLevel: 72 },
      { name: "Stakeholder Communication", category: "supporting", demandLevel: 70 },
      { name: "Data Protection", category: "supporting", demandLevel: 68 },
      { name: "SOX", category: "supporting", demandLevel: 55 },
      { name: "PCI DSS", category: "differentiator", demandLevel: 48 },
      { name: "GRC Tools", category: "differentiator", demandLevel: 45 },
      { name: "FCA Regulations", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "Product Manager (Technology)",
    value: "product-manager",
    skills: [
      { name: "Product Strategy", category: "core", demandLevel: 95 },
      { name: "Stakeholder Management", category: "core", demandLevel: 92 },
      { name: "User Research", category: "core", demandLevel: 88 },
      { name: "Roadmap Planning", category: "core", demandLevel: 90 },
      { name: "Agile/Scrum", category: "core", demandLevel: 85 },
      { name: "Data Analysis", category: "supporting", demandLevel: 75 },
      { name: "A/B Testing", category: "supporting", demandLevel: 62 },
      { name: "SQL", category: "supporting", demandLevel: 58 },
      { name: "Jira/Confluence", category: "supporting", demandLevel: 72 },
      { name: "Technical Architecture Understanding", category: "differentiator", demandLevel: 50 },
      { name: "API Knowledge", category: "differentiator", demandLevel: 45 },
      { name: "Growth Strategy", category: "differentiator", demandLevel: 42 },
    ],
  },
  {
    label: "Technical Project Manager",
    value: "technical-project-manager",
    skills: [
      { name: "Project Management", category: "core", demandLevel: 95 },
      { name: "Agile/Scrum", category: "core", demandLevel: 92 },
      { name: "Stakeholder Management", category: "core", demandLevel: 90 },
      { name: "Risk Management", category: "core", demandLevel: 85 },
      { name: "Budget Management", category: "core", demandLevel: 82 },
      { name: "Jira/Confluence", category: "supporting", demandLevel: 78 },
      { name: "Technical Understanding", category: "supporting", demandLevel: 72 },
      { name: "Reporting", category: "supporting", demandLevel: 68 },
      { name: "Vendor Management", category: "supporting", demandLevel: 60 },
      { name: "PRINCE2/PMP", category: "differentiator", demandLevel: 55 },
      { name: "Cloud Understanding", category: "differentiator", demandLevel: 45 },
      { name: "DevOps Understanding", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "Scrum Master",
    value: "scrum-master",
    skills: [
      { name: "Scrum Framework", category: "core", demandLevel: 98 },
      { name: "Agile Coaching", category: "core", demandLevel: 92 },
      { name: "Facilitation", category: "core", demandLevel: 90 },
      { name: "Stakeholder Management", category: "core", demandLevel: 85 },
      { name: "Continuous Improvement", category: "core", demandLevel: 82 },
      { name: "Jira/Confluence", category: "supporting", demandLevel: 78 },
      { name: "Kanban", category: "supporting", demandLevel: 68 },
      { name: "Conflict Resolution", category: "supporting", demandLevel: 72 },
      { name: "Metrics/Reporting", category: "supporting", demandLevel: 65 },
      { name: "SAFe", category: "differentiator", demandLevel: 52 },
      { name: "Technical Understanding", category: "differentiator", demandLevel: 48 },
      { name: "CSM/PSM Certification", category: "differentiator", demandLevel: 55 },
    ],
  },
  {
    label: "User Experience (UX) Designer",
    value: "ux-designer",
    skills: [
      { name: "User-Centred Design", category: "core", demandLevel: 95 },
      { name: "Wireframing & Prototyping", category: "core", demandLevel: 92 },
      { name: "Figma", category: "core", demandLevel: 90 },
      { name: "Interaction Design", category: "core", demandLevel: 85 },
      { name: "Design Systems", category: "core", demandLevel: 82 },
      { name: "Usability Testing", category: "supporting", demandLevel: 78 },
      { name: "Information Architecture", category: "supporting", demandLevel: 72 },
      { name: "Accessibility (WCAG)", category: "supporting", demandLevel: 68 },
      { name: "HTML/CSS", category: "supporting", demandLevel: 60 },
      { name: "Motion Design", category: "differentiator", demandLevel: 48 },
      { name: "Design Thinking Facilitation", category: "differentiator", demandLevel: 45 },
      { name: "Front-end Development", category: "differentiator", demandLevel: 40 },
    ],
  },
  {
    label: "User Researcher",
    value: "user-researcher",
    skills: [
      { name: "Qualitative Research", category: "core", demandLevel: 95 },
      { name: "Usability Testing", category: "core", demandLevel: 92 },
      { name: "Interview Techniques", category: "core", demandLevel: 90 },
      { name: "Survey Design", category: "core", demandLevel: 85 },
      { name: "Research Synthesis", category: "core", demandLevel: 88 },
      { name: "Quantitative Analysis", category: "supporting", demandLevel: 72 },
      { name: "A/B Testing", category: "supporting", demandLevel: 65 },
      { name: "Accessibility Research", category: "supporting", demandLevel: 60 },
      { name: "Stakeholder Communication", category: "supporting", demandLevel: 75 },
      { name: "Ethnographic Methods", category: "differentiator", demandLevel: 48 },
      { name: "Analytics Tools", category: "differentiator", demandLevel: 45 },
      { name: "Workshop Facilitation", category: "differentiator", demandLevel: 50 },
    ],
  },
].sort((a, b) => a.label.localeCompare(b.label));

export const ukRegions = [
  "East Midlands",
  "East of England",
  "London",
  "North East",
  "North West",
  "Northern Ireland",
  "Remote",
  "Scotland",
  "South East",
  "South West",
  "Wales",
  "West Midlands",
  "Yorkshire and the Humber",
];

export const experienceLevels = [
  "Less than 1 year",
  "1–2 years",
  "2–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
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
  region: string;
  experience: string;
  matchedSkills: { skill: Skill; found: boolean }[];
  overallScore: number;
  coreScore: number;
  supportingScore: number;
  differentiatorScore: number;
}

export function generateDiagnostic(
  cvSkills: string[],
  roleValue: string,
  region: string,
  experience: string
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

  return { role, region, experience, matchedSkills, overallScore, coreScore, supportingScore, differentiatorScore };
}
