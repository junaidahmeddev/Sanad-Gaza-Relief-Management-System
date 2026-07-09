import { useEffect, useState } from "react";
import axios from "axios";

const AdminStoryPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stories");
      setStories(res.data);
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  };

  const approveStory = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/stories/${id}/approve`);
      fetchStories(); // Refresh the list
    } catch (err) {
      console.error("Error approving story:", err);
    }
  };

  const deleteStory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stories/${id}`);
      fetchStories();
    } catch (err) {
      console.error("Error deleting story:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Story Submissions</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Type</th>
            <th className="p-2">Approved</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story._id} className="border-t">
              <td className="p-2">{story.title}</td>
              <td className="p-2">{story.type}</td>
              <td className="p-2">
                {story.approved ? (
                  <span className="text-green-600">Approved</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </td>
              <td className="p-2 space-x-2">
                {!story.approved && (
                  <button
                    onClick={() => approveStory(story._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => deleteStory(story._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStoryPage;
