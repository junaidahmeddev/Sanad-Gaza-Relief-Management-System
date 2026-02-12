import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Globe, Shield, ArrowRight, CheckCircle, AlertCircle, XCircle, Satellite, Navigation, Truck, Package } from 'lucide-react';

const DonatePage = () => {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [activeTab, setActiveTab] = useState('donate');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    sessionStorage.setItem('amount', amount);
    sessionStorage.setItem('donorName', donorName);
    
    // Store data in memory instead of sessionStorage
    window.donationData = { donorName, amount };
    
    setIsSubmitting(false);
    // Navigate to payment page
    window.location.href = '/donate/payment';
  };

  // Interactive Leaflet-style Map Component
  const InteractiveMap = () => {
    // Gaza Strip and surrounding area coordinates
    const routes = [
      { 
        id: 1, 
        name: 'Rafah Crossing', 
        status: 'closed', 
        lat: 31.2856, 
        lng: 34.2439,
        description: 'Main border crossing with Egypt - Primary route for medical supplies',
        type: 'border',
        capacity: '500 trucks/day',
        lastUpdate: '2 hours ago'
      },
      { 
        id: 2, 
        name: 'Kerem Shalom', 
        status: 'restricted', 
        lat: 31.2342, 
        lng: 34.4289,
        description: 'Commercial crossing with Israel - Food and construction materials',
        type: 'commercial',
        capacity: '200 trucks/day',
        lastUpdate: '30 minutes ago'
      },
      { 
        id: 3, 
        name: 'Erez Crossing', 
        status: 'open', 
        lat: 31.5539, 
        lng: 34.4664,
        description: 'Personnel crossing with Israel - Humanitarian aid workers',
        type: 'personnel',
        capacity: '100 people/day',
        lastUpdate: '15 minutes ago'
      },
      { 
        id: 4, 
        name: 'Gaza Port', 
        status: 'restricted', 
        lat: 31.5017, 
        lng: 34.4668,
        description: 'Gaza City fishing port - Limited humanitarian deliveries',
        type: 'maritime',
        capacity: '5 boats/week',
        lastUpdate: '1 hour ago'
      },
      { 
        id: 5, 
        name: 'Khan Younis Distribution', 
        status: 'open', 
        lat: 31.3489, 
        lng: 34.3067,
        description: 'Central distribution hub - Food and medical supplies',
        type: 'distribution',
        capacity: '1000 packages/day',
        lastUpdate: '5 minutes ago'
      },
      { 
        id: 6, 
        name: 'Gaza City Hospital Route', 
        status: 'open', 
        lat: 31.5201, 
        lng: 34.4391,
        description: 'Direct medical supply route to Al-Shifa Hospital',
        type: 'medical',
        capacity: '50 ambulances/day',
        lastUpdate: '10 minutes ago'
      },
    ];

    // Gaza Strip cities and population centers
    const cities = [
      { name: 'Gaza City', lat: 31.5201, lng: 34.4391, population: '650K', type: 'major' },
      { name: 'Khan Younis', lat: 31.3489, lng: 34.3067, population: '205K', type: 'major' },
      { name: 'Jabalia', lat: 31.5314, lng: 34.4831, population: '170K', type: 'camp' },
      { name: 'Rafah', lat: 31.2856, lng: 34.2439, population: '175K', type: 'border' },
      { name: 'Deir al-Balah', lat: 31.4185, lng: 34.3510, population: '75K', type: 'town' },
      { name: 'Beit Lahia', lat: 31.5467, lng: 34.5061, population: '60K', type: 'town' },
    ];

    // Convert lat/lng to map coordinates (simplified projection)
    const latLngToXY = (lat, lng) => {
      const bounds = {
        north: 31.58,
        south: 31.22,
        east: 34.55,
        west: 34.20
      };
      
      const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;
      const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * 100;
      
      return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'open': return 'bg-emerald-500 shadow-emerald-500/50 border-emerald-300';
        case 'restricted': return 'bg-amber-500 shadow-amber-500/50 border-amber-300';
        case 'closed': return 'bg-red-500 shadow-red-500/50 border-red-300';
        default: return 'bg-gray-500';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'open': return <CheckCircle className="w-4 h-4 text-white" />;
        case 'restricted': return <AlertCircle className="w-4 h-4 text-white" />;
        case 'closed': return <XCircle className="w-4 h-4 text-white" />;
        default: return null;
      }
    };

    const getTypeIcon = (type) => {
      switch (type) {
        case 'border': return <Navigation className="w-3 h-3" />;
        case 'commercial': return <Truck className="w-3 h-3" />;
        case 'distribution': return <Package className="w-3 h-3" />;
        case 'medical': return <Heart className="w-3 h-3" />;
        default: return <MapPin className="w-3 h-3" />;
      }
    };

    useEffect(() => {
      // Simulate map loading
      const timer = setTimeout(() => setMapLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
        {/* Loading overlay */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading interactive map...</p>
            </div>
          </div>
        )}

        {/* Map tile pattern (simulating satellite imagery) */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(59, 130, 246, 0.1) 50%, transparent 50%),
            linear-gradient(90deg, rgba(34, 197, 94, 0.05) 50%, transparent 50%),
            radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '40px 40px, 40px 40px, 200px 200px, 200px 200px'
        }}>
          {/* Mediterranean Sea */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-300/40 to-blue-200/20" />
          
          {/* Terrain features */}
          <div className="absolute inset-0 opacity-30">
            {/* Urban areas */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-gray-400/30 rounded"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${20 + Math.random() * 60}%`,
                  transform: `rotate(${Math.random() * 90}deg)`
                }}
              />
            ))}
            
            {/* Agricultural areas */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-6 bg-green-300/20 rounded"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${25 + Math.random() * 50}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Gaza Strip boundary */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <defs>
            <pattern id="stripedPattern" patternUnits="userSpaceOnUse" width="4" height="4">
              <rect width="4" height="4" fill="rgba(59, 130, 246, 0.1)" />
              <path d="M 0,4 L 4,0 M -1,1 L 1,-1 M 3,5 L 5,3" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          
          {/* Gaza Strip outline */}
          <path
            d="M20 15 L85 15 L85 25 L80 35 L75 50 L70 65 L65 80 L55 88 L40 90 L25 85 L15 75 L12 60 L15 45 L18 30 L20 15 Z"
            fill="url(#stripedPattern)"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="2"
            strokeDasharray="none"
            className="drop-shadow-lg"
          />
        </svg>

        {/* Cities */}
        {cities.map((city) => {
          const { x, y } = latLngToXY(city.lat, city.lng);
          return (
            <div
              key={city.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className={`w-6 h-6 rounded-full border-2 border-white ${
                city.type === 'major' ? 'bg-gray-700' : 
                city.type === 'camp' ? 'bg-orange-500' : 'bg-gray-500'
              } shadow-lg`} />
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-xs font-semibold text-gray-800 whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 rounded shadow-lg">
                  {city.name}
                </div>
                <div className="text-[10px] text-gray-600 mt-1">{city.population}</div>
              </div>
            </div>
          );
        })}

        {/* Supply routes */}
        {routes.map((route) => {
          const { x, y } = latLngToXY(route.lat, route.lng);
          const isSelected = selectedRoute?.id === route.id;
          
          return (
            <div
              key={route.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 ${
                isSelected ? 'scale-150' : 'hover:scale-125'
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setSelectedRoute(isSelected ? null : route)}
            >
              <div className={`w-10 h-10 ${getStatusColor(route.status)} rounded-full 
                             flex items-center justify-center border-3 shadow-xl
                             relative group`}>
                {getStatusIcon(route.status)}
                
                {/* Route type indicator */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {getTypeIcon(route.type)}
                </div>

                {/* Pulsing animation */}
                <div className={`absolute inset-0 rounded-full ${getStatusColor(route.status)} 
                               opacity-40 animate-ping`} 
                     style={{ animationDuration: route.status === 'open' ? '2s' : '4s' }} />
              </div>
            </div>
          );
        })}

        {/* Connection lines between active routes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
          {routes.filter(r => r.status !== 'closed').map((route, index, activeRoutes) => {
            const { x: x1, y: y1 } = latLngToXY(route.lat, route.lng);
            
            return activeRoutes.slice(index + 1).map((nextRoute) => {
              const { x: x2, y: y2 } = latLngToXY(nextRoute.lat, nextRoute.lng);
              const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
              
              // Only connect nearby routes
              if (distance > 30) return null;
              
              return (
                <line
                  key={`${route.id}-${nextRoute.id}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke={route.status === 'open' && nextRoute.status === 'open' ? 
                          'rgba(34, 197, 94, 0.6)' : 'rgba(245, 158, 11, 0.6)'}
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
              );
            });
          })}
        </svg>

        {/* Map controls */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-200 shadow-xl z-30">
          <div className="flex items-center gap-3 text-sm font-semibold text-gray-800 mb-2">
            <Satellite className="w-5 h-5 text-blue-600" />
            <span>Gaza Supply Routes - Live Status</span>
          </div>
          <div className="text-xs text-gray-600">Click markers for detailed information</div>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-xl z-30">
          <div className="text-sm font-semibold text-gray-800 mb-3">Route Status</div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span>Open & Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span>Restricted Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Closed</span>
            </div>
          </div>
        </div>

        {/* Coordinates and scale */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200 shadow-lg z-30">
          <div className="text-xs text-gray-600 mb-1">Gaza Strip Region</div>
          <div className="text-xs text-gray-800 font-mono">31°N - 34°E</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-0.5 bg-gray-800" />
            <span className="text-xs">5 km</span>
          </div>
        </div>

        {/* Real-time updates indicator */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200 shadow-lg z-30">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live Updates</span>
          </div>
        </div>

        {/* Selected route details panel */}
        {selectedRoute && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-2xl z-40 max-w-sm">
            <button 
              onClick={() => setSelectedRoute(null)}
              className="absolute top-2 right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <XCircle className="w-4 h-4 text-gray-500" />
            </button>
            
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-8 h-8 ${getStatusColor(selectedRoute.status)} rounded-full flex items-center justify-center`}>
                {getStatusIcon(selectedRoute.status)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{selectedRoute.name}</h3>
                <p className="text-sm text-gray-600 capitalize flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${
                    selectedRoute.status === 'open' ? 'bg-emerald-500' :
                    selectedRoute.status === 'restricted' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  {selectedRoute.status}
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{selectedRoute.description}</p>
            
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Capacity:</span>
                <span className="font-medium">{selectedRoute.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Update:</span>
                <span className="font-medium">{selectedRoute.lastUpdate}</span>
              </div>
              <div className="flex justify-between">
                <span>Coordinates:</span>
                <span className="font-mono text-[10px]">{selectedRoute.lat}°, {selectedRoute.lng}°</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-200/10 rounded-full blur-2xl animate-pulse"
             style={{ animationDelay: '2s' }} />
      </div>

      {/* Mouse follower effect */}
      <div 
        className="fixed w-96 h-96 bg-gradient-radial from-blue-100/10 to-transparent rounded-full pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-16 px-4">
          <div className="inline-flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-lg">
            <Heart className="w-6 h-6 text-red-500 animate-pulse" />
            <span className="text-lg font-medium text-gray-700">Support Gaza</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            Make a Difference Today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your donation helps provide essential supplies and support to families in Gaza. 
            Every contribution matters.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200 shadow-lg">
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'donate'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Donate Money
            </button>
            <button
              onClick={() => setActiveTab('supplies')}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'supplies'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Supply Routes Map
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'donate' ? (
          <div className="max-w-md mx-auto px-4 mb-16">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Make a Donation</h2>
                <p className="text-gray-600">Help provide essential aid</p>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-700">Select Amount</label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {predefinedAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(preset);
                        setAmount(preset.toString());
                      }}
                      className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                        selectedAmount === preset
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
                
                <input
                  type="number"
                  placeholder="Custom amount (USD)"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  required
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-700">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                  className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !donorName || !amount}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Secure & encrypted payment</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-lg">
                <MapPin className="w-6 h-6 text-emerald-600" />
                <span className="text-lg font-medium text-gray-700">Interactive Supply Map</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Real-Time Gaza Supply Routes</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Interactive map showing current status of humanitarian supply routes for food, medicine, 
                and essential supplies. Click on route markers for detailed information.
              </p>
            </div>

            <div className="mb-8">
              <InteractiveMap />
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                This interactive map shows real-time status of supply routes and distribution points 
                to help coordinate humanitarian aid efforts.
              </p>
              <div className="flex justify-center gap-8 text-sm flex-wrap">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/30" />
                  <span className="text-emerald-700 font-medium">Open Routes</span>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg">
                  <div className="w-4 h-4 bg-amber-500 rounded-full shadow-lg shadow-amber-500/30" />
                  <span className="text-amber-700 font-medium">Restricted Access</span>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-lg">
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/30" />
                  <span className="text-red-700 font-medium">Closed Routes</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <Globe className="w-4 h-4" />
            <span>Helping communities worldwide</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 Gaza Support Initiative. All donations are processed securely.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DonatePage;