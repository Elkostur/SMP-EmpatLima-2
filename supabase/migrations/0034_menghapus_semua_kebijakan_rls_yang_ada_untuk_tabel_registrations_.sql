-- Menghapus semua kebijakan yang ada untuk tabel 'registrations'
DROP POLICY IF EXISTS "anon_insert_registrations_final_policy" ON public.registrations;
DROP POLICY IF EXISTS "authenticated_users_can_view_all_registrations" ON public.registrations;
DROP POLICY IF EXISTS "anon_users_can_view_their_null_registrations" ON public.registrations;
DROP POLICY IF EXISTS "authenticated_users_can_delete_registrations" ON public.registrations;
-- Tambahkan nama kebijakan lama lainnya jika ada dari upaya sebelumnya
DROP POLICY IF EXISTS "anon_insert_registrations_policy" ON public.registrations;