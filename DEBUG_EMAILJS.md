# Debugging EmailJS - Step by Step Guide

## ✅ Step 1: Check if .env.local exists and has correct values

```bash
# In your terminal, run:
cat .env.local
```

You should see:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

**Important:** 
- Make sure there are NO quotes around the values
- Make sure there are NO spaces around the `=` sign
- Values should start with `service_`, `template_`, and your public key

## ✅ Step 2: Restart Your Dev Server

After creating/editing `.env.local`, you MUST restart:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

**Next.js only reads .env files on startup!**

## ✅ Step 3: Check Browser Console

1. Open your portfolio in browser
2. Open Developer Tools (F12 or Cmd+Option+I)
3. Go to Console tab
4. Submit the contact form
5. Look for:
   - `Sending email with EmailJS...` - Shows your IDs
   - `EmailJS Response:` - Shows if it succeeded
   - Any red error messages

## ✅ Step 4: Verify EmailJS Setup

### A. Check Service ID Format
- Should look like: `service_abc123`
- Found in: EmailJS Dashboard > Email Services

### B. Check Template ID Format  
- Should look like: `template_xyz789`
- Found in: EmailJS Dashboard > Email Templates

### C. Check Public Key
- Should be a long string (not starting with service_ or template_)
- Found in: EmailJS Dashboard > Account > General > API Keys

### D. Verify Email Service is Connected
1. Go to EmailJS Dashboard > Email Services
2. Make sure your service shows "Connected" status
3. If not connected, reconnect it

### E. Check Email Template Variables
Your template should use these variable names:
- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`
- `{{to_name}}`
- `{{reply_to}}`

## ✅ Step 5: Test EmailJS Directly

1. Go to EmailJS Dashboard > Email Templates
2. Click on your template
3. Click "Test" button
4. Fill in test values and send
5. Check if you receive the test email

If test email works but form doesn't → Check environment variables
If test email doesn't work → Check Email Service connection

## ✅ Step 6: Common Issues & Fixes

### Issue: "EmailJS not configured" warning
**Fix:** Make sure `.env.local` exists (not just `.env.local.example`)

### Issue: "Failed to send message" error
**Possible causes:**
1. Service not connected → Reconnect in EmailJS dashboard
2. Wrong template variables → Check template uses correct variable names
3. Rate limit exceeded → Free tier is 200/month
4. CORS error → Check EmailJS allowed domains

### Issue: Success message but no email
**Possible causes:**
1. Email went to spam folder → Check spam/junk
2. Wrong recipient email in service → Check Email Service settings
3. EmailJS quota exceeded → Check usage in dashboard

## ✅ Step 7: Enable Detailed Logging

The form now logs to console. Check browser console for:
- Service ID and Template ID being used
- EmailJS response status
- Any error details

## 🔧 Quick Test

1. Open browser console (F12)
2. Submit form
3. Check console for:
   ```
   Sending email with EmailJS... { serviceId: 'service_xxx', templateId: 'template_xxx' }
   EmailJS Response: { status: 200, text: 'OK' }
   ```

If you see status 200 → Email was sent successfully (check spam folder!)
If you see an error → Check the error message for details

