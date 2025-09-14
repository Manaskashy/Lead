import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AuthenticationLogin from './pages/authentication-login';
import EditLeadInformation from './pages/edit-lead-information';
import LeadDetailsView from './pages/lead-details-view';
import CSVImportManagement from './pages/csv-import-management';
import LeadDashboard from './pages/lead-dashboard';
import CreateNewLead from './pages/create-new-lead';
import AuthCallback from './pages/auth/callback';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationLogin />} />
        <Route path="/authentication-login" element={<AuthenticationLogin />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/edit-lead-information" element={<EditLeadInformation />} />
        <Route path="/lead-details-view" element={<LeadDetailsView />} />
        <Route path="/csv-import-management" element={<CSVImportManagement />} />
        <Route path="/lead-dashboard" element={<LeadDashboard />} />
        <Route path="/create-new-lead" element={<CreateNewLead />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
