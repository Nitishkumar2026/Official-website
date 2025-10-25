import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// Optional service role key for admin operations (bypassing RLS)
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

let supabase: SupabaseClient | null = null;
let isSupabaseConnected = false;

// Function to get admin client (bypasses RLS)
export const getAdminClient = () => {
  if (supabaseUrl && supabaseServiceKey && supabaseServiceKey !== 'YOUR_SUPABASE_SERVICE_ROLE_KEY') {
    try {
      return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false
        }
      });
    } catch (error) {
      console.error("Error initializing Supabase admin client", error);
      return null;
    }
  }
  return null;
};

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
