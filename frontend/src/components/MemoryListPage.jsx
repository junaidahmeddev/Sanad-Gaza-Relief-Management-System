import React, { useEffect, useState } from "react";
import { Heart, Eye, MessageCircle, Calendar } from "lucide-react";

const MemoryListPage = ({ title, items, type }) => {
  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'martyrs':
        return 'border-red-500 bg-red-50';
      case 'survivors':
        return 'border-green-500 bg-green-50';
      case 'timeline':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'martyrs':
        return '🕊️';
      case 'survivors':
        return '💚';
      case 'timeline':
        return '📅';
      default:
        return '📖';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <span className="text-4xl">{getTypeIcon(type)}</span>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {type === 'martyrs' && "Honoring the memory of those who gave their lives for freedom"}
              {type === 'survivors' && "Celebrating the resilience and strength of survivors"}
              {type === 'timeline' && "Documenting the historical events and their impact"}
              {!type && "Stories that matter, preserved for future generations"}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {items.length} {items.length === 1 ? 'story' : 'stories'} found
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Stories Yet</h3>
            <p className="text-gray-600">Be the first to share a story in this category.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.slice(0, visibleCount).map((item) => (
                <div key={item.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 ${getTypeColor(type)}`}>
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {item.mediaType === "image" ? (
                      <img 
                        src={item.mediaUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/images/default-story.jpg';
                        }}
                      />
                    ) : item.mediaType === "video" ? (
                      <video controls className="w-full h-full object-cover">
                        <source src={item.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-4xl text-gray-400">📖</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      {item.createdAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.likes || 0}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views || 0}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {item.comments || 0}
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-200">
                      Read Full Story
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < items.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Load More Stories ({items.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemoryListPage;