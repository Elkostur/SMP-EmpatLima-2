-- Enable RLS (already done, but good to ensure)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Re-create policy to allow anonymous users to insert new contact messages
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
FOR INSERT TO anon, authenticated WITH CHECK (true);