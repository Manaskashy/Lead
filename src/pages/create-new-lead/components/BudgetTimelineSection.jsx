import React from 'react';
import Select from '../../../components/ui/Select';

const BudgetTimelineSection = ({ formData, errors, handleSelectChange }) => {
  const budgetRangeOptions = [
    { value: '0-25', label: '₹0 - ₹25 Lakhs' },
    { value: '25-50', label: '₹25 - ₹50 Lakhs' },
    { value: '50-75', label: '₹50 - ₹75 Lakhs' },
    { value: '75-100', label: '₹75 Lakhs - ₹1 Crore' },
    { value: '100-150', label: '₹1 - ₹1.5 Crores' },
    { value: '150-200', label: '₹1.5 - ₹2 Crores' },
    { value: '200+', label: '₹2+ Crores' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: '1-3months', label: '1-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: '6-12months', label: '6-12 months' },
    { value: '12+months', label: '12+ months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Budget & Timeline</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Budget Range"
          options={budgetRangeOptions}
          value={formData?.budgetRange}
          onChange={(value) => handleSelectChange('budgetRange', value)}
          placeholder="Select budget range"
          error={errors?.budgetRange}
          required
        />

        <Select
          label="Purchase Timeline"
          options={timelineOptions}
          value={formData?.timeline}
          onChange={(value) => handleSelectChange('timeline', value)}
          placeholder="Select timeline"
          error={errors?.timeline}
          required
        />
      </div>
    </div>
  );
};

export default BudgetTimelineSection;