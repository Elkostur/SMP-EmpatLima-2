-- Hapus semua kebijakan RLS yang ada untuk tabel 'contact_messages'
DROP POLICY IF EXISTS "Authenticated users can view all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_can_insert_contact_messages" ON public.contact_messages;

-- Pastikan RLS diaktifkan (jika belum)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Kebijakan untuk INSERT: Pengguna anonim dapat menyisipkan pesan
CREATE POLICY "anon_can_insert_contact_messages" ON public.contact_messages
FOR INSERT TO anon WITH CHECK (true);

-- Kebijakan untuk SELECT: Pengguna terautentikasi dapat melihat semua pesan
CREATE POLICY "authenticated_users_can_view_all_contact_messages" ON public.contact_messages
FOR SELECT TO authenticated USING (true);

-- Kebijakan untuk DELETE: Pengguna terautentikasi dapat menghapus pesan
CREATE POLICY "authenticated_users_can_delete_contact_messages" ON public.contact_messages
FOR DELETE TO authenticated USING (true);