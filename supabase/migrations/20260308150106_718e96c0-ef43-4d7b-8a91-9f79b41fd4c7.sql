CREATE TABLE public.uk_regions (
  id integer PRIMARY KEY,
  region_key text NOT NULL UNIQUE,
  region_name text NOT NULL,
  region_encoded text NOT NULL
);

ALTER TABLE public.uk_regions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read uk regions" ON public.uk_regions FOR SELECT USING (true);