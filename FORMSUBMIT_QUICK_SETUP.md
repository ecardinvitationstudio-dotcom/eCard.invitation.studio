# Quick Setup: FormSubmit.co (No Google Account Needed!)

## Easiest Option - FormSubmit.co

FormSubmit.co is the simplest - it works immediately with just one email address!

### How It Works

```
User submits form
   ↓
Data sent to FormSubmit endpoint
   ↓
Email received at: ecard.invitation.studio@gmail.com
   ↓
Data also stored in FormSubmit dashboard
   ↓
Can view submissions online
```

### Setup (2 minutes)

1. Replace the `handleWebsiteOrderSubmit` function in App.js with this:

```javascript
// Handle website order submission - uses FormSubmit.co
const handleWebsiteOrderSubmit = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append('email', 'ecard.invitation.studio@gmail.com'); // Reply to email
  formData.append('_subject', `New Order - ${selectedTemplate}`);
  formData.append('_captcha', 'false'); // No captcha
  formData.append('template', selectedTemplate === "Custom" ? `Custom - ${customIdea}` : selectedTemplate);
  formData.append('name', name);
  formData.append('email_customer', email);
  formData.append('phone', phone);
  formData.append('event', event);
  formData.append('date', date);
  formData.append('venue', venue);
  formData.append('customIdea', selectedTemplate === "Custom" ? customIdea : "");
  formData.append('additionalRequest', additionalRequest);
  formData.append('submittedAt', new Date().toLocaleString());

  try {
    const response = await fetch('https://formsubmit.co/ecard.invitation.studio@gmail.com', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      setOrderSubmitted(true);
      setOrderConfirmationMessage(`✅ Order Submitted Successfully!\n\nWe received your order for ${selectedTemplate}.\nOur team will contact you at ${email} within minutes.\n\nThank you for your order!`);

      // Reset form after 3 seconds
      setTimeout(() => {
        setOrderSubmitted(false);
        setName("");
        setEmail("");
        setPhone("");
        setEvent("");
        setDate(new Date().toISOString().split('T')[0]);
        setVenue("");
        setSelectedTemplate("");
        setCustomIdea("");
        setAdditionalRequest("");
        setValidationErrors({});
      }, 3000);
    } else {
      setOrderConfirmationMessage("❌ Error submitting order. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    setOrderConfirmationMessage("❌ Error submitting order. Please try again or contact us directly.");
  }
};
```

2. That's it! Orders will be emailed to: **ecard.invitation.studio@gmail.com**

3. Optionally view submissions at: https://formsubmit.co/

### What You Receive

When a customer submits an order, you'll get:

**Email Subject**: `New Order - Wedding Invitation`

**Email Body**:
```
email: ecard.invitation.studio@gmail.com
template: Wedding Invitation
name: John Doe
email_customer: john@example.com
phone: 9876543210
event: Wedding
date: 2026-06-15
venue: Grand Hotel
customIdea: 
additionalRequest: Add family photos
submittedAt: 4/23/2026, 2:45:30 PM
```

### Pros vs Cons

| Feature | FormSubmit.co | Google Sheets |
|---------|---------------|---------------|
| Setup time | 2 minutes | 10 minutes |
| Email notifications | ✅ Yes | ❌ No |
| Excel/Spreadsheet | ❌ No | ✅ Yes |
| Dashboard | ✅ Yes | ✅ Yes |
| Cost | Free | Free |
| Coding needed | No | Apps Script |

## Choose Your Setup

### Option A: Email Only (Recommended for Quick Start)
- Use FormSubmit.co
- Orders sent to your email
- No spreadsheet needed
- Immediate setup

### Option B: Email + Spreadsheet
- Use Google Sheets + Apps Script
- Orders stored in Excel-like spreadsheet
- Email notifications possible with automation
- More work to set up

### Option C: Custom Backend
- Build your own API
- Full control
- More complex

---

## Recommended: Start with FormSubmit.co

It's the quickest, requires no setup, and you immediately get:
- ✅ Email notifications for each order
- ✅ Online dashboard to view all orders
- ✅ Automatic email to customer
- ✅ Clean formatted emails

Then later, if needed, upgrade to Google Sheets with Apps Script for Excel export/analysis.
