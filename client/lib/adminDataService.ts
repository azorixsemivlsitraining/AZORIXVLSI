import { supabase, checkSupabaseConfig } from "./supabase";
import * as XLSX from "xlsx";

export interface AdminStats {
  contact: number;
  enroll: number;
  brochure: number;
  demo: number;
  total: number;
}

export interface FormData {
  id: string;
  created_at: string;
  [key: string]: any;
}

export interface AdminFormData {
  contacts: FormData[];
  enrollments: FormData[];
  brochureDownloads: FormData[];
  demoRegistrations: FormData[];
}

// Fetch all form data from Supabase
export const fetchAllFormData = async (): Promise<AdminFormData> => {
  if (!checkSupabaseConfig()) {
    throw new Error(
      "Supabase not configured. Please set up database connection.",
    );
  }

  try {
    // Fetch all data in parallel
    const [
      { data: contacts, error: contactsError },
      { data: enrollments, error: enrollmentsError },
      { data: brochureDownloads, error: brochureError },
      { data: demoRegistrations, error: demoError },
    ] = await Promise.all([
      supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("enrollments")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("brochure_downloads")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("demo_registrations")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (contactsError) throw contactsError;
    if (enrollmentsError) throw enrollmentsError;
    if (brochureError) throw brochureError;
    if (demoError) throw demoError;

    return {
      contacts: contacts || [],
      enrollments: enrollments || [],
      brochureDownloads: brochureDownloads || [],
      demoRegistrations: demoRegistrations || [],
    };
  } catch (error) {
    console.error("Error fetching form data:", error);
    throw new Error(
      `Failed to fetch form data: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

// Get statistics from Supabase
export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    const data = await fetchAllFormData();

    const stats = {
      contact: data.contacts.length,
      enroll: data.enrollments.length,
      brochure: data.brochureDownloads.length,
      demo: data.demoRegistrations.length,
      total: 0,
    };

    stats.total = stats.contact + stats.enroll + stats.brochure + stats.demo;

    return stats;
  } catch (error) {
    console.error("Error getting admin stats:", error);
    // Return zero stats if there's an error
    return {
      contact: 0,
      enroll: 0,
      brochure: 0,
      demo: 0,
      total: 0,
    };
  }
};

// Export all data to Excel
export const exportAllDataToExcel = async () => {
  try {
    const data = await fetchAllFormData();

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Prepare contact forms data
    const contactsData = data.contacts.map((contact) => ({
      Name: contact.name,
      Email: contact.email,
      Phone: contact.phone || "N/A",
      "Inquiry Type": contact.inquiry_type,
      Subject: contact.subject,
      Message: contact.message,
      "Submitted At": new Date(contact.created_at).toLocaleString(),
    }));

    // Prepare enrollment forms data
    const enrollmentsData = data.enrollments.map((enrollment) => ({
      "First Name": enrollment.first_name,
      "Last Name": enrollment.last_name,
      Email: enrollment.email,
      Phone: enrollment.phone,
      Education: enrollment.education,
      Branch: enrollment.branch,
      "Graduation Year": enrollment.graduation_year,
      Experience: enrollment.experience,
      "Current Role": enrollment.job_role || "N/A",
      Company: enrollment.company || "N/A",
      Course: enrollment.course,
      "Preferred Mode": enrollment.preferred_mode,
      "Previous Experience": enrollment.previous_experience || "N/A",
      Motivation: enrollment.motivation,
      "How did you hear about us": enrollment.hear_about_us,
      "Agreed to Terms": enrollment.agree_terms ? "Yes" : "No",
      "Agreed to Marketing": enrollment.agree_marketing ? "Yes" : "No",
      "Submitted At": new Date(enrollment.created_at).toLocaleString(),
    }));

    // Prepare brochure downloads data
    const brochureData = data.brochureDownloads.map((brochure) => ({
      Name: brochure.name,
      Email: brochure.email,
      Phone: brochure.phone,
      Background: brochure.background || "N/A",
      "Downloaded At": new Date(brochure.created_at).toLocaleString(),
    }));

    // Prepare demo registrations data
    const demoData = data.demoRegistrations.map((demo) => ({
      "First Name": demo.first_name,
      "Last Name": demo.last_name,
      Email: demo.email,
      Phone: demo.phone,
      "Course Category": demo.course_category,
      "Preferred Location": demo.preferred_location || "N/A",
      Comments: demo.comments || "N/A",
      "Verification Code": demo.verification_code || "N/A",
      "Registered At": new Date(demo.created_at).toLocaleString(),
    }));

    // Create worksheets
    const contactsWs = XLSX.utils.json_to_sheet(contactsData);
    const enrollmentsWs = XLSX.utils.json_to_sheet(enrollmentsData);
    const brochureWs = XLSX.utils.json_to_sheet(brochureData);
    const demoWs = XLSX.utils.json_to_sheet(demoData);

    // Add worksheets to workbook
    XLSX.utils.book_append_sheet(wb, contactsWs, "Contact Forms");
    XLSX.utils.book_append_sheet(wb, enrollmentsWs, "Enrollment Forms");
    XLSX.utils.book_append_sheet(wb, brochureWs, "Brochure Downloads");
    XLSX.utils.book_append_sheet(wb, demoWs, "Demo Registrations");

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `Azorix_VLSI_Form_Submissions_${timestamp}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);

    return {
      success: true,
      filename,
      contactCount: contactsData.length,
      enrollmentCount: enrollmentsData.length,
      brochureCount: brochureData.length,
      demoCount: demoData.length,
      totalCount:
        contactsData.length +
        enrollmentsData.length +
        brochureData.length +
        demoData.length,
    };
  } catch (error) {
    console.error("Error exporting data to Excel:", error);
    throw new Error(
      `Failed to export data: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

// Export individual form type to Excel
export const exportFormTypeToExcel = async (
  formType:
    | "contacts"
    | "enrollments"
    | "brochureDownloads"
    | "demoRegistrations",
) => {
  try {
    const data = await fetchAllFormData();

    const wb = XLSX.utils.book_new();
    let wsData: any[] = [];
    let sheetName = "";
    let filename = "";

    switch (formType) {
      case "contacts":
        wsData = data.contacts.map((contact) => ({
          Name: contact.name,
          Email: contact.email,
          Phone: contact.phone || "N/A",
          "Inquiry Type": contact.inquiry_type,
          Subject: contact.subject,
          Message: contact.message,
          "Submitted At": new Date(contact.created_at).toLocaleString(),
        }));
        sheetName = "Contact Forms";
        filename = "Contact_Forms";
        break;

      case "enrollments":
        wsData = data.enrollments.map((enrollment) => ({
          "First Name": enrollment.first_name,
          "Last Name": enrollment.last_name,
          Email: enrollment.email,
          Phone: enrollment.phone,
          Education: enrollment.education,
          Branch: enrollment.branch,
          "Graduation Year": enrollment.graduation_year,
          Experience: enrollment.experience,
          "Current Role": enrollment.job_role || "N/A",
          Company: enrollment.company || "N/A",
          Course: enrollment.course,
          "Preferred Mode": enrollment.preferred_mode,
          "Previous Experience": enrollment.previous_experience || "N/A",
          Motivation: enrollment.motivation,
          "How did you hear about us": enrollment.hear_about_us,
          "Agreed to Terms": enrollment.agree_terms ? "Yes" : "No",
          "Agreed to Marketing": enrollment.agree_marketing ? "Yes" : "No",
          "Submitted At": new Date(enrollment.created_at).toLocaleString(),
        }));
        sheetName = "Enrollment Forms";
        filename = "Enrollment_Forms";
        break;

      case "brochureDownloads":
        wsData = data.brochureDownloads.map((brochure) => ({
          Name: brochure.name,
          Email: brochure.email,
          Phone: brochure.phone,
          Background: brochure.background || "N/A",
          "Downloaded At": new Date(brochure.created_at).toLocaleString(),
        }));
        sheetName = "Brochure Downloads";
        filename = "Brochure_Downloads";
        break;

      case "demoRegistrations":
        wsData = data.demoRegistrations.map((demo) => ({
          "First Name": demo.first_name,
          "Last Name": demo.last_name,
          Email: demo.email,
          Phone: demo.phone,
          "Course Category": demo.course_category,
          "Preferred Location": demo.preferred_location || "N/A",
          Comments: demo.comments || "N/A",
          "Verification Code": demo.verification_code || "N/A",
          "Registered At": new Date(demo.created_at).toLocaleString(),
        }));
        sheetName = "Demo Registrations";
        filename = "Demo_Registrations";
        break;
    }

    const ws = XLSX.utils.json_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const timestamp = new Date().toISOString().split("T")[0];
    const fullFilename = `${filename}_${timestamp}.xlsx`;

    XLSX.writeFile(wb, fullFilename);

    return {
      success: true,
      filename: fullFilename,
      count: wsData.length,
    };
  } catch (error) {
    console.error(`Error exporting ${formType} to Excel:`, error);
    throw new Error(
      `Failed to export ${formType}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

// Clear all data from Supabase (admin only)
export const clearAllFormData = async () => {
  if (!checkSupabaseConfig()) {
    throw new Error(
      "Supabase not configured. Please set up database connection.",
    );
  }

  try {
    // Delete all data from all tables
    const [
      { error: contactsError },
      { error: enrollmentsError },
      { error: brochureError },
      { error: demoError },
    ] = await Promise.all([
      supabase
        .from("contacts")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"),
      supabase
        .from("enrollments")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"),
      supabase
        .from("brochure_downloads")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"),
      supabase
        .from("demo_registrations")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"),
    ]);

    if (contactsError) throw contactsError;
    if (enrollmentsError) throw enrollmentsError;
    if (brochureError) throw brochureError;
    if (demoError) throw demoError;

    return { success: true };
  } catch (error) {
    console.error("Error clearing all data:", error);
    throw new Error(
      `Failed to clear data: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};
