import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const FormActions = ({ isSubmitting, onSubmit, hasErrors }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/lead-dashboard');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="sm:w-auto w-full"
        >
          Cancel
        </Button>
        
        <Button
          variant="default"
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={hasErrors}
          iconName="Save"
          iconPosition="left"
          className="sm:w-auto w-full"
        >
          {isSubmitting ? 'Saving Lead...' : 'Save Lead'}
        </Button>
      </div>
      
      {hasErrors && (
        <p className="text-sm text-error mt-3 text-center sm:text-right">
          Please fix the errors above before submitting
        </p>
      )}
    </div>
  );
};

export default FormActions;