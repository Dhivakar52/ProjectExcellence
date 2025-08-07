import  { useState } from 'react';
import { ArrowLeft, Plus, Edit, Eye, Search, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface ManageExistingRulesProps {
  onNavigate: (page: string) => void;
}

export function ManageExistingRules({ onNavigate }: ManageExistingRulesProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const rules = [
    {
      id: 1,
      name: 'Low NPS Escalation',
      condition: 'NPS < 6',
      action: 'Create Ticket',
      status: 'Active',
      lastModified: '2024-12-15',
      createdBy: 'Admin'
    },
    {
      id: 2,
      name: 'HR Auto Assign',
      condition: 'Dept = HR',
      action: 'Assign Ticket',
      status: 'Inactive',
      lastModified: '2024-12-10',
      createdBy: 'Manager'
    },
    {
      id: 3,
      name: 'High Priority Escalation',
      condition: 'Priority = High',
      action: 'Escalate',
      status: 'Active',
      lastModified: '2024-12-12',
      createdBy: 'Admin'
    },
    {
      id: 4,
      name: 'Critical Response Notification',
      condition: 'Response Time > 24hrs',
      action: 'Send Notification',
      status: 'Active',
      lastModified: '2024-12-14',
      createdBy: 'System'
    }
  ];

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      : <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>;
  };

  const handleEditRule = (ruleId: number) => {
    console.log('Edit rule:', ruleId);
    // Navigate to edit rule page or open modal
  };

  const handleViewRule = (ruleId: number) => {
    console.log('View rule:', ruleId);
    // Navigate to view rule page or open modal
  };

  const handleToggleStatus = (ruleId: number) => {
    console.log('Toggle status for rule:', ruleId);
    // Toggle rule active/inactive status
  };

  const handleDeleteRule = (ruleId: number) => {
    console.log('Delete rule:', ruleId);
    // Delete rule with confirmation
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
          <h1 className="text-2xl font-medium">Manage Existing Rules</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage automation rules</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={() => onNavigate('add-rule')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Rule
            </Button>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search rules..." 
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Rules Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.length > 0 ? (
                  filteredRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {rule.condition}
                        </code>
                      </TableCell>
                      <TableCell>{rule.action}</TableCell>
                      <TableCell>{getStatusBadge(rule.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{rule.lastModified}</TableCell>
                      <TableCell className="text-sm text-gray-600">{rule.createdBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewRule(rule.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditRule(rule.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleToggleStatus(rule.id)}>
                                {rule.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteRule(rule.id)}
                                className="text-red-600"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No rules found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Summary Stats */}
          <div className="flex justify-between items-center pt-4 text-sm text-gray-600">
            <span>
              Showing {filteredRules.length} of {rules.length} rules
            </span>
            <div className="flex space-x-4">
              <span>Active: {rules.filter(r => r.status === 'Active').length}</span>
              <span>Inactive: {rules.filter(r => r.status === 'Inactive').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}