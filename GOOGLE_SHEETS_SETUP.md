# Google Sheets Excel Setup for Order Storage

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://docs.google.com/spreadsheets/)
2. Click **"+ Create"** → **"Blank spreadsheet"**
3. Name it: **"Invitation App Orders"**
4. Create column headers in Row 1:
   - A1: `Timestamp`
   - B1: `Template`
   - C1: `Name`
   - D1: `Email`
   - E1: `Phone`
   - F1: `Event`
   - G1: `Date`
   - H1: `Venue`
   - I1: `Custom Idea`
   - J1: `Additional Request`
   - K1: `Order Source`

## Step 2: Create Google Apps Script

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Delete the default code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add timestamp
    data.submittedAt = new Date().toLocaleString();
    
    // Prepare row data
    const row = [
      data.submittedAt,
      data.template,
      data.name,
      data.email,
      data.phone,
      data.event,
      data.date,
      data.venue,
      data.customIdea || "",
      data.additionalRequest || "",
      data.orderSource
    ];
    
    // Append row to sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Order received" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Save the script (Ctrl+S)
5. Name it: **"Order Handler"**

## Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the **gear icon** → Select **Web app**
3. Set these options:
   - **Execute as**: Your Google account
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the deployment URL** - you'll need this!

Example URL looks like:
```
https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j/userweb
```

## Step 4: Update the App Code

In your React app (App.js), find this line around line 415:

```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb?e=no_cache";
```

Replace `YOUR_SCRIPT_ID` with your actual deployment URL:

```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j/userweb";
```

## Step 5: Test the Order Submission

1. Go to your app: http://localhost:3001
2. Fill out the order form with test data
3. Click "Place Order"
4. Select "Submit from Website"
5. Check your Google Sheet - the order should appear!

## What Happens When an Order is Submitted

```
User fills form
   ↓
Clicks "Place Order"
   ↓
Form validates all fields
   ↓
Modal shows: Instagram DM or Website Submit
   ↓
User clicks "Submit from Website"
   ↓
Order data sent to Google Apps Script
   ↓
Script receives data and stores in Google Sheet
   ↓
Confirmation message shows: "Order Submitted Successfully!"
   ↓
Form resets for next order
   ↓
Google Sheet automatically populated with:
  - Timestamp
  - All order details
  - Customer info
```

## Order Data Stored

Each order in the Google Sheet includes:
- **Timestamp**: When order was submitted
- **Template**: Selected invitation template
- **Name**: Customer name
- **Email**: Customer email
- **Phone**: Customer phone (10 digits)
- **Event**: Type of event
- **Date**: Event date
- **Venue**: Event location
- **Custom Idea**: Custom template description (if applicable)
- **Additional Request**: Extra notes from customer
- **Order Source**: "website" (for website orders)

## Troubleshooting

### If orders aren't appearing:

1. **Check deployment status**:
   - Go back to Apps Script
   - Click **Deploy** → **Manage deployments**
   - Make sure it says "Web app" and is active

2. **Check sheet structure**:
   - Verify columns A1-K1 have the correct headers
   - Make sure sheet is named "Sheet1" or note the actual name

3. **Check permissions**:
   - Sheet must be accessible to "Anyone" (or the Google account)
   - Apps Script deployment must be set to "Anyone can access"

4. **Test the webhook**:
   - Use Postman or curl to test the URL:
   ```bash
   curl -X POST https://your-deployment-url \
     -H "Content-Type: application/json" \
     -d '{"template":"Wedding","name":"Test","email":"test@example.com"}'
   ```

### If you see errors in browser console:

Check the Apps Script execution logs:
1. Go to Apps Script
2. Click **Executions** (left sidebar)
3. Look for error messages
4. Fix any issues in the script

## Alternative: Use Form Submission Service

Instead of Apps Script, you can also use:
- **FormSubmit.co** - Free form-to-email service
- **Formspree** - Simple form handling
- **Basin** - Form data to email or webhook

Just update the GOOGLE_SCRIPT_URL in the code to the alternative service URL.

---

**Status**: Ready for order collection and storage!
