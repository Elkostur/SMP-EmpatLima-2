-- Membuat tabel contact_messages
CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membuat pesan kontak
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

-- Kebijakan: Pengguna terautentikasi dapat melihat semua pesan kontak
CREATE POLICY "Authenticated users can view all contact messages" ON public.contact_messages
FOR SELECT TO authenticated USING (true);

-- Kebijakan: Pengguna terautentikasi dapat menghapus pesan kontak
CREATE POLICY "Authenticated users can delete contact messages" ON public.contact_messages
FOR DELETE TO authenticated USING (true);