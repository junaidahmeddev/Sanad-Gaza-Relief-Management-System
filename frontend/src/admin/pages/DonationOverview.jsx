import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const DonationOverview = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalAmount: 0,
    donorCount: 0,
    donationCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
    fetchStats();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/donations');
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/stats');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  // Transform donation data for chart
  const chartData = donations.reduce((acc, donation) => {
    const date = new Date(donation.createdAt).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.amount += donation.amount;
    } else {
      acc.push({ date, amount: donation.amount });
    }
    return acc;
  }, []).slice(-7); // Last 7 days

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-gray-500">Total Donations</h3>
          <p className="text-2xl font-bold text-green-600">${stats.totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-gray-500">Total Donors</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.donorCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="text-gray-500">Total Donations Made</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.donationCount}</p>
        </div>
      </div>

      {/* Donation Trend Line Chart */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Donation Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl p-6 shadow overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Recent Donations</h3>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Donor</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.slice(0, 10).map((donation) => (
              <tr key={donation._id} className="border-t">
                <td className="py-2 px-4">{donation.donor_name}</td>
                <td className="py-2 px-4 text-green-600 font-semibold">${donation.amount}</td>
                <td className="py-2 px-4">{donation.type}</td>
                <td className="py-2 px-4">{new Date(donation.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    Success
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationOverview;
