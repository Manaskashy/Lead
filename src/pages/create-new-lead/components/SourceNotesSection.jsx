import React, { useState, useRef, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SourceNotesSection = ({ formData, errors, handleSelectChange, handleInputChange, handleTagsChange }) => {
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const tagInputRef = useRef(null);

  const sourceOptions = [
    { value: 'website', label: 'Website Inquiry' },
    { value: 'referral', label: 'Referral' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'walk-in', label: 'Walk-in' },
    { value: 'phone-call', label: 'Phone Call' },
    { value: 'email', label: 'Email Campaign' },
    { value: 'property-portal', label: 'Property Portal' },
    { value: 'broker', label: 'Broker Network' },
    { value: 'exhibition', label: 'Property Exhibition' }
  ];

  const tagSuggestions = [
    'Hot Lead', 'Cold Lead', 'Warm Lead', 'First Time Buyer', 'Investor', 
    'Urgent', 'Price Sensitive', 'Location Specific', 'Ready to Move', 
    'Under Construction', 'Premium Segment', 'Budget Conscious', 'NRI Client'
  ];

  const handleTagInputChange = (e) => {
    setTagInput(e?.target?.value);
    setShowTagSuggestions(e?.target?.value?.length > 0);
  };

  const addTag = (tag) => {
    if (tag && !formData?.tags?.includes(tag)) {
      const newTags = [...formData?.tags, tag];
      handleTagsChange(newTags);
    }
    setTagInput('');
    setShowTagSuggestions(false);
  };

  const removeTag = (tagToRemove) => {
    const newTags = formData?.tags?.filter(tag => tag !== tagToRemove);
    handleTagsChange(newTags);
  };

  const handleTagKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      addTag(tagInput?.trim());
    }
  };

  const filteredSuggestions = tagSuggestions?.filter(
    suggestion => 
      suggestion?.toLowerCase()?.includes(tagInput?.toLowerCase()) &&
      !formData?.tags?.includes(suggestion)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagInputRef?.current && !tagInputRef?.current?.contains(event?.target)) {
        setShowTagSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Source & Additional Information</h3>
      <div className="space-y-6">
        <Select
          label="Lead Source"
          options={sourceOptions}
          value={formData?.source}
          onChange={(value) => handleSelectChange('source', value)}
          placeholder="Select lead source"
          error={errors?.source}
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            rows="4"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Add any additional notes about the lead..."
            value={formData?.notes}
            onChange={handleInputChange}
          />
          {errors?.notes && (
            <p className="mt-1 text-sm text-error">{errors?.notes}</p>
          )}
        </div>

        <div className="relative" ref={tagInputRef}>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tags
          </label>
          
          {/* Display existing tags */}
          {formData?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-error transition-colors"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <Input
            type="text"
            placeholder="Type to add tags..."
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyPress={handleTagKeyPress}
          />

          {/* Tag suggestions dropdown */}
          {showTagSuggestions && filteredSuggestions?.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-modal max-h-40 overflow-y-auto">
              {filteredSuggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-muted transition-colors text-sm text-popover-foreground"
                  onClick={() => addTag(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceNotesSection;