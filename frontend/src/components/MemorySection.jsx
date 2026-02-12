// src/components/MemorySection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Share2, Bookmark, Play, MapPin, Calendar, User, Eye, MessageCircle } from 'lucide-react';

const MemorySection = ({ title, items = [], moreLink = "/", onLike, onSave, onShare }) => {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/memory/${item.id}`);
  };

  const handleLike = (e, id) => {
    e.stopPropagation();
    if (onLike) onLike(id);
  };

  const handleSave = (e, id) => {
    e.stopPropagation();
    if (onSave) onSave(id);
  };

  const handleShare = (e, item) => {
    e.stopPropagation();
    if (onShare) onShare(item);
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-red-200 to-blue-200 ml-6 rounded-full"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
            onClick={() => handleCardClick(item)}
          >
            <div className="relative overflow-hidden">
              {item.type === "image" ? (
                <img 
                  src={item.media} 
                  alt={item.title} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="relative">
                  <img 
                    src={item.media} 
                    alt={item.title} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Play className="text-white w-12 h-12 opacity-80" />
                  </div>
                </div>
              )}
              
              {/* Overlay actions */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => handleSave(e, item.id)}
                  className={`p-2 rounded-full backdrop-blur-sm ${
                    item.isSaved ? 'bg-yellow-500 text-white' : 'bg-white/80 text-gray-700'
                  } hover:scale-110 transition-all`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleShare(e, item)}
                  className="p-2 rounded-full bg-white/80 text-gray-700 hover:scale-110 transition-all backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  item.category === 'martyrs' ? 'bg-red-500/80 text-white' :
                  item.category === 'survivors' ? 'bg-green-500/80 text-white' :
                  'bg-blue-500/80 text-white'
                }`}>
                  {item.category?.charAt(0).toUpperCase() + item.category?.slice(1) || 'Story'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* Meta information */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </div>
                )}
                {item.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Tags */}
              {item.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{item.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Engagement stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => handleLike(e, item.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      item.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
                    {item.likes || 0}
                  </button>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    {item.views || 0}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    {item.comments || 0}
                  </span>
                </div>
                {item.author && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <User className="w-3 h-3" />
                    {item.author}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate(moreLink)}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-medium"
        >
          View All {title} →
        </button>
      </div>
    </div>
  );
};

export default MemorySection;