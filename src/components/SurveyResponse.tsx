import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Eye,
  //  Plus,
    ChevronDown, Filter, Columns3 } from 'lucide-react';
import { EnhancedTable } from './EnhancedTable';
import { SlidingPopup } from './SlidingPopup';
import { AdvancedFilter } from './AdvancedFilter';
// import exampleImage from 'figma:asset/040f1f59b8de779002164f51bcdfe0d615228179.png';
// import createTicketImage from 'figma:asset/101aa16f72b5e0393b3e2b1c21f567ebd6fadb45.png';




export function SurveyResponse() {
  const [showResponseDetail, setShowResponseDetail] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);
  const [filteredResponses, setFilteredResponses] = useState<any[]>([]);
  const [allResponses] = useState([
    { id: 1, sno: 1, surveyName: 'SRM OPD', startTime: '10:30 AM', npsRating: 7, uhidNo: '12345', patientName: 'John Doe', surveyStatus: 'Fully Completed', status: 'New' },
    { id: 2, sno: 2, surveyName: 'Metro Discharge', startTime: '11:45 AM', npsRating: 9, uhidNo: '12346', patientName: 'Jane Smith', surveyStatus: 'Fully Completed', status: 'Opened' },
    { id: 3, sno: 3, surveyName: 'City Emergency', startTime: '02:15 PM', npsRating: 4, uhidNo: '12347', patientName: 'Mike Johnson', surveyStatus: 'Partial Completed', status: 'New' },
    { id: 4, sno: 4, surveyName: 'General Food', startTime: '09:20 AM', npsRating: 8, uhidNo: '12348', patientName: 'Sarah Wilson', surveyStatus: 'Fully Completed', status: 'Opened' },
    { id: 5, sno: 5, surveyName: 'SRM OPD', startTime: '03:30 PM', npsRating: 6, uhidNo: '12349', patientName: 'Tom Brown', surveyStatus: 'Fully Completed', status: 'New' },
    { id: 6, sno: 6, surveyName: 'Metro Nursing', startTime: '04:45 PM', npsRating: 10, uhidNo: '12350', patientName: 'Lisa Davis', surveyStatus: 'Fully Completed', status: 'Opened' }
  ]);

  // Create Ticket form state
  const [createTicketForm, setCreateTicketForm] = useState({
    uhid: '123654',
    billNo: '',
    unit: 'SRM GH',
    ticketCategory: 'Appointment Booking',
    assignedTo: '',
    priority: 'Medium',
    deadline: ''
  });

  const [ticketCategories] = useState([
    'Appointment Booking',
    'Billing & Insurance',
    'Medication Errors',
    'Communication Issues',
    'Cleanliness Issues'
  ]);

  const getSurveyStatusColor = (status: string) => {
    switch (status) {
      case 'Fully Completed': return 'bg-green-100 text-green-800';
      case 'Partial Completed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Opened': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNpsColor = (rating: number) => {
    if (rating >= 9) return 'text-green-600';
    if (rating >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewResponse = (response: any) => {
    setSelectedResponse(response);
    setShowResponseDetail(true);
  };

  const handleCreateTicket = () => {
    setShowResponseDetail(false);
    setShowCreateTicket(true);
  };

  const handleSubmitTicket = () => {
    console.log('Creating ticket:', createTicketForm);
    setShowCreateTicket(false);
    setCreateTicketForm({
      uhid: '123654',
      billNo: '',
      unit: 'SRM GH',
      ticketCategory: 'Appointment Booking',
      assignedTo: '',
      priority: 'Medium',
      deadline: ''
    });
  };

  // Initialize filtered responses
  React.useEffect(() => {
    setFilteredResponses(allResponses);
  }, [allResponses]);

  const surveyResponseFilterFields = [
    {
      key: 'surveyName',
      label: 'Survey Name',
      type: 'multiselect' as const,
      options: ['SRM OPD', 'Metro Discharge', 'City Emergency', 'General Food', 'Metro Nursing']
    },
    {
      key: 'uhidNo',
      label: 'UHID Number',
      type: 'text' as const,
      placeholder: 'Enter UHID number'
    },
    {
      key: 'patientName',
      label: 'Patient Name',
      type: 'text' as const,
      placeholder: 'Enter patient name'
    },
    {
      key: 'npsRating',
      label: 'NPS Rating Range',
      type: 'select' as const,
      options: ['1-3 (Detractors)', '4-6 (Passives)', '7-8 (Promoters)', '9-10 (Strong Promoters)']
    },
    {
      key: 'surveyStatus',
      label: 'Survey Status',
      type: 'multiselect' as const,
      options: ['Fully Completed', 'Partial Completed']
    },
    {
      key: 'status',
      label: 'Response Status',
      type: 'multiselect' as const,
      options: ['New', 'Opened']
    }
  ];

  const handleApplyFilter = (filters: Record<string, any>) => {
    let filtered = [...allResponses];

    // Apply text filters
    if (filters.uhidNo) {
      filtered = filtered.filter(response => 
        response.uhidNo.toLowerCase().includes(filters.uhidNo.toLowerCase())
      );
    }

    if (filters.patientName) {
      filtered = filtered.filter(response => 
        response.patientName.toLowerCase().includes(filters.patientName.toLowerCase())
      );
    }

    // Apply multi-select filters
    if (filters.surveyName && filters.surveyName.length > 0) {
      filtered = filtered.filter(response => filters.surveyName.includes(response.surveyName));
    }

    if (filters.surveyStatus && filters.surveyStatus.length > 0) {
      filtered = filtered.filter(response => filters.surveyStatus.includes(response.surveyStatus));
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(response => filters.status.includes(response.status));
    }

    // Apply NPS rating filter
    if (filters.npsRating) {
      filtered = filtered.filter(response => {
        const rating = response.npsRating;
        switch (filters.npsRating) {
          case '1-3 (Detractors)': return rating >= 1 && rating <= 3;
          case '4-6 (Passives)': return rating >= 4 && rating <= 6;
          case '7-8 (Promoters)': return rating >= 7 && rating <= 8;
          case '9-10 (Strong Promoters)': return rating >= 9 && rating <= 10;
          default: return true;
        }
      });
    }

    // Apply date range filter
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(response => {
        // Convert startTime to a comparable date
        const responseDate = new Date(`2025-01-23 ${response.startTime}`);
        return responseDate >= start && responseDate <= end;
      });
    }

    setFilteredResponses(filtered);
  };

  const handleClearFilter = () => {
    setFilteredResponses(allResponses);
  };

  const columns = [
    { key: 'sno', label: 'S.No' },
    { key: 'surveyName', label: 'Survey Name' },
    { key: 'startTime', label: 'Start Time' },
    { 
      key: 'npsRating', 
      label: 'NPS Rating',
      render: (value: number) => (
        <span className={getNpsColor(value)}>{value}</span>
      )
    },
    { key: 'uhidNo', label: 'UHID No' },
    { key: 'patientName', label: 'Patient Name' },
    { 
      key: 'surveyStatus', 
      label: 'Survey Status',
      render: (value: string) => (
        <Badge variant="outline" className={`${getSurveyStatusColor(value)} text-sm`}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'response', 
      label: 'Response',
      render: (
        value: any,
         row: any) => (
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2"
          onClick={() => handleViewResponse(row || value)}
        >
          <Eye className="w-5 h-5" />
        </Button>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge variant="outline" className={`${getStatusColor(value)} text-sm`}>
          {value}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          {/* Single Line Table Controls */}
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">Survey Response List</CardTitle>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2 h-10 px-4">
                <Columns3 className="w-4 h-4" />
                <span>Show/Hide Columns</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              <Input 
                placeholder="Search survey responses..." 
                className="w-64 h-10"
              />
              
              <AdvancedFilter
                fields={surveyResponseFilterFields}
                onApplyFilter={handleApplyFilter}
                onClearFilter={handleClearFilter}
                title="Filter by Table"
              >
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2 h-10 px-4 bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <Filter className="w-4 h-4" />
                  <span>Advanced Filter</span>
                </Button>
              </AdvancedFilter>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EnhancedTable 
            columns={columns}
            data={filteredResponses}
            searchPlaceholder="Search Survey Responses..."
            hideSearch={true}
          />
        </CardContent>
      </Card>

      {/* View Response Sliding Popup */}
      <SlidingPopup
        isOpen={showResponseDetail}
        onClose={() => setShowResponseDetail(false)}
        title="View Response"
        width="w-[600px]"
        actionButton={{
          label: "Create Ticket",
          onClick: handleCreateTicket
        }}
        showCloseButton={false}
      >
        {selectedResponse && (
          <div className="p-6 space-y-6 pb-24">
            {/* Patient Details Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <ChevronDown className="w-4 h-4 mr-2" />
                Patient Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Survey:</span>
                  <p className="font-medium">{selectedResponse.surveyName}</p>
                </div>
                <div>
                  <span className="text-gray-600">UHID:</span>
                  <p className="font-medium">{selectedResponse.uhidNo}</p>
                </div>
                <div>
                  <span className="text-gray-600">Patient:</span>
                  <p className="font-medium">{selectedResponse.patientName}</p>
                </div>
                <div>
                  <span className="text-gray-600">NPS Rating:</span>
                  <p className={`font-medium ${getNpsColor(selectedResponse.npsRating)}`}>
                    {selectedResponse.npsRating}
                  </p>
                </div>
              </div>
            </div>

            {/* Survey Questions */}
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  1. Hi, What service have you come to SRM Hospital for;
                </h5>
                <p className="text-sm text-gray-600">Doctor Consultation/Annual Health Check</p>
              </div>

              <div className="border-b pb-3">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  2. Based on your recent experience, How likely are you to recommend SRM Medical 
                  Centre to your friends, family or colleagues? [ 0=???/10=very likely]
                </h5>
                <p className="text-sm text-gray-600">{selectedResponse.npsRating}</p>
              </div>

              <div className="border-b pb-3">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  3. Please select your reason for scoring us &laquo;score&raquo;/10. 
                  Tick multiple applicable option-300320226638 Infrastructure
                </h5>
                <p className="text-sm text-gray-600">Infrastructure</p>
              </div>

              <div className="border-b pb-3">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  4. Is there anything else you might want to highlight?
                </h5>
                <p className="text-sm text-gray-600">Hygiene/ Cleanliness</p>
              </div>

              <div className="border-b pb-3">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  5. How would you rate the Registration process?
                </h5>
                <p className="text-sm text-gray-600">3</p>
              </div>
            </div>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-4 right-4 z-50">
              <Button
                variant="outline"
                onClick={() => setShowResponseDetail(false)}
                className="px-6 py-2 text-sm font-medium shadow-lg"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </SlidingPopup>

      {/* Create Ticket Sliding Popup */}
      <SlidingPopup
        isOpen={showCreateTicket}
        onClose={() => setShowCreateTicket(false)}
        title="Create Ticket"
        width="w-[500px]"
        showCloseButton={false}
      >
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">UHID</label>
              <Input
                value={createTicketForm.uhid}
                onChange={(e) => setCreateTicketForm(prev => ({ ...prev, uhid: e.target.value }))}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Bill No :</label>
              <Input
                value={createTicketForm.billNo}
                onChange={(e) => setCreateTicketForm(prev => ({ ...prev, billNo: e.target.value }))}
                className="text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Tenant</label>
              <div className="relative">
                <Select value={createTicketForm.unit} onValueChange={(value) => setCreateTicketForm(prev => ({ ...prev, unit: value }))}>
                  <SelectTrigger className="text-sm bg-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SRM GH">SRM GH</SelectItem>
                    <SelectItem value="Metro">Metro</SelectItem>
                    <SelectItem value="City">City</SelectItem>
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Ticket Category *</label>
              <div className="relative">
                <Select value={createTicketForm.ticketCategory} onValueChange={(value) => setCreateTicketForm(prev => ({ ...prev, ticketCategory: value }))}>
                  <SelectTrigger className="text-sm bg-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {ticketCategories.map((category) => (
                      <SelectItem key={category} value={category} className="flex items-center space-x-2">
                        <Checkbox checked={createTicketForm.ticketCategory === category} className="w-3 h-3" />
                        <span>{category}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Appointment Booking</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Assigned To *</label>
                <Select value={createTicketForm.assignedTo} onValueChange={(value) => setCreateTicketForm(prev => ({ ...prev, assignedTo: value }))}>
                  <SelectTrigger className="text-sm bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Priority *</label>
                <Select value={createTicketForm.priority} onValueChange={(value) => setCreateTicketForm(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="text-sm bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Deadline *</label>
                <Input
                  type="date"
                  value={createTicketForm.deadline}
                  onChange={(e) => setCreateTicketForm(prev => ({ ...prev, deadline: e.target.value }))}
                  className="text-sm bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowCreateTicket(false)}
              className="text-sm"
            >
              Close
            </Button>
            <Button
              onClick={handleSubmitTicket}
              style={{ backgroundColor: '#2563EB' }}
              className="text-sm text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </SlidingPopup>
    </div>
  );
}