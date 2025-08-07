import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Ticket, Clock, AlertTriangle, TrendingUp, AlertCircle, SlidersHorizontal, Calendar, Search, ChevronDown, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { AdvancedFilter } from './AdvancedFilter';

export function Dashboard() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [dateRange, setDateRange] = useState('07/01/2025 - 07/22/2025');
  const [selectedTenant, setSelectedTenant] = useState('');
  const [selectedSurveys, setSelectedSurveys] = useState<string[]>(['SRM Smiles', 'Discharge Experience', 'Food Service', 'Cleanliness', 'Patient Satisfaction']);
  const [showSurveyDropdown, setShowSurveyDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2025, 6, 1));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2025, 6, 22));

  const metrics = [
    { title: 'My Tickets', value: '24', color: '#2563EB', icon: Ticket },
    { title: 'Pending', value: '10', color: '#f59e0b', icon: Clock },
    { title: 'Escalated', value: '4', color: '#dc2626', icon: AlertTriangle },
    { title: 'Avg. NPS Score', value: '4.2', color: '#10b981', icon: TrendingUp },
    { title: 'SLA Breaches', value: '2', color: '#dc2626', icon: AlertCircle }
  ];

  const allTickets = [
    { id: 1, ticketId: 'T001', category: 'Food Quality', status: 'Open', priority: 'High', assignedTo: 'John Doe' },
    { id: 2, ticketId: 'T002', category: 'Food Quality', status: 'In Progress', priority: 'Medium', assignedTo: 'Jane Smith' },
    { id: 3, ticketId: 'T003', category: 'Cleanliness', status: 'Resolved', priority: 'Low', assignedTo: 'Mike Johnson' },
    { id: 4, ticketId: 'T004', category: 'Food Quality', status: 'Open', priority: 'High', assignedTo: 'John Doe' },
    { id: 5, ticketId: 'T005', category: 'Service', status: 'Pending', priority: 'Medium', assignedTo: 'Sarah Wilson' },
    { id: 6, ticketId: 'T006', category: 'Food Quality', status: 'Open', priority: 'High', assignedTo: 'John Doe' },
    { id: 7, ticketId: 'T007', category: 'Maintenance', status: 'In Progress', priority: 'Low', assignedTo: 'Tom Brown' },
    { id: 8, ticketId: 'T008', category: 'Food Quality', status: 'Open', priority: 'High', assignedTo: 'John Doe' }
  ];

  const tenantHierarchy = {
    Hospital: ['SRM Global', 'SRM GH'],
    Education: ['SRM IST', 'SRMAP', 'SRM Global School'],
    Media: ['Federal', 'Puthiya Thalaimurai', 'Puthuyugam'],
    Tech: ['SRM Tech']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
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

  const setCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);
    
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));
    
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
    updateDateRange(startOfWeek, endOfWeek);
  };

  const setLastWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfLastWeek = new Date(today);
    const endOfLastWeek = new Date(today);
    
    startOfLastWeek.setDate(today.getDate() - dayOfWeek - 7);
    endOfLastWeek.setDate(today.getDate() - dayOfWeek - 1);
    
    setStartDate(startOfLastWeek);
    setEndDate(endOfLastWeek);
    updateDateRange(startOfLastWeek, endOfLastWeek);
  };

  const setLastMonth = () => {
    const today = new Date();
    const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    setStartDate(firstDayLastMonth);
    setEndDate(lastDayLastMonth);
    updateDateRange(firstDayLastMonth, lastDayLastMonth);
  };

  const handleFilter = () => {
    if (statusFilter === 'all') {
      setFilteredTickets(allTickets);
    } else {
      const filtered = allTickets.filter(ticket => 
        ticket.status.toLowerCase().replace(' ', '-') === statusFilter
      );
      setFilteredTickets(filtered);
    }
  };

  const availableSurveys = [
    'SRM Smiles',
    'Discharge Experience',
    'Food Service',
    'Cleanliness',
    'Patient Satisfaction'
  ];

  const handleSurveyToggle = (survey: string) => {
    setSelectedSurveys(prev => 
      prev.includes(survey) 
        ? prev.filter(s => s !== survey)
        : [...prev, survey]
    );
  };

  const updateDateRange = (start?: Date, end?: Date) => {
    if (start && end) {
      const startStr = start.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      const endStr = end.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      setDateRange(`${startStr} - ${endStr}`);
    }
  };

  const handleSelectAllSurveys = () => {
    if (selectedSurveys.length === availableSurveys.length) {
      setSelectedSurveys([]);
    } else {
      setSelectedSurveys(availableSurveys);
    }
  };

  const displayTickets = filteredTickets.length > 0 ? filteredTickets : allTickets;

  const recentTicketFilterFields = [
    {
      key: 'ticketId',
      label: 'Ticket ID',
      type: 'text' as const,
      placeholder: 'Enter ticket ID'
    },
    {
      key: 'category',
      label: 'Category',
      type: 'multiselect' as const,
      options: ['Food Quality', 'Cleanliness', 'Service', 'Maintenance']
    },
    {
      key: 'status',
      label: 'Status',
      type: 'multiselect' as const,
      options: ['Open', 'In Progress', 'Resolved', 'Pending']
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
      options: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Tom Brown']
    }
  ];

  const handleApplyTicketFilter = (filters: Record<string, any>) => {
    let filtered = [...allTickets];

    if (filters.ticketId) {
      filtered = filtered.filter(ticket => 
        ticket.ticketId.toLowerCase().includes(filters.ticketId.toLowerCase())
      );
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(ticket => filters.category.includes(ticket.category));
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(ticket => filters.status.includes(ticket.status));
    }

    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter(ticket => filters.priority.includes(ticket.priority));
    }

    if (filters.assignedTo && filters.assignedTo.length > 0) {
      filtered = filtered.filter(ticket => filters.assignedTo.includes(ticket.assignedTo));
    }

    setFilteredTickets(filtered);
  };

  const handleClearTicketFilter = () => {
    setFilteredTickets([]);
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      {/* Filter Section */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-end space-x-4 w-full">
            {/* Date Range */}
            <div className="flex-1 min-w-0">
              <Label className="text-base font-medium text-gray-700 mb-3 block">Date Range</Label>
              <div className="relative">
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline"
                      className="w-full flex items-center justify-between px-3 py-2 text-left text-base border border-gray-300 rounded-lg bg-gray-50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                      style={{ height: '44px' }}
                    >
                      <span className="text-gray-700">{dateRange}</span>
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[600px] p-0" align="start">
                    <div className="p-4">
                      <div className="space-y-4">
                        {/* Quick Select Buttons */}
                        <div className="flex space-x-2 border-b pb-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={setCurrentWeek}
                            className="text-sm"
                          >
                            Current Week
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={setLastWeek}
                            className="text-sm"
                          >
                            Last Week
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={setLastMonth}
                            className="text-sm"
                          >
                            Last Month
                          </Button>
                        </div>
                        
                        {/* Dual Calendar */}
                        <div className="flex space-x-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">From</Label>
                            <CalendarComponent
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              className="rounded-md border"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">To</Label>
                            <CalendarComponent
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              className="rounded-md border"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-4 border-t">
                          <Button variant="outline" size="sm" onClick={() => setShowCalendar(false)}>
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => {
                              updateDateRange(startDate, endDate);
                              setShowCalendar(false);
                            }}
                            style={{ backgroundColor: '#2563EB' }}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Tenant */}
            <div className="flex-1 min-w-0">
              <Label className="text-base font-medium text-gray-700 mb-3 block">Tenant</Label>
              <div className="relative">
                <Popover open={showTenantDropdown} onOpenChange={setShowTenantDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between text-left text-base border-gray-300 rounded-lg bg-gray-50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      style={{ height: '44px' }}
                    >
                      <span className="text-gray-700">
                        {selectedTenant || 'Select'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <div className="max-h-80 overflow-y-auto">
                      {Object.entries(tenantHierarchy).map(([category, items]) => (
                        <div key={category} className="p-2">
                          <div className="font-medium text-gray-900 px-3 py-2 text-sm bg-gray-50">
                            {category}
                          </div>
                          {items.map((item) => (
                            <div key={item} className="flex items-center space-x-3 px-6 py-2 hover:bg-gray-50 rounded cursor-pointer">
                              <Checkbox
                                checked={selectedTenant === item}
                                onCheckedChange={() => setSelectedTenant(selectedTenant === item ? '' : item)}
                                className="w-4 h-4"
                              />
                              <Label className="text-sm cursor-pointer flex-1">
                                {item}
                              </Label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Survey Name - Multi Select */}
            <div className="flex-1 min-w-0">
              <Label className="text-base font-medium text-gray-700 mb-3 block">Survey Name</Label>
              <div className="relative">
                <Popover open={showSurveyDropdown} onOpenChange={setShowSurveyDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between text-left text-base border-gray-300 rounded-lg bg-gray-50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      style={{ height: '44px' }}
                    >
                      <span className="text-base text-gray-700" style={{ fontSize: '16px' }}>
                        All selected ({selectedSurveys.length})
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedSurveys.length === availableSurveys.length}
                          onCheckedChange={handleSelectAllSurveys}
                          style={{ accentColor: '#2563EB' }}
                          className="w-4 h-4"
                        />
                        <Label className="text-base font-medium">
                          All selected ({availableSurveys.length})
                        </Label>
                      </div>
                    </div>
                    <div className="p-2 max-h-60 overflow-y-auto">
                      {availableSurveys.map((survey) => (
                        <div key={survey} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                          <Checkbox
                            checked={selectedSurveys.includes(survey)}
                            onCheckedChange={() => handleSurveyToggle(survey)}
                            style={{ accentColor: '#2563EB' }}
                            className="w-4 h-4"
                          />
                          <Label className="text-base cursor-pointer flex-1">
                            {survey}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex-shrink-0">
              <Button 
                className="w-32 flex items-center justify-center space-x-2 text-white text-base font-medium rounded-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: '#2563EB', height: '44px' }}
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-medium text-gray-600">{metric.title}</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">{metric.value}</p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <IconComponent 
                      className="w-6 h-6"
                      style={{ color: metric.color }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Tickets Table */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">Recent Tickets</CardTitle>
            <div className="flex items-center space-x-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-44 h-10">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <AdvancedFilter
                fields={recentTicketFilterFields}
                onApplyFilter={handleApplyTicketFilter}
                onClearFilter={handleClearTicketFilter}
                title="Filter by Table"
                showCloseButton={true}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-2 h-10 px-4 bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-base font-medium">Filter</span>
                </Button>
              </AdvancedFilter>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base font-medium">S.No</TableHead>
                <TableHead className="text-base font-medium">Ticket ID</TableHead>
                <TableHead className="text-base font-medium">Category</TableHead>
                <TableHead className="text-base font-medium">Status</TableHead>
                <TableHead className="text-base font-medium">Priority</TableHead>
                <TableHead className="text-base font-medium">Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayTickets.map((ticket, index) => (
                <TableRow key={ticket.id} className="h-16">
                  <TableCell className="py-4 text-base">{index + 1}</TableCell>
                  <TableCell className="font-medium py-4 text-base">{ticket.ticketId}</TableCell>
                  <TableCell className="py-4 text-base">{ticket.category}</TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className={`${getStatusColor(ticket.status)} text-sm`}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className={`${getPriorityColor(ticket.priority)} text-sm`}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-base">{ticket.assignedTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}