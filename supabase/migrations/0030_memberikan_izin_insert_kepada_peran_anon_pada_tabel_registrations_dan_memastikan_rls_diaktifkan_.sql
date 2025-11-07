-- Memberikan izin INSERT kepada peran 'anon' pada tabel 'registrations'
GRANT INSERT ON public.registrations TO anon;

-- Memastikan RLS diaktifkan untuk tabel registrations (jika belum)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;