-- 1. Memastikan RLS diaktifkan pada tabel contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Menghapus semua kebijakan RLS yang ada untuk tabel contact_messages
DROP POLICY IF EXISTS "Allow anon insert for contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "authenticated_users_can_view_all_contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "authenticated_users_can_delete_contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_insert_contact_messages_policy" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_select_contact_messages_policy" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_delete_contact_messages_policy" ON public.contact_messages;
DROP POLICY IF EXISTS "policy_name_insert" ON public.contact_messages;
DROP POLICY IF EXISTS "policy_name_select" ON public.contact_messages;
DROP POLICY IF EXISTS "policy_name_delete" ON public.contact_messages;


-- 3. Membuat ulang kebijakan INSERT untuk pengguna anonim (anon) dan terautentikasi (authenticated)
CREATE POLICY "Allow anon and authenticated to insert contact messages" ON public.contact_messages
FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 4. Membuat ulang kebijakan SELECT untuk pengguna terautentikasi (admin)
CREATE POLICY "Allow authenticated to view all contact messages" ON public.contact_messages
FOR SELECT TO authenticated USING (true);

-- 5. Membuat ulang kebijakan DELETE untuk pengguna terautentikasi (admin)
CREATE POLICY "Allow authenticated to delete contact messages" ON public.contact_messages
FOR DELETE TO authenticated USING (true);