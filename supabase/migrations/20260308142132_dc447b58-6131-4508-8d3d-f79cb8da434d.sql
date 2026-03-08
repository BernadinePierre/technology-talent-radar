
ALTER TABLE public.action_plan_templates DROP COLUMN gap_category;

ALTER TABLE public.action_plan_templates 
  ADD COLUMN gap_category_priority text NOT NULL DEFAULT 'low';

UPDATE public.action_plan_templates SET gap_category_priority = 
  CASE 
    WHEN category IN ('revision', 'learning') THEN 'low'
    WHEN category = 'practice' THEN 'low'
    WHEN category = 'workflow' THEN 'medium'
    WHEN category = 'project' THEN 'medium'
    WHEN category = 'evidence' THEN 'high'
    ELSE 'low'
  END;
