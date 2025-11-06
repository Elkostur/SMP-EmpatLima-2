/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Tambahkan variabel lingkungan lain di sini jika diperlukan
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}