import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PersonalInfoSection from './components/PersonalInfoSection';
import PropertyPreferencesSection from './components/PropertyPreferencesSection';
import BudgetTimelineSection from './components/BudgetTimelineSection';
import StatusNotesSection from './components/StatusNotesSection';
import FileAttachmentsSection from './components/FileAttachmentsSection';
import ChangeTrackingPanel from './components/ChangeTrackingPanel';
import ActionButtons from './components/ActionButtons';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';


const EditLeadInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictData, setConflictData] = useState(null);

  // Mock lead data - in real app, this would come from API/props
  const mockLeadData = {
    id: 'LEAD-2024-001',
    fullName: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@email.com',
    phone: '9876543210',
    city: 'chandigarh',
    propertyType: 'residential',
    bhk: '3bhk',
    purpose: 'investment',
    budgetRange: '50,00,000-75,00,000',
    timeline: '3-6-months',
    status: 'qualified',
    source: 'website',
    tags: ['premium', 'urgent', 'referral'],
    notes: `Lead shows strong interest in premium residential properties in Chandigarh.\nHas specific requirements for 3BHK apartments with modern amenities.\nPrefers properties near IT hubs and good schools.`,
    budgetNotes: 'Flexible with budget for the right property. Can extend up to ₹80 lakhs for premium locations.',
    attachments: [
      {
        id: 1,
        name: 'Income_Certificate.pdf',
        size: 245760,
        type: 'application/pdf',
        uploadedAt: '2024-09-10T10:30:00Z'
      },
      {
        id: 2,
        name: 'Property_Preferences.docx',
        size: 156432,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        uploadedAt: '2024-09-12T14:20:00Z'
      }
    ],
    lastModified: '2024-09-14T12:30:00Z',
    version: 3,
    createdBy: 'John Doe',
    lastModifiedBy: 'Sarah Wilson'
  };

  const [formData, setFormData] = useState({
    ...mockLeadData,
    originalData: { ...mockLeadData }
  });

  // Form options
  const cityOptions = [
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'mohali', label: 'Mohali' },
    { value: 'zirakpur', label: 'Zirakpur' },
    { value: 'panchkula', label: 'Panchkula' }
  ];

  const propertyTypeOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'agricultural', label: 'Agricultural' }
  ];

  const bhkOptions = [
    { value: '1bhk', label: '1 BHK' },
    { value: '2bhk', label: '2 BHK' },
    { value: '3bhk', label: '3 BHK' },
    { value: '4bhk', label: '4 BHK' },
    { value: '5bhk', label: '5+ BHK' }
  ];

  const purposeOptions = [
    { value: 'self-use', label: 'Self Use' },
    { value: 'investment', label: 'Investment' },
    { value: 'rental', label: 'Rental Income' }
  ];

  const budgetRangeOptions = [
    { value: '10,00,000-25,00,000', label: '₹10L - ₹25L' },
    { value: '25,00,000-50,00,000', label: '₹25L - ₹50L' },
    { value: '50,00,000-75,00,000', label: '₹50L - ₹75L' },
    { value: '75,00,000-1,00,00,000', label: '₹75L - ₹1Cr' },
    { value: '1,00,00,000-2,00,00,000', label: '₹1Cr - ₹2Cr' },
    { value: '2,00,00,000+', label: '₹2Cr+' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-12-months', label: '6-12 months' },
    { value: '12-months+', label: 'More than 12 months' }
  ];

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal-sent', label: 'Proposal Sent' },
    { value: 'negotiation', label: 'In Negotiation' },
    { value: 'closed-won', label: 'Closed Won' },
    { value: 'closed-lost', label: 'Closed Lost' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const sourceOptions = [
    { value: 'website', label: 'Website' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'referral', label: 'Referral' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'cold-call', label: 'Cold Call' },
    { value: 'walk-in', label: 'Walk-in' },
    { value: 'event', label: 'Event/Exhibition' }
  ];

  useEffect(() => {
    // Simulate loading lead data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field-specific errors
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Handle conditional BHK field
    if (field === 'propertyType' && value !== 'residential') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        bhk: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone?.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    if (!formData?.city) {
      newErrors.city = 'City selection is required';
    }

    if (!formData?.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    if (formData?.propertyType === 'residential' && !formData?.bhk) {
      newErrors.bhk = 'BHK configuration is required for residential properties';
    }

    if (!formData?.purpose) {
      newErrors.purpose = 'Purchase purpose is required';
    }

    if (!formData?.budgetRange) {
      newErrors.budgetRange = 'Budget range is required';
    }

    if (!formData?.timeline) {
      newErrors.timeline = 'Timeline is required';
    }

    if (!formData?.status) {
      newErrors.status = 'Status is required';
    }

    if (!formData?.source) {
      newErrors.source = 'Source is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const hasChanges = () => {
    const original = formData?.originalData;
    const current = { ...formData };
    delete current?.originalData;
    delete current?.lastModified;
    delete current?.version;

    return JSON.stringify(original) !== JSON.stringify(current);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call with optimistic concurrency control
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate version conflict (uncomment to test)
      // if (Math.random() > 0.7) {
      //   setConflictData({
      //     serverVersion: formData.version + 1,
      //     lastModifiedBy: 'Another User',
      //     lastModified: new Date().toISOString()
      //   });
      //   setShowConflictModal(true);
      //   setIsSaving(false);
      //   return;
      // }

      // Success - navigate back to lead details
      navigate('/lead-details-view', {
        state: { 
          leadId: formData?.id,
          message: 'Lead updated successfully',
          updatedData: formData
        }
      });
    } catch (error) {
      console.error('Error updating lead:', error);
      setErrors({ submit: 'Failed to update lead. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges()) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave without saving?'
      );
      if (!confirmLeave) return;
    }
    navigate('/lead-details-view', { state: { leadId: formData?.id } });
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate back to dashboard with success message
      navigate('/lead-dashboard', {
        state: { 
          message: 'Lead deleted successfully',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error deleting lead:', error);
      setErrors({ submit: 'Failed to delete lead. Please try again.' });
      setIsLoading(false);
    }
  };

  const resolveConflict = (action) => {
    if (action === 'overwrite') {
      // Continue with save, overwriting server changes
      setShowConflictModal(false);
      handleSave();
    } else if (action === 'reload') {
      // Reload page to get latest data
      window.location?.reload();
    } else {
      // Cancel - close modal
      setShowConflictModal(false);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={48} className="mx-auto mb-4 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading lead information...</p>
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Edit Lead Information
                </h1>
                <p className="text-muted-foreground">
                  Update lead details and track changes • Lead ID: {formData?.id}
                </p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Last modified: {new Date(formData.lastModified)?.toLocaleString()}</p>
                <p>Version: {formData?.version} • By: {formData?.lastModifiedBy}</p>
              </div>
            </div>
          </div>

          {/* Error Messages */}
          {errors?.submit && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center">
                <Icon name="AlertCircle" size={20} className="mr-2 text-error" />
                <p className="text-error">{errors?.submit}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              <PersonalInfoSection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
                cityOptions={cityOptions}
                isModified={hasChanges()}
              />

              <PropertyPreferencesSection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
                propertyTypeOptions={propertyTypeOptions}
                bhkOptions={bhkOptions}
                purposeOptions={purposeOptions}
                isModified={hasChanges()}
              />

              <BudgetTimelineSection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
                budgetRangeOptions={budgetRangeOptions}
                timelineOptions={timelineOptions}
                isModified={hasChanges()}
              />

              <StatusNotesSection
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
                statusOptions={statusOptions}
                sourceOptions={sourceOptions}
                isModified={hasChanges()}
              />

              <FileAttachmentsSection
                formData={formData}
                onChange={handleFieldChange}
                isModified={hasChanges()}
              />

              <ActionButtons
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
                hasChanges={hasChanges()}
                isLoading={isLoading}
                isSaving={isSaving}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ChangeTrackingPanel
                changes={[]}
                originalData={formData?.originalData}
                currentData={formData}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Conflict Resolution Modal */}
      {showConflictModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full modal-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mr-4">
                <Icon name="AlertTriangle" size={24} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Conflict Detected</h3>
                <p className="text-sm text-muted-foreground">Data has been modified by another user</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-foreground mb-4">
                This lead has been modified by <strong>{conflictData?.lastModifiedBy}</strong> while you were editing.
              </p>
              <div className="bg-muted p-3 rounded text-sm">
                <p><strong>Server Version:</strong> {conflictData?.serverVersion}</p>
                <p><strong>Last Modified:</strong> {new Date(conflictData?.lastModified)?.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="default"
                onClick={() => resolveConflict('reload')}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Reload Latest Data
              </Button>
              <Button
                variant="warning"
                onClick={() => resolveConflict('overwrite')}
                iconName="Save"
                iconPosition="left"
              >
                Overwrite Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => resolveConflict('cancel')}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLeadInformation;