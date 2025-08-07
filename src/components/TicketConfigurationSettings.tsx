import React, { useState } from 'react';
import { ArrowLeft, Save, Settings, Clock, Users, Star, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';

interface TicketConfigurationSettingsProps {
  onNavigate: (page: string) => void;
}

export function TicketConfigurationSettings({ onNavigate }: TicketConfigurationSettingsProps) {
  const [config, setConfig] = useState({
    selfTimelineExtension: 4,
    ticketReassignmentSettings: 2,
    escalationTimeLimits: {
      level1: 48,
      level2: 72
    },
    enableCustomComments: true,
    commentField: 'Please provide additional details about your request'
  });

  const [npsActions, setNpsActions] = useState([
    { range: '0-6', action: 'Create Ticket', editable: true },
    { range: '7-8', action: 'Mark for Review', editable: true },
    { range: '9-10', action: 'No Action', editable: true }
  ]);

  const handleConfigChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setConfig(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNpsActionChange = (index: number, action: string) => {
    setNpsActions(prev => prev.map((item, i) => 
      i === index ? { ...item, action } : item
    ));
  };

  const handleSaveConfiguration = () => {
    console.log('Saving ticket configuration:', { config, npsActions });
    onNavigate('settings');
  };

  const actionOptions = [
    'Create Ticket',
    'Mark for Review',
    'No Action',
    'Send Notification',
    'Escalate Immediately',
    'Schedule Follow-up',
    'Auto-Close'
  ];

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
          <h1 className="text-2xl font-medium">Ticket Configuration</h1>
          <p className="text-sm text-gray-600 mt-1">Configure ticket management settings and workflows</p>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Self Timeline Extension */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              A. Self Timeline Extension
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="timeline-extension" className="min-w-fit">Extension Limit (hours):</Label>
              <Input 
                id="timeline-extension"
                type="number"
                value={config.selfTimelineExtension}
                onChange={(e) => handleConfigChange('selfTimelineExtension', parseInt(e.target.value))}
                className="w-24"
                min="1"
                max="168"
              />
              <span className="text-sm text-gray-600">
                Maximum hours a user can extend their own timeline
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Reassignment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              B. Ticket Reassignment Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Label htmlFor="reassignment-limit" className="min-w-fit">Reassignment Limit:</Label>
              <Input 
                id="reassignment-limit"
                type="number"
                value={config.ticketReassignmentSettings}
                onChange={(e) => handleConfigChange('ticketReassignmentSettings', parseInt(e.target.value))}
                className="w-24"
                min="1"
                max="10"
              />
              <span className="text-sm text-gray-600">
                Maximum number of times a ticket can be reassigned
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Escalation Time Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-orange-600" />
              C. Escalation Time Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <Label htmlFor="level1-escalation" className="min-w-fit">Level 1 Escalation (hours):</Label>
                <Input 
                  id="level1-escalation"
                  type="number"
                  value={config.escalationTimeLimits.level1}
                  onChange={(e) => handleConfigChange('escalationTimeLimits.level1', parseInt(e.target.value))}
                  className="w-24"
                  min="1"
                  max="168"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Label htmlFor="level2-escalation" className="min-w-fit">Level 2 Escalation (hours):</Label>
                <Input 
                  id="level2-escalation"
                  type="number"
                  value={config.escalationTimeLimits.level2}
                  onChange={(e) => handleConfigChange('escalationTimeLimits.level2', parseInt(e.target.value))}
                  className="w-24"
                  min="1"
                  max="168"
                />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Time limits before automatic escalation to the next level
            </p>
          </CardContent>
        </Card>

        {/* NPS Score Based Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-purple-600" />
              D. NPS Score Based Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NPS Score</TableHead>
                    <TableHead>Action Type</TableHead>
                    <TableHead>Editable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {npsActions.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.range}</TableCell>
                      <TableCell>
                        {item.editable ? (
                          <Select 
                            value={item.action} 
                            onValueChange={(value) => handleNpsActionChange(index, value)}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {actionOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="text-gray-600">{item.action}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.editable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {item.editable ? 'Yes' : 'No'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Configure automatic actions based on NPS score ranges
            </p>
          </CardContent>
        </Card>

        {/* Enable Custom Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-indigo-600" />
              E. Enable Custom Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-comments" className="text-base">Enable Custom Comments Field</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Allow users to add custom comments when creating or updating tickets
                </p>
              </div>
              <Switch 
                id="enable-comments"
                checked={config.enableCustomComments}
                onCheckedChange={(checked) => handleConfigChange('enableCustomComments', checked)}
              />
            </div>
            
            {config.enableCustomComments && (
              <div className="mt-4">
                <Label htmlFor="comment-field">Comment Field Placeholder Text</Label>
                <Textarea 
                  id="comment-field"
                  value={config.commentField}
                  onChange={(e) => handleConfigChange('commentField', e.target.value)}
                  rows={3}
                  className="mt-2"
                  placeholder="Enter placeholder text for comment field"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Configuration */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('settings')}
          >
            Cancel
          </Button>
          
          <Button 
            onClick={handleSaveConfiguration}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-32"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}