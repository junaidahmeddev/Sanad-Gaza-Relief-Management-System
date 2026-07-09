import { useState } from "react";
import axios from "axios";
import { FileImage, Video, Send, CheckCircle, AlertCircle, Upload } from "lucide-react";

const SubmitStory = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "martyr",
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storyData = new FormData();
    storyData.append("title", formData.title);
    storyData.append("description", formData.description);
    storyData.append("type", formData.type);
    if (image) storyData.append("image", image);
    if (video) storyData.append("video", video);

    try {
      const res = await axios.post("http://localhost:5000/api/stories", storyData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
      setFormData({ title: "", description: "", type: "martyr" });
      setImage(null);
      setVideo(null);
      
      // Reset form after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Share Your Story
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Help us preserve memories and honor lives by sharing stories that matter
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Submit Your Story</h2>
            <p className="text-green-100">Every story matters and will be reviewed before publishing</p>
          </div>

          <div className="p-8">
            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center">
                <div className="flex justify-center mb-3">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Story Submitted Successfully!</h3>
                <p className="text-green-700">Your story has been submitted for review. It will be published after approval.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Story Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Story Type</label>
                <select 
                  name="type" 
                  value={formData.type}
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="martyr">Martyr Story</option>
                  <option value="survivor">Survivor Story</option>
                  <option value="occupation">Occupation Timeline</option>
                </select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Story Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter a meaningful title for your story"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Story Description</label>
                <textarea
                  name="description"
                  placeholder="Share the details of your story. Be respectful and thoughtful in your words..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Media Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileImage className="w-4 h-4" />
                    Upload Image (Optional)
                  </label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setImage(e.target.files[0])}
                      className="hidden"
                      id="image-upload"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-200"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {image ? image.name : "Click to upload image"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Video Upload */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Video className="w-4 h-4" />
                    Upload Video (Optional)
                  </label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={(e) => setVideo(e.target.files[0])}
                      className="hidden"
                      id="video-upload"
                    />
                    <label 
                      htmlFor="video-upload"
                      className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-200"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {video ? video.name : "Click to upload video"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Guidelines */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Submission Guidelines</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Stories will be reviewed before being published</li>
                      <li>• Please be respectful and factual in your submissions</li>
                      <li>• Include only verified information and sources when possible</li>
                      <li>• Media files should be appropriate and relevant to the story</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Story
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitStory;
