-- Membuat tabel extracurriculars
CREATE TABLE public.extracurriculars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.extracurriculars ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca ekstrakurikuler
CREATE POLICY "Public extracurriculars are viewable by everyone" ON public.extracurriculars 
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat ekstrakurikuler
CREATE POLICY "Authenticated users can create extracurriculars" ON public.extracurriculars 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat memperbarui ekstrakurikuler mereka sendiri
CREATE POLICY "Users can update their own extracurriculars" ON public.extracurriculars 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat menghapus ekstrakurikuler mereka sendiri
CREATE POLICY "Users can delete their own extracurriculars" ON public.extracurriculars 
FOR DELETE TO authenticated USING (auth.uid() = user_id);