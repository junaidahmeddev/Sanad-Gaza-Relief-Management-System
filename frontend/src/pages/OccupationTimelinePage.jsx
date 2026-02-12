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
        const response = await axios.get('http://localhost:5000/api/stories');
        const occupationStories = response.data.filter(story => story.type === 'occupation' && story.approved);
        
        // Transform backend data to match MemoryListPage format
        const transformedTimeline = occupationStories.map(story => ({
          id: story._id,
          title: story.title,
          description: story.description,
          mediaUrl: story.image ? `http://localhost:5000/uploads/${story.image}` : '/images/timeline-default.jpg',
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
            mediaUrl: "/images/timeline1.jpg", 
            mediaType: "image" 
          },
          { 
            id: '2',
            title: "Humanitarian Crisis", 
            description: "Documentation of the humanitarian situation during the siege.", 
            mediaUrl: "/images/timeline2.jpg", 
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
