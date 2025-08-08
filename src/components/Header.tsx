import  { useState } from 'react';
import { Search, Bell, ChevronDown, Hand, X, Ticket } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface HeaderProps {
  user: { name: string; role: string };
  currentPage: string;
}

export function Header({ user, currentPage }: HeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const getPageTitle = (page: string) => {
    const titles = {
      'dashboard': '',
      'survey-management': 'Survey Management',
      'survey-response': 'Survey Response',
      'ticket-management': 'Ticket Management',
      'notifications': 'Notification',
      'escalation': 'Escalation',
      'user-management': 'User Management',
      'settings': 'Setting'
    };
    return titles[page as keyof typeof titles] || '';
  };

  const notifications = [
    { id: 1, title: 'Ticket Completed - T115', time: '19 June 5:04 AM', type: 'completed' },
    { id: 2, title: 'Ticket Completed - T115', time: '19 June 5:21 AM', type: 'completed' },
    { id: 3, title: 'Ticket Completed - T115', time: '19 June 5:36 AM', type: 'completed' },
    { id: 4, title: 'Ticket Completed - T114', time: '19 June 6:10 AM', type: 'completed' },
    { id: 5, title: 'Ticket Completed - T108', time: '17 June 10:07 AM', type: 'completed' },
    { id: 6, title: 'Ticket Completed - T105', time: '17 June 10:15 AM', type: 'completed' },
    { id: 7, title: 'Ticket Completed - T105', time: '17 June 10:09 AM', type: 'completed' }
  ];

  const isDashboard = currentPage === 'dashboard';

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif', height: '76px' }}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            {isDashboard ? (
              <div className="flex items-center space-x-2">
                <Hand className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-medium text-gray-900">
                  Welcome Back, {user.name}
                </span>
              </div>
            ) : (
              <span className="text-xl font-medium text-gray-900">{getPageTitle(currentPage)}</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search..."
                className="pl-11 pr-4 py-2 w-80 bg-gray-50 border-gray-200 focus:bg-white text-base"
                style={{ height: '42px' }}
              />
            </div>

            <button 
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsNotificationOpen(true)}
            >
              <Bell className="w-6 h-6" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                style={{ backgroundColor: '#dc2626' }}
              >
                {notifications.length}
              </Badge>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2 transition-colors">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback style={{ backgroundColor: '#2563EB', color: 'white' }}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm text-gray-500">michael@gmail.com</p>
                    <p className="text-xs text-gray-400">Group Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white" >
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-500">michael@gmail.com</p>
                  <p className="text-xs text-gray-400">Group Admin</p>
                </div>
                <DropdownMenuItem className="text-base py-3">
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base py-3">
                  <span>Tenant Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base py-3">
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-base py-3">
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 text-base py-3">
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Right-to-left sliding notification panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isNotificationOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Notification</h3>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-4 border-b border-gray-100 hover:bg-gray-50">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Ticket className="w-4 h-4" style={{ color: '#2563EB' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}