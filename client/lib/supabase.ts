import { createClient } from "@supabase/supabase-js";

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://your-project-url.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return (
    !!supabaseUrl &&
    !!supabaseKey &&
    supabaseUrl !== "https://your-project-url.supabase.co" &&
    supabaseKey !== "your-anon-key"
  );
};

// Initialize client only when configured to avoid invalid network requests in dev
let _supabase: SupabaseClient | null = null;
if (isSupabaseConfigured()) {
  _supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn(
    "Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable DB features.",
  );
}

export const supabase = _supabase;

// Helper function to check configuration
export const checkSupabaseConfig = () => {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
    );
    return false;
  }
  return true;
};

// Database schemas
export interface EnrollmentData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  education: string;
  branch: string;
  graduationYear: string;
  experience: string;
  currentRole?: string;
  company?: string;
  course: string;
  preferredMode: string;
  previousExperience?: string;
  motivation: string;
  hearAboutUs: string;
  agreeTerms: boolean;
  agreeMarketing: boolean;
  createdAt?: string;
}

export interface ContactData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface BrochureDownloadData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  background?: string;
  createdAt?: string;
}

export interface DemoRegistrationData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseCategory: string;
  preferredLocation?: string;
  comments?: string;
  verificationCode?: string;
  createdAt?: string;
}

// Database operations
export const saveEnrollmentData = async (data: EnrollmentData) => {
  if (!checkSupabaseConfig()) {
    throw new Error("Database not configured. Please contact support.");
  }

  try {
    const { data: result, error } = await supabase
      .from("enrollments")
      .insert([{
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        education: data.education,
        branch: data.branch,
        graduation_year: data.graduationYear,
        experience: data.experience,
        job_role: data.currentRole,
        company: data.company,
        course: data.course,
        preferred_mode: data.preferredMode,
        previous_experience: data.previousExperience,
        motivation: data.motivation,
        hear_about_us: data.hearAboutUs,
        agree_terms: data.agreeTerms,
        agree_marketing: data.agreeMarketing
      }])
      .select();

    if (error) {
      console.error("Supabase error details:", error);
      throw new Error(`Database error: ${error.message || error.toString()}`);
    }

    return result;
  } catch (error: any) {
    console.error("Error saving enrollment:", error);
    throw new Error(
      `Failed to save enrollment: ${error.message || error.toString()}`,
    );
  }
};

export const saveContactData = async (data: ContactData) => {
  if (!checkSupabaseConfig()) {
    throw new Error("Database not configured. Please contact support.");
  }

  try {
    const { data: result, error } = await supabase
      .from("contacts")
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        inquiry_type: data.inquiryType,
        subject: data.subject,
        message: data.message
      }])
      .select();

    if (error) {
      console.error("Supabase error details:", error);
      throw new Error(`Database error: ${error.message || error.toString()}`);
    }

    return result;
  } catch (error: any) {
    console.error("Error saving contact:", error);
    throw new Error(
      `Failed to save contact: ${error.message || error.toString()}`,
    );
  }
};

export const saveBrochureDownload = async (data: BrochureDownloadData) => {
  if (!checkSupabaseConfig()) {
    throw new Error("Database not configured. Please contact support.");
  }

  try {
    const { data: result, error } = await supabase
      .from("brochure_downloads")
      .insert([data])
      .select();

    if (error) {
      console.error("Supabase error details:", error);
      throw new Error(`Database error: ${error.message || error.toString()}`);
    }

    return result;
  } catch (error: any) {
    console.error("Error saving brochure download:", error);
    throw new Error(
      `Failed to save brochure download: ${error.message || error.toString()}`,
    );
  }
};

export const saveDemoRegistration = async (data: DemoRegistrationData) => {
  if (!checkSupabaseConfig()) {
    throw new Error("Database not configured. Please contact support.");
  }

  try {
    const { data: result, error } = await supabase
      .from("demo_registrations")
      .insert([{
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        course_category: data.courseCategory,
        preferred_location: data.preferredLocation,
        comments: data.comments,
        verification_code: data.verificationCode
      }])
      .select();

    if (error) {
      console.error("Supabase error details:", error);
      throw new Error(`Database error: ${error.message || error.toString()}`);
    }

    return result;
  } catch (error: any) {
    console.error("Error saving demo registration:", error);
    throw new Error(
      `Failed to save demo registration: ${error.message || error.toString()}`,
    );
  }
};
