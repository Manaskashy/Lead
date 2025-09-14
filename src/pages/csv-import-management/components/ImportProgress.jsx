import React from 'react';
import Icon from '../../../components/AppIcon';

const ImportProgress = ({ progress, isProcessing, currentStep, totalSteps }) => {
  if (!isProcessing && !progress) return null;

  const steps = [
    { id: 1, name: 'File Upload', icon: 'Upload' },
    { id: 2, name: 'Validation', icon: 'CheckCircle' },
    { id: 3, name: 'Data Preview', icon: 'Eye' },
    { id: 4, name: 'Import', icon: 'Database' },
    { id: 5, name: 'Complete', icon: 'Check' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'Check';
    if (status === 'current' && isProcessing) return 'Loader';
    return step?.icon;
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'current':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Import Progress</h2>
        <p className="text-sm text-muted-foreground">
          {isProcessing ? 'Processing your import...' : 'Import workflow status'}
        </p>
      </div>
      {/* Progress Steps */}
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isLast = index === steps?.length - 1;
            
            return (
              <div key={step?.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${getStepClasses(status)}
                    ${status === 'current' && isProcessing ? 'animate-pulse' : ''}
                  `}>
                    <Icon 
                      name={getStepIcon(step, status)} 
                      size={20} 
                      className={status === 'current' && isProcessing ? 'animate-spin' : ''}
                    />
                  </div>
                  <span className={`
                    text-xs mt-2 font-medium text-center
                    ${status === 'completed' ? 'text-success' : 
                      status === 'current' ? 'text-primary' : 'text-muted-foreground'}
                  `}>
                    {step?.name}
                  </span>
                </div>
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`
                      h-0.5 transition-all duration-300
                      ${status === 'completed' ? 'bg-success' : 'bg-muted'}
                    `}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Progress Bar */}
      {progress && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {progress?.message || 'Processing...'}
            </span>
            <span className="text-sm font-medium text-foreground">
              {progress?.percentage}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress?.percentage}%` }}
            ></div>
          </div>
          {progress?.details && (
            <p className="text-xs text-muted-foreground mt-2">
              {progress?.details}
            </p>
          )}
        </div>
      )}
      {/* Current Activity */}
      {isProcessing && (
        <div className="flex items-center space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <Icon name="Loader" size={20} className="text-primary animate-spin" />
          <div>
            <h3 className="font-medium text-primary">Processing Import</h3>
            <p className="text-sm text-primary/80">
              Please wait while we process your data. This may take a few moments.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportProgress;