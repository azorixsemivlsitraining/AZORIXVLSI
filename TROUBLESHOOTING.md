# 🔧 Supabase Connection Troubleshooting

## Current Issue Fixed ✅

**Error:** `Could not find the table 'public.enrollments' in the schema cache`

**Solution:** The database tables were missing. Follow these steps:

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Database Tables
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/djtenxomgdsvlidoxcmi
2. Click "SQL Editor" in the left sidebar
3. Copy the entire content from `supabase_complete_setup.sql`
4. Paste it in the SQL editor
5. Click "Run" to execute

### Step 2: Verify Connection
1. The dev server should automatically reconnect
2. Test any form on your website
3. Check your Supabase dashboard under "Table Editor" to see the data

## 🎯 What Was Fixed

1. **Added missing database tables:**
   - `enrollments` - Course enrollment forms
   - `contacts` - Contact form submissions
   - `brochure_downloads` - Brochure download requests
   - `demo_registrations` - Demo class registrations

2. **Fixed column mapping issues:**
   - JavaScript camelCase → Database snake_case
   - Example: `firstName` → `first_name`

3. **Added proper security policies:**
   - Row Level Security enabled
   - Insert permissions for form submissions
   - Read permissions for admin access

## 🔍 Testing Forms

After running the SQL setup, test these forms:
- ✅ Contact Form (`/contact`)
- ✅ Enrollment Form (`/enroll`) 
- ✅ Brochure Downloads (`/brochure`)
- ✅ Demo Registration (`/demo-registration`)

## 🆘 If Issues Persist

1. Check browser console for detailed error messages
2. Verify your Supabase project URL and keys
3. Ensure all tables exist in your Supabase dashboard
4. Check if RLS policies are properly set

## 📊 Admin Dashboard

To view submitted data:
1. Go to Supabase Dashboard → Table Editor
2. Select any table (enrollments, contacts, etc.)
3. View all form submissions in real-time
