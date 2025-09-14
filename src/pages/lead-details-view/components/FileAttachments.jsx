import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileAttachments = ({ attachments, onUpload, onDelete }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const getFileIcon = (fileType) => {
    const icons = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'xls': 'FileSpreadsheet',
      'xlsx': 'FileSpreadsheet',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'mp4': 'Video',
      'avi': 'Video',
      'mov': 'Video',
      'zip': 'Archive',
      'rar': 'Archive'
    };
    return icons?.[fileType?.toLowerCase()] || 'File';
  };

  const getFileColor = (fileType) => {
    const colors = {
      'pdf': 'text-red-600 bg-red-50',
      'doc': 'text-blue-600 bg-blue-50',
      'docx': 'text-blue-600 bg-blue-50',
      'xls': 'text-green-600 bg-green-50',
      'xlsx': 'text-green-600 bg-green-50',
      'jpg': 'text-purple-600 bg-purple-50',
      'jpeg': 'text-purple-600 bg-purple-50',
      'png': 'text-purple-600 bg-purple-50',
      'gif': 'text-purple-600 bg-purple-50',
      'mp4': 'text-orange-600 bg-orange-50',
      'avi': 'text-orange-600 bg-orange-50',
      'mov': 'text-orange-600 bg-orange-50',
      'zip': 'text-gray-600 bg-gray-50',
      'rar': 'text-gray-600 bg-gray-50'
    };
    return colors?.[fileType?.toLowerCase()] || 'text-gray-600 bg-gray-50';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

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
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      onUpload(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      onUpload(files);
    }
  };

  const handleDownload = (attachment) => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = attachment?.url;
    link.download = attachment?.name;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Paperclip" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-heading">File Attachments</h2>
          <span className="text-sm text-muted-foreground">({attachments?.length} files)</span>
        </div>
        
        <div className="flex gap-2">
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.zip,.rar"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Upload"
            iconPosition="left"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Upload
          </Button>
        </div>
      </div>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center transition-colors ${
          isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-1">
          Drag and drop files here, or click to select
        </p>
        <p className="text-xs text-muted-foreground">
          Supports: PDF, DOC, XLS, Images, Videos, Archives (Max 10MB each)
        </p>
      </div>
      {/* File List */}
      <div className="space-y-3">
        {attachments?.map((attachment) => (
          <div key={attachment?.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            {/* File Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getFileColor(attachment?.type)}`}>
              <Icon name={getFileIcon(attachment?.type)} size={20} />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground truncate">{attachment?.name}</span>
                <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                  {attachment?.type?.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{formatFileSize(attachment?.size)}</span>
                <span>Uploaded {new Date(attachment.uploadedAt)?.toLocaleDateString('en-IN')}</span>
                <span>by {attachment?.uploadedBy}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => handleDownload(attachment)}
                title="Download file"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => window.open(attachment?.url, '_blank')}
                title="Preview file"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => onDelete(attachment?.id)}
                title="Delete file"
                className="text-destructive hover:text-destructive"
              />
            </div>
          </div>
        ))}
      </div>
      {attachments?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Paperclip" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No files attached</p>
          <p className="text-sm text-muted-foreground">Upload documents, images, or other files related to this lead</p>
        </div>
      )}
    </div>
  );
};

export default FileAttachments;