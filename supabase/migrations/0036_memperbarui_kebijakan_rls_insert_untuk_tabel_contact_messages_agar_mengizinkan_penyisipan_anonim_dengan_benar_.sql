-- Menghapus kebijakan INSERT yang ada untuk tabel 'contact_messages'
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;

-- Membuat ulang kebijakan INSERT untuk peran 'anon' dengan WITH CHECK (true)
CREATE POLICY "anon_can_insert_contact_messages" ON public.contact_messages
FOR INSERT TO anon WITH CHECK (true);