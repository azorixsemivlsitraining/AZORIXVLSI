/**
 * Google Apps Script for Azorix VLSI Form Submissions
 *
 * Instructions:
 * 1. Create a new Google Sheets document named "Azorix VLSI Form Submissions"
 * 2. Create three sheets: "Contact Forms", "Enrollment Forms", "Brochure Downloads"
 * 3. Add the headers as specified below
 * 4. Go to Extensions → Apps Script
 * 5. Replace the default code with this script
 * 6. Save and deploy as a web app with "Anyone" access
 * 7. Copy the web app URL and update GOOGLE_SHEETS_CONFIG in googleSheetsService.ts
 */

// Replace with your actual spreadsheet ID
const SPREADSHEET_ID = "1iiyoosyyLFBt0C6ZlTkwxG_wc2ZHbl21PUsfz9WgJZ4";

// Sheet names
const SHEETS = {
  CONTACT: "Contact Forms",
  ENROLL: "Enrollment Forms",
  BROCHURE: "Brochure Downloads",
};

// Headers for each sheet
const HEADERS = {
  [SHEETS.CONTACT]: [
    "Name",
    "Email",
    "Phone",
    "Subject",
    "Inquiry Type",
    "Message",
    "Submitted At",
  ],
  [SHEETS.ENROLL]: [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Education",
    "Branch",
    "Graduation Year",
    "Experience",
    "Current Role",
    "Company",
    "Course",
    "Preferred Mode",
    "Previous Experience",
    "Motivation",
    "How Did You Hear",
    "Terms Agreed",
    "Marketing Consent",
    "Submitted At",
  ],
  [SHEETS.BROCHURE]: ["Name", "Email", "Phone", "Background", "Submitted At"],
};

/**
 * Initialize the spreadsheet with headers
 * Run this function once to set up your sheets
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
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#4285f4");
      headerRange.setFontColor("#ffffff");

      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
    });

    Logger.log("Sheets initialized successfully!");
    return { success: true, message: "Sheets initialized successfully!" };
  } catch (error) {
    Logger.log("Error initializing sheets: " + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Handle POST requests from the website forms
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    const formData = data.data;

    Logger.log("Received form submission: " + formType);
    Logger.log("Form data: " + JSON.stringify(formData));

    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet;
    let values = [];

    // Prepare data based on form type
    switch (formType) {
      case "contact":
        sheet = ss.getSheetByName(SHEETS.CONTACT);
        values = [
          formData.name || "",
          formData.email || "",
          formData.phone || "",
          formData.subject || "",
          formData.inquiryType || "",
          formData.message || "",
          formData.submittedAt || new Date().toISOString(),
        ];
        break;

      case "enroll":
        sheet = ss.getSheetByName(SHEETS.ENROLL);
        values = [
          formData.firstName || "",
          formData.lastName || "",
          formData.email || "",
          formData.phone || "",
          formData.education || "",
          formData.branch || "",
          formData.graduationYear || "",
          formData.experience || "",
          formData.currentRole || "",
          formData.company || "",
          formData.course || "",
          formData.preferredMode || "",
          formData.previousExperience || "",
          formData.motivation || "",
          formData.hearAboutUs || "",
          formData.agreeTerms ? "Yes" : "No",
          formData.agreeMarketing ? "Yes" : "No",
          formData.submittedAt || new Date().toISOString(),
        ];
        break;

      case "brochure":
        sheet = ss.getSheetByName(SHEETS.BROCHURE);
        values = [
          formData.name || "",
          formData.email || "",
          formData.phone || "",
          formData.background || "",
          formData.submittedAt || new Date().toISOString(),
        ];
        break;

      default:
        throw new Error("Invalid form type: " + formType);
    }

    // Add the data to the sheet
    if (sheet && values.length > 0) {
      sheet.appendRow(values);

      // Log successful submission
      Logger.log("Data added successfully to " + sheet.getName());

      return ContentService.createTextOutput(
        JSON.stringify({
          success: true,
          message: "Data added successfully",
          sheet: sheet.getName(),
          timestamp: new Date().toISOString(),
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error("Sheet not found or no data to add");
    }
  } catch (error) {
    Logger.log("Error processing form submission: " + error.toString());

    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests for testing
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheets = ss.getSheets().map((sheet) => ({
      name: sheet.getName(),
      rows: sheet.getLastRow(),
      columns: sheet.getLastColumn(),
    }));

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Google Apps Script is working!",
        spreadsheetId: SPREADSHEET_ID,
        sheets: sheets,
        timestamp: new Date().toISOString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get statistics about form submissions
 */
function getFormStatistics() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    const stats = {
      contact: 0,
      enroll: 0,
      brochure: 0,
      total: 0,
    };

    // Count rows in each sheet (minus header row)
    const contactSheet = ss.getSheetByName(SHEETS.CONTACT);
    if (contactSheet) {
      stats.contact = Math.max(0, contactSheet.getLastRow() - 1);
    }

    const enrollSheet = ss.getSheetByName(SHEETS.ENROLL);
    if (enrollSheet) {
      stats.enroll = Math.max(0, enrollSheet.getLastRow() - 1);
    }

    const brochureSheet = ss.getSheetByName(SHEETS.BROCHURE);
    if (brochureSheet) {
      stats.brochure = Math.max(0, brochureSheet.getLastRow() - 1);
    }

    stats.total = stats.contact + stats.enroll + stats.brochure;

    Logger.log("Form statistics: " + JSON.stringify(stats));
    return stats;
  } catch (error) {
    Logger.log("Error getting statistics: " + error.toString());
    return { error: error.toString() };
  }
}

/**
 * Test function to simulate form submissions
 */
function testFormSubmission() {
  // Test contact form
  const testContactData = {
    formType: "contact",
    data: {
      name: "Test User",
      email: "test@example.com",
      phone: "+91 9876543210",
      subject: "Test Subject",
      inquiryType: "course-info",
      message: "This is a test message",
      submittedAt: new Date().toISOString(),
    },
  };

  // Simulate POST request
  const testEvent = {
    postData: {
      contents: JSON.stringify(testContactData),
    },
  };

  const result = doPost(testEvent);
  Logger.log("Test result: " + result.getContent());
}
