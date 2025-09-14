import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { auth } from '../../../config/supabase';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMagicLinkSubmit = async (e) => {
    e?.preventDefault();
    
    // Validate email
    if (!formData?.email) {
      setErrors({ email: 'Email address is required' });
      return;
    }
    
    if (!validateEmail(formData?.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url' || 
          !supabaseKey || supabaseKey === 'your_supabase_anon_key') {
        throw new Error('Supabase not configured. Please set up your environment variables.');
      }

      // Send magic link using Supabase
      const { data, error } = await auth.signInWithMagicLink(formData.email);
      
      if (error) {
        throw error;
      }
      
      setMagicLinkSent(true);
    } catch (error) {
      console.error('Magic link error:', error);
      setErrors({ email: error.message || 'Failed to send magic link. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Simulate demo login
    navigate('/lead-dashboard');
  };

  if (magicLinkSent) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card rounded-lg border border-border card-shadow p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Mail" size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Check Your Email</h2>
            <p className="text-muted-foreground">
              We've sent a magic link to <strong>{formData?.email}</strong>
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">Next Steps:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check your email inbox</li>
                <li>• Click the magic link to sign in</li>
                <li>• Link expires in 15 minutes</li>
              </ul>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={() => setMagicLinkSent(false)}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg border border-border card-shadow p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your BuyerLeadPro account
          </p>
        </div>

        <form onSubmit={handleMagicLinkSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            description="We'll send you a secure magic link to sign in"
          />

          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="Mail"
            iconPosition="left"
            disabled={!formData?.email}
          >
            {isLoading ? 'Sending Magic Link...' : 'Send Magic Link'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          onClick={handleDemoLogin}
          iconName="Play"
          iconPosition="left"
        >
          Try Demo Access
        </Button>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;