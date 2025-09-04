import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Calculator, 
  Sparkles, 
  Settings, 
  User,
  LogOut,
  Layers
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeItem, setActiveItem }) => {   // remove interface
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'apply', label: 'Apply for Loan', icon: FileText },
    { id: 'status', label: 'Application Status', icon: Clock },
    { id: 'calculator', label: 'Loan Calculator', icon: Calculator },
    { id: 'summary', label: 'AI Summary', icon: Sparkles },
  ];

  return (
    <div className="sidebar">
      {/* JSX structure remains the same */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Layers className="icon" />
        </div>
        <span className="logo-text">LoanSimplify</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`nav-button ${activeItem === item.id ? 'active' : ''}`}
                >
                  <Icon className="icon" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings */}
      <div className="sidebar-settings">
        <button
          onClick={() => setActiveItem('settings')}
          className={`nav-button ${activeItem === 'settings' ? 'active' : ''}`}
        >
          <Settings className="icon" />
          <span>Settings</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="sidebar-user">
        <div className="user-info">
          <div className="user-avatar">
            <User className="icon small-icon" />
          </div>
          <p className="user-name">John Doe</p>
        </div>
        <button className="nav-button logout-button">
          <LogOut className="icon small-icon" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
