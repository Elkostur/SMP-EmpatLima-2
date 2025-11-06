-- Membuat tabel posts
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca postingan
CREATE POLICY "Public posts are viewable by everyone" ON public.posts 
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat postingan
CREATE POLICY "Authenticated users can create posts" ON public.posts 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat memperbarui postingan mereka sendiri
CREATE POLICY "Users can update their own posts" ON public.posts 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat menghapus postingan mereka sendiri
CREATE POLICY "Users can delete their own posts" ON public.posts 
FOR DELETE TO authenticated USING (auth.uid() = user_id);