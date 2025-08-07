import  { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Edit, Lock, Plus, Search, Trash2, User, Mail, Phone, Building, UserCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export function UserManagement() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'Ravi Sharma', email: 'ravi@org.com', role: 'Employee', status: 'Active' },
    { id: 2, name: 'Aarti Verma', email: 'aarti@org.com', role: 'Manager', status: 'Inactive' },
    { id: 3, name: 'John Smith', email: 'john@org.com', role: 'Admin', status: 'Active' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@org.com', role: 'BPO Agent', status: 'Active' },
    { id: 5, name: 'Mike Johnson', email: 'mike@org.com', role: 'Viewer', status: 'Inactive' },
    { id: 6, name: 'Lisa Davis', email: 'lisa@org.com', role: 'Employee', status: 'Active' }
  ];

  const roles = [
    { id: 1, name: 'SuperAdmin', desc: 'Has full system-wide access, including user and configuration management', status: 'Active' },
    { id: 2, name: 'TenantAdmin', desc: 'Manages settings, users, and permissions within their own tenant scope', status: 'Inactive' },
    { id: 3, name: 'Action Owner', desc: 'Responsible for managing and resolving assigned actions or tickets', status: 'Active' }
  ];

  const userRoles = [
    { id: 1, userName: 'Alice Johnson', roleName: 'Admin', desc: 'Full access to all modules', status: 'Active' },
    { id: 2, userName: 'Bob Smith', roleName: 'SupportAgent', desc: 'Can handle and escalate tickets', status: 'Inactive' }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  const AddUserModal = () => (
    <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <User className="w-6 h-6" />
            <span>Add New User</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8 px-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="flex items-center space-x-2 font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                <span>Full Name:</span>
              </Label>
              <Input placeholder="Enter full name" className="mt-3 text-base" style={{ height: '44px' }} />
            </div>
            
            <div>
              <Label htmlFor="email" className="flex items-center space-x-2 font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4" />
                <span>Email Address:</span>
              </Label>
              <Input type="email" placeholder="Enter email" className="mt-3 text-base" style={{ height: '44px' }} />
            </div>
            
            <div>
              <Label htmlFor="mobile" className="flex items-center space-x-2 font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                <span>Mobile Number:</span>
              </Label>
              <Input placeholder="Enter mobile number" className="mt-3 text-base" style={{ height: '44px' }} />
            </div>
            
            <div>
              <Label htmlFor="department" className="flex items-center space-x-2 font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4" />
                <span>Department:</span>
              </Label>
              <Select>
                <SelectTrigger className="mt-3" style={{ height: '44px' }}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="icu">ICU</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="role" className="flex items-center space-x-2 font-medium text-gray-700 mb-2">
                <UserCheck className="w-4 h-4" />
                <span>Role:</span>
              </Label>
              <Select>
                <SelectTrigger className="mt-3" style={{ height: '44px' }}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="bpo">BPO Agent</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="font-medium text-gray-700 mb-3 block text-base">Status:</Label>
              <RadioGroup defaultValue="active" className="flex space-x-6">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="active" id="active" style={{ accentColor: '#2563EB' }} className="w-4 h-4" />
                  <Label htmlFor="active" className="text-base">Active</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="inactive" id="inactive" style={{ accentColor: '#2563EB' }} className="w-4 h-4" />
                  <Label htmlFor="inactive" className="text-base">Inactive</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-6 border-t">
            <Button style={{ backgroundColor: '#2563EB' }} className="text-white flex-1 text-base py-3">
              Save User
            </Button>
            <Button variant="outline" onClick={() => setShowAddUser(false)} className="flex-1 text-base py-3">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const EditUserModal = () => (
    <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Edit className="w-6 h-6" />
            <span>Edit User</span>
          </DialogTitle>
        </DialogHeader>
        {selectedUser && (
          <div className="space-y-8 px-2">
            <div className="space-y-4">
              <div>
                <Label className="flex items-center space-x-2 font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  <span>Full Name:</span>
                </Label>
                <Input defaultValue={selectedUser.name} className="mt-3 text-base" style={{ height: '44px' }} />
              </div>
              
              <div>
                <Label className="flex items-center space-x-2 font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address:</span>
                </Label>
                <Input defaultValue={selectedUser.email} className="mt-3 text-base" style={{ height: '44px' }} />
              </div>
              
              <div>
                <Label className="flex items-center space-x-2 font-medium text-gray-700 mb-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Role:</span>
                </Label>
                <Select defaultValue={selectedUser.role.toLowerCase()}>
                  <SelectTrigger className="mt-3" style={{ height: '44px' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="font-medium text-gray-700 mb-3 block text-base">Status:</Label>
                <RadioGroup defaultValue={selectedUser.status.toLowerCase()} className="flex space-x-6">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="active" id="edit-active" style={{ accentColor: '#2563EB' }} className="w-4 h-4" />
                    <Label htmlFor="edit-active" className="text-base">Active</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="inactive" id="edit-inactive" style={{ accentColor: '#2563EB' }} className="w-4 h-4" />
                    <Label htmlFor="edit-inactive" className="text-base">Inactive</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-6 border-t">
              <Button style={{ backgroundColor: '#2563EB' }} className="text-white flex-1 text-base py-3">
                Update User
              </Button>
              <Button variant="outline" onClick={() => setShowEditUser(false)} className="flex-1 text-base py-3">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  const RoleManagementScreen = () => (
    <div className="space-y-6">
      <Card className="border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Role Management (RBAC)</CardTitle>
            <Select defaultValue="admin">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Screen</TableHead>
                <TableHead>View</TableHead>
                <TableHead>Create</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>└── User List</TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>└── User Roles</TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox style={{ accentColor: '#2563EB' }} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tickets</TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox style={{ accentColor: '#2563EB' }} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Escalation Config</TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
                <TableCell><Checkbox checked style={{ accentColor: '#2563EB' }} /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>Add / Edit Role</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Desc</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell className="max-w-md">{role.desc}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(role.status)}>
                      {role.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="p-2 hover:bg-green-50">
                        <Edit className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 hover:bg-red-50">
                        <Lock className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle>Add / Edit User Role</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Role Name</TableHead>
                <TableHead>Desc</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRoles.map((userRole) => (
                <TableRow key={userRole.id}>
                  <TableCell>{userRole.userName}</TableCell>
                  <TableCell>{userRole.roleName}</TableCell>
                  <TableCell>{userRole.desc}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(userRole.status)}>
                      {userRole.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="p-2 hover:bg-green-50">
                        <Edit className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'users'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          User List
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'roles'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Role Management
        </button>
      </div>

      {activeTab === 'users' ? (
        <Card className="border border-gray-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">User List</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by Name / Role / Dept / Tenant"
                    className="pl-10 w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setShowAddUser(true)}
                  className="flex items-center space-x-2 text-white"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2 hover:bg-green-50"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 hover:bg-red-50">
                          <Lock className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <RoleManagementScreen />
      )}

      <AddUserModal />
      <EditUserModal />
    </div>
  );
}