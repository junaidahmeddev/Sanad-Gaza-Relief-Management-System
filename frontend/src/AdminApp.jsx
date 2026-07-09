import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DonationOverview from "./admin/pages/DonationOverview";
// Future imports for story, orphan, volunteer, blacklist
// import StoryManager from "./admin/pages/StoryManager";
// import OrphanForms from "./admin/pages/OrphanForms";
// import VolunteerForms from "./admin/pages/VolunteerForms";
// import Blacklist from "./admin/pages/Blacklist";

const AdminApp = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4 space-y-4">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <Link to="/admin/donations" className="block px-3 py-2 rounded hover:bg-green-100">Donations Overview</Link>
            <Link to="/admin/stories" className="block px-3 py-2 rounded hover:bg-green-100">Manage Stories</Link>
            <Link to="/admin/orphans" className="block px-3 py-2 rounded hover:bg-green-100">Orphan Forms</Link>
            <Link to="/admin/volunteers" className="block px-3 py-2 rounded hover:bg-green-100">Volunteer Forms</Link>
            <Link to="/admin/blacklist" className="block px-3 py-2 rounded hover:bg-green-100">Blacklist Management</Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/admin/donations" element={<DonationOverview />} />
            {/* Other Routes */}
            {/* <Route path="/admin/stories" element={<StoryManager />} /> */}
            {/* <Route path="/admin/orphans" element={<OrphanForms />} /> */}
            {/* <Route path="/admin/volunteers" element={<VolunteerForms />} /> */}
            {/* <Route path="/admin/blacklist" element={<Blacklist />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AdminApp;
