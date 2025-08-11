import { useState } from 'react';
import { ArrowLeft, Plus, Edit, Eye, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';

interface ManageTenantsProps {
  onNavigate: (page: string) => void;
}

export function ManageTenants({ onNavigate }: ManageTenantsProps) {
  const [drawerOpen, setDrawerOpen] = useState<string | null>(null);

  const tenants = [
    { id: 1, name: 'MedCorp', domain: 'medcorp.org', country: 'India', industry: 'Healthcare', status: 'Active' },
    { id: 2, name: 'Pulse Hospitals', domain: 'pulsehealth.in', country: 'UAE', industry: 'Healthcare', status: 'Inactive' }
  ];

  const AddTenantDrawer = () => (
    <Sheet open={drawerOpen === 'addTenant'} onOpenChange={(open) => setDrawerOpen(open ? 'addTenant' : null)}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add New Tenant</SheetTitle>
          <SheetDescription>Create a new tenant organization.</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="tenantName">Tenant Name</Label>
              <Input id="tenantName" placeholder="Enter tenant name" />
            </div>
            <div>
              <Label htmlFor="domain">Domain</Label>
              <Input id="domain" placeholder="company.org" />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="uae">UAE</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2 pt-4">
            <Button className="bg-[#2563EB] hover:bg-[#0C265E] flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
            <Button variant="outline" onClick={() => setDrawerOpen(null)}>
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

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
          <h1 className="text-2xl font-medium">Manage Tenants</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage existing tenant organizations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Button className="bg-[#2563EB] hover:bg-[#0C265E] text-white" onClick={() => setDrawerOpen('addTenant')}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Tenant
            </Button>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input placeholder="Search by Tenant Name" className="w-64" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>{tenant.domain}</TableCell>
                  <TableCell>{tenant.country}</TableCell>
                  <TableCell>{tenant.industry}</TableCell>
                  <TableCell>
                    <Badge variant={tenant.status === 'Active' ? 'default' : 'secondary'}>
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Deactivate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddTenantDrawer />
    </div>
  );
}