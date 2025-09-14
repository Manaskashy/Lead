import React from 'react';

import Button from '../../../components/ui/Button';

const TemplateDownload = () => {
  const templateData = [
    {
      fullName: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "9876543210",
      city: "Chandigarh",
      propertyType: "Residential",
      bhk: "3",
      purpose: "Investment",
      budgetMin: "5000000",
      budgetMax: "7500000",
      timeline: "3-6 months",
      source: "Website",
      notes: "Looking for ready-to-move properties",
      tags: "premium,urgent"
    },
    {
      fullName: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "9123456789",
      city: "Mohali",
      propertyType: "Commercial",
      bhk: "",
      purpose: "Self Use",
      budgetMin: "10000000",
      budgetMax: "15000000",
      timeline: "6-12 months",
      source: "Referral",
      notes: "Interested in office spaces",
      tags: "commercial,office"
    }
  ];

  const downloadTemplate = () => {
    const headers = [
      'fullName',
      'email', 
      'phone',
      'city',
      'propertyType',
      'bhk',
      'purpose',
      'budgetMin',
      'budgetMax',
      'timeline',
      'source',
      'notes',
      'tags'
    ];

    const csvContent = [
      headers?.join(','),
      ...templateData?.map(row => 
        headers?.map(header => {
          const value = row?.[header] || '';
          // Escape commas and quotes in CSV
          return value?.includes(',') || value?.includes('"') 
            ? `"${value?.replace(/"/g, '""')}"` 
            : value;
        })?.join(',')
      )
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link?.setAttribute('href', url);
    link?.setAttribute('download', 'buyer_leads_template.csv');
    link.style.visibility = 'hidden';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const columnDefinitions = [
    { name: 'fullName', required: true, description: 'Full name of the buyer' },
    { name: 'email', required: true, description: 'Valid email address' },
    { name: 'phone', required: true, description: '10-15 digit Indian phone number' },
    { name: 'city', required: true, description: 'Chandigarh, Mohali, Zirakpur, or Panchkula' },
    { name: 'propertyType', required: false, description: 'Residential, Commercial, or Plot' },
    { name: 'bhk', required: false, description: '1, 2, 3, 4, 5+ (only for Residential)' },
    { name: 'purpose', required: false, description: 'Self Use or Investment' },
    { name: 'budgetMin', required: false, description: 'Minimum budget in rupees (numbers only)' },
    { name: 'budgetMax', required: false, description: 'Maximum budget in rupees (numbers only)' },
    { name: 'timeline', required: false, description: 'Immediate, 1-3 months, 3-6 months, 6-12 months, 12+ months' },
    { name: 'source', required: false, description: 'Website, Referral, Advertisement, Social Media, Other' },
    { name: 'notes', required: false, description: 'Additional notes about the lead' },
    { name: 'tags', required: false, description: 'Comma-separated tags (e.g., premium,urgent)' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">CSV Template</h2>
          <p className="text-sm text-muted-foreground">
            Download the template file to ensure proper formatting
          </p>
        </div>
        <Button
          variant="outline"
          onClick={downloadTemplate}
          iconName="Download"
          iconPosition="left"
        >
          Download Template
        </Button>
      </div>
      {/* Column Definitions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Column Definitions</h3>
        <div className="grid gap-3">
          {columnDefinitions?.map((column) => (
            <div key={column?.name} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex-shrink-0">
                {column?.required ? (
                  <div className="w-2 h-2 bg-error rounded-full mt-2"></div>
                ) : (
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground font-data text-sm">
                    {column?.name}
                  </span>
                  {column?.required && (
                    <span className="text-xs bg-error text-error-foreground px-2 py-0.5 rounded">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {column?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Sample Data Preview */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-foreground mb-3">Sample Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 font-medium text-foreground">Full Name</th>
                <th className="text-left p-2 font-medium text-foreground">Email</th>
                <th className="text-left p-2 font-medium text-foreground">Phone</th>
                <th className="text-left p-2 font-medium text-foreground">City</th>
                <th className="text-left p-2 font-medium text-foreground">Property Type</th>
                <th className="text-left p-2 font-medium text-foreground">Budget Range</th>
              </tr>
            </thead>
            <tbody>
              {templateData?.map((row, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="p-2 text-foreground">{row?.fullName}</td>
                  <td className="p-2 text-muted-foreground">{row?.email}</td>
                  <td className="p-2 text-muted-foreground">{row?.phone}</td>
                  <td className="p-2 text-muted-foreground">{row?.city}</td>
                  <td className="p-2 text-muted-foreground">{row?.propertyType}</td>
                  <td className="p-2 text-muted-foreground">
                    ₹{parseInt(row?.budgetMin)?.toLocaleString('en-IN')} - ₹{parseInt(row?.budgetMax)?.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TemplateDownload;