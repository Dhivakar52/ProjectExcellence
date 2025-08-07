import React from 'react';
import { ArrowLeft, Plus, Eye, Palette, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TenantSettingsProps {
  onNavigate: (page: string) => void;
}

export function TenantSettings({ onNavigate }: TenantSettingsProps) {
  const tenantFeatures = [
    {
      id: 'add-tenant',
      title: 'Add Tenant',
      description: 'Create new tenant organizations with domain and configuration settings',
      icon: Plus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'manage-tenants',
      title: 'View Tenants',
      description: 'View and edit existing tenant organizations and their details',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'branding-configuration',
      title: 'Tenant Branding',
      description: 'Configure branding elements, logos, and visual identity for tenants',
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
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
          <h1 className="text-2xl font-medium">🏢 Tenant Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage tenant organizations and branding configurations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Management Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-gray-100">
            {tenantFeatures.map((feature) => {
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