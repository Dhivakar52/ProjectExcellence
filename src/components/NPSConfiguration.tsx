
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface NPSConfigurationProps {
  onNavigate: (page: string) => void;
}

export function NPSConfiguration({ onNavigate }: NPSConfigurationProps) {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('department-settings')}
          className="mr-4 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-medium">NPS Configuration</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configure NPS Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="npsSelect">Department</Label>
            <Select defaultValue="outpatient">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="radiology">Radiology</SelectItem>
                <SelectItem value="outpatient">Outpatient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="enableNPS" defaultChecked />
            <Label htmlFor="enableNPS">Enable NPS</Label>
          </div>
          <div>
            <Label htmlFor="frequency">Schedule Frequency</Label>
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Delivery Channel</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="smsChannel" defaultChecked />
                <Label htmlFor="smsChannel">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="emailChannel" defaultChecked />
                <Label htmlFor="emailChannel">Email</Label>
              </div>
            </div>
          </div>
          <Button className="bg-[#2563EB] hover:bg-[#0C265E]">Save Configuration</Button>
        </CardContent>
      </Card>
    </div>
  );
}