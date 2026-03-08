
DROP POLICY IF EXISTS "Anyone can read templates" ON public.action_plan_templates;

CREATE POLICY "Anyone can read templates"
  ON public.action_plan_templates
  FOR SELECT
  USING (true);
