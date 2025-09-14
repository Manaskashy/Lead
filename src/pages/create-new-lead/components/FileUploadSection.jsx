import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadSection = ({ formData, handleFileChange }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileChange(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileChange(e?.target?.files?.[0]);
    }
  };

  const removeFile = () => {
    handleFileChange(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Supporting Documents</h3>
      {!formData?.attachments ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
          </p>
          
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
          />
          
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
            iconName="Upload"
            iconPosition="left"
          >
            Choose File
          </Button>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {formData?.attachments?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(formData?.attachments?.size)}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-muted-foreground hover:text-error"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-3">
        Upload relevant documents like property brochures, financial documents, or identification proofs.
      </p>
    </div>
  );
};

export default FileUploadSection;