import  { useState } from 'react';
import { ArrowLeft, Plus, Building, Globe, MapPin, Briefcase, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

interface AddTenantProps {
  onNavigate: (page: string) => void;
}

export function AddTenant({ onNavigate }: AddTenantProps) {
  const [formData, setFormData] = useState({
    tenantName: '',
    domain: '',
    country: '',
    industry: '',
    description: '',
    adminEmail: '',
    adminName: '',
    phone: '',
    status: true,
    enableBranding: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding tenant:', formData);
    onNavigate('settings');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
          <h1 className="text-2xl font-medium">Add New Tenant</h1>
          <p className="text-sm text-gray-600 mt-1">Create a new tenant organization with configuration settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tenantName">Tenant Name *</Label>
                <Input 
                  id="tenantName" 
                  placeholder="Enter tenant organization name"
                  value={formData.tenantName}
                  onChange={(e) => handleInputChange('tenantName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="domain">Domain *</Label>
                <Input 
                  id="domain" 
                  placeholder="company.org"
                  value={formData.domain}
                  onChange={(e) => handleInputChange('domain', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the tenant organization"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Industry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Location & Industry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="uae">UAE</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phone">Contact Phone</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Admin Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
                Admin Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adminName">Admin Name *</Label>
                <Input 
                  id="adminName" 
                  placeholder="Primary administrator name"
                  value={formData.adminName}
                  onChange={(e) => handleInputChange('adminName', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="adminEmail">Admin Email *</Label>
                <Input 
                  id="adminEmail" 
                  type="email"
                  placeholder="admin@company.org"
                  value={formData.adminEmail}
                  onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2 text-orange-600" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="status">Active Status</Label>
                  <p className="text-sm text-gray-600">Enable tenant immediately upon creation</p>
                </div>
                <Switch 
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => handleInputChange('status', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableBranding">Enable Custom Branding</Label>
                  <p className="text-sm text-gray-600">Allow tenant-specific branding configuration</p>
                </div>
                <Switch 
                  id="enableBranding"
                  checked={formData.enableBranding}
                  onCheckedChange={(checked) => handleInputChange('enableBranding', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button 
            type="button"
            variant="outline" 
            onClick={() => onNavigate('settings')}
          >
            Cancel
          </Button>
          
          <div className="flex space-x-3">
            <Button 
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  tenantName: '',
                  domain: '',
                  country: '',
                  industry: '',
                  description: '',
                  adminEmail: '',
                  adminName: '',
                  phone: '',
                  status: true,
                  enableBranding: false
                });
              }}
            >
              Reset Form
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-32"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Tenant
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}