// src/components/MemoryCard.jsx
import React from 'react';

const MemoryCard = ({ imageUrl, title, description, tags = [], onMoreClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
      {/* Image / Video */}
      <div className="w-full h-48 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 flex-grow">{description}</p>

        {/* Tags */}
        <div className="mt-3 flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* More Button */}
        {onMoreClick && (
          <button
            onClick={onMoreClick}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg self-end"
          >
            More
          </button>
        )}
      </div>
    </div>
  );
};

export default MemoryCard;
