import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileAttachmentsSection = ({ 
  formData, 
  onChange, 
  isModified 
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files)?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      uploadedAt: new Date()?.toISOString(),
      file: file
    }));

    const updatedAttachments = [...(formData?.attachments || []), ...newFiles];
    onChange('attachments', updatedAttachments);
  };

  const handleFileInputChange = (e) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      handleFileUpload(e?.target?.files);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.length > 0) {
      handleFileUpload(e?.dataTransfer?.files);
    }
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeFile = (fileId) => {
    const updatedAttachments = formData?.attachments?.filter(file => file?.id !== fileId);
    onChange('attachments', updatedAttachments);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (type) => {
    if (type?.includes('image')) return 'Image';
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('document') || type?.includes('word')) return 'FileText';
    if (type?.includes('spreadsheet') || type?.includes('excel')) return 'FileSpreadsheet';
    return 'File';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">File Attachments</h3>
        {isModified && (
          <span className="ml-2 px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
            Modified
          </span>
        )}
      </div>
      {/* File Upload Area */}
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
        <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
        <h4 className="text-lg font-medium text-foreground mb-2">
          Drop files here or click to upload
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB each)
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          onChange={handleFileInputChange}
          className="hidden"
          id="file-upload"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          iconName="Plus"
          iconPosition="left"
        >
          Choose Files
        </Button>
      </div>
      {/* Attached Files List */}
      {formData?.attachments && formData?.attachments?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Attached Files ({formData?.attachments?.length})
          </h4>
          <div className="space-y-3">
            {formData?.attachments?.map((file) => (
              <div
                key={file?.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getFileIcon(file?.type)} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {file?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file?.size)} • Uploaded {new Date(file.uploadedAt)?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file?.id)}
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error/10"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileAttachmentsSection;