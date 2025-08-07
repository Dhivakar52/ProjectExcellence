import React from 'react';
import { ArrowLeft, Building, TrendingUp, Network, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DepartmentSettingsProps {
  onNavigate: (page: string) => void;
}

export function DepartmentSettings({ onNavigate }: DepartmentSettingsProps) {
  const departmentFeatures = [
    {
      id: 'manage-departments',
      title: 'Manage Departments',
      description: 'Add, edit, and manage departments with heads and contact information',
      icon: Building,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'escalation-matrix',
      title: 'Escalation Matrix',
      description: 'Configure escalation levels, roles, and time SLA settings',
      icon: Network,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'nps-configuration',
      title: 'NPS Configuration',
      description: 'Setup NPS surveys, frequencies, and delivery channels',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
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
          <h1 className="text-2xl font-medium">🏬 Department Settings</h1>
          <p className="text-sm text-gray-600 mt-1">Manage departments, escalation matrix, and NPS configuration</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Configuration Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-gray-100">
            {departmentFeatures.map((feature) => {
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