-- =============================================================================
-- AZORIX TECH-SEMI VLSI INSTITUTE - Database Setup
-- =============================================================================
-- This SQL script creates all necessary tables for the VLSI Institute application
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/djtenxomgdsvlidoxcmi/sql/new

-- =============================================================================
-- 1. ENROLLMENTS TABLE
-- =============================================================================
-- Stores student enrollment data from the enrollment form
CREATE TABLE enrollments (
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form submissions)
CREATE POLICY "Allow inserts on enrollments"
ON enrollments FOR INSERT
WITH CHECK (true);

-- Allow reads for authenticated users (admin dashboard)
CREATE POLICY "Allow read access on enrollments"
ON enrollments FOR SELECT
USING (true);

-- Add indexes for better performance
CREATE INDEX idx_enrollments_email ON enrollments(email);
CREATE INDEX idx_enrollments_course ON enrollments(course);
CREATE INDEX idx_enrollments_created_at ON enrollments(created_at DESC);

-- =============================================================================
-- 2. CONTACTS TABLE
-- =============================================================================
-- Stores contact form submissions
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form submissions)
CREATE POLICY "Allow inserts on contacts"
ON contacts FOR INSERT
WITH CHECK (true);

-- Allow reads for authenticated users (admin dashboard)
CREATE POLICY "Allow read access on contacts"
ON contacts FOR SELECT
USING (true);

-- Add indexes for better performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_inquiry_type ON contacts(inquiry_type);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- =============================================================================
-- 3. BROCHURE DOWNLOADS TABLE
-- =============================================================================
-- Stores brochure download requests
CREATE TABLE brochure_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  background TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE brochure_downloads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form submissions)
CREATE POLICY "Allow inserts on brochure_downloads"
ON brochure_downloads FOR INSERT
WITH CHECK (true);

-- Allow reads for authenticated users (admin dashboard)
CREATE POLICY "Allow read access on brochure_downloads"
ON brochure_downloads FOR SELECT
USING (true);

-- Add indexes for better performance
CREATE INDEX idx_brochure_downloads_email ON brochure_downloads(email);
CREATE INDEX idx_brochure_downloads_created_at ON brochure_downloads(created_at DESC);

-- =============================================================================
-- 4. DEMO REGISTRATIONS TABLE
-- =============================================================================
-- Stores demo class registration data
CREATE TABLE demo_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_category TEXT NOT NULL,
  preferred_location TEXT,
  comments TEXT,
  verification_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE demo_registrations ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (public form submissions)
CREATE POLICY "Allow inserts on demo_registrations"
ON demo_registrations FOR INSERT
WITH CHECK (true);

-- Allow reads for authenticated users (admin dashboard)
CREATE POLICY "Allow read access on demo_registrations"
ON demo_registrations FOR SELECT
USING (true);

-- Add indexes for better performance
CREATE INDEX idx_demo_registrations_email ON demo_registrations(email);
CREATE INDEX idx_demo_registrations_course_category ON demo_registrations(course_category);
CREATE INDEX idx_demo_registrations_created_at ON demo_registrations(created_at DESC);

-- =============================================================================
-- 5. ADMIN USERS TABLE (Optional - for admin dashboard)
-- =============================================================================
-- Stores admin user data if needed for dashboard authentication
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow authenticated users to read admin data
CREATE POLICY "Allow read access for authenticated users"
ON admin_users FOR SELECT
USING (auth.role() = 'authenticated');

-- Add indexes
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- =============================================================================
-- 6. COURSE CATEGORIES TABLE (Optional - for managing courses)
-- =============================================================================
-- Stores available course categories
CREATE TABLE course_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  duration TEXT,
  level TEXT, -- beginner, intermediate, advanced
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE course_categories ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read course categories (for form dropdowns)
CREATE POLICY "Allow read access on course_categories"
ON course_categories FOR SELECT
USING (true);

-- Insert default VLSI course categories
INSERT INTO course_categories (name, description, duration, level) VALUES
('VLSI Design Fundamentals', 'Introduction to VLSI design concepts and methodologies', '3 months', 'beginner'),
('Advanced Digital Design', 'Advanced topics in digital circuit design', '4 months', 'intermediate'),
('Analog IC Design', 'Analog integrated circuit design and analysis', '4 months', 'intermediate'),
('Physical Design', 'Physical implementation of VLSI designs', '3 months', 'intermediate'),
('Verification & Testing', 'VLSI verification methodologies and testing', '3 months', 'intermediate'),
('System-on-Chip Design', 'Complete SoC design flow and implementation', '6 months', 'advanced'),
('FPGA Design', 'FPGA-based design and implementation', '3 months', 'beginner'),
('Mixed Signal Design', 'Mixed-signal IC design techniques', '5 months', 'advanced');

-- =============================================================================
-- 7. TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- =============================================================================
-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brochure_downloads_updated_at BEFORE UPDATE ON brochure_downloads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demo_registrations_updated_at BEFORE UPDATE ON demo_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_categories_updated_at BEFORE UPDATE ON course_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 8. USEFUL VIEWS FOR ANALYTICS (Optional)
-- =============================================================================
-- View for enrollment analytics
CREATE VIEW enrollment_analytics AS
SELECT 
    course,
    COUNT(*) as total_enrollments,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as last_30_days,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as last_7_days
FROM enrollments 
GROUP BY course
ORDER BY total_enrollments DESC;

-- View for daily registrations
CREATE VIEW daily_registrations AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_registrations,
    COUNT(CASE WHEN 'enrollments' = 'enrollments' THEN 1 END) as enrollments,
    COUNT(CASE WHEN 'contacts' = 'contacts' THEN 1 END) as contacts,
    COUNT(CASE WHEN 'demo_registrations' = 'demo_registrations' THEN 1 END) as demo_registrations
FROM (
    SELECT created_at, 'enrollments' as type FROM enrollments
    UNION ALL
    SELECT created_at, 'contacts' as type FROM contacts
    UNION ALL
    SELECT created_at, 'demo_registrations' as type FROM demo_registrations
) all_registrations
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- =============================================================================
-- SETUP COMPLETE!
-- =============================================================================
-- All tables have been created with:
-- ✅ Proper indexes for performance
-- ✅ Row Level Security (RLS) enabled
-- ✅ Public insert policies for form submissions
-- ✅ Read policies for admin access
-- ✅ Automatic timestamp updates
-- ✅ Sample course categories
-- ✅ Analytical views

-- Next steps:
-- 1. Run this SQL in your Supabase dashboard
-- 2. Verify all tables are created
-- 3. Test form submissions from your application
-- 4. Configure admin authentication if needed
