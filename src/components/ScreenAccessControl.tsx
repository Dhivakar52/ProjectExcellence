
import { ArrowLeft, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Label } from './ui/label';

interface ScreenAccessControlProps {
  onNavigate: (page: string) => void;
}

export function ScreenAccessControl({ onNavigate }: ScreenAccessControlProps) {
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
        <h1 className="text-2xl font-medium">Screen Access Control</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Screen Access Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="roleSelect">Role</Label>
            <Select defaultValue="executive">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module Access</TableHead>
                <TableHead>Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Dashboard</TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ticket Management</TableCell>
                <TableCell><Check className="h-4 w-4 text-green-600" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Settings</TableCell>
                <TableCell><X className="h-4 w-4 text-red-600" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="bg-[#2563EB] hover:bg-[#0C265E]">Save Access Control</Button>
        </CardContent>
      </Card>
    </div>
  );
}