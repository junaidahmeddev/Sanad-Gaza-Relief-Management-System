import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Bell, Search, Settings, LogOut } from "lucide-react";

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('donations')) return 'Donation Overview';
    if (path.includes('stories')) return 'Story Management';
    if (path.includes('orphans')) return 'Orphan Forms';
    if (path.includes('volunteers')) return 'Volunteer Forms';
    if (path.includes('blacklist')) return 'Blacklist Management';
    return 'Admin Panel';
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu size={24} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
            <p className="text-slate-500 text-sm">Welcome back, Admin</p>
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-slate-100 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {/* Settings */}
          <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <Settings size={20} className="text-slate-600" />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200 hover:border-red-300"
            title="Logout"
          >
            <LogOut size={18} />
            <span className="hidden sm:block text-sm font-medium">Logout</span>
          </button>
          
          {/* Profile */}
          <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-slate-200">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900">Admin</p>
              <p className="text-slate-500 text-xs">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;