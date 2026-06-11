import React, { useState } from "react";

const MartyrList = () => {
  const [stories, setStories] = useState([
    { name: "Ahmed Yasin", date: "2004-03-22", story: "Founder of Hamas, martyred in Israeli airstrike." },
    { name: "Razan al-Najjar", date: "2018-06-01", story: "Palestinian medic shot while helping wounded." },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newStory, setNewStory] = useState({ name: "", date: "", story: "" });

  const handleAdd = () => {
    setStories([...stories, newStory]);
    setNewStory({ name: "", date: "", story: "" });
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center text-red-600">Martyrs of Gaza</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4 border-l-4 border-red-600">
            <h3 className="text-xl font-semibold">{story.name}</h3>
            <p className="text-sm text-gray-500">{story.date}</p>
            <p className="mt-2">{story.story}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          Add Martyr Story
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">New Martyr Story</h3>
            <input
              type="text"
              placeholder="Name"
              value={newStory.name}
              onChange={(e) => setNewStory({ ...newStory, name: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="date"
              value={newStory.date}
              onChange={(e) => setNewStory({ ...newStory, date: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <textarea
              placeholder="Story"
              value={newStory.story}
              onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
              className="w-full mb-3 p-2 border rounded h-24"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="text-gray-600">
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MartyrList;
