-- Membuat tabel galleries
CREATE TABLE public.galleries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca item galeri
CREATE POLICY "Public gallery items are viewable by everyone" ON public.galleries 
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat item galeri
CREATE POLICY "Authenticated users can create gallery items" ON public.galleries 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat memperbarui item galeri mereka sendiri
CREATE POLICY "Users can update their own gallery items" ON public.galleries 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat menghapus item galeri mereka sendiri
CREATE POLICY "Users can delete their own gallery items" ON public.galleries 
FOR DELETE TO authenticated USING (auth.uid() = user_id);