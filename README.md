# BuyerLeadPro

A modern React-based real estate lead management platform built with Supabase authentication and state-of-the-art frontend technologies.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Supabase** - Backend-as-a-Service with authentication and database
- **Magic Link Authentication** - Passwordless login with email magic links
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Lead Management** - Complete CRM functionality for real estate professionals

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Supabase account (free tier available)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd buyerleadpro
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (see [Environment Setup](#-environment-setup) below)

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The application will be available at `http://localhost:4028`

## 🔧 Environment Setup

### Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project (or use existing one)
3. Wait for the project to be fully set up

### Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### Step 3: Create Environment File

Create a `.env` file in your project root directory with the following content:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Important:** 
- Replace the example values with your actual Supabase credentials
- Never commit your `.env` file to version control
- The `.env` file should be in the root directory (same level as `package.json`)

### Step 4: Configure Supabase Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Site URL**, add: `http://localhost:4028`
3. Under **Redirect URLs**, add: `http://localhost:4028/auth/callback`
4. Enable **Email** provider if not already enabled
5. Save the settings

### Step 5: Test Your Setup

1. Restart your development server:
   ```bash
   npm start
   ```
2. Go to `http://localhost:4028`
3. Try logging in with a valid email address
4. Check your email for the magic link
5. Click the magic link to complete authentication

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### Troubleshooting

**Common Issues:**

1. **"Supabase not configured" error**
   - Check that your `.env` file exists and has correct values
   - Ensure variable names start with `VITE_`
   - Restart your development server

2. **Magic link not working**
   - Verify Site URL and Redirect URLs in Supabase settings
   - Check that the email provider is enabled
   - Ensure your email address is valid

3. **Environment variables not loading**
   - Make sure the file is named `.env` (not `.env.local`)
   - Restart your development server after creating the file
   - Check file location (should be in project root)

## 📁 Project Structure

```
buyerleadpro/
├── public/                    # Static assets
│   └── assets/               # Images and static files
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI components (Button, Input, etc.)
│   │   └── ...              # Other components
│   ├── pages/               # Page components
│   │   ├── authentication-login/    # Login page
│   │   ├── lead-dashboard/          # Main dashboard
│   │   ├── create-new-lead/         # Lead creation form
│   │   ├── edit-lead-information/   # Lead editing
│   │   ├── lead-details-view/       # Lead details
│   │   ├── csv-import-management/   # CSV import
│   │   └── auth/                   # Authentication callback
│   ├── config/              # Configuration files
│   │   └── supabase.js      # Supabase client configuration
│   ├── styles/              # Global styles and Tailwind configuration
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   ├── Routes.jsx           # Application routes
│   └── index.jsx            # Application entry point
├── .env                     # Environment variables (create this file)
├── .gitignore              # Git ignore rules
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.mjs         # Vite configuration
└── README.md               # This file
```

## 🔐 Authentication

This application uses Supabase for authentication with magic link login:

- **Magic Link Login**: Users receive a secure link via email to sign in
- **Session Management**: Automatic session handling with Supabase
- **Protected Routes**: Authentication-required pages
- **Auth Callback**: Handles magic link redirects

### Authentication Flow

1. User enters email on login page
2. System sends magic link to email via Supabase
3. User clicks link in email
4. Redirected to `/auth/callback` for session establishment
5. User is redirected to dashboard upon successful authentication

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import NewPage from './pages/NewPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/new-page" element={<NewPage />} />
        {/* Add more routes as needed */}
      </RouterRoutes>
    </BrowserRouter>
  );
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

### Development

```bash
npm start
# Runs on http://localhost:4028
```

### Production Build

```bash
npm run build
# Creates optimized build in ./build directory
```

### Preview Production Build

```bash
npm run serve
# Serves the production build locally
```

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build

## 🛡️ Security Notes

- Environment variables with `VITE_` prefix are exposed to the browser
- Never put sensitive server-side secrets in environment variables
- The `.env` file should be added to `.gitignore`
- Use Supabase Row Level Security (RLS) for database protection

## 📝 Development Tips

1. **Environment Variables**: Always restart the dev server after changing `.env` file
2. **Supabase Dashboard**: Use the Supabase dashboard to monitor authentication and database
3. **Magic Links**: Check spam folder if magic links aren't received
4. **Port Configuration**: Default port is 4028, configured in `vite.config.mjs`


