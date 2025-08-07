import  { useState } from 'react';
import { ArrowLeft, Plus, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface ManageUsersProps {
  onNavigate: (page: string) => void;
}

export function ManageUsers({ onNavigate }: ManageUsersProps) {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const users = [
    { id: 1, name: 'Anita Sharma', email: 'anita@medcorp.org', role: 'Admin', tenant: 'MedCorp', department: 'Outpatient', status: 'Active' },
    { id: 2, name: 'Faheem Khan', email: 'faheem@medcorp.org', role: 'Executive', tenant: 'MedCorp', department: 'Radiology', status: 'Active' }
  ];

  const AddUserModal = () => (
    <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Create a new user account with role assignments.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="userName">Name</Label>
            <Input id="userName" placeholder="Enter full name" />
          </div>
          <div>
            <Label htmlFor="userEmail">Email</Label>
            <Input id="userEmail" type="email" placeholder="user@company.com" />
          </div>
          <div>
            <Label htmlFor="userPhone">Phone</Label>
            <Input id="userPhone" placeholder="Phone number" />
          </div>
          <div>
            <Label htmlFor="userRole">Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="userDepartment">Department</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="radiology">Radiology</SelectItem>
                <SelectItem value="outpatient">Outpatient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="userTenant">Tenant</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medcorp">MedCorp</SelectItem>
                <SelectItem value="pulse">Pulse Hospitals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="userStatus" defaultChecked />
            <Label htmlFor="userStatus">Active Status</Label>
          </div>
          <div className="flex space-x-2 pt-4">
            <Button className="bg-[#2563EB] hover:bg-[#0C265E] flex-1">Save</Button>
            <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
          <h1 className="text-2xl font-medium">Manage Users</h1>
          <p className="text-sm text-gray-600 mt-1">Add, edit, and manage user accounts</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end space-x-2">
            <Button className="bg-[#2563EB] hover:bg-[#0C265E]" onClick={() => setIsAddUserModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            <Button variant="outline">Export Users</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.tenant}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">Reset Password</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddUserModal />
    </div>
  );
}