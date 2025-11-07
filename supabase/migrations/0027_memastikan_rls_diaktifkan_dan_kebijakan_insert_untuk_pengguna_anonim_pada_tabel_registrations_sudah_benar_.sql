-- Enable RLS (already done, but good to ensure)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Re-create policy to allow anonymous users to insert new registration data
DROP POLICY IF EXISTS "Allow anonymous registration inserts" ON public.registrations;
CREATE POLICY "Allow anonymous registration inserts" ON public.registrations
FOR INSERT TO anon, authenticated WITH CHECK (true);