import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonatePage from './pages/DonatePage'; // ✅ path correct?
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import MemoryLine from './pages/MemoryLine';
import MemoryDetail from './pages/MemoryDetail';
import Topbar from './components/topbar';
import MartyrsPage from "./pages/MartyrsPage";
import SurvivorsPage from "./pages/SurvivorsPage";
import OccupationTimelinePage from "./pages/OccupationTimelinePage";
import ContactPage from './pages/Contact';
import Footer from './components/Footer';
import DonationOverview from './admin/pages/DonationOverview';
import VolunteerForms from './admin/pages/VolunteerForms';
import OrphanForms from './admin/pages/OrphanForms';
import Blacklist from './admin/pages/Blacklist';
import AdminLayout from './admin/AdminLayout';
import StoryManagement from './admin/pages/StoryManagement';
import SubmitStory from './pages/SubmitStory';
import Dashboard from './admin/pages/Dashboard';
import OrphanWallet from './pages/OrphanWallet';
import BlacklistSec from './pages/BlacklistSec';
import GazaPlannerVolunteer from './pages/GazaPlannerVolunteer';
import AdminLogin from './admin/pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes without Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Topbar />
            <Navbar />
            <Home />
            <Footer/>
          </>
        } />
        <Route path="/contact" element={
          <>
            <Topbar />
            <Navbar />
            <ContactPage />
            <Footer/>
          </>
        } />
        <Route path="/donate" element={
          <>
            <Topbar />
            <Navbar />
            <DonatePage />
            <Footer/>
          </>
        } />
        <Route path="/donate/payment" element={
          <>
            <Topbar />
            <Navbar />
            <PaymentPage />
            <Footer/>
          </>
        } />
        <Route path="/donate/success" element={
          <>
            <Topbar />
            <Navbar />
            <SuccessPage />
            <Footer/>
          </>
        } />
        <Route path="/orphan-wallet" element={
          <>
            <Topbar />
            <Navbar />
            <OrphanWallet />
            <Footer/>
          </>
        } />
        <Route path="/rebuild-gaza" element={
          <>
            <Topbar />
            <Navbar />
            <GazaPlannerVolunteer />
            <Footer/>
          </>
        } />
        <Route path="/memory" element={
          <>
            <Topbar />
            <Navbar />
            <MemoryLine />
            <Footer/>
          </>
        } />
        <Route path="/memory/martyrs" element={
          <>
            <Topbar />
            <Navbar />
            <MartyrsPage />
            <Footer/>
          </>
        } />
        <Route path="/memory/survivors" element={
          <>
            <Topbar />
            <Navbar />
            <SurvivorsPage />
            <Footer/>
          </>
        } />
        <Route path="/memory/timeline" element={
          <>
            <Topbar />
            <Navbar />
            <OccupationTimelinePage />
            <Footer/>
          </>
        } />
        <Route path="/submit-story" element={
          <>
            <Topbar />
            <Navbar />
            <SubmitStory />
            <Footer/>
          </>
        } />
        <Route path="/blacklist" element={
          <>
            <Topbar />
            <Navbar />
            <BlacklistSec />
            <Footer/>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
