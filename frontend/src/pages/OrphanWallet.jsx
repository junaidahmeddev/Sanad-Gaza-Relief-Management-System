import React, { useState, useRef } from "react";
  import { ChevronLeft, ChevronRight, Heart, Users, Mail, Phone, MessageCircle, Send } from "lucide-react";
  
  const orphanProfiles = [
    { 
      id: 1, 
      name: "Aisha", 
      age: 8,
      image: "/images/orphan1.jpg",
      location: "Karachi, Pakistan",
      interests: "Drawing, Reading"
    },
    { 
      id: 2, 
      name: "Ahmed", 
      age: 12,
      image: "/images/orphan2.jpg",
      location: "Lahore, Pakistan",
      interests: "Football, Mathematics"
    },
    { 
      id: 3, 
      name: "Fatima", 
      age: 6,
      image: "/images/orphan3.jpg",
      location: "Islamabad, Pakistan",
      interests: "Dancing, Painting"
    },
    { 
      id: 4, 
      name: "Hassan", 
      age: 10,
      image: "/images/orphan4.jpg",
      location: "Multan, Pakistan",
      interests: "Cricket, Science"
    },
    { 
      id: 5, 
      name: "Zara", 
      age: 7,
      image: "/images/orphan5.jpg",
      location: "Faisalabad, Pakistan",
      interests: "Music, Stories"
    },
    { 
      id: 6, 
      name: "Omar", 
      age: 9,
      image: "/images/orphan6.jpg",
      location: "Peshawar, Pakistan",
      interests: "Building, Games"
    },
  ];
  
  const OrphanWallet = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('http://localhost:5000/api/orphans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitted(true);
          setFormData({ name: "", email: "", phone: "", message: "" });
          
          // Hide success message after 5 seconds
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          throw new Error('Failed to submit application');
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        alert("Sorry, there was an error submitting your application. Please try again.");
      }
    };
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(orphanProfiles.length / 3));
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(orphanProfiles.length / 3)) % Math.ceil(orphanProfiles.length / 3));
    };
  
    const getVisibleProfiles = () => {
      const start = currentSlide * 3;
      return orphanProfiles.slice(start, start + 3);
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Orphan Care
                </h1>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Connect hearts, change lives. Support orphaned children in their journey towards a brighter future.
              </p>
            </div>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Children Profiles Slider */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-blue-500" />
                <h2 className="text-3xl font-bold text-gray-800">Meet Our Children</h2>
              </div>
              <p className="text-gray-600">Beautiful souls waiting for your support and love</p>
            </div>
  
            {/* Slider Container */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div 
                  ref={sliderRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(orphanProfiles.length / 3) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        {orphanProfiles.slice(slideIndex * 3, slideIndex * 3 + 3).map((orphan) => (
                          <div
                            key={orphan.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                          >
                            <div className="relative">
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={orphan.image}
                                  alt={orphan.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                                <span className="text-sm font-medium text-gray-700">{orphan.age} years</span>
                              </div>
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{orphan.name}</h3>
                              <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                {orphan.location}
                              </p>
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Interests:</span> {orphan.interests}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
  
              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: Math.ceil(orphanProfiles.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentSlide === index 
                        ? 'bg-blue-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
  
          {/* Application Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">Start Your Journey</h2>
              <p className="text-blue-100">Fill out the form below to begin the sponsorship process</p>
            </div>
  
            <div className="p-8">
              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <Send className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Application Submitted!</h3>
                  <p className="text-green-700">Thank you for your interest. Our team will contact you within 24 hours.</p>
                </div>
              )}
  
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Users className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                  </div>
  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                  </div>
                </div>
  
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>
  
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about yourself and why you want to sponsor a child..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  />
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrphanWallet;