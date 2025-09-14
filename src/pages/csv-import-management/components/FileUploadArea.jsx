import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadArea = ({ onFileSelect, isProcessing, selectedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      const file = files?.[0];
      if (file?.type === 'text/csv' || file?.name?.endsWith('.csv')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInputChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Upload CSV File</h2>
        <p className="text-sm text-muted-foreground">
          Upload your lead data in CSV format. Maximum 200 rows allowed per import.
        </p>
      </div>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-primary bg-primary/5' 
            : selectedFile 
              ? 'border-success bg-success/5' :'border-border hover:border-primary/50'
          }
          ${isProcessing ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isProcessing}
        />

        {selectedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="FileCheck" size={32} className="text-success" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">{selectedFile?.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(selectedFile?.size)} • CSV File
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleBrowseClick}
              disabled={isProcessing}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Choose Different File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={32} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drag and drop your CSV file here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse and select a file
              </p>
              <Button
                variant="outline"
                onClick={handleBrowseClick}
                disabled={isProcessing}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Browse Files
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* File Requirements */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          File Requirements
        </h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• File format: CSV (.csv)</li>
          <li>• Maximum file size: 5MB</li>
          <li>• Maximum rows: 200</li>
          <li>• Required columns: fullName, email, phone, city</li>
          <li>• Optional columns: propertyType, bhk, purpose, budgetMin, budgetMax, timeline, source, notes, tags</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadArea;