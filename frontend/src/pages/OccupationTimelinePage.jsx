import React, { useState, useEffect } from "react";
import axios from "axios";
import MemoryListPage from "../components/MemoryListPage";

export default function OccupationTimelinePage() {
  const [timelineStories, setTimelineStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimelineStories = async () => {
      try {
        setLoading(true);
        // Fetch stories of type 'occupation' from backend
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/stories`);
        const occupationStories = response.data.filter(story => story.type === 'occupation' && story.approved);
        
        // Transform backend data to match MemoryListPage format
        const transformedTimeline = occupationStories.map(story => ({
          id: story._id,
          title: story.title,
          description: story.description,
          mediaUrl: story.image ? `${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`}/uploads/${story.image}` : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60',
          mediaType: story.image ? 'image' : 'image',
          createdAt: story.createdAt
        }));
        
        setTimelineStories(transformedTimeline);
      } catch (error) {
        console.error('Error fetching timeline stories:', error);
        // Fallback to sample data
        setTimelineStories([
          { 
            id: '1',
            title: "2023 Gaza Conflict", 
            description: "Timeline event documenting the major events of the 2023 conflict.", 
            mediaUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60", 
            mediaType: "image" 
          },
          { 
            id: '2',
            title: "Humanitarian Crisis", 
            description: "Documentation of the humanitarian situation during the siege.", 
            mediaUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=60", 
            mediaType: "image" 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading timeline stories...</p>
        </div>
      </div>
    );
  }

  return <MemoryListPage title="Occupation Timeline" items={timelineStories} type="timeline" />;
}
