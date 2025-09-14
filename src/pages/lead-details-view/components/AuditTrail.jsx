import React from 'react';
import Icon from '../../../components/AppIcon';

const AuditTrail = ({ auditHistory }) => {
  const getChangeIcon = (action) => {
    const icons = {
      'created': 'Plus',
      'updated': 'Edit',
      'status_changed': 'RefreshCw',
      'assigned': 'UserPlus',
      'contacted': 'Phone',
      'note_added': 'FileText',
      'deleted': 'Trash2'
    };
    return icons?.[action] || 'Activity';
  };

  const getChangeColor = (action) => {
    const colors = {
      'created': 'text-green-600 bg-green-50',
      'updated': 'text-blue-600 bg-blue-50',
      'status_changed': 'text-purple-600 bg-purple-50',
      'assigned': 'text-orange-600 bg-orange-50',
      'contacted': 'text-indigo-600 bg-indigo-50',
      'note_added': 'text-gray-600 bg-gray-50',
      'deleted': 'text-red-600 bg-red-50'
    };
    return colors?.[action] || 'text-gray-600 bg-gray-50';
  };

  const formatFieldName = (field) => {
    return field?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase());
  };

  const formatValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (typeof value === 'number' && value > 1000) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      })?.format(value);
    }
    return String(value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="History" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground font-heading">Audit Trail</h2>
        <span className="text-sm text-muted-foreground">({auditHistory?.length} changes)</span>
      </div>
      <div className="space-y-4">
        {auditHistory?.map((entry, index) => (
          <div key={entry?.id} className="relative">
            {/* Timeline line */}
            {index < auditHistory?.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
            )}
            
            <div className="flex gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getChangeColor(entry?.action)}`}>
                <Icon name={getChangeIcon(entry?.action)} size={16} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {entry?.action?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                    </span>
                    <span className="text-sm text-muted-foreground">by {entry?.changedBy}</span>
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {new Date(entry.timestamp)?.toLocaleString('en-IN')}
                  </time>
                </div>

                {/* Changes Details */}
                {entry?.changes && entry?.changes?.length > 0 && (
                  <div className="bg-muted rounded-lg p-3 space-y-2">
                    {entry?.changes?.map((change, changeIndex) => (
                      <div key={changeIndex} className="text-sm">
                        <div className="font-medium text-foreground mb-1">
                          {formatFieldName(change?.field)}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {change?.oldValue && (
                            <>
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                                {formatValue(change?.oldValue)}
                              </span>
                              <Icon name="ArrowRight" size={12} />
                            </>
                          )}
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {formatValue(change?.newValue)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                {entry?.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {entry?.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {auditHistory?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No audit history available</p>
        </div>
      )}
    </div>
  );
};

export default AuditTrail;