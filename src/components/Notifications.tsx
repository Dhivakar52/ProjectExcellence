import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, Bell, AlertTriangle, CheckCircle, Clock, Filter, Columns3, ChevronDown } from 'lucide-react';
import { Badge } from './ui/badge';
import { EnhancedTable } from './EnhancedTable';
import { SlidingPopup } from './SlidingPopup';
import { AdvancedFilter } from './AdvancedFilter';

export function Notifications() {
  const [showNotificationDetail, setShowNotificationDetail] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [filteredNotifications, setFilteredNotifications] = useState<any[]>([]);

  const allNotifications = [
    {
      id: 1,
      sno: 1,
      ticketNo: 'T-1023',
      message: 'Ticket Assigned',
      content: 'Ticket TCKT-1023 has been assigned to you. Please review and take action.',
      type: 'assignment',
      priority: 'medium',
      timestamp: '2025-01-23 10:30 AM'
    },
    {
      id: 2,
      sno: 2,
      ticketNo: 'T-1017',
      message: 'Status Updated',
      content: 'The status of ticket TCKT-1017 has been updated to In Progress.',
      type: 'status',
      priority: 'low',
      timestamp: '2025-01-23 09:45 AM'
    },
    {
      id: 3,
      sno: 3,
      ticketNo: 'T-1005',
      message: 'Escalation Alert',
      content: 'Ticket TCKT-1005 has been escalated due to SLA breach.',
      type: 'escalation',
      priority: 'high',
      timestamp: '2025-01-23 08:15 AM'
    },
    {
      id: 4,
      sno: 4,
      ticketNo: 'T-1023',
      message: 'Ticket Assigned',
      content: 'Ticket TCKT-1023 has been assigned to you. Please review and take action.',
      type: 'assignment',
      priority: 'medium',
      timestamp: '2025-01-22 16:20 PM'
    },
    {
      id: 5,
      sno: 5,
      ticketNo: 'T-1017',
      message: 'Status Updated',
      content: 'The status of ticket TCKT-1017 has been updated to In Progress.',
      type: 'status',
      priority: 'low',
      timestamp: '2025-01-22 14:30 PM'
    },
    {
      id: 6,
      sno: 6,
      ticketNo: 'T-1005',
      message: 'Escalation Alert',
      content: 'Ticket TCKT-1005 has been escalated due to SLA breach.',
      type: 'escalation',
      priority: 'high',
      timestamp: '2025-01-22 11:45 AM'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment': return Bell;
      case 'status': return CheckCircle;
      case 'escalation': return AlertTriangle;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewNotification = (notification: any) => {
    setSelectedNotification(notification);
    setShowNotificationDetail(true);
  };

  // Initialize filtered notifications
  React.useEffect(() => {
    setFilteredNotifications(allNotifications);
  }, []);

  const notificationFilterFields = [
    {
      key: 'ticketNo',
      label: 'Ticket Number',
      type: 'text' as const,
      placeholder: 'Enter ticket number'
    },
    {
      key: 'message',
      label: 'Message Type',
      type: 'select' as const,
      options: ['Ticket Assigned', 'Status Updated', 'Escalation Alert']
    },
    {
      key: 'type',
      label: 'Notification Type',
      type: 'multiselect' as const,
      options: ['assignment', 'status', 'escalation']
    },
    {
      key: 'priority',
      label: 'Priority',
      type: 'multiselect' as const,
      options: ['high', 'medium', 'low']
    }
  ];

  const handleApplyFilter = (filters: Record<string, any>) => {
    let filtered = [...allNotifications];

    // Apply text filters
    if (filters.ticketNo) {
      filtered = filtered.filter(notification => 
        notification.ticketNo.toLowerCase().includes(filters.ticketNo.toLowerCase())
      );
    }

    if (filters.message) {
      filtered = filtered.filter(notification => notification.message === filters.message);
    }

    // Apply multi-select filters
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(notification => filters.type.includes(notification.type));
    }

    if (filters.priority && filters.priority.length > 0) {
      filtered = filtered.filter(notification => filters.priority.includes(notification.priority));
    }

    // Apply date range filter
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered = filtered.filter(notification => {
        const notificationDate = new Date(notification.timestamp);
        return notificationDate >= start && notificationDate <= end;
      });
    }

    setFilteredNotifications(filtered);
  };

  const handleClearFilter = () => {
    setFilteredNotifications(allNotifications);
  };

  const columns = [
    { key: 'sno', label: 'S.No' },
    { key: 'ticketNo', label: 'Ticket No' },
    { 
      key: 'message', 
      label: 'Message',
      render: (value: string, row: any) => {
        const IconComponent = getNotificationIcon(row.type);
        return (
          <div className="flex items-center space-x-2">
            <IconComponent className="w-4 h-4 text-blue-600" />
            <span>{value}</span>
          </div>
        );
      }
    },
    { 
      key: 'content', 
      label: 'Notification Content',
      render: (value: string) => (
        <span className="max-w-md truncate block">{value}</span>
      )
    },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (value: string) => (
        <Badge variant="outline" className={getPriorityColor(value)}>
          {value}
        </Badge>
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
          onClick={() => handleViewNotification(row)}
        >
          <Eye className="w-4 h-4 text-blue-600" />
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">          
          {/* Single Line Table Controls */}
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">Notification List</CardTitle>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2 h-10 px-4">
                <Columns3 className="w-4 h-4" />
                <span>Show/Hide Columns</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              
              <Input 
                placeholder="Search notifications..." 
                className="w-64 h-10"
              />
              
              <AdvancedFilter
                fields={notificationFilterFields}
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
            data={filteredNotifications}
            searchPlaceholder="Search notifications..."
            hideSearch={true}
          />
        </CardContent>
      </Card>

      {/* Notification Detail Sliding Popup */}
      <SlidingPopup
        isOpen={showNotificationDetail}
        onClose={() => setShowNotificationDetail(false)}
        title="Notification Details"
        width="w-[600px]"
      >
        {selectedNotification && (
          <div className="p-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const IconComponent = getNotificationIcon(selectedNotification.type);
                    return <IconComponent className="w-6 h-6 text-blue-600" />;
                  })()}
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedNotification.message}</h3>
                    <p className="text-sm text-gray-600">Ticket: {selectedNotification.ticketNo}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getPriorityColor(selectedNotification.priority)}>
                  {selectedNotification.priority}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Details:</h4>
                <p className="text-gray-700">{selectedNotification.content}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Timestamp:</h4>
                <p className="text-gray-600">{selectedNotification.timestamp}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                style={{ backgroundColor: '#2563EB' }} 
                className="text-white flex-1"
                onClick={() => console.log('Mark as read')}
              >
                Mark as Read
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => console.log('View related ticket')}
              >
                View Ticket
              </Button>
            </div>
          </div>
        )}
      </SlidingPopup>
    </div>
  );
}