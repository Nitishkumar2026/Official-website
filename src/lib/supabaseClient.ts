import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;
let isSupabaseConnected = false;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY') {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    isSupabaseConnected = true;
  } catch (error) {
    console.error("Error initializing Supabase client: Invalid URL provided.", error);
    supabase = null;
    isSupabaseConnected = false;
  }
} else {
  console.warn('Supabase credentials are not configured in the .env file. Forms will be disabled.');
}

export { supabase, isSupabaseConnected };
