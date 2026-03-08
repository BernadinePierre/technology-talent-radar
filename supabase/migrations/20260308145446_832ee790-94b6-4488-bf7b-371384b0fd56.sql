CREATE TABLE public.job_roles (
  id integer PRIMARY KEY,
  role_key text NOT NULL UNIQUE,
  role_name text NOT NULL,
  role_encoded text NOT NULL
);

ALTER TABLE public.job_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read job roles" ON public.job_roles FOR SELECT USING (true);