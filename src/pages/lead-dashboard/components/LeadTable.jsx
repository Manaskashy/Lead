import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const LeadTable = ({ leads, onSort, sortConfig, onStatusUpdate, onBulkAction, selectedLeads, onSelectLead, onSelectAll }) => {
  const navigate = useNavigate();
  const [showBulkActions, setShowBulkActions] = useState(false);

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal Sent' },
    { value: 'negotiation', label: 'In Negotiation' },
    { value: 'converted', label: 'Converted' },
    { value: 'lost', label: 'Lost' }
  ];

  const bulkActionOptions = [
    { value: 'delete', label: 'Delete Selected' },
    { value: 'export', label: 'Export Selected' },
    { value: 'assign', label: 'Assign to Agent' },
    { value: 'status', label: 'Update Status' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-800', label: 'New' },
      contacted: { color: 'bg-yellow-100 text-yellow-800', label: 'Contacted' },
      qualified: { color: 'bg-green-100 text-green-800', label: 'Qualified' },
      proposal: { color: 'bg-purple-100 text-purple-800', label: 'Proposal' },
      negotiation: { color: 'bg-orange-100 text-orange-800', label: 'Negotiation' },
      converted: { color: 'bg-emerald-100 text-emerald-800', label: 'Converted' },
      lost: { color: 'bg-red-100 text-red-800', label: 'Lost' }
    };

    const config = statusConfig?.[status] || statusConfig?.new;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSort = (field) => {
    onSort(field);
  };

  const getSortIcon = (field) => {
    if (sortConfig?.field !== field) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  const handleBulkAction = (action) => {
    onBulkAction(action, selectedLeads);
    setShowBulkActions(false);
  };

  const allSelected = leads?.length > 0 && selectedLeads?.length === leads?.length;
  const someSelected = selectedLeads?.length > 0 && selectedLeads?.length < leads?.length;

  return (
    <div className="bg-card rounded-lg border border-border card-shadow">
      {/* Bulk Actions Bar */}
      {selectedLeads?.length > 0 && (
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
          <span className="text-sm font-medium text-foreground">
            {selectedLeads?.length} lead{selectedLeads?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Select
              options={bulkActionOptions}
              value=""
              onChange={handleBulkAction}
              placeholder="Bulk Actions"
              className="w-40"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectAll(false)}
              iconName="X"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-hover"
                >
                  Name
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('phone')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-hover"
                >
                  Phone
                  {getSortIcon('phone')}
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('city')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-hover"
                >
                  City
                  {getSortIcon('city')}
                </button>
              </th>
              <th className="text-left p-4">Property Type</th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('budget')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-hover"
                >
                  Budget
                  {getSortIcon('budget')}
                </button>
              </th>
              <th className="text-left p-4">Timeline</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('lastUpdated')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-hover"
                >
                  Last Updated
                  {getSortIcon('lastUpdated')}
                </button>
              </th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead) => (
              <tr key={lead?.id} className="border-t border-border hover:bg-muted/30 transition-hover">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedLeads?.includes(lead?.id)}
                    onChange={(e) => onSelectLead(lead?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {lead?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{lead?.name}</p>
                      <p className="text-sm text-muted-foreground">{lead?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-foreground">{lead?.phone}</td>
                <td className="p-4 text-foreground">{lead?.city}</td>
                <td className="p-4">
                  <span className="capitalize text-foreground">{lead?.propertyType}</span>
                </td>
                <td className="p-4 text-foreground">
                  {formatCurrency(lead?.budgetMin)} - {formatCurrency(lead?.budgetMax)}
                </td>
                <td className="p-4">
                  <span className="capitalize text-foreground">{lead?.timeline}</span>
                </td>
                <td className="p-4">
                  <Select
                    options={statusOptions}
                    value={lead?.status}
                    onChange={(value) => onStatusUpdate(lead?.id, value)}
                    className="w-32"
                  />
                </td>
                <td className="p-4 text-muted-foreground text-sm">
                  {formatDate(lead?.lastUpdated)}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/lead-details-view', { state: { leadId: lead?.id } })}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/edit-lead-information', { state: { leadId: lead?.id } })}
                      iconName="Edit"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {leads?.map((lead) => (
          <div key={lead?.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedLeads?.includes(lead?.id)}
                  onChange={(e) => onSelectLead(lead?.id, e?.target?.checked)}
                  className="rounded border-border mt-1"
                />
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {lead?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{lead?.name}</p>
                  <p className="text-sm text-muted-foreground">{lead?.email}</p>
                </div>
              </div>
              {getStatusBadge(lead?.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="text-foreground">{lead?.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">City</p>
                <p className="text-foreground">{lead?.city}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Property Type</p>
                <p className="text-foreground capitalize">{lead?.propertyType}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Timeline</p>
                <p className="text-foreground capitalize">{lead?.timeline}</p>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-muted-foreground">Budget Range</p>
              <p className="text-foreground font-medium">
                {formatCurrency(lead?.budgetMin)} - {formatCurrency(lead?.budgetMax)}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Updated: {formatDate(lead?.lastUpdated)}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/lead-details-view', { state: { leadId: lead?.id } })}
                  iconName="Eye"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/edit-lead-information', { state: { leadId: lead?.id } })}
                  iconName="Edit"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {leads?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No leads found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or add some leads to get started.
          </p>
          <Button
            onClick={() => navigate('/create-new-lead')}
            iconName="Plus"
            iconPosition="left"
          >
            Add New Lead
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeadTable;