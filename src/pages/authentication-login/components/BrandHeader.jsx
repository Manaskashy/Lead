import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandHeader = () => {
  return (
    <div className="text-center mb-12">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mr-4 card-shadow">
          <Icon name="TrendingUp" size={32} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-3xl font-bold text-foreground font-heading">
            BuyerLeadPro
          </h1>
          <p className="text-muted-foreground text-sm">
            Real Estate Lead Management
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Streamline Your Real Estate Success
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Join thousands of real estate professionals across Punjab who trust BuyerLeadPro 
          to manage their buyer leads, track conversions, and grow their business with 
          intelligent automation and comprehensive analytics.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-3">
            <Icon name="Users" size={24} className="text-success" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Lead Management</h3>
          <p className="text-sm text-muted-foreground">
            Capture, organize, and track buyer leads efficiently
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
            <Icon name="BarChart3" size={24} className="text-accent" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Track performance and conversion rates
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-3">
            <Icon name="Zap" size={24} className="text-warning" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Automation</h3>
          <p className="text-sm text-muted-foreground">
            Automate follow-ups and lead nurturing
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandHeader;