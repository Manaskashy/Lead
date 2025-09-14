import React from 'react';
import Select from '../../../components/ui/Select';

const PropertyPreferencesSection = ({ 
  formData, 
  errors, 
  onChange, 
  propertyTypeOptions,
  bhkOptions,
  purposeOptions,
  isModified 
}) => {
  const handleSelectChange = (field) => (value) => {
    onChange(field, value);
  };

  const showBHKField = formData?.propertyType === 'residential';

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Property Preferences</h3>
        {isModified && (
          <span className="ml-2 px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
            Modified
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Property Type"
          placeholder="Select property type"
          options={propertyTypeOptions}
          value={formData?.propertyType}
          onChange={handleSelectChange('propertyType')}
          error={errors?.propertyType}
          required
          className={formData?.propertyType !== formData?.originalData?.propertyType ? 'ring-2 ring-warning/20' : ''}
        />

        {showBHKField && (
          <Select
            label="BHK Configuration"
            placeholder="Select BHK"
            options={bhkOptions}
            value={formData?.bhk}
            onChange={handleSelectChange('bhk')}
            error={errors?.bhk}
            required
            className={formData?.bhk !== formData?.originalData?.bhk ? 'ring-2 ring-warning/20' : ''}
          />
        )}

        <Select
          label="Purchase Purpose"
          placeholder="Select purpose"
          options={purposeOptions}
          value={formData?.purpose}
          onChange={handleSelectChange('purpose')}
          error={errors?.purpose}
          required
          className={formData?.purpose !== formData?.originalData?.purpose ? 'ring-2 ring-warning/20' : ''}
        />
      </div>
    </div>
  );
};

export default PropertyPreferencesSection;