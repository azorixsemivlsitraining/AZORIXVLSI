// Google Sheets API Service for Real-time Form Data Sync
// This service automatically sends form data to Google Sheets when forms are submitted

// Configuration - Replace with your actual Google Sheets details
export const GOOGLE_SHEETS_CONFIG = {
  // Replace with your Google Sheets ID (from the URL)
  SPREADSHEET_ID: "1iiyoosyyLFBt0C6ZlTkwxG_wc2ZHbl21PUsfz9WgJZ4",

  // Sheet names for different form types
  SHEETS: {
    CONTACT: "Contact Forms",
    ENROLL: "Enrollment Forms",
    BROCHURE: "Brochure Downloads",
  },

  // Google Apps Script Web App URL (for serverless integration)
  WEB_APP_URL:
    "https://script.google.com/macros/s/AKfycbzhSA7zGdfwMmwcvPc0gnshwCyUA0_O71G_8S0nioQ8qMsHuItHFc83FYTnH3PDFi14/exec",
};

// Interface definitions for form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
  submittedAt?: string;
}

interface EnrollFormData {
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

interface BrochureFormData {
  name: string;
  email: string;
  phone: string;
  background: string;
  submittedAt?: string;
}

// Function to send data to Google Sheets via Google Apps Script
export const sendToGoogleSheets = async (
  formType: "contact" | "enroll" | "brochure",
  data: ContactFormData | EnrollFormData | BrochureFormData,
): Promise<boolean> => {
  try {
    const payload = {
      formType,
      data: {
        ...data,
        submittedAt: new Date().toISOString(),
      },
    };

    const response = await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
      method: "POST",
      mode: "no-cors", // Google Apps Script requires this
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Note: With no-cors mode, we can't read the response
    // So we assume success if no error was thrown
    console.log("Data sent to Google Sheets successfully");
    return true;
  } catch (error) {
    console.error("Error sending data to Google Sheets:", error);
    return false;
  }
};

// Function to send contact form data
export const sendContactFormToSheets = async (
  data: ContactFormData,
): Promise<boolean> => {
  return sendToGoogleSheets("contact", data);
};

// Function to send enrollment form data
export const sendEnrollFormToSheets = async (
  data: EnrollFormData,
): Promise<boolean> => {
  return sendToGoogleSheets("enroll", data);
};

// Function to send brochure form data
export const sendBrochureFormToSheets = async (
  data: BrochureFormData,
): Promise<boolean> => {
  return sendToGoogleSheets("brochure", data);
};

// Alternative direct API approach (requires server-side implementation)
export const sendToGoogleSheetsAPI = async (
  formType: "contact" | "enroll" | "brochure",
  data: any,
): Promise<boolean> => {
  try {
    // This would require a backend service with Google Sheets API credentials
    const response = await fetch("/api/google-sheets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType,
        data: {
          ...data,
          submittedAt: new Date().toISOString(),
        },
      }),
    });

    if (response.ok) {
      console.log("Data sent to Google Sheets via API successfully");
      return true;
    } else {
      console.error("Failed to send data to Google Sheets via API");
      return false;
    }
  } catch (error) {
    console.error("Error sending data to Google Sheets API:", error);
    return false;
  }
};

// Function to create the Google Sheets template
export const createGoogleSheetsTemplate = () => {
  const templateUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/copy`;

  return {
    templateUrl,
    instructions: SETUP_INSTRUCTIONS,
    spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
    webAppUrl: GOOGLE_SHEETS_CONFIG.WEB_APP_URL,
  };
};

// Setup instructions for Google Sheets integration
export const SETUP_INSTRUCTIONS = `
GOOGLE SHEETS REAL-TIME INTEGRATION SETUP:

METHOD 1: Google Apps Script (Recommended - No Backend Required)

1. CREATE GOOGLE SHEETS:
   - Go to sheets.google.com
   - Create a new spreadsheet named "Azorix VLSI Form Submissions"
   - Create three sheets: "Contact Forms", "Enrollment Forms", "Brochure Downloads"

2. SET UP HEADERS:
   Contact Forms: Name, Email, Phone, Subject, Inquiry Type, Message, Submitted At
   Enrollment Forms: First Name, Last Name, Email, Phone, Education, Branch, Graduation Year, Experience, Current Role, Company, Course, Preferred Mode, Previous Experience, Motivation, How Did You Hear, Terms Agreed, Marketing Consent, Submitted At
   Brochure Downloads: Name, Email, Phone, Background, Submitted At

3. CREATE GOOGLE APPS SCRIPT:
   - In your Google Sheets, go to Extensions > Apps Script
   - Replace the default code with the script provided below
   - Save and deploy as a web app with "Anyone" access

4. UPDATE CONFIGURATION:
   - Copy your spreadsheet ID from the URL
   - Copy your web app URL after deployment
   - Update GOOGLE_SHEETS_CONFIG in this file

GOOGLE APPS SCRIPT CODE:
\`\`\`javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    const formData = data.data;
    
    const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    let sheet;
    let values = [];
    
    switch(formType) {
      case 'contact':
        sheet = ss.getSheetByName('Contact Forms');
        values = [
          formData.name || '',
          formData.email || '',
          formData.phone || '',
          formData.subject || '',
          formData.inquiryType || '',
          formData.message || '',
          formData.submittedAt || ''
        ];
        break;
        
      case 'enroll':
        sheet = ss.getSheetByName('Enrollment Forms');
        values = [
          formData.firstName || '',
          formData.lastName || '',
          formData.email || '',
          formData.phone || '',
          formData.education || '',
          formData.branch || '',
          formData.graduationYear || '',
          formData.experience || '',
          formData.currentRole || '',
          formData.company || '',
          formData.course || '',
          formData.preferredMode || '',
          formData.previousExperience || '',
          formData.motivation || '',
          formData.hearAboutUs || '',
          formData.agreeTerms ? 'Yes' : 'No',
          formData.agreeMarketing ? 'Yes' : 'No',
          formData.submittedAt || ''
        ];
        break;
        
      case 'brochure':
        sheet = ss.getSheetByName('Brochure Downloads');
        values = [
          formData.name || '',
          formData.email || '',
          formData.phone || '',
          formData.background || '',
          formData.submittedAt || ''
        ];
        break;
    }
    
    if (sheet && values.length > 0) {
      sheet.appendRow(values);
      return ContentService.createTextOutput(JSON.stringify({success: true}));
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Invalid form type'}));
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}));
  }
}
\`\`\`

METHOD 2: Backend API Integration (Advanced)
- Requires server-side implementation with Google Sheets API
- More secure but requires backend infrastructure
- Use sendToGoogleSheetsAPI function instead

CURRENT STATUS: Forms will automatically sync to Google Sheets when submitted!
`;

// Export the current configuration status
export const getConfigurationStatus = () => {
  const isConfigured =
    GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID !==
      "1ABC123DEF456GHI789JKL012MNO345PQR678STU90VWX" &&
    GOOGLE_SHEETS_CONFIG.WEB_APP_URL !==
      "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  return {
    configured: isConfigured,
    spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
    webAppUrl: GOOGLE_SHEETS_CONFIG.WEB_APP_URL,
    message: isConfigured
      ? "Google Sheets integration is configured and ready!"
      : "Please configure Google Sheets integration using the setup instructions.",
  };
};
