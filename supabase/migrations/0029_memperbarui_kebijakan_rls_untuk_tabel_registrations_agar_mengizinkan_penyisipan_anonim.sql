-- Memastikan RLS diaktifkan untuk tabel registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Menghapus kebijakan penyisipan anonim yang ada jika ada untuk menghindari konflik
DROP POLICY IF EXISTS "Allow anonymous registration inserts" ON public.registrations;

-- Membuat kebijakan baru untuk mengizinkan pengguna anonim menyisipkan data ke tabel registrations
CREATE POLICY "Allow anon insert for registrations" ON public.registrations
FOR INSERT TO anon WITH CHECK (true);