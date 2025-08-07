import React from 'react';
import { ArrowLeft, Plus, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface ManageDepartmentsProps {
  onNavigate: (page: string) => void;
}

export function ManageDepartments({ onNavigate }: ManageDepartmentsProps) {
  const departments = [
    { id: 1, name: 'Radiology', head: 'Dr. Neha Roy', email: 'neha@medcorp.org', status: 'Active' },
    { id: 2, name: 'Outpatient', head: 'Dr. Faheem', email: 'faheem@medcorp.org', status: 'Inactive' }
  ];

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
        <h1 className="text-2xl font-medium">Manage Departments</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-[#2563EB] hover:bg-[#0C265E]">
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Head of Dept</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell>{dept.head}</TableCell>
                  <TableCell>{dept.email}</TableCell>
                  <TableCell>
                    <Badge variant={dept.status === 'Active' ? 'default' : 'secondary'}>
                      {dept.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Disable
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
}