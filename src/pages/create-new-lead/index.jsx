import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PersonalInfoSection from './components/PersonalInfoSection';
import PropertyInfoSection from './components/PropertyInfoSection';
import BudgetTimelineSection from './components/BudgetTimelineSection';
import SourceNotesSection from './components/SourceNotesSection';
import FileUploadSection from './components/FileUploadSection';
import FormActions from './components/FormActions';
import Icon from '../../components/AppIcon';

const CreateNewLead = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    bhkConfig: '',
    purchasePurpose: '',
    budgetRange: '',
    timeline: '',
    source: '',
    notes: '',
    tags: [],
    attachments: null
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex?.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-15 digit phone number';
    }

    if (!formData?.city) {
      newErrors.city = 'City selection is required';
    }

    if (!formData?.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    if (formData?.propertyType === 'residential' && !formData?.bhkConfig) {
      newErrors.bhkConfig = 'BHK configuration is required for residential properties';
    }

    if (!formData?.purchasePurpose) {
      newErrors.purchasePurpose = 'Purchase purpose is required';
    }

    if (!formData?.budgetRange) {
      newErrors.budgetRange = 'Budget range is required';
    }

    if (!formData?.timeline) {
      newErrors.timeline = 'Timeline is required';
    }

    if (!formData?.source) {
      newErrors.source = 'Lead source is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  // Real-time validation
  useEffect(() => {
    if (Object.keys(errors)?.length > 0) {
      validateForm();
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear BHK config if property type changes from residential
    if (name === 'propertyType' && value !== 'residential') {
      setFormData(prev => ({
        ...prev,
        bhkConfig: ''
      }));
    }
  };

  const handleTagsChange = (newTags) => {
    setFormData(prev => ({
      ...prev,
      tags: newTags
    }));
  };

  const handleFileChange = (file) => {
    setFormData(prev => ({
      ...prev,
      attachments: file
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with optimistic update
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful submission
      console.log('Lead created successfully:', formData);
      
      setShowSuccessMessage(true);
      
      // Navigate to dashboard after success message
      setTimeout(() => {
        navigate('/lead-dashboard', { 
          state: { 
            message: 'Lead created successfully!',
            leadName: formData?.fullName 
          }
        });
      }, 2000);

    } catch (error) {
      console.error('Error creating lead:', error);
      setErrors({ submit: 'Failed to create lead. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.keys(errors)?.length > 0;

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Check" size={32} color="white" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Lead Created Successfully!</h2>
              <p className="text-muted-foreground mb-4">
                {formData?.fullName}'s lead has been added to your dashboard.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Redirecting to dashboard...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Plus" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground font-heading">Create New Lead</h1>
                <p className="text-muted-foreground">Add a new buyer lead to your pipeline</p>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="space-y-6">
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />

            <PropertyInfoSection
              formData={formData}
              errors={errors}
              handleSelectChange={handleSelectChange}
            />

            <BudgetTimelineSection
              formData={formData}
              errors={errors}
              handleSelectChange={handleSelectChange}
            />

            <SourceNotesSection
              formData={formData}
              errors={errors}
              handleSelectChange={handleSelectChange}
              handleInputChange={handleInputChange}
              handleTagsChange={handleTagsChange}
            />

            <FileUploadSection
              formData={formData}
              handleFileChange={handleFileChange}
            />

            <FormActions
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              hasErrors={hasErrors}
            />
          </div>

          {/* Error Message */}
          {errors?.submit && (
            <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <p className="text-sm text-error">{errors?.submit}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNewLead;