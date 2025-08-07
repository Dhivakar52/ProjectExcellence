
import { 
  Building2, 
  Building, 
  Users, 
  Tag, 
  Star, 
  Bell, 
  Settings as SettingsIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const settingsModules = [
    {
      id: 'tenant-management',
      title: 'Tenant Management',
      description: 'Manage tenant organizations and branding configurations',
      icon: Building2,
      color: 'bg-blue-500',
      features: [
        { id: 'add-tenant', title: 'Add Tenant' },
        { id: 'manage-tenants', title: 'View Tenants' },
        { id: 'branding-configuration', title: 'Tenant Branding' }
      ]
    },
    {
      id: 'department-settings',
      title: 'Department Settings',
      description: 'Configure departments, escalation matrix, and NPS settings',
      icon: Building,
      color: 'bg-green-500',
      features: [
        { id: 'manage-departments', title: 'Manage Departments' },
        { id: 'escalation-matrix', title: 'Escalation Matrix' },
        { id: 'nps-configuration', title: 'NPS Configuration' }
      ]
    },
    {
      id: 'user-role-management',
      title: 'User & Role Management',
      description: 'Manage users, roles, permissions, and access control',
      icon: Users,
      color: 'bg-purple-500',
      features: [
        { id: 'manage-users', title: 'Manage Users' },
        { id: 'manage-roles', title: 'Manage Roles' },
        { id: 'user-role-assignment', title: 'User-Role Assignment' },
        { id: 'screen-access-control', title: 'Screen Access Control' },
        { id: 'permission-matrix', title: 'Permission Matrix' }
      ]
    },
    {
      id: 'ticket-configuration',
      title: 'Ticket Configuration',
      description: 'Configure ticket management settings and workflows',
      icon: Tag,
      color: 'bg-orange-500',
      features: [
        { id: 'ticket-configuration-settings', title: 'Ticket Configuration' }
      ]
    },
    {
      id: 'survey-configuration',
      title: 'Survey Configuration',
      description: 'Setup survey sources and configurations',
      icon: Star,
      color: 'bg-indigo-500',
      features: [
        { id: 'source-configurations', title: 'Source Configurations' }
      ]
    },
    {
      id: 'notification-settings',
      title: 'Notification Settings',
      description: 'Manage notification templates, channels, and triggers',
      icon: Bell,
      color: 'bg-red-500',
      features: [
        { id: 'notification-settings-config', title: 'Notification Settings' }
      ]
    },
    {
      id: 'rule-box',
      title: 'Rule Box',
      description: 'Create and manage automation rules with audit capabilities',
      icon: SettingsIcon,
      color: 'bg-yellow-500',
      features: [
        { id: 'add-rule', title: 'Add Rule' },
        { id: 'manage-existing-rules', title: 'Manage Existing Rules' }
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-medium">⚙️ Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Configure all system settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsModules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.id} className="border-l-4 border-l-transparent hover:border-l-blue-500 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${module.color} text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{module.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => onNavigate(feature.id)}
                      className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200"
                    >
                      • {feature.title}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}