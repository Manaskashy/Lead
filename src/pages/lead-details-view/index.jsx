import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import LeadHeader from './components/LeadHeader';
import PersonalDetails from './components/PersonalDetails';
import AuditTrail from './components/AuditTrail';
import ContactHistory from './components/ContactHistory';
import FileAttachments from './components/FileAttachments';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import AssignLeadModal from './components/AssignLeadModal';

const LeadDetailsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const leadId = searchParams?.get('id') || '1';

  const [lead, setLead] = useState(null);
  const [auditHistory, setAuditHistory] = useState([]);
  const [contactHistory, setContactHistory] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock lead data
  const mockLead = {
    id: leadId,
    fullName: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+91 98765 43210",
    city: "Chandigarh",
    propertyType: "residential",
    bhkConfig: "3",
    purchasePurpose: "investment",
    budgetMin: 5000000,
    budgetMax: 8000000,
    timeline: "3-6-months",
    source: "website",
    assignedTo: "John Doe",
    status: "qualified",
    priority: "high",
    score: 85,
    tags: ["Hot Lead", "Investment", "Premium"],
    notes: `Interested in 3 BHK apartments in Sector 22, Chandigarh.\nPrefers properties with good connectivity to IT parks.\nBudget is flexible for the right property.\n\nRequirements:\n- Modern amenities\n- Parking space for 2 cars\n- Good resale value`,
    createdAt: "2024-09-10T10:30:00Z",
    lastUpdated: "2024-09-14T15:45:00Z"
  };

  const mockAuditHistory = [
    {
      id: "audit_1",
      action: "status_changed",
      changedBy: "John Doe",
      timestamp: "2024-09-14T15:45:00Z",
      changes: [
        {
          field: "status",
          oldValue: "contacted",
          newValue: "qualified"
        }
      ],
      description: "Lead qualified after successful phone conversation"
    },
    {
      id: "audit_2",
      action: "updated",
      changedBy: "John Doe",
      timestamp: "2024-09-14T14:20:00Z",
      changes: [
        {
          field: "budgetMax",
          oldValue: 7000000,
          newValue: 8000000
        },
        {
          field: "notes",
          oldValue: "Basic requirements noted",
          newValue: "Detailed requirements updated after discussion"
        }
      ],
      description: "Updated budget range and detailed requirements"
    },
    {
      id: "audit_3",
      action: "contacted",
      changedBy: "John Doe",
      timestamp: "2024-09-12T11:15:00Z",
      changes: [],
      description: "First contact made via phone call"
    },
    {
      id: "audit_4",
      action: "assigned",
      changedBy: "Sarah Wilson",
      timestamp: "2024-09-11T09:30:00Z",
      changes: [
        {
          field: "assignedTo",
          oldValue: null,
          newValue: "John Doe"
        }
      ],
      description: "Lead assigned to John Doe for follow-up"
    },
    {
      id: "audit_5",
      action: "created",
      changedBy: "System",
      timestamp: "2024-09-10T10:30:00Z",
      changes: [],
      description: "Lead created from website inquiry form"
    }
  ];

  const mockContactHistory = [
    {
      id: "contact_1",
      type: "call",
      agent: "John Doe",
      timestamp: "2024-09-14T15:30:00Z",
      duration: 25,
      status: "completed",
      description: "Discussed property requirements in detail. Client is very interested in Sector 22 properties.",
      outcome: "Qualified lead - ready for property viewing",
      nextAction: "Schedule property viewing for weekend",
      followUpDate: "2024-09-16T10:00:00Z"
    },
    {
      id: "contact_2",
      type: "email",
      agent: "John Doe",
      timestamp: "2024-09-13T16:45:00Z",
      description: "Sent property brochures and price list for 3 BHK apartments in Chandigarh",
      outcome: "Client requested more information about amenities",
      nextAction: "Follow up with detailed amenity list"
    },
    {
      id: "contact_3",
      type: "call",
      agent: "John Doe",
      timestamp: "2024-09-12T11:15:00Z",
      duration: 15,
      status: "completed",
      description: "Initial contact call to understand requirements",
      outcome: "Basic requirements captured",
      nextAction: "Send property options via email",
      followUpDate: "2024-09-13T16:00:00Z"
    },
    {
      id: "contact_4",
      type: "note",
      agent: "Sarah Wilson",
      timestamp: "2024-09-11T09:35:00Z",
      description: "Lead assigned to John Doe. Client inquiry from website contact form.",
      outcome: "Assignment completed",
      nextAction: "Initial contact within 24 hours"
    }
  ];

  const mockAttachments = [
    {
      id: "file_1",
      name: "Property_Requirements.pdf",
      type: "pdf",
      size: 245760,
      url: "https://example.com/files/property_requirements.pdf",
      uploadedBy: "John Doe",
      uploadedAt: "2024-09-13T10:30:00Z"
    },
    {
      id: "file_2",
      name: "Budget_Analysis.xlsx",
      type: "xlsx",
      size: 156432,
      url: "https://example.com/files/budget_analysis.xlsx",
      uploadedBy: "John Doe",
      uploadedAt: "2024-09-12T14:20:00Z"
    },
    {
      id: "file_3",
      name: "Client_ID_Proof.jpg",
      type: "jpg",
      size: 892160,
      url: "https://example.com/files/client_id_proof.jpg",
      uploadedBy: "Rajesh Kumar Sharma",
      uploadedAt: "2024-09-11T16:45:00Z"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadLeadData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setLead(mockLead);
        setAuditHistory(mockAuditHistory);
        setContactHistory(mockContactHistory);
        setAttachments(mockAttachments);
      } catch (error) {
        console.error('Error loading lead data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeadData();
  }, [leadId]);

  const handleEdit = () => {
    navigate(`/edit-lead-information?id=${leadId}`);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Optimistic update
      setLead(prev => ({ ...prev, status: newStatus, lastUpdated: new Date()?.toISOString() }));
      
      // Add to audit history
      const auditEntry = {
        id: `audit_${Date.now()}`,
        action: "status_changed",
        changedBy: "John Doe",
        timestamp: new Date()?.toISOString(),
        changes: [
          {
            field: "status",
            oldValue: lead?.status,
            newValue: newStatus
          }
        ],
        description: `Status changed to ${newStatus?.replace('-', ' ')}`
      };
      
      setAuditHistory(prev => [auditEntry, ...prev]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert optimistic update
      setLead(prev => ({ ...prev, status: lead?.status }));
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsDeleteModalOpen(false);
      navigate('/lead-dashboard');
    } catch (error) {
      console.error('Error deleting lead:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAssign = async (agentId, notes) => {
    setIsAssigning(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const agentName = agentId === 'unassigned' ? null : agentId?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
      
      // Update lead
      setLead(prev => ({ 
        ...prev, 
        assignedTo: agentName,
        lastUpdated: new Date()?.toISOString()
      }));
      
      // Add to audit history
      const auditEntry = {
        id: `audit_${Date.now()}`,
        action: "assigned",
        changedBy: "John Doe",
        timestamp: new Date()?.toISOString(),
        changes: [
          {
            field: "assignedTo",
            oldValue: lead?.assignedTo,
            newValue: agentName
          }
        ],
        description: notes || `Lead ${agentName ? 'assigned to ' + agentName : 'unassigned'}`
      };
      
      setAuditHistory(prev => [auditEntry, ...prev]);
      setIsAssignModalOpen(false);
      
    } catch (error) {
      console.error('Error assigning lead:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleAddNote = async (noteText) => {
    try {
      const newContact = {
        id: `contact_${Date.now()}`,
        type: "note",
        agent: "John Doe",
        timestamp: new Date()?.toISOString(),
        description: noteText,
        outcome: "Note added",
        nextAction: null
      };
      
      setContactHistory(prev => [newContact, ...prev]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleFileUpload = async (files) => {
    try {
      const newAttachments = files?.map(file => ({
        id: `file_${Date.now()}_${Math.random()}`,
        name: file?.name,
        type: file?.name?.split('.')?.pop(),
        size: file?.size,
        url: URL.createObjectURL(file),
        uploadedBy: "John Doe",
        uploadedAt: new Date()?.toISOString()
      }));
      
      setAttachments(prev => [...newAttachments, ...prev]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleFileDelete = async (fileId) => {
    try {
      setAttachments(prev => prev?.filter(file => file?.id !== fileId));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-96 bg-muted rounded"></div>
                  <div className="h-64 bg-muted rounded"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-64 bg-muted rounded"></div>
                  <div className="h-48 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-semibold text-foreground mb-2">Lead Not Found</h1>
              <p className="text-muted-foreground mb-4">The requested lead could not be found.</p>
              <button
                onClick={() => navigate('/lead-dashboard')}
                className="text-primary hover:underline"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          <LeadHeader
            lead={lead}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
            onDelete={() => setIsDeleteModalOpen(true)}
            onAssign={() => setIsAssignModalOpen(true)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <PersonalDetails lead={lead} />
              <ContactHistory 
                contactHistory={contactHistory}
                onAddNote={handleAddNote}
              />
              <FileAttachments
                attachments={attachments}
                onUpload={handleFileUpload}
                onDelete={handleFileDelete}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AuditTrail auditHistory={auditHistory} />
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        leadName={lead?.fullName}
        isDeleting={isDeleting}
      />
      <AssignLeadModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssign}
        currentAssignee={lead?.assignedTo}
        isAssigning={isAssigning}
      />
    </div>
  );
};

export default LeadDetailsView;