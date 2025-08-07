import  { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { Dashboard } from './components/Dashboard';
import { SurveyManagement } from './components/SurveyManagement';
import { SurveyResponse } from './components/SurveyResponse';
import { TicketManagement } from './components/TicketManagement';
import { Notifications } from './components/Notifications';
import { Escalation } from './components/Escalation';
import { UserManagement } from './components/UserManagement';
import { Settings } from './components/Settings';
import { AddTenant } from './components/AddTenant';
import { ManageTenants } from './components/ManageTenants';
import { BrandingConfiguration } from './components/BrandingConfiguration';
import { ManageDepartments } from './components/ManageDepartments';
import { EscalationMatrix } from './components/EscalationMatrix';
import { NPSConfiguration } from './components/NPSConfiguration';
import { ManageUsers } from './components/ManageUsers';
import { ManageRoles } from './components/ManageRoles';
import { PermissionMatrix } from './components/PermissionMatrix';
import { ScreenAccessControl } from './components/ScreenAccessControl';
import { AddRule } from './components/AddRule';
import { ManageExistingRules } from './components/ManageExistingRules';
import { NotificationSettingsConfig } from './components/NotificationSettingsConfig';
import { TicketConfigurationSettings } from './components/TicketConfigurationSettings';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: 'Michael', role: 'Admin' });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  if (!isAuthenticated) {
    if (currentPage === 'signup') {
      return <SignupPage onSwitchToLogin={() => setCurrentPage('login')} onSignup={handleLogin} />;
    }
    return <LoginPage onSwitchToSignup={() => setCurrentPage('signup')} onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'survey-management':
        return <SurveyManagement />;
      case 'survey-response':
        return <SurveyResponse />;
      case 'ticket-management':
        return <TicketManagement />;
      case 'notifications':
        return <Notifications />;
      case 'escalation':
        return <Escalation />;
      case 'user-management':
        return <UserManagement />;
      case 'settings':
        return <Settings onNavigate={setCurrentPage} />;
      
      // Tenant Management Features
      case 'add-tenant':
        return <AddTenant onNavigate={setCurrentPage} />;
      case 'manage-tenants':
        return <ManageTenants onNavigate={setCurrentPage} />;
      case 'branding-configuration':
        return <BrandingConfiguration onNavigate={setCurrentPage} />;
      
      // Department Settings Features
      case 'manage-departments':
        return <ManageDepartments onNavigate={setCurrentPage} />;
      case 'escalation-matrix':
        return <EscalationMatrix onNavigate={setCurrentPage} />;
      case 'nps-configuration':
        return <NPSConfiguration onNavigate={setCurrentPage} />;
      
      // User & Role Management Features
      case 'manage-users':
        return <ManageUsers onNavigate={setCurrentPage} />;
      case 'manage-roles':
        return <ManageRoles onNavigate={setCurrentPage} />;
      case 'user-role-assignment':
        return <ManageUsers onNavigate={setCurrentPage} />;
      case 'permission-matrix':
        return <PermissionMatrix onNavigate={setCurrentPage} />;
      case 'screen-access-control':
        return <ScreenAccessControl onNavigate={setCurrentPage} />;
      
      // Ticket Configuration Features
      case 'ticket-configuration-settings':
        return <TicketConfigurationSettings onNavigate={setCurrentPage} />;
      
      // Survey Configuration Features
      case 'source-configurations':
        return <SurveyManagement />;
      
      // Notification Settings Features
      case 'notification-settings-config':
        return <NotificationSettingsConfig onNavigate={setCurrentPage} />;
      
      // Rule Box Features
      case 'add-rule':
        return <AddRule onNavigate={setCurrentPage} />;
      case 'manage-existing-rules':
        return <ManageExistingRules onNavigate={setCurrentPage} />;
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      <div className="flex">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
          onLogout={handleLogout}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Header user={user} currentPage={currentPage} />
          <main className="p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}