import { RequestHandler } from "express";
import { google } from 'googleapis';

// Google Sheets API configuration
const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: process.env.GOOGLE_SPREADSHEET_ID || '',
  // These would come from environment variables in production
  CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL || '',
  PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  SHEETS: {
    CONTACT: 'Contact Forms',
    ENROLL: 'Enrollment Forms',
    BROCHURE: 'Brochure Downloads'
  }
};

// Initialize Google Sheets API
const getGoogleSheetsInstance = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SHEETS_CONFIG.CLIENT_EMAIL,
      private_key: GOOGLE_SHEETS_CONFIG.PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

// Function to append data to Google Sheets
const appendToSheet = async (sheetName: string, values: any[]) => {
  try {
    if (!GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID) {
      throw new Error('Google Sheets not configured');
    }

    const sheets = getGoogleSheetsInstance();
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    throw error;
  }
};

// Main handler for Google Sheets API requests
export const handleGoogleSheetsSubmission: RequestHandler = async (req, res) => {
  try {
    const { formType, data } = req.body;

    if (!formType || !data) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing formType or data' 
      });
    }

    let sheetName: string;
    let values: any[] = [];

    // Prepare data based on form type
    switch (formType) {
      case 'contact':
        sheetName = GOOGLE_SHEETS_CONFIG.SHEETS.CONTACT;
        values = [
          data.name || '',
          data.email || '',
          data.phone || '',
          data.subject || '',
          data.inquiryType || '',
          data.message || '',
          data.submittedAt || new Date().toISOString()
        ];
        break;

      case 'enroll':
        sheetName = GOOGLE_SHEETS_CONFIG.SHEETS.ENROLL;
        values = [
          data.firstName || '',
          data.lastName || '',
          data.email || '',
          data.phone || '',
          data.education || '',
          data.branch || '',
          data.graduationYear || '',
          data.experience || '',
          data.currentRole || '',
          data.company || '',
          data.course || '',
          data.preferredMode || '',
          data.previousExperience || '',
          data.motivation || '',
          data.hearAboutUs || '',
          data.agreeTerms ? 'Yes' : 'No',
          data.agreeMarketing ? 'Yes' : 'No',
          data.submittedAt || new Date().toISOString()
        ];
        break;

      case 'brochure':
        sheetName = GOOGLE_SHEETS_CONFIG.SHEETS.BROCHURE;
        values = [
          data.name || '',
          data.email || '',
          data.phone || '',
          data.background || '',
          data.submittedAt || new Date().toISOString()
        ];
        break;

      default:
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid form type' 
        });
    }

    // Append to Google Sheets
    await appendToSheet(sheetName, values);

    res.json({ 
      success: true, 
      message: 'Data successfully added to Google Sheets',
      sheetName,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Google Sheets API error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to add data to Google Sheets'
    });
  }
};

// Handler to get configuration status
export const handleGoogleSheetsConfig: RequestHandler = (req, res) => {
  const isConfigured = !!(
    GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID &&
    GOOGLE_SHEETS_CONFIG.CLIENT_EMAIL &&
    GOOGLE_SHEETS_CONFIG.PRIVATE_KEY
  );

  res.json({
    configured: isConfigured,
    spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID ? 'Configured' : 'Not configured',
    message: isConfigured 
      ? 'Google Sheets API is properly configured'
      : 'Google Sheets API requires environment variables: GOOGLE_SPREADSHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY'
  });
};

// Handler to create headers in Google Sheets
export const handleCreateHeaders: RequestHandler = async (req, res) => {
  try {
    if (!GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID) {
      return res.status(400).json({ 
        success: false, 
        error: 'Google Sheets not configured' 
      });
    }

    const sheets = getGoogleSheetsInstance();

    // Define headers for each sheet
    const headers = {
      [GOOGLE_SHEETS_CONFIG.SHEETS.CONTACT]: [
        'Name', 'Email', 'Phone', 'Subject', 'Inquiry Type', 'Message', 'Submitted At'
      ],
      [GOOGLE_SHEETS_CONFIG.SHEETS.ENROLL]: [
        'First Name', 'Last Name', 'Email', 'Phone', 'Education', 'Branch', 
        'Graduation Year', 'Experience', 'Current Role', 'Company', 'Course',
        'Preferred Mode', 'Previous Experience', 'Motivation', 'How Did You Hear',
        'Terms Agreed', 'Marketing Consent', 'Submitted At'
      ],
      [GOOGLE_SHEETS_CONFIG.SHEETS.BROCHURE]: [
        'Name', 'Email', 'Phone', 'Background', 'Submitted At'
      ]
    };

    // Add headers to each sheet
    for (const [sheetName, headerRow] of Object.entries(headers)) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
        range: `${sheetName}!A1:Z1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headerRow],
        },
      });
    }

    res.json({ 
      success: true, 
      message: 'Headers created successfully in all sheets',
      sheets: Object.keys(headers)
    });

  } catch (error: any) {
    console.error('Error creating headers:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to create headers'
    });
  }
};
