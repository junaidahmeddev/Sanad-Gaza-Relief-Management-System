import React, { useState, useEffect } from 'react';
import { Plus, FileText, Eye, Check, X, Upload, Image, Video, Calendar, User } from 'lucide-react';

const StoryManagement = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'survivor',
    image: null,
    video: null
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stories');
      const data = await response.json();
      setStories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stories/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (response.ok) {
        setStories(prev => 
          prev.map(story => 
            story._id === id ? { ...story, approved: true } : story
          )
        );
      }
    } catch (error) {
      console.error('Error approving story:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (response.ok) {
        setStories(prev => prev.filter(story => story._id !== id));
      }
    } catch (error) {
      console.error('Error rejecting story:', error);
    }
  };

  const handleCreateStory = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('approved', 'true'); // Admin stories are auto-approved
    
    if (formData.image) formDataToSend.append('image', formData.image);
    if (formData.video) formDataToSend.append('video', formData.video);

    try {
      const response = await fetch('http://localhost:5000/api/stories', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        const newStory = await response.json();
        setStories(prev => [newStory, ...prev]);
        setFormData({ title: '', description: '', type: 'survivor', image: null, video: null });
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error creating story:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredStories = stories.filter(story => {
    if (activeTab === 'pending') return !story.approved;
    if (activeTab === 'approved') return story.approved;
    return true;
  });

  const stats = {
    total: stories.length,
    pending: stories.filter(s => !s.approved).length,
    approved: stories.filter(s => s.approved).length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Story Management</h1>
          <p className="text-slate-600 mt-2">Manage user submissions and create admin stories</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Create Story
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Stories</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending Review</p>
              <p className="text-2xl font-bold text-slate-900">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Approved</p>
              <p className="text-2xl font-bold text-slate-900">{stats.approved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-6">
        <div className="border-b border-slate-200">
          <div className="flex">
            {[
              { key: 'all', label: 'All Stories', count: stats.total },
              { key: 'pending', label: 'Pending Review', count: stats.pending },
              { key: 'approved', label: 'Approved', count: stats.approved }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Stories List */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No stories found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStories.map(story => (
                <div key={story._id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-slate-900">{story.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          story.approved 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {story.approved ? 'Approved' : 'Pending'}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium capitalize">
                          {story.type}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-4 line-clamp-3">{story.description}</p>
                      
                      {/* Media Preview */}
                      <div className="flex gap-4 mb-4">
                        {story.image && (
                          <div className="relative">
                            <img
                              src={`http://localhost:5000/uploads/${story.image}`}
                              alt="Story"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                              <Image className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}
                        {story.video && (
                          <div className="relative">
                            <video className="w-20 h-20 object-cover rounded-lg">
                              <source src={`http://localhost:5000/uploads/${story.video}`} />
                            </video>
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                              <Video className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(story.createdAt).toLocaleDateString()}
                        </div>
                        {story.submittedBy && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {story.submittedBy}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {!story.approved && (
                        <button
                          onClick={() => handleApprove(story._id)}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleReject(story._id)}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        {story.approved ? 'Delete' : 'Reject'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Story Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Create New Story</h2>
              <p className="text-slate-600 mt-1">Create an admin story that will be automatically approved</p>
            </div>
            
            <form onSubmit={handleCreateStory} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Story Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="survivor">Survivor Story</option>
                  <option value="martyr">Martyr Story</option>
                  <option value="general">General Story</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                        <span className="text-sm text-slate-600">
                          {formData.image ? formData.image.name : 'Choose image'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Video</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setFormData({ ...formData, video: e.target.files[0] })}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                        <span className="text-sm text-slate-600">
                          {formData.video ? formData.video.name : 'Choose video'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Create Story
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryManagement;
