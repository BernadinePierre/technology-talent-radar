
ALTER TABLE public.action_plan_templates
  DROP COLUMN skill_name,
  DROP COLUMN best_for_skill_type,
  DROP COLUMN best_for_gap_level,
  ADD COLUMN gap_category jsonb NOT NULL DEFAULT '{}';

UPDATE public.action_plan_templates SET gap_category = '{"low": ["revision", "learning", "practice"], "medium": ["practice", "workflow", "learning", "project"], "high": ["project", "evidence", "workflow", "practice"]}'::jsonb;
