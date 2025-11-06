-- Membuat tabel hero_images
CREATE TABLE public.hero_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca gambar hero
CREATE POLICY "Public hero images are viewable by everyone" ON public.hero_images
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat gambar hero
CREATE POLICY "Authenticated users can create hero images" ON public.hero_images
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat memperbarui gambar hero mereka sendiri
CREATE POLICY "Users can update their own hero images" ON public.hero_images
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat menghapus gambar hero mereka sendiri
CREATE POLICY "Users can delete their own hero images" ON public.hero_images
FOR DELETE TO authenticated USING (auth.uid() = user_id);