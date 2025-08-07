import React from 'react';
import { ArrowLeft, Plus, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface ManageRolesProps {
  onNavigate: (page: string) => void;
}

export function ManageRoles({ onNavigate }: ManageRolesProps) {
  const roles = [
    { id: 1, name: 'Admin', description: 'Full access to all modules', permissions: 'Full' },
    { id: 2, name: 'Executive', description: 'Ticket management access', permissions: 'Limited' },
    { id: 3, name: 'Manager', description: 'Department management', permissions: 'Moderate' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('user-role-management')}
          className="mr-4 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-medium">Manage Roles</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-[#2563EB] hover:bg-[#0C265E]">
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{role.permissions}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Role
                      </Button>
                      <Button variant="outline" size="sm">View Access</Button>
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
}