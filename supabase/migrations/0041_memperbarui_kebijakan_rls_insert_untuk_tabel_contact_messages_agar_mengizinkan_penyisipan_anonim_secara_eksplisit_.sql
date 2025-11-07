-- Hapus kebijakan INSERT yang ada untuk contact_messages jika ada
DROP POLICY IF EXISTS "anon_can_insert_contact_messages" ON public.contact_messages;

-- Buat ulang kebijakan INSERT untuk pengguna anonim dengan WITH CHECK (true)
CREATE POLICY "Allow anon insert for contact messages" ON public.contact_messages
FOR INSERT TO anon WITH CHECK (true);