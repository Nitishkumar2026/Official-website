import { supabase } from './supabaseClient';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Contact form submit
export async function submitContact({ name, email, subject, message }: ContactData) {
  if (!supabase) throw new Error("Supabase client is not initialized.");
  
  const { data, error } = await supabase
    .from('contacts')
    .insert([{ name, email, subject, message }]);

  if (error) throw error;
  return data;
}

// Newsletter subscribe
export async function subscribeNewsletter(email: string) {
  if (!supabase) throw new Error("Supabase client is not initialized.");

  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .insert([{ email }]);

  if (error) {
    // Handle unique constraint violation for existing emails
    if (error.code === '23505') {
      throw new Error('This email is already subscribed.');
    }
    throw error;
  }
  return data;
}
