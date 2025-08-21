# Admin Access Instructions

## For Administrators Only

This document contains sensitive information for accessing the admin dashboard. Do not share with unauthorized users.

### Method 1: Hidden Key Combination
1. On any page of the website, press and hold: `Ctrl + Shift`
2. While holding, type: `A D M I N`
3. A red "Admin Access" button will appear in the bottom-right corner for 10 seconds
4. Click the button to access the admin panel
5. Use password: `azorix2024`

### Method 2: URL Parameter Access
1. Add the following parameter to any URL on the site:
   ```
   ?admin_access=azorix_admin_2024
   ```
   Example: `https://yoursite.com/?admin_access=azorix_admin_2024`
2. You will be automatically redirected to the admin login page
3. Use password: `azorix2024`

### Method 3: Direct URL Access
1. Navigate directly to: `https://yoursite.com/admin`
2. Use password: `azorix2024`

## Admin Dashboard Features

- **Form Statistics**: View submission counts for all forms
- **Excel Export**: Export individual or combined form data
- **Data Management**: Clear stored data (use with caution)

## Security Notes

- The admin dashboard is password protected
- Form data is stored locally in browser localStorage
- No admin links are visible to regular users
- Admin access methods are hidden from public view

## Production Deployment

For production deployment:
1. Change the password in `client/pages/Admin.tsx` (line 9)
2. Update the secret key in `client/components/URLAdminAccess.tsx` (line 11)
3. Consider removing or changing the key combination in `HiddenAdminAccess.tsx`
4. Delete this file or store it securely
