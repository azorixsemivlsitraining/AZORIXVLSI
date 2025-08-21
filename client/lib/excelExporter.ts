import * as XLSX from "xlsx";

// Interface definitions for form data
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
  submittedAt?: string;
}

export interface EnrollFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  education: string;
  branch: string;
  graduationYear: string;
  experience: string;
  currentRole: string;
  company: string;
  course: string;
  preferredMode: string;
  previousExperience: string;
  motivation: string;
  hearAboutUs: string;
  agreeTerms: boolean;
  agreeMarketing: boolean;
  submittedAt?: string;
}

export interface BrochureFormData {
  name: string;
  email: string;
  phone: string;
  background: string;
  submittedAt?: string;
}

export interface DemoRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseCategory: string;
  preferredLocation: string;
  comments: string;
  submittedAt?: string;
}

// Storage keys for localStorage
const STORAGE_KEYS = {
  CONTACT: "azorix_contact_submissions",
  ENROLL: "azorix_enroll_submissions",
  BROCHURE: "azorix_brochure_submissions",
  DEMO: "azorix_demo_registrations",
};

// Save form data to localStorage
export const saveContactToStorage = (data: ContactFormData) => {
  const submissionData = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  const existing = getStoredData(STORAGE_KEYS.CONTACT) || [];
  existing.push(submissionData);
  localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(existing));
};

export const saveEnrollToStorage = (data: EnrollFormData) => {
  const submissionData = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  const existing = getStoredData(STORAGE_KEYS.ENROLL) || [];
  existing.push(submissionData);
  localStorage.setItem(STORAGE_KEYS.ENROLL, JSON.stringify(existing));
};

export const saveBrochureToStorage = (data: BrochureFormData) => {
  const submissionData = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  const existing = getStoredData(STORAGE_KEYS.BROCHURE) || [];
  existing.push(submissionData);
  localStorage.setItem(STORAGE_KEYS.BROCHURE, JSON.stringify(existing));
};

export const saveDemoToStorage = (data: DemoRegistrationData) => {
  const submissionData = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  const existing = getStoredData(STORAGE_KEYS.DEMO) || [];
  existing.push(submissionData);
  localStorage.setItem(STORAGE_KEYS.DEMO, JSON.stringify(existing));
};

// Get stored data from localStorage
const getStoredData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

// Export all form data to Excel
export const exportAllFormsToExcel = () => {
  const contactData = getStoredData(STORAGE_KEYS.CONTACT);
  const enrollData = getStoredData(STORAGE_KEYS.ENROLL);
  const brochureData = getStoredData(STORAGE_KEYS.BROCHURE);
  const demoData = getStoredData(STORAGE_KEYS.DEMO);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create Contact sheet
  if (contactData.length > 0) {
    const contactSheet = XLSX.utils.json_to_sheet(contactData);
    XLSX.utils.book_append_sheet(workbook, contactSheet, "Contact Forms");
  }

  // Create Enrollment sheet
  if (enrollData.length > 0) {
    const enrollSheet = XLSX.utils.json_to_sheet(enrollData);
    XLSX.utils.book_append_sheet(workbook, enrollSheet, "Enrollment Forms");
  }

  // Create Brochure sheet
  if (brochureData.length > 0) {
    const brochureSheet = XLSX.utils.json_to_sheet(brochureData);
    XLSX.utils.book_append_sheet(workbook, brochureSheet, "Brochure Downloads");
  }

  // Create Demo Registrations sheet
  if (demoData.length > 0) {
    const demoSheet = XLSX.utils.json_to_sheet(demoData);
    XLSX.utils.book_append_sheet(workbook, demoSheet, "Demo Registrations");
  }

  // Generate Excel file and download
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `Azorix_Form_Submissions_${timestamp}.xlsx`;

  XLSX.writeFile(workbook, filename);

  return {
    contactCount: contactData.length,
    enrollCount: enrollData.length,
    brochureCount: brochureData.length,
    demoCount: demoData.length,
    filename,
  };
};

// Export individual form data
export const exportContactFormsToExcel = () => {
  const data = getStoredData(STORAGE_KEYS.CONTACT);
  if (data.length === 0) {
    alert("No contact form submissions found to export.");
    return;
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Forms");

  const timestamp = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `Azorix_Contact_Forms_${timestamp}.xlsx`);
};

export const exportEnrollFormsToExcel = () => {
  const data = getStoredData(STORAGE_KEYS.ENROLL);
  if (data.length === 0) {
    alert("No enrollment form submissions found to export.");
    return;
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Enrollment Forms");

  const timestamp = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `Azorix_Enrollment_Forms_${timestamp}.xlsx`);
};

export const exportBrochureFormsToExcel = () => {
  const data = getStoredData(STORAGE_KEYS.BROCHURE);
  if (data.length === 0) {
    alert("No brochure download submissions found to export.");
    return;
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Brochure Downloads");

  const timestamp = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `Azorix_Brochure_Downloads_${timestamp}.xlsx`);
};

export const exportDemoFormsToExcel = () => {
  const data = getStoredData(STORAGE_KEYS.DEMO);
  if (data.length === 0) {
    alert("No demo registration submissions found to export.");
    return;
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Demo Registrations");

  const timestamp = new Date().toISOString().split("T")[0];
  XLSX.writeFile(workbook, `Azorix_Demo_Registrations_${timestamp}.xlsx`);
};

// Clear all stored data (admin function)
export const clearAllStoredData = () => {
  localStorage.removeItem(STORAGE_KEYS.CONTACT);
  localStorage.removeItem(STORAGE_KEYS.ENROLL);
  localStorage.removeItem(STORAGE_KEYS.BROCHURE);
  localStorage.removeItem(STORAGE_KEYS.DEMO);
};

// Get statistics about stored data
export const getStorageStatistics = () => {
  return {
    contact: getStoredData(STORAGE_KEYS.CONTACT).length,
    enroll: getStoredData(STORAGE_KEYS.ENROLL).length,
    brochure: getStoredData(STORAGE_KEYS.BROCHURE).length,
    demo: getStoredData(STORAGE_KEYS.DEMO).length,
  };
};
