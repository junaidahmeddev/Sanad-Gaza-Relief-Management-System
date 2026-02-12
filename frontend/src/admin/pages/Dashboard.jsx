import React, { useRef, useEffect, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp,
  Download,
  Calendar,
  Filter,
  Eye,
  Heart,
  UserPlus
} from "lucide-react";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const chartRef = useRef();
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [orphans, setOrphans] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [donationsRes, volunteersRes, orphansRes, storiesRes] = await Promise.all([
        fetch('http://localhost:5000/api/donations').catch(() => ({ json: () => [] })),
        fetch('http://localhost:5000/api/volunteers').catch(() => ({ json: () => [] })),
        fetch('http://localhost:5000/api/orphans').catch(() => ({ json: () => [] })),
        fetch('http://localhost:5000/api/stories').catch(() => ({ json: () => [] }))
      ]);

      const [donationsData, volunteersData, orphansData, storiesData] = await Promise.all([
        donationsRes.json ? donationsRes.json() : [],
        volunteersRes.json ? volunteersRes.json() : [],
        orphansRes.json ? orphansRes.json() : [],
        storiesRes.json ? storiesRes.json() : []
      ]);

      setDonations(Array.isArray(donationsData) ? donationsData : []);
      setVolunteers(Array.isArray(volunteersData) ? volunteersData : []);
      setOrphans(Array.isArray(orphansData) ? orphansData : []);
      setStories(Array.isArray(storiesData) ? storiesData : []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalDonations = donations.reduce((acc, donation) => acc + (donation.amount || 0), 0);
  const monthlyDonations = calculateMonthlyData(donations);
  const donationsByType = calculateDonationsByType(donations);

  function calculateMonthlyData(donations) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    return months.map((month, index) => {
      const monthDonations = donations.filter(donation => {
        const donationDate = new Date(donation.createdAt || donation.date);
        return donationDate.getMonth() === index && donationDate.getFullYear() === currentYear;
      });
      
      const amount = monthDonations.reduce((acc, donation) => acc + (donation.amount || 0), 0);
      return { month, amount };
    });
  }

  function calculateDonationsByType(donations) {
    const types = donations.reduce((acc, donation) => {
      const type = donation.type || 'General';
      acc[type] = (acc[type] || 0) + (donation.amount || 0);
      return acc;
    }, {});

    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];
    return Object.entries(types).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }));
  }

  const handleExportPDF = async () => {
    try {
      const input = chartRef.current;
      const canvas = await html2canvas(input, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      pdf.setFontSize(20);
      pdf.text('Sanad Charity Dashboard Report', 20, 20);
      
      // Add date
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
      
      // Add stats
      pdf.text(`Total Donations: $${totalDonations.toLocaleString()}`, 20, 45);
      pdf.text(`Total Volunteers: ${volunteers.length}`, 20, 55);
      pdf.text(`Total Orphans: ${orphans.length}`, 20, 65);
      pdf.text(`Total Stories: ${stories.length}`, 20, 75);
      
      // Add chart
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 20, 85, imgWidth, imgHeight);
      
      pdf.save('sanad-dashboard-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{label}</p>
          <p className="text-blue-600">
            Amount: <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{payload[0].name}</p>
          <p className="text-slate-600">
            <span className="font-bold">${payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="p-6 space-y-6" ref={chartRef}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-slate-600 mt-1">Monitor your charity operations and analytics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-slate-700">
            <Calendar size={18} />
            <span className="hidden sm:inline">This Month</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-slate-700">
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="Total Donations" 
              value={totalDonations.toLocaleString()} 
              icon={DollarSign} 
              color="bg-gradient-to-r from-green-500 to-emerald-600"
              change={12.5}
              prefix="$"
            />
            <StatsCard 
              title="Volunteers" 
              value={volunteers.length.toLocaleString()} 
              icon={UserPlus} 
              color="bg-gradient-to-r from-blue-500 to-cyan-600"
              change={8.2}
            />
            <StatsCard 
              title="Orphans Registered" 
              value={orphans.length.toLocaleString()} 
              icon={Heart} 
              color="bg-gradient-to-r from-purple-500 to-pink-600"
              change={-2.1}
            />
            <StatsCard 
              title="Stories" 
              value={stories.length.toLocaleString()} 
              icon={FileText} 
              color="bg-gradient-to-r from-orange-500 to-red-600"
              change={5.7}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Monthly Donations</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Amount ($)</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyDonations}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="amount" 
                      fill="url(#colorGradient)"
                      radius={[6, 6, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1E40AF" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donation Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Donation Types</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donationsByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {donationsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4 flex-wrap">
                {donationsByType.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-slate-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Donations */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Recent Donations</h3>
                <p className="text-slate-600 text-sm mt-1">Latest donation activities</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Amount</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Type</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {donations.slice(0, 5).map((donation, index) => (
                      <tr key={donation._id || index} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-bold text-green-600">${(donation.amount || 0).toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {donation.type || 'General'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 text-sm">
                          {new Date(donation.createdAt || donation.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {donations.length === 0 && (
                      <tr>
                        <td colSpan="3" className="px-4 py-8 text-center text-slate-500">
                          No donations yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Stories */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">Recent Stories</h3>
                <p className="text-slate-600 text-sm mt-1">Latest story submissions</p>
              </div>
              
              <div className="p-4 space-y-3">
                {stories.slice(0, 5).map((story, index) => (
                  <div key={story._id || index} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 truncate">{story.title}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          story.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {story.approved ? 'Approved' : 'Pending'}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(story.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {stories.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No stories yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;