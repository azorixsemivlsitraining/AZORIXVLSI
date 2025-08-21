# Supabase Database Setup - AZORIX TECH-SEMI VLSI INSTITUTE

## 🔄 NEW DATABASE CONFIGURATION

**Project ID:** `zszamstjlzjfkwslzjfx`
**Dashboard URL:** https://supabase.com/dashboard/project/zszamstjlzjfkwslzjfx

## 📊 Quick Setup

**Option 1: Use the Complete Setup File**
1. Copy all content from `database_setup.sql` (located in the project root)
2. Go to [SQL Editor](https://supabase.com/dashboard/project/zszamstjlzjfkwslzjfx/sql/new)
3. Paste and run the complete script

**Option 2: Manual Table Creation**
Follow the individual SQL commands below.

## 🗄️ Required Tables

### 1. enrollments

```sql
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

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow inserts on enrollments" ON enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read access on enrollments" ON enrollments FOR SELECT USING (true);
CREATE INDEX idx_enrollments_email ON enrollments(email);
CREATE INDEX idx_enrollments_course ON enrollments(course);
CREATE INDEX idx_enrollments_created_at ON enrollments(created_at DESC);
```

### 2. contacts

```sql
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

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow inserts on contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read access on contacts" ON contacts FOR SELECT USING (true);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_inquiry_type ON contacts(inquiry_type);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
```

### 3. brochure_downloads

```sql
CREATE TABLE brochure_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  background TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE brochure_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow inserts on brochure_downloads" ON brochure_downloads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read access on brochure_downloads" ON brochure_downloads FOR SELECT USING (true);
CREATE INDEX idx_brochure_downloads_email ON brochure_downloads(email);
CREATE INDEX idx_brochure_downloads_created_at ON brochure_downloads(created_at DESC);
```

### 4. demo_registrations

```sql
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

ALTER TABLE demo_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow inserts on demo_registrations" ON demo_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read access on demo_registrations" ON demo_registrations FOR SELECT USING (true);
CREATE INDEX idx_demo_registrations_email ON demo_registrations(email);
CREATE INDEX idx_demo_registrations_course_category ON demo_registrations(course_category);
CREATE INDEX idx_demo_registrations_created_at ON demo_registrations(created_at DESC);
```

## 🔧 Environment Variables Configured

**Current Configuration:**
- `VITE_SUPABASE_URL`: `https://zszamstjlzjfkwslzjfx.supabase.co`
- `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzemFtc3RqbHpqZmt3c2x6amZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2Njg5NjEsImV4cCI6MjA3MTI0NDk2MX0.MNSsjpZbZ4u0FxcbmZGJyJTAjFIjcD81eM0uv6vbJcI`

## 📱 Mobile Optimizations

✅ **Demo Popup Mobile Improvements:**
- Reduced popup size for mobile devices (max-w-xs on mobile, max-w-md on larger screens)
- Optimized padding and spacing for small screens
- Responsive text sizes and button heights
- Improved touch targets for mobile interaction

## 🔗 Forms Connected to Supabase

✅ **Active Connections:**
1. **Contact Form** (`/contact`) → `contacts` table
2. **Brochure Modal** → `brochure_downloads` table
3. **Brochure Page** (`/brochure`) → `brochure_downloads` table
4. **Enrollment Form** (`/enroll`) → `enrollments` table
5. **Demo Registration** (`/demo-registration`) → `demo_registrations` table

All forms include error handling and localStorage fallback for reliability.

## 🚀 Next Steps

1. **Run Database Setup:**
   - Open [SQL Editor](https://supabase.com/dashboard/project/zszamstjlzjfkwslzjfx/sql/new)
   - Execute the complete `database_setup.sql` script

2. **Verify Setup:**
   - Check all tables are created in [Table Editor](https://supabase.com/dashboard/project/zszamstjlzjfkwslzjfx/editor)
   - Test form submissions from the application

3. **Monitor Data:**
   - Use [Database](https://supabase.com/dashboard/project/zszamstjlzjfkwslzjfx/database/tables) to view submitted data
   - Check [Logs](https://supabase.com/dashboard/project/zszamstjlzjfkwslzjfx/logs/postgres-logs) for any errors

## 📈 Features Included

- **Performance:** Optimized indexes for fast queries
- **Security:** Row Level Security (RLS) enabled
- **Analytics:** Built-in views for enrollment and registration analytics
- **Mobile:** Responsive design optimizations
- **Reliability:** Error handling and fallback mechanisms
