-- Menghapus semua kebijakan yang ada untuk tabel 'registrations'
DROP POLICY IF EXISTS "anon_insert_registrations_final_policy" ON public.registrations;
DROP POLICY IF EXISTS "authenticated_users_can_view_all_registrations" ON public.registrations;
DROP POLICY IF EXISTS "anon_users_can_view_their_null_registrations" ON public.registrations;
DROP POLICY IF EXISTS "Users can delete their own registrations" ON public.registrations; -- Kebijakan DELETE yang ada
DROP POLICY IF EXISTS "Authenticated users can delete registrations" ON public.registrations; -- Kebijakan DELETE yang ada

-- Memastikan RLS diaktifkan untuk tabel registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Memberikan izin dasar kepada peran 'anon' dan 'authenticated'
GRANT INSERT, SELECT, UPDATE, DELETE ON public.registrations TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.registrations TO authenticated;

-- Membuat kebijakan INSERT baru yang secara eksplisit mengizinkan peran 'anon' untuk menyisipkan data apa pun
CREATE POLICY "anon_insert_registrations_final_policy" ON public.registrations
FOR INSERT TO anon WITH CHECK (true);

-- Membuat kebijakan SELECT untuk pengguna terautentikasi agar dapat melihat semua pendaftaran
CREATE POLICY "authenticated_users_can_view_all_registrations" ON public.registrations
FOR SELECT TO authenticated USING (true);

-- Membuat kebijakan SELECT untuk pengguna anonim agar dapat melihat pendaftaran di mana user_id adalah NULL (pendaftaran mereka sendiri)
CREATE POLICY "anon_users_can_view_their_null_registrations" ON public.registrations
FOR SELECT TO anon USING (user_id IS NULL);

-- Membuat kebijakan DELETE untuk pengguna terautentikasi (misalnya, admin)
CREATE POLICY "authenticated_users_can_delete_registrations" ON public.registrations
FOR DELETE TO authenticated USING (true);