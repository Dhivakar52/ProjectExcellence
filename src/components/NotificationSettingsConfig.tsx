import React, { useState } from 'react';
import { ArrowLeft, Save, Edit, Bell, MessageSquare, Mail, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface NotificationSettingsConfigProps {
  onNavigate: (page: string) => void;
}

export function NotificationSettingsConfig({ onNavigate }: NotificationSettingsConfigProps) {
  const [triggerEvents, setTriggerEvents] = useState({
    surveysSent: true,
    ticketCreated: true,
    ticketReassigned: true,
    timelineExtensionRequested: true,
    escalationTriggered: true,
    ticketClosed: true
  });

  const [channels, setChannels] = useState({
    sms: true,
    email: true,
    whatsapp: true
  });

  const templates = [
    { id: 'survey-invite', name: 'Survey Invite Template', description: 'Template for survey invitation messages' },
    { id: 'ticket-created', name: 'Ticket Created Template', description: 'Template for new ticket creation notifications' },
    { id: 'escalation-alert', name: 'Escalation Alert Template', description: 'Template for escalation notifications' },
    { id: 'timeline-extension', name: 'Timeline Extension Template', description: 'Template for timeline extension requests' },
    { id: 'ticket-closed', name: 'Ticket Closed Template', description: 'Template for ticket closure notifications' }
  ];

  const handleTriggerEventChange = (event: string, checked: boolean) => {
    setTriggerEvents(prev => ({
      ...prev,
      [event]: checked
    }));
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    setChannels(prev => ({
      ...prev,
      [channel]: checked
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving notification settings:', { triggerEvents, channels });
    // Handle save logic here
    onNavigate('settings');
  };

  const handleEditTemplate = (templateId: string) => {
    console.log('Edit template:', templateId);
    // Handle template editing
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('settings')}
          className="mr-4 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-medium">Notification Settings</h1>
          <p className="text-sm text-gray-600 mt-1">Configure notification triggers, channels, and templates</p>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Trigger Events Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-blue-600" />
              Trigger Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="survey-sent"
                  checked={triggerEvents.surveysSent}
                  onCheckedChange={(checked) => handleTriggerEventChange('surveysSent', checked as boolean)}
                />
                <Label htmlFor="survey-sent">Survey Sent</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ticket-created"
                  checked={triggerEvents.ticketCreated}
                  onCheckedChange={(checked) => handleTriggerEventChange('ticketCreated', checked as boolean)}
                />
                <Label htmlFor="ticket-created">Ticket Created</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ticket-reassigned"
                  checked={triggerEvents.ticketReassigned}
                  onCheckedChange={(checked) => handleTriggerEventChange('ticketReassigned', checked as boolean)}
                />
                <Label htmlFor="ticket-reassigned">Ticket Reassigned</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="timeline-extension"
                  checked={triggerEvents.timelineExtensionRequested}
                  onCheckedChange={(checked) => handleTriggerEventChange('timelineExtensionRequested', checked as boolean)}
                />
                <Label htmlFor="timeline-extension">Timeline Extension Requested</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="escalation-triggered"
                  checked={triggerEvents.escalationTriggered}
                  onCheckedChange={(checked) => handleTriggerEventChange('escalationTriggered', checked as boolean)}
                />
                <Label htmlFor="escalation-triggered">Escalation Triggered</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ticket-closed"
                  checked={triggerEvents.ticketClosed}
                  onCheckedChange={(checked) => handleTriggerEventChange('ticketClosed', checked as boolean)}
                />
                <Label htmlFor="ticket-closed">Ticket Closed</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Channels Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
              Channels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="sms"
                  checked={channels.sms}
                  onCheckedChange={(checked) => handleChannelChange('sms', checked as boolean)}
                />
                <Smartphone className="h-5 w-5 text-blue-600" />
                <Label htmlFor="sms">SMS</Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="email"
                  checked={channels.email}
                  onCheckedChange={(checked) => handleChannelChange('email', checked as boolean)}
                />
                <Mail className="h-5 w-5 text-red-600" />
                <Label htmlFor="email">Email</Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="whatsapp"
                  checked={channels.whatsapp}
                  onCheckedChange={(checked) => handleChannelChange('whatsapp', checked as boolean)}
                />
                <MessageSquare className="h-5 w-5 text-green-600" />
                <Label htmlFor="whatsapp">WhatsApp</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Edit className="h-5 w-5 mr-2 text-purple-600" />
              Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div key={template.id}>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h4 className="text-sm font-medium">{template.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditTemplate(template.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  {index < templates.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('settings')}
          >
            Cancel
          </Button>
          
          <Button 
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-32"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}