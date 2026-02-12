import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Users, 
  UserPlus, 
  Shield,
  X,
  DollarSign
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "Donations", path: "/admin/donations", icon: DollarSign },
  { name: "Manage Stories", path: "/admin/stories", icon: FileText },
  { name: "Orphan Forms", path: "/admin/orphans", icon: Users },
  { name: "Volunteer Forms", path: "/admin/volunteers", icon: UserPlus },
  { name: "Blacklist", path: "/admin/blacklist", icon: Shield },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        transition-transform duration-300 ease-in-out shadow-2xl
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h2 className="text-xl font-bold text-white">Sanad Admin</h2>
          </div>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {links.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || 
                               (link.path === '/admin/dashboard' && location.pathname === '/admin');
              return (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105" 
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* User Profile */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AD</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Admin User</p>
                <p className="text-slate-400 text-xs">admin@sanad.org</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;