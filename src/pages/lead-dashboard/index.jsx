import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import MetricsPanel from './components/MetricsPanel';
import FilterControls from './components/FilterControls';
import LeadTable from './components/LeadTable';
import PaginationControls from './components/PaginationControls';

const LeadDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filters, setFilters] = useState({
    city: searchParams?.get('city') || '',
    propertyType: searchParams?.get('propertyType') || '',
    status: searchParams?.get('status') || '',
    timeline: searchParams?.get('timeline') || ''
  });
  const [sortConfig, setSortConfig] = useState({
    field: searchParams?.get('sortBy') || 'lastUpdated',
    direction: searchParams?.get('sortDir') || 'desc'
  });
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams?.get('page')) || 1);
  const itemsPerPage = 10;

  // Mock data
  const mockLeads = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      city: "chandigarh",
      propertyType: "residential",
      bhk: "3",
      purpose: "investment",
      budgetMin: 5000000,
      budgetMax: 7500000,
      timeline: "short",
      status: "qualified",
      source: "website",
      notes: "Looking for ready-to-move properties in Sector 22",
      tags: ["hot-lead", "investor"],
      lastUpdated: new Date('2024-09-14T10:30:00'),
      assignedTo: "Agent 1"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      city: "mohali",
      propertyType: "residential",
      bhk: "2",
      purpose: "self-use",
      budgetMin: 3500000,
      budgetMax: 4500000,
      timeline: "immediate",
      status: "new",
      source: "referral",
      notes: "First-time buyer, needs guidance on home loan",
      tags: ["first-time-buyer"],
      lastUpdated: new Date('2024-09-14T09:15:00'),
      assignedTo: "Agent 2"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit.singh@email.com",
      phone: "+91 76543 21098",
      city: "zirakpur",
      propertyType: "commercial",
      purpose: "investment",
      budgetMin: 10000000,
      budgetMax: 15000000,
      timeline: "medium",
      status: "contacted",
      source: "social-media",
      notes: "Looking for retail space near highway",
      tags: ["commercial", "high-value"],
      lastUpdated: new Date('2024-09-13T16:45:00'),
      assignedTo: "Agent 1"
    },
    {
      id: 4,
      name: "Sunita Gupta",
      email: "sunita.gupta@email.com",
      phone: "+91 65432 10987",
      city: "panchkula",
      propertyType: "residential",
      bhk: "4",
      purpose: "self-use",
      budgetMin: 8000000,
      budgetMax: 12000000,
      timeline: "long",
      status: "proposal",
      source: "walk-in",
      notes: "Prefers ground floor with garden",
      tags: ["luxury", "specific-requirements"],
      lastUpdated: new Date('2024-09-13T14:20:00'),
      assignedTo: "Agent 3"
    },
    {
      id: 5,
      name: "Vikram Mehta",
      email: "vikram.mehta@email.com",
      phone: "+91 54321 09876",
      city: "chandigarh",
      propertyType: "residential",
      bhk: "1",
      purpose: "investment",
      budgetMin: 2500000,
      budgetMax: 3500000,
      timeline: "short",
      status: "negotiation",
      source: "advertisement",
      notes: "Looking for rental yield properties",
      tags: ["investor", "rental-yield"],
      lastUpdated: new Date('2024-09-12T11:30:00'),
      assignedTo: "Agent 2"
    },
    {
      id: 6,
      name: "Neha Agarwal",
      email: "neha.agarwal@email.com",
      phone: "+91 43210 98765",
      city: "mohali",
      propertyType: "residential",
      bhk: "3",
      purpose: "self-use",
      budgetMin: 6000000,
      budgetMax: 8000000,
      timeline: "immediate",
      status: "converted",
      source: "referral",
      notes: "Successfully purchased 3BHK in Phase 8",
      tags: ["converted", "satisfied-customer"],
      lastUpdated: new Date('2024-09-11T15:45:00'),
      assignedTo: "Agent 1"
    },
    {
      id: 7,
      name: "Rohit Kapoor",
      email: "rohit.kapoor@email.com",
      phone: "+91 32109 87654",
      city: "zirakpur",
      propertyType: "industrial",
      purpose: "business",
      budgetMin: 20000000,
      budgetMax: 30000000,
      timeline: "medium",
      status: "qualified",
      source: "website",
      notes: "Manufacturing unit requirement",
      tags: ["industrial", "manufacturing"],
      lastUpdated: new Date('2024-09-11T09:20:00'),
      assignedTo: "Agent 3"
    },
    {
      id: 8,
      name: "Kavita Jain",
      email: "kavita.jain@email.com",
      phone: "+91 21098 76543",
      city: "panchkula",
      propertyType: "residential",
      bhk: "2",
      purpose: "self-use",
      budgetMin: 4000000,
      budgetMax: 5500000,
      timeline: "short",
      status: "lost",
      source: "cold-call",
      notes: "Found better deal elsewhere",
      tags: ["lost-to-competitor"],
      lastUpdated: new Date('2024-09-10T13:10:00'),
      assignedTo: "Agent 2"
    },
    {
      id: 9,
      name: "Manish Verma",
      email: "manish.verma@email.com",
      phone: "+91 10987 65432",
      city: "chandigarh",
      propertyType: "commercial",
      purpose: "investment",
      budgetMin: 15000000,
      budgetMax: 25000000,
      timeline: "long",
      status: "new",
      source: "website",
      notes: "Office space for IT company",
      tags: ["commercial", "it-sector"],
      lastUpdated: new Date('2024-09-10T08:30:00'),
      assignedTo: "Agent 1"
    },
    {
      id: 10,
      name: "Deepika Rani",
      email: "deepika.rani@email.com",
      phone: "+91 09876 54321",
      city: "mohali",
      propertyType: "residential",
      bhk: "4",
      purpose: "self-use",
      budgetMin: 9000000,
      budgetMax: 12000000,
      timeline: "immediate",
      status: "contacted",
      source: "referral",
      notes: "Urgent requirement due to job transfer",
      tags: ["urgent", "job-transfer"],
      lastUpdated: new Date('2024-09-09T17:15:00'),
      assignedTo: "Agent 3"
    },
    {
      id: 11,
      name: "Arjun Malhotra",
      email: "arjun.malhotra@email.com",
      phone: "+91 98765 43211",
      city: "zirakpur",
      propertyType: "residential",
      bhk: "3",
      purpose: "investment",
      budgetMin: 5500000,
      budgetMax: 7000000,
      timeline: "medium",
      status: "qualified",
      source: "social-media",
      notes: "Second home for weekend getaways",
      tags: ["second-home", "weekend"],
      lastUpdated: new Date('2024-09-09T12:45:00'),
      assignedTo: "Agent 2"
    },
    {
      id: 12,
      name: "Sonia Bhatia",
      email: "sonia.bhatia@email.com",
      phone: "+91 87654 32110",
      city: "panchkula",
      propertyType: "agricultural",
      purpose: "investment",
      budgetMin: 3000000,
      budgetMax: 5000000,
      timeline: "long",
      status: "proposal",
      source: "walk-in",
      notes: "Farmhouse with agricultural land",
      tags: ["agricultural", "farmhouse"],
      lastUpdated: new Date('2024-09-08T14:30:00'),
      assignedTo: "Agent 1"
    }
  ];

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearchTerm) params?.set('search', debouncedSearchTerm);
    if (filters?.city) params?.set('city', filters?.city);
    if (filters?.propertyType) params?.set('propertyType', filters?.propertyType);
    if (filters?.status) params?.set('status', filters?.status);
    if (filters?.timeline) params?.set('timeline', filters?.timeline);
    if (sortConfig?.field !== 'lastUpdated') params?.set('sortBy', sortConfig?.field);
    if (sortConfig?.direction !== 'desc') params?.set('sortDir', sortConfig?.direction);
    if (currentPage !== 1) params?.set('page', currentPage?.toString());

    setSearchParams(params);
  }, [debouncedSearchTerm, filters, sortConfig, currentPage, setSearchParams]);

  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = mockLeads?.filter(lead => {
      // Search filter
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm?.toLowerCase();
        const matchesSearch = 
          lead?.name?.toLowerCase()?.includes(searchLower) ||
          lead?.phone?.toLowerCase()?.includes(searchLower) ||
          lead?.email?.toLowerCase()?.includes(searchLower);
        if (!matchesSearch) return false;
      }

      // City filter
      if (filters?.city && lead?.city !== filters?.city) return false;
      
      // Property type filter
      if (filters?.propertyType && lead?.propertyType !== filters?.propertyType) return false;
      
      // Status filter
      if (filters?.status && lead?.status !== filters?.status) return false;
      
      // Timeline filter
      if (filters?.timeline && lead?.timeline !== filters?.timeline) return false;

      return true;
    });

    // Sort leads
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.field];
      let bValue = b?.[sortConfig?.field];

      if (sortConfig?.field === 'lastUpdated') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortConfig?.field === 'budget') {
        aValue = a?.budgetMin;
        bValue = b?.budgetMin;
      } else if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [mockLeads, debouncedSearchTerm, filters, sortConfig]);

  // Paginate leads
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedLeads?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedLeads, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedLeads?.length / itemsPerPage);

  // Initialize data
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 500);
  }, []);

  // Event handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      city: '',
      propertyType: '',
      status: '',
      timeline: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev?.field === field && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleStatusUpdate = (leadId, newStatus) => {
    setLeads(prev => prev?.map(lead => 
      lead?.id === leadId 
        ? { ...lead, status: newStatus, lastUpdated: new Date() }
        : lead
    ));
  };

  const handleSelectLead = (leadId, selected) => {
    setSelectedLeads(prev => 
      selected 
        ? [...prev, leadId]
        : prev?.filter(id => id !== leadId)
    );
  };

  const handleSelectAll = (selected) => {
    setSelectedLeads(selected ? paginatedLeads?.map(lead => lead?.id) : []);
  };

  const handleBulkAction = (action, leadIds) => {
    console.log('Bulk action:', action, 'for leads:', leadIds);
    // Implement bulk actions here
    setSelectedLeads([]);
  };

  const handleExport = () => {
    console.log('Exporting leads with current filters');
    // Implement CSV export
  };

  const handleImport = () => {
    navigate('/csv-import-management');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading leads...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Lead Dashboard - BuyerLeadPro</title>
        <meta name="description" content="Comprehensive lead management dashboard for real estate professionals. Track, filter, and manage buyer leads efficiently." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Lead Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage and track your real estate buyer leads efficiently
                </p>
              </div>
              
              <Button
                onClick={() => navigate('/create-new-lead')}
                iconName="Plus"
                iconPosition="left"
                className="shrink-0"
              >
                Add New Lead
              </Button>
            </div>

            {/* Metrics Panel */}
            <MetricsPanel />

            {/* Filter Controls */}
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onClearFilters={handleClearFilters}
              onExport={handleExport}
              onImport={handleImport}
            />

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedLeads?.length} lead{filteredAndSortedLeads?.length !== 1 ? 's' : ''} found
                {(debouncedSearchTerm || Object.values(filters)?.some(Boolean)) && (
                  <span> (filtered from {mockLeads?.length} total)</span>
                )}
              </p>
              
              {selectedLeads?.length > 0 && (
                <p className="text-sm font-medium text-primary">
                  {selectedLeads?.length} selected
                </p>
              )}
            </div>

            {/* Lead Table */}
            <LeadTable
              leads={paginatedLeads}
              onSort={handleSort}
              sortConfig={sortConfig}
              onStatusUpdate={handleStatusUpdate}
              onBulkAction={handleBulkAction}
              selectedLeads={selectedLeads}
              onSelectLead={handleSelectLead}
              onSelectAll={handleSelectAll}
            />

            {/* Pagination */}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSortedLeads?.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDashboard;