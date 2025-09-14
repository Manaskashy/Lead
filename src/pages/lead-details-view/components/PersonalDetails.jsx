import React from 'react';
import Icon from '../../../components/AppIcon';

const PersonalDetails = ({ lead }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getTimelineColor = (timeline) => {
    const colors = {
      'immediate': 'text-red-600 bg-red-50',
      '1-3-months': 'text-orange-600 bg-orange-50',
      '3-6-months': 'text-yellow-600 bg-yellow-50',
      '6-12-months': 'text-blue-600 bg-blue-50',
      'flexible': 'text-gray-600 bg-gray-50'
    };
    return colors?.[timeline] || 'text-gray-600 bg-gray-50';
  };

  const detailSections = [
    {
      title: 'Contact Information',
      icon: 'User',
      items: [
        { label: 'Full Name', value: lead?.fullName, icon: 'User' },
        { label: 'Email Address', value: lead?.email, icon: 'Mail' },
        { label: 'Phone Number', value: lead?.phone, icon: 'Phone' },
        { label: 'City', value: lead?.city, icon: 'MapPin' }
      ]
    },
    {
      title: 'Property Preferences',
      icon: 'Home',
      items: [
        { label: 'Property Type', value: lead?.propertyType?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase()), icon: 'Building' },
        { label: 'BHK Configuration', value: lead?.bhkConfig ? `${lead?.bhkConfig} BHK` : 'Not specified', icon: 'Layout' },
        { label: 'Purchase Purpose', value: lead?.purchasePurpose?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase()), icon: 'Target' }
      ]
    },
    {
      title: 'Budget & Timeline',
      icon: 'DollarSign',
      items: [
        { 
          label: 'Budget Range', 
          value: `${formatCurrency(lead?.budgetMin)} - ${formatCurrency(lead?.budgetMax)}`, 
          icon: 'IndianRupee' 
        },
        { 
          label: 'Purchase Timeline', 
          value: lead?.timeline?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase()), 
          icon: 'Clock',
          badge: true,
          badgeClass: getTimelineColor(lead?.timeline)
        }
      ]
    },
    {
      title: 'Lead Information',
      icon: 'Info',
      items: [
        { label: 'Lead Source', value: lead?.source?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase()), icon: 'Source' },
        { label: 'Assigned Agent', value: lead?.assignedTo || 'Unassigned', icon: 'UserCheck' },
        { label: 'Lead ID', value: lead?.id, icon: 'Hash' },
        { label: 'Created Date', value: new Date(lead.createdAt)?.toLocaleDateString('en-IN'), icon: 'Calendar' }
      ]
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="User" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground font-heading">Personal Details</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {detailSections?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <Icon name={section?.icon} size={16} className="text-muted-foreground" />
              <h3 className="font-medium text-foreground">{section?.title}</h3>
            </div>
            
            <div className="space-y-3">
              {section?.items?.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-3">
                  <Icon name={item?.icon} size={16} className="text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-muted-foreground">{item?.label}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-foreground break-words">
                        {item?.value}
                      </div>
                      {item?.badge && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item?.badgeClass}`}>
                          {item?.value}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Tags Section */}
      {lead?.tags && lead?.tags?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lead?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Notes Section */}
      {lead?.notes && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="FileText" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Notes</span>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-foreground whitespace-pre-wrap">{lead?.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;