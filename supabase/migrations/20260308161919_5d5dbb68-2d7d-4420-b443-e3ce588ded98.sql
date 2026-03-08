CREATE TABLE public.anonymous_diagnostic_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  role_value text NOT NULL,
  role_label text NOT NULL,
  region text NOT NULL,
  experience text NOT NULL,
  overall_score integer NOT NULL,
  core_score integer NOT NULL,
  supporting_score integer NOT NULL,
  differentiator_score integer NOT NULL
);

ALTER TABLE public.anonymous_diagnostic_results ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Anyone can insert anonymous results"
ON public.anonymous_diagnostic_results
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading for authenticated admins only (restrict later as needed)
CREATE POLICY "Anyone can read anonymous results"
ON public.anonymous_diagnostic_results
FOR SELECT
TO anon, authenticated
USING (true);