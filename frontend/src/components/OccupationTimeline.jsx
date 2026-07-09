// src/components/OccupationTimeline.jsx
import React from "react";

const timelineData = [
  {
    year: "1948",
    title: "Nakba – The Catastrophe",
    description: "Hundreds of thousands of Palestinians were displaced.",
  },
  {
    year: "1967",
    title: "Six-Day War",
    description: "Israel occupied Gaza Strip and West Bank.",
  },
  {
    year: "2023",
    title: "Gaza Under Siege",
    description: "Major bombardments in Gaza, hundreds martyred.",
  },
];

const OccupationTimeline = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Occupation Timeline</h2>
      <div className="border-l-4 border-green-500 pl-6 space-y-6">
        {timelineData.map((event, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-2 top-1.5 w-4 h-4 bg-green-500 rounded-full"></div>
            <h3 className="text-xl font-semibold">{event.year} – {event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OccupationTimeline;
