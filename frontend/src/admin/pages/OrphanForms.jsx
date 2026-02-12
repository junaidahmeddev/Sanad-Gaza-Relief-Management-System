import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrphanForms = () => {
  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrphans();
  }, []);

  const fetchOrphans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orphans');
      setOrphans(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orphans:', error);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orphans/${id}`, { status });
      fetchOrphans(); // Refresh the list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Orphan Management</h2>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Needs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orphans.map((orphan) => (
              <tr key={orphan._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {orphan.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {orphan.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {orphan.guardian}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {orphan.needs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    orphan.status === 'approved' ? 'bg-green-100 text-green-800' :
                    orphan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {orphan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => updateStatus(orphan._id, 'approved')}
                    className="text-green-600 hover:text-green-900"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(orphan._id, 'rejected')}
                    className="text-red-600 hover:text-red-900"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrphanForms;