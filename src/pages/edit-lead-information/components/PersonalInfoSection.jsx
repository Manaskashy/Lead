import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ 
  formData, 
  errors, 
  onChange, 
  cityOptions,
  isModified 
}) => {
  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  const handleSelectChange = (field) => (value) => {
    onChange(field, value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        {isModified && (
          <span className="ml-2 px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
            Modified
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter full name"
          value={formData?.fullName}
          onChange={handleInputChange('fullName')}
          error={errors?.fullName}
          required
          className={formData?.fullName !== formData?.originalData?.fullName ? 'ring-2 ring-warning/20' : ''}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          value={formData?.email}
          onChange={handleInputChange('email')}
          error={errors?.email}
          required
          className={formData?.email !== formData?.originalData?.email ? 'ring-2 ring-warning/20' : ''}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter 10-digit phone number"
          value={formData?.phone}
          onChange={handleInputChange('phone')}
          error={errors?.phone}
          required
          className={formData?.phone !== formData?.originalData?.phone ? 'ring-2 ring-warning/20' : ''}
        />

        <Select
          label="City"
          placeholder="Select city"
          options={cityOptions}
          value={formData?.city}
          onChange={handleSelectChange('city')}
          error={errors?.city}
          required
          searchable
          className={formData?.city !== formData?.originalData?.city ? 'ring-2 ring-warning/20' : ''}
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;