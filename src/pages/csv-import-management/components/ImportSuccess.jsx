import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImportSuccess = ({ importResults, onStartNew }) => {
  const navigate = useNavigate();

  if (!importResults) return null;

  const {
    totalImported,
    skippedDuplicates,
    importedLeads,
    processingTime,
    importedAt
  } = importResults;

  const handleViewDashboard = () => {
    navigate('/lead-dashboard');
  };

  const handleViewLeads = () => {
    // Navigate to dashboard with filter for recently imported leads
    navigate('/lead-dashboard?filter=recent');
  };

  const formatProcessingTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Import Successful!</h2>
        <p className="text-muted-foreground">
          Your lead data has been successfully imported into BuyerLeadPro
        </p>
      </div>
      {/* Import Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-success/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-success mb-1">{totalImported}</div>
          <div className="text-sm text-muted-foreground">Leads Imported</div>
        </div>
        <div className="bg-warning/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-warning mb-1">{skippedDuplicates}</div>
          <div className="text-sm text-muted-foreground">Duplicates Skipped</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-primary mb-1">
            {formatProcessingTime(processingTime)}
          </div>
          <div className="text-sm text-muted-foreground">Processing Time</div>
        </div>
      </div>
      {/* Import Details */}
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-foreground mb-3">Import Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Import Date:</span>
            <span className="text-foreground">
              {new Date(importedAt)?.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Processed:</span>
            <span className="text-foreground">{totalImported + skippedDuplicates} rows</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Success Rate:</span>
            <span className="text-foreground">
              {((totalImported / (totalImported + skippedDuplicates)) * 100)?.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      {/* Recently Imported Leads Preview */}
      {importedLeads && importedLeads?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3">Recently Imported Leads</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {importedLeads?.slice(0, 5)?.map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{lead?.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                      {lead?.city} • {lead?.propertyType}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {lead?.budgetMin && lead?.budgetMax ? 
                      `₹${parseInt(lead?.budgetMin)?.toLocaleString('en-IN')} - ₹${parseInt(lead?.budgetMax)?.toLocaleString('en-IN')}` :
                      'Budget not specified'
                    }
                  </div>
                  <div className="text-xs text-muted-foreground">{lead?.timeline}</div>
                </div>
              </div>
            ))}
            {importedLeads?.length > 5 && (
              <div className="text-center py-2">
                <span className="text-sm text-muted-foreground">
                  ... and {importedLeads?.length - 5} more leads
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Next Steps */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-accent mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2" />
          What's Next?
        </h3>
        <ul className="text-sm text-accent/80 space-y-1">
          <li>• Review and verify the imported lead information</li>
          <li>• Assign leads to team members for follow-up</li>
          <li>• Set up automated follow-up reminders</li>
          <li>• Start reaching out to high-priority leads</li>
        </ul>
      </div>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onStartNew}
          iconName="Plus"
          iconPosition="left"
          fullWidth
          className="sm:w-auto"
        >
          Import More Leads
        </Button>
        <Button
          variant="outline"
          onClick={handleViewLeads}
          iconName="Eye"
          iconPosition="left"
          fullWidth
          className="sm:w-auto"
        >
          View Imported Leads
        </Button>
        <Button
          variant="default"
          onClick={handleViewDashboard}
          iconName="LayoutDashboard"
          iconPosition="left"
          fullWidth
          className="sm:flex-1"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ImportSuccess;