-- Drop the existing INSERT policy which only allows authenticated users
DROP POLICY IF EXISTS "Authenticated users can insert their own registrations" ON public.registrations;

-- Create a new policy allowing anonymous users to insert data
CREATE POLICY "Allow anonymous registration inserts" ON public.registrations
FOR INSERT TO anon
WITH CHECK (true);