-- Membuat tabel statistics
CREATE TABLE public.statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mengaktifkan RLS (WAJIB untuk keamanan)
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Semua orang dapat membaca statistik
CREATE POLICY "Public statistics are viewable by everyone" ON public.statistics
FOR SELECT USING (true);

-- Kebijakan: Pengguna terautentikasi dapat memperbarui statistik
CREATE POLICY "Authenticated users can update statistics" ON public.statistics
FOR UPDATE TO authenticated USING (true);

-- Kebijakan: Pengguna terautentikasi dapat menyisipkan statistik (untuk pengaturan awal jika diperlukan)
CREATE POLICY "Authenticated users can insert statistics" ON public.statistics
FOR INSERT TO authenticated WITH CHECK (true);

-- Kebijakan: Pengguna terautentikasi dapat menghapus statistik (jika diperlukan, meskipun tidak ada di UI saat ini)
CREATE POLICY "Authenticated users can delete statistics" ON public.statistics
FOR DELETE TO authenticated USING (true);