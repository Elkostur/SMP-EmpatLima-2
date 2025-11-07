-- Hapus semua kebijakan RLS yang mungkin ada untuk tabel contact_messages
DROP POLICY IF EXISTS "Allow anon and authenticated to insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated to view all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated to delete contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_can_insert_contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "authenticated_users_can_view_all_contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "authenticated_users_can_delete_contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_insert_contact_messages_policy" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_select_contact_messages_policy" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_delete_contact_messages_policy" ON public.contact_messages;
DROP POLICY IF EXISTS "policy_name_insert" ON public.contact_messages;
DROP POLICY IF EXISTS "policy_name_select" ON public.contact_messages;
DROP POLICY IF EXISTS "policy_name_delete" ON public.contact_messages;


-- Pastikan RLS diaktifkan (jika belum)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Buat ulang kebijakan INSERT untuk pengguna anonim dan terautentikasi
CREATE POLICY "Allow anon and authenticated to insert contact messages" ON public.contact_messages
FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Buat ulang kebijakan SELECT untuk pengguna terautentikasi (admin)
CREATE POLICY "Allow authenticated to view all contact messages" ON public.contact_messages
FOR SELECT TO authenticated USING (true);

-- Buat ulang kebijakan DELETE untuk pengguna terautentikasi (admin)
CREATE POLICY "Allow authenticated to delete contact messages" ON public.contact_messages
FOR DELETE TO authenticated USING (true);