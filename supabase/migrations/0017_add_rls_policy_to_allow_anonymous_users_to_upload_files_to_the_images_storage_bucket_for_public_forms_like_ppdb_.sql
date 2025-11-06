-- Allow anonymous users to insert (upload) files to the 'images' bucket
CREATE POLICY "Allow anonymous uploads for public forms"
ON storage.objects FOR INSERT TO anon
WITH CHECK (bucket_id = 'images');