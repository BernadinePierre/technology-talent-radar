CREATE TABLE public.app_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  description text
);

ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read app config" ON public.app_config FOR SELECT USING (true);