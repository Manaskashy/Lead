import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const FilterControls = ({ 
  filters, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  onClearFilters,
  onExport,
  onImport 
}) => {
  const cityOptions = [
    { value: '', label: 'All Cities' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'mohali', label: 'Mohali' },
    { value: 'zirakpur', label: 'Zirakpur' },
    { value: 'panchkula', label: 'Panchkula' }
  ];

  const propertyTypeOptions = [
    { value: '', label: 'All Property Types' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'agricultural', label: 'Agricultural' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal Sent' },
    { value: 'negotiation', label: 'In Negotiation' },
    { value: 'converted', label: 'Converted' },
    { value: 'lost', label: 'Lost' }
  ];

  const timelineOptions = [
    { value: '', label: 'All Timelines' },
    { value: 'immediate', label: 'Immediate (0-1 months)' },
    { value: 'short', label: 'Short Term (1-3 months)' },
    { value: 'medium', label: 'Medium Term (3-6 months)' },
    { value: 'long', label: 'Long Term (6+ months)' }
  ];

  const hasActiveFilters = filters?.city || filters?.propertyType || filters?.status || filters?.timeline || searchTerm;

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow mb-6">
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by name, phone, or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="max-w-md"
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="City"
          options={cityOptions}
          value={filters?.city}
          onChange={(value) => onFilterChange('city', value)}
          placeholder="Select city"
        />

        <Select
          label="Property Type"
          options={propertyTypeOptions}
          value={filters?.propertyType}
          onChange={(value) => onFilterChange('propertyType', value)}
          placeholder="Select property type"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Select status"
        />

        <Select
          label="Timeline"
          options={timelineOptions}
          value={filters?.timeline}
          onChange={(value) => onFilterChange('timeline', value)}
          placeholder="Select timeline"
        />
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onImport}
            iconName="Upload"
            iconPosition="left"
          >
            Import CSV
          </Button>
          
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;