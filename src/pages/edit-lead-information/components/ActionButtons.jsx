import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ 
  onSave, 
  onCancel, 
  onDelete, 
  hasChanges, 
  isLoading, 
  isSaving 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6 card-shadow">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={onSave}
              disabled={!hasChanges || isLoading}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
              className="min-w-[120px]"
            >
              {isSaving ? 'Updating...' : 'Update Lead'}
            </Button>

            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
          </div>

          {/* Destructive Action */}
          <div className="flex justify-end">
            <Button
              variant="destructive"
              onClick={handleDeleteClick}
              disabled={isLoading}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Lead
            </Button>
          </div>
        </div>

        {/* Status Messages */}
        {hasChanges && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-2 text-warning" />
              <p className="text-sm text-warning">
                You have unsaved changes. Click "Update Lead" to save your modifications.
              </p>
            </div>
          </div>
        )}

        {!hasChanges && (
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center">
              <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
              <p className="text-sm text-success">
                All changes are saved. No pending modifications.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full modal-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mr-4">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Lead</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-6">
              Are you sure you want to delete this lead? All associated data, including attachments and audit history, will be permanently removed.
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleDeleteCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isLoading}
                loading={isLoading}
                iconName="Trash2"
                iconPosition="left"
              >
                {isLoading ? 'Deleting...' : 'Delete Lead'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtons;