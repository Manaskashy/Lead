import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AssignLeadModal = ({ isOpen, onClose, onAssign, currentAssignee, isAssigning }) => {
  const [selectedAgent, setSelectedAgent] = useState(currentAssignee || '');
  const [notes, setNotes] = useState('');

  const agents = [
    { value: 'john-doe', label: 'John Doe', description: 'Senior Sales Agent' },
    { value: 'jane-smith', label: 'Jane Smith', description: 'Property Consultant' },
    { value: 'mike-johnson', label: 'Mike Johnson', description: 'Lead Sales Manager' },
    { value: 'sarah-wilson', label: 'Sarah Wilson', description: 'Real Estate Specialist' },
    { value: 'david-brown', label: 'David Brown', description: 'Senior Consultant' },
    { value: 'unassigned', label: 'Unassigned', description: 'Remove current assignment' }
  ];

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleAssign = () => {
    onAssign(selectedAgent, notes);
  };

  const handleClose = () => {
    setSelectedAgent(currentAssignee || '');
    setNotes('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md modal-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="UserPlus" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground font-heading">Assign Lead</h3>
            <p className="text-sm text-muted-foreground">Change lead assignment</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <Select
            label="Assign to Agent"
            description="Select an agent to handle this lead"
            options={agents}
            value={selectedAgent}
            onChange={setSelectedAgent}
            searchable
            required
            placeholder="Choose an agent..."
          />

          <Input
            label="Assignment Notes"
            type="text"
            placeholder="Add notes about this assignment (optional)"
            value={notes}
            onChange={(e) => setNotes(e?.target?.value)}
            description="These notes will be added to the lead's history"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isAssigning}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleAssign}
            loading={isAssigning}
            iconName="UserPlus"
            iconPosition="left"
            disabled={!selectedAgent}
          >
            {isAssigning ? 'Assigning...' : 'Assign Lead'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignLeadModal;