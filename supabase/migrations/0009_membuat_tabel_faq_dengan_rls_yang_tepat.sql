-- Membuat tabel faqs
CREATE TABLE public.faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca FAQ
CREATE POLICY "Public faqs are viewable by everyone" ON public.faqs
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat FAQ
CREATE POLICY "Authenticated users can create faqs" ON public.faqs
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat memperbarui FAQ mereka sendiri
CREATE POLICY "Users can update their own faqs" ON public.faqs
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat menghapus FAQ mereka sendiri
CREATE POLICY "Users can delete their own faqs" ON public.faqs
FOR DELETE TO authenticated USING (auth.uid() = user_id);