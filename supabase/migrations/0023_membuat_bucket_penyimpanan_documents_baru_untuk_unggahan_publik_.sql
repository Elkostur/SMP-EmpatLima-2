-- 1. Membuat bucket baru bernama 'documents' untuk unggahan formulir publik.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('documents', 'documents', TRUE, 5242880, ARRAY['application/pdf', 'image/jpeg', 'image/png'])
ON CONFLICT (id) DO NOTHING;

-- 2. Menghapus kebijakan lama yang mungkin bertentangan.
DROP POLICY IF EXISTS "Allow anonymous document uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access on documents" ON storage.objects;

-- 3. Membuat kebijakan untuk mengizinkan SIAPA SAJA (termasuk pengguna anonim) untuk MENGUNGGAH ke bucket 'documents'.
CREATE POLICY "Allow anonymous document uploads" ON storage.objects
FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'documents');

-- 4. Membuat kebijakan untuk mengizinkan SIAPA SAJA untuk MELIHAT file di bucket 'documents'.
CREATE POLICY "Allow public read access on documents" ON storage.objects
FOR SELECT
USING (bucket_id = 'documents');