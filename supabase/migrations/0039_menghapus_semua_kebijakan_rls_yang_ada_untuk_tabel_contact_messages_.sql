-- Hapus semua kebijakan RLS yang ada untuk tabel 'contact_messages' dengan nama yang benar
DROP POLICY IF EXISTS "authenticated_users_can_view_all_contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "authenticated_users_can_delete_contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "anon_can_insert_contact_messages" ON public.contact_messages;