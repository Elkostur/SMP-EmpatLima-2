-- Membuat tabel staff
CREATE TABLE public.staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT NOT NULL,
  nuptk TEXT,
  address TEXT,
  religion TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca anggota staf
CREATE POLICY "Public staff members are viewable by everyone" ON public.staff 
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat anggota staf
CREATE POLICY "Authenticated users can create staff members" ON public.staff 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat memperbarui anggota staf mereka sendiri
CREATE POLICY "Users can update their own staff members" ON public.staff 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Kebijakan: Pengguna dapat menghapus anggota staf mereka sendiri
CREATE POLICY "Users can delete their own staff members" ON public.staff 
FOR DELETE TO authenticated USING (auth.uid() = user_id);