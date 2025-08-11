
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Label } from './ui/label';

interface EscalationMatrixProps {
  onNavigate: (page: string) => void;
}

export function EscalationMatrix({ onNavigate }: EscalationMatrixProps) {
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
        <h1 className="text-2xl font-medium">Escalation Matrix</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configure Escalation Matrix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="deptSelect">Department</Label>
            <Select defaultValue="radiology">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="radiology">Radiology</SelectItem>
                <SelectItem value="outpatient">Outpatient</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Escalation Role</TableHead>
                <TableHead>Time SLA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Executive</TableCell>
                <TableCell>2 hrs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>4 hrs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>6 hrs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="bg-[#2563EB] text-white hover:bg-[#0C265E]">Save Matrix</Button>
        </CardContent>
      </Card>
    </div>
  );
}