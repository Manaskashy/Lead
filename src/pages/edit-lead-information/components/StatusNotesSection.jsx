import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const StatusNotesSection = ({ 
  formData, 
  errors, 
  onChange, 
  statusOptions,
  sourceOptions,
  isModified 
}) => {
  const handleSelectChange = (field) => (value) => {
    onChange(field, value);
  };

  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  const handleTagsChange = (e) => {
    const value = e?.target?.value;
    const tags = value?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag);
    onChange('tags', tags);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Status & Notes</h3>
        {isModified && (
          <span className="ml-2 px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
            Modified
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Lead Status"
          placeholder="Select status"
          options={statusOptions}
          value={formData?.status}
          onChange={handleSelectChange('status')}
          error={errors?.status}
          required
          className={formData?.status !== formData?.originalData?.status ? 'ring-2 ring-warning/20' : ''}
        />

        <Select
          label="Lead Source"
          placeholder="Select source"
          options={sourceOptions}
          value={formData?.source}
          onChange={handleSelectChange('source')}
          error={errors?.source}
          required
          className={formData?.source !== formData?.originalData?.source ? 'ring-2 ring-warning/20' : ''}
        />

        <div className="md:col-span-2">
          <Input
            label="Tags"
            type="text"
            placeholder="Enter tags separated by commas (e.g., urgent, premium, referral)"
            value={Array.isArray(formData?.tags) ? formData?.tags?.join(', ') : formData?.tags || ''}
            onChange={handleTagsChange}
            description="Separate multiple tags with commas"
            className={JSON.stringify(formData?.tags) !== JSON.stringify(formData?.originalData?.tags) ? 'ring-2 ring-warning/20' : ''}
          />
        </div>

        <div className="md:col-span-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Notes
            </label>
            <textarea
              placeholder="Add any additional notes or comments about this lead"
              value={formData?.notes || ''}
              onChange={handleInputChange('notes')}
              rows={4}
              className={`w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none ${
                formData?.notes !== formData?.originalData?.notes ? 'ring-2 ring-warning/20' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusNotesSection;