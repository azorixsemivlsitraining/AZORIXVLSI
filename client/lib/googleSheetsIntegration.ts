// Google Sheets Integration for Form Data
// This creates a shareable Google Sheets document with form submissions

export const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbzhSA7zGdfwMmwcvPc0gnshwCyUA0_O71G_8S0nioQ8qMsHuItHFc83FYTnH3PDFi14/exec';


// Function to create the Google Sheets link with pre-populated data
export const createGoogleSheetsLink = () => {
  // Get stored form data
  const contactData = getStoredData('azorix_contact_submissions') || [];
  const enrollData = getStoredData('azorix_enroll_submissions') || [];
  const brochureData = getStoredData('azorix_brochure_submissions') || [];

  // Create a shareable link that opens a Google Sheets template
  // This is a template that admins can copy and use
  const templateUrl = 'https://docs.google.com/spreadsheets/d/1-example-template-id/copy';
  
  return {
    templateUrl,
    contactCount: contactData.length,
    enrollCount: enrollData.length,
    brochureCount: brochureData.length,
    totalSubmissions: contactData.length + enrollData.length + brochureData.length
  };
};

// Function to export data in CSV format that can be imported to Google Sheets
export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    return null;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return csvContent;
};

// Function to export all form data as separate CSV files
export const exportAllFormsAsCSV = () => {
  const contactData = getStoredData('azorix_contact_submissions') || [];
  const enrollData = getStoredData('azorix_enroll_submissions') || [];
  const brochureData = getStoredData('azorix_brochure_submissions') || [];

  const timestamp = new Date().toISOString().split('T')[0];

  const results = {
    contact: null,
    enroll: null,
    brochure: null,
    success: false
  };

  if (contactData.length > 0) {
    results.contact = exportToCSV(contactData, `Contact_Forms_${timestamp}.csv`);
  }

  if (enrollData.length > 0) {
    results.enroll = exportToCSV(enrollData, `Enrollment_Forms_${timestamp}.csv`);
  }

  if (brochureData.length > 0) {
    results.brochure = exportToCSV(brochureData, `Brochure_Downloads_${timestamp}.csv`);
  }

  results.success = !!(results.contact || results.enroll || results.brochure);

  return results;
};

// Helper function to get stored data
const getStoredData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Function to create a Google Sheets compatible format
export const prepareDataForGoogleSheets = () => {
  const contactData = getStoredData('azorix_contact_submissions') || [];
  const enrollData = getStoredData('azorix_enroll_submissions') || [];
  const brochureData = getStoredData('azorix_brochure_submissions') || [];

  return {
    'Contact Forms': contactData.map(item => ({
      'Name': item.name || '',
      'Email': item.email || '',
      'Phone': item.phone || '',
      'Subject': item.subject || '',
      'Inquiry Type': item.inquiryType || '',
      'Message': item.message || '',
      'Submitted At': item.submittedAt ? new Date(item.submittedAt).toLocaleString() : ''
    })),
    'Enrollment Forms': enrollData.map(item => ({
      'First Name': item.firstName || '',
      'Last Name': item.lastName || '',
      'Email': item.email || '',
      'Phone': item.phone || '',
      'Education': item.education || '',
      'Branch': item.branch || '',
      'Graduation Year': item.graduationYear || '',
      'Experience': item.experience || '',
      'Current Role': item.currentRole || '',
      'Company': item.company || '',
      'Course': item.course || '',
      'Preferred Mode': item.preferredMode || '',
      'Previous Experience': item.previousExperience || '',
      'Motivation': item.motivation || '',
      'How Did You Hear': item.hearAboutUs || '',
      'Terms Agreed': item.agreeTerms ? 'Yes' : 'No',
      'Marketing Consent': item.agreeMarketing ? 'Yes' : 'No',
      'Submitted At': item.submittedAt ? new Date(item.submittedAt).toLocaleString() : ''
    })),
    'Brochure Downloads': brochureData.map(item => ({
      'Name': item.name || '',
      'Email': item.email || '',
      'Phone': item.phone || '',
      'Background': item.background || '',
      'Submitted At': item.submittedAt ? new Date(item.submittedAt).toLocaleString() : ''
    }))
  };
};

// Instructions for setting up Google Sheets integration
export const GOOGLE_SHEETS_SETUP_INSTRUCTIONS = `
Setup Instructions for Google Sheets Integration:

1. Create a new Google Sheets document
2. Create three sheets named: "Contact Forms", "Enrollment Forms", "Brochure Downloads"
3. Add appropriate headers to each sheet based on the form fields
4. Share the document with "Anyone with the link can edit"
5. Copy the sharing link and update GOOGLE_SHEETS_URL in this file

For automated integration, you would need:
- Google Sheets API credentials
- A backend service to handle the API calls
- Proper authentication and authorization

Current implementation provides CSV export functionality that can be manually imported to Google Sheets.
`;
