import React, { useState, useEffect } from "react";
import axios from "axios";
import MemoryListPage from "../components/MemoryListPage";

export default function SurvivorsPage() {
  const [survivors, setSurvivors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurvivors = async () => {
      try {
        setLoading(true);
        // Fetch stories of type 'survivor' from backend
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/stories`);
        const survivorStories = response.data.filter(story => story.type === 'survivor' && story.approved);
        
        // Transform backend data to match MemoryListPage format
        const transformedSurvivors = survivorStories.map(story => ({
          id: story._id,
          title: story.title,
          description: story.description,
          mediaUrl: story.image ? `${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`}/uploads/${story.image}` : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60',
          mediaType: story.image ? 'image' : 'image',
          createdAt: story.createdAt
        }));
        
        setSurvivors(transformedSurvivors);
      } catch (error) {
        console.error('Error fetching survivor stories:', error);
        // Fallback to sample data
        setSurvivors([
          { 
            id: '1',
            title: "Layla's Story", 
            description: "Despite losing both parents, 7-year-old Layla was pulled from the rubble alive after 18 hours.", 
            mediaUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=60", 
            mediaType: "image" 
          },
          { 
            id: '2',
            title: "Amina Hassan", 
            description: "Survived bombing in Gaza and now leads a youth support group.", 
            mediaUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=60", 
            mediaType: "image" 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvivors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading survivor stories...</p>
        </div>
      </div>
    );
  }

  return <MemoryListPage title="Survivor Vault" items={survivors} type="survivors" />;
}
