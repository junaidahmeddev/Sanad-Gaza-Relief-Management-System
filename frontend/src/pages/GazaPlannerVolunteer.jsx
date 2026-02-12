import React, { useState } from "react";
import { 
  Heart, 
  Users, 
  Home, 
  Stethoscope, 
  GraduationCap, 
  Hammer, 
  Zap, 
  Droplets,
  MapPin,
  Calendar,
  Phone,
  Mail,
  User,
  Building,
  Clock,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield
} from "lucide-react";

const reconstructionProjects = [
  {
    id: 1,
    title: "Housing Reconstruction",
    icon: Home,
    progress: 15,
    priority: "Critical",
    description: "Rebuilding homes for displaced families",
    needed: "Construction workers, architects, engineers",
    timeframe: "2-3 years",
    cost: "$2.1B",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Healthcare Infrastructure",
    icon: Stethoscope,
    progress: 8,
    priority: "Critical",
    description: "Reconstructing hospitals and medical facilities",
    needed: "Medical professionals, construction teams",
    timeframe: "1-2 years",
    cost: "$850M",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 3,
    title: "Educational Facilities",
    icon: GraduationCap,
    progress: 22,
    priority: "High",
    description: "Rebuilding schools and universities",
    needed: "Teachers, contractors, educational specialists",
    timeframe: "18 months",
    cost: "$650M",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Power Grid Restoration",
    icon: Zap,
    progress: 35,
    priority: "Critical",
    description: "Rebuilding electrical infrastructure",
    needed: "Electrical engineers, technicians",
    timeframe: "1 year",
    cost: "$450M",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 5,
    title: "Water & Sanitation",
    icon: Droplets,
    progress: 28,
    priority: "Critical",
    description: "Restoring clean water access and sewage systems",
    needed: "Civil engineers, plumbers, water specialists",
    timeframe: "15 months",
    cost: "$380M",
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 6,
    title: "Infrastructure & Roads",
    icon: Building,
    progress: 12,
    priority: "High",
    description: "Rebuilding roads, bridges, and public infrastructure",
    needed: "Civil engineers, construction crews",
    timeframe: "2 years",
    cost: "$720M",
    color: "from-purple-500 to-indigo-500"
  }
];

const volunteerSkills = [
  "Medical Professional",
  "Construction Worker",
  "Engineer",
  "Teacher/Educator",
  "Project Manager",
  "Translator",
  "Logistics Coordinator",
  "Social Worker",
  "IT Specialist",
  "Fundraising",
  "Other"
];

const GazaRebuildPlanner = () => {
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: [],
    availability: "",
    experience: "",
    commitment: "",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  const handleInputChange = (e) => {
    setVolunteerForm({ ...volunteerForm, [e.target.name]: e.target.value });
  };

  const handleSkillToggle = (skill) => {
    const updatedSkills = volunteerForm.skills.includes(skill)
      ? volunteerForm.skills.filter(s => s !== skill)
      : [...volunteerForm.skills, skill];
    setVolunteerForm({ ...volunteerForm, skills: updatedSkills });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerForm),
      });

      if (!response.ok) {
        throw new Error('Failed to submit volunteer application');
      }

      const result = await response.json();
      console.log("Volunteer application submitted successfully:", result);
      
      setSubmitted(true);
      setVolunteerForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        skills: [],
        availability: "",
        experience: "",
        commitment: "",
        message: ""
      });
      
      setTimeout(() => setSubmitted(false), 10000);
    } catch (err) {
      console.error('Error submitting volunteer application:', err);
      setError('Failed to submit your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalCost = reconstructionProjects.reduce((sum, project) => 
    sum + parseFloat(project.cost.replace('$', '').replace('B', '000').replace('M', '')), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <Heart className="w-16 h-16 text-red-300" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6">
              Rebuild Gaza Together
            </h1>
            <p className="text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Join the global effort to reconstruct Gaza and bring hope back to Palestinian families. 
              Every skill, every hand, every heart makes a difference.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3">
                <Users className="w-6 h-6" />
                <span>15,000+ Volunteers</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3">
                <Building className="w-6 h-6" />
                <span>6 Major Projects</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-3">
                <Globe className="w-6 h-6" />
                <span>Global Initiative</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Home className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">65,000+</h3>
            <p className="text-gray-600">Homes Destroyed</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">36</h3>
            <p className="text-gray-600">Hospitals Damaged</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">625</h3>
            <p className="text-gray-600">Schools Affected</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">${(totalCost/1000).toFixed(1)}B</h3>
            <p className="text-gray-600">Reconstruction Cost</p>
          </div>
        </div>

        {/* Reconstruction Projects */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Reconstruction Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic initiatives to rebuild Gaza's infrastructure and restore hope to Palestinian communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reconstructionProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                >
                  <div className={`h-32 bg-gradient-to-r ${project.color} flex items-center justify-center relative`}>
                    <IconComponent className="w-12 h-12 text-white" />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        project.priority === 'Critical' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-orange-500 text-white'
                      }`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-semibold text-green-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Timeline</span>
                          <span className="font-semibold">{project.timeframe}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Cost</span>
                          <span className="font-semibold">{project.cost}</span>
                        </div>
                      </div>
                    </div>
                    
                    {activeProject === project.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2">Volunteers Needed:</h4>
                        <p className="text-sm text-gray-600">{project.needed}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Volunteer Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-white text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Join the Reconstruction Effort</h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Your skills and dedication can help rebuild lives and restore hope. Register to become part of this historic reconstruction effort.
            </p>
          </div>          <div className="p-8">
            {submitted && (
              <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-bold text-green-800 text-lg">Registration Successful!</h3>
                    <p className="text-green-600">Thank you for joining the Gaza reconstruction effort. We'll contact you with next steps.</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-xl">!</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-800 text-lg">Submission Failed</h3>
                    <p className="text-red-600">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <User className="w-6 h-6 text-green-600" />
                  <span>Personal Information</span>
                </h3>
                
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={volunteerForm.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={volunteerForm.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={volunteerForm.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    placeholder="Your Location (City, Country)"
                    value={volunteerForm.location}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Skills and Availability */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <Hammer className="w-6 h-6 text-green-600" />
                  <span>Skills & Availability</span>
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Your Skills (Select all that apply)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {volunteerSkills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          volunteerForm.skills.includes(skill)
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="availability"
                    value={volunteerForm.availability}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Availability</option>
                    <option value="full-time">Full-time (40+ hours/week)</option>
                    <option value="part-time">Part-time (20-40 hours/week)</option>
                    <option value="weekends">Weekends only</option>
                    <option value="flexible">Flexible schedule</option>
                  </select>
                </div>

                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="commitment"
                    value={volunteerForm.commitment}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Commitment Duration</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="1-year-plus">1+ years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Experience and Message */}
            <div className="mt-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Relevant Experience</label>
                <textarea
                  name="experience"
                  placeholder="Describe your relevant experience, certifications, or previous volunteer work..."
                  value={volunteerForm.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Additional Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us why you want to help rebuild Gaza and any additional information..."
                  value={volunteerForm.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform shadow-lg hover:shadow-2xl flex items-center space-x-3 mx-auto ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Join the Reconstruction</span>
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
                <p className="text-gray-500 text-sm mt-4">
                  By registering, you agree to our terms and commit to helping rebuild Gaza with dignity and respect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="flex justify-center mb-6">
            <Shield className="w-12 h-12 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Together We Rebuild</h3>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Every brick laid, every hand extended, every heart opened brings us closer to a restored Gaza. 
            Join thousands of volunteers from around the world in this historic reconstruction effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300">
              Learn More About Projects
            </button>
            <button className="border-2 border-green-400 text-green-400 px-8 py-3 rounded-xl font-semibold hover:bg-green-400 hover:text-white transition-all duration-300">
              Share This Initiative
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GazaRebuildPlanner;