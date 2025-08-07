import React from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface PermissionMatrixProps {
  onNavigate: (page: string) => void;
}

export function PermissionMatrix({ onNavigate }: PermissionMatrixProps) {
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
        <h1 className="text-2xl font-medium">Permission Matrix</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>View</TableHead>
                <TableHead>Create</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ticket Config</TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                <TableCell><X className="h-4 w-4 text-red-600" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Notifications</TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                <TableCell><X className="h-4 w-4 text-red-600" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                <TableCell><X className="h-4 w-4 text-red-600" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Survey Config</TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
                <TableCell><X className="h-4 w-4 text-red-600" /></TableCell>
                <TableCell><X className="h-4 w-4 text-red-600" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button className="bg-[#2563EB] hover:bg-[#0C265E]">Save Permissions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}