import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, leadName, isDeleting }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md modal-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={24} className="text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground font-heading">Delete Lead</h3>
            <p className="text-sm text-muted-foreground">This action cannot be undone</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-foreground mb-2">
            Are you sure you want to delete the lead for <strong>{leadName}</strong>?
          </p>
          <p className="text-sm text-muted-foreground">
            This will permanently remove all lead information, contact history, and attached files.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isDeleting}
            iconName="Trash2"
            iconPosition="left"
          >
            {isDeleting ? 'Deleting...' : 'Delete Lead'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;