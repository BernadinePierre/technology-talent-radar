
ALTER TABLE public.action_plan_templates
  ADD COLUMN category text NOT NULL DEFAULT 'learning',
  ADD COLUMN best_for_gap_level text[] NOT NULL DEFAULT '{}',
  ADD COLUMN best_for_skill_type text[] NOT NULL DEFAULT '{}';

ALTER TABLE public.action_plan_templates
  RENAME COLUMN action_text TO template;
