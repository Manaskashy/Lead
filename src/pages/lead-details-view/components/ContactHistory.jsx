import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactHistory = ({ contactHistory, onAddNote }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  const getContactIcon = (type) => {
    const icons = {
      'call': 'Phone',
      'email': 'Mail',
      'meeting': 'Users',
      'note': 'FileText',
      'sms': 'MessageSquare',
      'whatsapp': 'MessageCircle',
      'follow_up': 'Clock'
    };
    return icons?.[type] || 'Activity';
  };

  const getContactColor = (type) => {
    const colors = {
      'call': 'text-green-600 bg-green-50',
      'email': 'text-blue-600 bg-blue-50',
      'meeting': 'text-purple-600 bg-purple-50',
      'note': 'text-gray-600 bg-gray-50',
      'sms': 'text-orange-600 bg-orange-50',
      'whatsapp': 'text-emerald-600 bg-emerald-50',
      'follow_up': 'text-yellow-600 bg-yellow-50'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-50';
  };

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onAddNote(newNote?.trim());
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground font-heading">Contact History</h2>
          <span className="text-sm text-muted-foreground">({contactHistory?.length} interactions)</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setIsAddingNote(true)}
        >
          Add Note
        </Button>
      </div>
      {/* Add Note Form */}
      {isAddingNote && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <Input
            label="Add a note"
            type="text"
            placeholder="Enter your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e?.target?.value)}
            className="mb-3"
          />
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleAddNote}
              disabled={!newNote?.trim()}
            >
              Save Note
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsAddingNote(false);
                setNewNote('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {contactHistory?.map((contact, index) => (
          <div key={contact?.id} className="relative">
            {/* Timeline line */}
            {index < contactHistory?.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
            )}
            
            <div className="flex gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getContactColor(contact?.type)}`}>
                <Icon name={getContactIcon(contact?.type)} size={16} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {contact?.type?.replace('_', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                    </span>
                    {contact?.duration && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {formatDuration(contact?.duration)}
                      </span>
                    )}
                    {contact?.status && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        contact?.status === 'completed' ? 'bg-green-100 text-green-800' :
                        contact?.status === 'missed'? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {contact?.status}
                      </span>
                    )}
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {new Date(contact.timestamp)?.toLocaleString('en-IN')}
                  </time>
                </div>

                {/* Contact Details */}
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-foreground mb-2">{contact?.description}</p>
                  
                  {contact?.outcome && (
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Outcome: </span>
                      <span className="text-muted-foreground">{contact?.outcome}</span>
                    </div>
                  )}

                  {contact?.nextAction && (
                    <div className="text-sm mt-1">
                      <span className="font-medium text-foreground">Next Action: </span>
                      <span className="text-muted-foreground">{contact?.nextAction}</span>
                    </div>
                  )}

                  {contact?.followUpDate && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-warning">
                      <Icon name="Clock" size={14} />
                      <span>Follow up: {new Date(contact.followUpDate)?.toLocaleDateString('en-IN')}</span>
                    </div>
                  )}
                </div>

                <div className="text-xs text-muted-foreground mt-2">
                  by {contact?.agent}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {contactHistory?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No contact history available</p>
          <p className="text-sm text-muted-foreground">Start by adding a note or making contact with this lead</p>
        </div>
      )}
    </div>
  );
};

export default ContactHistory;