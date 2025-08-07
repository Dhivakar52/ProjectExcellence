import React from 'react';
import { ArrowLeft, Tag, Clock, GitBranch, RefreshCw, AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TicketConfigurationProps {
  onNavigate: (page: string) => void;
}

export function TicketConfiguration({ onNavigate }: TicketConfigurationProps) {
  const ticketFeatures = [
    {
      id: 'ticket-categories',
      title: 'Categories & Sub-reasons',
      description: 'Configure ticket categories and detailed sub-reason classifications',
      icon: Tag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'priority-sla',
      title: 'Priority & SLA Settings',
      description: 'Define priority levels and service level agreement configurations',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'ticket-workflow',
      title: 'Ticket Status Workflow',
      description: 'Configure ticket status transitions and workflow processes',
      icon: GitBranch,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'reassignment-rules',
      title: 'Reassignment Rules',
      description: 'Set rules and limits for ticket reassignment processes',
      icon: RefreshCw,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'sla-breach-alerts',
      title: 'SLA Breach Alerts',
      description: 'Configure alerts and notifications for SLA breach scenarios',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
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
          <h1 className="text-2xl font-medium">🎫 Ticket Configuration</h1>
          <p className="text-sm text-gray-600 mt-1">Configure ticket management system settings and workflows</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ticket Configuration Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-gray-100">
            {ticketFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => onNavigate(feature.id)}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}