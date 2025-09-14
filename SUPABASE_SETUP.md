# Supabase Setup Guide

Your website is now configured to work with Supabase, but you need to set up your Supabase credentials to make it functional.

## Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one if you haven't)
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 2: Set Up Environment Variables

Create a `.env` file in your project root with the following content:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:** Replace the example values with your actual Supabase credentials.

## Step 3: Configure Supabase Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Site URL**, add: `http://localhost:4028`
3. Under **Redirect URLs**, add: `http://localhost:4028/auth/callback`
4. Enable **Email** provider if not already enabled

## Step 4: Test Your Setup

1. Restart your development server:
   ```bash
   npm start
   ```
2. Go to `http://localhost:4028`
3. Try logging in with a valid email address
4. Check your email for the magic link
5. Click the magic link to complete authentication

## Troubleshooting

### Common Issues:

1. **"Supabase not configured" error**: Make sure your `.env` file has the correct values
2. **Magic link not working**: Check your Supabase authentication settings and redirect URLs
3. **CORS errors**: Ensure your Site URL and Redirect URLs are correctly configured in Supabase

### Environment Variables Not Loading?

If your environment variables aren't loading:
1. Make sure the file is named `.env` (not `.env.local` or `.env.development`)
2. Restart your development server after adding the file
3. Check that the variable names start with `VITE_`

## What's Been Set Up

✅ Supabase client library installed  
✅ Supabase configuration file created  
✅ Authentication integration added to login form  
✅ Auth callback route for magic link handling  
✅ Error handling and user feedback  

## Next Steps

After setting up the credentials:
1. Test the magic link authentication
2. Set up your database tables for leads
3. Implement user session management
4. Add protected routes for authenticated users

Your website should now work properly with Supabase authentication!
