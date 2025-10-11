import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const serverSupabase: SupabaseClient | null =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export function isServerSupabaseConfigured(): boolean {
  return !!serverSupabase;
}

export async function saveWorkshopRegistration(record: {
  name: string;
  email: string;
  phone: string;
  domain_interest: string;
  payment_status: "success" | "failed" | "pending";
  amount: number;
  currency: string;
}): Promise<void> {
  if (!serverSupabase) return;
  await serverSupabase.from("workshop_registrations").insert([record]);
}

export async function saveCohortEnrollment(record: {
  name: string;
  email: string;
  phone?: string;
  payment_status: "success" | "failed" | "pending";
  amount: number;
  currency: string;
}): Promise<void> {
  if (!serverSupabase) return;
  await serverSupabase.from("cohort_enrollments").insert([record]);
}
