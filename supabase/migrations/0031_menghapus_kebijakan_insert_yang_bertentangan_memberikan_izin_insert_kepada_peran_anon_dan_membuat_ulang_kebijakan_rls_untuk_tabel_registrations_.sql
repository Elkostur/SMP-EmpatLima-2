-- Menghapus semua kebijakan INSERT yang ada untuk tabel 'registrations'
DROP POLICY IF EXISTS "Allow anon insert for registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow anon insert for registrations_old" ON public.registrations;
DROP POLICY IF EXISTS "Allow anon insert for registrations_v2" ON public.registrations;
DROP POLICY IF EXISTS "anon_insert_registrations_policy" ON public.registrations;

-- Memastikan RLS diaktifkan untuk tabel registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Memberikan izin INSERT kepada peran 'anon' pada tabel 'registrations'
GRANT INSERT ON public.registrations TO anon;

-- Membuat kebijakan baru yang secara eksplisit mengizinkan peran 'anon' untuk menyisipkan data apa pun
CREATE POLICY "anon_insert_registrations_final_policy" ON public.registrations
FOR INSERT TO anon WITH CHECK (true);