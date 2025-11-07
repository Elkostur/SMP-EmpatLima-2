-- Menghapus kebijakan yang mungkin ambigu
DROP POLICY IF EXISTS "Allow anonymous registration inserts" ON public.registrations;

-- Membuat kebijakan baru yang secara eksplisit mengizinkan pengguna anonim untuk mendaftar
CREATE POLICY "Allow anonymous registration inserts" ON public.registrations
FOR INSERT TO anon WITH CHECK (true);

-- Menambahkan kebijakan untuk mengizinkan unggahan file oleh pengguna anonim ke folder 'public' di bucket 'images'
-- Ini diperlukan untuk dokumen pendaftaran
DROP POLICY IF EXISTS "Allow anonymous uploads to public folder" ON storage.objects;
CREATE POLICY "Allow anonymous uploads to public folder" ON storage.objects
FOR INSERT TO anon WITH CHECK ( bucket_id = 'images' AND (storage.foldername(name))[1] = 'public' );