import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/lead-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/create-new-lead': { label: 'Add Lead', icon: 'Plus' },
    '/lead-details-view': { label: 'Lead Details', icon: 'Eye' },
    '/edit-lead-information': { label: 'Edit Lead', icon: 'Edit' },
    '/csv-import-management': { label: 'Import Data', icon: 'Upload' },
    '/authentication-login': { label: 'Login', icon: 'LogIn' }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location?.pathname !== '/lead-dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/lead-dashboard',
        icon: 'LayoutDashboard',
        isClickable: true
      });
    }

    // Add current page
    const currentRoute = routeMap?.[location?.pathname];
    if (currentRoute) {
      breadcrumbs?.push({
        label: currentRoute?.label,
        path: location?.pathname,
        icon: currentRoute?.icon,
        isClickable: false
      });
    }

    // Handle special cases for lead details and edit
    if (location?.pathname === '/edit-lead-information') {
      // Insert Lead Details before Edit Lead
      const detailsBreadcrumb = breadcrumbs?.find(b => b?.label === 'Edit Lead');
      if (detailsBreadcrumb) {
        breadcrumbs?.splice(-1, 0, {
          label: 'Lead Details',
          path: '/lead-details-view',
          icon: 'Eye',
          isClickable: true
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  // Don't show breadcrumbs on login page or if only one item
  if (location?.pathname === '/authentication-login' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <div key={crumb?.path} className="flex items-center">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="mx-2 text-muted-foreground" />
          )}
          
          {crumb?.isClickable ? (
            <button
              onClick={() => handleBreadcrumbClick(crumb?.path)}
              className="flex items-center space-x-1 hover:text-foreground transition-hover rounded px-1 py-0.5 hover:bg-muted"
            >
              <Icon name={crumb?.icon} size={14} />
              <span className="hidden sm:inline">{crumb?.label}</span>
              <span className="sm:hidden">
                {crumb?.label?.length > 8 ? `${crumb?.label?.substring(0, 8)}...` : crumb?.label}
              </span>
            </button>
          ) : (
            <div className="flex items-center space-x-1 text-foreground font-medium">
              <Icon name={crumb?.icon} size={14} />
              <span className="hidden sm:inline">{crumb?.label}</span>
              <span className="sm:hidden">
                {crumb?.label?.length > 8 ? `${crumb?.label?.substring(0, 8)}...` : crumb?.label}
              </span>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;