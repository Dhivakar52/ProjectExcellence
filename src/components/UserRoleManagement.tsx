import React from 'react';
import { ArrowLeft, Users, Shield, Key, Monitor, UserCheck, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface UserRoleManagementProps {
  onNavigate: (page: string) => void;
}

export function UserRoleManagement({ onNavigate }: UserRoleManagementProps) {
  const userRoleFeatures = [
    {
      id: 'manage-users',
      title: 'Manage Users',
      description: 'Add, edit, and manage user accounts with status control',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'manage-roles',
      title: 'Manage Roles',
      description: 'Create and edit user roles including Super Admin, Admin, and User',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'user-role-assignment',
      title: 'User-Role Assignment',
      description: 'Assign and manage role assignments for users',
      icon: UserCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'screen-access-control',
      title: 'Screen Access Control',
      description: 'Control screen-level access permissions for different user roles',
      icon: Monitor,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'permission-matrix',
      title: 'Permission Matrix',
      description: 'Configure detailed permissions matrix for all roles',
      icon: Key,
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
          <h1 className="text-2xl font-medium">👥 User & Role Management</h1>
          <p className="text-sm text-gray-600 mt-1">Comprehensive user and role management with permissions control</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User & Role Management Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-gray-100">
            {userRoleFeatures.map((feature) => {
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