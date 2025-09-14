import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationResults = ({ 
  validationResults, 
  onDownloadErrorReport, 
  onRetry, 
  isProcessing 
}) => {
  if (!validationResults) return null;

  const { 
    totalRows, 
    validRows, 
    errorRows, 
    duplicateRows, 
    errors, 
    warnings,
    processedAt 
  } = validationResults;

  const hasErrors = errorRows > 0;
  const hasWarnings = warnings && warnings?.length > 0;
  const successRate = totalRows > 0 ? ((validRows / totalRows) * 100)?.toFixed(1) : 0;

  const downloadErrorReport = () => {
    if (!errors || errors?.length === 0) return;

    const csvContent = [
      'Row,Field,Error,Value',
      ...errors?.map(error => 
        `${error?.row},"${error?.field}","${error?.message}","${error?.value || ''}"`
      )
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link?.setAttribute('href', url);
    link?.setAttribute('download', `validation_errors_${new Date()?.toISOString()?.split('T')?.[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Validation Results</h2>
          <p className="text-sm text-muted-foreground">
            Processed on {new Date(processedAt)?.toLocaleString('en-IN')}
          </p>
        </div>
        {hasErrors && (
          <Button
            variant="outline"
            onClick={downloadErrorReport}
            iconName="Download"
            iconPosition="left"
            size="sm"
          >
            Download Error Report
          </Button>
        )}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{totalRows}</div>
          <div className="text-sm text-muted-foreground">Total Rows</div>
        </div>
        <div className="bg-success/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">{validRows}</div>
          <div className="text-sm text-muted-foreground">Valid Rows</div>
        </div>
        <div className="bg-error/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-error">{errorRows}</div>
          <div className="text-sm text-muted-foreground">Error Rows</div>
        </div>
        <div className="bg-warning/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">{duplicateRows}</div>
          <div className="text-sm text-muted-foreground">Duplicates</div>
        </div>
      </div>
      {/* Success Rate */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Success Rate</span>
          <span className="text-sm font-medium text-foreground">{successRate}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              successRate >= 80 ? 'bg-success' : 
              successRate >= 60 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${successRate}%` }}
          ></div>
        </div>
      </div>
      {/* Status Message */}
      {hasErrors ? (
        <div className="flex items-start space-x-3 p-4 bg-error/10 border border-error/20 rounded-lg mb-6">
          <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-error mb-1">Validation Failed</h3>
            <p className="text-sm text-error/80">
              {errorRows} row{errorRows !== 1 ? 's' : ''} contain{errorRows === 1 ? 's' : ''} errors that must be fixed before import.
              {duplicateRows > 0 && ` ${duplicateRows} duplicate${duplicateRows !== 1 ? 's' : ''} detected.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start space-x-3 p-4 bg-success/10 border border-success/20 rounded-lg mb-6">
          <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-success mb-1">Validation Successful</h3>
            <p className="text-sm text-success/80">
              All {validRows} row{validRows !== 1 ? 's' : ''} passed validation and {validRows === 1 ? 'is' : 'are'} ready for import.
              {duplicateRows > 0 && ` ${duplicateRows} duplicate${duplicateRows !== 1 ? 's' : ''} will be skipped.`}
            </p>
          </div>
        </div>
      )}
      {/* Warnings */}
      {hasWarnings && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="text-warning mr-2" />
            Warnings ({warnings?.length})
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {warnings?.map((warning, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 bg-warning/10 rounded">
                <span className="text-xs font-medium text-warning bg-warning/20 px-2 py-0.5 rounded">
                  Row {warning?.row}
                </span>
                <span className="text-sm text-warning/80">{warning?.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Error Details */}
      {hasErrors && errors && errors?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="XCircle" size={18} className="text-error mr-2" />
            Errors ({errors?.length})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {errors?.slice(0, 20)?.map((error, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-error/5 border border-error/10 rounded-lg">
                <span className="text-xs font-medium text-error bg-error/20 px-2 py-0.5 rounded flex-shrink-0">
                  Row {error?.row}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-foreground text-sm">{error?.field}</span>
                    {error?.value && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded font-data">
                        "{error?.value}"
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-error/80">{error?.message}</p>
                </div>
              </div>
            ))}
            {errors?.length > 20 && (
              <div className="text-center py-2">
                <span className="text-sm text-muted-foreground">
                  ... and {errors?.length - 20} more errors. Download the full report for details.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onRetry}
          disabled={isProcessing}
          iconName="RefreshCw"
          iconPosition="left"
          fullWidth
          className="sm:w-auto"
        >
          Upload Different File
        </Button>
        {hasErrors && (
          <Button
            variant="outline"
            onClick={downloadErrorReport}
            iconName="Download"
            iconPosition="left"
            fullWidth
            className="sm:w-auto"
          >
            Download Error Report
          </Button>
        )}
      </div>
    </div>
  );
};

export default ValidationResults;