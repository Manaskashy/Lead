import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const complianceBadges = [
    {
      id: 1,
      name: "RERA Compliant",
      icon: "Shield",
      description: "Real Estate Regulatory Authority certified"
    },
    {
      id: 2,
      name: "Data Secure",
      icon: "Lock",
      description: "ISO 27001 certified data protection"
    },
    {
      id: 3,
      name: "Privacy First",
      icon: "Eye",
      description: "GDPR & Indian privacy law compliant"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Sales Manager",
      company: "Punjab Properties",
      location: "Chandigarh",
      content: "BuyerLeadPro has transformed our lead management process. We\'ve seen a 40% increase in conversion rates since implementation.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Real Estate Consultant",
      company: "Mohali Realty",
      location: "Mohali",
      content: "The CSV import feature saved us hours of manual data entry. The system is intuitive and perfectly suited for Indian real estate.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    }
  ];

  const stats = [
    { label: "Active Users", value: "2,500+", icon: "Users" },
    { label: "Leads Managed", value: "50,000+", icon: "TrendingUp" },
    { label: "Cities Covered", value: "25+", icon: "MapPin" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Compliance Badges */}
      <div className="bg-card rounded-lg border border-border card-shadow p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Trusted & Compliant
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {complianceBadges?.map((badge) => (
            <div key={badge?.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={badge?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{badge?.name}</p>
                <p className="text-xs text-muted-foreground">{badge?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border card-shadow p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name={stat?.icon} size={24} className="text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="bg-card rounded-lg border border-border card-shadow p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
          What Our Users Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="space-y-4">
              <div className="flex items-center space-x-1">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                ))}
              </div>
              <blockquote className="text-muted-foreground italic">
                "{testimonial?.content}"
              </blockquote>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div>
                  <p className="font-medium text-foreground text-sm">{testimonial?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial?.role} at {testimonial?.company}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {testimonial?.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Regional Focus */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Built for Indian Real Estate
          </h3>
          <p className="text-muted-foreground mb-4">
            Designed specifically for Punjab region with local compliance and currency support
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Icon name="MapPin" size={16} className="mr-2" />
              Punjab Focus
            </div>
            <div className="flex items-center">
              <Icon name="IndianRupee" size={16} className="mr-2" />
              ₹ Currency
            </div>
            <div className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              DD/MM/YYYY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;