-- Membuat tabel achievements
CREATE TABLE public.achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL, -- ISO date string: "YYYY-MM-DD"
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat melihat prestasi
CREATE POLICY "Public achievements are viewable by everyone" ON public.achievements
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat prestasi
CREATE POLICY "Authenticated users can create achievements" ON public.achievements
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat memperbarui prestasi mereka sendiri
CREATE POLICY "Users can update their own achievements" ON public.achievements
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat menghapus prestasi mereka sendiri
CREATE POLICY "Users can delete their own achievements" ON public.achievements
FOR DELETE TO authenticated USING (auth.uid() = user_id);