-- Membuat tabel facilities
CREATE TABLE public.facilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca fasilitas
CREATE POLICY "Public facilities are viewable by everyone" ON public.facilities
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat fasilitas
CREATE POLICY "Authenticated users can create facilities" ON public.facilities
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat memperbarui fasilitas mereka sendiri
CREATE POLICY "Users can update their own facilities" ON public.facilities
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat menghapus fasilitas mereka sendiri
CREATE POLICY "Users can delete their own facilities" ON public.facilities
FOR DELETE TO authenticated USING (auth.uid() = user_id);