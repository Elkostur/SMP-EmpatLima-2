-- Membuat tabel registrations
CREATE TABLE public.registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  full_name TEXT NOT NULL,
  birth_date TEXT NOT NULL, -- Assuming YYYY-MM-DD format
  previous_school TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  document_url TEXT, -- Optional
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Pengguna terautentikasi dapat melihat semua pendaftaran (untuk admin)
CREATE POLICY "Authenticated users can view all registrations" ON public.registrations
FOR SELECT TO authenticated USING (true);

-- Kebijakan: Pengguna terautentikasi dapat membuat pendaftaran mereka sendiri
CREATE POLICY "Authenticated users can insert their own registrations" ON public.registrations
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Kebijakan: Pengguna terautentikasi dapat menghapus pendaftaran (untuk admin)
CREATE POLICY "Authenticated users can delete registrations" ON public.registrations
FOR DELETE TO authenticated USING (true);