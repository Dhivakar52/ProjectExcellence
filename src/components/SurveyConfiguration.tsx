import React from 'react';
import { ArrowLeft, Zap, Timer, Star, Database, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SurveyConfigurationProps {
  onNavigate: (page: string) => void;
}

export function SurveyConfiguration({ onNavigate }: SurveyConfigurationProps) {
  const surveyFeatures = [
    {
      id: 'trigger-rules',
      title: 'Trigger Rules',
      description: 'Configure survey triggers for post-ticket, post-visit, and custom scenarios',
      icon: Zap,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'activation-timelines',
      title: 'Activation Timelines',
      description: 'Set timing and scheduling for survey activation and delivery',
      icon: Timer,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'feedback-types',
      title: 'Feedback Types',
      description: 'Configure different feedback collection methods and rating systems',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'source-configurations',
      title: 'Source Configurations',
      description: 'Setup and manage survey platform integrations and data sources',
      icon: Database,
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
          <h1 className="text-2xl font-medium">📊 Survey Configuration</h1>
          <p className="text-sm text-gray-600 mt-1">Configure survey triggers, timelines, and feedback collection</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Survey Configuration Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-gray-100">
            {surveyFeatures.map((feature) => {
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