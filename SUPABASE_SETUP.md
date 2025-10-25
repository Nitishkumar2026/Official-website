# Supabase Setup for Yubisaki Website

## Row Level Security (RLS) Setup

To properly set up Row Level Security in Supabase for the jobs table, follow these steps:

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following SQL to enable RLS on the jobs table:

```sql
-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all jobs
CREATE POLICY "Anyone can view jobs" 
  ON jobs FOR SELECT 
  USING (true);

-- Create policy for admin users to insert jobs
CREATE POLICY "Admins can insert jobs" 
  ON jobs FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM profiles WHERE is_admin = true
  ));

-- Create policy for admin users to update their own jobs
CREATE POLICY "Admins can update their own jobs" 
  ON jobs FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM profiles WHERE is_admin = true
  ));

-- Create policy for admin users to delete their own jobs
CREATE POLICY "Admins can delete their own jobs" 
  ON jobs FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM profiles WHERE is_admin = true
  ));
```

## Service Role Key Setup

For admin operations that bypass RLS:

1. In your Supabase dashboard, go to Project Settings > API
2. Find the "service_role" key (this has admin privileges)
3. Add this key to your environment variables as `VITE_SUPABASE_SERVICE_ROLE_KEY`
4. **IMPORTANT**: Never expose this key in client-side code or public repositories

## Netlify Deployment

When deploying to Netlify:

1. Add all three environment variables in the Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_SERVICE_ROLE_KEY`

2. Make sure your Supabase database has the correct RLS policies

3. For the hardcoded admin login, ensure the credentials are working as expected

## Jobs Table Schema

Ensure your jobs table has the following schema:

```sql
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Testing

Before deploying to production, test that:

1. Non-admin users can view jobs but cannot post/edit/delete
2. Admin users can post, edit, and delete jobs
3. The hardcoded admin login works correctly