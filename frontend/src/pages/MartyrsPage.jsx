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
        const response = await axios.get('http://localhost:5000/api/stories');
        const martyrStories = response.data.filter(story => story.type === 'martyr' && story.approved);
        
        // Transform backend data to match MemoryListPage format
        const transformedMartyrs = martyrStories.map(story => ({
          id: story._id,
          title: story.title,
          description: story.description,
          mediaUrl: story.image ? `http://localhost:5000/uploads/${story.image}` : '/images/martyr-default.jpg',
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
            mediaUrl: "/images/martyr1.jpg", 
            mediaType: "image" 
          },
          { 
            id: '2',
            title: "Dr. Sarah Hassan", 
            description: "Medical professional who worked tirelessly to save lives during the conflict.", 
            mediaUrl: "/images/martyr2.jpg", 
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
