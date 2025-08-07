
import { ArrowLeft, FileText, Cog, Bell, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface NotificationSettingsProps {
  onNavigate: (page: string) => void;
}

export function NotificationSettings({ onNavigate }: NotificationSettingsProps) {
  const notificationFeatures = [
    {
      id: 'template-management',
      title: 'Template Management',
      description: 'Create and manage notification templates for all communication channels',
      icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'channel-configuration',
      title: 'Channel Configuration',
      description: 'Configure API settings and integrations for notification channels',
      icon: Cog,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'notification-triggers',
      title: 'Notification Triggers',
      description: 'Setup automated triggers for various system events and updates',
      icon: Bell,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
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
          <h1 className="text-2xl font-medium">🔔 Notification Settings</h1>
          <p className="text-sm text-gray-600 mt-1">Manage notification templates, channels, and automated triggers</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Configuration Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-gray-100">
            {notificationFeatures.map((feature) => {
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