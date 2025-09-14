import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeadHeader = ({ lead, onEdit, onStatusChange, onDelete, onAssign }) => {
  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'qualified': 'bg-green-100 text-green-800',
      'interested': 'bg-purple-100 text-purple-800',
      'not-interested': 'bg-red-100 text-red-800',
      'converted': 'bg-emerald-100 text-emerald-800'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-red-600',
      'medium': 'text-yellow-600',
      'low': 'text-green-600'
    };
    return colors?.[priority] || 'text-gray-600';
  };

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'interested', label: 'Interested' },
    { value: 'not-interested', label: 'Not Interested' },
    { value: 'converted', label: 'Converted' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 card-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Lead Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-foreground font-heading">
              {lead?.fullName}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead?.status)}`}>
              {lead?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
            </span>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={16} className={getPriorityColor(lead?.priority)} />
              <span className={`text-sm font-medium ${getPriorityColor(lead?.priority)}`}>
                {lead?.priority?.charAt(0)?.toUpperCase() + lead?.priority?.slice(1)} Priority
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Mail" size={14} />
              <span>{lead?.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Phone" size={14} />
              <span>{lead?.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={14} />
              <span>{lead?.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>Created {new Date(lead.createdAt)?.toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            onClick={() => window.open(`tel:${lead?.phone}`)}
          >
            Call
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconPosition="left"
            onClick={() => window.open(`mailto:${lead?.email}`)}
          >
            Email
          </Button>

          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronDown"
              iconPosition="right"
            >
              Status
            </Button>
            <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {statusOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onStatusChange(option?.value)}
                  className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover first:rounded-t-lg last:rounded-b-lg"
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="default"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={onEdit}
          >
            Edit
          </Button>

          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              iconName="MoreHorizontal"
            />
            <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={onAssign}
                className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover rounded-t-lg"
              >
                <Icon name="UserPlus" size={16} className="mr-3" />
                Assign Lead
              </button>
              <button
                onClick={onDelete}
                className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-hover rounded-b-lg"
              >
                <Icon name="Trash2" size={16} className="mr-3" />
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Lead Score */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Lead Score:</span>
            <div className="flex items-center gap-1">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${lead?.score}%` }}
                />
              </div>
              <span className="text-sm font-medium text-primary">{lead?.score}/100</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date(lead.lastUpdated)?.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadHeader;