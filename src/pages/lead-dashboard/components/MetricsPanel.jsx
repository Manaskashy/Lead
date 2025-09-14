import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsPanel = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Leads",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      description: "Active leads in pipeline"
    },
    {
      id: 2,
      title: "Converted",
      value: "89",
      change: "+8%",
      changeType: "positive",
      icon: "TrendingUp",
      description: "This month conversions"
    },
    {
      id: 3,
      title: "Hot Leads",
      value: "156",
      change: "-3%",
      changeType: "negative",
      icon: "Flame",
      description: "Ready to purchase"
    },
    {
      id: 4,
      title: "Avg. Response",
      value: "2.4h",
      change: "+15%",
      changeType: "positive",
      icon: "Clock",
      description: "Response time"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-card rounded-lg border border-border p-6 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              metric?.changeType === 'positive' ? 'bg-success/10' : 'bg-error/10'
            }`}>
              <Icon 
                name={metric?.icon} 
                size={24} 
                color={metric?.changeType === 'positive' ? 'var(--color-success)' : 'var(--color-error)'} 
              />
            </div>
            <div className={`flex items-center text-sm font-medium ${
              metric?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={metric?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className="mr-1" 
              />
              {metric?.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{metric?.value}</h3>
            <p className="text-sm font-medium text-foreground">{metric?.title}</p>
            <p className="text-xs text-muted-foreground">{metric?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsPanel;