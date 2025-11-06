-- 1. Grant INSERT permission to the anonymous role for the registrations table
GRANT INSERT ON TABLE public.registrations TO anon;

-- 2. Re-create the RLS policy to ensure it's correct and allows anonymous inserts
-- First, drop any existing policy with the same name to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous registration inserts" ON public.registrations;

-- Then, create the policy that allows any anonymous user to insert a row
CREATE POLICY "Allow anonymous registration inserts" ON public.registrations
FOR INSERT TO anon
WITH CHECK (true);