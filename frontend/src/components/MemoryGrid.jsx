// src/components/MemoryGrid.jsx
import React from 'react';
import MemoryCard from './MemoryCard';
import { useNavigate } from 'react-router-dom';

const MemoryGrid = ({ memories }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {memories.map((memory, index) => (
        <MemoryCard
          key={index}
          imageUrl={memory.imageUrl}
          title={memory.title}
          description={memory.description}
          tags={memory.tags}
          onMoreClick={() => navigate(`/memory/${memory.id}`)}
        />
      ))}
    </div>
  );
};

export default MemoryGrid;
