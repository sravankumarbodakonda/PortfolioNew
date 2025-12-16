# EmailJS Setup Guide

This guide will help you set up EmailJS (free service) to receive contact form submissions.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

## Step 2: Create Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions:
   - For Gmail: You'll need to enable "Less secure app access" or use App Password
   - Connect your email account
5. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Reply-To: {{reply_to}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** > **General** > **API Keys**
2. Copy your **Public Key** (e.g., `abcdefghijklmnop`)

## Step 5: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your values:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. Replace the placeholder values with your actual IDs and keys

## Step 6: Test the Form

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Fill out the contact form on your portfolio
3. Submit the form
4. Check your email inbox for the message

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Email not received**: Verify EmailJS service is connected correctly
- **CORS errors**: Make sure your domain is allowed in EmailJS settings
- **Rate limit**: Free tier allows 200 emails/month

## Alternative: Formspree (Even Simpler)

If EmailJS seems complex, you can use Formspree instead:
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create a free account (50 submissions/month)
3. Get your form endpoint
4. Update the Contact component to use Formspree's API

## Security Note

Never commit `.env.local` to git. It's already in `.gitignore` for your safety.

