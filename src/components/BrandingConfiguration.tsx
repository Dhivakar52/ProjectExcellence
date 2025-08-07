import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface BrandingConfigurationProps {
  onNavigate: (page: string) => void;
}

export function BrandingConfiguration({ onNavigate }: BrandingConfigurationProps) {
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
          <h1 className="text-2xl font-medium">Branding Configuration</h1>
          <p className="text-sm text-gray-600 mt-1">Configure tenant branding and visual identity</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Branding Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="logoUpload">Logo Upload</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input type="file" accept="image/*" />
              <span className="text-sm text-gray-600">(Current: MedCorp.png)</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <Input id="primaryColor" type="color" defaultValue="#1A73E8" className="h-10" />
            </div>
            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <Input id="secondaryColor" type="color" defaultValue="#F2F2F2" className="h-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="welcomeMessage">Welcome Message</Label>
            <Textarea 
              id="welcomeMessage" 
              defaultValue="Welcome to MedCorp Feedback Portal"
              rows={3}
            />
          </div>
          <Button className="bg-[#2563EB] hover:bg-[#0C265E]">Save Branding</Button>
        </CardContent>
      </Card>
    </div>
  );
}