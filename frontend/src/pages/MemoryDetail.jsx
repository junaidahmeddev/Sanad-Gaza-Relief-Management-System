// src/pages/MemoryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Bookmark, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  Eye, 
  MessageCircle, 
  Play, 
  Pause,
  Download,
  Flag,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const MemoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState(null);
  const [relatedMemories, setRelatedMemories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Enhanced mock data
  const mockMemories = [
    {
      id: '1',
      title: 'Martyr Ahmed Al-Masri',
      description: 'A brave soul who lost his life while saving others during the siege of Gaza. His heroic actions saved 12 families from a collapsed building.',
      media: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800',
      type: 'image',
      category: 'martyrs',
      location: 'Gaza Strip',
      date: '2024-01-15',
      tags: ['hero', 'gaza', 'courage', 'sacrifice'],
      likes: 284,
      views: 1240,
      comments: 45,
      isLiked: false,
      isSaved: false,
      author: 'Memory Keeper',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      fullStory: `Ahmed Al-Masri was a 28-year-old father of two who worked as a paramedic in Gaza. On the night of January 15th, when an airstrike hit a residential building, Ahmed rushed to the scene despite the ongoing bombardment.

His courage was extraordinary. While others fled for safety, Ahmed ran toward danger. He managed to rescue 12 families, including 8 children, before the building completely collapsed. Witnesses reported seeing him carry out elderly residents and return multiple times for those trapped on higher floors.

His final words were reported to be "Save the children first." Ahmed's courage and selflessness exemplify the spirit of humanity even in the darkest times. He left behind a wife, two young daughters, and a community that will never forget his sacrifice.

Ahmed's story reminds us that heroes walk among us every day, and that even in the face of unimaginable adversity, the human spirit can shine brightest.`,
      timeline: [
        { time: '10:30 PM', event: 'Airstrike hits residential building in Gaza City' },
        { time: '10:35 PM', event: 'Ahmed arrives at the scene with medical team' },
        { time: '10:40 PM', event: 'First family rescued from ground floor' },
        { time: '10:55 PM', event: 'Successfully evacuates elderly couple from 2nd floor' },
        { time: '11:10 PM', event: 'Returns for family with disabled child' },
        { time: '11:15 PM', event: 'Final rescue completed - 12 families saved' },
        { time: '11:20 PM', event: 'Building collapses completely' }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400'
      ]
    },
    {
      id: '2',
      title: 'Video from Rafah Crossing',
      description: 'Captured footage showing the humanitarian situation at the border crossing.',
      media: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      type: 'video',
      category: 'timeline',
      location: 'Rafah Crossing',
      date: '2024-02-03',
      tags: ['border', 'humanitarian', 'families', 'hope'],
      likes: 156,
      views: 892,
      comments: 28,
      isLiked: true,
      isSaved: false,
      author: 'Citizen Journalist',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      fullStory: 'This footage was captured by a local journalist who documented the daily struggles at the Rafah crossing. Families wait for hours, sometimes days, hoping to cross to safety. The video shows children playing despite the circumstances, elderly people waiting patiently, and the resilience of the human spirit in the face of adversity.'
    },
    {
      id: '3',
      title: "Child Survivor: Layla's Story",
      description: "Despite losing both parents in the bombing, 7-year-old Layla was pulled from the rubble alive after 18 hours.",
      media: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800',
      type: 'image',
      category: 'survivors',
      location: 'Khan Younis',
      date: '2024-01-28',
      tags: ['survivor', 'children', 'hope', 'resilience'],
      likes: 421,
      views: 2340,
      comments: 87,
      isLiked: false,
      isSaved: true,
      author: 'Relief Worker',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b8130e56?w=100',
      fullStory: "Layla was found after 18 hours trapped under the rubble of her family home. Rescue workers heard her singing a lullaby her mother used to sing to her. Despite her injuries and trauma, her first words to rescuers were asking about her pet cat. Layla's story has become a symbol of hope and the unbreakable spirit of children even in the darkest circumstances."
    }
  ];

  const mockComments = [
    {
      id: 1,
      author: 'Sarah Ahmed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b8130e56?w=50',
      content: 'Thank you for sharing this story. Ahmed was truly a hero.',
      timestamp: '2 hours ago',
      likes: 12
    },
    {
      id: 2,
      author: 'Mohammad Hassan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
      content: 'His sacrifice will never be forgotten. Rest in peace, Ahmed.',
      timestamp: '5 hours ago',
      likes: 8
    },
    {
      id: 3,
      author: 'Fatima Ali',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
      content: 'Stories like this remind us of the heroism that exists in ordinary people.',
      timestamp: '1 day ago',
      likes: 15
    }
  ];

  useEffect(() => {
    const foundMemory = mockMemories.find(m => m.id === id);
    if (foundMemory) {
      setMemory(foundMemory);
      // Set related memories (exclude current one)
      setRelatedMemories(mockMemories.filter(m => m.id !== id && m.category === foundMemory.category).slice(0, 3));
      
      // Increment view count
      setTimeout(() => {
        setMemory(prev => prev ? { ...prev, views: prev.views + 1 } : null);
      }, 1000);
    }
  }, [id]);

  const handleLike = () => {
    setMemory(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleSave = () => {
    setMemory(prev => ({
      ...prev,
      isSaved: !prev.isSaved
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: memory.title,
        text: memory.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  const nextGalleryImage = () => {
    if (memory.gallery) {
      setCurrentGalleryIndex((prev) => (prev + 1) % memory.gallery.length);
    }
  };

  const prevGalleryImage = () => {
    if (memory.gallery) {
      setCurrentGalleryIndex((prev) => (prev - 1 + memory.gallery.length) % memory.gallery.length);
    }
  };

  if (!memory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading memory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Download size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Flag size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          {/* Media Section */}
          <div className="relative">
            {memory.type === 'video' ? (
              <div className="relative bg-black aspect-video">
                <img 
                  src={memory.media} 
                  alt={memory.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white" />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100">
                <img 
                  src={memory.media} 
                  alt={memory.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Header Info */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{memory.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{memory.description}</p>
              </div>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(memory.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{memory.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{memory.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {memory.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  memory.isLiked 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart size={20} fill={memory.isLiked ? 'currentColor' : 'none'} />
                <span>{memory.likes}</span>
              </button>

              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageCircle size={20} />
                <span>{memory.comments}</span>
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  memory.isSaved 
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Bookmark size={20} fill={memory.isSaved ? 'currentColor' : 'none'} />
                <span>Save</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Share2 size={20} />
                <span>Share</span>
              </button>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={memory.authorAvatar} 
                alt={memory.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{memory.author}</p>
                <p className="text-sm text-gray-500">Memory Contributor</p>
              </div>
            </div>

            {/* Full Story */}
            {memory.fullStory && (
              <div className="prose max-w-none mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Story</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {memory.fullStory}
                </div>
              </div>
            )}

            {/* Timeline */}
            {memory.timeline && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                <div className="space-y-4">
                  {memory.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-emerald-600 rounded-full mt-1"></div>
                        {index < memory.timeline.length - 1 && (
                          <div className="w-px h-8 bg-gray-300 ml-1 mt-1"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-emerald-600">{item.time}</p>
                        <p className="text-gray-700">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {memory.gallery && memory.gallery.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h3>
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={memory.gallery[currentGalleryIndex]} 
                      alt={`Gallery image ${currentGalleryIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {memory.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevGalleryImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextGalleryImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      <div className="flex justify-center gap-2 mt-4">
                        {memory.gallery.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentGalleryIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentGalleryIndex ? 'bg-emerald-600' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments ({memory.comments})</h3>
            
            {/* Comment Input */}
            <div className="mb-6">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows="3"
              />
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img 
                    src={comment.avatar} 
                    alt={comment.author}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-900 text-sm">{comment.author}</p>
                      <p className="text-gray-700 text-sm mt-1">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{comment.timestamp}</span>
                      <button className="hover:text-gray-700 transition-colors">
                        Like ({comment.likes})
                      </button>
                      <button className="hover:text-gray-700 transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Memories */}
        {relatedMemories.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Memories</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedMemories.map((relatedMemory) => (
                <div 
                  key={relatedMemory.id}
                  onClick={() => navigate(`/memory/${relatedMemory.id}`)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={relatedMemory.media} 
                      alt={relatedMemory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {relatedMemory.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{relatedMemory.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{relatedMemory.likes} likes</span>
                    <span>{relatedMemory.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryDetail;