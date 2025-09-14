import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ formData, errors, handleInputChange, handleSelectChange }) => {
  const cityOptions = [
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'mohali', label: 'Mohali' },
    { value: 'zirakpur', label: 'Zirakpur' },
    { value: 'panchkula', label: 'Panchkula' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter 10-digit phone number"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          required
          pattern="[0-9]{10,15}"
          maxLength="15"
        />

        <Select
          label="City"
          options={cityOptions}
          value={formData?.city}
          onChange={(value) => handleSelectChange('city', value)}
          placeholder="Select city"
          error={errors?.city}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;