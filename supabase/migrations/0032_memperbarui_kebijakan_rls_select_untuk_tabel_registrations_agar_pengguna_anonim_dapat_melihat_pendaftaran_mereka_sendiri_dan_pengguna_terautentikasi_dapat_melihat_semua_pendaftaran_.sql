-- Menghapus kebijakan SELECT yang ada untuk tabel 'registrations'
DROP POLICY IF EXISTS "Authenticated users can view all registrations" ON public.registrations;

-- Kebijakan untuk pengguna terautentikasi agar dapat melihat semua pendaftaran
CREATE POLICY "authenticated_users_can_view_all_registrations" ON public.registrations
FOR SELECT TO authenticated USING (true);

-- Kebijakan untuk pengguna anonim agar dapat melihat pendaftaran di mana user_id adalah NULL (pendaftaran mereka sendiri)
CREATE POLICY "anon_users_can_view_their_null_registrations" ON public.registrations
FOR SELECT TO anon USING (user_id IS NULL);