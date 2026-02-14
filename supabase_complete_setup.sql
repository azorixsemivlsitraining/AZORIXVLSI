-- Complete Supabase Database Setup Script
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/djtenxomgdsvlidoxcmi/sql

-- 1. Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  education TEXT NOT NULL,
  branch TEXT NOT NULL,
  graduation_year TEXT NOT NULL,
  experience TEXT NOT NULL,
  job_role TEXT,
  company TEXT,
  course TEXT NOT NULL,
  preferred_mode TEXT NOT NULL,
  previous_experience TEXT,
  motivation TEXT NOT NULL,
  hear_about_us TEXT NOT NULL,
  agree_terms BOOLEAN NOT NULL DEFAULT false,
  agree_marketing BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create brochure_downloads table
CREATE TABLE IF NOT EXISTS brochure_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  background TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create demo_registrations table
CREATE TABLE IF NOT EXISTS demo_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_category TEXT NOT NULL,
  preferred_location TEXT,
  comments TEXT,
  verification_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE brochure_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies to allow inserts from anyone (for form submissions)
CREATE POLICY IF NOT EXISTS "Allow inserts on enrollments" 
ON enrollments FOR INSERT 
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow inserts on contacts" 
ON contacts FOR INSERT 
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow inserts on brochure_downloads" 
ON brochure_downloads FOR INSERT 
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow inserts on demo_registrations" 
ON demo_registrations FOR INSERT 
WITH CHECK (true);

-- Create policies to allow reads (for admin dashboard if needed)
CREATE POLICY IF NOT EXISTS "Allow read access on enrollments" 
ON enrollments FOR SELECT 
USING (true);

CREATE POLICY IF NOT EXISTS "Allow read access on contacts" 
ON contacts FOR SELECT 
USING (true);

CREATE POLICY IF NOT EXISTS "Allow read access on brochure_downloads" 
ON brochure_downloads FOR SELECT 
USING (true);

CREATE POLICY IF NOT EXISTS "Allow read access on demo_registrations" 
ON demo_registrations FOR SELECT 
USING (true);

-- Verify tables were created
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('enrollments', 'contacts', 'brochure_downloads', 'demo_registrations')
ORDER BY table_name;
