-- 1. Menghapus nilai default dari kolom user_id.
-- Ini adalah langkah kunci untuk mencegah kegagalan otomatis bagi pengguna anonim.
ALTER TABLE public.registrations ALTER COLUMN user_id DROP DEFAULT;

-- 2. Memastikan kembali bahwa peran anonim memiliki izin untuk menyisipkan data.
GRANT INSERT ON TABLE public.registrations TO anon;

-- 3. Membuat ulang kebijakan untuk mengizinkan penyisipan data oleh pengguna anonim.
DROP POLICY IF EXISTS "Allow anonymous registration inserts" ON public.registrations;
CREATE POLICY "Allow anonymous registration inserts" ON public.registrations
FOR INSERT TO anon WITH CHECK (true);