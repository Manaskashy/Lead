import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataPreview = ({ 
  previewData, 
  onConfirmImport, 
  onCancel, 
  isProcessing 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!previewData || previewData?.length === 0) return null;

  const totalPages = Math.ceil(previewData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = previewData?.slice(startIndex, endIndex);

  const formatBudget = (min, max) => {
    if (!min && !max) return '-';
    if (min && max) {
      return `₹${parseInt(min)?.toLocaleString('en-IN')} - ₹${parseInt(max)?.toLocaleString('en-IN')}`;
    }
    if (min) return `₹${parseInt(min)?.toLocaleString('en-IN')}+`;
    if (max) return `Up to ₹${parseInt(max)?.toLocaleString('en-IN')}`;
    return '-';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'New': { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
      'Contacted': { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
      'Qualified': { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
      'Lost': { bg: 'bg-error/10', text: 'text-error', border: 'border-error/20' }
    };

    const config = statusConfig?.[status] || statusConfig?.['New'];
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded border ${config?.bg} ${config?.text} ${config?.border}`}>
        {status || 'New'}
      </span>
    );
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Data Preview</h2>
          <p className="text-sm text-muted-foreground">
            Review {previewData?.length} lead{previewData?.length !== 1 ? 's' : ''} before importing
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {startIndex + 1}-{Math.min(endIndex, previewData?.length)} of {previewData?.length}
          </span>
        </div>
      </div>
      {/* Data Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 font-medium text-foreground">#</th>
              <th className="text-left p-3 font-medium text-foreground">Name</th>
              <th className="text-left p-3 font-medium text-foreground">Contact</th>
              <th className="text-left p-3 font-medium text-foreground">Location</th>
              <th className="text-left p-3 font-medium text-foreground">Property</th>
              <th className="text-left p-3 font-medium text-foreground">Budget</th>
              <th className="text-left p-3 font-medium text-foreground">Timeline</th>
              <th className="text-left p-3 font-medium text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((row, index) => (
              <tr key={startIndex + index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-3 text-muted-foreground font-medium">
                  {startIndex + index + 1}
                </td>
                <td className="p-3">
                  <div>
                    <div className="font-medium text-foreground">{row?.fullName}</div>
                    {row?.tags && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {row?.tags?.split(',')?.slice(0, 2)?.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">
                            {tag?.trim()}
                          </span>
                        ))}
                        {row?.tags?.split(',')?.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{row?.tags?.split(',')?.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">{row?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">{row?.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{row?.city}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div>
                    <div className="text-foreground">{row?.propertyType || 'Not specified'}</div>
                    {row?.bhk && row?.propertyType === 'Residential' && (
                      <div className="text-xs text-muted-foreground">{row?.bhk} BHK</div>
                    )}
                    {row?.purpose && (
                      <div className="text-xs text-muted-foreground">{row?.purpose}</div>
                    )}
                  </div>
                </td>
                <td className="p-3 text-foreground">
                  {formatBudget(row?.budgetMin, row?.budgetMax)}
                </td>
                <td className="p-3 text-muted-foreground">
                  {row?.timeline || 'Not specified'}
                </td>
                <td className="p-3">
                  {getStatusBadge(row?.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 text-sm rounded transition-colors ${
                    currentPage === pageNum
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      )}
      {/* Summary */}
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-foreground mb-2">Import Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Leads:</span>
            <span className="ml-2 font-medium text-foreground">{previewData?.length}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Residential:</span>
            <span className="ml-2 font-medium text-foreground">
              {previewData?.filter(row => row?.propertyType === 'Residential')?.length}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Commercial:</span>
            <span className="ml-2 font-medium text-foreground">
              {previewData?.filter(row => row?.propertyType === 'Commercial')?.length}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">With Budget:</span>
            <span className="ml-2 font-medium text-foreground">
              {previewData?.filter(row => row?.budgetMin || row?.budgetMax)?.length}
            </span>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          iconName="X"
          iconPosition="left"
          fullWidth
          className="sm:w-auto"
        >
          Cancel Import
        </Button>
        <Button
          variant="default"
          onClick={onConfirmImport}
          disabled={isProcessing}
          loading={isProcessing}
          iconName="Upload"
          iconPosition="left"
          fullWidth
          className="sm:flex-1"
        >
          {isProcessing ? 'Importing...' : `Import ${previewData?.length} Lead${previewData?.length !== 1 ? 's' : ''}`}
        </Button>
      </div>
    </div>
  );
};

export default DataPreview;