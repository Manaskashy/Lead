import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/lead-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View all leads and analytics'
    },
    {
      label: 'Add Lead',
      path: '/create-new-lead',
      icon: 'Plus',
      tooltip: 'Create a new lead'
    },
    {
      label: 'Import',
      path: '/csv-import-management',
      icon: 'Upload',
      tooltip: 'Import leads from CSV'
    }
  ];

  const secondaryItems = [
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      tooltip: 'Application settings'
    },
    {
      label: 'Help',
      path: '/help',
      icon: 'HelpCircle',
      tooltip: 'Get help and support'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border card-shadow">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div 
            className="flex items-center cursor-pointer transition-hover hover:opacity-80"
            onClick={() => handleNavigation('/lead-dashboard')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground font-heading">
                BuyerLeadPro
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative group">
              <button
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center px-4 py-2 rounded-interactive text-sm font-medium transition-hover
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={16} className="mr-2" />
                {item?.label}
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-modal opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                {item?.tooltip}
              </div>
            </div>
          ))}

          {/* More Menu */}
          <div className="relative group">
            <button className="flex items-center px-4 py-2 rounded-interactive text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-hover">
              <Icon name="MoreHorizontal" size={16} className="mr-2" />
              More
            </button>
            
            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {secondaryItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover first:rounded-t-lg last:rounded-b-lg"
                >
                  <Icon name={item?.icon} size={16} className="mr-3" />
                  {item?.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-interactive hover:bg-muted transition-hover">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>
            
            {/* Profile Dropdown */}
            <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium text-popover-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">john@buyerleadpro.com</p>
              </div>
              <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover">
                <Icon name="User" size={16} className="mr-3" />
                Profile
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-hover rounded-b-lg">
                <Icon name="LogOut" size={16} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="h-10 w-10"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-in-from-top">
          <div className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center w-full px-4 py-3 rounded-interactive text-sm font-medium transition-hover
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                {item?.label}
              </button>
            ))}
            
            <div className="border-t border-border pt-2 mt-4">
              {secondaryItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="flex items-center w-full px-4 py-3 rounded-interactive text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-hover"
                >
                  <Icon name={item?.icon} size={16} className="mr-3" />
                  {item?.label}
                </button>
              ))}
            </div>

            {/* Mobile Profile */}
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center px-4 py-2">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@buyerleadpro.com</p>
                </div>
              </div>
              <button className="flex items-center w-full px-4 py-3 rounded-interactive text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-hover">
                <Icon name="LogOut" size={16} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;