
import { 
  LayoutDashboard, 
  // FileText, 
  MessageSquare, 
  Ticket, 
  Bell, 
  // TrendingUp, 
  // Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import srmLogo from '../assets/images/srm.png';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ currentPage, onPageChange, onLogout, collapsed = false, onToggleCollapse }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'survey-response', label: 'Survey Response', icon: MessageSquare },
    { id: 'ticket-management', label: 'Ticket Management', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];


  
  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header with Logo */}
      <div className="flex justify-center items-center border-b border-gray-200 relative" style={{ height: '76px' }}>
        {!collapsed && <img src={srmLogo} alt="SRM Group" className="h-12 w-auto" />}
        {collapsed && <Menu className="w-6 h-6 text-gray-600" />}
        
        {/* Collapse Toggle Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg transition-shadow"
            style={{ zIndex: 51 }}
          >
            {collapsed ? (
              <ChevronLeft className="w-4 h-4 text-gray-600 transform rotate-180" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  } ${collapsed ? 'justify-center' : ''}`}
                  style={{
                    backgroundColor: isActive ? '#2563EB' : 'transparent'
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={onLogout}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}