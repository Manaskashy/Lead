import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const BudgetTimelineSection = ({ 
  formData, 
  errors, 
  onChange, 
  budgetRangeOptions,
  timelineOptions,
  isModified 
}) => {
  const handleSelectChange = (field) => (value) => {
    onChange(field, value);
  };

  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  const formatBudgetDisplay = (range) => {
    if (!range) return '';
    const [min, max] = range?.split('-');
    return `₹${min} - ₹${max}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Budget & Timeline</h3>
        {isModified && (
          <span className="ml-2 px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
            Modified
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Budget Range"
          placeholder="Select budget range"
          options={budgetRangeOptions?.map(option => ({
            ...option,
            label: formatBudgetDisplay(option?.value)
          }))}
          value={formData?.budgetRange}
          onChange={handleSelectChange('budgetRange')}
          error={errors?.budgetRange}
          required
          className={formData?.budgetRange !== formData?.originalData?.budgetRange ? 'ring-2 ring-warning/20' : ''}
        />

        <Select
          label="Purchase Timeline"
          placeholder="Select timeline"
          options={timelineOptions}
          value={formData?.timeline}
          onChange={handleSelectChange('timeline')}
          error={errors?.timeline}
          required
          className={formData?.timeline !== formData?.originalData?.timeline ? 'ring-2 ring-warning/20' : ''}
        />

        <div className="md:col-span-2">
          <Input
            label="Additional Budget Notes"
            type="text"
            placeholder="Any specific budget requirements or notes"
            value={formData?.budgetNotes || ''}
            onChange={handleInputChange('budgetNotes')}
            className={formData?.budgetNotes !== formData?.originalData?.budgetNotes ? 'ring-2 ring-warning/20' : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetTimelineSection;