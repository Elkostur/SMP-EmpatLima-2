-- 1. Memberikan izin INSERT kepada peran anonim pada tabel pendaftaran.
-- Ini diperlukan agar kebijakan RLS dapat dievaluasi untuk pengguna anonim.
GRANT INSERT ON TABLE public.registrations TO anon;

-- 2. Membuat ulang kebijakan RLS untuk secara eksplisit mengizinkan penyisipan anonim.
-- Ini memastikan setiap pengguna (termasuk yang tidak login) dapat mengirimkan formulir.
DROP POLICY IF EXISTS "Allow anonymous registration inserts" ON public.registrations;
CREATE POLICY "Allow anonymous registration inserts" ON public.registrations
FOR INSERT TO anon WITH CHECK (true);