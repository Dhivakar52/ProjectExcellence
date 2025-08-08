import  { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, Edit, Trash2, Settings, 
  // Save
 } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { EnhancedTable } from './EnhancedTable';
import { SlidingPopup } from './SlidingPopup';

export function Escalation() {
  const [showSLAPolicy, setShowSLAPolicy] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEscalation, setSelectedEscalation] = useState<any>(null);

  const escalations = [
    { id: 1, sno: 1, tenant: 'Tenant 1', rule: 'Rule 1', startAt: '07/10/2025', endAt: '07/28/2025' },
    { id: 2, sno: 2, tenant: 'Metro Hospital', rule: 'Emergency Rule', startAt: '07/12/2025', endAt: '07/30/2025' },
    { id: 3, sno: 3, tenant: 'City Hospital', rule: 'Food Service Rule', startAt: '07/15/2025', endAt: '08/01/2025' },
    { id: 4, sno: 4, tenant: 'General Hospital', rule: 'Maintenance Rule', startAt: '07/18/2025', endAt: '08/05/2025' },
    { id: 5, sno: 5, tenant: 'SRMAP', rule: 'Patient Care Rule', startAt: '07/20/2025', endAt: '08/10/2025' }
  ];

  const slaSettings = [
    { category: 'Food', defaultSLA: 24, priority: 'High', editable: true },
    { category: 'Cleanliness', defaultSLA: 48, priority: 'Medium', editable: true },
    { category: 'Maintenance', defaultSLA: 72, priority: 'Low', editable: false }
  ];

  const handleViewEscalation = (escalation: any) => {
    setSelectedEscalation(escalation);
    setShowViewModal(true);
  };

  const handleEditEscalation = (escalation: any) => {
    setSelectedEscalation(escalation);
    setShowEditModal(true);
  };

  const columns = [
    { key: 'sno', label: 'S.No' },
    { key: 'tenant', label: 'Tenant' },
    { key: 'rule', label: 'Rule' },
    { key: 'startAt', label: 'Start At' },
    { key: 'endAt', label: 'End At' },
    { 
      key: 'action', 
      label: 'Action',
      render: (
        // value: any ,
         row: any) => (
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 hover:bg-blue-50"
            onClick={() => handleViewEscalation(row)}
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 hover:bg-green-50"
            onClick={() => handleEditEscalation(row)}
          >
            <Edit className="w-4 h-4 text-green-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">Escalation List</CardTitle>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowSLAPolicy(true)}
                className="text-white flex items-center space-x-2"
                style={{ backgroundColor: '#2563EB' }}
              >
                <Settings className="w-4 h-4" />
                <span>SLA Policies</span>
              </Button>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Tenant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant1">Tenant 1</SelectItem>
                  <SelectItem value="metro">Metro Hospital</SelectItem>
                  <SelectItem value="city">City Hospital</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="icu">ICU</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EnhancedTable 
            columns={columns}
            data={escalations}
            searchPlaceholder="Search escalations..."
          />
        </CardContent>
      </Card>

      {/* SLA Policy Sliding Popup */}
      <SlidingPopup
        isOpen={showSLAPolicy}
        onClose={() => setShowSLAPolicy(false)}
        title="SLA Policy Setup"
        width="w-[800px]"
        actionButton={{
          label: "Save SLA Settings",
          onClick: () => {
            console.log('Saving SLA settings');
            setShowSLAPolicy(false);
          }
        }}
        showCloseButton={false}
      >
        <div className="p-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Service Level Agreement Configuration</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm font-medium">Category</TableHead>
                  <TableHead className="text-sm font-medium">Default SLA (hrs)</TableHead>
                  <TableHead className="text-sm font-medium">Priority Level</TableHead>
                  <TableHead className="text-sm font-medium">Editable</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slaSettings.map((setting, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-sm py-3">{setting.category}</TableCell>
                    <TableCell className="py-3">
                      <Input 
                        type="number" 
                        defaultValue={setting.defaultSLA} 
                        className="w-20 text-sm"
                        disabled={!setting.editable}
                      />
                    </TableCell>
                    <TableCell className="py-3">
                      <Select defaultValue={setting.priority.toLowerCase()}>
                        <SelectTrigger className="w-28 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="py-3">
                      <Checkbox checked={setting.editable} style={{ accentColor: '#2563EB' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SlidingPopup>

      {/* View Escalation Sliding Popup */}
      <SlidingPopup
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Escalation Rule Details"
        width="w-[600px]"
      >
        {selectedEscalation && (
          <div className="p-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tenant:</Label>
                  <p className="text-gray-900 mt-1">{selectedEscalation.tenant}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Rule Name:</Label>
                  <p className="text-gray-900 mt-1">{selectedEscalation.rule}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Start Date:</Label>
                  <p className="text-gray-900 mt-1">{selectedEscalation.startAt}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">End Date:</Label>
                  <p className="text-gray-900 mt-1">{selectedEscalation.endAt}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Rule Description:</Label>
                <p className="text-gray-900 mt-1 text-sm">This escalation rule automatically escalates tickets based on predefined criteria and time thresholds.</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Escalation Levels:</Label>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">• Level 1: Manager (24 hours)</p>
                  <p className="text-sm text-gray-600">• Level 2: Department Head (48 hours)</p>
                  <p className="text-sm text-gray-600">• Level 3: Executive Team (72 hours)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SlidingPopup>

      {/* Edit Escalation Sliding Popup */}
      <SlidingPopup
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Escalation Rule"
        width="w-[600px]"
        showCloseButton={false}
      >
        {selectedEscalation && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Tenant:</Label>
                <Select defaultValue={selectedEscalation.tenant.toLowerCase().replace(' ', '-')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tenant-1">Tenant 1</SelectItem>
                    <SelectItem value="metro-hospital">Metro Hospital</SelectItem>
                    <SelectItem value="city-hospital">City Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Rule Name:</Label>
                <Input defaultValue={selectedEscalation.rule} />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Start Date:</Label>
                <Input type="date" defaultValue="2025-07-10" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">End Date:</Label>
                <Input type="date" defaultValue="2025-07-28" />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Rule Description:</Label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                rows={3}
                defaultValue="This escalation rule automatically escalates tickets based on predefined criteria and time thresholds."
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button style={{ backgroundColor: '#2563EB' }} className="text-white flex-1 text-sm">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1 text-sm">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </SlidingPopup>
    </div>
  );
}