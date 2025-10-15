/**
 * Google Apps Script for Azorix VLSI Form Submissions
 * COPY THIS ENTIRE CODE AND PASTE IT IN YOUR APPS SCRIPT EDITOR
 */

// STEP 1: Replace YOUR_SPREADSHEET_ID_HERE with your actual spreadsheet ID
// Find your spreadsheet ID in the URL: docs.google.com/spreadsheets/d/[THIS_IS_YOUR_ID]/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Sheet names - these must match exactly
const SHEETS = {
  CONTACT: 'Contact Forms',
  ENROLL: 'Enrollment Forms',
  BROCHURE: 'Brochure Downloads'
};

// Headers for each sheet
const HEADERS = {
  [SHEETS.CONTACT]: [
    'Name', 'Email', 'Phone', 'Subject', 'Inquiry Type', 'Message', 'Submitted At'
  ],
  [SHEETS.ENROLL]: [
    'First Name', 'Last Name', 'Email', 'Phone', 'Education', 'Branch',
    'Graduation Year', 'Experience', 'Current Role', 'Company', 'Course',
    'Preferred Mode', 'Previous Experience', 'Motivation', 'How Did You Hear',
    'Terms Agreed', 'Marketing Consent', 'Submitted At'
  ],
  [SHEETS.BROCHURE]: [
    'Name', 'Email', 'Phone', 'Background', 'Submitted At'
  ]
};

/**
 * Initialize the spreadsheet with headers
 * RUN THIS FUNCTION FIRST to set up your sheets
 */
function initializeSheets() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Create and set up each sheet
    Object.entries(HEADERS).forEach(([sheetName, headers]) => {
      let sheet = ss.getSheetByName(sheetName);
      
      // Create sheet if it doesn't exist
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
      }
      
      // Clear existing content and add headers
      sheet.clear();
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      
      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
    });
    
    Logger.log('Sheets initialized successfully!');
    return { success: true, message: 'Sheets initialized successfully!' };
    
  } catch (error) {
    Logger.log('Error initializing sheets: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Handle POST requests from website forms - THIS IS THE MAIN FUNCTION
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    const formData = data.data;
    
    Logger.log('Received form submission: ' + formType);
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet;
    let values = [];
    
    // Prepare data based on form type
    switch(formType) {
      case 'contact':
        sheet = ss.getSheetByName(SHEETS.CONTACT);
        values = [
          formData.name || '',
          formData.email || '',
          formData.phone || '',
          formData.subject || '',
          formData.inquiryType || '',
          formData.message || '',
          formData.submittedAt || new Date().toISOString()
        ];
        break;
        
      case 'enroll':
        sheet = ss.getSheetByName(SHEETS.ENROLL);
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
          formData.submittedAt || new Date().toISOString()
        ];
        break;
        
      case 'brochure':
        sheet = ss.getSheetByName(SHEETS.BROCHURE);
        values = [
          formData.name || '',
          formData.email || '',
          formData.phone || '',
          formData.background || '',
          formData.submittedAt || new Date().toISOString()
        ];
        break;
        
      default:
        throw new Error('Invalid form type: ' + formType);
    }
    
    // Add the data to the sheet
    if (sheet && values.length > 0) {
      sheet.appendRow(values);
      Logger.log('Data added successfully to ' + sheet.getName());
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Data added successfully',
          sheet: sheet.getName(),
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error('Sheet not found or no data to add');
    }
    
  } catch (error) {
    Logger.log('Error processing form submission: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - run this to test the integration
 */
function testFormSubmission() {
  const testData = {
    formType: 'contact',
    data: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+91 9052653636',
      subject: 'Test Subject',
      inquiryType: 'course-info',
      message: 'This is a test message',
      submittedAt: new Date().toISOString()
    }
  };
  
  const testEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(testEvent);
  Logger.log('Test result: ' + result.getContent());
}
