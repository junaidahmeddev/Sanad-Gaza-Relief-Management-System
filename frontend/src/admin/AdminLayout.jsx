import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import DonationOverview from './pages/DonationOverview';
import OrphanForms from './pages/OrphanForms';
import VolunteerForms from './pages/VolunteerForms';
import Blacklist from './pages/Blacklist';
import StoryManagement from './pages/StoryManagement';
import ProtectedRoute from './components/ProtectedRoute';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Topbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="donations" element={<DonationOverview />} />
              <Route path="orphans" element={<OrphanForms />} />
              <Route path="volunteers" element={<VolunteerForms />} />
              <Route path="blacklist" element={<Blacklist />} />
              <Route path="stories" element={<StoryManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;