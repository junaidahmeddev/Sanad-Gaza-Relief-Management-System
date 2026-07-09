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
        const response = await axios.get('http://localhost:5000/api/stories');
        const survivorStories = response.data.filter(story => story.type === 'survivor' && story.approved);
        
        // Transform backend data to match MemoryListPage format
        const transformedSurvivors = survivorStories.map(story => ({
          id: story._id,
          title: story.title,
          description: story.description,
          mediaUrl: story.image ? `http://localhost:5000/uploads/${story.image}` : '/images/survivor-default.jpg',
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
            mediaUrl: "/images/survivor1.jpg", 
            mediaType: "image" 
          },
          { 
            id: '2',
            title: "Amina Hassan", 
            description: "Survived bombing in Gaza and now leads a youth support group.", 
            mediaUrl: "/images/survivor2.jpg", 
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
