import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing!', { supabaseUrl, supabaseAnonKey });
  throw new Error('Supabase URL and Anon Key must be provided as environment variables.');
}

console.log('Supabase client initialized with URL:', supabaseUrl); // Log untuk verifikasi

export const supabase = createClient(supabaseUrl, supabaseAnonKey);