import  { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Eye, UserCheck, Clock, CheckCircle, TrendingUp, Upload, Filter, ArrowLeft, History, ChevronDown, Search, Columns3 } from 'lucide-react';
import { EnhancedTable } from './EnhancedTable';
import { SlidingPopup } from './SlidingPopup';
import { AdvancedFilter } from './AdvancedFilter';

export function TicketManagement() {
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [ticketFilter, setTicketFilter] = useState('all');

  const allTickets = [
    { 
      id: 1, 
      sno: 1,
      ticketId: 'T-2234', 
      uhidNo: 'UH12345', 
      patientName: 'John Doe', 
      surveyName: 'SRM OPD', 
      raisedOn: '7/21/2025', 
      priority: 'High', 
      assignedTo: 'Alice Johnson', 
      deadline: '7/23/2025', 
      npsRating: 7, 
      status: 'Closed',
      surveyResponse: {
        survey: 'SRM OPD',
        uhid: '12345',
        patient: 'John Doe',
        npsRating: 7,
        questions: [
          {
            question: 'Hi, What service have you come to SRM Hospital for;',
            answer: 'Doctor Consultation/Annual Health Check'
          },
          {
            question: 'Based on your recent experience, How likely are you to recommend SRM Medical Centre to your friends, family or colleagues? [ 0=???/10=very likely]',
            answer: '7'
          },
          {
            question: 'Please select your reason for scoring us «score»/10. Tick multiple applicable option-300320226638 Infrastructure',
            answer: 'Infrastructure'
          },
          {
            question: 'Is there anything else you might want to highlight?',
            answer: 'Hygiene/ Cleanliness'
          },
          {
            question: 'How would you rate the Registration process?',
            answer: '3'
          }
        ]
      }
    },
    { 
      id: 2, 
      sno: 2,
      ticketId: 'T-2235', 
      uhidNo: 'UH12346', 
      patientName: 'Jane Smith', 
      surveyName: 'Food Service', 
      raisedOn: '7/22/2025', 
      priority: 'Medium', 
      assignedTo: 'Bob Wilson', 
      deadline: '7/24/2025', 
      npsRating: 6, 
      status: 'Open',
      surveyResponse: {
        survey: 'Food Service',
        uhid: '12346',
        patient: 'Jane Smith',
        npsRating: 6,
        questions: [
          {
            question: 'How was the quality of food served?',
            answer: 'Average, could be better'
          },
          {
            question: 'Rate our food service on a scale of 0-10',
            answer: '6'
          },
          {
            question: 'Any specific feedback about the food?',
            answer: 'Food was cold when served'
          }
        ]
      }
    },
    { 
      id: 3, 
      sno: 3,
      ticketId: 'T-2236', 
      uhidNo: 'UH12347', 
      patientName: 'Mike Johnson', 
      surveyName: 'Emergency Care', 
      raisedOn: '7/20/2025', 
      priority: 'High', 
      assignedTo: 'Carol Davis', 
      deadline: '7/22/2025', 
      npsRating: 3, 
      status: 'In Progress',
      surveyResponse: {
        survey: 'Emergency Care',
        uhid: '12347',
        patient: 'Mike Johnson',
        npsRating: 3,
        questions: [
          {
            question: 'How would you rate the emergency response time?',
            answer: 'Too slow, waited for 2 hours'
          },
          {
            question: 'Rate your overall emergency care experience (0-10)',
            answer: '3'
          },
          {
            question: 'What could we improve?',
            answer: 'Faster response time and better communication'
          }
        ]
      }
    },
    { 
      id: 4, 
      sno: 4,
      ticketId: 'T-2237', 
      uhidNo: 'UH12348', 
      patientName: 'Sarah Wilson', 
      surveyName: 'Room Service', 
      raisedOn: '7/19/2025', 
      priority: 'Low', 
      assignedTo: 'David Brown', 
      deadline: '7/21/2025', 
      npsRating: 5, 
      status: 'Open',
      surveyResponse: {
        survey: 'Room Service',
        uhid: '12348',
        patient: 'Sarah Wilson',
        npsRating: 5,
        questions: [
          {
            question: 'How clean was your room?',
            answer: 'Moderately clean'
          },
          {
            question: 'Rate the room service quality (0-10)',
            answer: '5'
          },
          {
            question: 'Any suggestions for improvement?',
            answer: 'More frequent cleaning needed'
          }
        ]
      }
    },
    { 
      id: 5, 
      sno: 5,
      ticketId: 'T-2238', 
      uhidNo: 'UH12349', 
      patientName: 'Tom Brown', 
      surveyName: 'Nursing Care', 
      raisedOn: '7/18/2025', 
      priority: 'Medium', 
      assignedTo: 'Emily Davis', 
      deadline: '7/20/2025', 
      npsRating: 7, 
      status: 'Closed',
      surveyResponse: {
        survey: 'Nursing Care',
        uhid: '12349',
        patient: 'Tom Brown',
        npsRating: 7,
        questions: [
          {
            question: 'How satisfied were you with the nursing care?',
            answer: 'Very satisfied with the professional care'
          },
          {
            question: 'Rate the nursing staff helpfulness (0-10)',
            answer: '7'
          },
          {
            question: 'Any additional comments?',
            answer: 'Nurses were very caring and professional'
          }
        ]
      }
    },
    { 
      id: 6, 
      sno: 6,
      ticketId: 'T-2239', 
      uhidNo: 'UH12350', 
      patientName: 'Lisa Davis', 
      surveyName: 'Pharmacy Service', 
      raisedOn: '7/17/2025', 
      priority: 'High', 
      assignedTo: 'Frank Miller', 
      deadline: '7/19/2025', 
      npsRating: 2, 
      status: 'In Progress',
      surveyResponse: {
        survey: 'Pharmacy Service',
        uhid: '12350',
        patient: 'Lisa Davis',
        npsRating: 2,
        questions: [
          {
            question: 'How was your pharmacy service experience?',
            answer: 'Very poor, long waiting time'
          },
          {
            question: 'Rate the pharmacy service quality (0-10)',
            answer: '2'
          },
          {
            question: 'What went wrong?',
            answer: 'Had to wait 3 hours for medication, staff was unhelpful'
          }
        ]
      }
    }
  ];

  const ticketHistory = [
    { timestamp: '7/22/2025 2:30 PM', action: 'Ticket Resolved', user: 'Alice Johnson', details: 'Issue resolved with customer satisfaction' },
    { timestamp: '7/22/2025 11:15 AM', action: 'Status Updated', user: 'Alice Johnson', details: 'Changed status to In Progress' },
    { timestamp: '7/21/2025 4:45 PM', action: 'Priority Changed', user: 'Manager', details: 'Priority escalated to High due to SLA concerns' },
    { timestamp: '7/21/2025 3:20 PM', action: 'Ticket Assigned', user: 'System', details: 'Assigned to Alice Johnson (Food Service Team)' },
    { timestamp: '7/21/2025 3:15 PM', action: 'Ticket Created', user: 'System', details: 'Created from survey response (NPS: 4)' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNpsColor = (rating: number) => {
    if (rating >= 9) return 'text-green-600 font-semibold'; // Strong Promoters
    if (rating >= 7) return 'text-blue-600 font-semibold';  // Promoters  
    if (rating >= 4) return 'text-orange-600 font-semibold'; // Passives
    return 'text-red-600 font-semibold'; // Detractors
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowTicketDetail(true);
  };

  const handleViewHistory = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowHistoryModal(true);
  };

  const handleViewResponse = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowResponseModal(true);
  };

  const handleViewEscalation = () => {
    setShowTicketDetail(false);
    setShowEscalationModal(true);
  };

  const handleReassign = () => {
    setShowTicketDetail(false);
    setShowReassignModal(true);
  };

  const handleRequestExtension = () => {
    setShowTicketDetail(false);
    setShowExtensionModal(true);
  };

  const handleResolveTicket = () => {
    setShowTicketDetail(false);
    setShowResolveModal(true);
  };

  const handleBackToTicketDetail = () => {
    setShowEscalationModal(false);
    setShowReassignModal(false);
    setShowExtensionModal(false);
    setShowResolveModal(false);
    setShowTicketDetail(true);
  };

  // Initialize filtered tickets
  React.useEffect(() => {
    setFilteredTickets(allTickets);
  }, []);

  // Handle ticket filter changes
  React.useEffect(() => {
    handleTicketFilter();
  }, [ticketFilter]);

  const ticketFilterFields = [
    {
      key: 'ticketId',
      label: 'Ticket ID',
      type: 'text' as const,
      placeholder: 'Enter ticket ID'
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
      key: 'surveyName',
      label: 'Survey Name',
      type: 'multiselect' as const,
      options: ['Discharge Experience', 'Food Service', 'Emergency Care', 'Room Service', 'Nursing Care', 'Pharmacy Service']
    },
    {
      key: 'priority',
      label: 'Priority',
      type: 'multiselect' as const,
      options: ['High', 'Medium', 'Low']
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      type: 'multiselect' as const,
      options: ['Alice Johnson', 'Bob Wilson', 'Carol Davis', 'David Brown', 'Emily Davis', 'Frank Miller']
    },
    {
      key: 'status',
      label: 'Status',
      type: 'multiselect' as const,
      options: ['Open', 'In Progress', 'Closed']
    },
    {
      key: 'npsRating',
      label: 'NPS Rating Range',
      type: 'select' as const,
      options: ['1-3 (Detractors)', '4-6 (Passives)', '7-8 (Promoters)', '9-10 (Strong Promoters)']
    }
  ];

  const handleApplyFilter = (filters: Record<string, any>) => {
    let filtered = [...allTickets];

    // Apply text filters
    if (filters.ticketId) {
      filtered = filtered.filter(ticket => 
        ticket.ticketId.toLowerCase().includes(filters.ticketId.toLowerCase())
      );
    }

    if (filters.uhidNo) {
      filtered = filtered.filter(ticket => 
        ticket.uhidNo.toLowerCase().includes(filters.uhidNo.toLowerCase())
      );
    }

    if (filters.patientName) {
      filtered = filtered.filter(ticket => 
        ticket.patientName.toLowerCase().includes(filters.patientName.toLowerCase())
      );
    }

    // Apply multi-select filters
    if (filters.surveyName && filters.surveyName.length > 0) {
      filtered = filtered.filter(ticket => filters.surveyName.includes(ticket.surveyName));
    }

    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter(ticket => filters.priority.includes(ticket.priority));
    }

    if (filters.assignedTo && filters.assignedTo.length > 0) {
      filtered = filtered.filter(ticket => filters.assignedTo.includes(ticket.assignedTo));
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(ticket => filters.status.includes(ticket.status));
    }

    // Apply NPS rating filter
    if (filters.npsRating) {
      filtered = filtered.filter(ticket => {
        const rating = ticket.npsRating;
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
      filtered = filtered.filter(ticket => {
        const ticketDate = new Date(ticket.raisedOn);
        return ticketDate >= start && ticketDate <= end;
      });
    }

    setFilteredTickets(filtered);
  };

  const handleClearFilter = () => {
    setFilteredTickets(allTickets);
  };

  const handleTicketFilter = () => {
    if (ticketFilter === 'all') {
      setFilteredTickets(allTickets);
    } else if (ticketFilter === 'my') {
      // Filter tickets assigned to current user (assuming current user is 'Alice Johnson' for demo)
      const filtered = allTickets.filter(ticket => 
        ticket.assignedTo === 'Alice Johnson'
      );
      setFilteredTickets(filtered);
    } else if (ticketFilter === 'other') {
      // Filter tickets not assigned to current user
      const filtered = allTickets.filter(ticket => 
        ticket.assignedTo !== 'Alice Johnson'
      );
      setFilteredTickets(filtered);
    }
  };

  const columns = [
    { key: 'sno', label: 'S.No' },
    { key: 'ticketId', label: 'Ticket ID' },
    { key: 'uhidNo', label: 'UHID No' },
    { key: 'patientName', label: 'Patient Name' },
    { key: 'surveyName', label: 'Survey Name' },
    { key: 'raisedOn', label: 'Raised On' },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (value: string) => (
        <Badge variant="outline" className={`${getPriorityColor(value)} text-sm`}>
          {value}
        </Badge>
      )
    },
    { key: 'assignedTo', label: 'Assigned To' },
    { key: 'deadline', label: 'Deadline' },
    { 
      key: 'npsRating', 
      label: 'NPS Rating',
      render: (value: number) => (
        <span className={getNpsColor(value)}>{value}</span>
      )
    },
    { 
      key: 'action', 
      label: 'Action',
      render: (value: any, row: any) => (
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-blue-50"
          onClick={() => handleViewTicket(row)}
        >
          <Eye className="w-4 h-4 text-blue-600" />
        </Button>
      )
    },
    { 
      key: 'response', 
      label: 'Response',
      render: (value: any, row: any) => (
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-blue-50"
          onClick={() => handleViewResponse(row)}
        >
          <Eye className="w-4 h-4 text-green-600" />
        </Button>
      )
    },
    { 
      key: 'history', 
      label: 'History',
      render: (value: any, row: any) => (
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-blue-50"
          onClick={() => handleViewHistory(row)}
        >
          <History className="w-4 h-4 text-blue-600" />
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
            <CardTitle className="text-xl font-semibold text-gray-900">Ticket List</CardTitle>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2 h-10 px-4">
                <Columns3 className="w-4 h-4" />
                <span>Show/Hide Columns</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              <Input 
                placeholder="Search tickets..." 
                className="w-48 h-10"
              />
              
              <Select value={ticketFilter} onValueChange={setTicketFilter}>
                <SelectTrigger className="w-32 h-10">
                  <SelectValue placeholder="All Tickets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tickets</SelectItem>
                  <SelectItem value="my">My Tickets</SelectItem>
                  <SelectItem value="other">Other Tickets</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-32 h-10">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <AdvancedFilter
                fields={ticketFilterFields}
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
            data={filteredTickets}
            searchPlaceholder="Search tickets..."
            hideSearch={true}
          />
        </CardContent>
      </Card>

      {/* Ticket Detail Sliding Popup */}
      <SlidingPopup
        isOpen={showTicketDetail}
        onClose={() => setShowTicketDetail(false)}
        title="Ticket Details"
        width="w-[700px]"
        showCloseButton={false}
      >
        {selectedTicket && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Ticket ID:</Label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">10045</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Title:</Label>
                  <p className="text-gray-900 mt-1">Food not fresh</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Source:</Label>
                  <p className="text-gray-900 mt-1">Survey (NPS = 6)</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Customer:</Label>
                  <p className="text-gray-900 mt-1">Anonymous</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Department:</Label>
                  <p className="text-gray-900 mt-1">Canteen</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Category:</Label>
                  <p className="text-gray-900 mt-1">Food</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Priority:</Label>
                  <div className="mt-1">
                    <Badge className="bg-red-100 text-red-800 text-sm">High</Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Current Status:</Label>
                  <div className="mt-1">
                    <Badge className="bg-red-100 text-red-800 text-sm">Open</Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Assigned To:</Label>
                  <p className="text-gray-900 mt-1">Ravi Sharma</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-6 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleViewEscalation}
                className="flex items-center space-x-2 text-sm px-4 py-2"
                style={{ backgroundColor: '#2563EB', color: 'white' }}
              >
                <TrendingUp className="w-4 h-4" />
                <span>View Escalation Status</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReassign}
                className="flex items-center space-x-2 text-sm px-4 py-2"
                style={{ backgroundColor: '#2563EB', color: 'white' }}
              >
                <UserCheck className="w-4 h-4" />
                <span>Reassign</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRequestExtension}
                className="flex items-center space-x-2 text-sm px-4 py-2"
                style={{ backgroundColor: '#2563EB', color: 'white' }}
              >
                <Clock className="w-4 h-4" />
                <span>Request Extension</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResolveTicket}
                className="flex items-center space-x-2 text-sm px-4 py-2"
                style={{ backgroundColor: '#2563EB', color: 'white' }}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Resolve Ticket</span>
              </Button>
            </div>
          </div>
        )}
      </SlidingPopup>

      {/* Response Details Modal */}
      <SlidingPopup
        isOpen={showResponseModal}
        onClose={() => setShowResponseModal(false)}
        title="View Response"
        width="w-[600px]"
      >
        {selectedTicket && selectedTicket.surveyResponse && (
          <div className="p-6 space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Patient Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Survey:</p>
                  <p className="font-semibold text-gray-900">{selectedTicket.surveyResponse.survey}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">UHID:</p>
                  <p className="font-semibold text-gray-900">{selectedTicket.surveyResponse.uhid}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Patient:</p>
                  <p className="font-semibold text-gray-900">{selectedTicket.surveyResponse.patient}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">NPS Rating:</p>
                  <p className={`font-semibold ${getNpsColor(selectedTicket.surveyResponse.npsRating)}`}>
                    {selectedTicket.surveyResponse.npsRating}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedTicket.surveyResponse.questions.map((item: any, index: number) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="mb-2">
                    <span className="font-medium text-gray-900">
                      {index + 1}. {item.question}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-800">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SlidingPopup>

      {/* History Timeline Modal */}
      <SlidingPopup
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        title="Ticket History Timeline"
        width="w-[600px]"
      >
        <div className="p-6 space-y-6">
          {selectedTicket && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Ticket Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Ticket ID:</span>
                  <p className="font-medium">{selectedTicket.ticketId}</p>
                </div>
                <div>
                  <span className="text-gray-600">Patient:</span>
                  <p className="font-medium">{selectedTicket.patientName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Survey:</span>
                  <p className="font-medium">{selectedTicket.surveyName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <p className="font-medium">{selectedTicket.status}</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            {ticketHistory.map((item, index) => (
              <div key={index} className="flex space-x-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{item.action}</h4>
                    <span className="text-sm text-gray-500">{item.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{item.details}</p>
                  <p className="text-xs text-gray-500">by {item.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlidingPopup>

      {/* Escalation Modal */}
      <SlidingPopup
        isOpen={showEscalationModal}
        onClose={() => setShowEscalationModal(false)}
        title="Escalation View"
        width="w-[500px]"
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Ticket ID:</Label>
              <p className="text-gray-900 mt-1">10046</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Escalation Status:</Label>
              <p className="text-orange-600 font-medium mt-1">1st Level Triggered</p>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-600">Timeline:</Label>
            <div className="mt-3 space-y-2 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Assigned on: 01-Jul</p>
              <p className="text-sm text-gray-600">Reminder Sent: 03-Jul</p>
              <p className="text-sm text-red-600 font-medium">▲ Escalated to: Manager (04-Jul)</p>
              <p className="text-sm text-gray-600">Next Escalation Due: 06-Jul</p>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1 text-sm py-2">
              View Escalation Matrix
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBackToTicketDetail}
              className="flex items-center space-x-2 flex-1 text-sm py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowEscalationModal(false)}
              className="flex-1 text-sm py-2"
            >
              Close
            </Button>
          </div>
        </div>
      </SlidingPopup>

      {/* Reassign Modal */}
      <SlidingPopup
        isOpen={showReassignModal}
        onClose={() => setShowReassignModal(false)}
        title="Reassign Ticket"
        width="w-[500px]"
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Ticket ID:</Label>
              <p className="text-gray-900 mt-1">10045</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Current Assignee:</Label>
              <p className="text-gray-900 mt-1">Ravi Sharma</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Remaining Reassignments:</Label>
              <p className="text-gray-900 mt-1">1</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Select New Employee:</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Reason for Reassignment:</Label>
              <Textarea 
                placeholder="Enter reason..." 
                className="text-sm"
                style={{ minHeight: '80px' }}
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              style={{ backgroundColor: '#2563EB' }} 
              className="text-white flex-1 text-sm"
            >
              Confirm Reassign
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBackToTicketDetail}
              className="flex items-center space-x-2 flex-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowReassignModal(false)} 
              className="flex-1 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SlidingPopup>

      {/* Extension Modal */}
      <SlidingPopup
        isOpen={showExtensionModal}
        onClose={() => setShowExtensionModal(false)}
        title="Request Timeline Extension"
        width="w-[500px]"
      >
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Ticket ID:</Label>
              <p className="text-gray-900 mt-1">10045</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Due Date:</Label>
              <p className="text-gray-900 mt-1">04-Jul-2025</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Requested Extension (Days):</Label>
              <Input 
                type="number" 
                placeholder="Enter days" 
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Reason:</Label>
              <Textarea 
                placeholder="Enter reason..." 
                className="text-sm"
                style={{ minHeight: '80px' }}
              />
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Self-approved if ≤ 4 days. Else, manager approval required.
            </p>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              style={{ backgroundColor: '#2563EB' }} 
              className="text-white flex-1 text-sm"
            >
              Submit Request
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBackToTicketDetail}
              className="flex items-center space-x-2 flex-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowExtensionModal(false)} 
              className="flex-1 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SlidingPopup>

      {/* Resolve Modal */}
      <SlidingPopup
        isOpen={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        title="Resolve Ticket / Closure"
        width="w-[600px]"
      >
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Ticket ID:</Label>
              <p className="text-gray-900 mt-1">10045</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Assigned To:</Label>
              <p className="text-gray-900 mt-1">Ravi Sharma</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Resolution Date:</Label>
              <Input 
                type="date" 
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Reason for Action:</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resolved">Issue Resolved</SelectItem>
                  <SelectItem value="duplicate">Duplicate</SelectItem>
                  <SelectItem value="invalid">Invalid Request</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Solution Provided:</Label>
              <Textarea 
                placeholder="Describe the solution..." 
                className="text-sm"
                style={{ minHeight: '80px' }}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Comments:</Label>
              <Textarea 
                placeholder="Additional comments..." 
                className="text-sm"
                style={{ minHeight: '80px' }}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Evidence (optional):</span>
              </Label>
              <Input 
                type="file" 
                className="text-sm"
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              style={{ backgroundColor: '#2563EB' }} 
              className="text-white flex-1 text-sm"
            >
              Close Ticket
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBackToTicketDetail}
              className="flex items-center space-x-2 flex-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowResolveModal(false)} 
              className="flex-1 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SlidingPopup>
    </div>
  );
}