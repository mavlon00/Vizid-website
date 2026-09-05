import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export interface Profile {
  id: string;
  email: string | null;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  category: string;
  image_url?: string | null;
  created_by?: string | null;
  created_at: string;
}

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  throw new Error(
    `Supabase URL is missing or invalid at build time. ` +
    `Received: "${supabaseUrl}". Check environment variables on this deployment.`
  );
}
if (!supabaseAnonKey) {
  throw new Error('Supabase anon key is missing at build time.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
