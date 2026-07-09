import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, User, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      detail: "hello@company.com",
      description: "Send us an email anytime!"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      detail: "123 Business Ave",
      description: "San Francisco, CA 94107"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Let's Connect
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Ready to start your next project? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 text-lg mb-1">{info.title}</h3>
                    <p className="text-slate-900 font-medium mb-1">{info.detail}</p>
                    <p className="text-slate-600 text-sm">{info.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Fun fact card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Quick Response
              </h3>
              <p className="text-indigo-100">We typically respond within 2 hours during business days!</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ">
                Send us a Message
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <label className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        focusedField === 'name' 
                          ? 'border-blue-500 shadow-lg shadow-blue-100 scale-105' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="relative group">
                    <label className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                        focusedField === 'email' 
                          ? 'border-blue-500 shadow-lg shadow-blue-100 scale-105' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      focusedField === 'subject' 
                        ? 'border-blue-500 shadow-lg shadow-blue-100 scale-105' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="relative group">
                  <label className=" text-sm font-medium text-slate-700 mb-2 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    rows="6"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm focus:outline-none resize-none focus:ring-2 focus:ring-blue-500/20 ${
                      focusedField === 'message' 
                        ? 'border-blue-500 shadow-lg shadow-blue-100' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    placeholder="Tell us more about your project or inquiry..."
                    required
                  ></textarea>
                </div>

                <div
                  onClick={handleSubmit}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer ${
                    isSubmitted
                      ? 'bg-green-500 shadow-lg shadow-green-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 hover:shadow-blue-300'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-2xl mx-auto hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text ">
              Prefer to talk directly?
            </h3>
            <p className="text-slate-600 mb-6 text-lg">
              Schedule a call with our team to discuss your project in detail.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-pink-700 shadow-md">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}