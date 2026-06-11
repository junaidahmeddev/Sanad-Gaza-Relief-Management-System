import { useEffect, useState } from 'react';
import axios from 'axios';

const StoryList = () => {
  const [stories, setStories] = useState([]);

useEffect(() => {
  const fetchStories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stories');
      console.log('Fetched stories:', res.data);
      setStories(res.data); // make sure this is an array
    } catch (err) {
      console.error('Error fetching stories:', err);
      setStories([]); // set to empty array to prevent .map error
    }
  };

  fetchStories();
}, []);


  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/stories/${id}/approve`);
      setStories((prev) =>
        prev.map((story) =>
          story._id === id ? { ...story, approved: true } : story
        )
      );
    } catch (err) {
      console.error('Error approving story:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stories/${id}`);
      setStories((prev) => prev.filter((story) => story._id !== id));
    } catch (err) {
      console.error('Error deleting story:', err);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("type", type);
  formData.append("image", image); // input type="file" for image
  formData.append("video", video); // input type="file" for video

  try {
    const response = await axios.post("http://localhost:5000/api/stories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Story submitted:", response.data);
  } catch (error) {
    console.error("❌ Submission failed:", error);
  }
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Submitted Stories</h2>
      {stories.map((story) => (
        <div key={story._id} className="border p-4 mb-2 rounded shadow">
          <h3 className="text-lg font-semibold">{story.title}</h3>
          <p>{story.description}</p>
          <p>Type: {story.type}</p>
          <p>Status: {story.approved ? '✅ Approved' : '⏳ Pending'}</p>
          {story.image && (
            <img
              src={`http://localhost:5000/uploads/${story.image}`}
              alt="Story Image"
              className="w-32 mt-2"
            />
          )}
          {story.video && (
            <video controls className="w-64 mt-2">
              <source src={`http://localhost:5000/uploads/${story.video}`} />
            </video>
          )}
          <div className="mt-2 space-x-2">
            {!story.approved && (
              <button
                onClick={() => handleApprove(story._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
            )}
            <button
              onClick={() => handleDelete(story._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
