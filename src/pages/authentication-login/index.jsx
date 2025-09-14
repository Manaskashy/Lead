import React from 'react';
import { Helmet } from 'react-helmet';
import BrandHeader from './components/BrandHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';

const AuthenticationLogin = () => {
  return (
    <>
      <Helmet>
        <title>Login - BuyerLeadPro | Real Estate Lead Management</title>
        <meta name="description" content="Sign in to BuyerLeadPro - The leading real estate lead management platform for Punjab region. Secure authentication with magic link or demo access." />
        <meta name="keywords" content="real estate login, lead management, Punjab properties, buyer leads, authentication" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Brand Header */}
            <BrandHeader />

            {/* Login Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Login Form */}
              <div className="order-2 lg:order-1">
                <LoginForm />
              </div>

              {/* Trust Signals */}
              <div className="order-1 lg:order-2">
                <TrustSignals />
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-border">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <a href="#" className="hover:text-foreground transition-hover">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-foreground transition-hover">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-foreground transition-hover">
                    Support
                  </a>
                  <a href="#" className="hover:text-foreground transition-hover">
                    Contact
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  © {new Date()?.getFullYear()} BuyerLeadPro. All rights reserved. 
                  Made with ❤️ for Indian Real Estate Professionals.
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                  <span>🇮🇳 India</span>
                  <span>•</span>
                  <span>₹ INR</span>
                  <span>•</span>
                  <span>English</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticationLogin;