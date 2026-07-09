import React, { useState } from "react";
import { Search, AlertTriangle, Globe, ShoppingBag, ExternalLink, Info } from "lucide-react";

const countries = [
  {
    name: "United States",
    code: "USA",
    flag: "🇺🇸",
    flagUrl: "https://flagcdn.com/w320/us.png",
    reason: "Military aid and diplomatic support",
    severity: "high"
  },
  {
    name: "Germany",
    code: "DEU",
    flag: "🇩🇪",
    flagUrl: "https://flagcdn.com/w320/de.png",
    reason: "Arms exports and political support",
    severity: "high"
  },
  {
    name: "France",
    code: "FRA",
    flag: "🇫🇷",
    flagUrl: "https://flagcdn.com/w320/fr.png",
    reason: "Military cooperation",
    severity: "medium"
  },
  {
    name: "United Kingdom",
    code: "GBR",
    flag: "🇬🇧",
    flagUrl: "https://flagcdn.com/w320/gb.png",
    reason: "Arms trade and diplomatic backing",
    severity: "high"
  },
  {
    name: "Canada",
    code: "CAN",
    flag: "🇨🇦",
    flagUrl: "https://flagcdn.com/w320/ca.png",
    reason: "Military technology exports",
    severity: "medium"
  },
  {
    name: "India",
    code: "IND",
    flag: "🇮🇳",
    flagUrl: "https://flagcdn.com/w320/in.png",
    reason: "Defense cooperation agreements",
    severity: "medium"
  }
];

const boycottItems = [
  {
    name: "McDonald's",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
    category: "Fast Food",
    reason: "Operating in occupied territories",
    severity: "high",
    alternatives: ["Local restaurants", "Halal burger chains"]
  },
  {
    name: "Starbucks",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/Starbucks-Logo.png",
    category: "Coffee",
    reason: "Franchise operations in settlements",
    severity: "high",
    alternatives: ["Local coffee shops", "Gloria Jean's"]
  },
  {
    name: "Nestlé",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/Nestle-Logo.png",
    category: "Food & Beverage",
    reason: "Factory operations in occupied areas",
    severity: "medium",
    alternatives: ["Local dairy brands", "Organic alternatives"]
  },
  {
    name: "Coca-Cola",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/Coca-Cola-Logo.png",
    category: "Beverage",
    reason: "Bottling plants in settlements",
    severity: "high",
    alternatives: ["7UP", "Local soft drinks", "Fresh juices"]
  },
  {
    name: "L'Oréal",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/LOreal-Logo.png",
    category: "Cosmetics",
    reason: "Research facilities and sales",
    severity: "medium",
    alternatives: ["The Body Shop", "Local beauty brands"]
  },
  {
    name: "Intel",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/Intel-Logo.png",
    category: "Technology",
    reason: "R&D centers in occupied territories",
    severity: "high",
    alternatives: ["AMD", "ARM processors"]
  },
  {
    name: "Puma",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png",
    category: "Sportswear",
    reason: "Sponsorship of settlement teams",
    severity: "high",
    alternatives: ["Adidas", "Nike", "Local sportswear"]
  },
  {
    name: "HP",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/HP-Logo.png",
    category: "Technology",
    reason: "Providing surveillance technology",
    severity: "high",
    alternatives: ["Canon", "Epson", "Brother"]
  }
];

const BlacklistSec = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("companies");

  const categories = ["all", ...new Set(boycottItems.map(item => item.category))];

  const filteredItems = boycottItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-orange-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-600 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Gaza Boycott Awareness
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Supporting Palestinian rights through informed consumer choices. These entities are being boycotted for their documented involvement in supporting the occupation.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab("companies")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "companies"
                  ? "bg-red-500 text-white shadow-md"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Companies & Brands
            </button>
            <button
              onClick={() => setActiveTab("countries")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "countries"
                  ? "bg-red-500 text-white shadow-md"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              <Globe className="w-5 h-5" />
              Countries
            </button>
          </div>
        </div>

        {/* Companies Tab */}
        {activeTab === "companies" && (
          <div>
            {/* Search and Filter */}
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                          <img
                            src={item.logo}
                            alt={`${item.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                          <span className="text-2xl hidden">{item.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                          <span className="text-sm text-gray-500">{item.category}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(item.severity)}`}>
                        {item.severity.toUpperCase()}
                      </span>
                    </div>

                    <div className={`rounded-lg p-3 mb-4 border ${getSeverityColor(item.severity)}`}>
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{item.reason}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Alternatives:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.alternatives.map((alt, altIndex) => (
                          <span
                            key={altIndex}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Countries Tab */}
        {activeTab === "countries" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
                        <img
                          src={country.flagUrl}
                          alt={`${country.name} flag`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center text-2xl ">
                          {country.flag}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{country.name}</h3>
                        <span className="text-sm text-gray-500">{country.code}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(country.severity)}`}>
                      {country.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className={`rounded-lg p-3 border ${getSeverityColor(country.severity)}`}>
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{country.reason}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Information Footer */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How You Can Help</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="bg-green-100 rounded-full p-3 mb-3">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-medium mb-2">Choose Alternatives</p>
                <p>Support businesses that align with your values</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-3 mb-3">
                  <ExternalLink className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium mb-2">Spread Awareness</p>
                <p>Share information with friends and family</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-100 rounded-full p-3 mb-3">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium mb-2">Stay Informed</p>
                <p>Keep updated on current events and boycott lists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlacklistSec;