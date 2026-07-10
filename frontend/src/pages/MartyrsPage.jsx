import React, { useState, useEffect } from "react";
import axios from "axios";
import MemoryListPage from "../components/MemoryListPage";

export default function MartyrsPage() {
  const [martyrs, setMartyrs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMartyrs = async () => {
      try {
        setLoading(true);
        // Fetch stories of type 'martyr' from backend
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/stories`);
        const martyrStories = response.data.filter(story => story.type === 'martyr' && story.approved);
        
        // Transform backend data to match MemoryListPage format
        const transformedMartyrs = martyrStories.map(story => ({
          id: story._id,
          title: story.title,
          description: story.description,
          mediaUrl: story.image ? `${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`}/uploads/${story.image}` : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60',
          mediaType: story.image ? 'image' : 'image',
          createdAt: story.createdAt
        }));
        
        setMartyrs(transformedMartyrs);
      } catch (error) {
        console.error('Error fetching martyr stories:', error);
        // Fallback to sample data
        setMartyrs([
          { 
            id: '1',
            title: "Ahmed Al-Masri", 
            description: "A brave soul who lost his life while saving others during the siege of Gaza.", 
            mediaUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60", 
            mediaType: "image" 
          },
          { 
            id: '2',
            title: "Dr. Sarah Hassan", 
            description: "Medical professional who worked tirelessly to save lives during the conflict.", 
            mediaUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=60", 
            mediaType: "image" 
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMartyrs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading martyr stories...</p>
        </div>
      </div>
    );
  }

  return <MemoryListPage title="Martyr Vault" items={martyrs} type="martyrs" />;
}
