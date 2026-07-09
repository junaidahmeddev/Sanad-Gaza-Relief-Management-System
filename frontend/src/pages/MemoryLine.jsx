// src/pages/MemoryLine.jsx
import React, { useState, useEffect } from "react";
import { Search, Filter, Grid, List } from 'lucide-react';
import MemorySection from "../components/MemorySection";
import axios from "axios";

const MemoryLine = () => {
  const [memories, setMemories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(true);

  // Fetch memories from backend
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/memories');
        setMemories(response.data);
      } catch (error) {
        console.error('Error fetching memories:', error);
        // Fallback to sample data if backend is not available
        setMemories(sampleItems);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  // Enhanced sample data (fallback)
  const sampleItems = [
    {
      id: '1',
      title: "Martyr Ahmed Al-Masri",
      description: "A brave soul who lost his life while saving others during the siege of Gaza. His heroic actions saved 12 families from a collapsed building.",
      media: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400",
      type: "image",
      category: "martyrs",
      location: "Gaza Strip",
      date: "2024-01-15",
      tags: ["hero", "gaza", "courage", "sacrifice"],
      likes: 284,
      views: 1240,
      comments: 45,
      isLiked: false,
      isSaved: false,
      author: "Memory Keeper",
      fullStory: "Ahmed Al-Masri was a 28-year-old father of two who worked as a paramedic in Gaza. On the night of January 15th, when an airstrike hit a residential building, Ahmed rushed to the scene despite the ongoing bombardment. He managed to rescue 12 families, including 8 children, before the building completely collapsed. His final words were reported to be 'Save the children first.' Ahmed's courage and selflessness exemplify the spirit of humanity even in the darkest times."
    },
    {
      id: '2',
      title: "Video from Rafah Crossing",
      description: "Captured footage showing the humanitarian situation at the border crossing, documenting the struggles of families seeking safety.",
      media: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      type: "video",
      category: "timeline",
      location: "Rafah Crossing",
      date: "2024-02-03",
      tags: ["border", "humanitarian", "families", "hope"],
      likes: 156,
      views: 892,
      comments: 28,
      isLiked: true,
      isSaved: false,
      author: "Citizen Journalist",
      fullStory: "This footage was captured by a local journalist who documented the daily struggles at the Rafah crossing. Families wait for hours, sometimes days, hoping to cross to safety. The video shows children playing despite the circumstances, elderly people waiting patiently, and the resilience of the human spirit in the face of adversity."
    },
    {
      id: '3',
      title: "Child Survivor: Layla's Story",
      description: "Despite losing both parents in the bombing, 7-year-old Layla was pulled from the rubble alive after 18 hours, showing incredible resilience.",
      media: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      type: "image",
      category: "survivors",
      location: "Khan Younis",
      date: "2024-01-28",
      tags: ["survivor", "children", "hope", "resilience"],
      likes: 421,
      views: 2340,
      comments: 87,
      isLiked: false,
      isSaved: true,
      author: "Relief Worker",
      fullStory: "Layla was found after 18 hours trapped under the rubble of her family home. Rescue workers heard her singing a lullaby her mother used to sing to her. Despite her injuries and trauma, her first words to rescuers were asking about her pet cat. Layla's story has become a symbol of hope and the unbreakable spirit of children even in the darkest circumstances."
    },
    {
      id: '4',
      title: "Community Kitchen Initiative",
      description: "Local volunteers organize daily meals for displaced families, serving over 500 people each day with limited resources.",
      media: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
      type: "image",
      category: "survivors",
      location: "Gaza City",
      date: "2024-02-10",
      tags: ["community", "solidarity", "food", "volunteers"],
      likes: 189,
      views: 1156,
      comments: 34,
      isLiked: true,
      isSaved: true,
      author: "Community Leader",
      fullStory: "Started by a group of local women, this community kitchen has become a beacon of hope. Using donated ingredients and cooking equipment, volunteers prepare traditional Palestinian dishes for displaced families. The kitchen operates 12 hours a day and has served over 15,000 meals since its inception."
    },
    {
      id: '5',
      title: "Medical Team Under Fire",
      description: "Healthcare workers continue to provide medical care despite dangerous conditions, saving lives while risking their own.",
      media: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
      type: "image",
      category: "martyrs",
      location: "Al-Shifa Hospital",
      date: "2024-01-20",
      tags: ["medical", "heroes", "healthcare", "dedication"],
      likes: 312,
      views: 1890,
      comments: 56,
      isLiked: false,
      isSaved: false,
      author: "Medical Correspondent",
      fullStory: "Dr. Sarah and her team at Al-Shifa Hospital worked for 72 hours straight during the most intense period of conflict. With limited supplies and constant threat, they performed life-saving surgeries by mobile phone flashlight when power was cut. Their dedication saved over 100 lives during this critical period."
    },
    {
      id: '6',
      title: "School Turned Shelter",
      description: "Educational institutions become temporary homes for displaced families, with teachers continuing to provide hope through learning.",
      media: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400",
      type: "image",
      category: "timeline",
      location: "UNRWA School",
      date: "2024-02-15",
      tags: ["education", "shelter", "teachers", "children"],
      likes: 267,
      views: 1445,
      comments: 42,
      isLiked: true,
      isSaved: false,
      author: "Education Volunteer",
      fullStory: "When conflict intensified, the UNRWA school opened its doors to 300 displaced families. Teachers voluntarily stayed to help, organizing classes for children in between meal distributions and medical checkups. Education became a form of psychological support, giving children a sense of normalcy and hope for the future."
    }
  ];
  const categories = [
    { id: 'all', name: 'All Stories', count: memories.length },
    { id: 'martyrs', name: 'Martyrs', count: memories.filter(m => m.category === 'martyrs').length },
    { id: 'survivors', name: 'Survivors', count: memories.filter(m => m.category === 'survivors').length },
    { id: 'timeline', name: 'Timeline', count: memories.filter(m => m.category === 'timeline').length }
  ];


  const handleLike = (id) => {
    setMemories(prev => prev.map(memory =>
      memory.id === id
        ? { ...memory, isLiked: !memory.isLiked, likes: memory.isLiked ? memory.likes - 1 : memory.likes + 1 }
        : memory
    ));
  };

  const handleSave = (id) => {
    setMemories(prev => prev.map(memory =>
      memory.id === id ? { ...memory, isSaved: !memory.isSaved } : memory
    ));
  };

  const handleShare = (memory) => {
    if (navigator.share) {
      navigator.share({
        title: memory.title,
        text: memory.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${memory.title}: ${window.location.href}`);
      // You could add a toast notification here
    }
  };

  const getFilteredMemories = (category) => {
    let filtered = memories;
    if (category !== 'all') {
      filtered = memories.filter(memory => memory.category === category);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(memory =>
        memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort logic
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'viewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    return filtered;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading memories...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Modern Header */}
          <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Memory Vault
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search memories, tags, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex flex-wrap gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="viewed">Most Viewed</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap transition-all font-medium ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <MemorySection
          title="Martyr Vault"
          items={getFilteredMemories('martyrs')}
          moreLink="/memory/martyrs"
          onLike={handleLike}
          onSave={handleSave}
          onShare={handleShare}
        />
        
        <MemorySection
          title="Survivor Vault"
          items={getFilteredMemories('survivors')}
          moreLink="/memory/survivors"
          onLike={handleLike}
          onSave={handleSave}
          onShare={handleShare}
        />
        
        <MemorySection
          title="Occupation Timeline"
          items={getFilteredMemories('timeline')}
          moreLink="/memory/timeline"
          onLike={handleLike}
          onSave={handleSave}
          onShare={handleShare}
        />

        {/* All Stories Section */}
        {searchTerm && (
          <MemorySection
            title={`Search Results for "${searchTerm}"`}
            items={getFilteredMemories('all')}
            moreLink="/memory/search"
            onLike={handleLike}
            onSave={handleSave}
            onShare={handleShare}
          />        )}
      </div>
        </>
      )}
    </div>
  );
};

export default MemoryLine;