-- Kebijakan untuk mengizinkan pengguna terautentikasi mengunggah file
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'images');

-- Kebijakan untuk mengizinkan semua orang melihat file
CREATE POLICY "Allow public access to images" ON storage.objects
FOR SELECT
USING (bucket_id = 'images');