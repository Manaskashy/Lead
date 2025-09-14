import React from 'react';
import Icon from '../../../components/AppIcon';

const ChangeTrackingPanel = ({ changes, originalData, currentData }) => {
  const getChangedFields = () => {
    const changedFields = [];
    
    Object.keys(currentData)?.forEach(key => {
      if (key === 'originalData' || key === 'lastModified' || key === 'version') return;
      
      const original = originalData?.[key];
      const current = currentData?.[key];
      
      if (JSON.stringify(original) !== JSON.stringify(current)) {
        changedFields?.push({
          field: key,
          original: original,
          current: current,
          label: getFieldLabel(key)
        });
      }
    });
    
    return changedFields;
  };

  const getFieldLabel = (field) => {
    const labels = {
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      city: 'City',
      propertyType: 'Property Type',
      bhk: 'BHK Configuration',
      purpose: 'Purchase Purpose',
      budgetRange: 'Budget Range',
      timeline: 'Timeline',
      status: 'Status',
      source: 'Source',
      tags: 'Tags',
      notes: 'Notes',
      budgetNotes: 'Budget Notes',
      attachments: 'Attachments'
    };
    return labels?.[field] || field;
  };

  const formatValue = (value, field) => {
    if (value === null || value === undefined) return 'Not set';
    if (Array.isArray(value)) {
      if (field === 'tags') return value?.join(', ');
      if (field === 'attachments') return `${value?.length} file(s)`;
      return value?.join(', ');
    }
    if (field === 'budgetRange' && value) {
      const [min, max] = value?.split('-');
      return `₹${min} - ₹${max}`;
    }
    return String(value);
  };

  const changedFields = getChangedFields();

  if (changedFields?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 card-shadow">
        <div className="flex items-center mb-4">
          <Icon name="Clock" size={20} className="mr-2 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Change Summary</h3>
        </div>
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-success" />
          <p className="text-muted-foreground">No changes detected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center mb-4">
        <Icon name="Clock" size={20} className="mr-2 text-warning" />
        <h3 className="text-lg font-semibold text-foreground">Change Summary</h3>
        <span className="ml-2 px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
          {changedFields?.length} field{changedFields?.length !== 1 ? 's' : ''} modified
        </span>
      </div>
      <div className="space-y-4">
        {changedFields?.map((change, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Icon name="Edit" size={16} className="mr-2 text-warning" />
              <h4 className="font-medium text-foreground">{change?.label}</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Original:</p>
                <p className="bg-error/10 text-error px-3 py-2 rounded border-l-4 border-error">
                  {formatValue(change?.original, change?.field)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">New:</p>
                <p className="bg-success/10 text-success px-3 py-2 rounded border-l-4 border-success">
                  {formatValue(change?.current, change?.field)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <div className="flex items-start">
          <Icon name="AlertTriangle" size={16} className="mr-2 text-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning">Review Changes</p>
            <p className="text-xs text-muted-foreground mt-1">
              Please review all changes before saving. This action will update the lead record and create an audit trail entry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeTrackingPanel;