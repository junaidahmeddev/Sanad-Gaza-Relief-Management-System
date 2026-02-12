import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blacklist = () => {
  const [blacklistEntries, setBlacklistEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: '', reason: '', addedBy: '' });

  useEffect(() => {
    fetchBlacklistEntries();
  }, []);

  const fetchBlacklistEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blacklist');
      setBlacklistEntries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blacklist entries:', error);
      setLoading(false);
    }
  };

  const addEntry = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blacklist', newEntry);
      setNewEntry({ name: '', reason: '', addedBy: '' });
      setShowAddForm(false);
      fetchBlacklistEntries();
    } catch (error) {
      console.error('Error adding blacklist entry:', error);
    }
  };

  const deleteEntry = async (id) => {
    if (window.confirm('Are you sure you want to remove this entry?')) {
      try {
        await axios.delete(`http://localhost:5000/api/blacklist/${id}`);
        fetchBlacklistEntries();
      } catch (error) {
        console.error('Error deleting blacklist entry:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blacklist Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Add Entry
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Add Blacklist Entry</h3>
          <form onSubmit={addEntry} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newEntry.name}
              onChange={(e) => setNewEntry({...newEntry, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Reason for blacklisting"
              value={newEntry.reason}
              onChange={(e) => setNewEntry({...newEntry, reason: e.target.value})}
              className="w-full p-2 border rounded h-24"
              required
            />
            <input
              type="text"
              placeholder="Added by (admin name)"
              value={newEntry.addedBy}
              onChange={(e) => setNewEntry({...newEntry, addedBy: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                Add Entry
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blacklistEntries.map((entry) => (
              <tr key={entry._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {entry.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {entry.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.addedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteEntry(entry._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
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

export default Blacklist;