# Google Sheets Real-Time Integration Setup Guide

## Overview
This integration automatically sends all form submissions (Contact, Enrollment, Brochure) to a single Google Sheets file with three separate sheets. No manual exports needed - everything syncs in real-time!

## 🎯 What You'll Get
- ✅ **Single Google Sheets file** with three organized sheets
- ✅ **Automatic real-time sync** when forms are submitted
- ✅ **No manual exports** needed from admin dashboard
- ✅ **Instant access** to all form data
- ✅ **Professional organization** with proper headers

## 📋 Step-by-Step Setup

### STEP 1: Create Your Google Sheets Document

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "+" to create a new spreadsheet
3. Name it: **"Azorix VLSI Form Submissions"**
4. Create three sheets with these exact names:
   - `Contact Forms`
   - `Enrollment Forms`
   - `Brochure Downloads`

### STEP 2: Set Up Google Apps Script

1. In your spreadsheet, click **Extensions → Apps Script**
2. Delete the default `myFunction()` code
3. Copy and paste the code from `GOOGLE_APPS_SCRIPT.js`
4. **IMPORTANT:** Replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
   - Find your ID in the URL: `docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
5. Save the script (Ctrl+S)

### STEP 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Type"
3. Select **Web app**
4. Set the following:
   - **Description:** "Azorix Form Handler"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
5. Click **Deploy**
6. **Copy the Web app URL** - you'll need this!

### STEP 4: Initialize Your Sheets

1. In the Apps Script editor, click **Run → initializeSheets**
2. Grant the necessary permissions when prompted
3. Check your spreadsheet - it should now have proper headers in all three sheets

### STEP 5: Update Website Configuration

1. Open `client/lib/googleSheetsService.ts`
2. Update the configuration:
   ```typescript
   export const GOOGLE_SHEETS_CONFIG = {
     SPREADSHEET_ID: 'YOUR_ACTUAL_SPREADSHEET_ID',
     WEB_APP_URL: 'YOUR_ACTUAL_WEB_APP_URL'
   };
   ```

### STEP 6: Test the Integration

1. Submit a test form on your website
2. Check your Google Sheets - the data should appear automatically!
3. If it doesn't work, check the Apps Script logs for errors

## 📊 Sheet Structure

### Contact Forms Sheet
| Name | Email | Phone | Subject | Inquiry Type | Message | Submitted At |
|------|-------|-------|---------|--------------|---------|--------------|

### Enrollment Forms Sheet
| First Name | Last Name | Email | Phone | Education | Branch | Graduation Year | Experience | Current Role | Company | Course | Preferred Mode | Previous Experience | Motivation | How Did You Hear | Terms Agreed | Marketing Consent | Submitted At |
|------------|-----------|-------|-------|-----------|--------|-----------------|------------|---------------|---------|--------|----------------|-------------------|------------|------------------|--------------|-------------------|--------------|

### Brochure Downloads Sheet
| Name | Email | Phone | Background | Submitted At |
|------|-------|-------|------------|--------------|

## 🔧 Advanced Configuration

### Method 1: Google Apps Script (Recommended)
- ✅ No backend server required
- ✅ Free and reliable
- ✅ Easy to set up
- ✅ Works with any hosting

### Method 2: Backend API Integration
- Requires Google Sheets API credentials
- More secure but complex setup
- Needs server-side implementation

## 🎉 After Setup

Once configured, your integration will:

1. **Automatically receive** all form submissions
2. **Organize data** into appropriate sheets
3. **Include timestamps** for each submission
4. **Work in real-time** without manual intervention
5. **Provide instant access** to all form data

## 🛠️ Troubleshooting

### Forms not appearing in sheets?
1. Check the web app URL is correct
2. Verify spreadsheet ID is accurate
3. Ensure deployment has "Anyone" access
4. Check Apps Script execution log for errors

### Getting permission errors?
1. Re-run the `initializeSheets` function
2. Grant all requested permissions
3. Make sure you own the spreadsheet

### Data appearing in wrong format?
1. Check that sheet names exactly match the configuration
2. Verify the headers are in the correct order
3. Re-run `initializeSheets` to reset headers

## 📞 Support

If you need help with setup:
1. Check the Apps Script execution log for errors
2. Test with the `testFormSubmission()` function
3. Verify all URLs and IDs are correct

## 🔐 Security Notes

- The web app URL is public but only accepts form data
- No sensitive information is exposed
- Data is only written to your private spreadsheet
- You maintain full control over the Google Sheets document

---

**Result:** All form submissions will automatically appear in your Google Sheets in real-time! 🎯
