-- Membuat tabel contact_info (singleton)
CREATE TABLE public.contact_info (
  id TEXT PRIMARY KEY DEFAULT 'contact_info_singleton',
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  map_image_url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat melihat informasi kontak
CREATE POLICY "Public contact info is viewable by everyone" ON public.contact_info
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat memperbarui informasi kontak
CREATE POLICY "Authenticated users can update contact info" ON public.contact_info
FOR UPDATE TO authenticated USING (true);

-- Kebijakan: Pengguna terautentikasi dapat menyisipkan informasi kontak (hanya jika belum ada)
CREATE POLICY "Authenticated users can insert contact info" ON public.contact_info
FOR INSERT TO authenticated WITH CHECK (true);