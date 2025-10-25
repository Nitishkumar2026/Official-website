-- This SQL script sets up the admin functionality in Supabase

-- 1. First, ensure the profiles table has an is_admin column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Create a function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, is_admin)
  VALUES (
    NEW.id,
    'user',
    NEW.raw_user_meta_data->>'full_name',
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create a trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Create a function to set a user as admin (to be run manually for specific users)
CREATE OR REPLACE FUNCTION public.set_user_as_admin(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET is_admin = true
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create Row Level Security policies for the jobs table
-- Enable RLS on the jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting jobs (everyone can view)
CREATE POLICY "Anyone can view jobs"
  ON public.jobs
  FOR SELECT
  USING (true);

-- Create policy for inserting jobs (only admins can insert)
CREATE POLICY "Only admins can insert jobs"
  ON public.jobs
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.is_admin = true
  ));

-- Create policy for updating jobs (only admins can update)
CREATE POLICY "Only admins can update jobs"
  ON public.jobs
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.is_admin = true
  ));

-- Create policy for deleting jobs (only admins can delete)
CREATE POLICY "Only admins can delete jobs"
  ON public.jobs
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.is_admin = true
  ));

-- IMPORTANT: To make a user an admin, run the following SQL in the Supabase SQL editor:
-- SELECT public.set_user_as_admin('USER_ID_HERE');
-- Replace USER_ID_HERE with the actual UUID of the user you want to make an admin