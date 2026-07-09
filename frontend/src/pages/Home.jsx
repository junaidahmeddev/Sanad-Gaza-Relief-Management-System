import React, { useState, useEffect } from 'react';
import { Heart, Play, Users, Target, Globe, ArrowRight, Plus, Minus, Star, Shield, TrendingUp , } from 'lucide-react';

export default function Home() {
  const [mapImageUrl, setMapImageUrl] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [donorCount, setDonorCount] = useState(2340);
  
  // Interactive Hero Donation Card State
  const [selectedHeroAmount, setSelectedHeroAmount] = useState(20);
  const [customHeroAmount, setCustomHeroAmount] = useState('');

  // Featured Campaigns State
  const [activeCampaignTab, setActiveCampaignTab] = useState('relief');

  // Modals state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const progressTimer = setTimeout(() => setProgress(29), 800);
    const countTimer = setInterval(() => {
      setDonorCount(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    
    return () => {
      clearTimeout(progressTimer);
      clearInterval(countTimer);
    };
  }, []);

  const handleDonate = () => {
    window.location.href = '/donate';
  };

  const handleHeroDonateSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customHeroAmount ? parseFloat(customHeroAmount) : selectedHeroAmount;
    if (!finalAmount || finalAmount <= 0) {
      alert("Please select or enter a valid donation amount.");
      return;
    }
    sessionStorage.setItem('amount', finalAmount.toString());
    sessionStorage.setItem('donorName', 'Guest Supporter');
    window.location.href = '/donate/payment';
  };

  const handleCampaignDonate = (amount, campaignName) => {
    sessionStorage.setItem('amount', amount.toString());
    sessionStorage.setItem('donorName', 'Guest Supporter');
    sessionStorage.setItem('campaign', campaignName);
    window.location.href = '/donate/payment';
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleWatchVideo = () => {
    setIsVideoModalOpen(true);
  };
  

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 opacity-50">
        {/* Large Moving Orbs */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-200/70 to-cyan-200/70 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-gradient-to-br from-purple-200/70 to-pink-200/70 rounded-full blur-3xl animate-float-slow-reverse"></div>
        <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-gradient-to-br from-emerald-200/70 to-teal-200/70 rounded-full blur-3xl animate-float-medium"></div>
        
        {/* Interactive Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-blue-300/60 rounded-full animate-bounce-slow hover:scale-150 transition-transform cursor-pointer"></div>
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-purple-300/60 rounded-full animate-bounce-slow delay-1000 hover:scale-150 transition-transform cursor-pointer"></div>
        <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-cyan-300/60 rounded-full animate-bounce-slow delay-500 hover:scale-150 transition-transform cursor-pointer"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-emerald-300/60 rounded-full animate-bounce-slow delay-1500 hover:scale-150 transition-transform cursor-pointer"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute top-40 right-40 w-8 h-8 bg-gradient-to-br from-blue-400/40 to-blue-500/40 rounded-lg animate-spin-slow hover:animate-spin transition-all cursor-pointer"></div>
        <div className="absolute bottom-1/2 left-20 w-6 h-6 bg-gradient-to-br from-purple-400/40 to-purple-500/40 transform rotate-45 animate-pulse hover:rotate-90 transition-transform cursor-pointer"></div>
        <div className="absolute top-2/3 right-1/2 w-10 h-2 bg-gradient-to-r from-cyan-400/40 to-cyan-500/40 rounded-full animate-pulse hover:w-16 transition-all cursor-pointer"></div>
        
        {/* Interactive Lines/Waves */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,300 Q250,200 500,300 T1000,300" stroke="url(#gradient1)" strokeWidth="2" fill="none" className="animate-draw">
              <animate attributeName="d" dur="8s" repeatCount="indefinite" 
                values="M0,300 Q250,200 500,300 T1000,300;M0,350 Q250,250 500,350 T1000,350;M0,300 Q250,200 500,300 T1000,300"/>
            </path>
            <path d="M0,600 Q250,500 500,600 T1000,600" stroke="url(#gradient2)" strokeWidth="2" fill="none" className="animate-draw">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" 
                values="M0,600 Q250,500 500,600 T1000,600;M0,650 Q250,550 500,650 T1000,650;M0,600 Q250,500 500,600 T1000,600"/>
            </path>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:0.3}} />
                <stop offset="50%" style={{stopColor:'#8B5CF6', stopOpacity:0.6}} />
                <stop offset="100%" style={{stopColor:'#06B6D4', stopOpacity:0.3}} />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'#10B981', stopOpacity:0.3}} />
                <stop offset="50%" style={{stopColor:'#F59E0B', stopOpacity:0.6}} />
                <stop offset="100%" style={{stopColor:'#EF4444', stopOpacity:0.3}} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Floating Hearts */}
        <div className="absolute top-20 right-20 animate-float-heart">
          <Heart className="w-8 h-8 text-red-300/60 hover:text-red-400 transition-colors cursor-pointer" fill="currentColor" />
        </div>
        <div className="absolute bottom-40 left-40 animate-float-heart delay-2000">
          <Heart className="w-6 h-6 text-pink-300/60 hover:text-pink-400 transition-colors cursor-pointer" fill="currentColor" />
        </div>
        <div className="absolute top-1/2 right-10 animate-float-heart delay-1000">
          <Heart className="w-5 h-5 text-purple-300/60 hover:text-purple-400 transition-colors cursor-pointer" fill="currentColor" />
        </div>
      </div>

      {/* Interactive Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-background"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content Section */}
          <div className={`space-y-8 transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            
            {/* Campaign Status Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-emerald-200 rounded-full shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Active Campaign</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">URGENT</span>
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Help Rebuild 
                <span className="block text-blue-600">Gaza's Future</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Every donation makes a meaningful difference in providing essential aid, 
                education, and hope to families in Gaza. Join our mission to create lasting change.
              </p>
            </div>

            {/* Impact Statistics */}
            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{donorCount.toLocaleString()}+</div>
                <div className="text-sm text-gray-500">Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">$45,230</div>
                <div className="text-sm text-gray-500">Raised</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-500">Families Helped</div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleDonate}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Heart className="w-5 h-5" />
                Donate Now
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={handleWatchVideo}
                className="inline-flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-full shadow-sm transition-colors duration-200">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                </div>
                <div className="text-left">
                  <div>Watch Our Impact</div>
                  <div className="text-sm text-gray-500">2 min video</div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Right Side - Donation Card */}
          <div className={`relative transition-all duration-1000 ease-out delay-200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 z-10">
              <div className="bg-emerald-500 text-white p-3 rounded-full shadow-lg">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            
            {/* Main Donation Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              
              {/* Category Tags */}
              <div className="flex gap-2 mb-6">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Emergency Aid
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Education
                </span>
              </div>
              
              {/* Card Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Provide Essential Support for Gaza Families
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your contribution helps provide food, medical supplies, educational materials, 
                and emergency shelter to families in need. Every dollar creates real impact.
              </p>
              
              {/* Progress Section */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Campaign Progress</span>
                  <span className="text-sm font-bold text-blue-600">{progress}% Complete</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Amount and Custom Amount Selectors */}
              <form onSubmit={handleHeroDonateSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {[10, 20, 50].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedHeroAmount(amt);
                        setCustomHeroAmount('');
                      }}
                      className={`py-2.5 rounded-xl font-bold border transition-all duration-200 ${
                        selectedHeroAmount === amt && !customHeroAmount
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div>
                  <input
                    type="number"
                    value={customHeroAmount}
                    onChange={(e) => {
                      setCustomHeroAmount(e.target.value);
                      setSelectedHeroAmount(0);
                    }}
                    placeholder="Enter Custom Amount ($)"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 font-semibold"
                  />
                </div>

                {/* Donation Button */}
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Target className="w-5 h-5" />
                  Donate Now
                </button>
              </form>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-1 text-emerald-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-medium">Secure</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <Star className="w-4 h-4" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
                <div className="flex items-center gap-1 text-purple-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">Transparent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* About Section */}
        <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-r from-pink-400/10 to-red-500/10 transform rotate-45 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full animate-ping"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-6 -left-2 w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-xl z-10">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-4 shadow-2xl"> 
              <img 
                src="https://i.guim.co.uk/img/media/078149301f5b2c292cf292e63b0f96c4f0968497/0_279_8423_5057/master/8423.jpg?width=1900&dpr=1&s=none&crop=none" 
                alt="Children helping hands" 
                className="w-full h-96 object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full">
              <span className="text-purple-700 font-medium text-sm">🌟 About Sanad</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              We're a Non-Profit 
              <span className="text-cyan-500"> Charity & NGO </span>
              Organization
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Sanad is dedicated to providing humanitarian aid, educational support, and emergency relief to the people of Gaza. We believe every person deserves dignity, hope, and opportunity.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Heart, text: "Help families rebuild their lives" },
                { icon: Globe, text: "Largest global humanitarian network" },
                { icon: Target, text: "Make the world a better place" },
                { icon: Users, text: "Share love and support for community" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-cyan-50 transition-colors duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-lg">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => window.location.href = '/rebuild-gaza'}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Involved
              </button>
              <button 
                onClick={() => window.location.href = '/#about'}
                className="border-2 border-cyan-500 text-cyan-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-cyan-50"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

{/* Featured Campaign */}
<section id="projects" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden min-h-screen">
  {/* Interactive Animated Background */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse cursor-pointer"></div>
    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse cursor-pointer"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
        <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
        <span className="text-purple-700 font-medium text-sm">🎯 Active Campaigns</span>
      </div>
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Urgent: Help Those <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600 animate-pulse">Who Need It Most</span>
      </h2>
    </div>

    {/* Campaign Selector Tabs */}
    <div className="flex justify-center gap-4 mb-12 flex-wrap">
      {[
        { id: 'relief', label: 'Emergency Relief', icon: '🚨' },
        { id: 'orphan', label: 'Orphan Sponsorship', icon: '👶' },
        { id: 'medical', label: 'Medical Aid', icon: '💊' }
      ].map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveCampaignTab(tab.id)}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow ${
            activeCampaignTab === tab.id
              ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white transform scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>

    {/* Dynamic Campaign Card */}
    {(() => {
      const campaigns = {
        relief: {
          title: "Emergency Relief for Gaza Families",
          description: "Providing food, medical aid, and shelter to those in desperate need",
          img: "https://www.unrwa.org/sites/default/files/content/image_galleries/image_gallery_134456_46109_1705304379.jpg",
          progress: 78,
          raised: 42650,
          goal: 55000,
          amount: 100
        },
        orphan: {
          title: "Orphan Sponsorship Program",
          description: "Providing shelter, nutrition, education, and healthcare to children who lost parents",
          img: "https://www.unrwa.org/sites/default/files/content/image_galleries/image_gallery_134456_46109_1705304379.jpg",
          progress: 50,
          raised: 25000,
          goal: 50000,
          amount: 50
        },
        medical: {
          title: "Critical Medical Aid",
          description: "Sponsoring vital medical supplies, bandages, medicines and support for field clinics",
          img: "https://i.guim.co.uk/img/media/078149301f5b2c292cf292e63b0f96c4f0968497/0_279_8423_5057/master/8423.jpg?width=1900&dpr=1&s=none&crop=none",
          progress: 60,
          raised: 18000,
          goal: 30000,
          amount: 250
        }
      };

      const activeCampaign = campaigns[activeCampaignTab] || campaigns.relief;

      return (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/95 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300">
            {/* Image Section */}
            <div className="relative h-80 overflow-hidden">
              <img 
                src={activeCampaign.img} 
                alt={activeCampaign.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Floating Progress Indicator */}
              <div className="absolute top-6 right-6 bg-white/95 rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">{activeCampaign.progress}%</div>
                  <div className="text-xs text-gray-500 font-medium">Complete</div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-bold text-2xl mb-2">{activeCampaign.title}</h3>
                <p className="text-gray-200">{activeCampaign.description}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Progress Section */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Campaign Progress</span>
                  <span className="text-cyan-600 font-bold text-lg">{activeCampaign.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-150 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-600 h-3 rounded-full" 
                    style={{ width: `${activeCampaign.progress}%` }}
                  ></div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">${activeCampaign.raised.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm">Raised So Far</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900">${activeCampaign.goal.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm">Our Goal</div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button */}
              <button 
                type="button"
                onClick={() => handleCampaignDonate(activeCampaign.amount, activeCampaign.title)}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-3"
              >
                <Heart className="w-5 h-5" />
                <span>Support This Campaign (${activeCampaign.amount})</span>
              </button>
            </div>
          </div>
        </div>
      );
    })()}

    {/* Bottom Stats */}
    <div className="mt-12 text-center">
      <p className="text-gray-600">
        Join <span className="font-bold text-cyan-600">1,247 supporters</span> who have already made a difference
      </p>
    </div>
  </div>
</section>



      {/* Testimonial */}
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-r from-pink-400/10 to-red-500/10 transform rotate-45 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full animate-ping"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Section with "Out of Box" Effect */}
          <div className="relative order-1">
            {/* Main container */}
            <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-3xl p-6 shadow-2xl relative overflow-visible">
              {/* The "broken" frame effect */}
              <div className="relative">
                {/* Person image breaking out */}
                <div 
                  className={`relative transition-all duration-700 ease-out ${
                    isHovered ? 'transform translate-x-8 -translate-y-8 rotate-3 scale-105' : ''
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    src="https://cbx-prod.b-cdn.net/COLOURBOX25634084.jpg?width=800&height=800&quality=70"
                    alt="Junaid Ahmed - Founder"
                    className="w-full h-96 object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
                  />
                  
                  {/* Glowing border effect when hovering */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                    isHovered ? 'shadow-[0_0_30px_rgba(6,182,212,0.5)]' : ''
                  }`}></div>
                </div>

                {/* Crack/break lines */}
                <div className="absolute top-4 right-4 w-8 h-0.5 bg-white/40 transform rotate-45 opacity-70"></div>
                <div className="absolute top-6 right-8 w-6 h-0.5 bg-white/40 transform -rotate-45 opacity-70"></div>
                <div className="absolute top-8 right-2 w-4 h-0.5 bg-white/40 transform rotate-12 opacity-70"></div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 order-2">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full">
              <span className="text-purple-700 font-medium text-sm">💬 Testimonial</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              What People Say About 
              <span className="text-cyan-500"> Our Organization</span>
            </h2>
            
            <blockquote className="text-xl text-gray-600 leading-relaxed italic">
              "Founding Sanad, and seeing the direct impact our efforts have on families in Gaza, is incredibly fulfilling. It truly gives me hope. Our organization's unwavering transparency and dedication to those in need is what inspires me daily."
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">JA</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-lg">Junaid Ahmed</div>
                <div className="text-gray-600">The Founder</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-cyan-100">
                Join thousands of supporters helping rebuild lives in Gaza
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDonate}
                className="bg-white text-cyan-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Donate Now
              </button>
              <button 
                onClick={() => window.location.href = '/rebuild-gaza'}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-cyan-600 transition-colors"
              >
                Join Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-br from-cyan-500 to-cyan-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "25K+", label: "People Helped", icon: Users },
              { number: "180+", label: "Active Volunteers", icon: Heart },
              { number: "95K+", label: "Total Donations", icon: Target },
              { number: "$2.4M", label: "Funds Raised", icon: Globe }
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-cyan-100 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
       <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-r from-pink-400/10 to-red-500/10 transform rotate-45 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full animate-ping"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-purple-700 font-medium text-sm">❓ Support</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Frequently Asked 
            <span className="text-cyan-500"> Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our organization and how you can help.
          </p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              question: "How much should I donate to make a difference?",
              answer: "Every donation, no matter the size, makes a meaningful impact. Even $10 can provide a family with clean water for a week, while $50 can feed a family for a month. We believe that collective small donations can create significant change."
            },
            {
              question: "What happens after I donate?",
              answer: "Once you donate, you'll receive a confirmation email with your donation receipt. We provide regular updates on how your contribution is being used, including photos and stories from the families you've helped."
            },
            {
              question: "How can I apply for a volunteer position?",
              answer: "We welcome volunteers! You can apply through our volunteer portal on our website. We have opportunities for both remote and on-ground volunteering, depending on your skills and availability."
            },
            {
              question: "How can I get donation receipts?",
              answer: "Donation receipts are automatically sent to your email address after each donation. You can also access and download receipts anytime from your donor dashboard on our website."
            },
            {
              question: "Are there other ways to help besides donating?",
              answer: "Absolutely! You can volunteer your time, share our campaigns on social media, organize fundraising events in your community, or advocate for our cause among your network."
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full px-6 py-6 text-left flex items-center justify-between transition-colors duration-300 ${
                  openFaq === index
                    ? 'bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-900'
                    : 'bg-white hover:bg-gray-50 text-gray-900'
                }`}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openFaq === index ? (
                  <Minus className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 bg-gradient-to-r from-cyan-50 to-cyan-100">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Video Modal Overlay */}
    {isVideoModalOpen && (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative">
          <button 
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-white/10 rounded-full p-2"
          >
            ✕ Close
          </button>
          <div className="aspect-video w-full">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Impact Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}