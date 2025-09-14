import React from 'react';
import Select from '../../../components/ui/Select';

const PropertyInfoSection = ({ formData, errors, handleSelectChange }) => {
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

  const purchasePurposeOptions = [
    { value: 'investment', label: 'Investment' },
    { value: 'self-use', label: 'Self Use' },
    { value: 'rental', label: 'Rental Income' },
    { value: 'resale', label: 'Resale' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Property Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Property Type"
          options={propertyTypeOptions}
          value={formData?.propertyType}
          onChange={(value) => handleSelectChange('propertyType', value)}
          placeholder="Select property type"
          error={errors?.propertyType}
          required
        />

        {formData?.propertyType === 'residential' && (
          <Select
            label="BHK Configuration"
            options={bhkOptions}
            value={formData?.bhkConfig}
            onChange={(value) => handleSelectChange('bhkConfig', value)}
            placeholder="Select BHK configuration"
            error={errors?.bhkConfig}
            required
          />
        )}

        <Select
          label="Purchase Purpose"
          options={purchasePurposeOptions}
          value={formData?.purchasePurpose}
          onChange={(value) => handleSelectChange('purchasePurpose', value)}
          placeholder="Select purchase purpose"
          error={errors?.purchasePurpose}
          required
        />
      </div>
    </div>
  );
};

export default PropertyInfoSection;