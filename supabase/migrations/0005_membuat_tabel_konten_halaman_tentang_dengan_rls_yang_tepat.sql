-- Membuat tabel about_page_content
CREATE TABLE public.about_page_content (
  id TEXT PRIMARY KEY DEFAULT 'about_page_singleton', -- Menggunakan ID tetap untuk memastikan hanya ada satu entri
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.about_page_content ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca konten halaman tentang
CREATE POLICY "Public read access for about page content" ON public.about_page_content
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat memperbarui konten halaman tentang
CREATE POLICY "Authenticated users can update about page content" ON public.about_page_content
FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL);

-- Kebijakan: Pengguna terautentikasi dapat menyisipkan konten halaman tentang (untuk pengaturan awal)
CREATE POLICY "Authenticated users can insert about page content" ON public.about_page_content
FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);